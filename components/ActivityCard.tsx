import React from 'react';
import type { Activity } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FoodIcon } from './icons/FoodIcon';
import { CultureIcon } from './icons/CultureIcon';
import { NatureIcon } from './icons/NatureIcon';
import { ShoppingIcon } from './icons/ShoppingIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { AdventureIcon } from './icons/AdventureIcon';
import { DefaultIcon } from './icons/DefaultIcon';
import { CloudRainIcon } from './icons/CloudRainIcon';

interface ActivityCardProps {
  activity: Activity;
  destination: string;
  onDelete: () => void;
}

const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('food') || lowerCategory.includes('dining') || lowerCategory.includes('restaurant')) return <FoodIcon className="w-6 h-6 text-amber-500" />;
    if (lowerCategory.includes('culture') || lowerCategory.includes('art') || lowerCategory.includes('museum')) return <CultureIcon className="w-6 h-6 text-purple-500" />;
    if (lowerCategory.includes('nature') || lowerCategory.includes('park')) return <NatureIcon className="w-6 h-6 text-green-500" />;
    if (lowerCategory.includes('shop')) return <ShoppingIcon className="w-6 h-6 text-pink-500" />;
    if (lowerCategory.includes('history') || lowerCategory.includes('historic')) return <HistoryIcon className="w-6 h-6 text-orange-500" />;
    if (lowerCategory.includes('adventure') || lowerCategory.includes('activity')) return <AdventureIcon className="w-6 h-6 text-red-500" />;
    return <DefaultIcon className="w-6 h-6 text-slate-500" />;
};

const PriceLevel: React.FC<{ level: string }> = ({ level }) => {
  const priceColor = level === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200';
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priceColor}`}>
      {level}
    </span>
  );
};


export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, destination, onDelete }) => {
  
  const handleViewOnMap = () => {
    const query = encodeURIComponent(`${activity.name}, ${destination}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl flex flex-col group transition-all duration-300 hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-700">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600">
          {getCategoryIcon(activity.category)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">{activity.name}</h4>
            <div className="flex items-center space-x-2">
                {activity.priceLevel && <PriceLevel level={activity.priceLevel} />}
                <div className="flex items-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={handleViewOnMap} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-slate-600 hover:text-sky-600 dark:hover:text-sky-300 transition-colors" title="View on Map">
                        <MapPinIcon className="w-5 h-5" />
                    </button>
                    <button onClick={onDelete} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-slate-600 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete Activity">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activity.description}</p>
        </div>
      </div>
      {activity.alternativeActivity && (
        <div className="mt-3 ml-14 pl-2 border-l-2 border-slate-200 dark:border-slate-600">
            <div className="flex items-start space-x-3 text-sm text-slate-500 dark:text-slate-400">
                <CloudRainIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <div>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Weather Alternative:</span> {activity.alternativeActivity.name} - <span className="italic">{activity.alternativeActivity.description}</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};