const axios = require('axios');

// Weatherbit API Key
const apiKey = '702efa23d4f14999aa5a48c041ef0066';

// Controller function to fetch 15-day weather data by coordinates (latitude and longitude)
const getWeatherByCoordinates = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }

    try {
        // Weatherbit API URL for daily forecast
        const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKey}&days=15`;

        const response = await axios.get(weatherUrl);
        const weatherData = response.data;

        // Format the response as needed
        const weatherDetails = weatherData.data.map(day => ({
            date: day.valid_date,
            maxTemp: day.max_temp,
            minTemp: day.min_temp,
            description: day.weather.description,
        }));

        res.json(weatherDetails);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};

module.exports = { getWeatherByCoordinates };
