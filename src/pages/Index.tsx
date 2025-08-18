import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <img src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" alt="NIAT Logo" className="h-16 w-auto" />
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
                <div className="mt-3 text-xs text-gray-600">
                  <p className="mx-[10px] my-[10px]"><strong>Support Contact:</strong></p>
                  <p>📞 +91 9014847505</p>
                  <p>📧 guru.saicharanyarra@nxtwave.co.in</p>
                </div>
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
    </div>;
};
export default Index;