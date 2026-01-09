import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlaceById } from '../services/api';
import MapComponent from '../components/MapComponent';
import {
    MapPin, Clock, Info, ArrowLeft, Star,
    Calendar, CheckCircle2, Sparkles, Navigation
} from 'lucide-react';

const SpotDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPlaceDetails();
    }, [id]);

    const loadPlaceDetails = async () => {
        try {
            const { data } = await fetchPlaceById(id);
            setPlace(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!place) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-800">Place not found</h2>
            <button
                onClick={() => navigate('/spots')}
                className="mt-4 text-indigo-600 font-bold flex items-center gap-2 mx-auto"
            >
                <ArrowLeft size={18} /> Back to Spots
            </button>
        </div>
    );

    const tips = place.travel_tips ? place.travel_tips.split(';').map(t => t.trim()) : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-700">
            {/* Header & Back Button */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/spots')}
                    className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span>Back to Explore</span>
                </button>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl">
                    <Star className="text-indigo-600" size={18} fill="currentColor" />
                    <span className="font-black text-indigo-900">{place.rating} / 5.0</span>
                </div>
            </div>

            {/* Main Hero Section - Text Focused */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {place.category}
                            </span>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center text-slate-500 gap-1 text-[10px] font-black uppercase tracking-[0.2em]">
                                <MapPin size={12} className="text-rose-500" /> {place.city}
                            </div>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            {place.name}
                        </h1>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-xl text-slate-600 leading-relaxed font-medium first-letter:text-5xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
                            {place.description}
                        </p>
                    </div>

                    {place.gemini_explanation && (
                        <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 space-y-4">
                            <h4 className="text-sm font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={16} /> Why it's special
                            </h4>
                            <p className="text-amber-900 font-medium leading-relaxed italic">
                                "{place.gemini_explanation}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Info Cards Column */}
                <div className="space-y-8">
                    {/* Gemini AI Powered Tips */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <Sparkles className="absolute -top-4 -right-4 text-white/10" size={120} />

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                    <Clock size={20} />
                                </div>
                                <h3 className="text-xl font-bold">Best Time to Visit</h3>
                            </div>
                            <p className="text-indigo-50 font-medium leading-relaxed">
                                {place.best_time || "Fetching recommendations..."}
                            </p>

                            <hr className="border-white/10" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                        <Info size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold">Traveler Insights</h3>
                                </div>
                                <div className="space-y-3">
                                    {tips.length > 0 ? tips.map((tip, idx) => (
                                        <div key={idx} className="flex gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                                            <CheckCircle2 size={18} className="text-indigo-300 shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium">{tip}</span>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-indigo-200">Generating local insights for your trip...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location & Map Preview */}
                    <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 pb-2">
                            <div className="mb-4">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    <Navigation className="text-rose-500" size={20} />
                                    Exact Location
                                </h3>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <MapComponent
                                places={[place]}
                                center={[place.latitude, place.longitude]}
                                zoom={15}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotDetails;
