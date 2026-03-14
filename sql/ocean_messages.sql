create extension if not exists pgcrypto;

create table if not exists public.ocean_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  company text,
  email text,
  subject text,
  detail text not null,
  source_page text,
  created_at timestamptz not null default now()
);

create index if not exists ocean_messages_created_at_idx
  on public.ocean_messages (created_at desc);
