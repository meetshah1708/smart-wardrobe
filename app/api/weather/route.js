// pages/api/weather.js
import axios from 'axios';

export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    res.status(200).json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}