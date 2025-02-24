import { supabase } from './supabase';
import { User } from '../types/auth';

export async function authenticateUser({ email, password }: { email: string; password: string }): Promise<User | null> {
  try {
    const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!authUser) return null;

    return getUserProfile(authUser.id);
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser({ email, password }: { email: string; password: string }): Promise<User | null> {
  try {
    const { data: { user: authUser }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    if (!authUser) return null;

    // Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([{
        id: authUser.id,
        email: authUser.email!,
        name: email.split('@')[0],
        role: 'user'
      }])
      .select()
      .single();

    if (profileError) throw profileError;

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      isForumBanned: profile.is_forum_banned
    };
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
}

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) throw error;
}

export async function handleAuthCallback(): Promise<User | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!session?.user) return null;

    // Check if user profile exists
    const { data: existingProfile } = await supabase
      .from('users')
      .select()
      .eq('id', session.user.id)
      .single();

    if (!existingProfile) {
      // Create new profile for Google users
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([{
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name || session.user.email!.split('@')[0],
          role: 'user'
        }])
        .select()
        .single();

      if (profileError) throw profileError;
      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        isForumBanned: profile.is_forum_banned
      };
    }

    return {
      id: existingProfile.id,
      email: existingProfile.email,
      name: existingProfile.name,
      role: existingProfile.role,
      isForumBanned: existingProfile.is_forum_banned
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return null;

    const { data: profile, error } = await supabase
      .from('users')
      .select()
      .eq('id', authUser.id)
      .single();

    if (error) throw error;

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      isForumBanned: profile.is_forum_banned
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const { data: profile, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      isForumBanned: profile.is_forum_banned
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
}