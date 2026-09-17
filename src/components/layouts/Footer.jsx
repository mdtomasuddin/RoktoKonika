import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, MapPin, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-16 md:pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-6 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-950/40">
                <Droplet className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                রক্ত<span className="text-rose-500">কণিকা</span><span className="text-slate-400 text-sm font-semibold ml-1"></span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              “রক্তের প্রয়োজনে, মানুষের পাশে” — বাংলাদেশের ৬৪ জেলায় জরুরি রক্তদাতা, হাসপাতাল ও ব্লাড ব্যাংকের সাথে রক্তপ্রার্থীদের নিরবচ্ছিন্ন দ্রুত সংযোগের একটি অলাভজনক প্ল্যাটফর্ম।
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/70 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> ১০০% অলাভজনক ও মানবিক উদ্যোগ
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/find-blood" className="text-slate-400 hover:text-rose-400 transition-colors">রক্ত খুঁজুন</Link></li>
              <li><Link to="/blood-requests" className="text-slate-400 hover:text-rose-400 transition-colors">জরুরি রক্তের অনুরোধ</Link></li>
              <li><Link to="/become-a-donor" className="text-slate-400 hover:text-rose-400 transition-colors">রক্তদাতা হিসেবে যুক্ত হোন</Link></li>
              <li><Link to="/donors" className="text-slate-400 hover:text-rose-400 transition-colors">রক্তদাতাদের তালিকা</Link></li>
              <li><Link to="/hospitals" className="text-slate-400 hover:text-rose-400 transition-colors">হাসপাতাল ও আইসিইউ</Link></li>
              <li><Link to="/blood-banks" className="text-slate-400 hover:text-rose-400 transition-colors">ব্লাড ব্যাংক ও রক্তের স্টক</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">তথ্য ও নির্দেশিকা</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/about" className="text-slate-400 hover:text-rose-400 transition-colors">আমাদের লক্ষ্য ও উদ্দেশ্য</Link></li>
              <li><Link to="/how-it-works" className="text-slate-400 hover:text-rose-400 transition-colors">কীভাবে কাজ করে</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-rose-400 transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-rose-400 transition-colors">যোগাযোগ ও হেল্পডেস্ক</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-rose-400 transition-colors">গোপনীয়তা নীতিমালা</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-rose-400 transition-colors">শর্তাবলী ও ডিসক্লেইমার</Link></li>
            </ul>
          </div>

          {/* Division Hubs */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">বিভাগীয় হেল্প সেল</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center justify-between"><span className="text-slate-400">ঢাকা:</span> <span className="font-medium text-slate-300">০১৭১১-০০১১২২</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-400">চট্টগ্রাম:</span> <span className="font-medium text-slate-300">০১৮১৯-০০৩৩৪৪</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-400">সিলেট:</span> <span className="font-medium text-slate-300">০১৭১২-০০৫৫৬৬</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-400">রাজশাহী:</span> <span className="font-medium text-slate-300">০১৭৯৯-০০৭৭৮৮</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-400">খুলনা ও বরিশাল:</span> <span className="font-medium text-slate-300">০১৯১১-০০৯৯০০</span></li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} রক্তকণিকা-RoktoKonika। সর্বস্বত্ব সংরক্ষিত। রক্ত পরিসঞ্চালনের পূর্বে ক্রস-ম্যাচিং বাধ্যতামূলক।
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-400">
            <span>Developer: <span className="text-rose-400 font-semibold">Md Tomas Uddin</span></span>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-rose-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-rose-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-2xl">
      <Link to="/" className="flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 p-1">
        <Droplet className="w-5 h-5 text-rose-600" />
        <span className="text-[10px] font-bold">হোম</span>
      </Link>
      <Link to="/find-blood" className="flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 p-1">
        <MapPin className="w-5 h-5 text-slate-500" />
        <span className="text-[10px] font-medium">রক্ত খুঁজুন</span>
      </Link>
      <Link to="/request-blood" className="flex flex-col items-center gap-1 text-white bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 rounded-2xl shadow-lg -translate-y-2">
        <span className="text-xs font-black">রক্তের অনুরোধ</span>
      </Link>
      <Link to="/donors" className="flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 p-1">
        <Heart className="w-5 h-5 text-slate-500" />
        <span className="text-[10px] font-medium">ডোনার</span>
      </Link>
      <Link to="/dashboard" className="flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 p-1">
        <ShieldCheck className="w-5 h-5 text-slate-500" />
        <span className="text-[10px] font-medium">ড্যাশবোর্ড</span>
      </Link>
    </div>
  );
}
