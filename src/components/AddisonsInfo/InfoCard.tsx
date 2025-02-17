import React from 'react';
import { ExternalLink } from 'lucide-react';
import { InfoPost } from './types';

interface InfoCardProps {
  post: InfoPost;
  onClick: () => void;
}

export function InfoCard({ post, onClick }: InfoCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left w-full"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{post.summary}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <ExternalLink className="w-4 h-4 mr-1" />
        <span>{post.source}</span>
      </div>
    </button>
  );
}