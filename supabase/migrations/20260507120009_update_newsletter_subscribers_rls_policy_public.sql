DROP POLICY IF EXISTS "Allow public newsletter subscribers insert" ON public.newsletter_subscribers;

CREATE POLICY "Allow public newsletter subscribers insert"
ON public.newsletter_subscribers FOR INSERT
TO public
WITH CHECK (true);