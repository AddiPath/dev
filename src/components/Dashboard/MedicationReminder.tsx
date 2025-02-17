import React, { useState } from 'react';
import { Bell, Plus, X, Clock } from 'lucide-react';
import { usePersistence } from '../../context/PersistenceContext';

export function MedicationReminder() {
  const { reminders, addReminder, deleteReminder } = usePersistence();
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medication: '',
    dosage: '',
    time: '',
    frequency: 'daily'
  });

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const currentTime = newReminder.time.split(':');
    let hour = currentTime[0] || '00';
    let minute = currentTime[1] || '00';

    if (type === 'hour') {
      hour = value;
    } else {
      minute = value;
    }

    setNewReminder({ ...newReminder, time: `${hour}:${minute}` });
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    addReminder(newReminder);
    setNewReminder({ medication: '', dosage: '', time: '', frequency: 'daily' });
    setIsAddingReminder(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Bell className="w-7 h-7 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Medication Reminders</h2>
          </div>
          <button
            onClick={() => setIsAddingReminder(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Reminder
          </button>
        </div>

        {isAddingReminder && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <form onSubmit={handleAddReminder}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    placeholder="e.g., Hydrocortisone"
                    value={newReminder.medication}
                    onChange={(e) => setNewReminder({ ...newReminder, medication: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dosage Amount
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    placeholder="e.g., 10mg"
                    value={newReminder.dosage}
                    onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time to Take (24-hour)
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Hour</label>
                      <select
                        required
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                        value={newReminder.time.split(':')[0] || '00'}
                        onChange={(e) => handleTimeChange('hour', e.target.value)}
                      >
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Minute</label>
                      <select
                        required
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                        value={newReminder.time.split(':')[1] || '00'}
                        onChange={(e) => handleTimeChange('minute', e.target.value)}
                      >
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How Often?
                  </label>
                  <select
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingReminder(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {reminder.medication} - {reminder.dosage}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                    {reminder.time} • {reminder.frequency.charAt(0).toUpperCase() + reminder.frequency.slice(1)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-150"
                aria-label="Delete reminder"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}