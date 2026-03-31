import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';
import { Search, MapPin, Loader2, Navigation2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Routing Control Component
const Routing = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !start || !end) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lon),
                L.latLng(end.lat, end.lon)
            ],
            lineOptions: {
                styles: [{ color: '#6366f1', weight: 6, opacity: 0.8 }]
            },
            createMarker: () => null,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: false 
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, start, end]);

    return null;
};

// Helper component to handle map movement
function ChangeView({ center }) {
  const map = useMap();
  map.flyTo(center, 13, { duration: 1.5 });
  return null;
}

const ExploreMap = () => {
    const [location, setLocation] = useState('');
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState([51.505, -0.09]);
    const [userLoc, setUserLoc] = useState(null);
    const [targetLoc, setTargetLoc] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => console.log("User denied geolocation")
        );
    }, []);

    const fetchPlaces = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTargetLoc(null); // Reset route
        try {
            const res = await axios.get(`http://localhost:5000/explore?location=${location}`);
            setPlaces(res.data);
            if (res.data.length > 0) {
                setCenter([res.data[0].lat, res.data[0].lon]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-12">
            <header className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-800 tracking-tight">{t('famous_spots')}</h1>
                <p className="text-lg text-slate-500 font-medium">{t('famous_tagline')}</p>
            </header>

            <form onSubmit={fetchPlaces} className="max-w-2xl mx-auto flex gap-3 p-2 bg-white rounded-[2rem] shadow-2xl border border-slate-100">
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
                <button disabled={loading} className="bg-indigo-600 text-white px-8 rounded-2xl hover:bg-indigo-700 transition flex items-center gap-2 font-bold shadow-lg shadow-indigo-500/20">
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
                    <span>{loading ? '' : t('search_btn')}</span>
                </button>
            </form>

            <div className="h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 glass relative z-0">
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ChangeView center={center} />
                    
                    {places.map((place, idx) => (
                        <Marker 
                            key={idx} 
                            position={[place.lat, place.lon]}
                            icon={place.isCenter ? L.divIcon({ className: 'bg-amber-500 rounded-full w-4 h-4 border-2 border-white' }) : undefined}
                            eventHandlers={{
                                click: () => setTargetLoc({ lat: place.lat, lon: place.lon }),
                            }}
                        >
                            <Popup minWidth={200}>
                                <div className="p-3 text-center space-y-3">
                                    <h4 className="font-bold text-indigo-900 text-lg">{place.isCenter ? "City Center" : place.name}</h4>
                                    {place.isCenter && <p className="text-xs text-slate-500 italic">No specific landmarks found, showing city center.</p>}
                                    <button 
                                        onClick={() => setTargetLoc({ lat: place.lat, lon: place.lon })}
                                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 text-sm hover:bg-indigo-700 transition"
                                    >
                                        <Navigation2 className="h-4 w-4" />
                                        Show Route
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {userLoc && (
                        <Marker position={[userLoc.lat, userLoc.lon]} icon={L.divIcon({ className: 'relative flex h-6 w-6 items-center justify-center', html: '<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>' })}>
                            <Popup>You are here</Popup>
                        </Marker>
                    )}

                    {userLoc && targetLoc && <Routing start={userLoc} end={targetLoc} />}
                </MapContainer>
            </div>
            {!userLoc && <p className="text-center text-sm text-slate-400 font-medium">Enable location access to use routing features.</p>}
        </div>
    );
};

export default ExploreMap;
