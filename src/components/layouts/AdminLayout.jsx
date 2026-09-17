import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  ShieldAlert, 
  Users, 
  Heart, 
  Droplet, 
  Building2, 
  Activity, 
  FileCheck, 
  AlertTriangle, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DemoRoleSwitcher } from '../common/InteractiveMapMock';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNav = [
    { label: 'অ্যাডমিন ড্যাশবোর্ড', path: '/admin', icon: Activity },
    { label: 'ব্যবহারকারী তালিকা', path: '/admin/users', icon: Users },
    { label: 'রক্তদাতা ব্যবস্থাপনা', path: '/admin/donors', icon: Heart },
    { label: 'রক্তের অনুরোধসমূহ', path: '/admin/blood-requests', icon: Droplet },
    { label: 'জরুরি ইমার্জেন্সি মনিটর', path: '/admin/emergency', icon: ShieldAlert },
    { label: 'হাসপাতালসমূহ', path: '/admin/hospitals', icon: Building2 },
    { label: 'ব্লাড ব্যাংক ও স্টক', path: '/admin/blood-banks', icon: Database },
    { label: 'ভেরিফিকেশন কিউ', path: '/admin/verifications', icon: FileCheck },
    { label: 'রিপোর্ট ও মডারেশন', path: '/admin/reports', icon: AlertTriangle },
    { label: 'সিস্টেম সেটিংস', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center font-black text-white text-sm">
            র
          </div>
          <span className="font-bold text-base text-white">অ্যাডমিন প্যানেল</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`w-full md:w-64 lg:w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="space-y-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Droplet className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-black text-base text-white">রক্তকণিকা অ্যাডমিন</h2>
              <span className="text-[10px] text-rose-400 font-mono tracking-widest uppercase">Admin Portal</span>
            </div>
          </Link>

          {/* Nav items */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin User info & Exit */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-rose-400">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'অ্যাডমিন'}</p>
              <p className="text-[10px] text-slate-500 truncate">Super Administrator</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>ওয়েবসাইটে ফিরে যান</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>

      <DemoRoleSwitcher />
    </div>
  );
}
