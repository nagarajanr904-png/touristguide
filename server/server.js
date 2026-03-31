const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY || process.env.OPENAI_API_KEY,
});

// --- STATIC FALLBACK DATA ---
const FALLBACK_PLAN = {
  itinerary: [
    { day: 1, activities: ["Arrive and check into hotel", "Walk around the city center", "Dinner at a local restaurant"] },
    { day: 2, activities: ["Visit the main museum", "Lunch at the park", "Explore the shopping district"] },
    { day: 3, activities: ["Day trip to nearby hills", "Scenic view for sunset", "Farewell dinner"] }
  ]
};

const FALLBACK_WEATHER = {
  temperature: 22,
  condition: "Partly Cloudy",
  humidity: 60
};

const FALLBACK_GEMS = [
  { name: "Hidden Garden", type: "park" },
  { name: "Old Library", type: "viewpoint" }
];

const FALLBACK_EXPLORE = []; // Start empty to avoid "Foreign Country" confusion

const STATIC_TRANSPORT = {
  buses: [
    { route: "101 - City Center", time: "Every 15 mins" },
    { route: "202 - Airport Express", time: "Hourly" }
  ],
  trains: [
    { name: "Central Line", time: "Runs 24/7" },
    { name: "South Rail", time: "Every 30 mins" }
  ]
};

// --- HELPERS ---
const getGeocode = async (location) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'TouristGD-AI-App' } });
    if (res.data.length > 0) {
      const p = res.data[0];
      console.log(`Geocoded "${location}" to ${p.display_name} (${p.lat}, ${p.lon})`);
      let areaId = null;
      if (p.osm_type === 'relation') areaId = parseInt(p.osm_id) + 3600000000;
      else if (p.osm_type === 'way') areaId = parseInt(p.osm_id) + 2400000000;
      
      return { lat: parseFloat(p.lat), lon: parseFloat(p.lon), areaId };
    } else {
      console.warn(`No geocoding results for: "${location}"`);
    }
  } catch (e) { console.error("Geocode Error:", e.message); }
  return null;
};

// --- ENDPOINTS ---

// 1. AI TRIP PLANNER
app.post('/plan', async (req, res) => {
  const { location, days, budget, language } = req.body;
  if (!location || !days) return res.status(400).json({ error: "Missing location or days" });

  try {
    // Fetch Current Weather for Context
    let weatherContext = "Unknown";
    try {
      const weatherApiKey = process.env.WEATHER_API_KEY;
      const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`;
      const weatherRes = await axios.get(weatherUrl);
      const w = weatherRes.data.current;
      weatherContext = `${w.temp_c}°C, ${w.condition.text}, Humidity: ${w.humidity}%`;
    } catch (e) {
      console.error("Weather Context Error:", e.message);
    }

    const foodSafetyGuidelines = `
      - Safe: Peeled fruits, boiled water, hot cooked food, packaged snacks.
      - Avoid: Tap water, raw meat, ice cubes, street salads.
    `;

    const prompt = `Create a professional day-wise itinerary for a ${days}-day trip to ${location}. 
    User Preferences:
    - Budget: ${budget || 'standard'}
    - Language: ${language || 'English'}
    - Current Weather: ${weatherContext}

    Please suggest activities suitable for this weather and budget. 
    Incorporate food safety tips based on these: ${foodSafetyGuidelines}.
    
    IMPORTANT: The entire response MUST be in ${language || 'English'}.
    
    Format the output as a JSON object with:
    1. 'itinerary': array of { day (number), activities (array of strings) }
    2. 'weatherSummary': A short sentence about the current weather impact.
    3. 'foodSafetyTips': Specific tips for this location.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for better availability/cost
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    console.error("CRITICAL ERROR IN /PLAN:", error.message);
    if (error.response) {
        console.error("OpenAI Response Error:", error.response.data);
    }

    // Try to fetch real weather even on AI failure
    let fallbackWeather = "Weather data unavailable";
    try {
      const weatherApiKey = process.env.WEATHER_API_KEY;
      const wRes = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`);
      fallbackWeather = `Currently in ${location}: ${wRes.data.current.temp_c}°C, ${wRes.data.current.condition.text}.`;
    } catch (e) {
      console.error("Fallback Weather Error:", e.message);
    }

    res.json({
        ...FALLBACK_PLAN,
        weatherSummary: fallbackWeather,
        foodSafetyTips: ["Stick to bottled water", "Eat at busy local spots"]
    });
  }
});

// 2. WEATHER FEATURE
app.get('/weather', async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "Missing location" });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const response = await axios.get(url);
    const data = response.data.current;
    res.json({
      temperature: data.temp_c,
      condition: data.condition.text,
      humidity: data.humidity
    });
  } catch (error) {
    console.error("Weather Error:", error.message);
    res.json(FALLBACK_WEATHER);
  }
});

// 3. HIDDEN GEMS
app.get('/hidden-gems', async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "Missing location" });

  try {
    const geo = await getGeocode(location);
    if (!geo) return res.json(FALLBACK_GEMS);

    let overpassQuery = "";
    if (geo.areaId) {
      overpassQuery = `[out:json][timeout:25]; area(${geo.areaId})->.search; (node["tourism"="viewpoint"](area.search); node["leisure"="park"](area.search); node["natural"](area.search); node["historic"](area.search);); out body;`;
    } else {
      overpassQuery = `[out:json][timeout:25]; (node["tourism"="viewpoint"](around:10000, ${geo.lat}, ${geo.lon}); node["leisure"="park"](around:10000, ${geo.lat}, ${geo.lon}); node["natural"](around:10000, ${geo.lat}, ${geo.lon}); node["historic"](around:10000, ${geo.lat}, ${geo.lon});); out body;`;
    }

    const response = await axios.post(`https://overpass-api.de/api/interpreter`, `data=${encodeURIComponent(overpassQuery)}`);
    const elements = response.data.elements.slice(0, 15).map(el => ({
      name: el.tags.name || "Unnamed Gem",
      type: el.tags.tourism || el.tags.leisure || el.tags.natural || el.tags.historic || "Hidden spot"
    }));
    res.json(elements.length > 0 ? elements : FALLBACK_GEMS);
  } catch (error) {
    console.error("Hidden Gems Error:", error.message);
    res.json(FALLBACK_GEMS);
  }
});

// 4. EXPLORE
app.get('/explore', async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "Missing location" });

  try {
    const geo = await getGeocode(location);
    if (!geo) return res.json(FALLBACK_EXPLORE);

    let overpassQuery = "";
    if (geo.areaId) {
      overpassQuery = `[out:json][timeout:25]; area(${geo.areaId})->.search; (node["tourism"="attraction"](area.search); node["tourism"="museum"](area.search); node["historic"="monument"](area.search); node["heritage"](area.search); node["amenity"="place_of_worship"](area.search);); out body;`;
    } else {
      overpassQuery = `[out:json][timeout:25]; (node["tourism"="attraction"](around:15000, ${geo.lat}, ${geo.lon}); node["tourism"="museum"](around:15000, ${geo.lat}, ${geo.lon}); node["historic"="monument"](around:15000, ${geo.lat}, ${geo.lon}); node["heritage"](around:15000, ${geo.lat}, ${geo.lon}); node["amenity"="place_of_worship"](around:15000, ${geo.lat}, ${geo.lon});); out body;`;
    }

    const response = await axios.post(`https://overpass-api.de/api/interpreter`, `data=${encodeURIComponent(overpassQuery)}`);
    const elements = response.data.elements.slice(0, 20).map(el => ({
      name: el.tags.name || "Famous Attraction",
      lat: el.lat,
      lon: el.lon,
      center: geo // Pass the central city coords too
    }));
    
    // If no results, still return the city center so map can center
    if (elements.length === 0) {
        return res.json([{ name: "City Center", lat: geo.lat, lon: geo.lon, isCenter: true }]);
    }
    
    res.json(elements);
  } catch (error) {
    console.error("Explore Error:", error.message);
    res.json(FALLBACK_EXPLORE);
  }
});

// 5. TRANSPORT
app.get('/transport', (req, res) => {
  res.json(STATIC_TRANSPORT);
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Tourist Guide API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
