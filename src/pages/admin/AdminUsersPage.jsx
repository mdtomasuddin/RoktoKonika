import React, { useState } from 'react';
import { Users, Search, ShieldCheck, ShieldAlert, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { useToast } from '../../contexts/ToastContext';

export function AdminUsersPage() {
  const { addToast } = useToast();
  const [users, setUsers] = useState([
    { id: 'u1', name: 'মুহাম্মদ কামরুল হাসান', phone: '01712-345678', email: 'kamrul@example.com', role: 'seeker', bloodGroup: 'B+', status: 'active' },
    { id: 'u2', name: 'তানভীর আহমেদ', phone: '01711-452890', email: 'tanvir.donor@example.com', role: 'donor', bloodGroup: 'O+', status: 'active' },
    { id: 'u3', name: 'ফারহানা ইসলাম সুমি', phone: '01822-890123', email: 'farhana@example.com', role: 'donor', bloodGroup: 'A+', status: 'active' },
    { id: 'u4', name: 'সন্দেহভাজন পোস্টার', phone: '01999-000111', email: 'spam@example.com', role: 'seeker', bloodGroup: 'AB-', status: 'suspended' }
  ]);

  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextSt = u.status === 'active' ? 'suspended' : 'active';
        addToast(`ব্যবহারকারীর স্ট্যাটাস ${nextSt === 'active' ? 'সক্রিয়' : 'সাময়িক স্থগিত'} করা হয়েছে।`, 'info');
        return { ...u, status: nextSt };
      }
      return u;
    }));
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">ব্যবহারকারী তালিকা ও নিয়ন্ত্রণ (Users)</h1>
          <p className="text-xs text-slate-400">সকল গ্রাহক ও ডোনার অ্যাকাউন্টের অ্যাক্টিভেশন কন্ট্রোল</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
            className="w-full bg-slate-800 text-xs text-white border border-slate-700 px-3 py-2 rounded-xl focus:border-rose-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs text-slate-400 uppercase font-bold border-b border-slate-700">
            <tr>
              <th className="p-4">ব্যবহারকারী</th>
              <th className="p-4">যোগাযোগ</th>
              <th className="p-4">রোল</th>
              <th className="p-4">রক্তের গ্রুপ</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/50">
                <td className="p-4 font-bold text-white">{u.name}</td>
                <td className="p-4">
                  <p>{u.phone}</p>
                  <p className="text-slate-500 text-[11px]">{u.email}</p>
                </td>
                <td className="p-4 capitalize">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${u.role === 'donor' ? 'bg-rose-950 text-rose-300' : 'bg-sky-950 text-sky-300'}`}>
                    {u.role === 'donor' ? 'রক্তদাতা' : 'সেবাগ্রহীতা'}
                  </span>
                </td>
                <td className="p-4"><BloodGroupBadge bloodGroup={u.bloodGroup} size="sm" /></td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${u.status === 'active' ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'}`}>
                    {u.status === 'active' ? 'সক্রিয়' : 'স্থগিত'}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    {u.status === 'active' ? 'স্থগিত করুন' : 'সক্রিয় করুন'}
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

export function AdminDonorsPage() {
  const { addToast } = useToast();
  const [donors, setDonors] = useState([
    { id: 'd1', name: 'তানভীর আহমেদ', bloodGroup: 'O+', area: 'ধানমন্ডি', donations: 12, isVerified: true, isAvailable: true },
    { id: 'd2', name: 'ফারহানা ইসলাম সুমি', bloodGroup: 'A+', area: 'মিরপুর', donations: 6, isVerified: true, isAvailable: true },
    { id: 'd3', name: 'মাহমুদুল হাসান', bloodGroup: 'B+', area: 'পাঁচলাইশ', donations: 19, isVerified: true, isAvailable: true },
    { id: 'd4', name: 'ইশরাত জাহান লিয়া', bloodGroup: 'B+', area: 'চরপাড়া', donations: 3, isVerified: false, isAvailable: true }
  ]);

  const toggleVerify = (id) => {
    setDonors(prev => prev.map(d => {
      if (d.id === id) {
        const nextV = !d.isVerified;
        addToast(`ডোনার ভেরিফিকেশন ${nextV ? 'অনুমোদিত' : 'বাতিল'} করা হয়েছে।`, 'success');
        return { ...d, isVerified: nextV };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h1 className="text-xl sm:text-2xl font-black text-white">রক্তদাতা ভেরিফিকেশন ও তালিকা (Donors)</h1>
        <p className="text-xs text-slate-400">নিবন্ধিত ডোনারদের রক্তদান রেকর্ড ও ভেরিফাইড ব্যাজ অনুমোদন</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs text-slate-400 uppercase font-bold border-b border-slate-700">
            <tr>
              <th className="p-4">ডোনারের নাম</th>
              <th className="p-4">গ্রুপ</th>
              <th className="p-4">এলাকা</th>
              <th className="p-4">মোট রক্তদান</th>
              <th className="p-4">ভেরিফাইড স্ট্যাটাস</th>
              <th className="p-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {donors.map(d => (
              <tr key={d.id} className="hover:bg-slate-800/50">
                <td className="p-4 font-bold text-white">{d.name}</td>
                <td className="p-4"><BloodGroupBadge bloodGroup={d.bloodGroup} size="sm" /></td>
                <td className="p-4">{d.area}</td>
                <td className="p-4 font-bold text-rose-400">{d.donations} বার</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${d.isVerified ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                    {d.isVerified ? '✓ ভেরিফাইড' : 'অপেক্ষমাণ'}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleVerify(d.id)}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    {d.isVerified ? 'আন-ভেরিফাই' : 'ভেরিফাই করুন'}
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
