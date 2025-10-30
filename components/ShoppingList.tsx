import React from 'react';
import type { ShoppingItem } from '../types';
import { ShoppingCard } from './ShoppingCard';

interface ShoppingListProps {
  items: ShoppingItem[];
  destination: string;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ items, destination }) => {
    if (!items || items.length === 0) {
        return <p className="text-center py-8 text-slate-500 dark:text-slate-400">No shopping suggestions available.</p>;
    }
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Local Finds & Souvenirs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <ShoppingCard key={index} item={item} destination={destination} />
                ))}
            </div>
        </div>
    );
};
