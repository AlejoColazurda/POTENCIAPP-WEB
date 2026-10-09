-- Blog posts managed from /admin. Run once in the Supabase SQL editor
-- (Dashboard → SQL Editor → paste → Run).
--
-- Articles that live as Markdown files in content/blog/ are NOT in this table;
-- the site merges both sources, and a DB post with the same slug wins.

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title         text not null,
  description   text not null default '',
  tag           text not null default 'Ciberseguridad',
  body_md       text not null default '',
  status        text not null default 'draft' check (status in ('draft', 'published', 'discarded')),
  origin        text not null default 'manual' check (origin in ('manual', 'ai')),
  -- Pages the AI drafted from: [{ "title": "...", "url": "..." }]
  sources       jsonb not null default '[]'::jsonb,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists blog_posts_status_published_idx
  on public.blog_posts (status, published_at desc);

create or replace function public.blog_posts_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
  for each row execute function public.blog_posts_touch();

-- Row Level Security: the public site (anon key) can read published posts
-- only. All writes go through the server with the service-role key, after the
-- admin session has been checked against ADMIN_EMAILS.
alter table public.blog_posts enable row level security;

drop policy if exists "public reads published posts" on public.blog_posts;
create policy "public reads published posts" on public.blog_posts
  for select to anon, authenticated
  using (status = 'published');

-- Public bucket for article images uploaded from the editor.
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;
