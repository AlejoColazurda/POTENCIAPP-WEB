-- Translations of each post (en, pt, fr). Spanish lives in blog_posts itself.
-- Run once in the Supabase SQL editor, after 003.
--
-- The panel creates them with AI when a post is published, and any member can
-- edit them. A locale without a row shows the Spanish article with a notice.

create table if not exists public.blog_post_translations (
  post_id      uuid not null references public.blog_posts (id) on delete cascade,
  locale       text not null check (locale in ('en', 'pt', 'fr')),
  title        text not null,
  description  text not null default '',
  body_md      text not null default '',
  origin       text not null default 'ai' check (origin in ('manual', 'ai')),
  -- Spanish updated_at this translation was made from, to flag stale ones.
  source_updated_at timestamptz,
  updated_by   text,
  updated_at   timestamptz not null default now(),
  primary key (post_id, locale)
);

drop trigger if exists blog_post_translations_touch on public.blog_post_translations;
create trigger blog_post_translations_touch before update on public.blog_post_translations
  for each row execute function public.blog_posts_touch();

alter table public.blog_post_translations enable row level security;

-- The public site reads a translation only while its post is published.
drop policy if exists "public reads translations of published posts" on public.blog_post_translations;
create policy "public reads translations of published posts" on public.blog_post_translations
  for select to anon, authenticated
  using (exists (
    select 1 from public.blog_posts p where p.id = post_id and p.status = 'published'
  ));
