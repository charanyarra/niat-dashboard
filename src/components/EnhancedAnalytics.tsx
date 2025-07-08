import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MapPin, Star, Calendar, Activity } from 'lucide-react';

interface EnhancedAnalyticsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const COLORS = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d'];
const LOCATION_COLORS = {
  'Pune': '#dc2626',
  'Hyderabad': '#ea580c', 
  'Noida': '#d97706'
};

const EnhancedAnalytics = ({ sessions, responses }: EnhancedAnalyticsProps) => {
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

  // Weekly trend data (mock data for demo)
  const weeklyTrendData = [
    { week: 'Week 1', responses: 12, rating: 4.2 },
    { week: 'Week 2', responses: 18, rating: 4.1 },
    { week: 'Week 3', responses: 25, rating: 4.5 },
    { week: 'Week 4', responses: 32, rating: 4.3 },
    { week: 'Week 5', responses: 28, rating: 4.6 }
  ];

  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => {
    const count = responses.reduce((acc, response) => {
      const responseRatings = Object.values(response.responses).filter(val => Number(val) === rating);
      return acc + responseRatings.length;
    }, 0);
    return { rating, count };
  });

  // Top insights
  const totalResponses = responses.length;
  const activeSessions = sessions.filter(s => s.is_active).length;
  const avgRating = responses.length > 0 
    ? responses.reduce((sum, response) => {
        const ratings = Object.values(response.responses).filter(val => !isNaN(Number(val)));
        const responseAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
        return sum + responseAvg;
      }, 0) / responses.length
    : 0;

  const mostActiveLocation = Object.entries(locationData).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
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
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Response Trend</CardTitle>
            <CardDescription>Response volume and average rating over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="responses" fill="#dc2626" name="Responses" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#ea580c" 
                  strokeWidth={3}
                  name="Avg Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
    </div>
  );
};

export default EnhancedAnalytics;