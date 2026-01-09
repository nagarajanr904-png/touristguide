import { useState, useEffect } from 'react';
import { fetchPlaces } from '../services/api';
import MapComponent from '../components/MapComponent';
import { MapPin, Search, Filter, Star, Navigation, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const districts = [
    "Chennai", "Madurai", "Coimbatore", "Trichy", "Salem", "Erode",
    "Tirunelveli", "Thoothukudi", "Kanyakumari", "Thanjavur", "Dindigul",
    "Karur", "Namakkal", "Vellore", "Kanchipuram", "Tiruppur",
    "Villupuram", "Cuddalore", "Nagapattinam", "Ooty", "Kodaikanal",
    "Yercaud", "Rameswaram"
].sort();

const categories = [
    "Temples", "Historical Monuments", "Hill Stations", "Beaches",
    "Nature & Waterfalls", "Museums", "Wildlife & Sanctuaries", "Parks & Entertainment"
];

// City coordinate mapping for map centering
const cityCoordinates = {
    "Chennai": [13.0827, 80.2707],
    "Madurai": [9.9252, 78.1198],
    "Coimbatore": [11.0168, 76.9558],
    "Trichy": [10.7905, 78.7047],
    "Salem": [11.6643, 78.1460],
    "Ooty": [11.4102, 76.6950],
    "Kodaikanal": [10.2381, 77.4892],
    "Kanyakumari": [8.0883, 77.5385],
    "Thanjavur": [10.7870, 79.1378],
    "Rameswaram": [9.2876, 79.3129],
    "Vellore": [12.9165, 79.1325],
    "Kanchipuram": [12.8342, 79.7036]
};

const TouristSpots = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', category: '', name: '' });
    const [mapConfig, setMapConfig] = useState({ center: [11.1271, 78.6569], zoom: 7 });

    useEffect(() => {
        loadPlaces();
    }, [filters]);

    const loadPlaces = async () => {
        setLoading(true);
        try {
            const { data } = await fetchPlaces({
                city: filters.city,
                category: filters.category,
                name: filters.name,
                isHiddenGem: false
            });
            setPlaces(data);

            // Update map center if city is selected
            if (filters.city && cityCoordinates[filters.city]) {
                setMapConfig({ center: cityCoordinates[filters.city], zoom: 12 });
            } else if (!filters.city && !filters.name && !filters.category) {
                setMapConfig({ center: [11.1271, 78.6569], zoom: 7 });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <MapIcon className="text-indigo-600" size={36} />
                        Explore Tamil Nadu
                    </h1>
                    <p className="text-slate-500 font-medium">Discover temples, hill stations, and historical marvels.</p>
                </div>

                <div className="flex flex-wrap gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search spots..."
                            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64 font-medium"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                        <select
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-slate-700"
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                        >
                            <option value="">All Districts</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" size={18} />
                        <select
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-slate-700"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* List View */}
                <div className="lg:col-span-5 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 bg-slate-100 rounded-3xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : places.length > 0 ? (
                        places.map(place => (
                            <div key={place.id} className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${place.category === 'Temples' ? 'bg-indigo-50 text-indigo-600' :
                                                    place.category === 'Hill Stations' ? 'bg-emerald-50 text-emerald-600' :
                                                        'bg-rose-50 text-rose-600'
                                                }`}>
                                                {place.category}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                <MapPin size={10} /> {place.city}
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 px-2 py-0.5 rounded-lg text-[10px] font-black text-amber-500 shadow-sm flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> {place.rating}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors mb-3">
                                        {place.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium">
                                        {place.description}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <Link
                                        to={`/spots/${place.id}`}
                                        className="text-xs font-black text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        VIEW DETAILS <ChevronRight size={14} />
                                    </Link>
                                    <Navigation className="text-slate-200 group-hover:text-indigo-100 transition-colors" size={24} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-16 rounded-[3rem] border-2 border-dashed border-slate-100 text-center space-y-4">
                            <div className="p-6 bg-slate-50 rounded-full inline-block">
                                <Search className="text-slate-300" size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">No destinations found</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your filters or search query to find your next adventure.</p>
                        </div>
                    )}
                </div>

                {/* Map View */}
                <div className="lg:col-span-7 h-[600px] lg:h-[800px] lg:sticky lg:top-8">
                    <MapComponent
                        places={places}
                        center={mapConfig.center}
                        zoom={mapConfig.zoom}
                    />

                    {/* Legend */}
                    <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Map Legend</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {categories.slice(0, 4).map(c => (
                                <div key={c} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${c === 'Temples' ? 'bg-indigo-500' : 'bg-rose-500'}`}></div>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase">{c}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristSpots;
