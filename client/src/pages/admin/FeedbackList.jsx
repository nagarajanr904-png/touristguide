import { useState, useEffect } from 'react';
import { fetchAllFeedback, deleteFeedback } from '../../services/api';
import { Star, Trash2, Mail, User, Clock, Filter } from 'lucide-react';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratingFilter, setRatingFilter] = useState('');

    const maskEmail = (email) => {
        if (!email) return '';
        const [name, domain] = email.split('@');
        if (name.length <= 2) return `${name[0]}***@${domain}`;
        return `${name[0]}***${name[name.length - 1]}@${domain}`;
    };

    const loadFeedback = async () => {
        setLoading(true);
        try {
            const { data } = await fetchAllFeedback({ rating: ratingFilter });
            setFeedbacks(data);
        } catch (error) {
            console.error('Failed to fetch feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeedback();
    }, [ratingFilter]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this feedback?')) return;
        try {
            await deleteFeedback(id);
            setFeedbacks(feedbacks.filter(f => f.id !== id));
        } catch (error) {
            alert('Failed to delete feedback');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">User Feedback</h1>
                    <p className="text-slate-500">Reviews and feedback submitted by system users.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-slate-400" />
                    <select
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                    >
                        <option value="">All Ratings</option>
                        {[5, 4, 3, 2, 1].map(r => (
                            <option key={r} value={r}>{r} Stars</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {feedbacks.map((fb) => (
                    <div key={fb.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => handleDelete(fb.id)}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-slate-700 italic flex-grow mb-6">"{fb.message}"</p>

                        <div className="space-y-2 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="font-semibold">{fb.name || 'Anonymous User'}</span>
                            </div>
                            {fb.email && (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Mail className="w-3 h-3" />
                                    <span>{maskEmail(fb.email)}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-tighter pt-2">
                                <div className="flex items-center gap-1 font-bold">
                                    <Clock className="w-3 h-3" /> {new Date(fb.created_at).toLocaleDateString()}
                                </div>
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">
                                    {fb.page_name || 'General'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {feedbacks.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-400">No feedback entries found</h3>
                        <p className="text-slate-300">Try changing your filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;
