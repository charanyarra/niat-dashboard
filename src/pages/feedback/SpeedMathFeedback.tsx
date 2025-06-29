
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpeedMathFeedback = () => {
  const handleSubmit = (data: any) => {
    // Here you would typically send data to your backend/Google Sheets
    console.log("Speed Math Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Speed Math"
      sessionDescription="Please rate your experience with our Speed Math session and provide valuable feedback."
      onSubmit={handleSubmit}
    >
      {/* Overall Rating */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate this Speed Math session overall? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="overallRating" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="excellent" id="excellent" />
            <Label htmlFor="excellent">Excellent (5/5)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id="good" />
            <Label htmlFor="good">Good (4/5)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="average" id="average" />
            <Label htmlFor="average">Average (3/5)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="below-average" id="below-average" />
            <Label htmlFor="below-average">Below Average (2/5)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="poor" id="poor" />
            <Label htmlFor="poor">Poor (1/5)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Difficulty Level */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate the difficulty level of the session?
        </Label>
        <Select name="difficultyLevel">
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="too-easy">Too Easy</SelectItem>
            <SelectItem value="just-right">Just Right</SelectItem>
            <SelectItem value="challenging">Challenging but Good</SelectItem>
            <SelectItem value="too-difficult">Too Difficult</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Most Helpful Aspect */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What was the most helpful aspect of this Speed Math session?
        </Label>
        <Textarea
          name="mostHelpful"
          placeholder="Please describe what you found most valuable..."
          className="min-h-[100px]"
        />
      </div>

      {/* Improvement Suggestions */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What could we improve in future Speed Math sessions?
        </Label>
        <Textarea
          name="improvements"
          placeholder="Please share your suggestions for improvement..."
          className="min-h-[100px]"
        />
      </div>

      {/* Recommendation */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Would you recommend this Speed Math session to other students?
        </Label>
        <RadioGroup name="recommendation">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="definitely" id="definitely" />
            <Label htmlFor="definitely">Definitely Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="probably" id="probably" />
            <Label htmlFor="probably">Probably Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maybe" id="maybe" />
            <Label htmlFor="maybe">Maybe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="probably-not" id="probably-not" />
            <Label htmlFor="probably-not">Probably Not</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="definitely-not" id="definitely-not" />
            <Label htmlFor="definitely-not">Definitely Not</Label>
          </div>
        </RadioGroup>
      </div>
    </FeedbackFormLayout>
  );
};

export default SpeedMathFeedback;
