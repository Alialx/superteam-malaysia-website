create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  slug text not null unique,
  role text,
  company text,
  avatar_url text,
  twitter_handle text,
  github_handle text,
  website_url text,
  bio text,
  tags text[] default '{}'::text[],
  created_at timestamptz not null default timezone('utc'::text, now())
);

insert into public.members (full_name, slug, role, company, twitter_handle)
values
  (
    'Alice Example',
    'alice-example',
    'Builder',
    'Superteam Malaysia',
    '@alice_example'
  ),
  (
    'Bob Example',
    'bob-example',
    'Designer',
    'Superteam Malaysia',
    '@bob_example'
  )
on conflict (slug) do nothing;

