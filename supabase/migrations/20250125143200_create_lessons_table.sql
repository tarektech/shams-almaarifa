-- Migration: Create lessons table
-- Purpose: Store lesson content including videos and PDFs within courses
-- Affected tables: lessons
-- Dependencies: courses

-- create lessons table
create table public.lessons (
  id bigint generated always as identity primary key,
  course_id bigint not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  lesson_order integer not null default 1,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.lessons is 'Individual lessons within courses containing educational content.';
comment on column public.lessons.course_id is 'Reference to the parent course.';
comment on column public.lessons.title is 'Lesson title displayed to students.';
comment on column public.lessons.description is 'Lesson description and learning objectives.';
comment on column public.lessons.video_url is 'URL to lesson video content.';
comment on column public.lessons.pdf_url is 'URL to lesson PDF materials stored in Supabase Storage.';
comment on column public.lessons.lesson_order is 'Order of lessons within the course for display purposes.';
comment on column public.lessons.created_by is 'Admin user who created this lesson.';

-- enable row level security on lessons table
alter table public.lessons enable row level security;

-- create policies for lessons table

-- policy: all authenticated users can view lessons
create policy "All users can view lessons"
on public.lessons
for select
to authenticated
using ( true );

-- policy: only admins can create lessons
create policy "Admins can create lessons"
on public.lessons
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update lessons
create policy "Admins can update lessons"
on public.lessons
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

-- policy: only admins can delete lessons
create policy "Admins can delete lessons"
on public.lessons
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
create trigger update_lessons_updated_at
  before update on public.lessons
  for each row execute function public.update_updated_at_column();

-- create indexes for efficient queries
create index idx_lessons_course_id on public.lessons using btree (course_id);
create index idx_lessons_title on public.lessons using btree (title);
create index idx_lessons_order on public.lessons using btree (course_id, lesson_order);
create index idx_lessons_created_by on public.lessons using btree (created_by);

-- create unique constraint to prevent duplicate lesson orders within a course
create unique index idx_lessons_unique_order on public.lessons (course_id, lesson_order);
