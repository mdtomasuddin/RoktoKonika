import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Hospital, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldAlert, 
  User, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { bloodRequestService } from '../../services/bloodRequestService';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { LocationSelector } from '../../components/common/LocationSelector';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';
import { Modal } from '../../components/ui/Modal';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { useToast } from '../../contexts/ToastContext';
import { BLOOD_GROUPS } from '../../constants';

export function RequestBloodPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    gender: 'পুরুষ',
    bloodGroup: 'O+',
    unitsRequired: 1,
    hospitalName: '',
    hospitalAddress: '',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'ধানমন্ডি (Dhanmondi)',
    roomOrBed: '',
    requiredDate: new Date().toISOString().split('T')[0],
    requiredTime: 'জরুরি ভিত্তিতে',
    urgencyLevel: 'critical',
    reason: 'অস্ত্রোপচার',
    contactPerson: '',
    contactPhone: '',
    altContactPhone: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const validateForm = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = 'রোগীর নাম আবশ্যক';
    if (!formData.patientAge) errs.patientAge = 'বয়স প্রদান করুন';
    if (!formData.hospitalName.trim()) errs.hospitalName = 'হাসপাতালের নাম আবশ্যক';
    if (!formData.division) errs.division = 'বিভাগ নির্বাচন করুন';
    if (!formData.district) errs.district = 'জেলা নির্বাচন করুন';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'যোগাযোগের ব্যক্তির নাম দিন';
    if (!formData.contactPhone.trim() || formData.contactPhone.length < 10) {
      errs.contactPhone = 'সঠিক মোবাইল নম্বর আবশ্যক';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmModalOpen(true);
    } else {
      addToast('অনুগ্রহ করে ফরমের প্রয়োজনীয় তথ্যগুলো সঠিকভাবে পূরণ করুন', 'warning');
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const created = await bloodRequestService.createRequest(formData);
      setSubmittedRequest(created);
      setConfirmModalOpen(false);
      addToast('রক্তের অনুরোধটি সফলভাবে পোস্ট করা হয়েছে!', 'success');
    } catch (e) {
      console.error(e);
      addToast('অনুরোধ তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If submitted successfully, show celebration state
  if (submittedRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">পোস্ট সফল হয়েছে</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            রক্তের অনুরোধ সফলভাবে সম্প্রচারিত হয়েছে!
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            রোগী <strong>{submittedRequest.patientName}</strong>-এর জন্য <strong>{submittedRequest.bloodGroup}</strong> রক্তের অনুরোধটি নিকটস্থ রক্তদাতাদের প্ল্যাটফর্ম ফিডে পাঠানো হয়েছে।
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-left space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs text-slate-500 font-bold">অনুরোধ আইডি:</span>
            <span className="text-xs font-mono font-bold text-slate-900">{submittedRequest.id}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs text-slate-500 font-bold">হাসপাতাল:</span>
            <span className="text-xs font-bold text-slate-900">{submittedRequest.hospitalName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">প্রয়োজনীয় সময়:</span>
            <span className="text-xs font-bold text-rose-600">{submittedRequest.requiredDate} ({submittedRequest.requiredTime})</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to={`/blood-requests/${submittedRequest.id}`} className="w-full sm:w-auto">
            <Button variant="emergency" size="lg" className="w-full">
              অনুরোধের বিস্তারিত দেখুন
            </Button>
          </Link>
          <Link to="/blood-requests" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              সকল অনুরোধ তালিকা
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <PlusCircle className="w-4 h-4" />
          জরুরি রক্তের ফরম
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          রক্তের অনুরোধ পোস্ট করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন যেন নিকটস্থ আগ্রহী রক্তদাতারা দ্রুত আপনার সাথে যোগাযোগ করতে পারে।
        </p>
      </div>

      <SafetyNoticeCard type="transfusion" />

      {/* Main Form Box */}
      <form onSubmit={handleOpenConfirm} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Section 1: Patient Details */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-rose-600" /> ১. রোগীর তথ্য ও প্রয়োজনীয় রক্ত
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="রোগীর পুরো নাম"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="যেমন: মো. আব্দুল করিম"
              error={errors.patientName}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="রোগীর বয়স (বছর)"
                type="number"
                required
                value={formData.patientAge}
                onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                placeholder="যেমন: ৩২"
                error={errors.patientAge}
              />
              <Select
                label="লিঙ্গ"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                options={['পুরুষ', 'মহিলা', 'শিশু']}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              রক্তের গ্রুপ <span className="text-rose-500">*</span>
            </label>
            <BloodGroupSelector
              value={formData.bloodGroup}
              onChange={(bg) => setFormData({ ...formData, bloodGroup: bg })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Select
              label="রক্তের পরিমাণ (ব্যাগ সংখ্যা)"
              required
              value={formData.unitsRequired}
              onChange={(e) => setFormData({ ...formData, unitsRequired: Number(e.target.value) })}
              options={[
                { value: 1, label: '১ ব্যাগ' },
                { value: 2, label: '২ ব্যাগ' },
                { value: 3, label: '৩ ব্যাগ' },
                { value: 4, label: '৪ ব্যাগ' },
                { value: 5, label: '৫+ ব্যাগ' }
              ]}
            />
            <Select
              label="রক্তের প্রয়োজনীয়তার কারণ"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              options={[
                'অস্ত্রোপচার',
                'থ্যালাসেমিয়া',
                'দুর্ঘটনা / ট্রমা',
                'প্রসূতি মা (সিজারিয়ান)',
                'ক্যান্সার / কেমোথেরাপি',
                'ডেঙ্গু / প্লাটিলেট',
                'অন্যান্য'
              ]}
            />
          </div>
        </div>

        {/* Section 2: Hospital & Location */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Hospital className="w-5 h-5 text-rose-600" /> ২. হাসপাতাল ও অবস্থান
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="হাসপাতালের নাম"
              required
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল"
              error={errors.hospitalName}
            />
            <Input
              label="কেবিন / ওয়ার্ড / বেড নং (ঐচ্ছিক)"
              value={formData.roomOrBed}
              onChange={(e) => setFormData({ ...formData, roomOrBed: e.target.value })}
              placeholder="যেমন: আইসিইউ বেড নং ০৪ / ওয়ার্ড ৮"
            />
          </div>

          <LocationSelector
            division={formData.division}
            district={formData.district}
            area={formData.area}
            onDivisionChange={(div) => setFormData({ ...formData, division: div })}
            onDistrictChange={(dist) => setFormData({ ...formData, district: dist })}
            onAreaChange={(ar) => setFormData({ ...formData, area: ar })}
            required
          />

          <Input
            label="হাসপাতালের বিস্তারিত ঠিকানা / ল্যান্ডমার্ক"
            value={formData.hospitalAddress}
            onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
            placeholder="যেমন: নতুন ভবন ৪র্থ তলা, বক্শীবাজার রোড, ঢাকা"
          />
        </div>

        {/* Section 3: Time & Urgency */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Clock className="w-5 h-5 text-rose-600" /> ৩. সময় ও জরুরিতা
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="রক্তদানের তারিখ"
              type="date"
              required
              value={formData.requiredDate}
              onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
            />
            <Input
              label="প্রয়োজনীয় সময়"
              required
              value={formData.requiredTime}
              onChange={(e) => setFormData({ ...formData, requiredTime: e.target.value })}
              placeholder="যেমন: সকাল ১০:০০ টা / জরুরি ভিত্তিতে"
            />
            <Select
              label="জরুরিতার মাত্রা"
              value={formData.urgencyLevel}
              onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
              options={[
                { value: 'critical', label: 'অত্যন্ত জরুরি (Critical)' },
                { value: 'urgent', label: 'জরুরি (Urgent)' },
                { value: 'normal', label: 'সাধারণ (Normal)' }
              ]}
            />
          </div>
        </div>

        {/* Section 4: Contact & Attendant */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-5 h-5 text-rose-600" /> ৪. যোগাযোগের বিবরণ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="যোগাযোগের ব্যক্তির নাম"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="যেমন: তানভীর আহমেদ (ভাই)"
              error={errors.contactPerson}
            />
            <Input
              label="মোবাইল নম্বর"
              type="tel"
              required
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              placeholder="017XXXXXXXX"
              error={errors.contactPhone}
            />
            <Input
              label="বিকল্প মোবাইল নম্বর (ঐচ্ছিক)"
              type="tel"
              value={formData.altContactPhone}
              onChange={(e) => setFormData({ ...formData, altContactPhone: e.target.value })}
              placeholder="018XXXXXXXX"
            />
          </div>

          <Textarea
            label="অতিরিক্ত বার্তা বা নির্দেশনা (ঐচ্ছিক)"
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="যেমন: রোগীর ওপেন হার্ট সার্জারি হবে। ক্রস-ম্যাচিংয়ের খরচ আমরা বহন করব..."
            rows={3}
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            বাতিল
          </Button>
          <Button type="submit" variant="emergency" size="lg" className="px-8 shadow-xl">
            যাচাই ও পোস্ট করুন →
          </Button>
        </div>
      </form>

      {/* Confirmation Summary Modal */}
      {confirmModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setConfirmModalOpen(false)}
          title="রক্তের অনুরোধটি চূড়ান্ত নিশ্চিত করুন"
          subtitle="অনুগ্রহ করে সকল তথ্য মিলিয়ে দেখুন"
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BloodGroupBadge bloodGroup={formData.bloodGroup} size="lg" />
                <div>
                  <h4 className="font-bold text-slate-900">{formData.patientName} ({formData.patientAge} বছর)</h4>
                  <p className="text-slate-600">কারণ: {formData.reason} • পরিমাণ: {formData.unitsRequired} ব্যাগ</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
              <p>• <strong>হাসপাতাল:</strong> {formData.hospitalName} ({formData.area}, {formData.district})</p>
              <p>• <strong>প্রয়োজনীয় সময়:</strong> {formData.requiredDate} ({formData.requiredTime})</p>
              <p>• <strong>যোগাযোগ:</strong> {formData.contactPerson} (<a href={`tel:${formData.contactPhone}`} className="text-emerald-700 font-bold">{formData.contactPhone}</a>)</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              সতর্কবার্তা: মিথ্যা বা বিভ্রান্তিকর রক্তের অনুরোধ পোস্ট করা আইনত দণ্ডনীয় অপরাধ।
            </p>

            <div className="flex items-center gap-3 pt-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmModalOpen(false)}
                disabled={isSubmitting}
              >
                সংশোধন করুন
              </Button>
              <Button
                type="button"
                variant="emergency"
                className="flex-1"
                onClick={handleFinalSubmit}
                isLoading={isSubmitting}
              >
                হ্যাঁ, পোস্ট করুন
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
