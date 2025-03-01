import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { UpgradeButton } from './Upgrade/UpgradeButton';
import logoImage from '../assets/images/logo.png';

export function Hero() {
  const { isAuthenticated, user } = useAuth();
  const { sections, heroImage } = useContent();

  const heroTitle = sections.find(s => s.id === 'hero-title')?.content;
  const heroSubtitle = sections.find(s => s.id === 'hero-subtitle')?.content;

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {isAuthenticated ? (
                <>
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block">Welcome back,</span>
                    <span className="block text-blue-600 dark:text-blue-400">{user?.name}</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Track your medications, manage appointments, and stay connected with your care team.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center lg:justify-start mb-6">
                    <img src={logoImage} alt="AddiPath Logo" className="h-32 w-auto" />
                  </div>
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block">{heroTitle}</span>
                    <span className="block text-blue-600 dark:text-blue-400">Made Simple</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    {heroSubtitle}
                  </p>
                </>
              )}
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {isAuthenticated ? (
                  <>
                    <div className="rounded-md shadow">
                      <Link to="/dashboard" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                        Go to Dashboard
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <UpgradeButton variant="secondary" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-md shadow">
                      <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login?redirect=emergency"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900 md:py-4 md:text-lg md:px-10"
                      >
                        Emergency ID
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={heroImage.url}
          alt={heroImage.alt}
        />
      </div>
    </div>
  );
}