import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { MedicationReminder } from './MedicationReminder';
import { AppointmentManager } from './AppointmentManager';
import { EmergencyIDPopup } from './EmergencyIDPopup';
import { WellnessTracker } from './WellnessTracker';

export function Dashboard() {
  const { user } = useAuth();
  const [isEmergencyIDOpen, setIsEmergencyIDOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('openEmergencyId') === 'true') {
      setIsEmergencyIDOpen(true);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          user={user} 
          onOpenEmergencyID={() => setIsEmergencyIDOpen(true)} 
        />
        
        <div className="mt-8">
          <DashboardStats />
        </div>

        <div className="mt-8">
          <MedicationReminder />
        </div>

        <div className="mt-8">
          <AppointmentManager />
        </div>

        <div className="mt-8">
          <WellnessTracker />
        </div>

        <EmergencyIDPopup 
          isOpen={isEmergencyIDOpen}
          onClose={() => setIsEmergencyIDOpen(false)}
        />
      </div>
    </div>
  );
}