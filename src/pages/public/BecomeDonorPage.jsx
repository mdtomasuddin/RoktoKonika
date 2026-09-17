import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Activity, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import { donorService } from '../../services/donorService';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { LocationSelector } from '../../components/common/LocationSelector';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';
import { useToast } from '../../contexts/ToastContext';

export function BecomeDonorPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  // Eligibility Quiz State
  const [eligibility, setEligibility] = useState({
    ageOver18: true,
    weightOver45: true,
    lastDonation90Days: true,
    noMajorIllness: true
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bloodGroup: 'O+',
    gender: 'পুরুষ',
    age: '24',
    weightKg: '65',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'ধানমন্ডি (Dhanmondi)',
    preferredRadiusKm: 15,
    lastDonationDate: '',
    totalDonations: '0',
    bio: '',
    allowDirectCalls: true,
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const isEligible = 
    eligibility.ageOver18 && 
    eligibility.weightOver45 && 
    eligibility.lastDonation90Days && 
    eligibility.noMajorIllness;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'আপনার নাম আবশ্যক';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'সঠিক মোবাইল নম্বর দিন';
    if (!formData.division) errs.division = 'বিভাগ নির্বাচন করুন';
    if (!formData.district) errs.district = 'জেলা নির্বাচন করুন';
    if (!formData.consent) errs.consent = 'সম্মতি চেকবক্সে টিক দিন';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('অনুগ্রহ করে প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      await donorService.registerDonor(formData);
      setIsRegistered(true);
      addToast('অভিনন্দন! আপনি সফলভাবে রক্তদাতা হিসেবে নিবন্ধিত হয়েছেন।', 'success');
    } catch (e) {
      console.error(e);
      addToast('নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border-2 border-rose-200 shadow-xl">
          <HeartHandshake className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">স্বাগতম লাইফ সেভার</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            রক্তকণিকা পরিবারের রক্তদাতা হিসেবে আপনি যুক্ত হয়েছেন!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            ধন্যবাদ <strong>{formData.name}</strong>। আপনার রক্তদানের মহান সিদ্ধান্ত বাংলাদেশের মুমূর্ষু রোগীর প্রাণ বাঁচাতে গুরুত্বপূর্ণ ভূমিকা রাখবে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/donors" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full">
              রক্তদাতাদের তালিকায় দেখুন
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              ডোনার ড্যাশবোর্ডে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          রক্তদাতা হিসেবে যুক্ত হোন
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          প্রতি ৪ মাস পর পর সুস্থ মানুষ নিয়মিত রক্তদান করতে পারেন। আপনার রক্তদানের মাধ্যমে বিপদে মানুষের পাশে দাঁড়ান।
        </p>
      </div>

      {/* Step 1: Interactive Eligibility Quiz */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-600" /> রক্তদানের প্রাথমিক যোগ্যতা যাচাই (Eligibility Check)
          </h2>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${isEligible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
            {isEligible ? '✓ আপনি রক্তদানে উপযুক্ত' : '⚠️ কিছু শর্ত পূরণ হয়নি'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={eligibility.ageOver18}
              onChange={(e) => setEligibility({ ...eligibility, ageOver18: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">বয়স ১৮ থেকে ৬০ বছরের মধ্যে</span>
              <span className="text-slate-500">শারীরিকভাবে সুস্থ ও সাবালক</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={eligibility.weightOver45}
              onChange={(e) => setEligibility({ ...eligibility, weightOver45: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">ওজন কমপক্ষে ৪৫ কেজি বা তদূর্ধ্ব</span>
              <span className="text-slate-500">মহিলাদের ক্ষেত্রে কমপক্ষে ৪৫ কেজি, পুরুষদের ৫০ কেজি</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={eligibility.lastDonation90Days}
              onChange={(e) => setEligibility({ ...eligibility, lastDonation90Days: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">সর্বশেষ রক্তদানের পর ৩-৪ মাস অতিবাহিত</span>
              <span className="text-slate-500">অথবা জীবনে পূর্বে কখনোই রক্তদান করেননি</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={eligibility.noMajorIllness}
              onChange={(e) => setEligibility({ ...eligibility, noMajorIllness: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">রক্তবাহিত কোনো জটিল রোগ নেই</span>
              <span className="text-slate-500">জন্ডিস, হেপাটাইটিস বি/সি বা কোনো দীর্ঘমেয়াদি অ্যান্টিবায়োটিক নয়</span>
            </div>
          </label>
        </div>
      </div>

      <SafetyNoticeCard type="donor_privacy" />

      {/* Step 2: Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-rose-600" /> ব্যক্তিগত বিবরণ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="আপনার পুরো নাম"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="যেমন: তানভীর আহমেদ"
              error={errors.name}
            />
            <Input
              label="মোবাইল নম্বর"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="017XXXXXXXX"
              error={errors.phone}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="ইমেইল (ঐচ্ছিক)"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
            />
            <Select
              label="লিঙ্গ"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={['পুরুষ', 'মহিলা', 'অন্যান্য']}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="বয়স"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <Input
                label="ওজন (কেজি)"
                type="number"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              আপনার রক্তের গ্রুপ <span className="text-rose-500">*</span>
            </label>
            <BloodGroupSelector
              value={formData.bloodGroup}
              onChange={(bg) => setFormData({ ...formData, bloodGroup: bg })}
            />
          </div>
        </div>

        {/* Location & Radius */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-rose-600" /> এলাকা ও রক্তদানের ব্যাসার্ধ
          </h2>

          <LocationSelector
            division={formData.division}
            district={formData.district}
            area={formData.area}
            onDivisionChange={(div) => setFormData({ ...formData, division: div })}
            onDistrictChange={(dist) => setFormData({ ...formData, district: dist })}
            onAreaChange={(ar) => setFormData({ ...formData, area: ar })}
            required
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              সর্বোচ্চ কত দূরত্বের মধ্যে গিয়ে রক্ত দিতে ইচ্ছুক?
            </label>
            <Select
              value={formData.preferredRadiusKm}
              onChange={(e) => setFormData({ ...formData, preferredRadiusKm: Number(e.target.value) })}
              options={[
                { value: 5, label: '৫ কি.মি. (শুধুমাত্র নিজস্ব এলাকা)' },
                { value: 15, label: '১৫ কি.মি. (শহরের প্রধান এলাকা)' },
                { value: 30, label: '৩০ কি.মি. (সমগ্র মহানগর)' },
                { value: 50, label: '৫০ কি.মি. (জরুরি প্রয়োজনে যেকোনো জায়গায়)' }
              ]}
            />
          </div>
        </div>

        {/* Donation History */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-rose-600" /> রক্তদানের পূর্ব ইতিহাস
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="সর্বশেষ রক্তদানের তারিখ (যদি পূর্বে দিয়ে থাকেন)"
              type="date"
              value={formData.lastDonationDate}
              onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
            />
            <Input
              label="মোট কতবার রক্ত দিয়েছেন?"
              type="number"
              value={formData.totalDonations}
              onChange={(e) => setFormData({ ...formData, totalDonations: e.target.value })}
              placeholder="0"
            />
          </div>

          <Textarea
            label="নিজের সম্পর্কে সংক্ষিপ্ত তথ্য বা বার্তা (ঐচ্ছিক)"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="যেমন: আমি ঢাকা বিশ্ববিদ্যালয়ের শিক্ষার্থী, ক্যাম্পাসের আশেপাশে জরুরি প্রয়োজনে রক্তদান করতে পারি..."
            rows={2}
          />
        </div>

        {/* Privacy & Consent */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Lock className="w-5 h-5 text-rose-600" /> গোপনীয়তা ও সম্মতি
          </h2>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowDirectCalls}
                onChange={(e) => setFormData({ ...formData, allowDirectCalls: e.target.checked })}
                className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs text-slate-700">
                জরুরি প্রয়োজনে রোগীদের রক্তকণিকা প্ল্যাটফর্ম থেকে আমাকে সরাসরি কলের অনুরোধ পাঠানোর অনুমতি দিচ্ছি।
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs font-semibold text-slate-900">
                আমি স্বেচ্ছায় রক্তদাতা হিসেবে নিবন্ধন করছি এবং নিশ্চিত করছি যে আমার প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। <span className="text-rose-500">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-xs text-rose-600 font-bold">{errors.consent}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            বাতিল
          </Button>
          <Button
            type="submit"
            variant="emergency"
            size="lg"
            isLoading={isSubmitting}
            className="px-8 shadow-xl"
          >
            ডোনার হিসেবে যোগ দিন →
          </Button>
        </div>
      </form>
    </div>
  );
}
