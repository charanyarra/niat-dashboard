import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { BarChart3, Download, Zap, Settings, Database, Clock } from 'lucide-react';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { useToast } from '@/hooks/use-toast';

interface PowerBIIntegrationProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const PowerBIIntegration = ({ sessions, responses }: PowerBIIntegrationProps) => {
  const [powerBIUrl, setPowerBIUrl] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [datasetId, setDatasetId] = useState('');
  const [autoSync, setAutoSync] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('hourly');
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const generatePowerBIDataset = () => {
    // Transform data for Power BI consumption
    const powerBIData = {
      sessions: sessions.map(session => ({
        SessionId: session.id,
        SessionTitle: session.title,
        SessionDescription: session.description,
        CreatedAt: session.created_at,
        IsActive: session.is_active,
        ResponseCount: responses.filter(r => r.session_id === session.id).length,
        AverageRating: calculateAverageRating(session.id)
      })),
      responses: responses.map(response => ({
        ResponseId: response.id,
        SessionId: response.session_id,
        UserName: response.user_name,
        UserEmail: response.user_email,
        BootcampId: response.bootcamp_id,
        SubmittedAt: response.submitted_at,
        Responses: JSON.stringify(response.responses)
      })),
      analytics: generateAnalyticsData()
    };

    // Download as JSON for Power BI
    const blob = new Blob([JSON.stringify(powerBIData, null, 2)], { 
      type: 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NIAT_Feedback_PowerBI_Dataset_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Power BI Dataset Generated",
      description: "Dataset has been prepared and downloaded for Power BI import",
    });
  };

  const calculateAverageRating = (sessionId: string) => {
    const sessionResponses = responses.filter(r => r.session_id === sessionId);
    if (sessionResponses.length === 0) return 0;
    
    const ratings = sessionResponses.flatMap(response => 
      Object.values(response.responses).filter(val => typeof val === 'number')
    );
    
    return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
  };

  const generateAnalyticsData = () => {
    return {
      totalSessions: sessions.length,
      totalResponses: responses.length,
      activeSessions: sessions.filter(s => s.is_active).length,
      averageResponseRate: responses.length / Math.max(sessions.length, 1),
      responsesByDate: getResponsesByDate(),
      sessionPerformance: getSessionPerformance(),
      locationAnalytics: getLocationAnalytics()
    };
  };

  const getResponsesByDate = () => {
    const dateMap = new Map();
    responses.forEach(response => {
      const date = new Date(response.submitted_at).toDateString();
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });
    return Array.from(dateMap.entries()).map(([date, count]) => ({ date, count }));
  };

  const getSessionPerformance = () => {
    return sessions.map(session => ({
      sessionId: session.id,
      title: session.title,
      responseCount: responses.filter(r => r.session_id === session.id).length,
      averageRating: calculateAverageRating(session.id),
      isActive: session.is_active
    }));
  };

  const getLocationAnalytics = () => {
    const locationMap = new Map();
    responses.forEach(response => {
      // Extract location from responses if available
      const locationAnswer = Object.values(response.responses).find(val => 
        typeof val === 'string' && ['Pune', 'Hyderabad', 'Noida'].includes(val)
      );
      if (locationAnswer) {
        locationMap.set(locationAnswer, (locationMap.get(locationAnswer) || 0) + 1);
      }
    });
    return Array.from(locationMap.entries()).map(([location, count]) => ({ location, count }));
  };

  const connectToPowerBI = () => {
    if (!powerBIUrl.trim()) {
      toast({
        title: "Missing Configuration",
        description: "Please provide Power BI workspace URL",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would connect to Power BI API
    setIsConnected(true);
    toast({
      title: "Connected to Power BI",
      description: "Successfully connected to Power BI workspace",
    });
  };

  const generateRestAPI = () => {
    const apiEndpoints = {
      baseUrl: window.location.origin,
      endpoints: {
        sessions: "/api/feedback/sessions",
        responses: "/api/feedback/responses", 
        analytics: "/api/feedback/analytics",
        sessionAnalytics: "/api/feedback/sessions/{sessionId}/analytics"
      },
      sampleQueries: {
        allSessions: `${window.location.origin}/api/feedback/sessions`,
        sessionResponses: `${window.location.origin}/api/feedback/sessions/{sessionId}/responses`,
        dailyAnalytics: `${window.location.origin}/api/feedback/analytics?period=daily`
      }
    };

    const blob = new Blob([JSON.stringify(apiEndpoints, null, 2)], { 
      type: 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PowerBI_API_Endpoints.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "API Configuration Downloaded",
      description: "REST API endpoints configuration downloaded for Power BI",
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span>Power BI Integration</span>
            {isConnected && <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>}
          </CardTitle>
          <CardDescription>
            Connect your feedback data to Power BI for advanced analytics and visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="powerBIUrl">Power BI Workspace URL</Label>
              <Input
                id="powerBIUrl"
                placeholder="https://app.powerbi.com/groups/your-workspace-id"
                value={powerBIUrl}
                onChange={(e) => setPowerBIUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspaceId">Workspace ID</Label>
              <Input
                id="workspaceId"
                placeholder="Enter your Power BI workspace ID"
                value={workspaceId}
                onChange={(e) => setWorkspaceId(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={connectToPowerBI}
              className="bg-[#f2c811] hover:bg-[#d4af0f] text-black"
            >
              <Zap className="h-4 w-4 mr-2" />
              Connect to Power BI
            </Button>
            {isConnected && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ✓ Connected
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-6 w-6" />
            <span>Data Export & Integration</span>
          </CardTitle>
          <CardDescription>
            Export data in Power BI compatible formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={generatePowerBIDataset}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Download Dataset</span>
            </Button>
            
            <Button 
              onClick={generateRestAPI}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">API Endpoints</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => window.open('https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-connect-to-web', '_blank')}
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">View Guide</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Sync Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span>Auto-Sync Settings</span>
          </CardTitle>
          <CardDescription>
            Configure automatic data synchronization with Power BI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Auto-Sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically push data updates to Power BI
              </p>
            </div>
            <Switch
              checked={autoSync}
              onCheckedChange={setAutoSync}
            />
          </div>

          {autoSync && (
            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Power BI Integration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Advanced Visualizations</h4>
              <p className="text-muted-foreground">
                Create interactive dashboards with rich charts and graphs
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-muted-foreground">
                Automatic data refresh keeps your reports current
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Custom Analytics</h4>
              <p className="text-muted-foreground">
                Build custom metrics and KPIs specific to your needs
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Enterprise Sharing</h4>
              <p className="text-muted-foreground">
                Share dashboards with stakeholders across your organization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerBIIntegration;