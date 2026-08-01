create extension if not exists pgcrypto;

create type public.application_status as enum (
  'new',
  'contacted',
  'trial_scheduled',
  'registered',
  'rejected'
);

create type public.gallery_display_size as enum ('normal', 'wide', 'tall', 'large');

create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  academy_name text not null,
  hero_title text not null,
  hero_description text not null,
  phone_primary text not null,
  phone_secondary text not null default '',
  whatsapp_number text not null,
  whatsapp_message text not null default '',
  whatsapp_enabled boolean not null default true,
  instagram_username text not null default '',
  instagram_url text not null default '',
  instagram_enabled boolean not null default true,
  email text not null,
  venue_name text not null,
  address text not null,
  google_maps_embed_url text not null default '',
  google_maps_directions_url text not null default '',
  map_enabled boolean not null default false,
  registration_open boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.coaches (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  role text not null,
  biography text not null default '',
  photo_url text not null default '',
  display_order integer not null default 0 check (display_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text not null,
  alt_text text not null,
  object_position text not null default 'center',
  display_size public.gallery_display_size not null default 'normal',
  display_order integer not null default 0 check (display_order >= 0),
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.training_programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  age_range text not null,
  schedule text not null,
  description text not null,
  capacity_text text not null default '',
  display_order integer not null default 0 check (display_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.registration_applications (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  player_name text not null,
  birth_year integer not null check (birth_year between 2000 and 2100),
  phone text not null,
  selected_program text not null,
  status public.application_status not null default 'new',
  admin_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index coaches_active_order_idx on public.coaches (is_active, display_order);
create index gallery_visible_order_idx on public.gallery_images (is_visible, display_order);
create index programs_active_order_idx on public.training_programs (is_active, display_order);
create index applications_status_created_idx on public.registration_applications (status, created_at desc);
create index applications_phone_idx on public.registration_applications (phone);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();
create trigger coaches_updated_at before update on public.coaches
for each row execute function public.set_updated_at();
create trigger gallery_images_updated_at before update on public.gallery_images
for each row execute function public.set_updated_at();
create trigger training_programs_updated_at before update on public.training_programs
for each row execute function public.set_updated_at();
create trigger registration_applications_updated_at before update on public.registration_applications
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.coaches enable row level security;
alter table public.gallery_images enable row level security;
alter table public.training_programs enable row level security;
alter table public.registration_applications enable row level security;

create policy "Admins can read own role" on public.admin_users
for select to authenticated using (id = (select auth.uid()));

create policy "Public can read site settings" on public.site_settings
for select to anon, authenticated using (true);
create policy "Admins manage site settings" on public.site_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads active coaches" on public.coaches
for select to anon, authenticated using (is_active = true or public.is_admin());
create policy "Admins manage coaches" on public.coaches
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads visible gallery" on public.gallery_images
for select to anon, authenticated using (is_visible = true or public.is_admin());
create policy "Admins manage gallery" on public.gallery_images
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads active programs" on public.training_programs
for select to anon, authenticated using (is_active = true or public.is_admin());
create policy "Admins manage programs" on public.training_programs
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can create applications" on public.registration_applications
for insert to anon, authenticated with check (
  status = 'new' and coalesce(admin_note, '') = ''
);
create policy "Admins manage applications" on public.registration_applications
for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('coach-images', 'coach-images', true, 4194304, array['image/jpeg', 'image/png', 'image/webp']),
  ('gallery-images', 'gallery-images', true, 4194304, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public reads academy storage" on storage.objects
for select to public using (bucket_id in ('coach-images', 'gallery-images'));
create policy "Admins upload academy storage" on storage.objects
for insert to authenticated with check (
  bucket_id in ('coach-images', 'gallery-images') and public.is_admin()
);
create policy "Admins update academy storage" on storage.objects
for update to authenticated using (
  bucket_id in ('coach-images', 'gallery-images') and public.is_admin()
) with check (
  bucket_id in ('coach-images', 'gallery-images') and public.is_admin()
);
create policy "Admins delete academy storage" on storage.objects
for delete to authenticated using (
  bucket_id in ('coach-images', 'gallery-images') and public.is_admin()
);
