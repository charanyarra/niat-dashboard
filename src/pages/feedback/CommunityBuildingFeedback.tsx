
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const CommunityBuildingFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Community Building Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Community Building Session"
      sessionDescription="Tell us about your experience with our Community Building session and its impact on your networking skills."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How well did this session help you understand community building principles? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="understandingLevel" required>
          {["Excellent Understanding", "Good Understanding", "Fair Understanding", "Limited Understanding", "No Understanding"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`understanding-${index}`} />
              <Label htmlFor={`understanding-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What community building strategies will you apply?
        </Label>
        <Textarea name="strategies" placeholder="Share the strategies you plan to implement..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Overall feedback and suggestions:
        </Label>
        <Textarea name="overallFeedback" placeholder="Your thoughts on the session and ideas for improvement..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default CommunityBuildingFeedback;
