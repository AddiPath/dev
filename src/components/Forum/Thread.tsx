import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, MessageSquare, Heart, Reply as ReplyIcon } from 'lucide-react';

interface Reply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  parentId?: string;
  replies: Reply[];
}

interface ThreadProps {
  post: {
    id: string;
    userId: string;
    userName: string;
    title: string;
    content: string;
    createdAt: string;
    replies: number;
    topicId: string;
  };
  onBack: () => void;
}

export function Thread({ post, onBack }: ThreadProps) {
  const { user } = useAuth();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<Reply | null>(null);

  useEffect(() => {
    const savedReplies = localStorage.getItem(`thread_${post.id}_replies`);
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    }
  }, [post.id]);

  const saveRepliesToStorage = (updatedReplies: Reply[]) => {
    localStorage.setItem(`thread_${post.id}_replies`, JSON.stringify(updatedReplies));
  };

  const handleLike = (replyId: string) => {
    const updateLikes = (replyList: Reply[]): Reply[] => {
      return replyList.map(reply => {
        if (reply.id === replyId) {
          return {
            ...reply,
            likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
            isLiked: !reply.isLiked
          };
        }
        if (reply.replies.length > 0) {
          return {
            ...reply,
            replies: updateLikes(reply.replies)
          };
        }
        return reply;
      });
    };

    const updatedReplies = updateLikes(replies);
    setReplies(updatedReplies);
    saveRepliesToStorage(updatedReplies);
  };

  const addReplyToThread = (newReply: Reply, parentId?: string) => {
    if (!parentId) {
      return [...replies, newReply];
    }

    const addReplyToParent = (replyList: Reply[]): Reply[] => {
      return replyList.map(reply => {
        if (reply.id === parentId) {
          return {
            ...reply,
            replies: [...(reply.replies || []), newReply]
          };
        }
        if (reply.replies && reply.replies.length > 0) {
          return {
            ...reply,
            replies: addReplyToParent(reply.replies)
          };
        }
        return reply;
      });
    };

    return addReplyToParent(replies);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      postId: post.id,
      userId: user.id,
      userName: user.name,
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      parentId: replyingTo?.id,
      replies: []
    };

    const updatedReplies = addReplyToThread(newReply, replyingTo?.id);
    setReplies(updatedReplies);
    saveRepliesToStorage(updatedReplies);
    setReplyContent('');
    setReplyingTo(null);
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
            <p className="font-medium text-gray-900">{reply.userName}</p>
            <p className="text-sm text-gray-500">{formatDate(reply.createdAt)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleLike(reply.id)}
              className={`flex items-center space-x-1 ${
                reply.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="h-4 w-4" fill={reply.isLiked ? 'currentColor' : 'none'} />
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
            <span>Posted by {post.userName}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <p className="mt-4 text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {replyingTo ? `Replying to ${replyingTo.userName}` : 'Leave a Reply'}
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