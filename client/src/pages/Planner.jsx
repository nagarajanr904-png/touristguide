import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/api';

const Planner = () => {
    const [tripDetails, setTripDetails] = useState({
        destination: '',
        duration: 3,
        budget: 'moderate',
        travelers: 2,
        interests: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPlan(null);

        try {
            const response = await chatWithAI({ tripDetails });
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g., Paris, Tokyo, Madurai"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={tripDetails.destination}
                                    onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Duration (Days)</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={tripDetails.duration}
                                        onChange={(e) => setTripDetails({ ...tripDetails, duration: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Travelers</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={tripDetails.travelers}
                                        onChange={(e) => setTripDetails({ ...tripDetails, travelers: e.target.value })}
                                    />
                                </div>
                            </div>
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
                            <div className="border-b border-slate-200 pb-4">
                                <h2 className="text-2xl font-bold text-slate-800">{plan.title}</h2>
                                <p className="text-slate-600 mt-2">{plan.summary}</p>
                            </div>
                            <div className="space-y-4">
                                {plan.days && plan.days.map((day) => (
                                    <div key={day.day} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                        <h3 className="font-bold text-indigo-600 mb-2">Day {day.day}</h3>
                                        <ul className="space-y-1">
                                            {day.activities.map((act, i) => (
                                                <li key={i} className="text-slate-700 text-sm flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> {act}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
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
