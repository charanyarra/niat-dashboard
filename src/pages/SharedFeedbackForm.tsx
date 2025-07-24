import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Prevent access to other parts of the website when using shared link
const RESTRICTED_MODE = true;

const SharedFeedbackForm = () => {
  const { shareLink } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    bootcampId: '',
    location: ''
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase
          .from('feedback_sessions')
          .select('*')
          .eq('share_link', shareLink)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching session:', error);
          toast({
            title: "Session Not Found",
            description: "The feedback form you're looking for doesn't exist or has been disabled.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        setSession(data);
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchSession();
    }
  }, [shareLink, navigate, toast]);

  // Add function to download form as PDF/text
  const downloadFormAsText = () => {
    if (!session) return;
    
    const formContent = `
FEEDBACK FORM: ${session.title}
Description: ${session.description}
Generated on: ${new Date().toLocaleString()}

QUESTIONS:
${session.questions.map((q: any, index: number) => 
  `${index + 1}. ${q.question} (${q.type}${q.required ? ' - Required' : ''})`
).join('\n')}

------
This form can be accessed at: ${window.location.origin}/feedback/${session.share_link}
    `.trim();

    const blob = new Blob([formContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.title.toLowerCase().replace(/\s+/g, '-')}-form.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const responses: Record<string, any> = {};

      // Collect all form responses
      session.questions.forEach((question: any) => {
        const value = formData.get(question.id);
        if (value) {
          responses[question.id] = value;
        }
      });

      // Add location to responses
      responses.location = userInfo.location;

      // Submit to database
      const { error } = await supabase
        .from('feedback_responses')
        .insert([{
          session_id: session.id,
          user_name: userInfo.name,
          user_email: userInfo.email,
          bootcamp_id: userInfo.bootcampId,
          responses: responses
        }]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Feedback Submitted Successfully!",
        description: "Thank you for your valuable feedback.",
      });

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading feedback form...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-red-900 mb-2">Form Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The feedback form you're looking for doesn't exist or has been disabled.
            </p>
            <Link to="/">
              <Button className="bg-red-900 hover:bg-red-800">
                Go to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-xl border-border">
          <CardContent className="p-8 text-center bg-card">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-foreground mb-6">
              Your feedback has been submitted successfully. We appreciate your time and valuable insights.
            </p>
            <Link to="/">
              <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {!RESTRICTED_MODE && (
              <Link to="/" className="flex items-center space-x-2 hover:text-red-200 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            )}
            {RESTRICTED_MODE && (
              <div className="flex items-center space-x-2">
                <span className="text-red-100">Feedback Form</span>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Button
                onClick={downloadFormAsText}
                variant="outline"
                size="sm"
                className="text-red-900 border-white hover:bg-white/10"
              >
                Download Form
              </Button>
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
          {/* Feedback Form */}
          <Card className="shadow-xl border-border">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl">{session.title}</CardTitle>
              <CardDescription className="text-red-100">
                {session.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 bg-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info Section */}
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-semibold">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-semibold">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bootcampId" className="text-foreground font-semibold">
                      Bootcamp ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bootcampId"
                      value={userInfo.bootcampId}
                      onChange={(e) => setUserInfo({...userInfo, bootcampId: e.target.value})}
                      placeholder="Enter your ID"
                      required
                    />
                  </div>
                </div>

                {/* Location Selection */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold">
                    Select Your Location <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Pune', 'Hyderabad', 'Noida'].map((location) => (
                      <div key={location} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted">
                        <input
                          type="radio"
                          id={`location-${location}`}
                          name="location"
                          value={location}
                          checked={userInfo.location === location}
                          onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                          required
                        />
                        <Label htmlFor={`location-${location}`} className="flex-1 cursor-pointer">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Contact Support:</strong></p>
                    <p>📞 Phone: +91 9014847505</p>
                    <p>📧 Email: guru.saicharanyarra@nxtwave.co.in</p>
                  </div>
                </div>

                {/* Dynamic Questions */}
                {session.questions.map((question: any, index: number) => (
                  <div key={question.id} className="space-y-3">
                    <Label className="text-foreground font-semibold">
                      {question.question} {question.required && <span className="text-red-500">*</span>}
                    </Label>
                    
                    {question.type === 'text' && (
                      <Input
                        name={question.id}
                        placeholder="Your answer..."
                        required={question.required}
                      />
                    )}

                    {question.type === 'textarea' && (
                      <Textarea
                        name={question.id}
                        placeholder="Your detailed response..."
                        className="min-h-[100px]"
                        required={question.required}
                      />
                    )}

                    {question.type === 'rating' && (
                      <RadioGroup name={question.id} required={question.required}>
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <RadioGroupItem value={rating.toString()} id={`${question.id}-${rating}`} />
                            <Label htmlFor={`${question.id}-${rating}`}>
                              {rating} - {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : 'Very Poor'}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === 'location' && (
                      <RadioGroup name={question.id} required={question.required}>
                        {['Pune', 'Hyderabad', 'Noida'].map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <RadioGroupItem value={location} id={`${question.id}-${location}`} />
                            <Label htmlFor={`${question.id}-${location}`}>
                              {location}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                ))}
                
                <Button 
                  type="submit" 
                  disabled={submitting || !userInfo.name || !userInfo.email || !userInfo.bootcampId || !userInfo.location}
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SharedFeedbackForm;
