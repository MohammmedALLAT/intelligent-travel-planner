import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-600 border-t-sky-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-semibold text-slate-700 dark:text-slate-300">Crafting your custom adventure...</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">This might take a moment.</p>
    </div>
  );
};