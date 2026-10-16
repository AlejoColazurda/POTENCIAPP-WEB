-- Team access for /admin. Run once in the Supabase SQL editor, after 001.
--
-- Owners come from the ADMIN_EMAILS env var and are not stored here, so a
-- broken table can never lock them out. This table holds the people an owner
-- invites from /admin/equipo (role 'editor'), or extra owners.
--
-- Login is passwordless: a one-time link sent by email (or copied by an owner
-- from the panel). Nobody gets a link unless their email is an owner or an
-- active row here.

create table if not exists public.blog_members (
  email       text primary key check (email = lower(email)),
  role        text not null default 'editor' check (role in ('owner', 'editor')),
  active      boolean not null default true,
  invited_by  text,
  created_at  timestamptz not null default now()
);

-- Service role only: no policies, so the anon key cannot read or write it.
alter table public.blog_members enable row level security;

-- Who last touched each post, so work can be handed to an editor and audited.
alter table public.blog_posts add column if not exists created_by text;
alter table public.blog_posts add column if not exists updated_by text;
