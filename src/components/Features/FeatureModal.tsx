import React from 'react';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface FeatureModalProps {
  feature: {
    id: string;
    icon: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

const featureDetails: Record<string, {
  overview: string;
  features: string[];
  benefits: string[];
}> = {
  '1': {
    overview: "Never miss a dose with our intelligent medication reminder system. Designed specifically for Addison's Disease management, it helps you maintain your steroid replacement therapy schedule.",
    features: [
      "Customizable medication schedules",
      "Multiple daily reminder options",
      "Dose tracking and history",
      "Emergency dose notifications",
      "Medication inventory management",
      "Prescription refill reminders"
    ],
    benefits: [
      "Improved medication adherence",
      "Better symptom management",
      "Reduced risk of adrenal crisis",
      "Peace of mind for patients and caregivers"
    ]
  },
  '2': {
    overview: "Quick access to emergency protocols and crisis management steps. Essential information readily available when you need it most.",
    features: [
      "Step-by-step crisis response guides",
      "Emergency contact management",
      "Hospital letter templates",
      "GPS-enabled nearest hospital locator",
      "Emergency kit checklist",
      "Crisis documentation tools"
    ],
    benefits: [
      "Faster emergency response",
      "Better crisis outcomes",
      "Improved communication with medical teams",
      "Enhanced safety and preparedness"
    ]
  },
  '3': {
    overview: "Comprehensive guide for emergency injection procedures. Clear, step-by-step instructions for when oral medication isn't suitable.",
    features: [
      "Visual injection guides",
      "Video tutorials",
      "Site rotation tracking",
      "Injection technique tips",
      "Storage guidelines",
      "Emergency kit organization"
    ],
    benefits: [
      "Increased confidence in injection administration",
      "Proper technique assurance",
      "Better emergency preparedness",
      "Reduced injection anxiety"
    ]
  },
  '4': {
    overview: "Keep track of all your medical appointments and healthcare visits in one place. Never miss an important check-up or follow-up appointment.",
    features: [
      "Calendar integration",
      "Appointment reminders",
      "Doctor contact directory",
      "Visit history tracking",
      "Test result logging",
      "Follow-up scheduling"
    ],
    benefits: [
      "Better healthcare coordination",
      "Improved appointment attendance",
      "Enhanced medical record keeping",
      "Streamlined healthcare management"
    ]
  },
  '5': {
    overview: "Connect with others who understand your journey. Share experiences, tips, and support with fellow Addison's Disease patients.",
    features: [
      "Moderated discussion forums",
      "Private messaging",
      "Support group directories",
      "Event organization tools",
      "Resource sharing",
      "Expert Q&A sessions"
    ],
    benefits: [
      "Reduced isolation",
      "Peer support access",
      "Knowledge sharing",
      "Community building"
    ]
  },
  '6': {
    overview: "Access to comprehensive educational materials and the latest research about Addison's Disease management and treatment.",
    features: [
      "Research article summaries",
      "Treatment guides",
      "Lifestyle management tips",
      "Diet and exercise recommendations",
      "Travel advice",
      "Stress management techniques"
    ],
    benefits: [
      "Better disease understanding",
      "Improved self-management",
      "Updated treatment knowledge",
      "Enhanced quality of life"
    ]
  },
  '7': {
    overview: "Monitor your health patterns and identify trends that affect your well-being. Track symptoms, energy levels, and stress factors.",
    features: [
      "Symptom tracking",
      "Energy level monitoring",
      "Stress tracking",
      "Sleep quality logging",
      "Activity tracking",
      "Pattern analysis"
    ],
    benefits: [
      "Better symptom management",
      "Early warning detection",
      "Improved doctor communication",
      "Optimized treatment plans"
    ]
  },
  '8': {
    overview: "Digital medical ID card with crucial information for emergency responders. Quick access to your vital medical details when needed.",
    features: [
      "Digital ID generation",
      "Emergency contact info",
      "Medical condition details",
      "Medication list",
      "Healthcare provider contacts",
      "QR code access"
    ],
    benefits: [
      "Faster emergency response",
      "Better emergency care",
      "Improved safety",
      "Peace of mind"
    ]
  },
  '9': {
    overview: "Personalized advice and tips for managing daily life with Addison's Disease. Practical solutions for common challenges.",
    features: [
      "Daily management tips",
      "Lifestyle adjustments",
      "Travel planning guides",
      "Exercise recommendations",
      "Diet suggestions",
      "Stress management techniques"
    ],
    benefits: [
      "Improved daily management",
      "Better quality of life",
      "Enhanced coping strategies",
      "Greater independence"
    ]
  }
};

export function FeatureModal({ feature, onClose }: FeatureModalProps) {
  const IconComponent = Icons[feature.icon as keyof typeof Icons];
  const details = featureDetails[feature.id];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white mr-4">
                {IconComponent && <IconComponent className="w-6 h-6" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {details.overview}
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {details.features.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Benefits
              </h3>
              <ul className="space-y-2">
                {details.benefits.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}