import React, { useState } from 'react';
import { InfoCard } from './InfoCard';
import { InfoModal } from './InfoModal';
import { infoPosts } from './data';
import type { InfoPost } from './types';

export function AddisonsInfo() {
  const [selectedPost, setSelectedPost] = useState<InfoPost | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Understanding Addison's Disease
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Expert information from trusted medical sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoPosts.map((post) => (
            <InfoCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>

        {selectedPost && (
          <InfoModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </div>
  );
}