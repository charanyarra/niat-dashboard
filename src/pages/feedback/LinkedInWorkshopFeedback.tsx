
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const LinkedInWorkshopFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("LinkedIn Workshop Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="LinkedIn Workshop"
      sessionDescription="Share your thoughts on our LinkedIn workshop and how it helped optimize your professional profile."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How actionable were the LinkedIn optimization tips? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="actionabilityRating" required>
          {["Very Actionable", "Mostly Actionable", "Somewhat Actionable", "Limited Actionability", "Not Actionable"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`actionable-${index}`} />
              <Label htmlFor={`actionable-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Which LinkedIn features will you focus on improving?
        </Label>
        <Textarea name="improvementFocus" placeholder="Mention specific profile sections or features you'll work on..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Additional workshop feedback:
        </Label>
        <Textarea name="additionalFeedback" placeholder="Any other thoughts about the LinkedIn workshop..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default LinkedInWorkshopFeedback;
