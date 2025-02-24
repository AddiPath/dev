import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForum } from '../../context/ForumContext';
import { AlertTriangle, MessageSquare, Search, Plus } from 'lucide-react';
import { Thread } from './Thread';

interface ForumPost {
  id: string;
  user_id: string;
  topic_id: string;
  title: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  };
  replies_count: number;
}

export function Forum() {
  const { user, users } = useAuth();
  const { topics, getPosts, loading, error } = useForum();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);

  // Check if the current user is banned
  const currentUser = users.find(u => u.id === user?.id);
  const isUserBanned = currentUser?.isForumBanned;

  useEffect(() => {
    loadPosts();
  }, [selectedTopic]);

  const loadPosts = async () => {
    const loadedPosts = await getPosts(selectedTopic);
    setPosts(loadedPosts);
  };

  if (isUserBanned) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Forum Access Restricted
              </h3>
              <p className="mt-2 text-sm text-red-700">
                Your access to the forum has been temporarily restricted. Please contact support for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading forum...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <p className="mt-2 text-gray-600">
          Connect with others, share experiences, and find support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Topics Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Topics</h2>
              <nav className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id === selectedTopic ? null : topic.id);
                      setSelectedPost(null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-150 ${
                      selectedTopic === topic.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.description}</p>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!selectedPost ? (
            <>
              <div className="mb-6">
                {selectedTopic && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {topics.find(t => t.id === selectedTopic)?.title}
                    </h2>
                    <p className="mt-1 text-gray-600">
                      {topics.find(t => t.id === selectedTopic)?.description}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="relative flex-1 max-w-lg">
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button
                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Discussion
                  </button>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <button
                      key={post.id}
                      className="w-full text-left bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Posted by {post.user.name} • {formatDate(post.created_at)}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.replies_count} replies
                          </span>
                        </div>
                        <p className="mt-4 text-gray-700 line-clamp-2">{post.content}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedTopic 
                        ? 'No discussions in this topic yet.'
                        : 'Select a topic to view discussions or start a new one.'}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Thread 
              post={selectedPost} 
              onBack={() => setSelectedPost(null)} 
            />
          )}
        </div>
      </div>
    </div>
  );
}