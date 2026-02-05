-- Launch areas (the 7 scroll sections: Math, ReadTheory, English Grammar, Science, Typing, My Workshops, I'm Bored!)
create table if not exists public.launch_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tiles (records per launch area: title + URL)
create table if not exists public.tiles (
  id uuid primary key default gen_random_uuid(),
  launch_area_id uuid not null references public.launch_areas(id) on delete cascade,
  title text not null,
  url text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_tiles_launch_area on public.tiles(launch_area_id);
create index if not exists idx_launch_areas_sort on public.launch_areas(sort_order);
create index if not exists idx_tiles_sort on public.tiles(launch_area_id, sort_order);

-- RLS: allow read for authenticated users, full access for service role / admin
alter table public.launch_areas enable row level security;
alter table public.tiles enable row level security;

-- Students: read launch_areas and visible tiles only
create policy "Students can read launch areas"
  on public.launch_areas for select
  to authenticated
  using (true);

create policy "Students can read visible tiles"
  on public.tiles for select
  to authenticated
  using (is_visible = true);

-- Admin: we'll use a custom claim or separate admin table; for now allow authenticated to manage if you add admin check in app
-- For simplicity: allow authenticated to do all (you can restrict by email or role later)
create policy "Authenticated can manage launch areas"
  on public.launch_areas for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage tiles"
  on public.tiles for all
  to authenticated
  using (true)
  with check (true);

-- Trigger to update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger launch_areas_updated_at
  before update on public.launch_areas
  for each row execute function public.set_updated_at();

create trigger tiles_updated_at
  before update on public.tiles
  for each row execute function public.set_updated_at();
