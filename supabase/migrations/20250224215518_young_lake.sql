/*
  # Fix Authentication Schema

  1. Changes
    - Ensure auth schema exists
    - Create necessary auth tables if missing
    - Add required indexes
    - Set up proper auth policies with correct type casting
*/

-- Check if auth schema exists and create if needed
CREATE SCHEMA IF NOT EXISTS auth;

-- Ensure auth.users table exists with required fields
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid NOT NULL PRIMARY KEY,
  email text,
  encrypted_password text,
  email_confirmed_at timestamp with time zone,
  invited_at timestamp with time zone,
  confirmation_token text,
  confirmation_sent_at timestamp with time zone,
  recovery_token text,
  recovery_sent_at timestamp with time zone,
  email_change_token_new text,
  email_change text,
  email_change_sent_at timestamp with time zone,
  last_sign_in_at timestamp with time zone,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  phone text,
  phone_confirmed_at timestamp with time zone,
  phone_change text,
  phone_change_token text,
  phone_change_sent_at timestamp with time zone,
  email_change_token_current text,
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamp with time zone,
  reauthentication_token text,
  reauthentication_sent_at timestamp with time zone,
  is_sso_user boolean DEFAULT false,
  deleted_at timestamp with time zone,
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_phone_key UNIQUE (phone)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS users_instance_id_email_idx ON auth.users (email);
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (id);

-- Ensure auth.sessions table exists
CREATE TABLE IF NOT EXISTS auth.sessions (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  factor_id uuid,
  aal aal_level,
  not_after timestamp with time zone
);

-- Create index for sessions
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON auth.sessions (user_id);

-- Ensure auth.refresh_tokens table exists
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
  id bigint NOT NULL PRIMARY KEY,
  token text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  revoked boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  parent text,
  session_id uuid REFERENCES auth.sessions(id) ON DELETE CASCADE
);

-- Create index for refresh tokens
CREATE INDEX IF NOT EXISTS refresh_tokens_token_idx ON auth.refresh_tokens (token);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON auth.refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_session_id_idx ON auth.refresh_tokens (session_id);

-- Set up RLS policies
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies with proper type casting
CREATE POLICY "Users can view own data" ON auth.users
  FOR SELECT USING (id::text = auth.uid()::text);

CREATE POLICY "Users can update own data" ON auth.users
  FOR UPDATE USING (id::text = auth.uid()::text);

CREATE POLICY "Users can view own sessions" ON auth.sessions
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can manage own refresh tokens" ON auth.refresh_tokens
  FOR ALL USING (user_id::text = auth.uid()::text);