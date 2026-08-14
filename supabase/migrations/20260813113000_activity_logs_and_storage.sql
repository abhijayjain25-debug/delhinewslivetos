-- ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "staff read activity_logs" ON public.activity_logs;
CREATE POLICY "staff read activity_logs" ON public.activity_logs
  FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "staff insert activity_logs" ON public.activity_logs;
CREATE POLICY "staff insert activity_logs" ON public.activity_logs
  FOR INSERT TO authenticated WITH CHECK (private.is_staff(auth.uid()));

-- STORAGE BUCKET POLICIES FOR MEDIA
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'];

DROP POLICY IF EXISTS "Public read media objects" ON storage.objects;
CREATE POLICY "Public read media objects" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Staff insert media objects" ON storage.objects;
CREATE POLICY "Staff insert media objects" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff update media objects" ON storage.objects;
CREATE POLICY "Staff update media objects" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'media' AND private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff delete media objects" ON storage.objects;
CREATE POLICY "Staff delete media objects" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media' AND private.is_staff(auth.uid()));
