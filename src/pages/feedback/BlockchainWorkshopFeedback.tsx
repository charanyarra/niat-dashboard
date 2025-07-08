import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const BlockchainWorkshopFeedback = () => {
  const handleSubmit = (data: any) => {
    console.log("Blockchain Workshop Feedback:", data);
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Blockchain Workshop"
      sessionDescription="Share your experience with our Blockchain workshop and help us improve future sessions on distributed ledger technology."
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you rate the technical depth of the blockchain concepts covered? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup name="technicalDepth" required>
          {["Excellent - Perfect depth", "Good - Appropriate level", "Average - Could be better", "Too Basic - Need more depth", "Too Advanced - Hard to follow"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`technical-${index}`} />
              <Label htmlFor={`technical-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How practical and hands-on was the blockchain workshop? <span className="text-red-500">*</span>
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
          Which blockchain concepts or technologies interested you most?
        </Label>
        <Textarea name="interestingConcepts" placeholder="Mention specific blockchain technologies, cryptocurrencies, smart contracts, DeFi, NFTs, etc..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What blockchain projects or applications would you like to work on? <span className="text-red-500">*</span>
        </Label>
        <Textarea name="futureProjects" placeholder="Describe blockchain projects you're interested in building or exploring..." className="min-h-[100px]" required />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How confident do you feel about blockchain development after this workshop?
        </Label>
        <RadioGroup name="confidenceLevel">
          {["Very Confident", "Confident", "Somewhat Confident", "Not Very Confident", "Need More Learning"].map((option, index) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(/ /g, '-')} id={`confidence-${index}`} />
              <Label htmlFor={`confidence-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What additional resources or support would help you in blockchain development?
        </Label>
        <Textarea name="additionalResources" placeholder="Suggest tools, platforms, tutorials, or mentorship that would be helpful..." className="min-h-[100px]" />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How can we improve future blockchain workshops?
        </Label>
        <Textarea name="improvements" placeholder="Your suggestions for enhancing the blockchain workshop experience..." className="min-h-[100px]" />
      </div>
    </FeedbackFormLayout>
  );
};

export default BlockchainWorkshopFeedback;