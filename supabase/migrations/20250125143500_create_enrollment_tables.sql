-- Migration: Create enrollment and tracking tables
-- Purpose: Track student course enrollments and lesson completions
-- Affected tables: student_enrollments, lesson_completions
-- Dependencies: profiles, courses, lessons

-- create student_enrollments table
create table public.student_enrollments (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id bigint not null references public.courses(id) on delete cascade,
  enrolled_by uuid references public.profiles(id) on delete set null,
  enrolled_at timestamptz default now() not null,
  is_active boolean default true not null
);

comment on table public.student_enrollments is 'Track which students are enrolled in which courses.';
comment on column public.student_enrollments.student_id is 'Reference to the student profile.';
comment on column public.student_enrollments.course_id is 'Reference to the enrolled course.';
comment on column public.student_enrollments.enrolled_by is 'Admin who enrolled the student.';
comment on column public.student_enrollments.enrolled_at is 'When the student was enrolled.';
comment on column public.student_enrollments.is_active is 'Whether the enrollment is currently active.';

-- create lesson_completions table
create table public.lesson_completions (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  completed_at timestamptz default now() not null
);

comment on table public.lesson_completions is 'Track which lessons students have completed.';
comment on column public.lesson_completions.student_id is 'Reference to the student profile.';
comment on column public.lesson_completions.lesson_id is 'Reference to the completed lesson.';
comment on column public.lesson_completions.completed_at is 'When the lesson was marked as completed.';

-- enable row level security on both tables
alter table public.student_enrollments enable row level security;
alter table public.lesson_completions enable row level security;

-- create policies for student_enrollments table

-- policy: students can view their own enrollments
create policy "Students can view their own enrollments"
on public.student_enrollments
for select
to authenticated
using ( (select auth.uid()) = student_id );

-- policy: admins can view all enrollments
create policy "Admins can view all enrollments"
on public.student_enrollments
for select
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can create enrollments
create policy "Admins can create enrollments"
on public.student_enrollments
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update enrollments
create policy "Admins can update enrollments"
on public.student_enrollments
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

-- policy: only admins can delete enrollments
create policy "Admins can delete enrollments"
on public.student_enrollments
for delete
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create policies for lesson_completions table

-- policy: students can view their own lesson completions
create policy "Students can view their own lesson completions"
on public.lesson_completions
for select
to authenticated
using ( (select auth.uid()) = student_id );

-- policy: admins can view all lesson completions
create policy "Admins can view all lesson completions"
on public.lesson_completions
for select
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: students can mark their own lessons as complete
create policy "Students can mark lessons complete"
on public.lesson_completions
for insert
to authenticated
with check ( (select auth.uid()) = student_id );

-- policy: admins can mark any lesson as complete
create policy "Admins can mark any lesson complete"
on public.lesson_completions
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: prevent deletion of lesson completions
create policy "No deletion of lesson completions"
on public.lesson_completions
for delete
to authenticated
using ( false );

-- policy: prevent updates to lesson completions
create policy "No updates to lesson completions"
on public.lesson_completions
for update
to authenticated
using ( false );

-- create indexes for efficient queries
create index idx_student_enrollments_student_id on public.student_enrollments using btree (student_id);
create index idx_student_enrollments_course_id on public.student_enrollments using btree (course_id);
create index idx_student_enrollments_active on public.student_enrollments using btree (is_active);
create index idx_student_enrollments_enrolled_by on public.student_enrollments using btree (enrolled_by);

create index idx_lesson_completions_student_id on public.lesson_completions using btree (student_id);
create index idx_lesson_completions_lesson_id on public.lesson_completions using btree (lesson_id);
create index idx_lesson_completions_completed_at on public.lesson_completions using btree (completed_at);

-- create unique constraints to prevent duplicate enrollments and completions
create unique index idx_student_enrollments_unique on public.student_enrollments (student_id, course_id);
create unique index idx_lesson_completions_unique on public.lesson_completions (student_id, lesson_id);
