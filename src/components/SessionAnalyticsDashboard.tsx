import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { TrendingUp, Users, Star, MapPin, Calendar, Download } from 'lucide-react';

interface SessionAnalyticsDashboardProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const COLORS = ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed'];

const SessionAnalyticsDashboard = ({ sessions, responses }: SessionAnalyticsDashboardProps) => {
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0]?.id || '');

  const getCurrentSession = () => {
    return sessions.find(s => s.id === selectedSession);
  };

  const getSessionResponses = () => {
    return responses.filter(r => r.session_id === selectedSession);
  };

  const getSessionMetrics = () => {
    const sessionResponses = getSessionResponses();
    const session = getCurrentSession();

    if (!session) return null;

    // Calculate metrics
    const totalResponses = sessionResponses.length;
    const averageRating = sessionResponses.length > 0 
      ? sessionResponses.reduce((acc, response) => {
          const ratings = Object.values(response.responses).filter(val => typeof val === 'number') as number[];
          const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
          return acc + avgRating;
        }, 0) / sessionResponses.length
      : 0;

    // Response rate (assuming we have some target or total invited)
    const responseRate = Math.min((totalResponses / Math.max(totalResponses, 50)) * 100, 100);

    // Completion rate
    const completedResponses = sessionResponses.filter(r => 
      Object.keys(r.responses).length >= (session.questions?.length || 1)
    ).length;
    const completionRate = totalResponses > 0 ? (completedResponses / totalResponses) * 100 : 0;

    return {
      totalResponses,
      averageRating: averageRating.toFixed(1),
      responseRate: responseRate.toFixed(1),
      completionRate: completionRate.toFixed(1)
    };
  };

  const getLocationData = () => {
    const sessionResponses = getSessionResponses();
    const locationCounts = { 'Pune': 0, 'Hyderabad': 0, 'Noida': 0 };

    sessionResponses.forEach(response => {
      Object.values(response.responses).forEach(answer => {
        if (typeof answer === 'string' && locationCounts.hasOwnProperty(answer)) {
          locationCounts[answer as keyof typeof locationCounts]++;
        }
      });
    });

    return Object.entries(locationCounts).map(([location, count]) => ({
      location,
      count,
      percentage: sessionResponses.length > 0 ? ((count / sessionResponses.length) * 100).toFixed(1) : 0
    }));
  };

  const getRatingDistribution = () => {
    const sessionResponses = getSessionResponses();
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    sessionResponses.forEach(response => {
      Object.values(response.responses).forEach(answer => {
        if (typeof answer === 'number' && answer >= 1 && answer <= 5) {
          ratingCounts[answer as keyof typeof ratingCounts]++;
        }
      });
    });

    return Object.entries(ratingCounts).map(([rating, count]) => ({
      rating: `${rating} Star${rating !== '1' ? 's' : ''}`,
      count,
      value: parseInt(rating)
    }));
  };

  const getResponseTrends = () => {
    const sessionResponses = getSessionResponses();
    const dateMap = new Map();

    sessionResponses.forEach(response => {
      const date = new Date(response.submitted_at).toLocaleDateString();
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });

    return Array.from(dateMap.entries())
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, count]) => ({ date, responses: count, cumulative: 0 }))
      .map((item, index, array) => ({
        ...item,
        cumulative: array.slice(0, index + 1).reduce((sum, curr) => sum + curr.responses, 0)
      }));
  };

  const downloadSessionReport = () => {
    const session = getCurrentSession();
    const sessionResponses = getSessionResponses();
    const metrics = getSessionMetrics();

    if (!session || !metrics) return;

    const report = {
      sessionInfo: {
        title: session.title,
        description: session.description,
        createdAt: session.created_at,
        isActive: session.is_active
      },
      metrics,
      locationData: getLocationData(),
      ratingDistribution: getRatingDistribution(),
      responseTrends: getResponseTrends(),
      responses: sessionResponses
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, '_')}_Analytics_Report.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const metrics = getSessionMetrics();
  const currentSession = getCurrentSession();

  if (!currentSession || !metrics) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No session data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Session Analytics Dashboard</CardTitle>
              <CardDescription>Detailed analytics for individual sessions</CardDescription>
            </div>
            <Button onClick={downloadSessionReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(session => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant={currentSession.is_active ? "default" : "secondary"}>
              {currentSession.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold text-primary">{metrics.totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold text-primary">{metrics.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-primary">{metrics.responseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-primary">{metrics.completionRate}%</p>
              </div>
              <Calendar className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Summary</CardTitle>
                <CardDescription>{currentSession.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Responses:</span>
                    <Badge>{metrics.totalResponses}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Rating:</span>
                    <Badge variant="outline">{metrics.averageRating}/5.0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Status:</span>
                    <Badge variant={currentSession.is_active ? "default" : "secondary"}>
                      {currentSession.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Rate</span>
                      <span>{metrics.responseRate}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${metrics.responseRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{metrics.completionRate}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${metrics.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>How participants rated this session</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getRatingDistribution()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Analytics</span>
              </CardTitle>
              <CardDescription>Response distribution by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getLocationData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ location, percentage }) => `${location}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {getLocationData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {getLocationData().map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{location.location}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{location.count}</p>
                        <p className="text-sm text-muted-foreground">{location.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
              <CardDescription>Response patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getResponseTrends()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="cumulative" 
                    stroke="#dc2626" 
                    fill="#dc2626" 
                    fillOpacity={0.3}
                    name="Cumulative Responses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionAnalyticsDashboard;