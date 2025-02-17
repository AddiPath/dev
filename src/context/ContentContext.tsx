import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'feature' | 'emergency';
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface HeroImage {
  url: string;
  alt: string;
}

interface ContentContextType {
  sections: ContentSection[];
  features: Feature[];
  heroImage: HeroImage;
  updateSections: (sections: ContentSection[]) => void;
  updateFeatures: (features: Feature[]) => void;
  updateHeroImage: (image: HeroImage) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initialSections: ContentSection[] = [
  {
    id: 'hero-title',
    title: 'Hero Title',
    content: "Managing Addison's Made Simple",
    type: 'hero'
  },
  {
    id: 'hero-subtitle',
    title: 'Hero Subtitle',
    content: "Your comprehensive companion for living with Addison's Disease. Track medications, manage appointments, and connect with others who understand your journey.",
    type: 'hero'
  },
  {
    id: 'features-title',
    title: 'Features Section Title',
    content: "Everything You Need to Manage Addison's",
    type: 'feature'
  },
  {
    id: 'features-subtitle',
    title: 'Features Section Subtitle',
    content: "Comprehensive tools designed specifically for Addison's Disease management",
    type: 'feature'
  },
  {
    id: 'emergency-title',
    title: 'Emergency Section Title',
    content: 'Emergency Information',
    type: 'emergency'
  },
  {
    id: 'emergency-subtitle',
    title: 'Emergency Section Subtitle',
    content: 'Quick access to critical information during an Addisonian crisis',
    type: 'emergency'
  }
];

const initialFeatures: Feature[] = [
  {
    id: '1',
    icon: 'Bell',
    title: 'Medication Reminders',
    description: 'Set customizable alerts for your regular steroid doses'
  },
  {
    id: '2',
    icon: 'AlertCircle',
    title: 'Emergency Protocols',
    description: 'Quick access to crisis management steps and emergency contacts'
  },
  {
    id: '3',
    icon: 'Syringe',
    title: 'Injection Guide',
    description: 'Step-by-step hydrocortisone injection instructions'
  },
  {
    id: '4',
    icon: 'Calendar',
    title: 'Appointment Manager',
    description: 'Track medical appointments and test results'
  },
  {
    id: '5',
    icon: 'Users',
    title: 'Community Support',
    description: "Connect with others in the Addison's community"
  },
  {
    id: '6',
    icon: 'BookOpen',
    title: 'Resources',
    description: 'Educational materials and latest research'
  },
  {
    id: '7',
    icon: 'LineChart',
    title: 'Wellness Tracking',
    description: 'Monitor your mood and energy levels'
  },
  {
    id: '8',
    icon: 'CreditCard',
    title: 'Emergency ID',
    description: 'Digital medical ID with vital information'
  },
  {
    id: '9',
    icon: 'Lightbulb',
    title: 'Care Tips',
    description: "Personalized advice for managing Addison's"
  }
];

const initialHeroImage: HeroImage = {
  url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
  alt: 'Medical professional with patient'
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<ContentSection[]>(() => {
    const saved = localStorage.getItem('contentSections');
    return saved ? JSON.parse(saved) : initialSections;
  });

  const [features, setFeatures] = useState<Feature[]>(() => {
    const saved = localStorage.getItem('contentFeatures');
    return saved ? JSON.parse(saved) : initialFeatures;
  });

  const [heroImage, setHeroImage] = useState<HeroImage>(() => {
    const saved = localStorage.getItem('heroImage');
    return saved ? JSON.parse(saved) : initialHeroImage;
  });

  useEffect(() => {
    localStorage.setItem('contentSections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('contentFeatures', JSON.stringify(features));
  }, [features]);

  useEffect(() => {
    localStorage.setItem('heroImage', JSON.stringify(heroImage));
  }, [heroImage]);

  const updateSections = (newSections: ContentSection[]) => {
    setSections(newSections);
  };

  const updateFeatures = (newFeatures: Feature[]) => {
    setFeatures(newFeatures);
  };

  const updateHeroImage = (image: HeroImage) => {
    setHeroImage(image);
  };

  return (
    <ContentContext.Provider value={{
      sections,
      features,
      heroImage,
      updateSections,
      updateFeatures,
      updateHeroImage
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}