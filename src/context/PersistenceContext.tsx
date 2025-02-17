import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Reminder {
  id: string;
  medication: string;
  dosage: string;
  time: string;
  frequency: string;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  location: string;
  date: string;
  time: string;
  notes: string;
}

interface PersistenceContextType {
  reminders: Reminder[];
  appointments: Appointment[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  deleteAppointment: (id: string) => void;
}

const PersistenceContext = createContext<PersistenceContextType | undefined>(undefined);

export function PersistenceProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      id: Date.now().toString(),
      ...reminder
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointment
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  return (
    <PersistenceContext.Provider value={{
      reminders,
      appointments,
      addReminder,
      deleteReminder,
      addAppointment,
      deleteAppointment
    }}>
      {children}
    </PersistenceContext.Provider>
  );
}

export function usePersistence() {
  const context = useContext(PersistenceContext);
  if (context === undefined) {
    throw new Error('usePersistence must be used within a PersistenceProvider');
  }
  return context;
}