import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Crown, ArrowRight } from 'lucide-react';
import { Plan } from './types';
import { featureIcons } from './icons';
import { redirectToStripePro } from '../../utils/stripe';
import { useAuth } from '../../context/AuthContext';

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=membership');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      redirectToStripePro();
      // No need to check return value since we have fallback behavior
    } catch (err) {
      setError('Unable to process payment. Please try again or contact support.');
      console.error('Checkout error:', err instanceof Error ? err.message : err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${
        plan.name === 'Pro' ? 'border-2 border-yellow-500' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              {plan.name === 'Pro' && (
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
              )}
              {plan.name}
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">{plan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {plan.price}
            </div>
            {plan.interval && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                per {plan.interval}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <ul className="space-y-4">
            {plan.features.map((feature) => {
              const Icon = featureIcons[feature.name];
              return (
                <li
                  key={feature.name}
                  className={`flex items-center ${
                    feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {feature.included ? (
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <X className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <span className="flex items-center">
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {feature.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mt-8">
          {plan.name === 'Pro' ? (
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  Upgrade Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          ) : (
            <Link
              to="/signup"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}