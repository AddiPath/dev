import { User } from '../types/auth';

export const ADMIN_USER: User = {
  id: '1',
  email: 'admin@addipath.com',
  name: 'Admin',
  role: 'admin',
  isForumBanned: false
};

export const REGULAR_USER: User = {
  id: '2',
  email: 'user@example.com',
  name: 'Test User',
  role: 'user',
  isForumBanned: false
};

export const AUTH_DELAY = 1000; // Simulate network delay in ms