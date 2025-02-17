import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, EmergencyID, AuthCredentials } from '../types/auth';
import { authenticateUser, createUser, signOutUser } from '../utils/auth';

interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateEmergencyId: (data: EmergencyID) => void;
  toggleForumBan: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@addipath.com',
    name: 'Admin',
    role: 'admin',
    isForumBanned: false
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Test User',
    role: 'user',
    isForumBanned: false
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    isForumBanned: false
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [users] = useState<User[]>(mockUsers);

  // Clear user state if localStorage is cleared
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'user' && !e.newValue) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await createUser({ email, password });
      setUser(newUser);
      return true;
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

  const updateEmergencyId = (data: EmergencyID) => {
    if (user) {
      const updatedUser = { ...user, emergencyId: data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const toggleForumBan = (userId: string) => {
    if (user && user.id === userId) {
      const updatedUser = { ...user, isForumBanned: !user.isForumBanned };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      loading,
      login,
      signup,
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