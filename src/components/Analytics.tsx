import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { TrendingUp, Users, Star, MapPin, Calendar, Download, Eye, Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface AnalyticsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const COLORS = ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed'];
const LOCATION_COLORS = {
  'Pune': '#dc2626',
  'Hyderabad': '#ea580c', 
  'Noida': '#d97706'
};

const Analytics = ({ sessions, responses }: AnalyticsProps) => {
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0]?.id || '');

  // Overall Analytics Data
  const totalResponses = responses.length;
  const activeSessions = sessions.filter(s => s.is_active).length;
  const avgRating = responses.length > 0 
    ? responses.reduce((sum, response) => {
        const ratings = Object.values(response.responses).filter(val => !isNaN(Number(val)));
        const responseAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
        return sum + responseAvg;
      }, 0) / responses.length
    : 0;

  // Location-wise distribution
  const locationData = responses.reduce((acc, response) => {
    const location = response.responses.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationChartData = Object.entries(locationData).map(([location, count]) => ({
    location,
    count,
    percentage: ((count / responses.length) * 100).toFixed(1)
  }));

  const mostActiveLocation = Object.entries(locationData).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  // Session-wise response count
  const sessionResponseData = sessions.map(session => {
    const sessionResponses = responses.filter(r => r.session_id === session.id);
    const avgRating = sessionResponses.length > 0 
      ? sessionResponses.reduce((sum, response) => {
          const ratings = Object.values(response.responses).filter(val => typeof val === 'string' && !isNaN(Number(val)));
          const sessionAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
          return sum + sessionAvg;
        }, 0) / sessionResponses.length
      : 0;

    return {
      title: session.title.length > 20 ? session.title.substring(0, 20) + '...' : session.title,
      responses: sessionResponses.length,
      rating: Number(avgRating.toFixed(1))
    };
  }).sort((a, b) => b.responses - a.responses);

  // Weekly trend data (based on actual responses)
  const weeklyTrendData = responses.reduce((acc, response) => {
    const date = new Date(response.submitted_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trendData = Object.entries(weeklyTrendData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7) // Last 7 days
    .map(([date, count]) => ({ date, responses: count, rating: 4.2 }));

  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => {
    const count = responses.reduce((acc, response) => {
      const responseRatings = Object.values(response.responses).filter(val => Number(val) === rating);
      return acc + responseRatings.length;
    }, 0);
    return { rating, count };
  });

  // Session-specific analytics
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

    const totalResponses = sessionResponses.length;
    const averageRating = sessionResponses.length > 0 
      ? sessionResponses.reduce((acc, response) => {
          const ratings = Object.values(response.responses).filter(val => typeof val === 'number') as number[];
          const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
          return acc + avgRating;
        }, 0) / sessionResponses.length
      : 0;

    const responseRate = Math.min((totalResponses / Math.max(totalResponses, 50)) * 100, 100);
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

  const getLocationDataForSession = () => {
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

  const getRatingDistributionForSession = () => {
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
      locationData: getLocationDataForSession(),
      ratingDistribution: getRatingDistributionForSession(),
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

  return (
    <div className="space-y-6">
      {/* Analytics Header with Theme Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and session analytics</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Overall KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold text-primary">{totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-green-600">{activeSessions}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Location</p>
                <p className="text-2xl font-bold text-blue-600">{mostActiveLocation}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Session Response Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Session Response Distribution</CardTitle>
                <CardDescription>Number of responses per session</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sessionResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="title" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="responses" fill="#dc2626" />
                  </BarChart>
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
                  <PieChart>
                    <Pie
                      data={locationChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ location, percentage }) => `${location} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {locationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={LOCATION_COLORS[entry.location] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Trends */}
            {trendData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Response Trends</CardTitle>
                  <CardDescription>Response volume over time (Last 7 days)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="responses" stroke="#dc2626" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Distribution of all ratings given</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#d97706" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          {/* Session Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Session Analytics Dashboard</CardTitle>
                  <CardDescription>Detailed analytics for individual sessions</CardDescription>
                </div>
                <Button onClick={downloadSessionReport} variant="outline" disabled={!currentSession}>
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
                {currentSession && (
                  <Badge variant={currentSession.is_active ? "default" : "secondary"}>
                    {currentSession.is_active ? "Active" : "Inactive"}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {metrics && currentSession && (
            <>
              {/* Session Key Metrics */}
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

              {/* Session Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Distribution</CardTitle>
                    <CardDescription>How participants rated this session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getRatingDistributionForSession()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#dc2626" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Location Analytics</span>
                    </CardTitle>
                    <CardDescription>Response distribution by location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getLocationDataForSession()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ location, percentage }) => `${location}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {getLocationDataForSession().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          {/* Session Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Session Performance Summary</CardTitle>
              <CardDescription>Detailed performance metrics for each session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Session</th>
                      <th className="text-left p-2">Responses</th>
                      <th className="text-left p-2">Avg Rating</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionResponseData.map((session, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{session.title}</td>
                        <td className="p-2">{session.responses}</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            session.rating >= 4 ? 'bg-green-100 text-green-800' :
                            session.rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {session.rating || 'N/A'}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="text-green-600">
                            {session.responses > 0 ? '100%' : '0%'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;