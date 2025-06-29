
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Download, Eye, Lock, Users, Edit, Trash2, Search, Filter, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [viewingSession, setViewingSession] = useState<any>(null);
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
    { id: 1, name: "Speed Math", responses: 25, lastResponse: "2 hours ago", status: "Active", avgRating: 4.2 },
    { id: 2, name: "Tribe-huddle", responses: 18, lastResponse: "1 day ago", status: "Active", avgRating: 4.5 },
    { id: 3, name: "Kaizen", responses: 22, lastResponse: "3 hours ago", status: "Active", avgRating: 4.1 },
    { id: 4, name: "Personal Branding", responses: 31, lastResponse: "5 hours ago", status: "Active", avgRating: 4.3 },
    { id: 5, name: "Community Building", responses: 19, lastResponse: "1 day ago", status: "Active", avgRating: 4.0 },
    { id: 6, name: "Gen AI Feedback", responses: 28, lastResponse: "30 minutes ago", status: "Active", avgRating: 4.4 },
    { id: 7, name: "Gen AI Video Submission", responses: 15, lastResponse: "4 hours ago", status: "Draft", avgRating: 4.2 },
    { id: 8, name: "IOT Workshop", responses: 21, lastResponse: "6 hours ago", status: "Active", avgRating: 4.1 },
    { id: 9, name: "LinkedIn Workshop", responses: 26, lastResponse: "2 hours ago", status: "Active", avgRating: 4.3 },
    { id: 10, name: "Drone Workshop", responses: 17, lastResponse: "1 day ago", status: "Active", avgRating: 4.0 },
    { id: 11, name: "Tribeathon", responses: 33, lastResponse: "1 hour ago", status: "Active", avgRating: 4.6 }
  ];

  const sampleFeedbackData = [
    { id: 1, name: "John Doe", email: "john@example.com", bootcampId: "BC001", rating: 5, feedback: "Excellent session!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", bootcampId: "BC002", rating: 4, feedback: "Very informative and well structured." },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", bootcampId: "BC003", rating: 4, feedback: "Good content, could use more examples." }
  ];

  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (sessionId: number) => {
    toast({
      title: "Edit Session",
      description: `Editing session ${sessionId}. Redirecting to edit form...`,
    });
  };

  const handleView = (session: any) => {
    setViewingSession(session);
  };

  const handleExport = (sessionId: number, format: string) => {
    const session = sessions.find(s => s.id === sessionId);
    toast({
      title: "Export Started",
      description: `Exporting ${session?.name} data in ${format} format...`,
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${session?.name} data exported successfully!`,
      });
    }, 2000);
  };

  const handleBulkExport = () => {
    if (selectedSessions.length === 0) {
      toast({
        title: "No Sessions Selected",
        description: "Please select sessions to export.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Bulk Export Started",
      description: `Exporting ${selectedSessions.length} sessions...`,
    });
  };

  const handleDelete = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    toast({
      title: "Session Deleted",
      description: `${session?.name} has been deleted successfully.`,
    });
  };

  const toggleSessionSelection = (sessionId: number) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Lock className="h-6 w-6" />
                <span>Admin Access</span>
              </CardTitle>
              <CardDescription className="text-red-100">
                Enter the admin password to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black font-semibold">
                    Admin Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:border-red-900 focus:ring-red-900"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Access Dashboard
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/" className="text-red-900 hover:text-red-700 text-sm flex items-center justify-center space-x-1">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                alt="NIAT Logo" 
                className="h-8 w-auto"
              />
            </div>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="text-red-900 border-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">Total Responses</p>
                  <p className="text-3xl font-bold text-red-900">
                    {sessions.reduce((total, session) => total + session.responses, 0)}
                  </p>
                </div>
                <BarChart3 className="h-10 w-10 text-red-900" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">Active Sessions</p>
                  <p className="text-3xl font-bold text-red-900">{sessions.filter(s => s.status === 'Active').length}</p>
                </div>
                <Users className="h-10 w-10 text-red-900" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">Avg. Rating</p>
                  <p className="text-3xl font-bold text-red-900">
                    {(sessions.reduce((total, session) => total + session.avgRating, 0) / sessions.length).toFixed(1)}
                  </p>
                </div>
                <Eye className="h-10 w-10 text-red-900" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">Draft Sessions</p>
                  <p className="text-3xl font-bold text-red-900">{sessions.filter(s => s.status === 'Draft').length}</p>
                </div>
                <FileText className="h-10 w-10 text-red-900" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Bulk Actions */}
        <Card className="shadow-lg border-0 mb-6">
          <CardContent className="p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="border-red-900 text-red-900 hover:bg-red-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleBulkExport}
                  className="bg-red-900 hover:bg-red-800 text-white"
                  disabled={selectedSessions.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Bulk Export ({selectedSessions.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Session Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Session Management</CardTitle>
            <CardDescription className="text-red-100">
              Manage feedback sessions with advanced controls
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSessions(filteredSessions.map(s => s.id));
                          } else {
                            setSelectedSessions([]);
                          }
                        }}
                        checked={selectedSessions.length === filteredSessions.length && filteredSessions.length > 0}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-black">Session Name</TableHead>
                    <TableHead className="font-semibold text-black">Status</TableHead>
                    <TableHead className="font-semibold text-black">Responses</TableHead>
                    <TableHead className="font-semibold text-black">Avg. Rating</TableHead>
                    <TableHead className="font-semibold text-black">Last Response</TableHead>
                    <TableHead className="font-semibold text-black">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedSessions.includes(session.id)}
                          onChange={() => toggleSessionSelection(session.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-black">{session.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm font-medium">
                          {session.responses}
                        </span>
                      </TableCell>
                      <TableCell className="text-black">★ {session.avgRating}</TableCell>
                      <TableCell className="text-black">{session.lastResponse}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            className="bg-red-900 hover:bg-red-800 text-white"
                            onClick={() => handleView(session)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-900 text-red-900 hover:bg-red-50"
                            onClick={() => handleEdit(session.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-900 text-red-900 hover:bg-red-50"
                            onClick={() => handleExport(session.id, 'CSV')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Session</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{session.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(session.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Session Modal */}
        {viewingSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setViewingSession(null)}>
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold">{viewingSession.name} - Detailed View</h2>
                <p className="text-red-100">Session feedback responses and analytics</p>
              </div>
              <div className="p-6">
                {/* Session Stats */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-black">Total Responses</h3>
                    <p className="text-2xl font-bold text-red-900">{viewingSession.responses}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-black">Average Rating</h3>
                    <p className="text-2xl font-bold text-red-900">★ {viewingSession.avgRating}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-black">Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      viewingSession.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {viewingSession.status}
                    </span>
                  </div>
                </div>

                {/* Sample Feedback Data */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Recent Feedback</h3>
                  <div className="space-y-4">
                    {sampleFeedbackData.map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-black">{feedback.name}</p>
                            <p className="text-sm text-gray-600">{feedback.email} • {feedback.bootcampId}</p>
                          </div>
                          <div className="text-yellow-500">
                            {'★'.repeat(feedback.rating)}{'☆'.repeat(5-feedback.rating)}
                          </div>
                        </div>
                        <p className="text-black">{feedback.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="space-x-2">
                    <Button 
                      onClick={() => handleExport(viewingSession.id, 'CSV')}
                      className="bg-red-900 hover:bg-red-800 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button 
                      onClick={() => handleExport(viewingSession.id, 'PDF')}
                      variant="outline"
                      className="border-red-900 text-red-900 hover:bg-red-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                  <Button 
                    onClick={() => setViewingSession(null)}
                    variant="outline"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integration Info */}
        <Card className="mt-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-black mb-2">System Features</h3>
            <p className="text-black mb-4">
              Advanced admin dashboard with comprehensive session management, real-time analytics, and export capabilities.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✓ Bulk Operations</span>
              <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm">✓ Real-time Analytics</span>
              <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">✓ Advanced Search</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">✓ Multiple Export Formats</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
