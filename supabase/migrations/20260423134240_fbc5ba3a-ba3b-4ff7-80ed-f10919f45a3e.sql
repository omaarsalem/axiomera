
-- Learning paths
CREATE TABLE public.learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  description text,
  fellow_name text,
  duration_label text,
  cost_label text DEFAULT '£0',
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published paths"
  ON public.learning_paths FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all paths"
  ON public.learning_paths FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert paths"
  ON public.learning_paths FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update paths"
  ON public.learning_paths FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete paths"
  ON public.learning_paths FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_learning_paths_updated
  BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Phases
CREATE TABLE public.phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  number text NOT NULL,
  title text NOT NULL,
  months text,
  goal text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (path_id, number)
);

ALTER TABLE public.phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view phases of published paths"
  ON public.phases FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.learning_paths lp WHERE lp.id = path_id AND lp.is_published = true));

CREATE POLICY "Admins can view all phases"
  ON public.phases FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert phases"
  ON public.phases FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update phases"
  ON public.phases FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete phases"
  ON public.phases FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_phases_updated
  BEFORE UPDATE ON public.phases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Courses
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES public.phases(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  platform text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  estimated_hours int NOT NULL DEFAULT 8,
  level text,
  language text DEFAULT 'English',
  sort_order int NOT NULL DEFAULT 0,
  prerequisite_course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses of published paths"
  ON public.courses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.phases p
    JOIN public.learning_paths lp ON lp.id = p.path_id
    WHERE p.id = phase_id AND lp.is_published = true
  ));

CREATE POLICY "Admins can view all courses"
  ON public.courses FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_courses_updated
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enrolments
CREATE TABLE public.enrolments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, path_id)
);

ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fellows view own enrolments"
  ON public.enrolments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Fellows insert own enrolments"
  ON public.enrolments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Fellows delete own enrolments"
  ON public.enrolments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all enrolments"
  ON public.enrolments FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_phases_path ON public.phases(path_id, sort_order);
CREATE INDEX idx_courses_phase ON public.courses(phase_id, sort_order);
CREATE INDEX idx_enrolments_user ON public.enrolments(user_id);
