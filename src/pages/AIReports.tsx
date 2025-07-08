import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  AlertTriangle,
  FileText,
  Download,
  Share2,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIReportsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const AIReports = ({ sessions, responses }: AIReportsProps) => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [reportData, setReportData] = useState<string>('');
  const [loading, setLoading] = useState(false);
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

  const generateReport = async (reportType: string) => {
    setLoading(true);
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
        title: "Report Generated! 📊",
        description: "AI report has been generated successfully.",
      });

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Report Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      // Fallback to copy to clipboard
      await navigator.clipboard.writeText(reportData);
      toast({
        title: "Report Copied",
        description: "Report content copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI-Generated Reports</h2>
          <p className="text-muted-foreground">Advanced analytics and intelligent insights</p>
        </div>
      </div>

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
              disabled={!selectedReport || loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? (
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

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Data Points</p>
                <p className="text-2xl font-bold">{responses.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold">{sessions.filter(s => s.is_active).length}</p>
              </div>
              <PieChart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Insights Ready</p>
                <p className="text-2xl font-bold text-purple-600">✓</p>
              </div>
              <Lightbulb className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIReports;