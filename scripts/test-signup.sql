-- Test script to verify signup functionality
-- Run this manually in Supabase SQL editor to test profile creation

-- Check if the trigger function exists
SELECT 
  proname as function_name,
  prosecdef as is_security_definer
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- Check if the trigger exists
SELECT 
  tgname as trigger_name,
  tgenabled as is_enabled
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- Check current policies on profiles table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Test profile creation manually (simulate what trigger does)
-- Replace the UUID with a test value
-- Note: This will fail if you run it multiple times with same UUID
/*
INSERT INTO public.profiles (id, role, first_name, last_name)
VALUES (
  gen_random_uuid(),
  'student',
  'Test',
  'User'
);
*/

-- Check if there are any existing profiles
SELECT count(*) as profile_count FROM public.profiles;

-- Check table structure
\d public.profiles;
