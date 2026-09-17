import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Droplet, 
  Heart, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ArrowLeft,
  ShieldCheck,
  Menu,
  X,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from './Header';
import { BloodGroupBadge } from '../common/BloodGroupBadge';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDonor = user?.role === 'donor';

  const navItems = [
    { label: 'ওভারভিউ (Overview)', path: '/dashboard', icon: LayoutDashboard },
    { label: 'আমার প্রোফাইল', path: '/dashboard/profile', icon: User },
    { label: 'আমার রক্তের অনুরোধসমূহ', path: '/dashboard/requests', icon: Droplet },
    ...(isDonor ? [{ label: 'রক্তদান হিস্টোরি ও স্ট্যাটাস', path: '/dashboard/donations', icon: Heart }] : []),
    { label: 'বিজ্ঞপ্তিসমূহ', path: '/dashboard/notifications', icon: Bell },
    { label: 'মেসেজ ও চ্যাট', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'সেটিংস ও নিরাপত্তা', path: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
              {user?.name?.[0] || 'ড'}
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">{user?.name || 'ব্যবহারকারী'}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role === 'donor' ? 'স্বেচ্ছাসেবী রক্তদাতা' : 'রক্ত প্রার্থী'}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`w-full md:w-64 lg:w-72 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-6 sticky top-28">
            {/* User Mini Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white text-xl font-black flex items-center justify-center border-2 border-white/80 shadow-lg mb-2">
                  {user?.name?.[0] || 'ড'}
                </div>
                <h3 className="font-bold text-base leading-tight">{user?.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{user?.phone || user?.email}</p>
                
                <div className="flex items-center gap-2 mt-3">
                  {user?.bloodGroup && (
                    <BloodGroupBadge bloodGroup={user.bloodGroup} size="sm" />
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-rose-300">
                    {user?.role === 'donor' ? 'রক্তদাতা' : 'সেবাগ্রহীতা'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span>লগআউট করুন</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
