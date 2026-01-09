import { useState } from 'react';
import { submitFeedback } from '../services/api';
import { Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackForm = ({ pageName = 'General' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        message: '',
        page_name: pageName
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await submitFeedback(formData);
            setStatus('success');
            setTimeout(() => {
                setFormData({ ...formData, message: '', rating: 5 });
                setStatus('idle');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="bg-white rounded-3xl p-8 shadow-2xl shadow-indigo-100 border border-slate-100 max-w-2xl mx-auto my-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Your Opinion Matters!</h2>
                <p className="text-slate-500">Help us improve the Tamil Nadu Tourist Guide System.</p>
            </div>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Thank You!</h3>
                        <p className="text-slate-500">Your feedback has been submitted successfully.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Full Name (Optional)</label>
                                <input
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email Address (Optional)</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">How would you rate your experience?</label>
                            <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="transition-transform active:scale-95"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 hover:text-yellow-200 transition-colors'}`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-auto text-sm font-bold text-slate-400 self-center">
                                    {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.rating - 1]}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Message</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                placeholder="What can we do better?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Sending...' : (
                                <>
                                    <Send className="w-5 h-5" /> Submit Feedback
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-bounce justify-center">
                                <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FeedbackForm;
