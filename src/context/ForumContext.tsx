import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase';

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  created_at: string;
  posts_count: number;
}

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

interface ForumReply {
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
  replies: ForumReply[];
}

interface ForumContextType {
  topics: ForumTopic[];
  addTopic: (topic: Omit<ForumTopic, 'id' | 'created_at' | 'posts_count'>) => Promise<void>;
  updateTopic: (topic: ForumTopic) => Promise<void>;
  deleteTopic: (topicId: string) => Promise<void>;
  getPosts: (topicId: string | null) => Promise<ForumPost[]>;
  addPost: (post: Omit<ForumPost, 'id' | 'created_at' | 'user' | 'replies_count'>) => Promise<ForumPost | null>;
  getReplies: (postId: string) => Promise<ForumReply[]>;
  addReply: (reply: Omit<ForumReply, 'id' | 'created_at' | 'user' | 'likes' | 'is_liked' | 'replies'>) => Promise<ForumReply | null>;
  toggleLike: (replyId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export function ForumProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('topics')
        .select(`
          *,
          posts:posts(count)
        `);

      if (error) throw error;

      setTopics(data.map(topic => ({
        ...topic,
        posts_count: topic.posts[0]?.count || 0
      })));
    } catch (err) {
      console.error('Error loading topics:', err);
      setError('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const addTopic = async (topic: Omit<ForumTopic, 'id' | 'created_at' | 'posts_count'>) => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .insert([topic])
        .select()
        .single();

      if (error) throw error;

      setTopics(prev => [...prev, { ...data, posts_count: 0 }]);
    } catch (err) {
      console.error('Error adding topic:', err);
      setError('Failed to add topic');
    }
  };

  const updateTopic = async (topic: ForumTopic) => {
    try {
      const { error } = await supabase
        .from('topics')
        .update({ title: topic.title, description: topic.description })
        .eq('id', topic.id);

      if (error) throw error;

      setTopics(prev => prev.map(t => t.id === topic.id ? topic : t));
    } catch (err) {
      console.error('Error updating topic:', err);
      setError('Failed to update topic');
    }
  };

  const deleteTopic = async (topicId: string) => {
    try {
      const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', topicId);

      if (error) throw error;

      setTopics(prev => prev.filter(t => t.id !== topicId));
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError('Failed to delete topic');
    }
  };

  const getPosts = async (topicId: string | null) => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          user:users(name),
          replies:replies(count)
        `)
        .order('created_at', { ascending: false });

      if (topicId) {
        query = query.eq('topic_id', topicId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map(post => ({
        ...post,
        user: { name: post.user.name },
        replies_count: post.replies[0]?.count || 0
      }));
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts');
      return [];
    }
  };

  const addPost = async (post: Omit<ForumPost, 'id' | 'created_at' | 'user' | 'replies_count'>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select(`
          *,
          user:users(name)
        `)
        .single();

      if (error) throw error;

      return {
        ...data,
        user: { name: data.user.name },
        replies_count: 0
      };
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Failed to add post');
      return null;
    }
  };

  const getReplies = async (postId: string) => {
    try {
      const { data: repliesData, error: repliesError } = await supabase
        .from('replies')
        .select(`
          *,
          user:users(name),
          likes:likes(count)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      // Get user's likes
      const { data: userLikes, error: likesError } = await supabase
        .from('likes')
        .select('reply_id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id || '');

      if (likesError) throw likesError;

      const likedReplyIds = new Set(userLikes.map(like => like.reply_id));

      // Build reply tree
      const replies: ForumReply[] = [];
      const replyMap = new Map<string, ForumReply>();

      repliesData.forEach(reply => {
        const formattedReply: ForumReply = {
          ...reply,
          user: { name: reply.user.name },
          likes: reply.likes[0]?.count || 0,
          is_liked: likedReplyIds.has(reply.id),
          replies: []
        };

        replyMap.set(reply.id, formattedReply);

        if (reply.parent_id) {
          const parent = replyMap.get(reply.parent_id);
          if (parent) {
            parent.replies.push(formattedReply);
          }
        } else {
          replies.push(formattedReply);
        }
      });

      return replies;
    } catch (err) {
      console.error('Error loading replies:', err);
      setError('Failed to load replies');
      return [];
    }
  };

  const addReply = async (reply: Omit<ForumReply, 'id' | 'created_at' | 'user' | 'likes' | 'is_liked' | 'replies'>) => {
    try {
      const { data, error } = await supabase
        .from('replies')
        .insert([reply])
        .select(`
          *,
          user:users(name)
        `)
        .single();

      if (error) throw error;

      return {
        ...data,
        user: { name: data.user.name },
        likes: 0,
        is_liked: false,
        replies: []
      };
    } catch (err) {
      console.error('Error adding reply:', err);
      setError('Failed to add reply');
      return null;
    }
  };

  const toggleLike = async (replyId: string) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) return;

    try {
      const { data: existingLike } = await supabase
        .from('likes')
        .select()
        .eq('user_id', userId)
        .eq('reply_id', replyId)
        .single();

      if (existingLike) {
        await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq('reply_id', replyId);
      } else {
        await supabase
          .from('likes')
          .insert([{ user_id: userId, reply_id: replyId }]);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      setError('Failed to update like');
    }
  };

  return (
    <ForumContext.Provider value={{
      topics,
      addTopic,
      updateTopic,
      deleteTopic,
      getPosts,
      addPost,
      getReplies,
      addReply,
      toggleLike,
      loading,
      error
    }}>
      {children}
    </ForumContext.Provider>
  );
}

export function useForum() {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
}