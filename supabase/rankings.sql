-- Google Ranking Tracker (/admin/rankings): saved keywords and dated results.
-- REVIEW ONLY: run this yourself in the Supabase SQL editor. Nothing applies it automatically.
-- Needs public.is_seo_admin(), which supabase/seo-audit.sql already created.
-- Safe to run again (IF NOT EXISTS / DROP POLICY IF EXISTS).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.rank_keywords (
  id                uuid primary key default gen_random_uuid(),
  -- always stored trimmed and lowercase (the app normalises; the check enforces it)
  keyword           text not null
                    check (keyword = lower(btrim(keyword)) and char_length(keyword) between 2 and 200 and keyword !~ '[[:cntrl:]]'),
  location          text not null default 'India'
                    check (location in ('India', 'Chennai, Tamil Nadu, India', 'Mumbai, Maharashtra, India')),
  depth             smallint not null default 1 check (depth in (1, 2, 3)),
  -- weekly job: Search Console always; SerpApi only when this is true
  track_competitors boolean not null default false,
  active            boolean not null default true,
  created_at        timestamptz not null default now(),
  last_checked_at   timestamptz,
  unique (keyword, location)
);

create table if not exists public.rank_results (
  id            bigint generated always as identity primary key,
  -- kept (set null) if the saved keyword is removed, so history is not lost
  keyword_id    uuid references public.rank_keywords (id) on delete set null,
  keyword       text not null,
  source        text not null check (source in ('gsc', 'serpapi')),
  location      text,
  checked_on    date not null default current_date,
  checked_at    timestamptz not null default now(),
  -- gsc:     {avg_position, impressions, clicks, page, pages, start_date, end_date, daily}
  -- serpapi: {first_match_position, depth, results:[{position, page, title, link, domain, isOurs}]}
  data          jsonb not null,
  searches_used smallint not null default 0 check (searches_used between 0 and 3)
);

create index if not exists rank_keywords_active_checked_idx on public.rank_keywords (active, last_checked_at nulls first);
create index if not exists rank_results_keyword_date_idx    on public.rank_results (keyword_id, checked_on desc);
create index if not exists rank_results_checked_at_idx      on public.rank_results (checked_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security: only the authenticated admin may read or write
-- ---------------------------------------------------------------------------

alter table public.rank_keywords enable row level security;
alter table public.rank_results  enable row level security;

revoke all on public.rank_keywords, public.rank_results from anon;

grant select, insert, update, delete on public.rank_keywords, public.rank_results to authenticated;
-- Only the sequence that belongs to rank_results (its identity column), not every sequence in the schema.
grant usage, select on sequence public.rank_results_id_seq to authenticated;

drop policy if exists "rank admin only" on public.rank_keywords;
create policy "rank admin only" on public.rank_keywords
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

drop policy if exists "rank admin only" on public.rank_results;
create policy "rank admin only" on public.rank_results
  for all to authenticated using (public.is_seo_admin()) with check (public.is_seo_admin());

-- Note: the weekly job (/api/cron/rankings) has no user session, so it uses the service-role
-- key, which bypasses RLS. That key stays on the server and is never sent to the browser.
