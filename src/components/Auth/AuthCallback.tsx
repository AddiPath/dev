import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../../utils/auth';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const user = await handleAuthCallback();
        if (user) {
          navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    processCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
}