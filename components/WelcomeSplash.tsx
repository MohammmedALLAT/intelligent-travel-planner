import React from 'react';
import { CompassIcon } from './icons/CompassIcon';

export const WelcomeSplash: React.FC = () => {
    return (
        <div className="text-center p-10 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <CompassIcon className="w-20 h-20 text-sky-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Next Adventure Awaits</h2>
            <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-400">
                Ready for an unforgettable trip? Tell us what you love, and we'll craft a personalized itinerary just for you.
            </p>
        </div>
    );
};