'use client'
import { useState, useEffect } from 'react';
import OutfitSuggestion from './components/OutfitSuggestion'
import SearchFilter from './components/SearchFilter'
import CalendarPlanner from './components/CalendarPlanner'
import UploadForm from './components/UploadForm'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('wardrobe');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Smart Wardrobe Organizer</span>
            <span className="block text-indigo-600">Organize Your Style</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Effortlessly manage your wardrobe, plan outfits, and get personalized suggestions based on weather and occasions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['wardrobe', 'planner', 'suggestions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'wardrobe' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <UploadForm />
              <div className="mt-8">
                <SearchFilter onFilter={(filters) => console.log(filters)} />
                {/* Add your wardrobe items display here */}
              </div>
            </div>
          )}
          
          {activeTab === 'planner' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <CalendarPlanner />
            </div>
          )}
          
          {activeTab === 'suggestions' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <OutfitSuggestion />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;