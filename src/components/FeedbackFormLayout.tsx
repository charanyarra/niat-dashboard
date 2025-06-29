
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, GraduationCap, CheckCircle } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  bootcampId: string;
}

interface FeedbackFormLayoutProps {
  sessionTitle: string;
  sessionDescription: string;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
}

const FeedbackFormLayout = ({ sessionTitle, sessionDescription, children, onSubmit }: FeedbackFormLayoutProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", bootcampId: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // Redirect to session selector if no user info
      navigate("/session-selector");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    // Add user info to the feedback data
    const feedbackData = {
      ...userInfo,
      ...data,
      sessionTitle,
      submittedAt: new Date().toISOString()
    };

    console.log("Feedback submitted:", feedbackData);
    
    // Call the onSubmit callback
    onSubmit(feedbackData);
    
    setIsSubmitted(true);
    toast({
      title: "Feedback Submitted Successfully!",
      description: "Thank you for your valuable feedback. It helps us improve our bootcamp sessions.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate your time and valuable insights.
            </p>
            <div className="space-y-3">
              <Link to="/session-selector">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Submit Another Feedback
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/session-selector" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Session Selector</span>
            </Link>
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">{sessionTitle}</h1>
                <p className="text-blue-100">Feedback Form</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* User Info Display */}
          <Card className="mb-6 shadow-lg border-0">
            <CardContent className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex flex-wrap gap-4 text-sm">
                <div><strong>Name:</strong> {userInfo.name}</div>
                <div><strong>Email:</strong> {userInfo.email}</div>
                <div><strong>Bootcamp ID:</strong> {userInfo.bootcampId}</div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">{sessionTitle} Feedback</CardTitle>
              <CardDescription className="text-blue-100">
                {sessionDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {children}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFormLayout;
