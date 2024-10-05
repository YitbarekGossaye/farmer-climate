import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather`, {
                    params: { latitude, longitude }
                });
                setWeatherData(response.data);
            } catch (error) {
                setError(error.response?.data?.error || 'Error fetching weather data');
            } finally {
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log(`User's Location - Latitude: ${latitude}, Longitude: ${longitude}`);
                        fetchWeatherData(latitude, longitude);
                    },
                    () => {
                        setError('Location access denied or unavailable.');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    const generateAdvice = (maxTemp, minTemp, precipitation) => {
        let adviceMessages = [];

        // Check for harsh conditions and generate advice
        if (precipitation > 50) { // Heavy rain
            adviceMessages.push("Expect heavy rain. Ensure proper drainage in your fields.");
        }
        if (maxTemp > 35) { // Extreme heat
            adviceMessages.push("High temperatures are expected. Consider providing shade for crops.");
        }
        if (minTemp < 0) { // Frost
            adviceMessages.push("Frost conditions are possible. Protect vulnerable plants.");
        }

        return adviceMessages.length > 0 ? adviceMessages.join(' ') : "The weather looks favorable.";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 font-semibold text-lg">{`Error: ${error}`}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">15-Day Weather Forecast</h2>
            {weatherData.length > 0 ? (
                <ul className="space-y-4">
                    {weatherData.map((day, index) => {
                        const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        // Generate advice specific to each day's weather
                        const dailyAdvice = generateAdvice(day.maxTemp, day.minTemp, day.precipitation);

                        return (
                            <li key={index} className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500">
                                <p className="font-semibold text-lg">{formattedDate}</p>
                                <p className="text-gray-700">Max Temp: <span className="font-bold">{day.maxTemp} °C</span></p>
                                <p className="text-gray-700">Min Temp: <span className="font-bold">{day.minTemp} °C</span></p>
                                <p className="text-gray-700">Description: {day.description}</p>
                                {day.precipitation && <p className="text-gray-700">Precipitation: {day.precipitation} mm</p>}
                                <div className="mt-2 p-2 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
                                    <h3 className="font-semibold">Advice for Farmers:</h3>
                                    <p>{dailyAdvice}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-center">No weather data available.</p>
            )}
        </div>
    );
};

export default Dashboard;
