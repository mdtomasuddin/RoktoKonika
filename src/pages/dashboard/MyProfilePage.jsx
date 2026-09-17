import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Phone, Mail, MapPin, ShieldCheck, Heart, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { LocationSelector } from '../../components/common/LocationSelector';
import { useToast } from '../../contexts/ToastContext';

export function MyProfilePage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    division: user?.division || 'Dhaka',
    district: user?.district || 'Dhaka City',
    area: user?.area || 'ধানমন্ডি (Dhanmondi)',
    bio: 'স্বেচ্ছায় নিয়মিত রক্তদান করি। যেকোনো জরুরি প্রয়োজনে ঢাকায় উপস্থিত থাকার চেষ্টা করি।'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      updateProfile(formData);
      addToast('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">আমার প্রোফাইল (My Profile)</h1>
        <p className="text-xs sm:text-sm text-slate-500">আপনার যোগাযোগের তথ্য ও অবস্থান আপডেট করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 text-white font-black text-xl flex items-center justify-center border-2 border-white shadow-md">
            {formData.name?.[0] || 'ড'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{formData.name}</h3>
              <BloodGroupBadge bloodGroup={user?.bloodGroup || 'O+'} size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{formData.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="পুরো নাম"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<User className="w-4 h-4" />}
          />
          <Input
            label="মোবাইল নম্বর"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <Input
          label="ইমেইল অ্যাড্রেস"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-slate-700">বর্তমান অবস্থান</label>
          <LocationSelector
            division={formData.division}
            district={formData.district}
            area={formData.area}
            onDivisionChange={(div) => setFormData({ ...formData, division: div })}
            onDistrictChange={(dist) => setFormData({ ...formData, district: dist })}
            onAreaChange={(ar) => setFormData({ ...formData, area: ar })}
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="emergency" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            পরিবর্তন সংরক্ষণ করুন
          </Button>
        </div>
      </form>
    </div>
  );
}

export function MyBloodRequestsPage() {
  const { addToast } = useToast();
  const [requests, setRequests] = useState([
    {
      id: 'req-my-1',
      patientName: 'বেগম রাজিয়া সুলতানা',
      hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      bloodGroup: 'O+',
      unitsRequired: 2,
      unitsCollected: 1,
      urgencyLevel: 'critical',
      status: 'active',
      date: '2026-09-18',
      respondedDonors: [
        { name: 'তানভীর আহমেদ', phone: '01711-452890', time: '১০ মিনিট আগে' }
      ]
    },
    {
      id: 'req-my-2',
      patientName: 'মুহাম্মদ রফিকুল ইসলাম',
      hospitalName: 'রাজশাহী মেডিকেল কলেজ',
      bloodGroup: 'A-',
      unitsRequired: 1,
      unitsCollected: 1,
      urgencyLevel: 'normal',
      status: 'fulfilled',
      date: '2026-08-10',
      respondedDonors: []
    }
  ]);

  const handleMarkFulfilled = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'fulfilled', unitsCollected: r.unitsRequired } : r));
    addToast('অনুরোধটি সম্পন্ন (Fulfilled) হিসেবে চিহ্নিত করা হয়েছে।', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">আমার রক্তের অনুরোধসমূহ (My Requests)</h1>
          <p className="text-xs sm:text-sm text-slate-500">আপনার তৈরি করা রক্তের পোস্ট ও রক্তদাতার সাড়ার তালিকা</p>
        </div>
        <a href="/request-blood">
          <Button variant="emergency" size="sm">নতুন অনুরোধ দিন</Button>
        </a>
      </div>

      <div className="space-y-4">
        {requests.map(req => (
          <div key={req.id} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <BloodGroupBadge bloodGroup={req.bloodGroup} size="md" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{req.patientName}</h3>
                  <p className="text-xs text-slate-500">{req.hospitalName} • {req.date}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${req.status === 'fulfilled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {req.status === 'fulfilled' ? '✓ সম্পন্ন হয়েছে' : '⏳ সক্রিয় আছে'}
              </span>
            </div>

            {/* Donor responses */}
            {req.respondedDonors.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                <span className="text-xs font-bold text-rose-900 block">রক্তদাতার সাড়া পেয়েছেন ({req.respondedDonors.length} জন):</span>
                {req.respondedDonors.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-rose-200/60">
                    <div>
                      <strong className="text-slate-900">{d.name}</strong>
                      <span className="text-slate-500 ml-2 font-mono">ফোন: {d.phone}</span>
                    </div>
                    <a href={`tel:${d.phone}`} className="text-emerald-700 font-bold hover:underline">
                      সরাসরি কল
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">প্রয়োজন: <strong>{req.unitsRequired} ব্যাগ</strong> (সংগ্রহ: {req.unitsCollected} ব্যাগ)</span>
              {req.status !== 'fulfilled' && (
                <Button variant="outline" size="sm" onClick={() => handleMarkFulfilled(req.id)} className="text-xs">
                  সম্পন্ন হিসেবে চিহ্নিত করুন
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
