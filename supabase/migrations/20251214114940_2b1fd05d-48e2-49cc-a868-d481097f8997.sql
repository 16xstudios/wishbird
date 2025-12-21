-- Add subscription and usage tracking to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS wishes_sent_count INTEGER NOT NULL DEFAULT 0;

-- Create storage bucket for videos and audio
INSERT INTO storage.buckets (id, name, public) VALUES ('wish-videos', 'wish-videos', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('wish-audio', 'wish-audio', true) ON CONFLICT DO NOTHING;

-- Storage policies for videos
CREATE POLICY "Users can upload wish videos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'wish-videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view wish videos" ON storage.objects
FOR SELECT USING (bucket_id = 'wish-videos');

CREATE POLICY "Users can delete own videos" ON storage.objects
FOR DELETE USING (bucket_id = 'wish-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for audio
CREATE POLICY "Users can upload wish audio" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'wish-audio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view wish audio" ON storage.objects
FOR SELECT USING (bucket_id = 'wish-audio');

CREATE POLICY "Users can delete own audio" ON storage.objects
FOR DELETE USING (bucket_id = 'wish-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add video and audio URL columns to wishes
ALTER TABLE public.wishes ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.wishes ADD COLUMN IF NOT EXISTS audio_url TEXT;