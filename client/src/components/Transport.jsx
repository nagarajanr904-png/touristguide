import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bus, Train, Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Transport = () => {
    const [transport, setTransport] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchTransport = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:5000/transport');
                setTransport(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTransport();
    }, []);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-96 gap-4">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
            <p className="text-slate-400 font-bold animate-pulse">Fetching Transport Data...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-6 space-y-16">
            <header className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-800 tracking-tight">{t('transport_title')}</h1>
                <p className="text-lg text-slate-500 font-medium">{t('transport_tagline')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Buses */}
                <div className="group glass rounded-[3rem] overflow-hidden border-white/40 transition-all duration-500 hover:shadow-amber-500/10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 flex items-center gap-6 text-white text-3xl font-black">
                        <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                            <Bus className="h-10 w-10" />
                        </div>
                        <h3>{t('bus_routes')}</h3>
                    </div>
                    <div className="p-8 space-y-4">
                        {transport?.buses.map((bus, idx) => (
                            <div key={idx} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="font-extrabold text-slate-700 text-lg">{bus.route}</div>
                                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl text-sm font-bold border border-amber-100">
                                    <Clock className="h-4 w-4" /> {bus.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trains */}
                <div className="group glass rounded-[3rem] overflow-hidden border-white/40 transition-all duration-500 hover:shadow-indigo-500/10">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 flex items-center gap-6 text-white text-3xl font-black">
                        <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                            <Train className="h-10 w-10" />
                        </div>
                        <h3>{t('train_services')}</h3>
                    </div>
                    <div className="p-8 space-y-4">
                        {transport?.trains.map((train, idx) => (
                            <div key={idx} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="font-extrabold text-slate-700 text-lg">{train.name}</div>
                                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-sm font-bold border border-indigo-100">
                                    <Clock className="h-4 w-4" /> {train.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transport;
