import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Hospital, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Share2, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { bloodRequestService } from '../../services/bloodRequestService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { LocationSelector } from '../../components/common/LocationSelector';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../contexts/ToastContext';

export function BloodRequestsPage() {
  const { addToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bloodGroup, setBloodGroup] = useState('ALL');
  const [urgencyLevel, setUrgencyLevel] = useState('ALL');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Donate Intent Modal
  const [selectedReqForDonate, setSelectedReqForDonate] = useState(null);
  const [donorPhone, setDonorPhone] = useState('');
  const [donorNote, setDonorNote] = useState('');
  const [isSubmittingDonate, setIsSubmittingDonate] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await bloodRequestService.getRequests({
        bloodGroup,
        urgencyLevel,
        division,
        district,
        search: searchQuery
      });
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [bloodGroup, urgencyLevel, division, district]);

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingDonate(true);
    try {
      await bloodRequestService.respondToRequest(selectedReqForDonate.id, { phone: donorPhone, note: donorNote });
      addToast('ধন্যবাদ! আপনার রক্তদানের আগ্রহ রোগীর পরিবারকে জানানো হয়েছে।', 'success');
      setSelectedReqForDonate(null);
      setDonorPhone('');
      setDonorNote('');
      fetchRequests();
    } finally {
      setIsSubmittingDonate(false);
    }
  };

  const handleShare = (req) => {
    if (navigator.share) {
      navigator.share({
        title: `জরুরি রক্তের প্রয়োজন: ${req.bloodGroup}`,
        text: `${req.hospitalName} এ ${req.bloodGroup} রক্ত প্রয়োজন।`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blood-requests/${req.id}`);
      addToast('অনুরোধটির লিংক কপি করা হয়েছে!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            জরুরি রক্তের আবেদন
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            সক্রিয় রক্তের অনুরোধসমূহ (Blood Requests)
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            রোগীর রক্তের প্রয়োজনে স্বেচ্ছাসেবী হিসেবে এগিয়ে আসুন। আপনার সামান্য সময়ে বেঁচে যেতে পারে একটি মূল্যবান জীবন।
          </p>
        </div>

        <Link to="/request-blood" className="flex-shrink-0">
          <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 font-bold shadow-lg" leftIcon={<PlusCircle className="w-5 h-5" />}>
            নতুন রক্তের অনুরোধ দিন
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchRequests()}
              placeholder="রোগীর নাম, হাসপাতাল বা এলাকার নাম দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <Button size="sm" onClick={fetchRequests} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs">
              খুঁজুন
            </Button>
          </div>

          {/* Urgency Filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">জরুরিতা:</span>
            {[
              { id: 'ALL', label: 'সকল' },
              { id: 'critical', label: 'অত্যন্ত জরুরি' },
              { id: 'urgent', label: 'জরুরি' },
              { id: 'normal', label: 'সাধারণ' }
            ].map(urg => (
              <button
                key={urg.id}
                onClick={() => setUrgencyLevel(urg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border
                  ${urgencyLevel === urg.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
              >
                {urg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Group & Location Filter */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">রক্তের গ্রুপ</label>
            <BloodGroupSelector value={bloodGroup} onChange={setBloodGroup} includeAll />
          </div>

          <LocationSelector
            division={division}
            district={district}
            onDivisionChange={setDivision}
            onDistrictChange={setDistrict}
            showArea={false}
          />
        </div>
      </div>

      {/* Requests Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState
          title="কোনো রক্তের অনুরোধ পাওয়া যায়নি"
          description="আপনার নির্বাচিত ফিল্টারের তথ্যের সাথে কোনো অনুরোধ মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।"
          actionLabel="ফিল্টার রিসেট করুন"
          onAction={() => {
            setBloodGroup('ALL');
            setUrgencyLevel('ALL');
            setDivision('');
            setDistrict('');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => {
            const isFulfilled = req.status === 'fulfilled';
            const progressPercent = Math.min(100, Math.round((req.unitsCollected / req.unitsRequired) * 100));

            return (
              <Card key={req.id} hoverEffect className="flex flex-col justify-between border-slate-200/90 relative overflow-hidden">
                {isFulfilled && (
                  <div className="absolute top-0 right-0 bg-sky-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl z-10">
                    রক্ত সংগ্রহ সম্পন্ন
                  </div>
                )}

                <CardBody className="space-y-4">
                  {/* Top: Group Badge, Patient, Urgency */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BloodGroupBadge bloodGroup={req.bloodGroup} size="lg" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {req.patientName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {req.reason} • {req.gender} ({req.patientAge} বছর)
                        </p>
                      </div>
                    </div>
                    {!isFulfilled && <UrgencyBadge level={req.urgencyLevel} size="sm" />}
                  </div>

                  {/* Hospital & Location */}
                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <Hospital className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 line-clamp-1">{req.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{req.area}, {req.district}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>প্রয়োজন: <strong className="text-slate-800">{req.requiredDate} ({req.requiredTime})</strong></span>
                    </div>
                  </div>

                  {/* Collection Progress Bar */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-600">রক্ত সংগ্রহের অগ্রগতি:</span>
                      <span className="text-rose-600">{req.unitsCollected} / {req.unitsRequired} ব্যাগ</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-600 to-rose-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Response & Timestamp */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>পোস্ট করা হয়েছে: {req.postedAt}</span>
                    <span>{req.donorsRespondedCount || 0} জন সাড়া দিয়েছেন</span>
                  </div>
                </CardBody>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                  <Link to={`/blood-requests/${req.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      বিস্তারিত
                    </Button>
                  </Link>
                  {!isFulfilled && (
                    <Button
                      variant="emergency"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setSelectedReqForDonate(req)}
                    >
                      রক্ত দিতে চাই
                    </Button>
                  )}
                  <button
                    onClick={() => handleShare(req)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                    title="শেয়ার করুন"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* "I Can Donate" Quick Modal */}
      {selectedReqForDonate && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReqForDonate(null)}
          title="রক্তদানের আগ্রহ প্রকাশ করুন"
          subtitle={`রোগী: ${selectedReqForDonate.patientName} | হাসপাতাল: ${selectedReqForDonate.hospitalName}`}
        >
          <form onSubmit={handleDonateSubmit} className="space-y-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
              <BloodGroupBadge bloodGroup={selectedReqForDonate.bloodGroup} size="md" />
              <div className="text-xs">
                <p className="font-bold">রক্তের গ্রুপ: {selectedReqForDonate.bloodGroup}</p>
                <p className="text-slate-600">প্রয়োজনীয় তারিখ: {selectedReqForDonate.requiredDate} ({selectedReqForDonate.requiredTime})</p>
              </div>
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
                placeholder="017XXXXXXXX"
                className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                অতিরিক্ত বার্তা বা পৌঁছানোর আনুমানিক সময় (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={donorNote}
                onChange={(e) => setDonorNote(e.target.value)}
                placeholder="যেমন: আমি বিকাল ৩টার মধ্যে হাসপাতালে উপস্থিত হতে পারব..."
                className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedReqForDonate(null)}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                variant="emergency"
                className="flex-1"
                isLoading={isSubmittingDonate}
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
