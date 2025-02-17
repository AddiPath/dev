import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, AlertOctagon } from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';

type UserType = 'adult' | 'parent' | '';

export function SignupForm() {
  const [userType, setUserType] = useState<UserType>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOver18, setIsOver18] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgeError, setShowAgeError] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowAgeError(false);
    setIsLoading(true);

    if (userType === '') {
      setError('Please select whether you live with Addison\'s or are a parent of someone with Addison\'s');
      setIsLoading(false);
      return;
    }

    if (userType === 'adult' && !isOver18) {
      setError('You must confirm that you are over 18 years old to register');
      setShowAgeError(true);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Could not create account');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setIsLoading(true);

    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Could not sign up with Google');
      }
    } catch (err) {
      setError('An error occurred during Google sign-up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <GoogleSignInButton onClick={handleGoogleSignUp} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or sign up with email
              </span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I am: *
              </label>
              <div className="grid grid-cols-1 gap-3">
                <label className={`
                  relative flex cursor-pointer rounded-lg border p-4
                  ${userType === 'adult' ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600'}
                  hover:bg-gray-50 dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500
                `}>
                  <input
                    type="radio"
                    name="userType"
                    value="adult"
                    className="sr-only"
                    checked={userType === 'adult'}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Living with Addison's</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">I have Addison's Disease and I am over 18</span>
                  </div>
                </label>

                <label className={`
                  relative flex cursor-pointer rounded-lg border p-4
                  ${userType === 'parent' ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600'}
                  hover:bg-gray-50 dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500
                `}>
                  <input
                    type="radio"
                    name="userType"
                    value="parent"
                    className="sr-only"
                    checked={userType === 'parent'}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Parent/Guardian</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">I am registering on behalf of someone under 18 with Addison's</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {userType === 'adult' && (
              <div className={`flex items-start p-4 rounded-md ${showAgeError ? 'bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <div className="flex items-center h-5">
                  <input
                    id="age-verification"
                    name="age-verification"
                    type="checkbox"
                    required
                    aria-required="true"
                    className={`h-4 w-4 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded ${
                      showAgeError ? 'border-red-500' : ''
                    }`}
                    checked={isOver18}
                 onChange={(e) => {
                      setIsOver18(e.target.checked);
                      if (e.target.checked) setShowAgeError(false);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="age-verification" className={`text-sm ${showAgeError ? 'text-red-700 dark:text-red-200 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                    {showAgeError && (
                      <AlertOctagon className="inline-block h-4 w-4 mr-1 text-red-500" />
                    )}
                    I confirm that I am over 18 years old *
                  </label>
                  {showAgeError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-200">
                      You must confirm that you are over 18 years old to register
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}