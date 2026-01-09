import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sub-component to handle map centering and zooming
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
};

const MapComponent = ({ places = [], center = [11.1271, 78.6569], zoom = 7, singleMarker = false }) => {
    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeView center={center} zoom={zoom} />

                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={[place.latitude, place.longitude]}
                    >
                        <Popup>
                            <div className="p-1">
                                <h4 className="font-black text-slate-800 text-sm mb-1">{place.name}</h4>
                                <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 inline-block">
                                    {place.category}
                                </span>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {place.description}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
