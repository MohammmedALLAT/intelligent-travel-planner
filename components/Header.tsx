import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.5l.053.053a.5.5 0 010 .707l-.053.053L6 6.707l-1.707-1.707a.5.5 0 01.707-.707l1.053 1.053.053-.053zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <GlobeIcon />
            <h1 className="text-xl md:text-2xl font-bold ml-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-transparent bg-clip-text">
            Intelligent Travel Planner
            </h1>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
};