import { useState, useEffect } from 'react';
import { fetchAdminStats } from '../../services/api';
import {
    Users,
    MessageSquare,
    BarChart3,
    Smartphone,
    Monitor,
    TrendingUp,
    Map
} from 'lucide-react';

const DashboardHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            try {
                const { data } = await fetchAdminStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        getStats();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    const cards = [
        { title: 'Total Visitors', value: stats?.totalVisitors || 0, icon: Users, color: 'bg-indigo-500', trend: '+12%' },
        { title: 'User Feedback', value: stats?.totalFeedback || 0, icon: MessageSquare, color: 'bg-emerald-500', trend: '+5%' },
        { title: 'Mobile Users', value: stats?.deviceStats?.find(d => d.device_type === 'mobile')?.count || 0, icon: Smartphone, color: 'bg-orange-500', trend: '48%' },
        { title: 'Desktop Users', value: stats?.deviceStats?.find(d => d.device_type === 'desktop')?.count || 0, icon: Monitor, color: 'bg-sky-500', trend: '52%' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">System Overview</h1>
                <p className="text-slate-500">Real-time analytics and visitor statistics.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                        <div className={`${card.color} p-3 rounded-xl text-white`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{card.title}</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
                                <span className="text-xs font-semibold text-emerald-500 flex items-center">
                                    <TrendingUp className="w-3 h-3" /> {card.trend}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Pages */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Top Visited Pages</h2>
                        <BarChart3 className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {stats?.topPages?.map((page, idx) => (
                            <div key={page.page_name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700 capitalize">{page.page_name.replace('/', '') || 'Home'}</span>
                                    <span className="text-slate-500">{page.count} visits</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(page.count / stats.totalVisitors) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Activity (Mock/Future) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 transform translate-x-12 -translate-y-12 rotate-12 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Map className="w-48 h-48 text-indigo-900" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-6 font-sans">Popular Search Areas</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Madurai', 'Chennai', 'Ooty', 'Kodaikanal', 'Thanjavur'].map((city) => (
                            <span key={city} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-indigo-100 hover:text-indigo-600 transition-colors cursor-default">
                                {city}
                            </span>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-slate-500">Based on recently logged visitor queries across the system.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
