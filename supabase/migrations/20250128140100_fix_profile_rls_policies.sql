-- Migration: Fix RLS policies for profile creation
-- Purpose: Allow automatic profile creation by trigger functions
-- Affected tables: profiles
-- Dependencies: existing profile policies

-- Drop the restrictive admin-only insert policy
DROP POLICY IF EXISTS "Admins can create profiles" ON public.profiles;

-- Create a more permissive policy for profile creation that allows:
-- 1. Users to create their own profile during signup
-- 2. Admins to create profiles for others
-- 3. Automatic creation via trigger functions
CREATE POLICY "Allow profile creation during signup"
ON public.profiles
FOR INSERT
TO authenticated, anon
WITH CHECK ( 
  -- Allow if creating own profile
  (SELECT auth.uid()) = id
  OR
  -- Allow if user is admin creating for others
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
);

-- Also add a policy to allow service role (used by triggers) to insert
CREATE POLICY "Service role can create profiles"
ON public.profiles
FOR INSERT
TO service_role
WITH CHECK ( true );

-- Add comment explaining the policy
COMMENT ON POLICY "Allow profile creation during signup" ON public.profiles IS 'Allows users to create their own profile during signup and admins to create profiles for others.';
COMMENT ON POLICY "Service role can create profiles" ON public.profiles IS 'Allows service role (used by triggers and server functions) to create profiles automatically.';
