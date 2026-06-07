-- Auto-create profile when a new user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Watchlists
create table if not exists public.watchlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create index if not exists watchlists_user_id_idx on public.watchlists (user_id);

alter table public.watchlists enable row level security;

create policy "Users can read own watchlists"
  on public.watchlists
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own watchlists"
  on public.watchlists
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own watchlists"
  on public.watchlists
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own watchlists"
  on public.watchlists
  for delete
  using (auth.uid() = user_id);

-- Watchlist items
create table if not exists public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  watchlist_id uuid not null references public.watchlists (id) on delete cascade,
  symbol text not null,
  created_at timestamptz not null default now(),
  unique (watchlist_id, symbol)
);

create index if not exists watchlist_items_watchlist_id_idx
  on public.watchlist_items (watchlist_id);

alter table public.watchlist_items enable row level security;

create policy "Users can read own watchlist items"
  on public.watchlist_items
  for select
  using (
    exists (
      select 1
      from public.watchlists w
      where w.id = watchlist_id
        and w.user_id = auth.uid()
    )
  );

create policy "Users can insert own watchlist items"
  on public.watchlist_items
  for insert
  with check (
    exists (
      select 1
      from public.watchlists w
      where w.id = watchlist_id
        and w.user_id = auth.uid()
    )
  );

create policy "Users can delete own watchlist items"
  on public.watchlist_items
  for delete
  using (
    exists (
      select 1
      from public.watchlists w
      where w.id = watchlist_id
        and w.user_id = auth.uid()
    )
  );
