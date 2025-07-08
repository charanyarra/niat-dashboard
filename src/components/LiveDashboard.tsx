import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Users, TrendingUp, MapPin, Clock, Activity, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const LiveDashboard = () => {
  const [liveStats, setLiveStats] = useState({
    totalResponses: 0,
    todayResponses: 0,
    activeLocations: 0,
    averageRating: 0,
    responseRate: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);

  useEffect(() => {
    fetchLiveStats();
    fetchRecentActivity();
    fetchHourlyData();
    fetchLocationData();

    // Set up real-time updates
    const channel = supabase
      .channel('live-dashboard')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_responses'
        },
        () => {
          // Refresh stats when new response comes in
          fetchLiveStats();
          fetchRecentActivity();
          fetchHourlyData();
          fetchLocationData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLiveStats = async () => {
    try {
      const { data: responses, error } = await supabase
        .from('feedback_responses')
        .select('*');

      if (error) throw error;

      const today = new Date().toDateString();
      const todayResponses = responses?.filter(r => 
        new Date(r.submitted_at).toDateString() === today
      ).length || 0;

      const locations = new Set(
        responses?.map(r => r.responses?.location).filter(Boolean) || []
      );

      const ratings = responses?.flatMap(r => 
        Object.values(r.responses || {}).filter(val => typeof val === 'number')
      ) || [];
      
      const avgRating = ratings.length > 0 
        ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length 
        : 0;

      setLiveStats({
        totalResponses: responses?.length || 0,
        todayResponses,
        activeLocations: locations.size,
        averageRating: Number(avgRating.toFixed(1)),
        responseRate: Math.min((todayResponses / 50) * 100, 100) // Mock calculation
      });
    } catch (error) {
      console.error('Error fetching live stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const { data: responses, error } = await supabase
        .from('feedback_responses')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentActivity(responses || []);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const fetchHourlyData = async () => {
    try {
      const { data: responses, error } = await supabase
        .from('feedback_responses')
        .select('submitted_at')
        .gte('submitted_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      // Group by hour
      const hourlyMap = new Map();
      responses?.forEach(r => {
        const hour = new Date(r.submitted_at).getHours();
        hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
      });

      const hourlyArray = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        responses: hourlyMap.get(i) || 0
      }));

      setHourlyData(hourlyArray);
    } catch (error) {
      console.error('Error fetching hourly data:', error);
    }
  };

  const fetchLocationData = async () => {
    try {
      const { data: responses, error } = await supabase
        .from('feedback_responses')
        .select('responses');

      if (error) throw error;

      const locationMap = new Map();
      responses?.forEach(r => {
        const location = r.responses?.location;
        if (location) {
          locationMap.set(location, (locationMap.get(location) || 0) + 1);
        }
      });

      const locationArray = Array.from(locationMap.entries()).map(([location, count]) => ({
        location,
        count
      }));

      setLocationData(locationArray);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold text-primary">{liveStats.totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-green-600">{liveStats.todayResponses}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="text-2xl font-bold text-blue-600">{liveStats.activeLocations}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{liveStats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-purple-600">{liveStats.responseRate.toFixed(1)}%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Activity</CardTitle>
            <CardDescription>Response submissions by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responses" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Location Distribution</CardTitle>
            <CardDescription>Responses by location</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
            <Badge className="bg-green-600">Live</Badge>
          </CardTitle>
          <CardDescription>Latest feedback submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">{activity.user_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.responses?.location || 'Unknown Location'} • {activity.bootcamp_id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.submitted_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDashboard;