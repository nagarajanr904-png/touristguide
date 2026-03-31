import React from 'react';
import { Utensils, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

const FoodSafety = () => {
    const suggestions = {
        safe: [
            { name: "Peeled Fruits", info: "Safe to eat if peeled yourself." },
            { name: "Boiled Water", info: "Always safe and best for drinking." },
            { name: "Hot Cooked Food", info: "Safe if served hot and fresh." },
            { name: "Packaged Snacks", info: "Safe if the seal is intact." },
        ],
        avoid: [
            { name: "Tap Water", info: "Higher risk of contamination." },
            { name: "Raw Meat", info: "Risk of bacteria like Salmonella." },
            { name: "Ice Cubes", info: "Often made from untreated tap water." },
            { name: "Street Salads", info: "Risk of contamination from wash water." },
        ]
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-slate-800">Food Safety Guide</h1>
                <p className="text-slate-600">Essential tips to stay healthy during your travels.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Safe Section */}
                <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-lg">
                    <div className="flex items-center gap-4 text-emerald-600 mb-8">
                        <CheckCircle className="h-10 w-10" />
                        <h3 className="text-2xl font-bold">Safe to Consume</h3>
                    </div>
                    <div className="space-y-6">
                        {suggestions.safe.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-slate-600 text-sm">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Avoid Section */}
                <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 shadow-lg">
                    <div className="flex items-center gap-4 text-rose-600 mb-8">
                        <AlertTriangle className="h-10 w-10" />
                        <h3 className="text-2xl font-bold">Avoid or Be Careful</h3>
                    </div>
                    <div className="space-y-6">
                        {suggestions.avoid.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                                    <Utensils className="h-5 w-5 text-rose-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-slate-600 text-sm">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodSafety;
