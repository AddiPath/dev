import React from 'react';
import { useContent } from '../context/ContentContext';

export function Emergency() {
  const { sections } = useContent();
  
  const title = sections.find(s => s.id === 'emergency-title')?.content;
  const subtitle = sections.find(s => s.id === 'emergency-subtitle')?.content;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-red-600 dark:text-red-400 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Emergency Steps
              </h3>
              <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      1. Immediate Action
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                      Administer emergency injection of hydrocortisone
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      2. Medical Attention
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                      Call emergency services or proceed to nearest emergency room
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      3. Support Contact
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                      Alert designated emergency contacts
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}