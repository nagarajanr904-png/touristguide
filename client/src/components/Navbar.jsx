import { Link } from 'react-router-dom';
import { Map, Menu, X, Compass, Gem, Bus, CalendarDays, Languages } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navLinks = [
        { name: t('home'), tKey: 'home', to: '/', icon: <Map className="h-4 w-4" /> },
        { name: t('explore'), tKey: 'explore', to: '/explore', icon: <Compass className="h-4 w-4" /> },
        { name: t('transport'), tKey: 'transport', to: '/transport', icon: <Bus className="h-4 w-4" /> },
        { name: t('hidden_gems'), tKey: 'hidden_gems', to: '/hidden-gems', icon: <Gem className="h-4 w-4" /> },
        { name: t('plan_trip'), tKey: 'plan_trip', to: '/plan-trip', icon: <CalendarDays className="h-4 w-4" /> },
    ];

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'hi', label: 'हि' },
        { code: 'es', label: 'ES' },
    ];

    return (
        <nav className="glass sticky top-0 z-[1000] border-b border-white/20">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-black text-2xl tracking-tighter">
                        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                            <Map className="h-6 w-6" />
                        </div>
                        <span>TouristGD.AI</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.tKey} 
                                to={link.to} 
                                className="text-slate-600 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
                            >
                                {link.icon} {link.name}
                            </Link>
                        ))}
                        
                        {/* Language Selector */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                        language === lang.code 
                                        ? 'bg-white text-indigo-600 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 p-1 rounded-full scale-90">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        language === lang.code ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                                    }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 lg:hidden">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/20 animate-in slide-in-from-top duration-300">
                    <div className="px-6 py-8 flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.tKey} 
                                to={link.to} 
                                onClick={() => setIsOpen(false)} 
                                className="text-slate-800 hover:text-indigo-600 font-bold text-lg flex items-center gap-3"
                            >
                                <span className="bg-slate-100 p-2 rounded-xl text-slate-500">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
