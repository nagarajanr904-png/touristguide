import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TripPlanner from './components/TripPlanner';
import Weather from './components/Weather';
import ExploreMap from './components/ExploreMap';
import HiddenGems from './components/HiddenGems';
import Transport from './components/Transport';
import FoodSafety from './components/FoodSafety';

import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-['Outfit',sans-serif] text-slate-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan-trip" element={<TripPlanner />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/explore" element={<ExploreMap />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/food-safety" element={<FoodSafety />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-12 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">© {new Date().getFullYear()} TouristGD.AI — Handcrafted for Travelers.</p>
        </footer>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
