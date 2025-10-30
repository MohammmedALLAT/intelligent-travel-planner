import React from 'react';
import type { ShoppingItem } from '../types';
import { TagIcon } from './icons/TagIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface ShoppingCardProps {
    item: ShoppingItem;
    destination: string;
}

export const ShoppingCard: React.FC<ShoppingCardProps> = ({ item, destination }) => {

    const handleSearch = () => {
        const query = encodeURIComponent(`${item.name} in ${item.whereToBuy}, ${destination}`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex flex-col group transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600">
                   <TagIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</h4>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300">{item.category}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{item.description}</p>
                    
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-3 flex items-center">
                       <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                       <span className="font-semibold mr-1">Where to find:</span> {item.whereToBuy}
                    </div>
                </div>
            </div>
             <button onClick={handleSearch} className="mt-4 text-center w-full px-3 py-1.5 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                Search Online
             </button>
        </div>
    );
};
