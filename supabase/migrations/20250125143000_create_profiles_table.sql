-- Migration: Create profiles table for user role management
-- Purpose: Extend Supabase auth.users with role-based access control
-- Affected tables: profiles
-- Dependencies: auth.users (Supabase built-in)

-- create profiles table to extend auth.users with additional user information
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'student')),
  first_name text,
  last_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.profiles is 'User profiles extending auth.users with role-based information and personal details.';
comment on column public.profiles.role is 'User role: admin (manages platform) or student (takes courses).';
comment on column public.profiles.first_name is 'User first name for display purposes.';
comment on column public.profiles.last_name is 'User last name for display purposes.';

-- enable row level security on profiles table
alter table public.profiles enable row level security;

-- create policies for profiles table

-- policy: allow users to view their own profile
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ( (select auth.uid()) = id );

-- policy: allow users to view other profiles (needed for admin to see student info)
create policy "Users can view other profiles"
on public.profiles
for select
to authenticated
using ( true );

-- policy: allow users to update their own profile
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ( (select auth.uid()) = id )
with check ( (select auth.uid()) = id );

-- policy: only admins can insert new profiles (for creating student accounts)
create policy "Admins can create profiles"
on public.profiles
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: prevent profile deletion (users should be deactivated, not deleted)
create policy "No profile deletion allowed"
on public.profiles
for delete
to authenticated
using ( false );

-- create function to automatically create profile when user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.profiles (id, role, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'student'),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$;

-- create trigger to automatically create profile for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- create updated_at trigger function
create or replace function public.update_updated_at_column()
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

-- create trigger to automatically update updated_at column
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- create index on role for efficient role-based queries
create index idx_profiles_role on public.profiles using btree (role);
