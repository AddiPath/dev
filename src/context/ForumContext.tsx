import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  postsCount: number;
}

interface ForumContextType {
  topics: ForumTopic[];
  addTopic: (topic: Omit<ForumTopic, 'id' | 'createdAt' | 'postsCount'>) => void;
  updateTopic: (topic: ForumTopic) => void;
  deleteTopic: (topicId: string) => void;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

const INITIAL_TOPICS: ForumTopic[] = [
  {
    id: '1',
    title: 'General Discussion',
    description: 'General discussions about living with Addison\'s Disease',
    createdAt: '2024-03-01T10:00:00Z',
    postsCount: 15
  },
  {
    id: '2',
    title: 'Medication Management',
    description: 'Discuss medication schedules, dosages, and experiences',
    createdAt: '2024-03-01T10:00:00Z',
    postsCount: 8
  },
  {
    id: '3',
    title: 'Daily Living',
    description: 'Share tips and strategies for daily life with Addison\'s',
    createdAt: '2024-03-01T10:00:00Z',
    postsCount: 5
  },
  {
    id: '4',
    title: 'Support Network',
    description: 'Connect with others in the Addison\'s community',
    createdAt: '2024-03-01T10:00:00Z',
    postsCount: 12
  }
];

export function ForumProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<ForumTopic[]>(() => {
    const savedTopics = localStorage.getItem('forumTopics');
    return savedTopics ? JSON.parse(savedTopics) : INITIAL_TOPICS;
  });

  // Save topics to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('forumTopics', JSON.stringify(topics));
  }, [topics]);

  const addTopic = (newTopic: Omit<ForumTopic, 'id' | 'createdAt' | 'postsCount'>) => {
    const topic: ForumTopic = {
      id: Date.now().toString(),
      ...newTopic,
      createdAt: new Date().toISOString(),
      postsCount: 0
    };
    setTopics(prevTopics => [...prevTopics, topic]);
  };

  const updateTopic = (updatedTopic: ForumTopic) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => topic.id === updatedTopic.id ? updatedTopic : topic)
    );
  };

  const deleteTopic = (topicId: string) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== topicId));
  };

  return (
    <ForumContext.Provider value={{ topics, addTopic, updateTopic, deleteTopic }}>
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