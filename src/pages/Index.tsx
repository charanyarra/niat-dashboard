
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                alt="NIAT Logo" 
                className="h-16 w-auto"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Real-time Status Indicator */}
      <div className="bg-green-50 border-b border-green-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">System Online - Real-time Feedback Collection Active</span>
          </div>
        </div>
      </div>

      {/* Enhanced Welcome Section with Stats */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-4">
              Real-time Feedback Analytics Platform
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Advanced feedback collection system with AI-powered insights, real-time analytics, 
              and comprehensive reporting across multiple locations.
            </p>
            
            {/* Live Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="text-3xl font-bold text-red-900 mb-2">12+</div>
                <div className="text-sm text-gray-600">Workshop Types</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="text-3xl font-bold text-red-900 mb-2">3</div>
                <div className="text-sm text-gray-600">Active Locations</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="text-3xl font-bold text-red-900 mb-2">AI</div>
                <div className="text-sm text-gray-600">Powered Analytics</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="text-3xl font-bold text-red-900 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Real-time Collection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Feedback Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Student Feedback</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  Share your experience and help us improve
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-4">
                  <p className="text-black">
                    Provide feedback for your attended sessions, rate your experience, 
                    and help us make our bootcamps even better.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Available Sessions:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">• Speed Math</span>
                      <span className="text-gray-600">• Gen AI Workshop</span>
                      <span className="text-gray-600">• Blockchain</span>
                      <span className="text-gray-600">• IoT Workshop</span>
                      <span className="text-gray-600">• Drone Tech</span>
                      <span className="text-gray-600">• LinkedIn</span>
                    </div>
                  </div>
                </div>
                <Link to="/session-selector">
                  <Button className="w-full mt-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Start Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Access Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  Real-time analytics and management
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-4">
                  <p className="text-black">
                    Access comprehensive feedback reports, AI-powered analytics, 
                    real-time dashboards, and system management.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Features:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">• Live Analytics</span>
                      <span className="text-gray-600">• AI Insights</span>
                      <span className="text-gray-600">• Power BI</span>
                      <span className="text-gray-600">• Data Export</span>
                      <span className="text-gray-600">• Real-time</span>
                      <span className="text-gray-600">• Multi-location</span>
                    </div>
                  </div>
                </div>
                <Link to="/admin">
                  <Button className="w-full mt-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Admin Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Advanced Feedback Analytics Platform
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Real-time Collection</h4>
                <p className="text-black text-sm">
                  Live feedback streaming with instant notifications and real-time dashboard updates
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-black" />
                </div>
                <h4 className="font-semibold text-black mb-2">AI-Powered Insights</h4>
                <p className="text-black text-sm">
                  Advanced sentiment analysis, predictive analytics, and automated reporting with GPT-4
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Enterprise Integration</h4>
                <p className="text-black text-sm">
                  Power BI dashboards, Google Sheets sync, and comprehensive data export capabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Powered by Modern Technology</h4>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Frontend:</span> React, TypeScript, Tailwind CSS
              </div>
              <div>
                <span className="font-medium">Backend:</span> Supabase, PostgreSQL, Real-time
              </div>
              <div>
                <span className="font-medium">AI:</span> OpenAI GPT-4, Sentiment Analysis
              </div>
              <div>
                <span className="font-medium">Analytics:</span> Power BI, Custom Dashboards
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
            <img 
              src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
              alt="NIAT Logo" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Welcome to Our Feedback System
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Help us improve our bootcamp sessions by sharing your valuable feedback. 
              Your insights drive our continuous improvement and help create better learning experiences.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Feedback Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Student Feedback</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  Share your experience and help us improve
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <p className="text-black mb-6">
                  Provide feedback for your attended sessions, rate your experience, 
                  and help us make our bootcamps even better.
                </p>
                <Link to="/session-selector">
                  <Button className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Start Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Access Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  View responses and analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <p className="text-black mb-6">
                  Access comprehensive feedback reports, analytics, and manage 
                  the feedback system settings.
                </p>
                <Link to="/admin">
                  <Button className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Admin Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Welcome Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Transform Learning Through Feedback
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Comprehensive Sessions</h4>
                <p className="text-black text-sm">
                  Speed Math, AI Workshops, Personal Branding, and 8+ specialized sessions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-black" />
                </div>
                <h4 className="font-semibold text-black mb-2">Multi-Location Support</h4>
                <p className="text-black text-sm">
                  Seamless feedback collection across Pune, Hyderabad, and Noida locations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Advanced Analytics</h4>
                <p className="text-black text-sm">
                  Power BI integration with real-time dashboards and professional reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
