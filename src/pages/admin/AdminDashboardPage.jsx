import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Droplet, 
  Hospital, 
  Building2, 
  FileCheck, 
  AlertTriangle, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { adminService } from '../../services/notificationService';
import { bloodRequestService } from '../../services/bloodRequestService';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [st, reqs] = await Promise.all([
          adminService.getStats(),
          bloodRequestService.getRequests()
        ]);
        setStats(st);
        setRecentRequests(reqs.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: 'মোট ব্যবহারকারী', value: '১৪,২৮০', icon: Users, color: 'text-sky-400 bg-sky-950/50 border-sky-800' },
    { label: 'সক্রিয় রক্তদাতা', value: '৮,৪৫০', icon: Heart, color: 'text-rose-400 bg-rose-950/50 border-rose-800' },
    { label: 'সক্রিয় রক্তের অনুরোধ', value: '৪২ টি', icon: Droplet, color: 'text-red-400 bg-red-950/50 border-red-800' },
    { label: 'সফল রক্তদান', value: '৯,৪২০+', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-950/50 border-emerald-800' },
    { label: 'সংযুক্ত হাসপাতাল', value: '১৪৬ টি', icon: Hospital, color: 'text-indigo-400 bg-indigo-950/50 border-indigo-800' },
    { label: 'ব্লাড ব্যাংক নেটওয়ার্ক', value: '৩৮ টি', icon: Building2, color: 'text-amber-400 bg-amber-950/50 border-amber-800' },
    { label: 'অপেক্ষমাণ ভেরিফিকেশন', value: '১৪ টি', icon: FileCheck, color: 'text-amber-300 bg-amber-950/60 border-amber-700' },
    { label: 'মডারেশন রিপোর্ট', value: '৫ টি', icon: AlertTriangle, color: 'text-rose-400 bg-rose-950/60 border-rose-700' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">সুপার অ্যাডমিন কন্ট্রোল</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">অ্যাডমিন ওভারভিউ ও পরিসংখ্যান</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">রক্তকণিকা ডিজিটাল প্ল্যাটফর্মের কেন্দ্রীয় ব্যবস্থাপনা</p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/verifications">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
              ভেরিফিকেশন কিউ (১৪)
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
              রিপোর্টসমূহ (৫)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={`p-5 rounded-3xl border ${c.color} flex flex-col justify-between space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-bold">{c.label}</span>
                <Icon className="w-5 h-5 opacity-90" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-en">{c.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Requests Admin Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">সাম্প্রতিক রক্তের জরুরি অনুরোধসমূহ</h3>
          <Link to="/admin/blood-requests" className="text-xs font-bold text-rose-400 hover:underline">
            সকল রিকোয়েস্ট ম্যানেজ করুন →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs text-slate-400 uppercase font-bold border-b border-slate-700">
              <tr>
                <th className="p-3">রোগীর নাম</th>
                <th className="p-3">গ্রুপ</th>
                <th className="p-3">হাসপাতাল ও এলাকা</th>
                <th className="p-3">জরুরিতা</th>
                <th className="p-3">পরিমাণ</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentRequests.map(r => (
                <tr key={r.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-white">{r.patientName}</td>
                  <td className="p-3"><BloodGroupBadge bloodGroup={r.bloodGroup} size="sm" /></td>
                  <td className="p-3">{r.hospitalName} ({r.area})</td>
                  <td className="p-3"><UrgencyBadge level={r.urgencyLevel} size="sm" /></td>
                  <td className="p-3 font-bold text-rose-400">{r.unitsRequired} ব্যাগ</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link to={`/blood-requests/${r.id}`} className="text-xs font-bold text-rose-400 hover:underline">
                      ভিউ
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
