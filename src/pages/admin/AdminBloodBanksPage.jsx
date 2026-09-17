import React, { useState } from 'react';
import { Building2, ShieldCheck, Database, Edit, CheckCircle2, XCircle, FileText, AlertTriangle } from 'lucide-react';
import { MOCK_BLOOD_BANKS } from '../../mocks/bloodBanks';
import { BLOOD_GROUPS } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export function AdminBloodBanksPage() {
  const { addToast } = useToast();
  const [banks, setBanks] = useState(MOCK_BLOOD_BANKS);
  const [selectedBank, setSelectedBank] = useState(null);

  const handleStockUpdate = (bankId, group, nextStatus) => {
    setBanks(prev => prev.map(b => {
      if (b.id === bankId) {
        return {
          ...b,
          lastStockUpdated: 'এইমাত্র',
          stock: { ...b.stock, [group]: nextStatus }
        };
      }
      return b;
    }));
    addToast(`${group} রক্তের স্টক আপডেট করা হয়েছে: ${nextStatus}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">ব্লাড ব্যাংক ও ইনভেন্টরি স্টক (Blood Banks & Inventory)</h1>
        <p className="text-xs text-slate-400">অনুমোদিত রক্তকেন্দ্রের রক্তের গ্রুপভিত্তিক স্টক পরিচালনা ও আপডেট</p>
      </div>

      <div className="space-y-4">
        {banks.map(bank => (
          <div key={bank.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-base">{bank.banglaName}</h3>
                <p className="text-xs text-slate-400">{bank.address} • হটলাইন: {bank.emergencyPhone || bank.phone}</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">আপডেট: {bank.lastStockUpdated}</span>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400 block mb-2">৮টি রক্তের গ্রুপে সরাসরি স্টক টগল:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map(bg => {
                  const currentSt = bank.stock[bg];
                  const nextMap = {
                    available: 'low',
                    low: 'critical',
                    critical: 'unavailable',
                    unavailable: 'available'
                  };

                  const colorMap = {
                    available: 'bg-emerald-950 text-emerald-300 border-emerald-800',
                    low: 'bg-amber-950 text-amber-300 border-amber-800',
                    critical: 'bg-rose-950 text-rose-300 border-rose-800',
                    unavailable: 'bg-slate-800 text-slate-500 border-slate-700'
                  };

                  return (
                    <button
                      key={bg}
                      onClick={() => handleStockUpdate(bank.id, bg, nextMap[currentSt] || 'available')}
                      className={`p-2 rounded-xl border text-center transition-all hover:scale-105 ${colorMap[currentSt] || colorMap.unavailable}`}
                    >
                      <span className="font-bold text-xs block">{bg}</span>
                      <span className="text-[10px] block opacity-90">{currentSt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminVerificationsPage() {
  const { addToast } = useToast();
  const [verifications, setVerifications] = useState([
    {
      id: 'v1',
      name: 'ইশরাত জাহান লিয়া (ডোনার)',
      type: 'donor',
      details: 'এনআইডি ও ময়মনসিংহ মেডিকেল কলেজের স্টুডেন্ট আইডি কার্ড যাচাই।',
      date: '২০২৬-০৯-১৭ ১২:৩০',
      status: 'pending'
    },
    {
      id: 'v2',
      name: 'মুহাম্মদ কামরুল হাসান (রক্তের অনুরোধ)',
      type: 'request',
      details: 'ট্রমা সার্জারির জন্য হাসপাতালের সিলসহ ৩ ব্যাগ রক্তের রিকুইজিশন স্লিপ।',
      date: '২০২৬-০৯-১৭ ১৪:০০',
      status: 'pending'
    }
  ]);

  const handleAction = (id, newStatus) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    addToast(newStatus === 'verified' ? 'আবেদন সফলভাবে অনুমোদন (Approve) করা হয়েছে।' : 'আবেদনটি বাতিল করা হয়েছে।', newStatus === 'verified' ? 'success' : 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">ভেরিফিকেশন কিউ (Verification Queue)</h1>
        <p className="text-xs text-slate-400">নতুন ডোনার আইডি ও প্রেসক্রিপশন স্লিপ যাচাইকরণ</p>
      </div>

      <div className="space-y-4">
        {verifications.map(v => (
          <div key={v.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-md">
                  {v.type === 'donor' ? 'ডোনার এনআইডি' : 'মেডিকেল প্রেসক্রিপশন'}
                </span>
                <h3 className="font-bold text-white text-base mt-1">{v.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{v.details}</p>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${v.status === 'verified' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                {v.status === 'verified' ? '✓ অনুমোদিত' : '⏳ অপেক্ষমাণ'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">জমা দেওয়ার সময়: {v.date}</span>
              {v.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(v.id, 'rejected')}
                    className="px-3 py-1.5 rounded-xl bg-red-950 text-red-300 hover:bg-red-900 font-bold"
                  >
                    প্রত্যাখ্যান
                  </button>
                  <button
                    onClick={() => handleAction(v.id, 'verified')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 font-bold"
                  >
                    অনুমোদন করুন
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
