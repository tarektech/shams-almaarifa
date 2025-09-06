-- Migration: Create exams table
-- Purpose: Store exam information linked to lessons with timing and scoring
-- Affected tables: exams
-- Dependencies: lessons

-- create exams table
create table public.exams (
  id bigint generated always as identity primary key,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  title text not null,
  description text,
  passing_score integer not null default 70,
  time_limit_minutes integer,
  max_attempts integer not null default 1,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.exams is 'Exams associated with lessons for student assessment.';
comment on column public.exams.lesson_id is 'Reference to the lesson this exam belongs to.';
comment on column public.exams.title is 'Exam title displayed to students.';
comment on column public.exams.description is 'Exam instructions and description.';
comment on column public.exams.passing_score is 'Minimum score required to pass the exam (percentage).';
comment on column public.exams.time_limit_minutes is 'Time limit for completing the exam in minutes. NULL means no time limit.';
comment on column public.exams.max_attempts is 'Maximum number of attempts allowed for this exam.';
comment on column public.exams.created_by is 'Admin user who created this exam.';

-- enable row level security on exams table
alter table public.exams enable row level security;

-- create policies for exams table

-- policy: all authenticated users can view exams
create policy "All users can view exams"
on public.exams
for select
to authenticated
using ( true );

-- policy: only admins can create exams
create policy "Admins can create exams"
on public.exams
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update exams
create policy "Admins can update exams"
on public.exams
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

-- policy: only admins can delete exams
create policy "Admins can delete exams"
on public.exams
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
create trigger update_exams_updated_at
  before update on public.exams
  for each row execute function public.update_updated_at_column();

-- create indexes for efficient queries
create index idx_exams_lesson_id on public.exams using btree (lesson_id);
create index idx_exams_title on public.exams using btree (title);
create index idx_exams_created_by on public.exams using btree (created_by);
