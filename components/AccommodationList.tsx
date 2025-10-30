import React from 'react';
import type { Accommodation } from '../types';
import { AccommodationCard } from './AccommodationCard';

interface AccommodationListProps {
  accommodations: Accommodation[];
}

export const AccommodationList: React.FC<AccommodationListProps> = ({ accommodations }) => {
  if (!accommodations || accommodations.length === 0) {
    return <p className="text-center py-8 text-slate-500 dark:text-slate-400">No accommodation suggestions available.</p>;
  }
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Where to Stay</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodations.map((acc, index) => (
          <AccommodationCard key={index} accommodation={acc} />
        ))}
      </div>
    </div>
  );
};
