-- Add more sample feedback responses with Indian names across all sessions
INSERT INTO feedback_responses (user_name, user_email, bootcamp_id, session_id, responses, submitted_at) VALUES
-- Speed Math Workshop responses
('Arjun Mehta', 'arjun.mehta@email.com', 'BC2024011', 
 (SELECT id FROM feedback_sessions WHERE title = 'Speed Math Workshop' LIMIT 1),
 '{"location": "Pune", "rating": "5", "techniques": "Mental math tricks and speed calculation methods were excellent", "difficulty": "4", "practical": "5", "suggestions": "More practice sessions would be helpful"}',
 '2024-01-20 10:15:00'),
('Pooja Sharma', 'pooja.sharma@email.com', 'BC2024012',
 (SELECT id FROM feedback_sessions WHERE title = 'Speed Math Workshop' LIMIT 1),
 '{"location": "Hyderabad", "rating": "4", "techniques": "Loved the Vedic math techniques", "difficulty": "3", "practical": "4", "suggestions": "Include more real-world applications"}',
 '2024-01-20 14:30:00'),

-- Gen AI Workshop responses
('Karan Singh', 'karan.singh@email.com', 'BC2024013',
 (SELECT id FROM feedback_sessions WHERE title = 'Gen AI Workshop' LIMIT 1),
 '{"location": "Noida", "technical_depth": "5", "practical_demos": "4", "ai_tools": "ChatGPT, Midjourney, and GitHub Copilot", "use_cases": "Content creation and coding assistance", "concerns": "Data privacy and job displacement"}',
 '2024-01-21 09:45:00'),
('Divya Patel', 'divya.patel@email.com', 'BC2024014',
 (SELECT id FROM feedback_sessions WHERE title = 'Gen AI Workshop' LIMIT 1),
 '{"location": "Pune", "technical_depth": "4", "practical_demos": "5", "ai_tools": "Claude and Gemini for research", "use_cases": "Academic research and report writing", "concerns": "Learning curve and implementation costs"}',
 '2024-01-21 16:20:00'),

-- Personal Branding Workshop responses
('Rohit Kumar', 'rohit.kumar@email.com', 'BC2024015',
 (SELECT id FROM feedback_sessions WHERE title = 'Personal Branding Workshop' LIMIT 1),
 '{"location": "Hyderabad", "content_quality": "5", "practical_tips": "4", "platforms": "LinkedIn, Twitter, and personal website", "challenges": "Time management and consistent content creation", "action_plan": "Post weekly on LinkedIn and update portfolio"}',
 '2024-01-22 11:00:00'),
('Ananya Nair', 'ananya.nair@email.com', 'BC2024016',
 (SELECT id FROM feedback_sessions WHERE title = 'Personal Branding Workshop' LIMIT 1),
 '{"location": "Noida", "content_quality": "4", "practical_tips": "5", "platforms": "Instagram and YouTube for creative content", "challenges": "Finding my unique voice and niche", "action_plan": "Create content calendar and engage with community"}',
 '2024-01-22 15:45:00'),

-- LinkedIn Workshop responses
('Sanjay Gupta', 'sanjay.gupta@email.com', 'BC2024017',
 (SELECT id FROM feedback_sessions WHERE title = 'LinkedIn Workshop' LIMIT 1),
 '{"location": "Pune", "profile_tips": "5", "networking_strategies": "4", "content_creation": "Industry insights and career tips", "connections": "4", "goals": "Build network of 500+ connections and get 3 job offers"}',
 '2024-01-23 10:30:00'),
('Meera Iyer', 'meera.iyer@email.com', 'BC2024018',
 (SELECT id FROM feedback_sessions WHERE title = 'LinkedIn Workshop' LIMIT 1),
 '{"location": "Hyderabad", "profile_tips": "4", "networking_strategies": "5", "content_creation": "Tech tutorials and project showcases", "connections": "5", "goals": "Establish thought leadership in AI/ML space"}',
 '2024-01-23 14:15:00'),

-- IOT Workshop responses
('Vikash Jain', 'vikash.jain@email.com', 'BC2024019',
 (SELECT id FROM feedback_sessions WHERE title = 'IOT Workshop' LIMIT 1),
 '{"location": "Noida", "complexity": "4", "hands_on": "5", "concepts": "Smart home automation and industrial IoT", "projects": "Home security system with sensors", "resources": "More Arduino tutorials and sensor documentation"}',
 '2024-01-24 09:00:00'),
('Priyanka Reddy', 'priyanka.reddy@email.com', 'BC2024020',
 (SELECT id FROM feedback_sessions WHERE title = 'IOT Workshop' LIMIT 1),
 '{"location": "Pune", "complexity": "3", "hands_on": "4", "concepts": "Environmental monitoring systems", "projects": "Air quality monitoring for my city", "resources": "Cloud platform integration guides"}',
 '2024-01-24 16:30:00'),

-- Drone Workshop responses
('Aditya Mishra', 'aditya.mishra@email.com', 'BC2024021',
 (SELECT id FROM feedback_sessions WHERE title = 'Drone Workshop' LIMIT 1),
 '{"location": "Hyderabad", "theory": "5", "practical": "4", "applications": "Agriculture monitoring and disaster management", "safety": "5", "future_use": "Agricultural consultancy and aerial photography"}',
 '2024-01-25 11:45:00'),
('Shreya Agarwal', 'shreya.agarwal@email.com', 'BC2024022',
 (SELECT id FROM feedback_sessions WHERE title = 'Drone Workshop' LIMIT 1),
 '{"location": "Noida", "theory": "4", "practical": "5", "applications": "Real estate marketing and surveying", "safety": "4", "future_use": "Start drone services business for construction industry"}',
 '2024-01-25 13:20:00'),

-- Kaizen Workshop responses
('Manish Agrawal', 'manish.agrawal@email.com', 'BC2024023',
 (SELECT id FROM feedback_sessions WHERE title = 'Kaizen Workshop' LIMIT 1),
 '{"location": "Pune", "understanding": "5", "applicability": "4", "examples": "Daily routine optimization and work process improvement", "tools": "5", "implementation": "Start with 5S methodology in workspace"}',
 '2024-01-26 10:00:00'),
('Neha Kapoor', 'neha.kapoor@email.com', 'BC2024024',
 (SELECT id FROM feedback_sessions WHERE title = 'Kaizen Workshop' LIMIT 1),
 '{"location": "Hyderabad", "understanding": "4", "applicability": "5", "examples": "Team collaboration and project management", "tools": "4", "implementation": "Weekly improvement sessions with team"}',
 '2024-01-26 15:30:00'),

-- Community Building Session responses
('Rajesh Verma', 'rajesh.verma@email.com', 'BC2024025',
 (SELECT id FROM feedback_sessions WHERE title = 'Community Building Session' LIMIT 1),
 '{"location": "Noida", "strategies": "5", "engagement": "4", "tools": "Discord, Slack, and WhatsApp groups", "community_goals": "Build tech community for students in my college", "support_needed": "Mentorship on content strategy and event planning"}',
 '2024-01-27 09:30:00'),
('Swati Joshi', 'swati.joshi@email.com', 'BC2024026',
 (SELECT id FROM feedback_sessions WHERE title = 'Community Building Session' LIMIT 1),
 '{"location": "Pune", "strategies": "4", "engagement": "5", "tools": "LinkedIn groups and Telegram", "community_goals": "Women in tech network for career support", "support_needed": "Help with organizing virtual events"}',
 '2024-01-27 14:45:00'),

-- Tribe Huddle Session responses
('Amit Bansal', 'amit.bansal@email.com', 'BC2024027',
 (SELECT id FROM feedback_sessions WHERE title = 'Tribe Huddle Session' LIMIT 1),
 '{"location": "Hyderabad", "overall": "5", "networking": "4", "activities": "Group problem solving and idea brainstorming", "connections": "5", "future": "More industry-specific huddles and guest speakers"}',
 '2024-01-28 11:15:00'),
('Kavitha Menon', 'kavitha.menon@email.com', 'BC2024028',
 (SELECT id FROM feedback_sessions WHERE title = 'Tribe Huddle Session' LIMIT 1),
 '{"location": "Noida", "overall": "4", "networking": "5", "activities": "Collaborative projects and peer learning", "connections": "4", "future": "Follow-up sessions and mentorship matching"}',
 '2024-01-28 16:00:00'),

-- Tribeathon Event responses
('Deepak Joshi', 'deepak.joshi@email.com', 'BC2024029',
 (SELECT id FROM feedback_sessions WHERE title = 'Tribeathon Event' LIMIT 1),
 '{"location": "Pune", "organization": "5", "collaboration": "5", "innovation": "AI-powered education platform and sustainable transport solutions", "networking": "4", "impact": "Motivated to start my own EdTech venture"}',
 '2024-01-29 18:30:00'),
('Rishika Gupta', 'rishika.gupta@email.com', 'BC2024030',
 (SELECT id FROM feedback_sessions WHERE title = 'Tribeathon Event' LIMIT 1),
 '{"location": "Hyderabad", "organization": "4", "collaboration": "5", "innovation": "Healthcare accessibility app and fintech solutions", "networking": "5", "impact": "Found co-founders for my startup idea"}',
 '2024-01-29 19:45:00'),

-- Gen AI Video Submission responses
('Varun Sharma', 'varun.sharma@email.com', 'BC2024031',
 (SELECT id FROM feedback_sessions WHERE title = 'Gen AI Video Submission' LIMIT 1),
 '{"location": "Noida", "creativity": "5", "technical_quality": "4", "learning": "Different AI tools and creative applications", "inspiration": "5", "next_project": "AI-generated music video for my band"}',
 '2024-01-30 12:00:00'),
('Tanvi Patel', 'tanvi.patel@email.com', 'BC2024032',
 (SELECT id FROM feedback_sessions WHERE title = 'Gen AI Video Submission' LIMIT 1),
 '{"location": "Pune", "creativity": "4", "technical_quality": "5", "learning": "Advanced prompting techniques and video editing", "inspiration": "4", "next_project": "Educational content series using AI animation"}',
 '2024-01-30 17:20:00');