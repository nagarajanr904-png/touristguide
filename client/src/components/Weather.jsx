import React, { useState } from 'react';
import axios from 'axios';
import { Search, CloudRain, Sun, Thermometer, Droplets, Wind, Loader2 } from 'lucide-react';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`http://localhost:5000/weather?location=${location}`);
            setWeather(res.data);
        } catch (err) {
            setError('Failed to fetch weather. Using fallback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-slate-800">Live Weather</h1>
                <p className="text-slate-600">Check the current conditions of your next destination.</p>
            </header>

            <form onSubmit={fetchWeather} className="bg-white p-4 rounded-full shadow-lg border border-slate-100 flex gap-2">
                <input 
                    type="text" 
                    placeholder="Enter city name..." 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="flex-grow bg-transparent px-6 py-2 focus:outline-none"
                />
                <button 
                    disabled={loading}
                    className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Search className="h-6 w-6" />}
                </button>
            </form>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {weather && (
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <CloudRain className="absolute -bottom-10 -right-10 opacity-10 h-64 w-64" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-3xl font-bold">{location || "Unknown"}</h3>
                                <p className="text-indigo-100 text-lg capitalize">{weather.condition}</p>
                            </div>
                            <div className="text-6xl font-black">{Math.round(weather.temperature)}°C</div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white border-opacity-20">
                            <div className="flex items-center gap-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                                    <Droplets className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-indigo-200 text-xs uppercase font-bold tracking-widest">Humidity</p>
                                    <p className="text-xl font-bold">{weather.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                                    <Wind className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-indigo-200 text-xs uppercase font-bold tracking-widest">Feels Like</p>
                                    <p className="text-xl font-bold">{Math.round(weather.temperature + 2)}°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
