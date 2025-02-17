import React from 'react';
import { Pill, Calendar, Activity, Clock } from 'lucide-react';
import { usePersistence } from '../../context/PersistenceContext';

export function DashboardStats() {
  const { reminders, appointments } = usePersistence();

  const stats = [
    {
      name: 'Active Medications',
      value: reminders.length,
      icon: Pill,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/50'
    },
    {
      name: 'Upcoming Appointments',
      value: appointments.length,
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/50'
    },
    {
      name: 'Next Dose',
      value: getNextDoseTime(reminders),
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/50'
    },
    {
      name: 'Wellness Score',
      value: '85%',
      icon: Activity,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-100 dark:bg-indigo-900/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getNextDoseTime(reminders: any[]): string {
  if (reminders.length === 0) return 'No reminders';
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Find the next reminder time
  const nextReminder = reminders
    .map(r => {
      const [hour, minute] = r.time.split(':').map(Number);
      let reminderDate = new Date();
      reminderDate.setHours(hour, minute, 0, 0);
      
      if (reminderDate <= now) {
        reminderDate.setDate(reminderDate.getDate() + 1);
      }
      
      return {
        time: r.time,
        date: reminderDate
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  if (!nextReminder) return 'No reminders';
  
  return nextReminder.time;
}