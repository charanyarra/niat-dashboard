
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Download, Eye, GraduationCap, Lock, Users } from "lucide-react";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: "Welcome to the Admin Dashboard!",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const sessions = [
    { name: "Speed Math", responses: 25, lastResponse: "2 hours ago" },
    { name: "Tribe-huddle", responses: 18, lastResponse: "1 day ago" },
    { name: "Kaizen", responses: 22, lastResponse: "3 hours ago" },
    { name: "Personal Branding", responses: 31, lastResponse: "5 hours ago" },
    { name: "Community Building", responses: 19, lastResponse: "1 day ago" },
    { name: "Gen AI Feedback", responses: 28, lastResponse: "30 minutes ago" },
    { name: "Gen AI Video Submission", responses: 15, lastResponse: "4 hours ago" },
    { name: "IOT Workshop", responses: 21, lastResponse: "6 hours ago" },
    { name: "LinkedIn Workshop", responses: 26, lastResponse: "2 hours ago" },
    { name: "Drone Workshop", responses: 17, lastResponse: "1 day ago" },
    { name: "Tribeathon", responses: 33, lastResponse: "1 hour ago" }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Lock className="h-6 w-6" />
                <span>Admin Access</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Enter the admin password to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">
                    Admin Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Access Dashboard
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/" className="text-purple-600 hover:text-purple-800 text-sm flex items-center justify-center space-x-1">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-purple-100">NIAT Bootcamp Feedback System</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="text-purple-600 border-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {sessions.reduce((total, session) => total + session.responses, 0)}
                  </p>
                </div>
                <BarChart3 className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Sessions</p>
                  <p className="text-3xl font-bold text-green-600">{sessions.length}</p>
                </div>
                <Users className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. per Session</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(sessions.reduce((total, session) => total + session.responses, 0) / sessions.length)}
                  </p>
                </div>
                <Eye className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Responses Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Session Feedback Overview</CardTitle>
            <CardDescription className="text-blue-100">
              View and manage feedback responses for all bootcamp sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">Session Name</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Responses</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Last Response</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{session.name}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {session.responses}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{session.lastResponse}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => toast({ title: "Feature Coming Soon", description: "Response viewing will be available in the next update." })}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => toast({ title: "Feature Coming Soon", description: "Export functionality will be available in the next update." })}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Integration Info */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Sheets Integration</h3>
            <p className="text-gray-600 mb-4">
              All feedback responses are automatically stored in separate Google Sheets for each session. 
              The integration allows for real-time data collection and easy analysis.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✓ Real-time sync</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">✓ Separate sheets per session</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">✓ Automated backup</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
