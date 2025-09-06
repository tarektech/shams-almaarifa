-- Migration: Create questions and question_options tables
-- Purpose: Store exam questions with different types and their options
-- Affected tables: questions, question_options
-- Dependencies: exams

-- create questions table
create table public.questions (
  id bigint generated always as identity primary key,
  exam_id bigint not null references public.exams(id) on delete cascade,
  question_text text not null,
  question_type text not null check (question_type in ('multiple_choice', 'true_false', 'short_answer')),
  correct_answer text,
  points integer not null default 1,
  question_order integer not null default 1,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.questions is 'Individual questions within exams with different question types.';
comment on column public.questions.exam_id is 'Reference to the exam this question belongs to.';
comment on column public.questions.question_text is 'The question text displayed to students.';
comment on column public.questions.question_type is 'Type of question: multiple_choice, true_false, or short_answer.';
comment on column public.questions.correct_answer is 'Correct answer for auto-grading. For multiple choice, this should match option text. For true_false: true/false. For short_answer: expected answer text.';
comment on column public.questions.points is 'Points awarded for correct answer.';
comment on column public.questions.question_order is 'Order of questions within the exam.';
comment on column public.questions.created_by is 'Admin user who created this question.';

-- create question_options table for multiple choice questions
create table public.question_options (
  id bigint generated always as identity primary key,
  question_id bigint not null references public.questions(id) on delete cascade,
  option_text text not null,
  option_order integer not null default 1,
  created_at timestamptz default now() not null
);

comment on table public.question_options is 'Answer options for multiple choice questions.';
comment on column public.question_options.question_id is 'Reference to the question this option belongs to.';
comment on column public.question_options.option_text is 'The option text displayed to students.';
comment on column public.question_options.option_order is 'Order of options within the question (A, B, C, D, etc.).';

-- enable row level security on both tables
alter table public.questions enable row level security;
alter table public.question_options enable row level security;

-- create policies for questions table

-- policy: all authenticated users can view questions
create policy "All users can view questions"
on public.questions
for select
to authenticated
using ( true );

-- policy: only admins can create questions
create policy "Admins can create questions"
on public.questions
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update questions
create policy "Admins can update questions"
on public.questions
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

-- policy: only admins can delete questions
create policy "Admins can delete questions"
on public.questions
for delete
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create policies for question_options table

-- policy: all authenticated users can view question options
create policy "All users can view question options"
on public.question_options
for select
to authenticated
using ( true );

-- policy: only admins can create question options
create policy "Admins can create question options"
on public.question_options
for insert
to authenticated
with check ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- policy: only admins can update question options
create policy "Admins can update question options"
on public.question_options
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

-- policy: only admins can delete question options
create policy "Admins can delete question options"
on public.question_options
for delete
to authenticated
using ( 
  exists (
    select 1 from public.profiles 
    where id = (select auth.uid()) 
    and role = 'admin'
  )
);

-- create triggers to automatically update updated_at column
create trigger update_questions_updated_at
  before update on public.questions
  for each row execute function public.update_updated_at_column();

-- create indexes for efficient queries
create index idx_questions_exam_id on public.questions using btree (exam_id);
create index idx_questions_type on public.questions using btree (question_type);
create index idx_questions_order on public.questions using btree (exam_id, question_order);
create index idx_questions_created_by on public.questions using btree (created_by);

create index idx_question_options_question_id on public.question_options using btree (question_id);
create index idx_question_options_order on public.question_options using btree (question_id, option_order);

-- create unique constraints
create unique index idx_questions_unique_order on public.questions (exam_id, question_order);
create unique index idx_question_options_unique_order on public.question_options (question_id, option_order);
