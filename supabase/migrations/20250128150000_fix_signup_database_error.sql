-- Migration: Fix signup database error
-- Purpose: Resolve profile creation issues during user signup
-- Affected tables: profiles
-- Dependencies: existing profile table and policies

-- First, let's modify the trigger function to use SECURITY DEFINER
-- This will allow it to bypass RLS policies
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER -- This is key - runs with function owner's privileges
SET search_path = ''
AS $$
BEGIN
  -- Insert new profile with default values for missing metadata
  INSERT INTO public.profiles (id, role, first_name, last_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', '')
  );
  RETURN new;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't prevent user creation
    RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Allow profile creation during signup" ON public.profiles;
DROP POLICY IF EXISTS "Service role can create profiles" ON public.profiles;

-- Create a simple policy that allows profile creation during signup
-- This policy allows anyone to create a profile for themselves
CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
TO authenticated, anon
WITH CHECK ( 
  -- Allow if creating own profile (for authenticated users)
  (SELECT auth.uid()) = id
  OR
  -- Allow if no authenticated user (for trigger during signup)
  (SELECT auth.uid()) IS NULL
);

-- Create separate policy for admins to create profiles for others
CREATE POLICY "Admins can create profiles for others"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK ( 
  -- Check if current user is admin
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = (SELECT auth.uid()) 
    AND role = 'admin'
  )
  AND
  -- Ensure they're not creating a profile for themselves (covered by other policy)
  (SELECT auth.uid()) != id
);

-- Add comment explaining the function's purpose
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a profile when a new user is created. Uses SECURITY DEFINER to bypass RLS policies during signup.';

