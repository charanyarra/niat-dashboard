import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type DbFeedbackSession = Database['public']['Tables']['feedback_sessions']['Row'];
type DbFeedbackResponse = Database['public']['Tables']['feedback_responses']['Row'];

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
      
      // Transform the data to match our interface
      const transformedSessions: FeedbackSession[] = (data || []).map((session: DbFeedbackSession) => ({
        id: session.id,
        title: session.title,
        description: session.description || '',
        questions: Array.isArray(session.questions) ? session.questions : [],
        is_active: session.is_active || false,
        share_link: session.share_link || '',
        created_at: session.created_at || '',
        updated_at: session.updated_at || ''
      }));
      
      setSessions(transformedSessions);
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
      
      // Transform the data to match our interface
      const transformedResponses: FeedbackResponse[] = (data || []).map((response: DbFeedbackResponse) => ({
        id: response.id,
        session_id: response.session_id || '',
        user_name: response.user_name,
        user_email: response.user_email,
        bootcamp_id: response.bootcamp_id,
        responses: typeof response.responses === 'object' && response.responses !== null ? response.responses as Record<string, any> : {},
        submitted_at: response.submitted_at || ''
      }));
      
      setResponses(transformedResponses);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const createSession = async (sessionData: Partial<FeedbackSession>) => {
    try {
      const shareLink = `${sessionData.title?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      const { data, error } = await supabase
        .from('feedback_sessions')
        .insert([{ 
          title: sessionData.title || '',
          description: sessionData.description,
          questions: sessionData.questions || [],
          is_active: sessionData.is_active,
          share_link: shareLink 
        }])
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
        .update({ 
          title: updates.title,
          description: updates.description,
          questions: updates.questions,
          is_active: updates.is_active,
          updated_at: new Date().toISOString() 
        })
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

    // Create headers
    const headers = ['Name', 'Email', 'Bootcamp ID', 'Submitted At'];
    session.questions.forEach((q: any) => {
      headers.push(q.question || `Question ${q.id}`);
    });

    // Create CSV content
    const csvRows = [headers.join(',')];
    
    sessionResponses.forEach(response => {
      const row = [
        `"${response.user_name || ''}"`,
        `"${response.user_email || ''}"`,
        `"${response.bootcamp_id || ''}"`,
        `"${new Date(response.submitted_at).toLocaleString()}"`
      ];
      
      session.questions.forEach((q: any) => {
        const answer = response.responses[q.id] || response.responses[q.question] || '';
        // Escape quotes and wrap in quotes
        const escapedAnswer = String(answer).replace(/"/g, '""');
        row.push(`"${escapedAnswer}"`);
      });
      
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSessions(), fetchResponses()]);
      setLoading(false);
    };

    loadData();

    // Set up real-time subscriptions
    const responsesChannel = supabase
      .channel('feedback_responses_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_responses'
        },
        (payload) => {
          console.log('New response received:', payload);
          // Refresh responses when new data comes in
          fetchResponses();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'feedback_responses'
        },
        (payload) => {
          console.log('Response updated:', payload);
          fetchResponses();
        }
      )
      .subscribe();

    const sessionsChannel = supabase
      .channel('feedback_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedback_sessions'
        },
        (payload) => {
          console.log('Sessions changed:', payload);
          fetchSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(responsesChannel);
      supabase.removeChannel(sessionsChannel);
    };
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
