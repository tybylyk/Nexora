import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Phone, 
  Coffee, 
  BookOpen, 
  Settings as SettingsIcon,
  Calendar,
  BarChart3,
  Timer
} from 'lucide-react';
import { TimeEntry } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const TimeTracker: React.FC = () => {
  const { user } = useAuth();
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      userId: user?.id || '',
      type: 'call',
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-15T09:15:00Z',
      duration: 15,
      description: 'Customer support call with John Smith',
      callId: 'call-123',
      customerId: 'customer-456'
    },
    {
      id: '2',
      userId: user?.id || '',
      type: 'break',
      startTime: '2024-01-15T10:30:00Z',
      endTime: '2024-01-15T10:45:00Z',
      duration: 15,
      description: 'Coffee break'
    },
    {
      id: '3',
      userId: user?.id || '',
      type: 'training',
      startTime: '2024-01-15T11:00:00Z',
      endTime: '2024-01-15T12:00:00Z',
      duration: 60,
      description: 'Product training session'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activityType, setActivityType] = useState<TimeEntry['type']>('call');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentEntry && !currentEntry.endTime) {
      interval = setInterval(() => {
        const startTime = new Date(currentEntry.startTime).getTime();
        const now = new Date().getTime();
        setElapsedTime(Math.floor((now - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentEntry]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (type: TimeEntry['type'], description?: string) => {
    if (currentEntry) {
      stopTimer();
    }

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      userId: user?.id || '',
      type,
      startTime: new Date().toISOString(),
      description: description || `${type.charAt(0).toUpperCase() + type.slice(1)} activity`,
      isActive: true
    };

    setCurrentEntry(newEntry);
    setElapsedTime(0);
  };

  const pauseTimer = () => {
    if (currentEntry && !currentEntry.endTime) {
      const now = new Date().toISOString();
      const startTime = new Date(currentEntry.startTime).getTime();
      const endTime = new Date(now).getTime();
      const duration = Math.floor((endTime - startTime) / 1000);

      const updatedEntry = {
        ...currentEntry,
        endTime: now,
        duration,
        isActive: false
      };

      setTimeEntries(prev => [...prev, updatedEntry]);
      setCurrentEntry(null);
      setElapsedTime(0);
    }
  };

  const stopTimer = () => {
    if (currentEntry) {
      pauseTimer();
    }
  };

  const getActivityIcon = (type: TimeEntry['type']) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'break': return <Coffee className="w-4 h-4" />;
      case 'training': return <BookOpen className="w-4 h-4" />;
      case 'admin': return <SettingsIcon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: TimeEntry['type']) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'break': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'available': return 'bg-emerald-100 text-emerald-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayEntries = timeEntries.filter(entry => 
    entry.startTime.startsWith(selectedDate)
  );

  const totalTimeToday = todayEntries.reduce((total, entry) => total + (entry.duration || 0), 0);
  const callTimeToday = todayEntries
    .filter(entry => entry.type === 'call')
    .reduce((total, entry) => total + (entry.duration || 0), 0);

  const activityTypes = [
    { type: 'call' as const, label: 'Call', icon: Phone, color: 'blue' },
    { type: 'break' as const, label: 'Break', icon: Coffee, color: 'green' },
    { type: 'training' as const, label: 'Training', icon: BookOpen, color: 'purple' },
    { type: 'admin' as const, label: 'Admin', icon: SettingsIcon, color: 'orange' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600 mt-1">Track your work activities and productivity</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Timer */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Activity</h3>
            
            {currentEntry ? (
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-600 mb-4">
                  {formatDuration(elapsedTime)}
                </div>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getActivityColor(currentEntry.type)}`}>
                  {getActivityIcon(currentEntry.type)}
                  <span className="capitalize">{currentEntry.type}</span>
                </div>
                <p className="text-gray-600 mb-6">{currentEntry.description}</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={pauseTimer}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                  <button
                    onClick={stopTimer}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-400 mb-4">00:00</div>
                <p className="text-gray-600 mb-6">No active timer</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {activityTypes.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <button
                        key={activity.type}
                        onClick={() => startTimer(activity.type)}
                        className={`p-4 border-2 border-${activity.color}-200 rounded-lg hover:bg-${activity.color}-50 transition-colors flex flex-col items-center space-y-2`}
                      >
                        <Icon className={`w-6 h-6 text-${activity.color}-600`} />
                        <span className="font-medium text-gray-900">{activity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-600">Total Time</span>
                </div>
                <span className="font-semibold text-gray-900">{formatDuration(totalTimeToday * 60)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Call Time</span>
                </div>
                <span className="font-semibold text-gray-900">{formatDuration(callTimeToday * 60)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Productivity</span>
                </div>
                <span className="font-semibold text-green-600">
                  {totalTimeToday > 0 ? Math.round((callTimeToday / totalTimeToday) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => startTimer('call', 'Customer support call')}
                disabled={!!currentEntry}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Start Call Timer</span>
              </button>
              <button
                onClick={() => startTimer('break', 'Break time')}
                disabled={!!currentEntry}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Coffee className="w-4 h-4" />
                <span>Take Break</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Time Entries</h3>
        </div>
        <div className="p-6">
          {todayEntries.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No entries for this date</h3>
              <p className="text-gray-600">Start tracking your time to see entries here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getActivityColor(entry.type)}`}>
                      {getActivityIcon(entry.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">{entry.type}</h4>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.startTime).toLocaleTimeString()} - {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : 'Active'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {entry.duration ? formatDuration(entry.duration * 60) : formatDuration(elapsedTime)}
                    </div>
                    {entry.callId && (
                      <div className="text-xs text-purple-600">Call ID: {entry.callId}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;