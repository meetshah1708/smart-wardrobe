// components/CalendarPlanner.js
'use client'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarPlanner = () => {
  const [date, setDate] = useState(new Date());
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [outfits, setOutfits] = useState({});

  const handleDateChange = (date) => {
    setDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedOutfit(outfits[formattedDate] || null);
  };

  const handleOutfitSelect = async (outfit) => {
    const formattedDate = date.toISOString().split('T')[0];
    try {
      await axios.post('/api/plan', {
        date: formattedDate,
        outfit,
      });
      setOutfits({ ...outfits, [formattedDate]: outfit });
    } catch (error) {
      console.error('Error planning outfit', error);
    }
  };

  return (
    <div>
      <h2>Plan Your Outfits</h2>
      <Calendar onChange={handleDateChange} value={date} />
      {selectedOutfit && (
        <div className="mt-4">
          <h3>Planned Outfit for {date.toDateString()}</h3>
          <img src={selectedOutfit.top.image} alt="Top" className="w-32 h-32 object-cover" />
          <img src={selectedOutfit.bottom.image} alt="Bottom" className="w-32 h-32 object-cover" />
          <img src={selectedOutfit.shoe.image} alt="Shoes" className="w-32 h-32 object-cover" />
        </div>
      )}
      {/* Integrate OutfitSuggestion component or list to select from */}
    </div>
  );
};

export default CalendarPlanner;