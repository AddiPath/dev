/*
  # Add admin user

  1. Changes
    - Inserts admin user into auth.users table
    - Inserts admin profile into users table
    - Ensures admin user has admin role

  2. Security
    - Uses secure password hashing
    - Maintains RLS policies
*/

-- Insert admin user into auth.users
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Check if admin user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@addipath.com'
  ) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
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
      is_super_admin
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@addipath.com',
      crypt('admin123', gen_salt('bf')), -- Using Blowfish encryption
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      FALSE
    )
    RETURNING id INTO admin_id;

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