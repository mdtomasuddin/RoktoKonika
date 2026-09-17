import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Hospital, 
  MapPin, 
  Clock, 
  Phone, 
  Share2, 
  ShieldCheck, 
  User, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  HeartHandshake,
  Calendar,
  Building2,
  FileText
} from 'lucide-react';
import { bloodRequestService } from '../../services/bloodRequestService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../contexts/ToastContext';

export function BloodRequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donorPhone, setDonorPhone] = useState('');
  const [donorNote, setDonorNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadRequest() {
      setLoading(true);
      try {
        const data = await bloodRequestService.getRequestById(id);
        setRequest(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadRequest();
  }, [id]);

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bloodRequestService.respondToRequest(request.id, { phone: donorPhone, note: donorNote });
      addToast('ধন্যবাদ! রোগীর যোগাযোগের নম্বরে আপনার আগ্রহ পাঠানো হয়েছে।', 'success');
      setDonateModalOpen(false);
      setDonorPhone('');
      setDonorNote('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `জরুরি রক্তের প্রয়োজন: ${request.bloodGroup}`,
        text: `${request.hospitalName} এ রোগীর জন্য ${request.bloodGroup} রক্ত প্রয়োজন।`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('অনুরোধের লিংক কপি করা হয়েছে!', 'info');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">রক্তের অনুরোধটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500">অনুরোধটি হয়তো মুছে ফেলা হয়েছে অথবা মেয়াদ উত্তীর্ণ হয়েছে।</p>
        <Link to="/blood-requests">
          <Button variant="outline">সকল অনুরোধ দেখুন</Button>
        </Link>
      </div>
    );
  }

  const isFulfilled = request.status === 'fulfilled';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & actions */}
      <div className="flex items-center justify-between">
        <Link to="/blood-requests" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> অনুরোধসমূহে ফিরে যান
        </Link>
        <Button variant="outline" size="sm" onClick={handleShare} leftIcon={<Share2 className="w-4 h-4" />}>
          শেয়ার করুন
        </Button>
      </div>

      {/* Main Request Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Header Hero Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BloodGroupBadge bloodGroup={request.bloodGroup} size="xl" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <UrgencyBadge level={request.urgencyLevel} size="sm" />
                {request.isPrescriptionVerified && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" /> প্রেসক্রিপশন ভেরিফাইড
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black">{request.patientName}</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                কারণ: {request.reason} • লিঙ্গ: {request.gender} ({request.patientAge} বছর)
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-800/80 p-4 rounded-2xl border border-slate-700 w-full sm:w-auto">
            <span className="text-xs text-slate-400 block font-medium">রক্তের পরিমাণ প্রয়োজন</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-400">{request.unitsRequired} ব্যাগ</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              (সংগ্রহ হয়েছে: {request.unitsCollected} ব্যাগ)
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital & Location */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Hospital className="w-4 h-4 text-rose-600" /> হাসপাতালের অবস্থান
              </h3>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                <p className="font-bold text-slate-900 text-base">{request.hospitalName}</p>
                <p className="flex items-start gap-1.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{request.hospitalAddress}</span>
                </p>
                {request.roomOrBed && (
                  <p className="text-slate-600 pl-5">ওয়ার্ড / কেবিন: <strong>{request.roomOrBed}</strong></p>
                )}
              </div>
            </div>

            {/* Timing & Urgency */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" /> সময় ও যোগাযোগের বিবরণ
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>প্রয়োজনীয় তারিখ: <strong>{request.requiredDate}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>প্রয়োজনীয় সময়: <strong>{request.requiredTime}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>যোগাযোগের ব্যক্তি: <strong>{request.contactPerson}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>ফোন: <a href={`tel:${request.contactPhone}`} className="font-bold text-emerald-700 hover:underline">{request.contactPhone}</a></span>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {request.additionalNotes && (
            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" /> রোগীর স্বজনের বার্তা
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {request.additionalNotes}
              </p>
            </div>
          )}

          {/* Safety Notice Component */}
          <SafetyNoticeCard type="transfusion" />

          {/* CTA Action Bottom Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            {!isFulfilled ? (
              <Button
                variant="emergency"
                size="lg"
                className="w-full sm:w-auto text-base shadow-xl"
                leftIcon={<HeartHandshake className="w-5 h-5" />}
                onClick={() => setDonateModalOpen(true)}
              >
                আমি রক্ত দিতে চাই (I Can Donate)
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
                <span>এই অনুরোধের রক্ত সংগ্রহ সফলভাবে সম্পন্ন হয়েছে।</span>
              </div>
            )}

            <a href={`tel:${request.contactPhone}`} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full" leftIcon={<Phone className="w-5 h-5 text-emerald-600" />}>
                সরাসরি কল করুন
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Donate Intent Modal */}
      {donateModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setDonateModalOpen(false)}
          title="রক্তদানের আগ্রহ নিবন্ধন"
          subtitle={`রোগী: ${request.patientName} (${request.bloodGroup})`}
        >
          <form onSubmit={handleDonateSubmit} className="space-y-4">
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950">
              রোগীর জরুরি প্রয়োজনে এগিয়ে আসার জন্য ধন্যবাদ। আপনার ফোন নম্বরটি রোগীর পরিবারের কাছে পাঠানো হবে।
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার মোবাইল নম্বর <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বার্তা / পৌঁছানোর সময় (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={donorNote}
                onChange={(e) => setDonorNote(e.target.value)}
                placeholder="যেমন: আমি হাসপাতালে আসছি, আমাকে ফোন দিন..."
                className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setDonateModalOpen(false)}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                variant="emergency"
                className="flex-1"
                isLoading={isSubmitting}
              >
                নিশ্চিত করুন
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
