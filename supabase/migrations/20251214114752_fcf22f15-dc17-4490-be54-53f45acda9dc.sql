-- Create storage bucket for wish photos
INSERT INTO storage.buckets (id, name, public) VALUES ('wish-photos', 'wish-photos', true);

-- Allow authenticated users to upload photos
CREATE POLICY "Users can upload wish photos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'wish-photos' AND auth.uid() IS NOT NULL);

-- Allow public viewing of photos
CREATE POLICY "Anyone can view wish photos" ON storage.objects
FOR SELECT USING (bucket_id = 'wish-photos');

-- Allow users to delete their own photos
CREATE POLICY "Users can delete own photos" ON storage.objects
FOR DELETE USING (bucket_id = 'wish-photos' AND auth.uid()::text = (storage.foldername(name))[1]);