import React from 'react';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  feature: {
    id: string;
    icon: string;
    title: string;
    description: string;
  };
  onClick: () => void;
}

export function FeatureCard({ feature, onClick }: FeatureCardProps) {
  const IconComponent = Icons[feature.icon as keyof typeof Icons];

  return (
    <button
      onClick={onClick}
      className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full text-left"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
        </div>
      </div>
    </button>
  );
}