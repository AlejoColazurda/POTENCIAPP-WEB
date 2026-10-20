-- Fields the public blog UI shows on cards and article pages. Run once in the
-- Supabase SQL editor, after 002.

alter table public.blog_posts add column if not exists cover_image text not null default '';
alter table public.blog_posts add column if not exists category text not null default 'security';
alter table public.blog_posts add column if not exists author_name text not null default 'Equipo PotenciApp';

alter table public.blog_posts drop constraint if exists blog_posts_category_check;
alter table public.blog_posts add constraint blog_posts_category_check check (
  category in ('security', 'news', 'ai-agents', 'mobile-apps', 'web-engineering', 'automation', 'startups-scale')
);
