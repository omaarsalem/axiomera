
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an enquiry (public contact form)
CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view enquiries
CREATE POLICY "Authenticated users can view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);
