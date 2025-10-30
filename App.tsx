import React, { useState } from 'react';
import { Header } from './components/Header';
import { UserInputForm } from './components/UserInputForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeSplash } from './components/WelcomeSplash';
import { generateItinerary } from './services/geminiService';
import type { UserPreferences, Itinerary } from './types';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPreferences, setCurrentPreferences] = useState<UserPreferences | null>(null);

  const handleGenerate = async (preferences: UserPreferences) => {
    setIsGenerating(true);
    setError(null);
    setItinerary(null);
    setCurrentPreferences(preferences);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setError(null);
    setCurrentPreferences(null);
  };

  const handleUpdateItinerary = (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-4">
            <UserInputForm
              onGenerate={handleGenerate}
              onReset={handleReset}
              isGenerating={isGenerating}
              hasItinerary={!!itinerary}
            />
          </div>
          <div className="xl:col-span-8">
            {isGenerating && <LoadingSpinner />}
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg shadow-md">{error}</div>}
            {!isGenerating && !itinerary && !error && <WelcomeSplash />}
            {itinerary && currentPreferences && (
              <ItineraryDisplay
                itinerary={itinerary}
                onUpdateItinerary={handleUpdateItinerary}
                destination={currentPreferences.destination}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;