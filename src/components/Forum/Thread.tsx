import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForum } from '../../context/ForumContext';
import { ArrowLeft, MessageSquare, Heart, Reply as ReplyIcon } from 'lucide-react';

interface Reply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  user: {
    name: string;
  };
  likes: number;
  is_liked: boolean;
  replies: Reply[];
}

interface ThreadProps {
  post: {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
    user: {
      name: string;
    };
  };
  onBack: () => void;
}

export function Thread({ post, onBack }: ThreadProps) {
  const { user } = useAuth();
  const { getReplies, addReply, toggleLike } = useForum();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<Reply | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReplies();
  }, [post.id]);

  const loadReplies = async () => {
    setLoading(true);
    try {
      const loadedReplies = await getReplies(post.id);
      setReplies(loadedReplies);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;

    const newReply = await addReply({
      post_id: post.id,
      user_id: user.id,
      content: replyContent.trim(),
      parent_id: replyingTo?.id || null
    });

    if (newReply) {
      if (replyingTo) {
        setReplies(prev => prev.map(reply => {
          if (reply.id === replyingTo.id) {
            return {
              ...reply,
              replies: [...reply.replies, newReply]
            };
          }
          return reply;
        }));
      } else {
        setReplies(prev => [...prev, newReply]);
      }
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleLike = async (replyId: string) => {
    await toggleLike(replyId);
    await loadReplies(); // Reload to get updated likes
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

  const ReplyComponent = ({ reply, depth = 0 }: { reply: Reply; depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">{reply.user.name}</p>
            <p className="text-sm text-gray-500">{formatDate(reply.created_at)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleLike(reply.id)}
              className={`flex items-center space-x-1 ${
                reply.is_liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="h-4 w-4" fill={reply.is_liked ? 'currentColor' : 'none'} />
              <span className="text-sm">{reply.likes}</span>
            </button>
            <button
              onClick={() => setReplyingTo(reply)}
              className="text-gray-400 hover:text-blue-500 flex items-center space-x-1"
            >
              <ReplyIcon className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
          </div>
        </div>
        <p className="mt-2 text-gray-700">{reply.content}</p>
      </div>
      {reply.replies && reply.replies.map(nestedReply => (
        <ReplyComponent key={nestedReply.id} reply={nestedReply} depth={depth + 1} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading discussion...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Discussions
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          <div className="mt-2 flex items-center text-gray-500">
            <span>Posted by {post.user.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
          <p className="mt-4 text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {replyingTo ? `Replying to ${replyingTo.user.name}` : 'Leave a Reply'}
          </h2>
          {user ? (
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                required
              />
              <div className="flex justify-between items-center">
                {replyingTo && (
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cancel Reply
                  </button>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Reply
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-600">Please log in to reply to this discussion.</p>
          )}
        </div>

        <div className="mt-8 space-y-6">
          {replies.map(reply => (
            <ReplyComponent key={reply.id} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  );
}