import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { Brain, Loader2, Sparkles, TrendingUp, MessageSquare, Users, MapPin, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIInsightsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const AIInsights = ({ sessions, responses }: AIInsightsProps) => {
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [analysisType, setAnalysisType] = useState<string>('summary');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [realTimeResponses, setRealTimeResponses] = useState<FeedbackResponse[]>(responses);
  const { toast } = useToast();

  // Real-time listener for new responses
  useEffect(() => {
    const channel = supabase
      .channel('feedback-responses-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_responses'
        },
        (payload) => {
          console.log('New response received:', payload);
          const newResponse = payload.new as FeedbackResponse;
          setRealTimeResponses(prev => [newResponse, ...prev]);
          
          // Show notification
          toast({
            title: "New Feedback Received! 🎉",
            description: `${newResponse.user_name} just submitted feedback`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Update local responses when new ones come in
  useEffect(() => {
    setRealTimeResponses(responses);
  }, [responses]);

  const analyzeWithAI = async () => {
    if (!selectedSession) {
      toast({
        title: "No Session Selected",
        description: "Please select a session to analyze.",
        variant: "destructive"
      });
      return;
    }

    const sessionResponses = realTimeResponses.filter(r => r.session_id === selectedSession);
    
    if (sessionResponses.length === 0) {
      toast({
        title: "No Responses",
        description: "This session has no responses to analyze yet.",
        variant: "destructive"
      });
      return;
    }

    const session = sessions.find(s => s.id === selectedSession);
    
    setLoading(true);
    setAnalysis('');

    try {
      const response = await fetch(`https://jjvsgediksvdhxumadak.functions.supabase.co/analyze-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: sessionResponses,
          sessionTitle: session?.title,
          analysisType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete! ✨",
        description: "AI insights have been generated successfully.",
      });

    } catch (error) {
      console.error('Error analyzing feedback:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze feedback",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSessionStats = (sessionId: string) => {
    const sessionResponses = realTimeResponses.filter(r => r.session_id === sessionId);
    const locations = [...new Set(sessionResponses.map(r => r.responses.location).filter(Boolean))];
    const avgRating = sessionResponses.length > 0 
      ? sessionResponses.reduce((sum, response) => {
          const ratings = Object.values(response.responses).filter(val => !isNaN(Number(val)));
          const responseAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
          return sum + responseAvg;
        }, 0) / sessionResponses.length
      : 0;

    return {
      count: sessionResponses.length,
      locations: locations.length,
      avgRating: avgRating.toFixed(1),
      latest: sessionResponses[0]?.submitted_at
    };
  };

  return (
    <div className="space-y-6">
      {/* Real-time Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Responses</p>
                <p className="text-2xl font-bold text-green-600">{realTimeResponses.length}</p>
              </div>
              <div className="relative">
                <Users className="h-8 w-8 text-green-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Locations</p>
                <p className="text-2xl font-bold text-blue-600">
                  {[...new Set(realTimeResponses.map(r => r.responses.location).filter(Boolean))].length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Analyses</p>
                <p className="text-2xl font-bold text-purple-600">Ready</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="text-sm font-bold text-orange-600">
                  {realTimeResponses[0] ? new Date(realTimeResponses[0].submitted_at).toLocaleTimeString() : 'No data'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <span>AI-Powered Feedback Analysis</span>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </CardTitle>
          <CardDescription>
            Get intelligent insights from your feedback data using advanced AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Session</label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a session to analyze" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => {
                    const stats = getSessionStats(session.id);
                    return (
                      <SelectItem key={session.id} value={session.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{session.title}</span>
                          <Badge variant="secondary" className="ml-2">
                            {stats.count} responses
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Analysis Type</label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">📊 Comprehensive Summary</SelectItem>
                  <SelectItem value="sentiment">😊 Sentiment Analysis</SelectItem>
                  <SelectItem value="insights">💡 Actionable Insights</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={analyzeWithAI}
            disabled={loading || !selectedSession}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Analysis
              </>
            )}
          </Button>

          {analysis && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>AI Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                    {analysis}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Recent Live Responses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-green-600" />
            <span>Live Feedback Stream</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </CardTitle>
          <CardDescription>
            Real-time feedback responses as they're submitted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {realTimeResponses.slice(0, 10).map((response, index) => {
              const session = sessions.find(s => s.id === response.session_id);
              return (
                <div key={response.id} className="p-3 border rounded-lg bg-muted/30 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{response.user_name}</span>
                      <Badge variant="outline">{response.responses.location || 'Unknown'}</Badge>
                      {index === 0 && (
                        <Badge className="bg-green-600">NEW</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(response.submitted_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {session?.title || 'Unknown Session'}
                  </p>
                  <p className="text-sm">
                    Bootcamp ID: {response.bootcamp_id}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;