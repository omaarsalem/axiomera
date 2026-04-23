-- Blog post enhancements
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published'));

-- Lead lifecycle: enquiries
ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

CREATE POLICY "Admins can update enquiries"
  ON public.enquiries FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Lead lifecycle: career interests
ALTER TABLE public.career_interests
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

CREATE POLICY "Admins can update career interests"
  ON public.career_interests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin activity log
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id UUID NOT NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view activity log"
  ON public.admin_activity_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert activity log"
  ON public.admin_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = actor_id);

CREATE INDEX IF NOT EXISTS idx_admin_activity_created ON public.admin_activity_log(created_at DESC);

-- Storage bucket for blog post covers
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-covers', 'post-covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Post covers are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-covers');

CREATE POLICY "Admins upload post covers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update post covers"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete post covers"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));