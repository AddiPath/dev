import React, { useState } from 'react';
import { Flag, Trash2, MessageSquare, Search, AlertTriangle, Plus, Edit2 } from 'lucide-react';
import { useForum } from '../../context/ForumContext';

interface ReportedPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: string;
  reports: number;
  reason: string;
}

const MOCK_REPORTED_POSTS: ReportedPost[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Test User',
    title: 'Inappropriate Content',
    content: 'This is a reported post...',
    createdAt: '2024-03-10T10:00:00Z',
    reports: 3,
    reason: 'Spam/Advertising'
  }
];

export function ForumManagement() {
  const { topics, addTopic, updateTopic, deleteTopic } = useForum();
  const [activeTab, setActiveTab] = useState<'reported' | 'topics'>('reported');
  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>(MOCK_REPORTED_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', description: '' });
  const [editingTopic, setEditingTopic] = useState<typeof topics[0] | null>(null);

  const handleDeletePost = (postId: string) => {
    setReportedPosts(reportedPosts.filter(post => post.id !== postId));
  };

  const handleDismissReport = (postId: string) => {
    setReportedPosts(reportedPosts.filter(post => post.id !== postId));
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.title.trim() || !newTopic.description.trim()) return;

    addTopic({
      title: newTopic.title.trim(),
      description: newTopic.description.trim()
    });

    setNewTopic({ title: '', description: '' });
    setIsAddingTopic(false);
  };

  const handleUpdateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic || !editingTopic.title.trim() || !editingTopic.description.trim()) return;

    updateTopic(editingTopic);
    setEditingTopic(null);
  };

  const handleDeleteTopic = (topicId: string) => {
    deleteTopic(topicId);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('reported')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'reported'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Reported Posts
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'topics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Forum Topics
            </button>
          </div>
          {activeTab === 'topics' && !isAddingTopic && (
            <button
              onClick={() => setIsAddingTopic(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </button>
          )}
        </div>
      </div>

      {activeTab === 'reported' && (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reported posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-6">
            {reportedPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reported posts</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are currently no posts that have been reported by users.
                </p>
              </div>
            ) : (
              reportedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Flag className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-red-500">
                          Reported {post.reports} times
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">Posted by {post.userName}</p>
                    </div>

                    <div className="mb-4">
                      <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">
                              Report reason: {post.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{post.content}</p>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleDismissReport(post.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Dismiss Report
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Post
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'topics' && (
        <div className="space-y-6">
          {isAddingTopic && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Topic</h3>
                <form onSubmit={handleAddTopic}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="topic-title" className="block text-sm font-medium text-gray-700">
                        Topic Title
                      </label>
                      <input
                        id="topic-title"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newTopic.title}
                        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="topic-description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="topic-description"
                        required
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newTopic.description}
                        onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsAddingTopic(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Create Topic
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {editingTopic?.id === topic.id ? (
                  <form onSubmit={handleUpdateTopic}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Topic Title</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editingTopic.title}
                          onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          required
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editingTopic.description}
                          onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setEditingTopic(null)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{topic.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{topic.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="mr-4">Created: {formatDate(topic.createdAt)}</span>
                          <span>{topic.postsCount} posts</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingTopic(topic)}
                          className="p-2 text-gray-400 hover:text-blue-500"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {topics.length === 0 && !isAddingTopic && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No topics yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new topic for the forum.
              </p>
              <button
                onClick={() => setIsAddingTopic(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Topic
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}