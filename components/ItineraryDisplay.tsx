import React, { useState } from 'react';
import type { Itinerary } from '../types';
import { ResultsTabs } from './ResultsTabs';
import { ChatAssistant } from './ChatAssistant';
import { ChatIcon } from './icons/ChatIcon';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onUpdateItinerary: (itinerary: Itinerary) => void;
  destination: string;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, onUpdateItinerary, destination }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative">
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-transparent bg-clip-text">
            {itinerary.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-3xl">{itinerary.summary}</p>

        <ResultsTabs 
          itinerary={itinerary}
          onUpdateItinerary={onUpdateItinerary}
          destination={destination}
        />
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-transform hover:scale-110 active:scale-100"
        title="Ask AI Concierge"
      >
        <ChatIcon className="w-6 h-6" />
      </button>

      <ChatAssistant
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        itinerary={itinerary}
        destination={destination}
      />
    </div>
  );
};