import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Planner from './pages/Planner';
import ChatBot from './components/ChatBot';

import TouristSpots from './pages/TouristSpots';
import SpotDetails from './pages/SpotDetails';
import TransportPage from './pages/TransportPage';
import HiddenGems from './pages/HiddenGems';

// Admin Imports
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import DashboardHome from './pages/admin/DashboardHome';
import VisitorStats from './pages/admin/VisitorStats';
import FeedbackList from './pages/admin/FeedbackList';
import FeedbackForm from './components/FeedbackForm';

import { logVisitor } from './services/api';

// Visitor Tracking Component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // We don't track admin pages or login/register as much, but let's track main content
    if (!location.pathname.startsWith('/admin')) {
      const searchParams = new URLSearchParams(location.search);
      const city = searchParams.get('city');
      logVisitor({
        page_name: location.pathname,
        searched_city: city || null
      }).catch(err => console.error('Tracking error:', err));
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/spots" element={<TouristSpots />} />
            <Route path="/spots/:id" element={<SpotDetails />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="visitors" element={<VisitorStats />} />
                <Route path="feedback" element={<FeedbackList />} />
              </Route>
            </Route>
          </Routes>

          {/* Feedback form on main pages (Home, Spots etc) */}
          <Routes>
            <Route path="/" element={<FeedbackForm pageName="Home" />} />
            <Route path="/spots" element={<FeedbackForm pageName="Tourist Spots" />} />
            <Route path="/hidden-gems" element={<FeedbackForm pageName="Hidden Gems" />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-slate-300 py-6 text-center">
          <p>© {new Date().getFullYear()} Tourist Guide AI. All rights reserved.</p>
        </footer>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
