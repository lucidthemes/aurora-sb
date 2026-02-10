CREATE TABLE public.customers(
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    first_name text,
    last_name text,
    shipping_address jsonb,
    billing_address jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own customer profile" ON public.customers FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);