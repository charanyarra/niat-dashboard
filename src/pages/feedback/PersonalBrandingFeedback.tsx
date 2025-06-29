
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const PersonalBrandingFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Personal Branding Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Personal Branding"
      sessionDescription="Share your thoughts on our Personal Branding session and how it helped shape your professional identity."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How confident do you feel about building your personal brand after this session? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="confidenceLevel" required>
          {["Very Confident", "Confident", "Neutral", "Less Confident", "Not Confident"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`confidence-${index}`} />
              <Label htmlFor={`confidence-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What aspects of personal branding do you plan to focus on?
        </Label>
        <Textarea name="focusAreas" placeholder="Describe which personal branding elements you'll prioritize..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How can we improve future Personal Branding sessions?
        </Label>
        <Textarea name="improvements" placeholder="Your suggestions for enhancing the session..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default PersonalBrandingFeedback;
