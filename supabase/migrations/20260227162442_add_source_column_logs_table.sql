CREATE TYPE public.log_source AS ENUM ('frontend', 'dashboard');

ALTER TABLE public.logs
ADD COLUMN source log_source NOT NULL DEFAULT 'frontend'