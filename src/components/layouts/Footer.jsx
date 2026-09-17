import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, PhoneCall, ShieldAlert, Heart, MapPin, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '../../constants';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 lg:pb-12 border-t border-slate-800">
      {/* Emergency Hotlines Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMERGENCY_HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-center gap-4 hover:border-rose-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{hotline.name}</p>
                <a href={`tel:${hotline.number}`} className="text-lg font-black text-white hover:text-rose-400 tracking-wider">
                  {hotline.number}
                </a>
                <p className="text-[11px] text-slate-400 truncate">{hotline.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
                <Droplet className="w-6 h-6 fill-white" />
              </div>
              <span className="text-2xl font-black text-white">
                রক্ত<span className="text-rose-500">কণিকা</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              “রক্তের প্রয়োজনে, মানুষের পাশে” — বাংলাদেশের ৬৪ জেলায় জরুরি রক্তদাতা, হাসপাতাল ও ব্লাড ব্যাংকের সাথে রক্তপ্রার্থীদের নিরবচ্ছিন্ন দ্রুত সংযোগের একটি অলাভজনক প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" /> ১০০% অলাভজনক ও মানবিক উদ্যোগ
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/find-blood" className="hover:text-rose-400 transition-colors">রক্ত খুঁজুন</Link></li>
              <li><Link to="/blood-requests" className="hover:text-rose-400 transition-colors">জরুরি রক্তের অনুরোধ</Link></li>
              <li><Link to="/become-a-donor" className="hover:text-rose-400 transition-colors">রক্তদাতা হিসেবে যুক্ত হোন</Link></li>
              <li><Link to="/donors" className="hover:text-rose-400 transition-colors">রক্তদাতাদের তালিকা</Link></li>
              <li><Link to="/hospitals" className="hover:text-rose-400 transition-colors">হাসপাতাল ও আইসিইউ</Link></li>
              <li><Link to="/blood-banks" className="hover:text-rose-400 transition-colors">ব্লাড ব্যাংক ও রক্তের স্টক</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">তথ্য ও নির্দেশিকা</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-rose-400 transition-colors">আমাদের লক্ষ্য ও উদ্দেশ্য</Link></li>
              <li><Link to="/how-it-works" className="hover:text-rose-400 transition-colors">কীভাবে কাজ করে</Link></li>
              <li><Link to="/faq" className="hover:text-rose-400 transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</Link></li>
              <li><Link to="/contact" className="hover:text-rose-400 transition-colors">যোগাযোগ ও হেল্পডেস্ক</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-rose-400 transition-colors">গোপনীয়তা নীতিমালা</Link></li>
              <li><Link to="/terms" className="hover:text-rose-400 transition-colors">শর্তাবলী ও ডিসক্লেইমার</Link></li>
            </ul>
          </div>

          {/* Division Hubs */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">বিভাগীয় হেল্প সেল</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• ঢাকা বিভাগীয় সমন্বয়ক: ০১৭১১-০০১১২২</li>
              <li>• চট্টগ্রাম বিভাগীয় সেল: ০১৮১৯-০০৩৩৪৪</li>
              <li>• সিলেট বিভাগীয় সেল: ০১৭১২-০০৫৫৬৬</li>
              <li>• রাজশাহী বিভাগীয় সেল: ০১৭৯৯-০০৭৭৮৮</li>
              <li>• খুলনা ও বরিশাল সেল: ০১৯১১-০০৯৯০০</li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} রক্তকণিকা (RoktoKonika BD)। সর্বস্বত্ব সংরক্ষিত। রক্ত পরিসঞ্চালনের পূর্বে ক্রস-ম্যাচিং বাধ্যতামূলক।
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
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
