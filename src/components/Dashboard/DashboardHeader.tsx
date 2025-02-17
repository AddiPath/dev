import React from 'react';
import { CreditCard } from 'lucide-react';
import type { User } from '../../context/AuthContext';
import { UpgradeButton } from '../Upgrade/UpgradeButton';

interface DashboardHeaderProps {
  user: User | null;
  onOpenEmergencyID: () => void;
}

export function DashboardHeader({ user, onOpenEmergencyID }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Track your health, manage medications, and stay connected with your care team.
        </p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <button
          onClick={onOpenEmergencyID}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Emergency ID
        </button>
        <UpgradeButton />
      </div>
    </div>
  );
}