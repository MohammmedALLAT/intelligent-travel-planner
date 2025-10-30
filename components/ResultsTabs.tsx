import React, { useState } from 'react';
import type { Itinerary } from '../types';
import { DayCard } from './DayCard';
import { AccommodationList } from './AccommodationList';
import { ShoppingList } from './ShoppingList';

interface ResultsTabsProps {
  itinerary: Itinerary;
  onUpdateItinerary: (itinerary: Itinerary) => void;
  destination: string;
}

const TABS = ['Itinerary', 'Accommodation', 'Shopping'];

export const ResultsTabs: React.FC<ResultsTabsProps> = ({ itinerary, onUpdateItinerary, destination }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const handleDeleteActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = { ...itinerary };
    newItinerary.dailyPlans[dayIndex].activities.splice(activityIndex, 1);
    onUpdateItinerary(newItinerary);
  };
  
  return (
    <div>
      <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === 'Itinerary' && (
          <div className="space-y-6">
            {itinerary.dailyPlans.map((dayPlan, index) => (
              <DayCard 
                key={dayPlan.day} 
                dayPlan={dayPlan} 
                dayIndex={index}
                destination={destination} 
                onDeleteActivity={handleDeleteActivity}
              />
            ))}
          </div>
        )}
        {activeTab === 'Accommodation' && (
          <AccommodationList accommodations={itinerary.accommodationSuggestions} />
        )}
        {activeTab === 'Shopping' && (
          <ShoppingList items={itinerary.shoppingGuide} destination={destination}/>
        )}
      </div>
    </div>
  );
};
