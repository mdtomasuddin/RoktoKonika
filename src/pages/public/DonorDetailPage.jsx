import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Phone, 
  HeartHandshake, 
  ArrowLeft, 
  Award, 
  Star, 
  Clock,
  MessageSquare
} from 'lucide-react';
import { donorService } from '../../services/donorService';
import { Button } from '../../components/ui/Button';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../contexts/ToastContext';

export function DonorDetailPage() {
  const { id } = useParams();
  const { addToast } = useToast();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [patientDetail, setPatientDetail] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function loadDonor() {
      setLoading(true);
      try {
        const data = await donorService.getDonorById(id);
        setDonor(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDonor();
  }, [id]);

  const handleSendRequest = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setRequestModalOpen(false);
      setPatientDetail('');
      addToast(`ডোনার ${donor.name}-এর কাছে সফলভাবে অনুরোধের বার্তা পাঠানো হয়েছে।`, 'success');
    }, 500);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">রক্তদাতা খুঁজে পাওয়া যায়নি</h2>
        <Link to="/donors">
          <Button variant="outline">সকল ডোনার তালিকা দেখুন</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link to="/donors" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> ডোনার তালিকায় ফিরে যান
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={donor.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
            alt={donor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white/20 shadow-xl"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <BloodGroupBadge bloodGroup={donor.bloodGroup} size="lg" />
              {donor.isVerified && (
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড রক্তদাতা
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">{donor.name}</h1>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-4 h-4 text-rose-400" /> {donor.area}, {donor.district}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-950/70 border border-rose-800 px-3 py-1 rounded-xl">
                <Award className="w-4 h-4 text-rose-400" /> {donor.badgeLevel} ({donor.totalDonations} বার রক্তদান)
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 block">বর্তমান স্ট্যাটাস</span>
              <span className={`text-sm font-bold block mt-1 ${donor.isAvailable ? 'text-emerald-700' : 'text-slate-500'}`}>
                {donor.isAvailable ? 'রক্তদানে প্রস্তুত' : 'সাময়িক বিরতিতে'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 block">সর্বশেষ রক্তদান</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">
                {donor.lastDonationDate || 'নতুন রক্তদাতা'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 block">রেসপন্স রেট</span>
              <span className="text-sm font-bold text-rose-600 block mt-1 font-mono">
                {donor.responseRatePercentage}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 block">রক্তদানের ব্যাসার্ধ</span>
              <span className="text-sm font-bold text-slate-900 block mt-1 font-mono">
                {donor.preferredRadiusKm} কি.মি.
              </span>
            </div>
          </div>

          {/* Bio */}
          {donor.bio && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">ডোনার সম্পর্কে</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{donor.bio}</p>
            </div>
          )}

          <SafetyNoticeCard type="donor_privacy" />

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="emergency"
              size="lg"
              className="w-full sm:w-auto shadow-xl"
              leftIcon={<HeartHandshake className="w-5 h-5" />}
              onClick={() => setRequestModalOpen(true)}
            >
              রক্তের আবেদন পাঠান (Request Help)
            </Button>
            <Link to="/request-blood" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                সরাসরি রিকোয়েস্ট পোস্ট করুন
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Request Help Modal */}
      {requestModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setRequestModalOpen(false)}
          title={`ডোনার ${donor.name}-এর কাছে আবেদন`}
          subtitle={`গ্রুপ: ${donor.bloodGroup} | এলাকা: ${donor.area}`}
        >
          <form onSubmit={handleSendRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                রোগীর নাম, হাসপাতালের নাম ও বিস্তারিত বার্তা <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={patientDetail}
                onChange={(e) => setPatientDetail(e.target.value)}
                placeholder="যেমন: রোগী ঢাকা মেডিকেলে আছেন, আগামীকাল ১ ব্যাগ রক্তের প্রয়োজন..."
                className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setRequestModalOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit" variant="emergency" className="flex-1" isLoading={isSending}>
                আবেদন পাঠান
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
