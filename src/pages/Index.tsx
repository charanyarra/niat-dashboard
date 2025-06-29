
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, MessageSquare, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-10 w-10" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">NIAT Bootcamps</h1>
              <p className="text-blue-100 text-lg">Feedback & Assessment System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Our Feedback System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us improve our bootcamp sessions by sharing your valuable feedback. 
              Your insights drive our continuous improvement and help create better learning experiences.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Feedback Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Student Feedback</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Share your experience and help us improve
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Provide feedback for your attended sessions, rate your experience, 
                  and help us make our bootcamps even better.
                </p>
                <Link to="/session-selector">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Start Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Access Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  View responses and analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Access comprehensive feedback reports, analytics, and manage 
                  the feedback system settings.
                </p>
                <Link to="/admin">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Admin Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              System Features
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Multi-Session Support</h4>
                <p className="text-gray-600 text-sm">
                  Feedback forms for all bootcamp sessions including workshops and special events
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h4>
                <p className="text-gray-600 text-sm">
                  Fully responsive design that works perfectly on all devices
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Real-time Analytics</h4>
                <p className="text-gray-600 text-sm">
                  Instant feedback collection with comprehensive reporting dashboard
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
