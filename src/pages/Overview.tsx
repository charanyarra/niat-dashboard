import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeedbackData } from '@/hooks/useFeedbackData';
import { 
  Users, 
  Calendar, 
  MapPin, 
  BarChart3, 
  TrendingUp,
  Activity,
  Clock,
  Star,
  MessageSquare,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AIDashboard from '@/components/AIDashboard';

const Overview = () => {
  const { sessions, responses, loading } = useFeedbackData();

  // Calculate key metrics
  const totalResponses = responses.length;
  const activeSessions = sessions.filter(s => s.is_active).length;
  const uniqueLocations = [...new Set(responses.map(r => r.responses.location).filter(Boolean))].length;
  
  const avgRating = responses.length > 0 
    ? responses.reduce((sum, response) => {
        const ratings = Object.values(response.responses).filter(val => !isNaN(Number(val)));
        const responseAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
        return sum + responseAvg;
      }, 0) / responses.length
    : 0;

  // Recent activity
  const recentResponses = responses.slice(0, 5);
  
  // Location breakdown
  const locationStats = responses.reduce((acc, response) => {
    const location = response.responses.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top performing sessions
  const sessionStats = sessions.map(session => {
    const sessionResponses = responses.filter(r => r.session_id === session.id);
    const avgRating = sessionResponses.length > 0 
      ? sessionResponses.reduce((sum, response) => {
          const ratings = Object.values(response.responses).filter(val => typeof val === 'string' && !isNaN(Number(val)));
          const sessionAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
          return sum + sessionAvg;
        }, 0) / sessionResponses.length
      : 0;

    return {
      ...session,
      responseCount: sessionResponses.length,
      avgRating: Number(avgRating.toFixed(1))
    };
  }).sort((a, b) => b.responseCount - a.responseCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Feedback Analytics Overview</h1>
            <p className="text-red-100 text-lg">Real-time insights and AI-powered analytics dashboard</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Total Responses</p>
                    <p className="text-3xl font-bold text-blue-900">{totalResponses}</p>
                    <p className="text-sm text-blue-700">Across all sessions</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full">
                    <Users className="h-8 w-8 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Active Sessions</p>
                    <p className="text-3xl font-bold text-green-900">{activeSessions}</p>
                    <p className="text-sm text-green-700">Currently running</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-full">
                    <Activity className="h-8 w-8 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600 mb-1">Average Rating</p>
                    <p className="text-3xl font-bold text-yellow-900">{avgRating.toFixed(1)}</p>
                    <p className="text-sm text-yellow-700">Out of 5.0</p>
                  </div>
                  <div className="p-3 bg-yellow-200 rounded-full">
                    <Star className="h-8 w-8 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Locations</p>
                    <p className="text-3xl font-bold text-purple-900">{uniqueLocations}</p>
                    <p className="text-sm text-purple-700">Active cities</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-full">
                    <MapPin className="h-8 w-8 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Dashboard Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span>AI-Powered Insights Dashboard</span>
                <Badge className="bg-purple-100 text-purple-800">AI Enhanced</Badge>
              </CardTitle>
              <CardDescription>
                Intelligent analysis and predictions powered by advanced AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIDashboard sessions={sessions} responses={responses} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-4">Deep dive into your feedback data</p>
                <Link to="/admin">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Live Responses</h3>
                <p className="text-muted-foreground mb-4">Monitor real-time feedback</p>
                <Link to="/admin">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Live Feed
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">AI Reports</h3>
                <p className="text-muted-foreground mb-4">Generate intelligent insights</p>
                <Link to="/ai-reports">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Generate Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Top Sessions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Top Performing Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionStats.slice(0, 5).map((session, index) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{session.title}</h4>
                          <p className="text-xs text-muted-foreground">{session.responseCount} responses</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          ⭐ {session.avgRating || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResponses.map((response, index) => (
                    <div key={response.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{response.user_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {response.responses.location || 'Unknown'} • {new Date(response.submitted_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <span>Location Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(locationStats).map(([location, count]) => (
                  <div key={location} className="p-4 bg-muted/50 rounded-lg text-center">
                    <h3 className="font-bold text-lg">{location}</h3>
                    <p className="text-2xl font-bold text-primary">{count}</p>
                    <p className="text-sm text-muted-foreground">
                      {((count / totalResponses) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;