-- Migration: Create courses table
-- Purpose: Store course information with teacher details and optional files
-- Affected tables: courses
-- Dependencies: profiles (for admin management)

-- create courses table
create table public.courses (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  teacher_name text not null,
  image_url text,
  file_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.courses is 'Educational courses with content and teacher information.';
comment on column public.courses.title is 'Course title displayed to students.';
comment on column public.courses.description is 'Course description and overview.';
comment on column public.courses.teacher_name is 'Name of the course instructor.';
comment on column public.courses.image_url is 'URL to course cover image stored in Supabase Storage.';
comment on column public.courses.file_url is 'Optional URL to additional course files (Excel, Word, etc.) stored in Supabase Storage.';
comment on column public.courses.created_by is 'Admin user who created this course.';

-- enable row level security on courses table
alter table public.courses enable row level security;

-- create policies for courses table

-- policy: all authenticated users can view courses
create policy "All users can view courses"
on public.courses
for select
to authenticated
using ( true );

-- policy: only admins can create courses
create policy "Admins can create courses"
on public.courses
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update courses
create policy "Admins can update courses"
on public.courses
for update
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
)
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can delete courses
create policy "Admins can delete courses"
on public.courses
for delete
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create trigger to automatically update updated_at column
create trigger update_courses_updated_at
  before update on public.courses
  for each row execute function public.update_updated_at_column();

-- create indexes for efficient queries
create index idx_courses_title on public.courses using btree (title);
create index idx_courses_teacher_name on public.courses using btree (teacher_name);
create index idx_courses_created_by on public.courses using btree (created_by);
