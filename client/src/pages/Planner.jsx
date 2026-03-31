import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Sparkles } from 'lucide-react';
import { planTrip } from '../services/api';

const Planner = () => {
    const [tripDetails, setTripDetails] = useState({
        location: '',
        mood: '',
        time: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPlan(null);
        try {
            const response = await planTrip(tripDetails);
            setPlan(response.data);
        } catch (error) {
            console.error("Planning failed", error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || "Failed to generate plan. Please try again.";
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                    AI Trip <span className="text-indigo-600">Planner</span>
                </h1>
                <p className="text-slate-600 text-lg">Tell us where you want to go, and let Gemini craft the perfect itinerary.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Planning Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g., Paris, Tokyo, Madurai"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={tripDetails.location}
                                    onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Mood</label>
                            <input
                                type="text"
                                placeholder="e.g., relax, adventure, spiritual"
                                required
                                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={tripDetails.mood}
                                onChange={(e) => setTripDetails({ ...tripDetails, mood: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Time (e.g., 1 day, afternoon, 3 hours)</label>
                            <input
                                type="text"
                                placeholder="e.g., 1 day, afternoon, 3 hours"
                                required
                                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={tripDetails.time}
                                onChange={(e) => setTripDetails({ ...tripDetails, time: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['budget', 'moderate', 'luxury'].map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        onClick={() => setTripDetails({ ...tripDetails, budget: b })}
                                        className={`py-2 px-4 rounded-lg text-sm font-medium capitalize transition ${tripDetails.budget === b ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button disabled={isLoading} type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex justify-center items-center gap-2">
                            {isLoading ? 'Generating Plan...' : <><Sparkles className="w-5 h-5" /> Generate Itinerary</>}
                        </button>
                    </form>
                </div>

                {/* Results Preview */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 min-h-[400px]">
                    {plan ? (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your AI Travel Plan</h2>
                            <div>
                                <h3 className="font-bold text-indigo-600">Places to Visit</h3>
                                <ul className="list-disc ml-6">
                                    {plan.placesToVisit && plan.placesToVisit.map((p, i) => (
                                        <li key={i}><span className="font-semibold">{p.name}:</span> {p.description}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-600">Hidden Gems</h3>
                                <ul className="list-disc ml-6">
                                    {plan.hiddenGems && plan.hiddenGems.map((p, i) => (
                                        <li key={i}><span className="font-semibold">{p.name}:</span> {p.description}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-600">Food Suggestions</h3>
                                <ul className="list-disc ml-6">
                                    {plan.foodSuggestions && plan.foodSuggestions.map((f, i) => (
                                        <li key={i}><span className="font-semibold">{f.name}:</span> {f.type}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-600">Travel Tips</h3>
                                <ul className="list-disc ml-6">
                                    {plan.travelTips && plan.travelTips.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                            <MapPin className="w-16 h-16 opacity-20" />
                            <p>Your AI-generated itinerary will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Planner;
