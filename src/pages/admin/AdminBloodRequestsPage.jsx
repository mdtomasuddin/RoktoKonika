import React, { useState, useEffect } from 'react';
import { Droplet, Search, Filter, ShieldCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { bloodRequestService } from '../../services/bloodRequestService';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { useToast } from '../../contexts/ToastContext';

export function AdminBloodRequestsPage() {
  const { addToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await bloodRequestService.getRequests();
        setRequests(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    addToast(`অনুরোধের স্ট্যাটাস ${newStatus} করা হয়েছে।`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">রক্তের সকল অনুরোধসমূহ (Blood Requests)</h1>
        <p className="text-xs text-slate-400">জরুরি ও সাধারণ সকল রক্তের আবেদনের মডারেশন ও স্ট্যাটাস আপডেট</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs text-slate-400 uppercase font-bold border-b border-slate-700">
            <tr>
              <th className="p-4">রোগীর নাম</th>
              <th className="p-4">গ্রুপ</th>
              <th className="p-4">হাসপাতাল ও অবস্থান</th>
              <th className="p-4">জরুরিতা</th>
              <th className="p-4">পরিমাণ</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {requests.map(r => (
              <tr key={r.id} className="hover:bg-slate-800/50">
                <td className="p-4 font-bold text-white">
                  {r.patientName}
                  <span className="block text-[11px] text-slate-400">{r.contactPhone}</span>
                </td>
                <td className="p-4"><BloodGroupBadge bloodGroup={r.bloodGroup} size="sm" /></td>
                <td className="p-4">
                  <p className="font-semibold">{r.hospitalName}</p>
                  <p className="text-[11px] text-slate-500">{r.area}, {r.district}</p>
                </td>
                <td className="p-4"><UrgencyBadge level={r.urgencyLevel} size="sm" /></td>
                <td className="p-4 font-bold text-rose-400">{r.unitsRequired} ব্যাগ</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${r.status === 'fulfilled' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    {r.status !== 'fulfilled' && (
                      <button
                        onClick={() => handleUpdateStatus(r.id, 'fulfilled')}
                        className="px-2 py-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs rounded-lg font-bold"
                      >
                        সম্পন্ন
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateStatus(r.id, 'cancelled')}
                      className="px-2 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs rounded-lg font-bold"
                    >
                      বাতিল
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminHospitalsPage() {
  const { addToast } = useToast();
  const [hospitals, setHospitals] = useState([
    { id: 'h1', name: 'ঢাকা মেডিকেল কলেজ হাসপাতাল', division: 'Dhaka', hasICU: true, hasBloodBank: true, helpline: '+880255165088' },
    { id: 'h2', name: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়', division: 'Dhaka', hasICU: true, hasBloodBank: true, helpline: '+88029661051' },
    { id: 'h3', name: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল', division: 'Chattogram', hasICU: true, hasBloodBank: true, helpline: '+88031619400' }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">সংযুক্ত হাসপাতালসমূহ (Hospitals)</h1>
          <p className="text-xs text-slate-400">হাসপাতাল তথ্য, আইসিইউ সুবিধা ও জরুরি হেল্পলাইন তালিকা</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs text-slate-400 uppercase font-bold border-b border-slate-700">
            <tr>
              <th className="p-4">হাসপাতালের নাম</th>
              <th className="p-4">বিভাগ</th>
              <th className="p-4">আইসিইউ</th>
              <th className="p-4">ব্লাড ব্যাংক</th>
              <th className="p-4">হেল্পলাইন</th>
              <th className="p-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {hospitals.map(h => (
              <tr key={h.id} className="hover:bg-slate-800/50">
                <td className="p-4 font-bold text-white">{h.name}</td>
                <td className="p-4">{h.division}</td>
                <td className="p-4">
                  <span className="text-emerald-400 font-bold">{h.hasICU ? '✓ হ্যাঁ' : 'না'}</span>
                </td>
                <td className="p-4">
                  <span className="text-sky-400 font-bold">{h.hasBloodBank ? '✓ সংযুক্ত' : 'না'}</span>
                </td>
                <td className="p-4 font-mono">{h.helpline}</td>
                <td className="p-4">
                  <button className="text-xs font-bold text-rose-400 hover:underline">
                    সম্পাদনা
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
