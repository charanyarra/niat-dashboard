
-- Create feedback_sessions table to store different feedback forms
CREATE TABLE public.feedback_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  share_link TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create feedback_responses table to store user responses
CREATE TABLE public.feedback_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.feedback_sessions(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  bootcamp_id TEXT NOT NULL,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to feedback forms
CREATE POLICY "Anyone can view active feedback sessions" 
  ON public.feedback_sessions 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Anyone can insert feedback responses" 
  ON public.feedback_responses 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for admin access (we'll implement admin auth later)
CREATE POLICY "Allow all operations for now" 
  ON public.feedback_sessions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for admin responses" 
  ON public.feedback_responses 
  FOR ALL 
  USING (true);

-- Insert default feedback sessions
INSERT INTO public.feedback_sessions (title, description, questions, share_link) VALUES
('Speed Math Feedback', 'Please provide your feedback for the Speed Math session', 
 '[
   {"id": "1", "type": "rating", "question": "How would you rate the overall session?", "required": true},
   {"id": "2", "type": "text", "question": "What did you like most about the session?", "required": false},
   {"id": "3", "type": "textarea", "question": "Any suggestions for improvement?", "required": false},
   {"id": "4", "type": "rating", "question": "How likely are you to recommend this session?", "required": true}
 ]'::jsonb, 'speed-math-' || substr(gen_random_uuid()::text, 1, 8)),

('Tribe Huddle Feedback', 'Share your experience with the Tribe Huddle session',
 '[
   {"id": "1", "type": "rating", "question": "Rate the session content quality", "required": true},
   {"id": "2", "type": "text", "question": "Most valuable takeaway", "required": false},
   {"id": "3", "type": "textarea", "question": "What could be improved?", "required": false}
 ]'::jsonb, 'tribe-huddle-' || substr(gen_random_uuid()::text, 1, 8)),

('Kaizen Feedback', 'Provide feedback for the Kaizen session',
 '[
   {"id": "1", "type": "rating", "question": "Overall session rating", "required": true},
   {"id": "2", "type": "text", "question": "Key learning", "required": false},
   {"id": "3", "type": "textarea", "question": "Suggestions", "required": false}
 ]'::jsonb, 'kaizen-' || substr(gen_random_uuid()::text, 1, 8));
