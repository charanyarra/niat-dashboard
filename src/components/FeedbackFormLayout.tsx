import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-xl border-gray-200">
          <CardContent className="p-8 text-center bg-white">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-black mb-6">
              Your feedback has been submitted successfully. We appreciate your time and valuable insights.
            </p>
            <div className="space-y-3">
              <Link to="/session-selector">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  Submit Another Feedback
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/session-selector" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Session Selector</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8b444953-4cf5-4245-a883-10795b1e23c3.png" 
                alt="NIAT Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* User Info Display */}
          <Card className="mb-6 shadow-lg border-gray-200">
            <CardContent className="p-4 bg-gray-100">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-black"><strong>Name:</strong> {userInfo.name}</div>
                <div className="text-black"><strong>Email:</strong> {userInfo.email}</div>
                <div className="text-black"><strong>Bootcamp ID:</strong> {userInfo.bootcampId}</div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card className="shadow-xl border-gray-200">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl">{sessionTitle} Feedback</CardTitle>
              <CardDescription className="text-red-100">
                {sessionDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {children}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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
