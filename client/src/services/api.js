import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const chatWithAI = (data) => API.post('/chat', data);
export const fetchPlaces = (filters) => API.get('/places', { params: filters });
export const fetchPlaceById = (id) => API.get(`/places/${id}`);
export const fetchTransport = (filters) => API.get('/transport', { params: filters });
export const fetchBuses = (params) => API.get('/transport/bus', { params });
export const fetchTrains = (params) => API.get('/transport/train', { params });
export const explainHiddenGem = (placeName) => API.post('/chat', {
    message: `Explain why ${placeName} is a hidden gem in Tamil Nadu and the best time to visit. Keep it short.`
});

// Admin APIs
export const adminLogin = (formData) => API.post('/admin/login', formData);
export const fetchAdminStats = () => API.get('/admin/stats');
export const fetchVisitorLogs = () => API.get('/admin/visitors');
export const logVisitor = (data) => API.post('/admin/track', data);

// Feedback APIs
export const submitFeedback = (data) => API.post('/feedback', data);
export const fetchAllFeedback = (params) => API.get('/feedback', { params });
export const deleteFeedback = (id) => API.delete(`/feedback/${id}`);

export default API;

