import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from 'recharts';
import { TrendingUp, Users, MapPin, Star, Calendar, Activity, BarChart3, PieChart as PieChartIcon, AlertTriangle } from 'lucide-react';

interface CombinedAnalyticsProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const COLORS = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d'];
const LOCATION_COLORS = {
  'Pune': '#dc2626',
  'Hyderabad': '#ea580c', 
  'Noida': '#d97706'
};

const CombinedAnalytics = ({ sessions, responses }: CombinedAnalyticsProps) => {
  // Enhanced Analytics Data
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

  // Session-wise analytics
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
      title: session.title.length > 15 ? session.title.substring(0, 15) + '...' : session.title,
      responses: sessionResponses.length,
      rating: Number(avgRating.toFixed(1)),
      active: session.is_active ? 'Active' : 'Inactive'
    };
  }).sort((a, b) => b.responses - a.responses);

  // Advanced Data Hub Analytics
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

  // Weekly trend data
  const responseTrends = responses.reduce((acc, response) => {
    const date = new Date(response.submitted_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trendData = Object.entries(responseTrends)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7)
    .map(([date, count]) => ({ date, responses: count }));

  // Rating distribution
  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
    rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
    count: responses.reduce((acc, response) => {
      const ratings = Object.values(response.responses).filter(val => typeof val === 'number' && val === rating);
      return acc + ratings.length;
    }, 0)
  })).filter(item => item.count > 0);

  // Session status distribution
  const statusData = [
    { name: 'Active', value: sessions.filter(s => s.is_active).length },
    { name: 'Inactive', value: sessions.filter(s => !s.is_active).length }
  ];

  // KPI calculations
  const totalResponses = responses.length;
  const activeSessions = sessions.filter(s => s.is_active).length;
  const averageRating = responses.length > 0 
    ? responses.reduce((sum, response) => {
        const ratings = Object.values(response.responses).filter(val => !isNaN(Number(val)));
        const responseAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + Number(b), 0) / ratings.length : 0;
        return sum + responseAvg;
      }, 0) / responses.length
    : 0;

  const mostActiveLocation = Object.entries(locationData).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  const locationStats = getLocationStats();

  return (
    <div className="space-y-6">
      {/* Header with AI Credit Warning */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800">AI Credits Limited</p>
              <p className="text-sm text-orange-700">AI summaries and insights have usage limits. Use wisely for best analysis.</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
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

      {/* Charts Row 1 - Session Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Session Response Distribution</span>
            </CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Session Status Distribution</span>
            </CardTitle>
            <CardDescription>Active vs inactive sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 - Location & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Location Distribution</span>
            </CardTitle>
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

        {trendData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Response Trends</span>
              </CardTitle>
              <CardDescription>Daily response submissions (Last 7 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responses" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Row 3 - Rating Analysis */}
      {ratingData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Rating Distribution</span>
              </CardTitle>
              <CardDescription>Distribution of all ratings given</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Breakdown</CardTitle>
              <CardDescription>Response distribution by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(locationStats).map(([location, count]) => (
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
        </div>
      )}

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
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        session.active === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {session.active}
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

export default CombinedAnalytics;