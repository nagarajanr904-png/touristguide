import { useNavigate } from 'react-router-dom';
import { MapPin, Bus, Sparkles } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const options = [
        {
            title: 'Tourist Spots',
            description: 'Explore temples, historical sites, and nature.',
            icon: <MapPin className="w-8 h-8 text-blue-500" />,
            path: '/spots',
            color: 'bg-blue-50 border-blue-100'
        },
        {
            title: 'Transport',
            description: 'Find buses and trains between cities.',
            icon: <Bus className="w-8 h-8 text-green-500" />,
            path: '/transport',
            color: 'bg-green-50 border-green-100'
        },
        {
            title: 'Hidden Gems',
            description: 'Discover less-known but amazing places.',
            icon: <Sparkles className="w-8 h-8 text-purple-500" />,
            path: '/hidden-gems',
            color: 'bg-purple-50 border-purple-100'
        }
    ];

    return (
        <div className="py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    Welcome to <span className="text-indigo-600">Tourist Guide</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Your personal travel companion powered by AI. Explore destinations, check transport, and uncover hidden secrets.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(opt.path)}
                        className={`cursor-pointer rounded-2xl p-8 border ${opt.color} hover:scale-105 transition duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center space-y-4`}
                    >
                        <div className="bg-white p-4 rounded-full shadow-sm">
                            {opt.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">{opt.title}</h3>
                        <p className="text-slate-600">{opt.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
