-- Migration: Create exam attempt and retake permission tables
-- Purpose: Track exam attempts, scores, and retake permissions
-- Affected tables: exam_attempts, student_answers, exam_retake_permissions
-- Dependencies: profiles, exams, questions

-- create exam_attempts table
create table public.exam_attempts (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles(id) on delete cascade,
  exam_id bigint not null references public.exams(id) on delete cascade,
  attempt_number integer not null default 1,
  score integer,
  max_score integer,
  passed boolean,
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  time_taken_minutes integer
);

comment on table public.exam_attempts is 'Track individual exam attempts by students with scores and timing.';
comment on column public.exam_attempts.student_id is 'Reference to the student taking the exam.';
comment on column public.exam_attempts.exam_id is 'Reference to the exam being attempted.';
comment on column public.exam_attempts.attempt_number is 'Which attempt this is for the student (1st, 2nd, etc.).';
comment on column public.exam_attempts.score is 'Points scored in this attempt.';
comment on column public.exam_attempts.max_score is 'Maximum possible points for this exam.';
comment on column public.exam_attempts.passed is 'Whether this attempt passed the exam.';
comment on column public.exam_attempts.started_at is 'When the exam attempt was started.';
comment on column public.exam_attempts.completed_at is 'When the exam attempt was completed.';
comment on column public.exam_attempts.time_taken_minutes is 'Total time taken to complete the exam.';

-- create student_answers table
create table public.student_answers (
  id bigint generated always as identity primary key,
  attempt_id bigint not null references public.exam_attempts(id) on delete cascade,
  question_id bigint not null references public.questions(id) on delete cascade,
  answer_text text not null,
  is_correct boolean,
  points_earned integer default 0,
  answered_at timestamptz default now() not null
);

comment on table public.student_answers is 'Individual answers provided by students during exam attempts.';
comment on column public.student_answers.attempt_id is 'Reference to the exam attempt this answer belongs to.';
comment on column public.student_answers.question_id is 'Reference to the question being answered.';
comment on column public.student_answers.answer_text is 'The answer provided by the student.';
comment on column public.student_answers.is_correct is 'Whether the answer was correct (auto-graded).';
comment on column public.student_answers.points_earned is 'Points earned for this answer.';
comment on column public.student_answers.answered_at is 'When this answer was submitted.';

-- create exam_retake_permissions table
create table public.exam_retake_permissions (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles(id) on delete cascade,
  exam_id bigint not null references public.exams(id) on delete cascade,
  additional_attempts integer not null default 1,
  granted_by uuid references public.profiles(id) on delete set null,
  granted_at timestamptz default now() not null,
  reason text
);

comment on table public.exam_retake_permissions is 'Additional retake permissions granted by admins to specific students.';
comment on column public.exam_retake_permissions.student_id is 'Reference to the student granted permission.';
comment on column public.exam_retake_permissions.exam_id is 'Reference to the exam for which permission is granted.';
comment on column public.exam_retake_permissions.additional_attempts is 'Number of additional attempts granted.';
comment on column public.exam_retake_permissions.granted_by is 'Admin who granted the permission.';
comment on column public.exam_retake_permissions.granted_at is 'When the permission was granted.';
comment on column public.exam_retake_permissions.reason is 'Optional reason for granting additional attempts.';

-- enable row level security on all tables
alter table public.exam_attempts enable row level security;
alter table public.student_answers enable row level security;
alter table public.exam_retake_permissions enable row level security;

-- create policies for exam_attempts table

-- policy: students can view their own exam attempts
create policy "Students can view their own exam attempts"
on public.exam_attempts
for select
to authenticated
using ( (select auth.uid()) = student_id );

-- policy: admins can view all exam attempts
create policy "Admins can view all exam attempts"
on public.exam_attempts
for select
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: students can create their own exam attempts
create policy "Students can create exam attempts"
on public.exam_attempts
for insert
to authenticated
with check ( (select auth.uid()) = student_id );

-- policy: students can update their own exam attempts
create policy "Students can update their own exam attempts"
on public.exam_attempts
for update
to authenticated
using ( (select auth.uid()) = student_id )
with check ( (select auth.uid()) = student_id );

-- policy: admins can update any exam attempt
create policy "Admins can update exam attempts"
on public.exam_attempts
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

-- policy: prevent deletion of exam attempts
create policy "No deletion of exam attempts"
on public.exam_attempts
for delete
to authenticated
using ( false );

-- create policies for student_answers table

-- policy: students can view their own answers
create policy "Students can view their own answers"
on public.student_answers
for select
to authenticated
using ( 
  exists (
    select 1 from public.exam_attempts 
    where id = attempt_id 
    and student_id = (select auth.uid())
  )
);

-- policy: admins can view all answers
create policy "Admins can view all answers"
on public.student_answers
for select
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: students can create their own answers
create policy "Students can create their own answers"
on public.student_answers
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.exam_attempts 
    where id = attempt_id 
    and student_id = (select auth.uid())
  )
);

-- policy: prevent updates and deletions of answers
create policy "No updates to student answers"
on public.student_answers
for update
to authenticated
using ( false );

create policy "No deletion of student answers"
on public.student_answers
for delete
to authenticated
using ( false );

-- create policies for exam_retake_permissions table

-- policy: students can view their own retake permissions
create policy "Students can view their own retake permissions"
on public.exam_retake_permissions
for select
to authenticated
using ( (select auth.uid()) = student_id );

-- policy: admins can view all retake permissions
create policy "Admins can view all retake permissions"
on public.exam_retake_permissions
for select
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can grant retake permissions
create policy "Admins can grant retake permissions"
on public.exam_retake_permissions
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update retake permissions
create policy "Admins can update retake permissions"
on public.exam_retake_permissions
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

-- policy: only admins can delete retake permissions
create policy "Admins can delete retake permissions"
on public.exam_retake_permissions
for delete
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create indexes for efficient queries
create index idx_exam_attempts_student_id on public.exam_attempts using btree (student_id);
create index idx_exam_attempts_exam_id on public.exam_attempts using btree (exam_id);
create index idx_exam_attempts_attempt_number on public.exam_attempts using btree (student_id, exam_id, attempt_number);
create index idx_exam_attempts_completed_at on public.exam_attempts using btree (completed_at);

create index idx_student_answers_attempt_id on public.student_answers using btree (attempt_id);
create index idx_student_answers_question_id on public.student_answers using btree (question_id);
create index idx_student_answers_answered_at on public.student_answers using btree (answered_at);

create index idx_exam_retake_permissions_student_id on public.exam_retake_permissions using btree (student_id);
create index idx_exam_retake_permissions_exam_id on public.exam_retake_permissions using btree (exam_id);
create index idx_exam_retake_permissions_granted_by on public.exam_retake_permissions using btree (granted_by);

-- create unique constraints
create unique index idx_exam_attempts_unique on public.exam_attempts (student_id, exam_id, attempt_number);
create unique index idx_student_answers_unique on public.student_answers (attempt_id, question_id);
