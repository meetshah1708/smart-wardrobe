import { NextResponse } from 'next/server';
import connectDB from '@/app/utils/db';
import ClothingItem from '@/app/models/ClothingItem';
import { getOutfitSuggestions } from '@/app/services/aiService';
import { getWeather } from '@/app/services/weatherService';

export async function POST(req) {
  try {
    await connectDB();
    
    const { location, occasion } = await req.json();

    // Get weather data
    const weather = await getWeather(location);

    // Get all clothing items from database
    const items = await ClothingItem.find({});

    // Get AI suggestions with actual wardrobe items
    const suggestions = await getOutfitSuggestions(items, weather, occasion);

    return NextResponse.json({ 
      suggestions,
      weather
    });

  } catch (error) {
    console.error('Suggestions API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
} 