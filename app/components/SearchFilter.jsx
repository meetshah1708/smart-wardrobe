// components/SearchFilter.js
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');

  const handleSearch = async () => {
    onFilter({ category, color });
  };

  return (
    <div className="space-x-2">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
        <option value="accessories">Accessories</option>
      </select>
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;