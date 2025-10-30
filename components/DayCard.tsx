import React, { useState } from 'react';
import type { DayPlan } from '../types';
import { ActivityCard } from './ActivityCard';
import { MapIcon } from './icons/MapIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DayCardProps {
  dayPlan: DayPlan;
  dayIndex: number;
  destination: string;
  onDeleteActivity: (dayIndex: number, activityIndex: number) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ dayPlan, dayIndex, destination, onDeleteActivity }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleViewRoute = () => {
    if (dayPlan.activities.length < 2) {
      const query = encodeURIComponent(`${dayPlan.activities[0].name}, ${destination}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      return;
    }
    
    const origin = encodeURIComponent(`${dayPlan.activities[0].name}, ${destination}`);
    const dest = encodeURIComponent(`${dayPlan.activities[dayPlan.activities.length - 1].name}, ${destination}`);
    const waypoints = dayPlan.activities
      .slice(1, -1)
      .map(act => encodeURIComponent(`${act.name}, ${destination}`))
      .join('|');
      
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-700">
      <button 
        className="w-full p-6 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <CalendarIcon className="w-6 h-6 mr-3 text-sky-500 flex-shrink-0"/>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Day {dayPlan.day}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{dayPlan.title}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
          {dayPlan.activities.length > 0 && (
            <div 
              onClick={(e) => { e.stopPropagation(); handleViewRoute(); }}
              className="hidden sm:flex items-center px-4 py-2 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300 text-sm font-semibold rounded-full hover:bg-sky-200 dark:hover:bg-sky-900 transition-colors"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              View Route
            </div>
          )}
          <ChevronDownIcon className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="p-2 sm:p-4">
                <div className="space-y-2">
                {dayPlan.activities.map((activity, activityIndex) => (
                    <ActivityCard
                    key={activityIndex}
                    activity={activity}
                    destination={destination}
                    onDelete={() => onDeleteActivity(dayIndex, activityIndex)}
                    />
                ))}
                {dayPlan.activities.length === 0 && (
                    <p className="text-center py-8 text-slate-500 dark:text-slate-400">No activities for this day.</p>
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};