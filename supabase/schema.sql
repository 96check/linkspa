-- ============================================================
-- LinkSpa Database Schema
-- ============================================================

-- Enable pgcrypto for gen_random_uuid() if not already enabled
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------
-- Tables
-- ----------------------------------------------------------

create table if not exists spas (
  id                 uuid        primary key default gen_random_uuid(),
  user_id            uuid,
  slug               text        unique not null,
  spa_name           text,
  bio                text,
  logo_url           text,
  theme              text        default 'midnight',
  address            text,
  address_line1      text,
  address_line2      text,
  city               text,
  state_region       text,
  postal_code        text,
  country            text,
  phone              text,
  google_review_url  text,
  created_at         timestamptz default now()
);

-- Migration: add bio column if upgrading from an older schema
-- alter table spas add column if not exists bio text;

-- Migration: tách địa chỉ thành 6 cột (chạy nếu nâng cấp từ schema cũ)
-- alter table spas add column if not exists address_line1 text;
-- alter table spas add column if not exists address_line2 text;
-- alter table spas add column if not exists city text;
-- alter table spas add column if not exists state_region text;
-- alter table spas add column if not exists postal_code text;
-- alter table spas add column if not exists country text;

create table if not exists links (
  id         uuid        primary key default gen_random_uuid(),
  spa_id     uuid        not null references spas(id) on delete cascade,
  type       text,
  title      text,
  url        text,
  "order"    int         default 0,
  active     boolean     default true,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------

create index if not exists idx_spas_slug    on spas(slug);
create index if not exists idx_links_spa_id on links(spa_id);

-- ----------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------

alter table spas  enable row level security;
alter table links enable row level security;

-- Public read access for the public-facing pages
create policy "Allow public read on spas"
  on spas for select
  using (true);

create policy "Allow public read on links"
  on links for select
  using (true);
