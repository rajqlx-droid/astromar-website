-- SEO Audit (/admin/seo): tables, Row Level Security and admin-only policies.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It is safe to run again (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
--
-- STEP 0: replace the email below with the SAME address you set as ADMIN_EMAIL
-- and used for the user you create under Authentication -> Users.

create or replace function public.is_seo_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('sales@astromarfreezone.com');
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.seo_scans (
  id          uuid primary key default gen_random_uuid(),
  base_url    text not null,
  started_at  timestamptz not null,
  finished_at timestamptz not null,
  -- headline counts plus robots.txt, sitemap check and redirect results
  summary     jsonb not null default '{}'::jsonb
);

create table if not exists public.seo_pages (
  id      bigint generated always as identity primary key,
  scan_id uuid not null references public.seo_scans (id) on delete cascade,
  url     text not null,
  -- title, description, canonical, headings, issues, wording matches, ...
  data    jsonb not null default '{}'::jsonb,
  unique (scan_id, url)
);

create table if not exists public.seo_images (
  id       bigint generated always as identity primary key,
  scan_id  uuid not null references public.seo_scans (id) on delete cascade,
  page_url text not null,
  data     jsonb not null default '{}'::jsonb
);

create table if not exists public.seo_flags_ignored (
  url        text not null,
  flag       text not null,
  created_at timestamptz not null default now(),
  primary key (url, flag)
);

create table if not exists public.seo_expected (
  url    text primary key,
  reason text
);

create index if not exists seo_scans_finished_at_idx on public.seo_scans (finished_at desc);
create index if not exists seo_pages_scan_id_idx     on public.seo_pages (scan_id);
create index if not exists seo_images_scan_id_idx    on public.seo_images (scan_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: only the authenticated admin may read or write
-- ---------------------------------------------------------------------------

alter table public.seo_scans         enable row level security;
alter table public.seo_pages         enable row level security;
alter table public.seo_images        enable row level security;
alter table public.seo_flags_ignored enable row level security;
alter table public.seo_expected      enable row level security;

-- Visitors who are not logged in (the public anon key) get no access at all.
revoke all on public.seo_scans, public.seo_pages, public.seo_images,
              public.seo_flags_ignored, public.seo_expected from anon;

grant select, insert, update, delete on public.seo_scans, public.seo_pages, public.seo_images,
                                         public.seo_flags_ignored, public.seo_expected to authenticated;
grant usage, select on all sequences in schema public to authenticated;

drop policy if exists "seo admin only" on public.seo_scans;
create policy "seo admin only" on public.seo_scans
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

drop policy if exists "seo admin only" on public.seo_pages;
create policy "seo admin only" on public.seo_pages
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

drop policy if exists "seo admin only" on public.seo_images;
create policy "seo admin only" on public.seo_images
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

drop policy if exists "seo admin only" on public.seo_flags_ignored;
create policy "seo admin only" on public.seo_flags_ignored
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

drop policy if exists "seo admin only" on public.seo_expected;
create policy "seo admin only" on public.seo_expected
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

-- Note: the scan-save step runs on your machine with the service-role key, which
-- bypasses RLS. That key stays in .env.local and is never sent to the browser.
