import React from 'react';
import type { Accommodation } from '../types';
import { BedIcon } from './icons/BedIcon';
import { StarIcon } from './icons/StarIcon';

interface AccommodationCardProps {
    accommodation: Accommodation;
}

const PriceLevelBadge: React.FC<{ level: string }> = ({ level }) => {
    let colorClasses = 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200';
    if (level === 'Budget-Friendly') colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (level === 'Mid-Range') colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (level === 'Luxury') colorClasses = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClasses}`}>
        {level}
      </span>
    );
};

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
    return (
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex flex-col h-full transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600">
                    <BedIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{accommodation.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{accommodation.type}</p>
                </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 flex-grow">{accommodation.description}</p>
            
            <div className="mt-4 flex items-center justify-between">
                <PriceLevelBadge level={accommodation.priceLevel} />
                <div className="flex items-center space-x-1 text-amber-500">
                    <StarIcon className="w-5 h-5" />
                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{accommodation.rating.toFixed(1)}</span>
                </div>
            </div>
            
            {accommodation.bookingLink && (
                 <a href={`https://${accommodation.bookingLink}`} target="_blank" rel="noopener noreferrer" className="mt-4 text-center w-full px-3 py-1.5 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                     View Booking Options
                 </a>
            )}
        </div>
    );
};
