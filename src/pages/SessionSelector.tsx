import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const SessionSelector = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bootcampId: "",
    session: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const sessions = [
    { value: "speed-math", label: "Speed Math" },
    { value: "tribe-huddle", label: "Tribe-huddle" },
    { value: "kaizen", label: "Kaizen" },
    { value: "personal-branding", label: "Personal Branding" },
    { value: "community-building", label: "Community Building Session Feedback" },
    { value: "gen-ai", label: "Gen AI Feedback Form" },
    { value: "gen-ai-video", label: "Gen AI - Hands-on Video Submission" },
    { value: "iot-workshop", label: "IOT Workshop Feedback" },
    { value: "linkedin-workshop", label: "LinkedIn Workshop Feedback Form" },
    { value: "drone-workshop", label: "Drone Workshop Feedback Form" },
    { value: "tribeathon", label: "Tribeathon Feedback Form" },
    { value: "blockchain-workshop", label: "Blockchain Workshop Feedback Form" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.bootcampId || !formData.session) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage for use in feedback forms
    localStorage.setItem("userInfo", JSON.stringify({
      name: formData.name,
      email: formData.email,
      bootcampId: formData.bootcampId
    }));

    // Navigate to the selected feedback form
    navigate(`/feedback/${formData.session}`);
  };

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
            <div className="flex items-center space-x-3 ml-auto">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-gray-200">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Session Selection</CardTitle>
              <CardDescription className="text-red-100">
                Please provide your details and select the session you'd like to give feedback for
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black font-semibold">
                    Full Name <span className="text-red-900">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-300 focus:border-red-900 focus:ring-red-900"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black font-semibold">
                    Email Address <span className="text-red-900">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-gray-300 focus:border-red-900 focus:ring-red-900"
                    required
                  />
                </div>

                {/* Bootcamp ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="bootcampId" className="text-black font-semibold">
                    Bootcamp ID <span className="text-red-900">*</span>
                  </Label>
                  <Input
                    id="bootcampId"
                    type="text"
                    placeholder="Enter your bootcamp ID"
                    value={formData.bootcampId}
                    onChange={(e) => setFormData({ ...formData, bootcampId: e.target.value })}
                    className="border-gray-300 focus:border-red-900 focus:ring-red-900"
                    required
                  />
                </div>

                {/* Session Selection */}
                <div className="space-y-2">
                  <Label htmlFor="session" className="text-black font-semibold">
                    Select Session <span className="text-red-900">*</span>
                  </Label>
                  <Select value={formData.session} onValueChange={(value) => setFormData({ ...formData, session: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-red-900 focus:ring-red-900">
                      <SelectValue placeholder="Choose the session you attended" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessions.map((session) => (
                        <SelectItem key={session.value} value={session.value}>
                          {session.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Proceed to Feedback Form
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionSelector;
