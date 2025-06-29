
import { useState } from "react";
import FeedbackFormLayout from "@/components/FeedbackFormLayout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Video } from "lucide-react";

const GenAIVideoSubmission = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOriginalWork, setIsOriginalWork] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (data: any) => {
    if (!selectedFile) {
      alert("Please upload a video file before submitting.");
      return;
    }
    if (!isOriginalWork) {
      alert("Please confirm that this is your original work.");
      return;
    }
    
    // Here you would typically upload the file and send data to your backend
    console.log("Gen AI Video Submission:", { ...data, file: selectedFile });
  };

  return (
    <FeedbackFormLayout
      sessionTitle="Gen AI - Hands-on Video Submission"
      sessionDescription="Submit your hands-on project video and provide feedback about the Gen AI workshop."
      onSubmit={handleSubmit}
    >
      {/* Video Upload */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Upload Your Project Video <span className="text-red-500">*</span>
        </Label>
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
          <CardContent className="p-6">
            <div className="text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="video-upload"
                name="videoFile"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      Click to upload your video
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: MP4, AVI, MOV, WebM (Max size: 100MB)
                    </p>
                  </div>
                </div>
              </label>
            </div>
            {selectedFile && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-green-600">
                    ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Project Description */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          Describe your Gen AI project <span className="text-red-500">*</span>
        </Label>
        <Textarea
          name="projectDescription"
          placeholder="Please describe what you built, the AI tools you used, and how you approached the project..."
          className="min-h-[120px]"
          required
        />
      </div>

      {/* Challenges Faced */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What challenges did you face during the project?
        </Label>
        <Textarea
          name="challenges"
          placeholder="Describe any difficulties you encountered and how you overcame them..."
          className="min-h-[100px]"
        />
      </div>

      {/* Learning Outcomes */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          What did you learn from this Gen AI hands-on session?
        </Label>
        <Textarea
          name="learningOutcomes"
          placeholder="Share the key insights and skills you gained..."
          className="min-h-[100px]"
        />
      </div>

      {/* Session Feedback */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-semibold">
          How would you improve future Gen AI hands-on sessions?
        </Label>
        <Textarea
          name="sessionFeedback"
          placeholder="Your suggestions for making the workshop even better..."
          className="min-h-[100px]"
        />
      </div>

      {/* Original Work Confirmation */}
      <div className="flex items-center space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <Checkbox
          id="originalWork"
          checked={isOriginalWork}
          onCheckedChange={(checked) => setIsOriginalWork(checked as boolean)}
          name="originalWork"
          required
        />
        <Label htmlFor="originalWork" className="text-sm font-medium text-gray-700">
          <span className="text-red-500">*</span> I confirm that this is my original work and I have not plagiarized any content.
        </Label>
      </div>
    </FeedbackFormLayout>
  );
};

export default GenAIVideoSubmission;
