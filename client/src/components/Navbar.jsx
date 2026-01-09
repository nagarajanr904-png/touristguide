
import { Link } from 'react-router-dom';
import { Map, User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
                        <Map className="h-8 w-8" />
                        <span>TouristGuide.AI</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-indigo-600 font-bold text-sm uppercase tracking-wider">Home</Link>
                        <Link to="/spots" className="text-slate-600 hover:text-indigo-600 font-bold text-sm uppercase tracking-wider">Explore</Link>
                        <Link to="/transport" className="text-slate-600 hover:text-indigo-600 font-bold text-sm uppercase tracking-wider">Transport</Link>
                        <Link to="/hidden-gems" className="text-slate-600 hover:text-indigo-600 font-bold text-sm uppercase tracking-wider">Hidden Gems</Link>
                        <Link to="/planner" className="text-slate-600 hover:text-indigo-600 font-bold text-sm uppercase tracking-wider">Plan Trip</Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-slate-800 font-medium">Hello, {user.name}</span>
                                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-indigo-600">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 py-4">
                    <div className="container mx-auto px-4 flex flex-col space-y-4">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium">Home</Link>
                        <Link to="/planner" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium">Trip Planner</Link>
                        <hr />
                        <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium">Login</Link>
                        <Link to="/register" onClick={() => setIsOpen(false)} className="text-indigo-600 font-medium">Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
