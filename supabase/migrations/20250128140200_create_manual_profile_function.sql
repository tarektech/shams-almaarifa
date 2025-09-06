-- Migration: Create manual profile creation function
-- Purpose: Provide a way to manually create profiles for existing users
-- Affected tables: profiles
-- Dependencies: profiles table, auth.users

-- Create function to manually create or update a user profile
CREATE OR REPLACE FUNCTION public.create_or_update_profile(
  user_id uuid,
  user_role text DEFAULT 'student',
  user_first_name text DEFAULT '',
  user_last_name text DEFAULT ''
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Validate the role
  IF user_role NOT IN ('admin', 'student') THEN
    RAISE EXCEPTION 'Invalid role. Must be either admin or student.';
  END IF;

  -- Insert or update the profile
  INSERT INTO public.profiles (id, role, first_name, last_name)
  VALUES (user_id, user_role, user_first_name, user_last_name)
  ON CONFLICT (id) 
  DO UPDATE SET
    role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = now();

  RETURN user_id;
END;
$$;

-- Add comment explaining the function
COMMENT ON FUNCTION public.create_or_update_profile(uuid, text, text, text) IS 'Manually creates or updates a user profile. Can be used to fix missing profiles or update existing ones.';

-- Grant execute permission to authenticated users (admins can use this to fix profiles)
GRANT EXECUTE ON FUNCTION public.create_or_update_profile(uuid, text, text, text) TO authenticated;
