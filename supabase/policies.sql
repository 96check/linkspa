-- ============================================================
-- LinkSpa RLS Policies  (v2 – owner CRUD + active-only public)
-- Run AFTER schema.sql
-- ============================================================
--
-- schema.sql creates two public SELECT policies:
--   "Allow public read on spas"  → using (true)
--   "Allow public read on links" → using (true)
--
-- This file REPLACES the broad links public-read policy with
-- an active-only policy, and adds all owner CRUD policies.
-- ============================================================

-- ----------------------------------------------------------
-- 1. Replace the broad public read on links.
--    Public visitors should only see active links.
-- ----------------------------------------------------------

drop policy if exists "Allow public read on links" on links;

create policy "Public can read active links"
  on links for select
  to anon
  using (active = true);

-- ----------------------------------------------------------
-- 2. Spas: authenticated user policies
-- ----------------------------------------------------------

create policy "Users can insert their own spa"
  on spas for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Users can update their own spa"
  on spas for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ----------------------------------------------------------
-- 3. Links: authenticated owner policies
-- ----------------------------------------------------------

-- Owners can read ALL their links (including inactive) for the dashboard.
-- Logged-in users visiting public pages also see active links of any spa.
create policy "Authenticated read own or active links"
  on links for select
  to authenticated
  using (
    active = true
    or spa_id in (select id from spas where user_id = auth.uid())
  );

create policy "Users can insert links for their spa"
  on links for insert
  to authenticated
  with check (
    spa_id in (select id from spas where user_id = auth.uid())
  );

create policy "Users can update links for their spa"
  on links for update
  to authenticated
  using (
    spa_id in (select id from spas where user_id = auth.uid())
  )
  with check (
    spa_id in (select id from spas where user_id = auth.uid())
  );

create policy "Users can delete links for their spa"
  on links for delete
  to authenticated
  using (
    spa_id in (select id from spas where user_id = auth.uid())
  );
