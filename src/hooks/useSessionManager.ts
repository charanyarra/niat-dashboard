import { useState, useEffect } from 'react';
import { useFeedbackData } from './useFeedbackData';
import { useToast } from './use-toast';

const PREDEFINED_SESSIONS = [
  {
    title: "Speed Math Workshop",
    description: "Interactive workshop focusing on rapid mathematical calculations and problem-solving techniques.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "rating", type: "rating", question: "How would you rate the overall workshop?", required: true },
      { id: "techniques", type: "textarea", question: "Which speed math techniques did you find most helpful?", required: true },
      { id: "difficulty", type: "rating", question: "How would you rate the difficulty level?", required: true },
      { id: "practical", type: "rating", question: "How practical were the techniques taught?", required: true },
      { id: "suggestions", type: "textarea", question: "Any suggestions for improvement?", required: false }
    ]
  },
  {
    title: "Tribe Huddle Session",
    description: "Collaborative team-building and networking session for community members.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "overall", type: "rating", question: "Overall session experience", required: true },
      { id: "networking", type: "rating", question: "Quality of networking opportunities", required: true },
      { id: "activities", type: "textarea", question: "Which activities were most engaging?", required: true },
      { id: "connections", type: "rating", question: "How valuable were the connections made?", required: true },
      { id: "future", type: "textarea", question: "What would you like to see in future huddles?", required: false }
    ]
  },
  {
    title: "Kaizen Workshop",
    description: "Continuous improvement methodology workshop focusing on personal and professional development.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "understanding", type: "rating", question: "How well did you understand Kaizen principles?", required: true },
      { id: "applicability", type: "rating", question: "How applicable are these concepts to your work?", required: true },
      { id: "examples", type: "textarea", question: "Share examples of where you can apply Kaizen", required: true },
      { id: "tools", type: "rating", question: "Effectiveness of tools and techniques presented", required: true },
      { id: "implementation", type: "textarea", question: "What's your implementation plan?", required: false }
    ]
  },
  {
    title: "Personal Branding Workshop",
    description: "Comprehensive workshop on building and maintaining your personal brand in the digital age.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "content_quality", type: "rating", question: "Quality of content delivered", required: true },
      { id: "practical_tips", type: "rating", question: "Practicality of branding tips", required: true },
      { id: "platforms", type: "textarea", question: "Which platforms will you focus on for your personal brand?", required: true },
      { id: "challenges", type: "textarea", question: "What are your biggest personal branding challenges?", required: true },
      { id: "action_plan", type: "textarea", question: "What's your 30-day action plan?", required: false }
    ]
  },
  {
    title: "Community Building Session",
    description: "Strategic session on building and nurturing professional communities and networks.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "strategies", type: "rating", question: "Effectiveness of community building strategies", required: true },
      { id: "engagement", type: "rating", question: "Level of audience engagement", required: true },
      { id: "tools", type: "textarea", question: "Which community building tools interest you most?", required: true },
      { id: "community_goals", type: "textarea", question: "What are your community building goals?", required: true },
      { id: "support_needed", type: "textarea", question: "What support do you need to build your community?", required: false }
    ]
  },
  {
    title: "Gen AI Workshop",
    description: "Hands-on workshop exploring Generative AI tools and their applications in various domains.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "technical_depth", type: "rating", question: "Appropriate technical depth of content", required: true },
      { id: "practical_demos", type: "rating", question: "Quality of practical demonstrations", required: true },
      { id: "ai_tools", type: "textarea", question: "Which AI tools are you most excited to use?", required: true },
      { id: "use_cases", type: "textarea", question: "What are your planned use cases for Gen AI?", required: true },
      { id: "concerns", type: "textarea", question: "Any concerns about AI implementation?", required: false }
    ]
  },
  {
    title: "Gen AI Video Submission",
    description: "Creative video submission session showcasing AI-generated content and applications.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "creativity", type: "rating", question: "Creativity of video submissions", required: true },
      { id: "technical_quality", type: "rating", question: "Technical quality of AI integration", required: true },
      { id: "learning", type: "textarea", question: "What did you learn from other submissions?", required: true },
      { id: "inspiration", type: "rating", question: "How inspired are you to create AI content?", required: true },
      { id: "next_project", type: "textarea", question: "What AI project will you work on next?", required: false }
    ]
  },
  {
    title: "IOT Workshop",
    description: "Internet of Things workshop covering sensors, connectivity, and smart device development.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "complexity", type: "rating", question: "Was the technical complexity appropriate?", required: true },
      { id: "hands_on", type: "rating", question: "Quality of hands-on exercises", required: true },
      { id: "concepts", type: "textarea", question: "Which IoT concepts were most interesting?", required: true },
      { id: "projects", type: "textarea", question: "What IoT projects do you want to build?", required: true },
      { id: "resources", type: "textarea", question: "What additional resources would help you?", required: false }
    ]
  },
  {
    title: "LinkedIn Workshop",
    description: "Professional networking workshop focusing on LinkedIn optimization and networking strategies.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "profile_tips", type: "rating", question: "Usefulness of profile optimization tips", required: true },
      { id: "networking_strategies", type: "rating", question: "Effectiveness of networking strategies", required: true },
      { id: "content_creation", type: "textarea", question: "What type of LinkedIn content will you create?", required: true },
      { id: "connections", type: "rating", question: "How confident are you about making new connections?", required: true },
      { id: "goals", type: "textarea", question: "What are your LinkedIn goals for the next 3 months?", required: false }
    ]
  },
  {
    title: "Drone Workshop",
    description: "Comprehensive drone technology workshop covering flight principles, applications, and hands-on flying.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "theory", type: "rating", question: "Clarity of theoretical concepts", required: true },
      { id: "practical", type: "rating", question: "Quality of practical flying experience", required: true },
      { id: "applications", type: "textarea", question: "Which drone applications interest you most?", required: true },
      { id: "safety", type: "rating", question: "How well were safety procedures explained?", required: true },
      { id: "future_use", type: "textarea", question: "How do you plan to use drone technology?", required: false }
    ]
  },
  {
    title: "Tribeathon Event",
    description: "Intensive collaborative event bringing together community members for innovation and networking.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "organization", type: "rating", question: "Event organization and management", required: true },
      { id: "collaboration", type: "rating", question: "Quality of collaboration opportunities", required: true },
      { id: "innovation", type: "textarea", question: "What innovative ideas emerged from the event?", required: true },
      { id: "networking", type: "rating", question: "Networking opportunities and connections made", required: true },
      { id: "impact", type: "textarea", question: "What impact will this event have on your journey?", required: false }
    ]
  },
  {
    title: "Blockchain Workshop",
    description: "Comprehensive blockchain technology workshop covering fundamentals, smart contracts, and decentralized applications.",
    questions: [
      { id: "location", type: "location", question: "Select your location", required: true },
      { id: "technical_depth", type: "rating", question: "How would you rate the technical depth of blockchain concepts?", required: true },
      { id: "practical_rating", type: "rating", question: "How practical and hands-on was the workshop?", required: true },
      { id: "interesting_concepts", type: "textarea", question: "Which blockchain concepts interested you most?", required: true },
      { id: "future_projects", type: "textarea", question: "What blockchain projects would you like to work on?", required: true },
      { id: "confidence_level", type: "rating", question: "How confident do you feel about blockchain development?", required: true },
      { id: "additional_resources", type: "textarea", question: "What additional resources would help you?", required: false },
      { id: "improvements", type: "textarea", question: "How can we improve future workshops?", required: false }
    ]
  }
];

export const useSessionManager = () => {
  const { createSession, sessions } = useFeedbackData();
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(false);

  const initializePredefinedSessions = async () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    
    try {
      let created = 0;
      
      for (const sessionTemplate of PREDEFINED_SESSIONS) {
        // Check if session already exists
        const exists = sessions.some(s => s.title === sessionTemplate.title);
        
        if (!exists) {
          await createSession({
            ...sessionTemplate,
            is_active: true
          });
          created++;
        }
      }
      
      if (created > 0) {
        toast({
          title: "Sessions Initialized",
          description: `${created} predefined sessions have been created successfully.`,
        });
      }
    } catch (error) {
      console.error('Error initializing sessions:', error);
      toast({
        title: "Initialization Error",
        description: "Some sessions could not be created. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const getPredefinedSessionsStatus = () => {
    const existing = sessions.filter(s => 
      PREDEFINED_SESSIONS.some(ps => ps.title === s.title)
    );
    
    return {
      total: PREDEFINED_SESSIONS.length,
      existing: existing.length,
      missing: PREDEFINED_SESSIONS.length - existing.length,
      missingTitles: PREDEFINED_SESSIONS
        .filter(ps => !sessions.some(s => s.title === ps.title))
        .map(ps => ps.title)
    };
  };

  return {
    initializePredefinedSessions,
    getPredefinedSessionsStatus,
    isInitializing,
    predefinedSessions: PREDEFINED_SESSIONS
  };
};