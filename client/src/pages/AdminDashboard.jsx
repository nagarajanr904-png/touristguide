import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    LogOut,
    Menu,
    X,
    MapPin,
    ShieldCheck
} from 'lucide-react';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [adminInfo, setAdminInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('adminInfo'));
        if (info) setAdminInfo(info);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Visitors', path: '/admin/dashboard/visitors', icon: Users },
        { name: 'Feedback', path: '/admin/dashboard/feedback', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2 font-bold text-indigo-600 text-xl">
                            <ShieldCheck className="w-8 h-8" />
                            <span>TourAdmin</span>
                        </div>
                    ) : (
                        <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto" />
                    )}
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin/dashboard'}
                            className={({ isActive }) => `
                                flex items-center gap-3 p-3 rounded-xl transition-all
                                ${isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                            `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {isSidebarOpen && <span>{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">{adminInfo?.username || 'Admin'}</p>
                            <p className="text-xs text-slate-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            {adminInfo?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto p-6 lg:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
