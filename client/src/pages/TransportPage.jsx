import { useState, useEffect } from 'react';
import { fetchBuses, fetchTrains } from '../services/api';
import { Bus, Train, Search, MapPin, Clock, ArrowLeft, Info } from 'lucide-react';

const cities = [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Erode",
    "Tirunelveli", "Thoothukudi", "Kanyakumari", "Thanjavur",
    "Vellore", "Kanchipuram", "Dindigul", "Karur", "Namakkal",
    "Tiruppur", "Cuddalore", "Villupuram", "Nagapattinam"
].sort();

const TransportPage = () => {
    const [view, setView] = useState('selection'); // 'selection', 'bus', 'train'
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ from: '', to: '' });

    useEffect(() => {
        if (view !== 'selection') {
            handleSearch();
        } else {
            setRoutes([]);
            setFilters({ from: '', to: '' });
        }
    }, [view]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const fetchFn = view === 'bus' ? fetchBuses : fetchTrains;
            const { data } = await fetchFn(filters);
            setRoutes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getBgImage = () => {
        if (view === 'bus') return 'url(/assets/bus_bg.png)';
        if (view === 'train') return 'url(/assets/train_bg.png)';
        return 'url(/assets/travel_bg.png)';
    };

    return (
        <div
            className="min-h-screen -mt-8 pt-8 px-4 pb-12 transition-all duration-700 bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: getBgImage() }}
        >
            {/* Soft Overlay Layer */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10 space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-4 py-8">
                    {view !== 'selection' && (
                        <button
                            onClick={() => setView('selection')}
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mx-auto mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md"
                        >
                            <ArrowLeft size={16} /> Back to Transport Modes
                        </button>
                    )}
                    <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-2xl">
                        {view === 'selection' ? 'Transport Guide' : view === 'bus' ? 'Bus Route Guidance' : 'Train Route Guidance'}
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg font-medium drop-shadow-lg">
                        {view === 'selection'
                            ? 'Discover reliable ways to navigate across Tamil Nadu with our comprehensive transport database.'
                            : `Exploring all available ${view} connections for your upcoming journey.`}
                    </p>
                </div>

                {view === 'selection' ? (
                    /* Initial Selection View */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4 pb-20">
                        <button
                            onClick={() => setView('bus')}
                            className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 text-left"
                        >
                            <img src="/assets/bus_bg.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Bus" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-10">
                                <div className="bg-indigo-600 p-4 rounded-2xl inline-block mb-4 shadow-xl">
                                    <Bus className="text-white" size={32} />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">Bus Routes</h2>
                                <p className="text-white/70 text-lg">Explore TNSTC, SETC and Private bus timings.</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setView('train')}
                            className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 text-left"
                        >
                            <img src="/assets/train_bg.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Train" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-10">
                                <div className="bg-indigo-600 p-4 rounded-2xl inline-block mb-4 shadow-xl">
                                    <Train className="text-white" size={32} />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">Train Routes</h2>
                                <p className="text-white/70 text-lg">Find express railway connections and schedules.</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    /* Search & Results View */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                        {/* Search Bar */}
                        <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/20">
                            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Travel Origin</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
                                        <select
                                            value={filters.from}
                                            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer font-bold text-slate-800"
                                        >
                                            <option value="">Any Origin</option>
                                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={20} />
                                        <select
                                            value={filters.to}
                                            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer font-bold text-slate-800"
                                        >
                                            <option value="">Any Destination</option>
                                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl uppercase tracking-widest text-sm"
                                >
                                    <Search size={22} /> Update Results
                                </button>
                            </form>
                        </div>

                        {/* Guidance Note */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] flex items-start md:items-center gap-4 text-white shadow-2xl">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Info className="text-white" size={24} />
                            </div>
                            <p className="text-sm font-bold tracking-wide">
                                <span className="text-indigo-300">NOTE:</span> This information is for travel guidance only. Booking is not supported through this platform. Please contact official providers for tickets.
                            </p>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {loading ? (
                                <div className="col-span-full py-24 text-center">
                                    <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
                                    <p className="text-white font-black text-2xl tracking-[0.3em] uppercase opacity-80">Fetching Guidance</p>
                                </div>
                            ) : routes.length > 0 ? (
                                routes.map((route, idx) => (
                                    <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/20 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${route.bus_type === 'Govt' || view === 'train' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                                                        {view === 'bus' ? `${route.bus_type} SECTOR` : 'EXPRESS RAIL'}
                                                    </span>
                                                    <span className="text-slate-300 font-bold"># {view === 'bus' ? route.route_id : route.train_id}</span>
                                                </div>
                                                <h3 className="text-3xl font-black text-slate-900 mt-4 leading-tight">
                                                    {view === 'bus' ? `${route.from_city} → ${route.to_city}` : route.train_name}
                                                </h3>
                                            </div>
                                            <div className="bg-slate-50 p-5 rounded-3xl group-hover:bg-indigo-50 transition-colors">
                                                {view === 'bus' ? <Bus className="text-slate-400 group-hover:text-indigo-500" size={28} /> : <Train className="text-slate-400 group-hover:text-indigo-500" size={28} />}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 py-10 px-8 bg-slate-50 rounded-[2rem] relative z-10">
                                            <div className="text-center flex-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Departure</p>
                                                <p className="text-3xl font-black text-slate-900">{route.departure_time}</p>
                                                <p className="text-xs font-bold text-indigo-500 mt-2 truncate w-24 mx-auto">
                                                    {view === 'bus' ? route.from_city : route.from_station}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-center gap-3 flex-1">
                                                <span className="text-[10px] font-black text-indigo-400 bg-white px-3 py-1 rounded-full shadow-sm">{route.duration}</span>
                                                <div className="w-full flex items-center gap-2">
                                                    <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                                                    <div className="w-3 h-3 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></div>
                                                    <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-300 tracking-widest">DIRECT</span>
                                            </div>

                                            <div className="text-center flex-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Arrival</p>
                                                <p className="text-3xl font-black text-slate-900">{route.arrival_time}</p>
                                                <p className="text-xs font-bold text-rose-500 mt-2 truncate w-24 mx-auto">
                                                    {view === 'bus' ? route.to_city : route.to_station}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={16} />
                                                <span className="text-xs font-bold uppercase tracking-widest">Daily Service Schedule</span>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guidance Only</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 bg-white/5 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-white/20 text-center">
                                    <Search className="mx-auto text-white/20 mb-6" size={80} />
                                    <h3 className="text-3xl font-black text-white uppercase tracking-widest opacity-80">No Results Found</h3>
                                    <p className="text-white/40 font-bold mt-4">Try adjusting your origin or destination filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransportPage;
