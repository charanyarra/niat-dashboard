import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Download, 
  MapPin,
  Users,
  BarChart3,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useFeedbackData } from '@/hooks/useFeedbackData';

const AdvancedDataHub = () => {
  const { sessions, responses } = useFeedbackData();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const getLocationStats = () => {
    const locationData: Record<string, number> = {};
    responses.forEach(response => {
      Object.values(response.responses).forEach(value => {
        if (typeof value === 'string' && ['Pune', 'Hyderabad', 'Noida'].includes(value)) {
          locationData[value] = (locationData[value] || 0) + 1;
        }
      });
    });
    return locationData;
  };

  const exportLocationBasedCSV = () => {
    const locationStats = getLocationStats();
    const headers = ['Session Name', 'Total Responses', 'Pune', 'Hyderabad', 'Noida', 'Average Rating'];
    
    const csvData = sessions.map(session => {
      const sessionResponses = responses.filter(r => r.session_id === session.id);
      const puneCount = sessionResponses.filter(r => 
        Object.values(r.responses).includes('Pune')
      ).length;
      const hyderabadCount = sessionResponses.filter(r => 
        Object.values(r.responses).includes('Hyderabad')
      ).length;
      const noidaCount = sessionResponses.filter(r => 
        Object.values(r.responses).includes('Noida')
      ).length;
      
      return [
        session.title,
        sessionResponses.length,
        puneCount,
        hyderabadCount,
        noidaCount,
        '4.2' // Mock average rating
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `location-based-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Location Analytics Exported",
      description: "Location-based data exported successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Advanced Data Analytics</span>
        </CardTitle>
        <CardDescription>
          Location-based insights and advanced analytics for your feedback system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{responses.length}</p>
                      <p className="text-sm text-muted-foreground">Total Responses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{sessions.length}</p>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Locations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">4.3</p>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(getLocationStats()).map(([location, count]) => (
                    <div key={location} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">{location}</span>
                      </div>
                      <Badge variant="secondary">{count} responses</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Filter by Location</Label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Locations</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Noida">Noida</option>
                </select>
              </div>

              <Button onClick={exportLocationBasedCSV} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Location-Based Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedDataHub;