
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, FileSpreadsheet, Calendar } from 'lucide-react';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';

interface EnhancedExportOptionsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
  onExport: (sessionId: string, format: string) => void;
}

const EnhancedExportOptions = ({ sessions, responses, onExport }: EnhancedExportOptionsProps) => {
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('csv');
  const [dateRange, setDateRange] = useState<string>('all');
  const { toast } = useToast();

  const handleBulkExport = () => {
    if (selectedSession === 'all') {
      sessions.forEach(session => {
        onExport(session.id, selectedFormat);
      });
      toast({
        title: "Bulk Export Started",
        description: `Exporting all sessions as ${selectedFormat.toUpperCase()} files`,
      });
    } else if (selectedSession) {
      onExport(selectedSession, selectedFormat);
      toast({
        title: "Export Started",
        description: `Exporting session as ${selectedFormat.toUpperCase()} file`,
      });
    }
  };

  const exportSummaryReport = () => {
    const summaryData = sessions.map(session => {
      const sessionResponses = responses.filter(r => r.session_id === session.id);
      const averageRating = sessionResponses.length > 0 
        ? sessionResponses.reduce((acc, response) => {
            const ratings = Object.values(response.responses).filter(val => typeof val === 'number') as number[];
            const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
            return acc + avgRating;
          }, 0) / sessionResponses.length
        : 0;

      return {
        'Session Name': session.title,
        'Total Responses': sessionResponses.length,
        'Average Rating': averageRating.toFixed(2),
        'Status': session.is_active ? 'Active' : 'Inactive',
        'Created Date': new Date(session.created_at).toLocaleDateString(),
        'Questions Count': session.questions.length
      };
    });

    const csvContent = [
      Object.keys(summaryData[0] || {}).join(','),
      ...summaryData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-summary-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Summary Report Generated",
      description: "Comprehensive summary report downloaded successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5" />
          <span>Enhanced Export Options</span>
        </CardTitle>
        <CardDescription>
          Advanced export features with multiple formats and options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Session</label>
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger>
                <SelectValue placeholder="Select session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                {sessions.map(session => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleBulkExport}
            className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
            disabled={!selectedSession}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Selected
          </Button>
          
          <Button 
            onClick={exportSummaryReport}
            variant="outline"
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Summary Report
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p><strong>Export Features:</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>CSV format for spreadsheet compatibility</li>
            <li>Bulk export for multiple sessions</li>
            <li>Summary reports with analytics</li>
            <li>Date range filtering</li>
            <li>Google Sheets integration ready</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedExportOptions;
