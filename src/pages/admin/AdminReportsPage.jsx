import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle, FileText, Settings, PhoneCall, Bell, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';

export function AdminReportsPage() {
  const { addToast } = useToast();
  const [reports, setReports] = useState([
    {
      id: 'r1',
      reporter: 'সাজিদুর রহমান',
      category: 'fake_request',
      reportedEntity: 'সন্দেহভাজন পোস্ট (ধানমন্ডি পপুলার)',
      reason: 'মিথ্যা রক্তের অনুরোধ ও বিকাশ নম্বরে টাকা দাবি',
      desc: 'রোগীর বিস্তারিত ও ডাক্তারের প্রেসক্রিপশন নেই, ফোনে যোগাযোগ করলে বিকাশে প্রসেসিং ফি চাইতেছে।',
      status: 'pending',
      date: '৩ ঘণ্টা আগে'
    },
    {
      id: 'r2',
      reporter: 'ফারহানা ইসলাম',
      category: 'incorrect_info',
      reportedEntity: 'অকার্যকর ডোনার নম্বর (উত্তরা)',
      reason: 'নম্বর বন্ধ থাকে ও লোকেশন ভুল দেওয়া',
      desc: 'উত্তরা লেখা থাকলেও ফোন দিলে বলে তিনি সিলেটে অবস্থান করছেন।',
      status: 'resolved',
      date: '১ দিন আগে'
    }
  ]);

  const handleResolve = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    addToast('রিপোর্টটি সফলভাবে সমাধান (Resolved) করা হয়েছে।', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">রিপোর্ট ও অভিযোগ মডারেশন (Reports)</h1>
        <p className="text-xs text-slate-400">স্প্যাম, মিথ্যা রক্তের আবেদন ও অনুপযুক্ত ব্যবহারের তদন্ত</p>
      </div>

      <div className="space-y-4">
        {reports.map(r => (
          <div key={r.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-md">
                  {r.category === 'fake_request' ? 'মিথ্যা অনুরোধ' : 'ভুল তথ্য'}
                </span>
                <h3 className="font-bold text-white text-base mt-1">{r.reason}</h3>
                <p className="text-xs text-slate-400 mt-0.5">অভিযোগকারী: {r.reporter} • লক্ষ্যবস্তু: {r.reportedEntity}</p>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.status === 'resolved' ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'}`}>
                {r.status === 'resolved' ? '✓ সমাধানকৃত' : '⚠️ তদন্তাধীন'}
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              "{r.desc}"
            </p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">{r.date}</span>
              {r.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResolve(r.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 font-bold"
                  >
                    নিষ্পত্তি করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  const { addToast } = useToast();
  const [bannerText, setBannerText] = useState('ঢাকা মেডিকেলে ও-নেগেটিভ (O-) এবং বিএসএমএমইউতে বি-পজিটিভ (B+) রক্তের জরুরি প্রয়োজন!');
  const [helpline, setHelpline] = useState('০৯৬১২-৮৮৯৯০০');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('অ্যাডমিন কনফিগারেশন সফলভাবে আপডেট করা হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">সিস্টেম কনফিগারেশন (Settings)</h1>
        <p className="text-xs text-slate-400">জাতীয় হেল্পলাইন, নোটিফিকেশন ব্যানার ও প্ল্যাটফর্ম রুলস</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            শীর্ষ জরুরি স্ক্রল ব্যানার (Emergency Marquee Banner)
          </label>
          <input
            type="text"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-sm text-white p-3 rounded-2xl focus:border-rose-500 focus:outline-none"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            কেন্দ্রীয় সাপোর্ট হটলাইন নম্বর
          </label>
          <input
            type="text"
            value={helpline}
            onChange={(e) => setHelpline(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-sm text-white p-3 rounded-2xl focus:border-rose-500 focus:outline-none font-mono"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Button type="submit" variant="emergency" leftIcon={<Save className="w-4 h-4" />}>
            পরিবর্তন সংরক্ষণ করুন
          </Button>
        </div>
      </form>
    </div>
  );
}
