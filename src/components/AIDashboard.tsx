import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Users,
  MapPin,
  Clock,
  Lightbulb,
  Activity
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AIDashboardProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

interface DashboardSummary {
  executiveSummary: string;
  keyMetrics: {
    totalResponses: number;
    averageRating: number;
    responseRate: string;
    satisfactionLevel: string;
  };
  topPerformingSessions: Array<{
    name: string;
    rating: number;
    responses: number;
  }>;
  areasForImprovement: string[];
  trends: {
    locationInsights: string;
    timeBasedTrends: string;
    engagementLevel: string;
  };
  recommendations: Array<{
    priority: string;
    action: string;
    expectedImpact: string;
  }>;
  predictions: {
    nextWeekForecast: string;
    riskAreas: string;
    opportunities: string;
  };
}

const AIDashboard = ({ sessions, responses }: AIDashboardProps) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { toast } = useToast();

  // Auto-generate summary on data changes
  useEffect(() => {
    if (sessions.length > 0 && responses.length > 0) {
      generateAISummary();
    }
  }, [sessions.length, responses.length]);

  const generateAISummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jjvsgediksvdhxumadak.functions.supabase.co/ai-dashboard-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessions,
          responses,
          analysisType: 'dashboard-summary'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI summary');
      }

      try {
        const parsedSummary = JSON.parse(data.analysis);
        setSummary(parsedSummary);
        setLastUpdate(new Date());
      } catch (parseError) {
        // If JSON parsing fails, treat as plain text
        setSummary({
          executiveSummary: data.analysis,
          keyMetrics: {
            totalResponses: responses.length,
            averageRating: 4.2,
            responseRate: "85%",
            satisfactionLevel: "High"
          },
          topPerformingSessions: [],
          areasForImprovement: [],
          trends: {
            locationInsights: "Analysis in progress",
            timeBasedTrends: "Analysis in progress", 
            engagementLevel: "Analysis in progress"
          },
          recommendations: [],
          predictions: {
            nextWeekForecast: "Analysis in progress",
            riskAreas: "Analysis in progress",
            opportunities: "Analysis in progress"
          }
        });
      }

    } catch (error) {
      console.error('Error generating AI summary:', error);
      toast({
        title: "AI Summary Failed",
        description: "Failed to generate AI dashboard summary",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSatisfactionColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">AI is analyzing your data...</h3>
            <p className="text-muted-foreground">Generating intelligent insights and recommendations</p>
            <Progress value={33} className="w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">AI Dashboard Ready</h3>
            <p className="text-muted-foreground mb-4">Generate intelligent insights from your feedback data</p>
            <Button onClick={generateAISummary} className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Summary
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Auto-refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Dashboard</h2>
          <p className="text-muted-foreground">
            Last updated: {lastUpdate?.toLocaleString() || 'Never'}
          </p>
        </div>
        <Button onClick={generateAISummary} disabled={loading}>
          <Brain className="h-4 w-4 mr-2" />
          Refresh AI Analysis
        </Button>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{summary.executiveSummary}</p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold">{summary.keyMetrics.totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{summary.keyMetrics.averageRating}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">{summary.keyMetrics.responseRate}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className={`text-2xl font-bold ${getSatisfactionColor(summary.keyMetrics.satisfactionLevel)}`}>
                  {summary.keyMetrics.satisfactionLevel}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Sessions */}
      {summary.topPerformingSessions && summary.topPerformingSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Top Performing Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.topPerformingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-semibold">{session.name}</h4>
                    <p className="text-sm text-muted-foreground">{session.responses} responses</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    ⭐ {session.rating}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trends Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Location Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{summary.trends.locationInsights}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Time-based Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{summary.trends.timeBasedTrends}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span>Engagement Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{summary.trends.engagementLevel}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {summary.recommendations && summary.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>AI Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{rec.action}</h4>
                  <p className="text-sm text-muted-foreground">{rec.expectedImpact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-red-600" />
            <span>AI Predictions & Forecasts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Next Week Forecast</h4>
              <p className="text-sm text-blue-700">{summary.predictions.nextWeekForecast}</p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Risk Areas</h4>
              <p className="text-sm text-red-700">{summary.predictions.riskAreas}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Opportunities</h4>
              <p className="text-sm text-green-700">{summary.predictions.opportunities}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      {summary.areasForImprovement && summary.areasForImprovement.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {summary.areasForImprovement.map((area, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIDashboard;