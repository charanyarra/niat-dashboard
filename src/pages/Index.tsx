
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, BookOpen, Mail, Info, BarChart3 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="hover:text-red-200 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-red-200 transition-colors">Contact</Link>
              <ThemeToggle />
            </nav>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Welcome to NIAT Feedback System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Help us improve our bootcamp sessions by sharing your valuable feedback. 
              Your insights drive our continuous improvement and help create better learning experiences 
              for future students.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Student Feedback Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Student Feedback</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  Share your session experience
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-card">
                <p className="text-muted-foreground mb-6">
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

            {/* Admin Dashboard Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  View responses and analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-card">
                <p className="text-muted-foreground mb-6">
                  Access comprehensive feedback reports, analytics, and manage 
                  the feedback system settings.
                </p>
                <Link to="/admin">
                  <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Admin Access
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* About Us Card */}
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-900 to-green-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-6 w-6" />
                  <span>About NIAT</span>
                </CardTitle>
                <CardDescription className="text-green-100">
                  Learn about our mission
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-card">
                <p className="text-muted-foreground mb-6">
                  Discover our mission, vision, and the comprehensive programs 
                  we offer to transform careers through technology education.
                </p>
                <Link to="/about">
                  <Button className="w-full bg-gradient-to-r from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              System Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-3 text-lg">Multi-Session Support</h4>
                <p className="text-muted-foreground">
                  Feedback forms for all bootcamp sessions including workshops, 
                  special events, and comprehensive program tracking
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-3 text-lg">Real-time Analytics</h4>
                <p className="text-muted-foreground">
                  Instant feedback collection with comprehensive reporting dashboard 
                  and advanced data visualization tools
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-3 text-lg">Mobile Optimized</h4>
                <p className="text-muted-foreground">
                  Fully responsive design that works perfectly on all devices 
                  with seamless user experience across platforms
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Available Programs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">• Speed Math</p>
                    <p className="text-muted-foreground">• Tribe Huddle</p>
                    <p className="text-muted-foreground">• Kaizen</p>
                    <p className="text-muted-foreground">• Personal Branding</p>
                    <p className="text-muted-foreground">• Community Building</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">• Gen AI Workshop</p>
                    <p className="text-muted-foreground">• IoT Development</p>
                    <p className="text-muted-foreground">• LinkedIn Optimization</p>
                    <p className="text-muted-foreground">• Drone Technology</p>
                    <p className="text-muted-foreground">• Tribeathon Event</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-6 w-6" />
                  <span>Get Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Need help with the feedback system or have questions about our programs?
                </p>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 NIAT Bootcamp. All rights reserved. | 
            <Link to="/about" className="hover:text-red-600 ml-1">About</Link> | 
            <Link to="/contact" className="hover:text-red-600 ml-1">Contact</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
