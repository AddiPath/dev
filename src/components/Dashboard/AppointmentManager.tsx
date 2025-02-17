import React, { useState } from 'react';
import { Calendar, Plus, X, Clock, MapPin } from 'lucide-react';
import { usePersistence } from '../../context/PersistenceContext';

export function AppointmentManager() {
  const { appointments, addAppointment, deleteAppointment } = usePersistence();
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    location: '',
    date: '',
    time: '',
    notes: ''
  });

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const currentTime = newAppointment.time.split(':');
    let hour = currentTime[0] || '00';
    let minute = currentTime[1] || '00';

    if (type === 'hour') {
      hour = value;
    } else {
      minute = value;
    }

    setNewAppointment({ ...newAppointment, time: `${hour}:${minute}` });
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment(newAppointment);
    setNewAppointment({ doctor: '', specialty: '', location: '', date: '', time: '', notes: '' });
    setIsAddingAppointment(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="w-7 h-7 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appointments</h2>
          </div>
          <button
            onClick={() => setIsAddingAppointment(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Appointment
          </button>
        </div>

        {isAddingAppointment && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <form onSubmit={handleAddAppointment}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    placeholder="e.g., Dr. Smith"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialty
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    placeholder="e.g., Endocrinologist"
                    value={newAppointment.specialty}
                    onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    placeholder="e.g., City Medical Center, Room 305"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Hour</label>
                      <select
                        required
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                        value={newAppointment.time.split(':')[0] || '00'}
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
                        value={newAppointment.time.split(':')[1] || '00'}
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
                <div className="sm:col-span-2">
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base py-3"
                    rows={3}
                    placeholder="Any additional notes about the appointment"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingAppointment(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {appointment.doctor} - {appointment.specialty}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                    {formatDate(appointment.date)} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {appointment.location}
                  </p>
                  {appointment.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteAppointment(appointment.id)}
                className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-150"
                aria-label="Delete appointment"
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