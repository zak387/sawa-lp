-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- 1. Table
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     text,
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.leads enable row level security;

-- 3. Allow the public (anon) role to INSERT only — no SELECT, so the list
--    cannot be read from the browser.
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
