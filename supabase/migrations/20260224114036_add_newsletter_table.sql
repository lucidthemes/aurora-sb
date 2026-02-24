CREATE TABLE public.newsletter_subscribers(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers
ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);

ALTER TABLE public.newsletter_subscribers
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public newsletter subscribers insert"
ON public.newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);