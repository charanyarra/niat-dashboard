
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
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

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              System Features
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Multi-Session Support</h4>
                <p className="text-black text-sm">
                  Feedback forms for all bootcamp sessions including workshops and special events
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-black" />
                </div>
                <h4 className="font-semibold text-black mb-2">Mobile Friendly</h4>
                <p className="text-black text-sm">
                  Fully responsive design that works perfectly on all devices
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-900" />
                </div>
                <h4 className="font-semibold text-black mb-2">Real-time Analytics</h4>
                <p className="text-black text-sm">
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
