
-- Course notes (private to fellow)
CREATE TABLE public.course_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  phase_number TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fellows view own notes" ON public.course_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Fellows insert own notes" ON public.course_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Fellows update own notes" ON public.course_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Fellows delete own notes" ON public.course_notes FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_course_notes_updated_at
BEFORE UPDATE ON public.course_notes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Bookmarks
CREATE TABLE public.course_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  phase_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fellows view own bookmarks" ON public.course_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Fellows insert own bookmarks" ON public.course_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Fellows delete own bookmarks" ON public.course_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Certificates
CREATE TABLE public.course_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  phase_number TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fellows view own certificates" ON public.course_certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Fellows insert own certificates" ON public.course_certificates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Fellows delete own certificates" ON public.course_certificates FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins view all certificates" ON public.course_certificates FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for certificates (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', false);

CREATE POLICY "Fellows upload own certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Fellows view own certificates files"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Fellows delete own certificates files"
ON storage.objects FOR DELETE
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins view all certificate files"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates' AND has_role(auth.uid(), 'admin'::app_role));
