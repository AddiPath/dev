import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, EmergencyID } from '../types/auth';
import { authenticateUser, createUser, signOutUser, getCurrentUser, signInWithGoogle, handleAuthCallback } from '../utils/auth';
import { supabase } from '../utils/supabase';

interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateEmergencyId: (data: EmergencyID) => void;
  toggleForumBan: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session and handle auth callback
    const initAuth = async () => {
      try {
        // Check if we're handling an auth callback
        if (window.location.pathname === '/auth/callback') {
          const callbackUser = await handleAuthCallback();
          if (callbackUser) {
            setUser(callbackUser);
            // Redirect to dashboard after successful social login
            window.location.href = '/dashboard';
            return;
          }
        }

        // Check for existing session
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load users for admin functionality
  useEffect(() => {
    const loadUsers = async () => {
      if (user?.role === 'admin') {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('*');

          if (error) throw error;
          setUsers(data);
        } catch (error) {
          console.error('Error loading users:', error);
        }
      }
    };

    loadUsers();
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const authenticatedUser = await authenticateUser({ email, password });
      if (authenticatedUser) {
        setUser(authenticatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await createUser({ email, password });
      if (newUser) {
        setUser(newUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateEmergencyId = async (data: EmergencyID) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ emergency_id: data })
        .eq('id', user.id);

      if (error) throw error;

      setUser(prev => prev ? { ...prev, emergencyId: data } : null);
    } catch (error) {
      console.error('Error updating emergency ID:', error);
    }
  };

  const toggleForumBan = async (userId: string) => {
    if (!user?.role === 'admin') return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ is_forum_banned: !users.find(u => u.id === userId)?.isForumBanned })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, isForumBanned: data.is_forum_banned } : u
      ));

      // Update current user if they were banned
      if (user?.id === userId) {
        setUser(prev => prev ? { ...prev, isForumBanned: data.is_forum_banned } : null);
      }
    } catch (error) {
      console.error('Error toggling forum ban:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      loading,
      login,
      signup,
      loginWithGoogle,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      updateEmergencyId,
      toggleForumBan
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}