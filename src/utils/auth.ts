import { User, AuthCredentials } from '../types/auth';
import { ADMIN_USER, REGULAR_USER, AUTH_DELAY } from '../config/auth';

export async function authenticateUser({ email, password }: AuthCredentials): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, AUTH_DELAY));

  // Clean up any stale auth data
  localStorage.removeItem('authState');
  localStorage.removeItem('user');

  // Validate credentials
  if (email === ADMIN_USER.email && password === 'admin123') {
    const user = { ...ADMIN_USER };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } 
  
  if (email === REGULAR_USER.email && password === 'user123') {
    const user = { ...REGULAR_USER };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  return null;
}

export async function createUser({ email, password }: AuthCredentials): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, AUTH_DELAY));
  
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name: email.split('@')[0],
    role: 'user' as const,
    isForumBanned: false
  };

  localStorage.setItem('user', JSON.stringify(newUser));
  return newUser;
}

export async function signOutUser(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, AUTH_DELAY / 2));
  
  // Clear all auth-related data
  localStorage.clear();
  sessionStorage.clear();
}