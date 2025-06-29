
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const GenAIFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Gen AI Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Gen AI Feedback"
      sessionDescription="Share your experience with our Generative AI session and help us enhance AI education."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate the Gen AI session complexity? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="complexityRating" required>
          {["Too Advanced", "Just Right", "Too Basic", "Needs More Depth", "Perfect Balance"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`complexity-${index}`} />
              <Label htmlFor={`complexity-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What AI tools or concepts would you like to explore further?
        </Label>
        <Textarea name="furtherExploration" placeholder="Mention specific AI tools or topics you're interested in..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How can we improve our Gen AI sessions?
        </Label>
        <Textarea name="sessionImprovements" placeholder="Your suggestions for making AI education more effective..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default GenAIFeedback;
