import React, { useState } from 'react';
import { INTERESTS, MOODS, BUDGETS, EXPERIENCE_TYPES } from '../constants';
import type { UserPreferences } from '../types';

interface UserInputFormProps {
  onGenerate: (preferences: UserPreferences) => void;
  onReset: () => void;
  isGenerating: boolean;
  hasItinerary: boolean;
}

const Chip: React.FC<{
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}> = ({ label, isSelected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 ${
      isSelected
        ? 'bg-sky-500 text-white shadow-md'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
    }`}
  >
    {label}
  </button>
);

const RadioChipGroup: React.FC<{
  options: readonly string[];
  selected: string | undefined;
  onSelect: (option: string) => void;
}> = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(option => (
      <Chip
        key={option}
        label={option}
        isSelected={selected === option}
        onToggle={() => onSelect(option)}
      />
    ))}
  </div>
);


export const UserInputForm: React.FC<UserInputFormProps> = ({ onGenerate, onReset, isGenerating, hasItinerary }) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [budget, setBudget] = useState<string | undefined>(undefined);
  const [experienceType, setExperienceType] = useState<string | undefined>(EXPERIENCE_TYPES[0]);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests(prev => {
      const newInterests = new Set(prev);
      if (newInterests.has(interest)) {
        newInterests.delete(interest);
      } else {
        newInterests.add(interest);
      }
      return newInterests;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
        setError('Please enter a destination.');
        return;
    }
    if (interests.size === 0) {
        setError('Please select at least one interest.');
        return;
    }
    setError(null);
    onGenerate({ 
      destination, 
      days, 
      interests: Array.from(interests),
      mood,
      budget,
      experienceType
    });
  };
  
  const handleFormReset = () => {
    setDestination('');
    setDays(3);
    setInterests(new Set());
    setMood(undefined);
    setBudget(undefined);
    setExperienceType(EXPERIENCE_TYPES[0]);
    setError(null);
    onReset();
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg sticky top-24 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-5 text-slate-800 dark:text-slate-100">Plan Your Perfect Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Where are you going?
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              How many days?
            </label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              max="10"
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Interests?
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <Chip
                  key={interest}
                  label={interest}
                  isSelected={interests.has(interest)}
                  onToggle={() => toggleInterest(interest)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              What's the mood? (Optional)
            </label>
            <RadioChipGroup options={MOODS} selected={mood} onSelect={setMood} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Budget? (Optional)
            </label>
            <RadioChipGroup options={BUDGETS} selected={budget} onSelect={setBudget} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Experience Type?
            </label>
            <RadioChipGroup options={EXPERIENCE_TYPES} selected={experienceType} onSelect={setExperienceType} />
          </div>
        </div>
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {hasItinerary ? (
                <button type="button" onClick={handleFormReset} className="w-full flex-1 text-center px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition duration-150 ease-in-out">
                    Start Over
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full flex-1 inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 disabled:bg-sky-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                    >
                    {isGenerating ? 'Generating...' : 'Create My Itinerary'}
                </button>
            )}
        </div>
      </form>
    </div>
  );
};