
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Users, Award, BookOpen } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <img 
                src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                alt="NIAT Logo" 
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About NIAT Bootcamp
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming careers through innovative technology education and hands-on learning experiences.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  To empower individuals with cutting-edge technology skills through comprehensive bootcamps, 
                  fostering innovation and preparing the next generation of tech leaders.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  To be the leading technology education platform that bridges the gap between academic learning 
                  and industry requirements, creating skilled professionals ready for the digital future.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Features */}
          <Card className="shadow-lg mb-12">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl">What Makes Us Different</CardTitle>
              <CardDescription className="text-red-100">
                Comprehensive learning approach with real-world applications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Hands-on Learning</h3>
                  <p className="text-muted-foreground text-sm">
                    Project-based curriculum with real-world applications and industry-relevant skills
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Mentorship</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn from industry professionals with years of experience in cutting-edge technologies
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 dark:bg-red-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Career Support</h3>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive career guidance, interview preparation, and job placement assistance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Programs Offered */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Our Programs</CardTitle>
              <CardDescription className="text-purple-100">
                Comprehensive bootcamps designed for career transformation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Technical Workshops</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Generative AI & Machine Learning</li>
                    <li>• IoT & Hardware Development</li>
                    <li>• Drone Technology & Automation</li>
                    <li>• Full-Stack Web Development</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Professional Development</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Personal Branding & LinkedIn Optimization</li>
                    <li>• Community Building & Networking</li>
                    <li>• Speed Math & Problem Solving</li>
                    <li>• Kaizen & Continuous Improvement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
