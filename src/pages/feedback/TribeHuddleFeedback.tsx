
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const TribeHuddleFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Tribe Huddle Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Tribe-huddle"
      sessionDescription="Share your experience with our Tribe-huddle session and help us build better community connections."
      onSubmit={handleSubmit}
    >
      {/* Session Value Rating */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How valuable was this Tribe-huddle session for you? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="sessionValue" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="extremely-valuable" id="extremely-valuable" />
            <Label htmlFor="extremely-valuable">Extremely Valuable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very-valuable" id="very-valuable" />
            <Label htmlFor="very-valuable">Very Valuable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderately-valuable" id="moderately-valuable" />
            <Label htmlFor="moderately-valuable">Moderately Valuable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="slightly-valuable" id="slightly-valuable" />
            <Label htmlFor="slightly-valuable">Slightly Valuable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-valuable" id="not-valuable" />
            <Label htmlFor="not-valuable">Not Valuable</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Connection Building */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Which aspects of connection building were most effective? (Select all that apply)
        </Label>
        <div className="space-y-2">
          {[
            "Ice-breaking activities",
            "Small group discussions",
            "Networking exercises",
            "Shared problem-solving",
            "Peer-to-peer learning",
            "Team building games"
          ].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox id={option} name="effectiveAspects" value={option} />
              <Label htmlFor={option} className="text-sm">{option}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Community Feel */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How well did this session foster a sense of community?
        </Label>
        <RadioGroup name="communityFeel">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="excellent" id="community-excellent" />
            <Label htmlFor="community-excellent">Excellent - Really felt connected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id="community-good" />
            <Label htmlFor="community-good">Good - Some connections made</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="okay" id="community-okay" />
            <Label htmlFor="community-okay">Okay - Limited connection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="poor" id="community-poor" />
            <Label htmlFor="community-poor">Poor - Felt isolated</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Key Takeaways */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What were your key takeaways from this Tribe-huddle session?
        </Label>
        <Textarea
          name="keyTakeaways"
          placeholder="Share the most important insights or connections you gained..."
          className="min-h-[100px]"
        />
      </div>

      {/* Future Suggestions */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How can we make future Tribe-huddle sessions even better?
        </Label>
        <Textarea
          name="futureSuggestions"
          placeholder="Your ideas for improving our community building sessions..."
          className="min-h-[100px]"
        />
      </div>
    </FeedbackFormLayout>
  );
};

export default TribeHuddleFeedback;
