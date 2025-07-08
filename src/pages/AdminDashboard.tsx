
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Download, Eye, Lock, Users, Edit, Trash2, Search, Filter, FileText, Plus, Share2, Database, Settings, TrendingUp } from "lucide-react";
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
import { useFeedbackData } from "@/hooks/useFeedbackData";
import { useSessionManager } from "@/hooks/useSessionManager";
import SessionEditor from "@/components/SessionEditor";
import ShareableLinkManager from "@/components/ShareableLinkManager";
import ThemeToggle from "@/components/ThemeToggle";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import SessionAnalyticsDashboard from "@/components/SessionAnalyticsDashboard";
import DataManagementHub from "@/components/DataManagementHub";
import AdvancedDataHub from "@/components/AdvancedDataHub";
import PowerBIIntegration from "@/components/PowerBIIntegration";
import ProfessionalQRCode from "@/components/ProfessionalQRCode";
import AdminSettings from "@/components/AdminSettings";
import EnhancedAnalytics from "@/components/EnhancedAnalytics";
import AIInsights from "@/components/AIInsights";
import AIDashboard from "@/components/AIDashboard";
import AdvancedSettings from "@/components/AdvancedSettings";

// All available form names
const ALL_FORM_NAMES = [
  "Speed Math Workshop",
  "Tribe Huddle Session", 
  "Kaizen Workshop",
  "Personal Branding Workshop",
  "Community Building Session",
  "Gen AI Workshop",
  "Gen AI Video Submission",
  "IOT Workshop",
  "LinkedIn Workshop", 
  "Drone Workshop",
  "Tribeathon Event"
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [viewingSession, setViewingSession] = useState<any>(null);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showShareManager, setShowShareManager] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showDataManagement, setShowDataManagement] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState('ai-dashboard'); // ai-dashboard, sessions, analytics, data, settings, session-analytics, powerbi, enhanced-analytics, ai-insights, advanced-settings
  const [selectedAnalyticsSession, setSelectedAnalyticsSession] = useState<string>('');
  const { toast } = useToast();

  const {
    sessions,
    responses,
    loading,
    fetchSessions,
    fetchResponses,
    createSession,
    updateSession,
    deleteSession,
    exportToCSV
  } = useFeedbackData();

  const {
    initializePredefinedSessions,
    getPredefinedSessionsStatus,
    isInitializing
  } = useSessionManager();

  // Load saved config and initialize sessions on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('googleSheetsConfig');
    if (savedConfig) {
      // Auto-connect if config exists
    }
    
    // Initialize predefined sessions if not already created
    if (sessions.length > 0) {
      const status = getPredefinedSessionsStatus();
      if (status.missing > 0) {
        initializePredefinedSessions();
      }
    }
  }, [sessions.length]);

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

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (session: any) => {
    setEditingSession(session);
    setShowEditor(true);
  };

  const handleView = (session: any) => {
    setViewingSession(session);
    // Fetch responses for this specific session
    fetchResponses(session.id);
  };

  const handleExport = (sessionId: string, format: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const csvData = exportToCSV(sessionId);
    if (!csvData) {
      toast({
        title: "No Data to Export",
        description: "This session has no responses yet.",
        variant: "destructive"
      });
      return;
    }

    // Create and download CSV file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, '_')}_responses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${session.title} data exported successfully as CSV!`,
    });
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
    
    selectedSessions.forEach(sessionId => {
      handleExport(sessionId, 'CSV');
    });
  };

  const handleDelete = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
      toast({
        title: "Session Deleted",
        description: "Session has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete session.",
        variant: "destructive"
      });
    }
  };

  const handleSaveSession = async (sessionData: any) => {
    try {
      if (editingSession) {
        await updateSession(editingSession.id, sessionData);
        toast({
          title: "Session Updated",
          description: "Session has been updated successfully.",
        });
      } else {
        await createSession(sessionData);
        toast({
          title: "Session Created",
          description: "New session has been created successfully.",
        });
      }
      setShowEditor(false);
      setEditingSession(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save session.",
        variant: "destructive"
      });
    }
  };

  const toggleSessionSelection = (sessionId: string) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const getResponseCount = (sessionId: string) => {
    return responses.filter(r => r.session_id === sessionId).length;
  };

  const getAverageRating = (sessionId: string) => {
    const sessionResponses = responses.filter(r => r.session_id === sessionId);
    if (sessionResponses.length === 0) return 0;
    
    const ratings = sessionResponses.flatMap(response => 
      Object.values(response.responses).filter(val => typeof val === 'number')
    );
    
    return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
  };

  // Settings Component
  const SettingsPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive"
        });
        return;
      }
      if (newPassword.length < 6) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters long.",
          variant: "destructive"
        });
        return;
      }

      // In a real app, you'd send this to your backend
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
      setNewPassword("");
      setConfirmPassword("");
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Admin Password</CardTitle>
            <CardDescription>Update your admin access password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <Button type="submit" className="bg-red-900 hover:bg-red-800">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Forms</CardTitle>
            <CardDescription>All feedback forms in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_FORM_NAMES.map((formName, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{formName}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
            <CardContent className="p-8 bg-card">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-semibold">
                    Admin Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-input focus:border-primary focus:ring-primary"
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

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => {
                  setShowEditor(false);
                  setEditingSession(null);
                }}
                variant="outline"
                className="text-red-900 border-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <img 
                  src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                  alt="NIAT Logo" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <SessionEditor
          session={editingSession}
          onSave={handleSaveSession}
          onCancel={() => {
            setShowEditor(false);
            setEditingSession(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <img 
                src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                alt="NIAT Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button 
                onClick={() => setCurrentView('ai-dashboard')}
                variant={currentView === 'ai-dashboard' ? 'default' : 'outline'}
                className={currentView === 'ai-dashboard' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                AI Dashboard
              </Button>
              <Button 
                onClick={() => setCurrentView('sessions')}
                variant={currentView === 'sessions' ? 'default' : 'outline'}
                className={currentView === 'sessions' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Sessions
              </Button>
              <Button 
                onClick={() => setCurrentView('analytics')}
                variant={currentView === 'analytics' ? 'default' : 'outline'}
                className={currentView === 'analytics' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button 
                onClick={() => setCurrentView('session-analytics')}
                variant={currentView === 'session-analytics' ? 'default' : 'outline'}
                className={currentView === 'session-analytics' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Session Reports
              </Button>
              <Button 
                onClick={() => setCurrentView('powerbi')}
                variant={currentView === 'powerbi' ? 'default' : 'outline'}
                className={currentView === 'powerbi' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Power BI
              </Button>
              <Button 
                onClick={() => setCurrentView('data')}
                variant={currentView === 'data' ? 'default' : 'outline'}
                className={currentView === 'data' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <Database className="h-4 w-4 mr-2" />
                Data Hub
              </Button>
              <Button 
                onClick={() => setCurrentView('enhanced-analytics')}
                variant={currentView === 'enhanced-analytics' ? 'default' : 'outline'}
                className={currentView === 'enhanced-analytics' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Enhanced Analytics
              </Button>
              <Button 
                onClick={() => setCurrentView('advanced-data')}
                variant={currentView === 'advanced-data' ? 'default' : 'outline'}
                className={currentView === 'advanced-data' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Advanced Analytics
              </Button>
              <Button 
                onClick={() => setCurrentView('ai-insights')}
                variant={currentView === 'ai-insights' ? 'default' : 'outline'}
                className={currentView === 'ai-insights' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
              <Button 
                onClick={() => setCurrentView('settings')}
                variant={currentView === 'settings' ? 'default' : 'outline'}
                className={currentView === 'settings' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                onClick={() => setCurrentView('advanced-settings')}
                variant={currentView === 'advanced-settings' ? 'default' : 'outline'}
                className={currentView === 'advanced-settings' ? 'bg-white text-red-900' : 'text-red-900 border-white hover:bg-white/10'}
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
              <Button 
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="text-red-900 border-white hover:bg-white/10"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentView === 'ai-dashboard' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">AI-Powered Dashboard</h1>
            </div>
            <AIDashboard sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'advanced-settings' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Advanced Settings</h1>
            </div>
            <AdvancedSettings />
          </div>
        ) : currentView === 'sessions' ? (
          // Sessions content here
          <div>Sessions Management</div>
        ) : currentView === 'settings' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
            </div>
            <AdminSettings />
          </div>
        ) : currentView === 'data' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Data Management Hub</h1>
            </div>
            <DataManagementHub 
              sessions={sessions}
              responses={responses}
              onExport={handleExport}
            />
          </div>
        ) : currentView === 'analytics' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
            </div>
            <AnalyticsDashboard sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'session-analytics' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Session Analytics</h1>
            </div>
            <SessionAnalyticsDashboard sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'powerbi' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Power BI Integration</h1>
            </div>
            <PowerBIIntegration sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'ai-insights' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">AI Insights & Real-time Updates</h1>
            </div>
            <AIInsights sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'enhanced-analytics' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Enhanced Analytics</h1>
            </div>
            <EnhancedAnalytics sessions={sessions} responses={responses} />
          </div>
        ) : currentView === 'advanced-data' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Advanced Data Analytics</h1>
            </div>
            <AdvancedDataHub />
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Responses</p>
                      <p className="text-3xl font-bold text-red-900">{responses.length}</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-red-900" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                      <p className="text-3xl font-bold text-red-900">{sessions.filter(s => s.is_active).length}</p>
                    </div>
                    <Users className="h-10 w-10 text-red-900" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="text-3xl font-bold text-red-900">{sessions.length}</p>
                    </div>
                    <Eye className="h-10 w-10 text-red-900" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Form Types</p>
                      <p className="text-3xl font-bold text-red-900">{ALL_FORM_NAMES.length}</p>
                    </div>
                    <FileText className="h-10 w-10 text-red-900" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <Card className="shadow-lg border-0 mb-6">
              <CardContent className="p-6 bg-card">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search sessions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setShowEditor(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                    <Button 
                      onClick={handleBulkExport}
                      className="bg-red-900 hover:bg-red-800 text-white"
                      disabled={selectedSessions.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV ({selectedSessions.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sessions Table */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Session Management</CardTitle>
                <CardDescription className="text-red-100">
                  Comprehensive feedback session management with real-time data
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 bg-card">
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
                        <TableHead className="font-semibold text-black">Questions</TableHead>
                        <TableHead className="font-semibold text-black">Responses</TableHead>
                        <TableHead className="font-semibold text-black">Created</TableHead>
                        <TableHead className="font-semibold text-black">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            Loading sessions...
                          </TableCell>
                        </TableRow>
                      ) : filteredSessions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No sessions found. Create your first session!
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSessions.map((session) => (
                          <TableRow key={session.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedSessions.includes(session.id)}
                                onChange={() => toggleSessionSelection(session.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-black">{session.title}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                session.is_active 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {session.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                            <TableCell className="text-black">{session.questions.length}</TableCell>
                            <TableCell>
                              <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm font-medium">
                                {getResponseCount(session.id)}
                              </span>
                            </TableCell>
                            <TableCell className="text-black">
                              {new Date(session.created_at).toLocaleDateString()}
                            </TableCell>
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
                                  onClick={() => handleEdit(session)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                  onClick={() => setShowShareManager(session)}
                                >
                                  <Share2 className="h-4 w-4" />
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
                                        Are you sure you want to delete "{session.title}"? This will also delete all associated responses.
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
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Share Manager Modal */}
            {showShareManager && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowShareManager(null)}>
                <div className="bg-white rounded-lg max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                  <div className="p-6">
                    <ShareableLinkManager session={showShareManager} />
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => setShowShareManager(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Session Modal */}
            {viewingSession && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setViewingSession(null)}>
                <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-t-lg">
                    <h2 className="text-2xl font-bold">{viewingSession.title} - Responses</h2>
                    <p className="text-red-100">View and analyze feedback responses</p>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black">Total Responses</h3>
                        <p className="text-2xl font-bold text-red-900">{getResponseCount(viewingSession.id)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black">Questions</h3>
                        <p className="text-2xl font-bold text-red-900">{viewingSession.questions.length}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black">Avg. Rating</h3>
                        <p className="text-2xl font-bold text-red-900">★ {getAverageRating(viewingSession.id)}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-black mb-4">Recent Responses</h3>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {responses
                          .filter(r => r.session_id === viewingSession.id)
                          .slice(0, 10)
                          .map((response) => (
                            <div key={response.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-medium text-black">{response.user_name}</p>
                                  <p className="text-sm text-gray-600">{response.user_email} • {response.bootcamp_id}</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(response.submitted_at).toLocaleString()}
                                </p>
                              </div>
                              <div className="mt-2">
                                {Object.entries(response.responses).map(([questionId, answer]) => {
                                  const question = viewingSession.questions.find((q: any) => q.id === questionId);
                                  return (
                                    <div key={questionId} className="mb-2">
                                      <p className="text-sm font-medium text-gray-700">{question?.question}</p>
                                      <p className="text-sm text-black">{String(answer)}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="space-x-2">
                        <Button 
                          onClick={() => handleExport(viewingSession.id, 'CSV')}
                          className="bg-red-900 hover:bg-red-800 text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
