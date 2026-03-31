import { useNavigate } from 'react-router-dom';
import { MapPin, Bus, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const options = [
        {
            title: t('explore'),
            description: t('famous_tagline'),
            icon: <MapPin className="w-8 h-8 text-blue-600" />,
            path: '/explore',
            color: 'border-blue-100 shadow-blue-500/10'
        },
        {
            title: t('transport'),
            description: 'Find buses and trains between cities.',
            icon: <Bus className="w-8 h-8 text-emerald-600" />,
            path: '/transport',
            color: 'border-emerald-100 shadow-emerald-500/10'
        },
        {
            title: t('hidden_gems'),
            description: 'Discover less-known but amazing places.',
            icon: <Sparkles className="w-8 h-8 text-amber-600" />,
            path: '/hidden-gems',
            color: 'border-amber-100 shadow-amber-500/10'
        }
    ];

    return (
        <div className="py-12 space-y-24">
            {/* Hero Section */}
            <div className="relative text-center space-y-8 max-w-4xl mx-auto px-6">
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold tracking-tight animate-bounce">
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Powered Travel</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    {t('welcome')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">TouristGD.AI</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
                    {t('tagline')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button 
                        onClick={() => navigate('/plan-trip')}
                        className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-2 group"
                    >
                        {t('hero_btn')}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </div>

            {/* Feature Selection */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(opt.path)}
                        className={`group cursor-pointer glass rounded-[2.5rem] p-10 border transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center space-y-6 ${opt.color}`}
                    >
                        <div className="p-5 rounded-3xl bg-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                            {opt.icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-slate-800">{opt.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{opt.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
