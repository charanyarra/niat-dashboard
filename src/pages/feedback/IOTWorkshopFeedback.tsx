
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const IOTWorkshopFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("IOT Workshop Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="IOT Workshop"
      sessionDescription="Help us understand your experience with our Internet of Things workshop and hands-on activities."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How hands-on and practical was the IOT workshop? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="practicalRating" required>
          {["Very Hands-on", "Moderately Hands-on", "Balanced Theory/Practice", "Too Theoretical", "Not Practical Enough"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`practical-${index}`} />
              <Label htmlFor={`practical-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What IOT projects or applications interest you most?
        </Label>
        <Textarea name="interestAreas" placeholder="Describe IOT applications you'd like to work on..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Suggestions for future IOT workshops:
        </Label>
        <Textarea name="futureSuggestions" placeholder="How can we make IOT workshops more engaging and practical..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default IOTWorkshopFeedback;
