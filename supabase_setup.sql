-- Supabase Database Setup Script for HealthSync
-- Run this in the Supabase SQL Editor

-- 1. Create Team Table
CREATE TABLE public.team (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  photo text,
  email text,
  password text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  image text,
  category text NOT NULL,
  brochure text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Jobs Table
CREATE TABLE public.jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  "postedDate" text NOT NULL,
  "shortDescription" text NOT NULL,
  "longDescription" text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Clients Table
CREATE TABLE public.clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) on all tables
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create Open Policies (Allow anon reads/writes for admin demo purposes)
-- Note: In a production app with authentication, you would restrict INSERT/UPDATE/DELETE to authenticated admins only.

CREATE POLICY "Enable all access for team" ON public.team FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for jobs" ON public.jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
