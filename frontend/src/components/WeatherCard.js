import React from 'react';

const WeatherCard = ({ day }) => {
  return (
    <div className="weather-card">
      <h3>{day.datetime}</h3>
      <p>Temperature: {day.temp}°C</p>
      <p>Conditions: {day.conditions}</p>
    </div>
  );
};

export default WeatherCard;
