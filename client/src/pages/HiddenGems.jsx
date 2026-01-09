import { useState, useEffect } from 'react';
import { fetchPlaces } from '../services/api';
import { MapPin, Search, Sparkles, Star, ChevronRight, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const HiddenGems = () => {
    const [gems, setGems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadGems();
    }, [searchTerm]);

    const loadGems = async () => {
        setLoading(true);
        try {
            const { data } = await fetchPlaces({
                isHiddenGem: true,
                name: searchTerm
            });
            setGems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            {/* Hero Section - Text Only */}
            <div className="relative rounded-[3rem] bg-emerald-950 overflow-hidden min-h-[350px] flex items-center px-12 border-4 border-emerald-900/50 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]"></div>

                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl border border-emerald-500/20">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secret Destinations</span>
                    </div>
                    <h1 className="text-6xl font-black text-white leading-tight tracking-tight">
                        Hidden <span className="text-emerald-400">Gems</span>
                    </h1>
                    <p className="text-lg text-emerald-100/70 font-medium leading-relaxed max-w-xl">
                        A curated collection of Tamil Nadu's most serene and untouched locations,
                        uncovered for travelers seeking peace over popularity.
                    </p>

                    <div className="relative max-w-md pt-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/50" size={20} />
                        <input
                            type="text"
                            placeholder="Find a secret spot..."
                            className="w-full pl-12 pr-6 py-4 bg-emerald-900/30 border border-emerald-700/50 rounded-2xl text-white placeholder-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 border-8 border-emerald-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <Gem size={120} className="text-emerald-500/20" />
                    </div>
                </div>
            </div>

            {/* Gems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse"></div>
                    ))
                ) : gems.length > 0 ? (
                    gems.map(gem => (
                        <Link
                            to={`/spots/${gem.id}`}
                            key={gem.id}
                            className="group block bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                        <Gem size={24} />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                                        <Star size={14} fill="currentColor" /> {gem.rating}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        <MapPin size={12} className="text-rose-500" /> {gem.city}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 leading-tight">
                                        {gem.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-4 leading-relaxed font-medium">
                                        {gem.gemini_explanation || gem.description}
                                    </p>
                                </div>

                                <div className="pt-4 flex items-center justify-between group-hover:translate-x-2 transition-transform">
                                    <div className="text-emerald-600 font-extrabold text-xs uppercase tracking-widest">
                                        Discover Secret
                                    </div>
                                    <ChevronRight size={20} className="text-emerald-600" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                        <div className="p-6 bg-white rounded-full inline-block shadow-sm mb-4">
                            <Search className="text-slate-300" size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">The secret is safe... for now</h3>
                        <p className="text-slate-500 mt-2">No hidden gems found matching your search. Try another query.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HiddenGems;
