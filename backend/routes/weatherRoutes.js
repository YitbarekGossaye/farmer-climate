const express = require('express');
const router = express.Router();
const { getWeatherByCoordinates } = require('../controllers/weatherController');

// Route to get weather data by latitude and longitude
router.get('/', getWeatherByCoordinates);

module.exports = router;
