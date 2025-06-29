
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const DroneWorkshopFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Drone Workshop Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Drone Workshop"
      sessionDescription="Tell us about your experience with our Drone workshop and hands-on flying activities."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate the drone flying experience? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="flyingExperience" required>
          {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase()} id={`flying-${index}`} />
              <Label htmlFor={`flying-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What drone applications interest you most?
        </Label>
        <Textarea name="droneApplications" placeholder="Describe potential uses for drones that interest you..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How can we improve future drone workshops?
        </Label>
        <Textarea name="improvements" placeholder="Your suggestions for enhancing the drone workshop experience..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default DroneWorkshopFeedback;
