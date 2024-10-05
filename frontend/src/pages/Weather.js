import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';

const Weather = () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(`/api/weather/${latitude}/${longitude}`, { headers });
            setWeather(response.data.days);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h2>Weather Forecast</h2>
      {weather.length > 0 ? (
        weather.map((day, index) => (
          <WeatherCard key={index} day={day} />
        ))
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
