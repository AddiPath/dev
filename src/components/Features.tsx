import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { FeatureCard } from './Features/FeatureCard';
import { FeatureModal } from './Features/FeatureModal';

export function Features() {
  const { sections, features } = useContent();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  const title = sections.find(s => s.id === 'features-title')?.content;
  const subtitle = sections.find(s => s.id === 'features-subtitle')?.content;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onClick={() => setSelectedFeature(feature)}
          />
        ))}
      </div>

      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
}