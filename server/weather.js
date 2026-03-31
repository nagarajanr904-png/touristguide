const axios = require('axios');
require('dotenv').config();

// Fetch weather from weatherapi.com
async function getWeather(location) {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
        const { data } = await axios.get(url, { timeout: 4000 });
        // Example: { current: { condition: { text: "Partly cloudy" }, temp_c: 30 } }
        const condition = data.current.condition.text;
        const temp = data.current.temp_c;
        return `${condition} +${temp}°C`;
    } catch (err) {
        return null; // fallback will be handled by caller
    }
}

module.exports = { getWeather };
