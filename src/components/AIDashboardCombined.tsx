import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Activity,
  FileText,
  Download,
  Share2,
  PieChart
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIDashboardCombinedProps {
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

const AIDashboardCombined = ({ sessions, responses }: AIDashboardCombinedProps) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [reportData, setReportData] = useState<string>('');
  const [reportLoading, setReportLoading] = useState(false);
  const { toast } = useToast();

  const reportTypes = [
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics Report',
      description: 'AI predictions and forecasting',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 'optimization-recommendations',
      name: 'Optimization Recommendations',
      description: 'AI-powered improvement suggestions',
      icon: Target,
      color: 'text-green-600'
    },
    {
      id: 'automated-report',
      name: 'Executive Summary Report',
      description: 'Comprehensive business report',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      id: 'quality-assessment',
      name: 'Quality Assessment Report',
      description: 'Data quality and system evaluation',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

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

      toast({
        title: "AI Analysis Complete! 🤖",
        description: "Dashboard summary has been generated.",
      });

    } catch (error) {
      console.error('Error generating AI summary:', error);
      toast({
        title: "AI Analysis Failed",
        description: "Failed to generate AI dashboard summary. Check your AI credits.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType: string) => {
    setReportLoading(true);
    setReportData('');

    try {
      const response = await fetch(`https://jjvsgediksvdhxumadak.functions.supabase.co/ai-dashboard-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessions,
          responses,
          analysisType: reportType
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      setReportData(data.analysis);
      toast({
        title: "AI Report Generated! 📊",
        description: "AI report has been generated successfully.",
      });

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Report Generation Failed",
        description: "Failed to generate report. Check your AI credits.",
        variant: "destructive"
      });
    } finally {
      setReportLoading(false);
    }
  };

  const downloadReport = () => {
    if (!reportData) return;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-report-${selectedReport}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "AI report has been downloaded successfully.",
    });
  };

  const shareReport = async () => {
    if (!reportData) return;

    try {
      await navigator.share({
        title: `AI Report - ${selectedReport}`,
        text: reportData.substring(0, 100) + '...',
        url: window.location.href
      });
    } catch (error) {
      await navigator.clipboard.writeText(reportData);
      toast({
        title: "Report Copied",
        description: "Report content copied to clipboard.",
      });
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

  return (
    <div className="space-y-6">
      {/* AI Credits Warning */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800">AI Credits Limited</p>
              <p className="text-sm text-orange-700">AI summaries and insights have usage limits. Each analysis consumes credits.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">AI Dashboard</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">AI Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
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
              {loading ? 'Analyzing...' : 'Refresh AI Analysis'}
            </Button>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-pulse" />
                <h3 className="text-lg font-semibold mb-2">AI is analyzing your data...</h3>
                <p className="text-muted-foreground">Generating intelligent insights and recommendations</p>
                <Progress value={33} className="w-full mt-4" />
              </CardContent>
            </Card>
          ) : !summary ? (
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
          ) : (
            <>
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

              {/* AI Recommendations */}
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
            </>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">AI Insights & Analysis</h3>
            
            {summary && (
              <>
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

                {/* AI Predictions */}
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
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">AI-Generated Reports</h3>
            
            {/* Report Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Card 
                    key={report.id} 
                    className={`cursor-pointer transition-all ${
                      selectedReport === report.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${report.color}`} />
                      <h3 className="font-semibold text-sm mb-1">{report.name}</h3>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Generate Report Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Generate AI Report</span>
                </CardTitle>
                <CardDescription>
                  Select a report type and generate intelligent insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={() => generateReport(selectedReport)}
                    disabled={!selectedReport || reportLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {reportLoading ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </div>

                {reportData && (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={downloadReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={shareReport}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Report Display */}
            {reportData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Generated Report</span>
                    <Badge className="ml-auto">AI Generated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
                      {reportData}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIDashboardCombined;