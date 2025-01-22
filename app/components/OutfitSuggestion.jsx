// components/OutfitSuggestion.js
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
//import { WeatherIcon } from './WeatherIcon';

const OutfitSuggestion = () => {
  const [location, setLocation] = useState('');
  const [occasion, setOccasion] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);

  const occasions = [
    'casual', 'formal', 'business', 'party', 
    'workout', 'date', 'interview'
  ];

  // Fetch wardrobe items when component mounts
  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const response = await fetch('/api/clothes');
        const data = await response.json();
        if (data.clothes) {
          setWardrobe(data.clothes);
        }
      } catch (error) {
        console.error('Error fetching wardrobe:', error);
      }
    };

    fetchWardrobe();
  }, []);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          occasion,
          wardrobe: wardrobe, // Pass wardrobe items to AI
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestions');
      }

      const data = await response.json();
      
      // Map the AI suggestions to actual wardrobe items
      const mappedSuggestions = data.suggestions.map(suggestion => ({
        ...suggestion,
        items: suggestion.items.map(item => {
          const wardrobeItem = wardrobe.find(w => 
            w.category === item.category && 
            w.color === item.color
          );
          return wardrobeItem || item;
        })
      }));

      setSuggestions(mappedSuggestions);
      setWeather(data.weather);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setError(error.message || 'Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter city name"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Occasion
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Occasion</option>
              {occasions.map(occ => (
                <option key={occ} value={occ}>
                  {occ.charAt(0).toUpperCase() + occ.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button
        onClick={handleGetSuggestions}
        disabled={loading || !location || !occasion}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
      </button>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      {weather && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current Weather: {weather.temperature}°C, {weather.condition}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Outfit {index + 1}
            </h3>
            <div className="space-y-4">
              {suggestion.items && suggestion.items.map((item, i) => (
                <div key={i} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`${item.category} - ${item.color}`}
                        fill
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-500 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white capitalize">
                      {item.category}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {item.color}
                    </p>
                    {item.brand && (
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {item.brand}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {suggestion.reasoning && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-gray-600 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {suggestion.reasoning}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {suggestions.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-sm">
              No suggestions yet. Enter a location and occasion to get started.
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Generating suggestions...</p>
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestion;