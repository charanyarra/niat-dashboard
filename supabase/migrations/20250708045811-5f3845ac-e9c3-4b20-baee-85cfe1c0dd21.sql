-- Enable real-time for feedback_responses table
ALTER TABLE public.feedback_responses REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_responses;