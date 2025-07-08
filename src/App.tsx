import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import SessionSelector from "./pages/SessionSelector";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SharedFeedbackForm from "./pages/SharedFeedbackForm";

// Import feedback pages
import SpeedMathFeedback from "./pages/feedback/SpeedMathFeedback";
import TribeHuddleFeedback from "./pages/feedback/TribeHuddleFeedback";
import KaizenFeedback from "./pages/feedback/KaizenFeedback";
import PersonalBrandingFeedback from "./pages/feedback/PersonalBrandingFeedback";
import CommunityBuildingFeedback from "./pages/feedback/CommunityBuildingFeedback";
import GenAIFeedback from "./pages/feedback/GenAIFeedback";
import GenAIVideoSubmission from "./pages/feedback/GenAIVideoSubmission";
import IOTWorkshopFeedback from "./pages/feedback/IOTWorkshopFeedback";
import LinkedInWorkshopFeedback from "./pages/feedback/LinkedInWorkshopFeedback";
import DroneWorkshopFeedback from "./pages/feedback/DroneWorkshopFeedback";
import TribeathonFeedback from "./pages/feedback/TribeathonFeedback";
import BlockchainWorkshopFeedback from "./pages/feedback/BlockchainWorkshopFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/session-selector" element={<SessionSelector />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/feedback/:shareLink" element={<SharedFeedbackForm />} />
            
            {/* Existing feedback routes */}
            <Route path="/feedback/speed-math" element={<SpeedMathFeedback />} />
            <Route path="/feedback/tribe-huddle" element={<TribeHuddleFeedback />} />
            <Route path="/feedback/kaizen" element={<KaizenFeedback />} />
            <Route path="/feedback/personal-branding" element={<PersonalBrandingFeedback />} />
            <Route path="/feedback/community-building" element={<CommunityBuildingFeedback />} />
            <Route path="/feedback/gen-ai" element={<GenAIFeedback />} />
            <Route path="/feedback/gen-ai-video" element={<GenAIVideoSubmission />} />
            <Route path="/feedback/iot-workshop" element={<IOTWorkshopFeedback />} />
            <Route path="/feedback/linkedin-workshop" element={<LinkedInWorkshopFeedback />} />
            <Route path="/feedback/drone-workshop" element={<DroneWorkshopFeedback />} />
            <Route path="/feedback/tribeathon" element={<TribeathonFeedback />} />
            <Route path="/feedback/blockchain-workshop" element={<BlockchainWorkshopFeedback />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
