
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';

interface AnalyticsDashboardProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
}

const COLORS = ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed'];

const AnalyticsDashboard = ({ sessions, responses }: AnalyticsDashboardProps) => {
  // Session response counts
  const sessionStats = sessions.map(session => ({
    name: session.title.substring(0, 20) + (session.title.length > 20 ? '...' : ''),
    responses: responses.filter(r => r.session_id === session.id).length,
    active: session.is_active ? 'Active' : 'Inactive'
  }));

  // Response trends over time
  const responseTrends = responses.reduce((acc, response) => {
    const date = new Date(response.submitted_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trendData = Object.entries(responseTrends)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7) // Last 7 days
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

  const totalResponses = responses.length;
  const averageRating = responses.length > 0 
    ? responses.reduce((acc, response) => {
        const ratings = Object.values(response.responses).filter(val => typeof val === 'number') as number[];
        const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        return acc + avgRating;
      }, 0) / responses.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{totalResponses}</div>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{sessions.length}</div>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{sessions.filter(s => s.is_active).length}</div>
            <p className="text-sm text-muted-foreground">Active Sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Response Counts */}
        <Card>
          <CardHeader>
            <CardTitle>Responses by Session</CardTitle>
            <CardDescription>Number of responses received per session</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
            <CardDescription>Distribution of active vs inactive sessions</CardDescription>
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Trends */}
        {trendData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
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

        {/* Rating Distribution */}
        {ratingData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Distribution of ratings across all responses</CardDescription>
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
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
