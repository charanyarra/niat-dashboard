
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const KaizenFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Kaizen Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Kaizen"
      sessionDescription="Help us understand how our Kaizen (continuous improvement) session impacted your learning journey."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How effectively did this session teach continuous improvement principles? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="effectivenessRating" required>
          {["Extremely Effective", "Very Effective", "Moderately Effective", "Slightly Effective", "Not Effective"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`effectiveness-${index}`} />
              <Label htmlFor={`effectiveness-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What improvement strategies will you implement based on this session?
        </Label>
        <Textarea name="implementationPlans" placeholder="Describe specific changes you plan to make..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Additional feedback and suggestions:
        </Label>
        <Textarea name="additionalFeedback" placeholder="Share any other thoughts about the Kaizen session..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default KaizenFeedback;
