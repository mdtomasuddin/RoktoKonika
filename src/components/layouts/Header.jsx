import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Droplet,
  Menu,
  X,
  Bell,
  User,
  HeartHandshake,
  PlusCircle,
  ShieldCheck,
  LogOut,
  Hospital,
  Building2,
  PhoneCall,
  Search,
  ChevronDown,
  LayoutDashboard,
  Heart,
  MessageSquare,
  HelpCircle,
  FileText,
  Info,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Modal } from '../ui/Modal';
import { BloodCompatibilityModal } from '../common/BloodCompatibilityModal';
import { BLOOD_GROUPS } from '../../constants';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  // Dropdown states
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [compatModalOpen, setCompatModalOpen] = useState(false);
  const [searchBloodGroup, setSearchBloodGroup] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Refs for outside click handling
  const servicesRef = useRef(null);
  const pagesRef = useRef(null);
  const userRef = useRef(null);
  const notifRef = useRef(null);

  // Close all dropdowns on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setPagesDropdownOpen(false);
    setUserDropdownOpen(false);
    setNotifDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setPagesDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Keyboard Shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const isServicesActive = () => {
    return ['/donors', '/hospitals', '/blood-banks'].some(path => location.pathname.startsWith(path));
  };

  const isPagesActive = () => {
    return ['/about', '/how-it-works', '/faq', '/contact', '/privacy', '/terms'].some(path => location.pathname.startsWith(path));
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    setSearchModalOpen(false);
    const params = new URLSearchParams();
    if (searchBloodGroup) params.set('group', searchBloodGroup);
    if (searchKeyword) params.set('search', searchKeyword);
    navigate(`/find-blood?${params.toString()}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* ================= 1. PREMIUM MINIMALIST TOP BAR ================= */}
        <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Live emergency highlight */}
            <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-600/90 text-white font-bold text-[10px] tracking-wide flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                জরুরি সেবা
              </span>
              <span className="truncate text-slate-300">
                ২৪/৭ বিনামূল্যে জরুরি রক্ত সহায়তা নেটওয়ার্ক • বাংলাদেশ
              </span>
            </div>

            {/* Quick Clean Actions */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0 text-slate-400 text-xs">
              <a href="tel:09612889900" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <PhoneCall className="w-3 h-3 text-rose-400" />
                <span>হটলাইন: <strong className="text-white font-medium">০৯৬১২-৮৮৯৯০০</strong></span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="tel:999" className="hover:text-white transition-colors">
                জরুরি: <strong className="text-rose-400 font-bold">৯৯৯</strong>
              </a>
              <span className="text-slate-700">|</span>
              <button
                type="button"
                onClick={() => setCompatModalOpen(true)}
                className="hover:text-rose-300 font-semibold text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Droplet className="w-3 h-3 text-rose-400" /> ব্লাড ম্যাচিং গাইড
              </button>
            </div>
          </div>
        </div>

        {/* ================= 2. PROFESSIONAL MAIN NAVBAR ================= */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">

              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-600/25 group-hover:scale-105 group-hover:shadow-rose-600/35 transition-all duration-200">
                    <Droplet className="w-5 h-5 fill-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                      রক্ত<span className="text-rose-600">কণিকা</span>
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-500 tracking-tight ml-1">
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 tracking-wide mt-0.5">
                    Emergency Blood Network
                  </span>
                </div>
              </Link>

              {/* Desktop Clean Nav Items */}
              <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
                {/* 1. Home */}
                <Link
                  to="/"
                  className={`px-3.5 py-2 rounded-xl transition-all duration-150 ${location.pathname === '/'
                      ? 'text-rose-600 bg-rose-50/80 font-bold shadow-xs'
                      : 'hover:text-rose-600 hover:bg-slate-50'
                    }`}
                >
                  হোম
                </Link>

                {/* 2. Find Blood */}
                <Link
                  to="/find-blood"
                  className={`px-3.5 py-2 rounded-xl transition-all duration-150 ${isActive('/find-blood')
                      ? 'text-rose-600 bg-rose-50/80 font-bold shadow-xs'
                      : 'hover:text-rose-600 hover:bg-slate-50'
                    }`}
                >
                  রক্ত খুঁজুন
                </Link>

                {/* 3. Urgent Blood Requests */}
                <Link
                  to="/blood-requests"
                  className={`px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1.5 ${isActive('/blood-requests')
                      ? 'text-red-700 bg-red-50 font-bold shadow-xs'
                      : 'hover:text-red-600 hover:bg-rose-50/50'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span>জরুরি অনুরোধ</span>
                </Link>

                {/* 4. Services Dropdown */}
                <div className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setServicesDropdownOpen(prev => !prev);
                      setPagesDropdownOpen(false);
                      setUserDropdownOpen(false);
                      setNotifDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1 cursor-pointer ${isServicesActive() || servicesDropdownOpen
                        ? 'text-rose-600 bg-rose-50/80 font-bold'
                        : 'hover:text-rose-600 hover:bg-slate-50'
                      }`}
                    aria-expanded={servicesDropdownOpen}
                  >
                    <span>সেবাসমূহ</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-rose-600' : 'text-slate-400'}`} />
                  </button>

                  {servicesDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        আমাদের সেবাসমূহ
                      </div>

                      <Link
                        to="/donors"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/80 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-rose-600 transition-colors">রক্তদাতাদের তালিকা</p>
                          <p className="text-[11px] text-slate-500">৬৪ জেলার ভেরিফাইড রক্তদাতা</p>
                        </div>
                      </Link>

                      <Link
                        to="/hospitals"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50/80 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                          <Hospital className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition-colors">হাসপাতাল ও আইসিইউ</p>
                          <p className="text-[11px] text-slate-500">জরুরি যোগাযোগ ও হটলাইন</p>
                        </div>
                      </Link>

                      <Link
                        to="/blood-banks"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-amber-600 transition-colors">ব্লাড ব্যাংক ও লাইভ স্টক</p>
                          <p className="text-[11px] text-slate-500">রক্তের মজুদ ও প্রাপ্তিস্থান</p>
                        </div>
                      </Link>

                      <div className="pt-2 border-t border-slate-100 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            setCompatModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left cursor-pointer"
                        >
                          <Droplet className="w-4 h-4 text-rose-500" />
                          <span>রক্তের ম্যাচিং নির্দেশিকা (Compatibility)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Pages Dropdown */}
                <div className="relative" ref={pagesRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setPagesDropdownOpen(prev => !prev);
                      setServicesDropdownOpen(false);
                      setUserDropdownOpen(false);
                      setNotifDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1 cursor-pointer ${isPagesActive() || pagesDropdownOpen
                        ? 'text-rose-600 bg-rose-50/80 font-bold'
                        : 'hover:text-rose-600 hover:bg-slate-50'
                      }`}
                    aria-expanded={pagesDropdownOpen}
                  >
                    <span>পেজসমূহ</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180 text-rose-600' : 'text-slate-400'}`} />
                  </button>

                  {pagesDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        তথ্য ও সহায়তা
                      </div>

                      <Link
                        to="/how-it-works"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>কীভাবে কাজ করে</span>
                      </Link>

                      <Link
                        to="/about"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors"
                      >
                        <Info className="w-4 h-4 text-slate-400" />
                        <span>আমাদের সম্পর্কে</span>
                      </Link>

                      <Link
                        to="/faq"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>সাধারণ জিজ্ঞাসা (FAQ)</span>
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors"
                      >
                        <PhoneCall className="w-4 h-4 text-slate-400" />
                        <span>যোগাযোগ ও হেল্পডেস্ক</span>
                      </Link>

                      <div className="pt-2 border-t border-slate-100 mt-1">
                        <Link
                          to="/terms"
                          onClick={() => setPagesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-1.5 text-[11px] font-medium text-slate-500 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>শর্তাবলী ও প্রাইভেসি পলিসি</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* 1. Quick Search Icon Button (Ctrl+K) */}
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="দ্রুত অনুসন্ধান (Ctrl + K)"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>

                {/* 2. Notification Bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifDropdownOpen(prev => !prev);
                      setUserDropdownOpen(false);
                      setServicesDropdownOpen(false);
                      setPagesDropdownOpen(false);
                    }}
                    className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="বিজ্ঞপ্তিসমূহ"
                    aria-expanded={notifDropdownOpen}
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown Popover */}
                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">বিজ্ঞপ্তিসমূহ</span>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                              {unreadCount} টি নতুন
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <button
                            type="button"
                            onClick={markAllAsRead}
                            className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                          >
                            পড়া হয়েছে
                          </button>
                          <Link
                            to="/dashboard/notifications"
                            onClick={() => setNotifDropdownOpen(false)}
                            className="text-rose-600 font-bold hover:underline"
                          >
                            সব দেখুন
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markAsRead(n.id);
                                setNotifDropdownOpen(false);
                                if (n.link) navigate(n.link);
                              }}
                              className={`p-3 rounded-2xl cursor-pointer text-xs transition-all border ${n.isRead
                                  ? 'bg-white border-transparent hover:bg-slate-50 text-slate-600'
                                  : 'bg-rose-50/60 border-rose-100 hover:bg-rose-50 text-slate-900 font-medium'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-rose-600" />}
                                  {n.title}
                                </span>
                                <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                              </div>
                              <p className="text-slate-600 line-clamp-2 leading-relaxed">{n.message}</p>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-slate-400 text-xs">
                            কোনো নতুন বিজ্ঞপ্তি নেই
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Secondary CTA: Become Donor */}
                <Link to="/become-a-donor" className="hidden sm:inline-block">
                  <button className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 hover:border-rose-400 hover:bg-rose-50/50 text-slate-700 hover:text-rose-700 transition-all cursor-pointer">
                    রক্ত দিন
                  </button>
                </Link>

                {/* 4. Primary CTA: Request Blood */}
                <Link to="/request-blood">
                  <button className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-md shadow-rose-600/25 hover:shadow-rose-600/35 transition-all flex items-center gap-1.5 active:scale-98 cursor-pointer">
                    <PlusCircle className="w-4 h-4" />
                    <span>রক্তের আবেদন</span>
                  </button>
                </Link>

                {/* 5. Circular User Avatar Profile Button */}
                {isAuthenticated ? (
                  <div className="relative pl-1" ref={userRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(prev => !prev);
                        setNotifDropdownOpen(false);
                        setServicesDropdownOpen(false);
                        setPagesDropdownOpen(false);
                      }}
                      className="relative flex items-center focus:outline-none group cursor-pointer"
                      title="আমার একাউন্ট ও ড্যাশবোর্ড"
                      aria-expanded={userDropdownOpen}
                      aria-label="User Account Menu"
                    >
                      {/* Premium Circular Avatar */}
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-rose-600/30 group-hover:ring-rose-600 transition-all shadow-sm">
                        <img
                          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                          alt={user?.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Circular Blood Group Badge Overlay */}
                      {user?.bloodGroup && (
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-black border-2 border-white shadow-xs">
                          {user.bloodGroup}
                        </span>
                      )}
                    </button>

                    {/* Circular Avatar Popover Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                        {/* Profile Header card */}
                        <div className="p-3 bg-gradient-to-br from-slate-50 to-rose-50/30 rounded-2xl mb-1.5 flex items-center gap-3 border border-slate-100">
                          <img
                            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">{user?.name}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user?.phone || user?.email}</p>
                          </div>
                        </div>

                        <div className="space-y-0.5 text-xs font-semibold text-slate-700">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 hover:text-rose-600 font-bold transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            <span>আমার ড্যাশবোর্ড</span>
                          </Link>

                          <Link
                            to="/dashboard/profile"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <span>প্রোফাইল সেটিংস</span>
                          </Link>

                          <Link
                            to="/dashboard/requests"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <Droplet className="w-4 h-4 text-slate-400" />
                            <span>আমার অনুরোধসমূহ</span>
                          </Link>

                          <Link
                            to="/dashboard/messages"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 text-slate-400" />
                            <span>মেসেজ ও চ্যাট</span>
                          </Link>

                          {user?.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold transition-colors"
                            >
                              <ShieldAlert className="w-4 h-4 text-purple-600" />
                              <span>অ্যাডমিন পোর্টাল</span>
                            </Link>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-100 mt-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>লগআউট করুন</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="pl-1">
                    <button className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                      লগইন
                    </button>
                  </Link>
                )}

                {/* 6. Mobile Menu Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors lg:hidden cursor-pointer"
                  aria-label="Toggle Mobile Navigation"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. MOBILE SLIDE-OUT DRAWER ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto">
            {/* Quick Action Top Bar */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/request-blood" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs">
                  <PlusCircle className="w-4 h-4" /> রক্তের অনুরোধ
                </button>
              </Link>
              <Link to="/become-a-donor" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2.5 px-3 rounded-2xl border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-rose-600" /> রক্ত দিতে চাই
                </button>
              </Link>
            </div>

            {/* Categorized Mobile Navigation */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                মূল মেনু
              </span>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-slate-50">
                হোম
              </Link>
              <Link to="/find-blood" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-slate-50">
                <Search className="w-4 h-4 text-rose-600" /> রক্ত খুঁজুন
              </Link>
              <Link to="/blood-requests" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> জরুরি রক্তের অনুরোধ
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                সেবাসমূহ
              </span>
              <Link to="/donors" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50">
                <Heart className="w-4 h-4 text-rose-500" /> রক্তদাতাদের তালিকা
              </Link>
              <Link to="/hospitals" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50">
                <Hospital className="w-4 h-4 text-sky-500" /> হাসপাতাল ও আইসিইউ
              </Link>
              <Link to="/blood-banks" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50">
                <Building2 className="w-4 h-4 text-amber-500" /> ব্লাড ব্যাংক ও লাইভ স্টক
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCompatModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 text-left"
              >
                <Droplet className="w-4 h-4 text-rose-500" /> ব্লাড ম্যাচিং চার্ট
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
                পেজ ও সহায়তা
              </span>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600">
                কীভাবে কাজ করে
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600">
                আমাদের সম্পর্কে
              </Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600">
                সাধারণ জিজ্ঞাসা (FAQ)
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600">
                যোগাযোগ ও হটলাইন
              </Link>
            </div>

            {/* Mobile User Profile Section */}
            <div className="pt-3 border-t border-slate-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{user?.name}</p>
                        <p className="text-[10px] text-slate-500">{user?.bloodGroup} ডোনার</p>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <button className="px-3 py-1 bg-rose-600 text-white rounded-xl text-xs font-bold">
                        ড্যাশবোর্ড
                      </button>
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-xs font-bold text-red-600 text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> লগআউট করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800">
                      লগইন
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">
                      নিবন্ধন
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ================= 4. QUICK BLOOD FINDER MODAL (Ctrl+K) ================= */}
      {searchModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setSearchModalOpen(false)}
          title="তাত্ক্ষণিক রক্ত অনুসন্ধান (Quick Blood Finder)"
          subtitle="রক্তের গ্রুপ অথবা এলাকা নির্বাচন করে দ্রুত খুঁজুন"
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleGlobalSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                রক্তের গ্রুপ নির্বাচন করুন
              </label>
              <div className="grid grid-cols-4 gap-2">
                {BLOOD_GROUPS.map(bg => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setSearchBloodGroup(bg === searchBloodGroup ? '' : bg)}
                    className={`py-2 px-1 rounded-xl text-xs font-extrabold border transition-all text-center cursor-pointer
                      ${searchBloodGroup === bg
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-300'}`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                হাসপাতাল, বিভাগ বা এলাকার নাম
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="যেমন: ঢাকা মেডিকেল, ধানমন্ডি, চট্টগ্রাম..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 cursor-pointer"
              >
                রক্তদাতা খুঁজুন →
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Blood Compatibility Modal */}
      <BloodCompatibilityModal
        isOpen={compatModalOpen}
        onClose={() => setCompatModalOpen(false)}
      />
    </>
  );
}
