import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Plus, Activity } from 'lucide-react';

interface WellnessEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  symptoms: string[];
  notes: string;
}

const moodEmojis = ['😢', '😕', '😐', '🙂', '😊'];
const symptoms = [
  'Fatigue',
  'Dizziness',
  'Nausea',
  'Headache',
  'Joint Pain',
  'Muscle Weakness',
  'Salt Craving',
  'Low Blood Pressure'
];

export function WellnessTracker() {
  const [entries, setEntries] = useState<WellnessEntry[]>(() => {
    const saved = localStorage.getItem('wellnessEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<WellnessEntry, 'id'>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    mood: 3,
    energy: 3,
    stress: 3,
    symptoms: [],
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('wellnessEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: WellnessEntry = {
      id: Date.now().toString(),
      ...newEntry
    };
    setEntries([...entries, entry]);
    setIsAddingEntry(false);
    setNewEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 3,
      energy: 3,
      stress: 3,
      symptoms: [],
      notes: ''
    });
  };

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEntryForDay = (date: Date) => {
    return entries.find(entry => isSameDay(new Date(entry.date), date));
  };

  const chartData = entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: format(new Date(entry.date), 'MMM dd'),
      mood: entry.mood,
      energy: entry.energy,
      stress: entry.stress
    }));

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Activity className="w-7 h-7 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Wellness Tracker</h2>
          </div>
          <button
            onClick={() => setIsAddingEntry(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Entry
          </button>
        </div>

        {/* Monthly Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Monthly Overview
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {daysInMonth.map(day => {
              const entry = getEntryForDay(day);
              return (
                <div
                  key={day.toString()}
                  className={`aspect-square rounded-lg border p-2 text-center ${
                    entry
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm text-gray-600">
                    {format(day, 'd')}
                  </div>
                  {entry && (
                    <div className="text-lg">
                      {moodEmojis[entry.mood - 1]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trends Graph */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Wellness Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#3B82F6" name="Mood" />
                <Line type="monotone" dataKey="energy" stroke="#10B981" name="Energy" />
                <Line type="monotone" dataKey="stress" stroke="#EF4444" name="Stress" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Entry Form */}
        {isAddingEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Wellness Entry</h3>
                <form onSubmit={handleAddEntry} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mood</label>
                      <div className="mt-1 flex justify-between">
                        {moodEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`p-2 rounded-full ${
                              newEntry.mood === index + 1
                                ? 'bg-blue-100 ring-2 ring-blue-500'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setNewEntry({ ...newEntry, mood: index + 1 })}
                          >
                            <span className="text-2xl">{emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Energy Level</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="mt-2 w-full"
                        value={newEntry.energy}
                        onChange={(e) => setNewEntry({ ...newEntry, energy: Number(e.target.value) })}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stress Level</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="mt-2 w-full"
                        value={newEntry.stress}
                        onChange={(e) => setNewEntry({ ...newEntry, stress: Number(e.target.value) })}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                    <div className="grid grid-cols-2 gap-2">
                      {symptoms.map(symptom => (
                        <label key={symptom} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={newEntry.symptoms.includes(symptom)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewEntry({
                                  ...newEntry,
                                  symptoms: [...newEntry.symptoms, symptom]
                                });
                              } else {
                                setNewEntry({
                                  ...newEntry,
                                  symptoms: newEntry.symptoms.filter(s => s !== symptom)
                                });
                              }
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-700">{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      placeholder="Any additional notes about your day..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsAddingEntry(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}