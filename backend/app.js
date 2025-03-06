// app.js - Main application file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

// Import routes
const todoRoutes = require('./routes/todos');
const noteRoutes = require('./routes/notes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://database:27017/dashboard-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/notes', noteRoutes);

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    // First, we need to get the coordinates from the location name
    // This is a simplified version - in a real app, you would use a geocoding service
    // For this example, we'll assume that the user provides the location in a format we can use
    
    // For the weather.gov API, we need latitude and longitude
    // For this simplified version, we'll use a fictional mapping
    // In a real app, you would use a geocoding service like Nominatim or Google Maps
    
    // Simulate location coordinates lookup for demo purposes
    const coordinates = getCoordinatesFromLocation(location);
    
    // Call the weather.gov API
    const gridpointResponse = await axios.get(`https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`);
    const forecastUrl = gridpointResponse.data.properties.forecast;
    
    const forecastResponse = await axios.get(forecastUrl);
    const currentPeriod = forecastResponse.data.properties.periods[0];
    
    // Extract and format the needed weather information
    const weatherData = {
      temperature: currentPeriod.temperature,
      forecast: currentPeriod.shortForecast,
      humidity: getRandomHumidity(), // Weather.gov API doesn't provide humidity directly in this endpoint
      windSpeed: currentPeriod.windSpeed.split(' ')[0], // Extract just the number
      windDirection: currentPeriod.windDirection
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ 
      message: 'Error fetching weather data', 
      error: error.message,
      note: 'You might need to provide a valid US location as the weather.gov API only covers US territories'
    });
  }
});

// Mock function to simulate geocoding
function getCoordinatesFromLocation(location) {
  // In a real app, you would call a geocoding service here
  // This is just a simplified demo mapping
  const locationMap = {
    'new york': { latitude: 40.7128, longitude: -74.0060 },
    'los angeles': { latitude: 34.0522, longitude: -118.2437 },
    'chicago': { latitude: 41.8781, longitude: -87.6298 },
    'houston': { latitude: 29.7604, longitude: -95.3698 },
    'phoenix': { latitude: 33.4484, longitude: -112.0740 },
    'philadelphia': { latitude: 39.9526, longitude: -75.1652 },
    'san antonio': { latitude: 29.4241, longitude: -98.4936 },
    'san diego': { latitude: 32.7157, longitude: -117.1611 },
    'dallas': { latitude: 32.7767, longitude: -96.7970 },
    'san francisco': { latitude: 37.7749, longitude: -122.4194 }
  };
  
  const normalizedLocation = location.toLowerCase();
  
  if (locationMap[normalizedLocation]) {
    return locationMap[normalizedLocation];
  } else {
    // Default to New York if location not found
    return { latitude: 40.7128, longitude: -74.0060 };
  }
}

// Helper function for random humidity since weather.gov API doesn't provide it directly
function getRandomHumidity() {
  return Math.floor(Math.random() * 40) + 40; // Random between 40-80%
}

// Serve the frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
