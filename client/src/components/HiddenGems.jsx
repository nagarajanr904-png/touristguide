import React, { useState } from 'react';
import axios from 'axios';
import { Gem, MapPin, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HiddenGems = () => {
    const [location, setLocation] = useState('');
    const [gems, setGems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { t } = useLanguage();

    const fetchGems = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`http://localhost:5000/hidden-gems?location=${location}`);
            setGems(res.data);
        } catch (err) {
            setError('Failed to fetch. Showing fallback gems.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 space-y-12">
            <header className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-4">
                    <Sparkles className="text-amber-500 h-10 w-10 animate-pulse" />
                    {t('hidden_gems')}
                </h1>
                <p className="text-lg text-slate-500 font-medium">Off-the-beaten-path locations you must visit.</p>
            </header>

            <form onSubmit={fetchGems} className="max-w-2xl mx-auto flex gap-3 p-2 bg-white rounded-[2rem] shadow-2xl border border-slate-100">
                <div className="flex-grow flex items-center px-4 gap-3">
                    <MapPin className="text-slate-400 h-5 w-5" />
                    <input 
                        type="text" 
                        placeholder={t('search_placeholder')}
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full py-4 bg-transparent outline-none font-medium text-slate-600"
                    />
                </div>
                <button disabled={loading} className="bg-amber-500 text-white px-8 rounded-2xl hover:bg-amber-600 transition flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20">
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Gem className="h-5 w-5" />}
                    <span>{loading ? '' : t('find_gems')}</span>
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gems.map((gem, idx) => (
                    <div key={idx} className="group glass rounded-[2.5rem] p-8 border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/10">
                        <div className="flex items-start gap-6">
                            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-[1.5rem] shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                                <Gem className="h-6 w-6" />
                            </div>
                            <div className="flex-grow space-y-2">
                                <h3 className="text-xl font-black text-slate-800 leading-tight">{gem.name}</h3>
                                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    {gem.type}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('discovered')}</span>
                            <button className="text-emerald-600 font-black text-sm hover:underline flex items-center gap-2 group/btn">
                                <MapPin className="h-4 w-4 group-hover/btn:animate-bounce" /> {t('view_map')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HiddenGems;
