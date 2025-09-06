-- Migration: Create courses storage bucket and policies
-- Purpose: Set up storage bucket for course images and files with proper access policies
-- Affected: storage.buckets, storage.objects
-- Dependencies: courses table, profiles table

-- create the courses storage bucket
insert into storage.buckets (id, name, public)
values ('courses', 'courses', true);

-- create policy for authenticated users to upload to courses bucket
create policy "Authenticated users can upload course files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'courses' and
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create policy for everyone to view course files (public bucket)
create policy "Anyone can view course files"
on storage.objects
for select
to public
using (bucket_id = 'courses');

-- create policy for admins to update course files
create policy "Admins can update course files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'courses' and
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
)
with check (
  bucket_id = 'courses' and
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create policy for admins to delete course files
create policy "Admins can delete course files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'courses' and
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);
