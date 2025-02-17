import React, { useState } from 'react';
import { X, Crown, Shield, Zap, Clock, Users, LineChart, Bot } from 'lucide-react';
import { GracePreview } from '../Grace/GracePreview';
import { redirectToStripePro } from '../../utils/stripe';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: Bot,
    title: "Grace AI Support Agent",
    description: "24/7 personalized support and guidance for managing Addison's Disease"
  },
  {
    icon: Shield,
    title: "Advanced Emergency Protocols",
    description: "Enhanced emergency response system with GPS integration"
  },
  {
    icon: Clock,
    title: "Extended History",
    description: "Unlimited history for medications and appointments"
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Add family members and caregivers to your account"
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Detailed health trends and pattern analysis"
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "24/7 priority access to our support team"
  }
];

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      await redirectToStripePro();
      // Close modal after successful redirect
      onClose();
    } catch (error) {
      setError('Failed to open payment page. Please try again or contact support.');
      console.error('Upgrade error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Crown className="w-8 h-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upgrade to AddiPath Pro
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Introducing Grace
                </h3>
                <GracePreview />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Pro Benefits
                </h3>
                <div className="grid gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Monthly Plan
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Full access to all Pro features including Grace AI
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      £4.99
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Upgrade Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}