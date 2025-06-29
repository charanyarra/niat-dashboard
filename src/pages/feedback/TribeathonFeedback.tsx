
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const TribeathonFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Tribeathon Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Tribeathon"
      sessionDescription="Share your experience from the Tribeathon event and help us make future competitions even better."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate the overall Tribeathon experience? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="overallExperience" required>
          {["Outstanding", "Excellent", "Good", "Average", "Below Average"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`experience-${index}`} />
              <Label htmlFor={`experience-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What was the most valuable aspect of the Tribeathon?
        </Label>
        <Textarea name="mostValuable" placeholder="Describe what you found most beneficial about the competition..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Suggestions for future Tribeathon events:
        </Label>
        <Textarea name="futureSuggestions" placeholder="How can we make future Tribeathon events more engaging and valuable..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default TribeathonFeedback;
