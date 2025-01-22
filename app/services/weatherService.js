import axios from 'axios';

export async function getWeather(location) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const { main, weather } = response.data;
    
    return {
      temperature: Math.round(main.temp),
      condition: weather[0].main.toLowerCase(),
      description: weather[0].description
    };
  } catch (error) {
    console.error('Weather Service Error:', error);
    throw error;
  }
} 