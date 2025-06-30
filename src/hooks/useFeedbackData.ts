
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FeedbackSession {
  id: string;
  title: string;
  description: string;
  questions: any[];
  is_active: boolean;
  share_link: string;
  created_at: string;
  updated_at: string;
}

export interface FeedbackResponse {
  id: string;
  session_id: string;
  user_name: string;
  user_email: string;
  bootcamp_id: string;
  responses: Record<string, any>;
  submitted_at: string;
}

export const useFeedbackData = () => {
  const [sessions, setSessions] = useState<FeedbackSession[]>([]);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchResponses = async (sessionId?: string) => {
    try {
      let query = supabase
        .from('feedback_responses')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (sessionId) {
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const createSession = async (sessionData: Partial<FeedbackSession>) => {
    try {
      const shareLink = `${sessionData.title?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      const { data, error } = await supabase
        .from('feedback_sessions')
        .insert([{ ...sessionData, share_link: shareLink }])
        .select()
        .single();

      if (error) throw error;
      await fetchSessions();
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const updateSession = async (id: string, updates: Partial<FeedbackSession>) => {
    try {
      const { error } = await supabase
        .from('feedback_sessions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchSessions();
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from('feedback_sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  };

  const exportToCSV = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    const sessionResponses = responses.filter(r => r.session_id === sessionId);

    if (!session || sessionResponses.length === 0) {
      return null;
    }

    const headers = ['Name', 'Email', 'Bootcamp ID', 'Submitted At'];
    session.questions.forEach((q: any) => {
      headers.push(q.question);
    });

    const csvData = [
      headers.join(','),
      ...sessionResponses.map(response => {
        const row = [
          response.user_name,
          response.user_email,
          response.bootcamp_id,
          new Date(response.submitted_at).toLocaleString()
        ];
        
        session.questions.forEach((q: any) => {
          const answer = response.responses[q.id] || '';
          row.push(`"${String(answer).replace(/"/g, '""')}"`);
        });
        
        return row.join(',');
      })
    ];

    return csvData.join('\n');
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSessions(), fetchResponses()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    sessions,
    responses,
    loading,
    fetchSessions,
    fetchResponses,
    createSession,
    updateSession,
    deleteSession,
    exportToCSV
  };
};
