import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, Cloud, ShieldAlert, Calendar, Banknote, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TripPlanner = () => {
    const [location, setLocation] = useState('');
    const [days, setDays] = useState('');
    const [budget, setBudget] = useState('standard');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { language, t } = useLanguage();

    const handlePlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/plan', { 
                location, 
                days, 
                budget,
                language 
            });
            setResult(res.data);
        } catch (err) {
            setError('Failed to fetch plan. Using fallback.');
        } finally {
            setLoading(false);
        }
    };

    const budgetOptions = [
        { id: 'economy', label: t('economy'), icon: '🪙' },
        { id: 'standard', label: t('standard'), icon: '💳' },
        { id: 'luxury', label: t('luxury'), icon: '💎' },
    ];

    return (
        <div className="max-w-5xl mx-auto px-6 space-y-12">
            <header className="text-center space-y-4">
                <h1 className="text-6xl font-black text-slate-800 tracking-tight">{t('plan_trip')}</h1>
                <p className="text-xl text-slate-500 font-medium">{t('tagline')}</p>
            </header>

            <form onSubmit={handlePlan} className="glass rounded-[3rem] p-4 lg:p-6 space-y-8 shadow-2xl border-white/40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-center">
                    {/* Location */}
                    <div className="lg:col-span-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex items-center gap-3">
                        <Globe className="text-indigo-500 h-6 w-6" />
                        <input 
                            type="text" 
                            placeholder={t('search_placeholder')}
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="bg-transparent outline-none w-full font-bold text-slate-700 placeholder:text-slate-300"
                        />
                    </div>
                    {/* Days */}
                    <div className="lg:col-span-2 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex items-center gap-3">
                        <Calendar className="text-indigo-500 h-6 w-6" />
                        <input 
                            type="number" 
                            placeholder={t('days_placeholder')}
                            value={days} 
                            onChange={(e) => setDays(e.target.value)}
                            required
                            min="1"
                            max="14"
                            className="bg-transparent outline-none w-full font-bold text-slate-700 placeholder:text-slate-300"
                        />
                    </div>
                    {/* Budget Selector */}
                    <div className="lg:col-span-4 flex items-center bg-slate-50/10 p-2 rounded-[1.75rem] border border-slate-100/50 backdrop-blur-sm">
                        {budgetOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setBudget(opt.id)}
                                className={`flex-grow py-3 px-1 rounded-2xl text-[10px] sm:text-xs font-black transition-all duration-300 flex items-center justify-center gap-1.5 ${
                                    budget === opt.id 
                                    ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 ring-1 ring-slate-200/50' 
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
                                }`}
                            >
                                <span className="text-base sm:text-sm">{opt.icon}</span>
                                <span className="uppercase tracking-tighter sm:tracking-widest">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                    {/* Submit */}
                    <div className="lg:col-span-2">
                        <button 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4.5 rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:from-indigo-700 hover:to-indigo-600 transition-all duration-500 flex items-center justify-center gap-2 shadow-2xl shadow-indigo-500/20 group"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4 group-hover:rotate-12 transition-transform shadow-white" />}
                            <span>{loading ? '' : t('generate_btn')}</span>
                        </button>
                    </div>
                </div>
            </form>

            {error && (
                <div className="bg-rose-50 text-rose-600 p-6 rounded-3xl border border-rose-100 text-center font-bold animate-in fade-in zoom-in">
                    {error}
                </div>
            )}

            {result && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    {/* Context Context */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {result.weatherSummary && (
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20 flex items-start gap-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                    <Cloud className="h-32 w-32" />
                                </div>
                                <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                                    <Cloud className="h-8 w-8" />
                                </div>
                                <div className="space-y-2 relative">
                                    <h4 className="text-xl font-black uppercase tracking-widest opacity-80">{t('weather_title')}</h4>
                                    <p className="text-lg font-bold leading-relaxed">{result.weatherSummary}</p>
                                </div>
                            </div>
                        )}
                        {result.foodSafetyTips && (
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-500/20 flex items-start gap-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                    <ShieldAlert className="h-32 w-32" />
                                </div>
                                <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                                    <ShieldAlert className="h-8 w-8" />
                                </div>
                                <div className="space-y-2 relative">
                                    <h4 className="text-xl font-black uppercase tracking-widest opacity-80">{t('safety_title')}</h4>
                                    <ul className="text-lg font-bold leading-relaxed space-y-1">
                                        {result.foodSafetyTips.map((tip, i) => <li key={i} className="flex gap-2">• {tip}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Itinerary */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-4xl font-black text-slate-800 flex items-center gap-4">
                                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                                    <Calendar className="h-8 w-8" />
                                </div>
                                {t('itinerary_title')}
                            </h2>
                            {budget && (
                                <div className="bg-slate-100 px-6 py-2 rounded-full flex items-center gap-2 font-black text-slate-600 border border-slate-200">
                                    <Banknote className="h-5 w-5 text-indigo-500" />
                                    <span className="uppercase text-xs tracking-widest">{budget}</span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {result.itinerary.map((dayPlan, idx) => (
                                <div key={idx} className="group glass rounded-[3rem] overflow-hidden transition-all hover:bg-white hover:shadow-indigo-500/10">
                                    <div className="bg-slate-900 text-white p-6 flex justify-between items-center group-hover:bg-indigo-600 transition-colors duration-500">
                                        <h3 className="text-2xl font-black flex items-center gap-3">
                                            <span className="bg-white/20 px-4 py-1 rounded-2xl text-sm">DAY</span>
                                            {dayPlan.day}
                                        </h3>
                                    </div>
                                    <div className="p-8">
                                        <ul className="space-y-6">
                                            {dayPlan.activities.map((act, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500 outline outline-4 outline-indigo-50 ring-2 ring-indigo-50 group-hover:scale-125 transition-transform" />
                                                    <span className="text-lg font-semibold text-slate-700 leading-snug">{act}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPlanner;
