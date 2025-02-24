/*
  # Fix admin user setup

  1. Changes
    - Properly sets up admin user in auth.users table
    - Ensures password is correctly hashed
    - Sets up required metadata and flags

  2. Security
    - Uses secure password hashing
    - Sets proper authentication flags
    - Maintains data consistency
*/

-- Insert admin user into auth.users
DO $$
DECLARE
  admin_id uuid := '00000000-0000-0000-0000-000000000001';
BEGIN
  -- Check if admin user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@addipath.com'
  ) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      is_sso_user,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      is_anonymous,
      phone_change_token,
      phone_change,
      phone_change_sent_at,
      phone_confirmed_at,
      phone,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      invited_at,
      recovery_token,
      confirmation_token,
      confirmation_sent_at,
      last_sign_in_at
    )
    VALUES (
      admin_id,
      'authenticated',
      'authenticated',
      'admin@addipath.com',
      crypt('admin123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      jsonb_build_object(
        'provider', 'email',
        'providers', array['email']
      ),
      jsonb_build_object(
        'name', 'Admin',
        'role', 'admin'
      ),
      FALSE,
      FALSE,
      0,
      NULL,
      NULL,
      FALSE,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      0,
      NULL,
      NULL,
      NULL,
      NULL,
      NOW()
    );

    -- Insert into users table
    INSERT INTO users (
      id,
      email,
      name,
      role,
      created_at
    )
    VALUES (
      admin_id,
      'admin@addipath.com',
      'Admin',
      'admin',
      NOW()
    );
  END IF;
END $$;