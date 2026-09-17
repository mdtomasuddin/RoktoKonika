import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Droplet, 
  Bell, 
  Activity, 
  ShieldCheck, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Hospital, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bloodRequestService } from '../../services/bloodRequestService';
import { donorService } from '../../services/donorService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { useToast } from '../../contexts/ToastContext';

export function DashboardOverviewPage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [isAvailable, setIsAvailable] = useState(user?.isAvailableForDonation !== false);
  const [loading, setLoading] = useState(true);

  const isDonor = user?.role === 'donor';

  useEffect(() => {
    async function load() {
      try {
        const reqs = await bloodRequestService.getRequests();
        setNearbyRequests(reqs.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleAvailability = async () => {
    const nextVal = !isAvailable;
    setIsAvailable(nextVal);
    updateProfile({ isAvailableForDonation: nextVal });
    addToast(
      nextVal ? 'আপনি এখন রক্তদানে প্রস্তুত হিসেবে সক্রিয় আছেন!' : 'রক্তদানের স্ট্যাটাস সাময়িক বন্ধ করা হয়েছে।',
      nextVal ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Role Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            {isDonor ? 'রক্তদাতা ড্যাশবোর্ড' : 'সেবাগ্রহীতা ড্যাশবোর্ড'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            আসসালামু আলাইকুম, {user?.name || 'ব্যবহারকারী'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            রক্তকণিকা প্ল্যাটফর্মে আপনার বর্তমান কার্যক্রমের সারসংক্ষেপ
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link to="/request-blood" className="flex-1 sm:flex-none">
            <Button variant="emergency" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              নতুন রক্তের অনুরোধ
            </Button>
          </Link>
        </div>
      </div>

      {/* Donor Availability Banner (Only for donors) */}
      {isDonor && (
        <div className={`p-5 sm:p-6 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isAvailable 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
            <div>
              <h3 className="font-bold text-base leading-snug">
                {isAvailable ? 'বর্তমানে রক্তদানে প্রস্তুত (Available for Donation)' : 'সাময়িক বিরতিতে আছেন (Inactive)'}
              </h3>
              <p className="text-xs opacity-90 mt-0.5">
                {isAvailable ? 'জরুরি রক্তের প্রয়োজনে রোগীরা আপনার সাথে যোগাযোগ করতে পারবে।' : 'আপাতত কোনো রোগী আপনাকে কল বা নোটিফিকেশন পাঠাতে পারবে না।'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleAvailability}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isAvailable 
                ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                : 'bg-slate-800 text-white hover:bg-slate-900'
            }`}
          >
            {isAvailable ? 'বিরতি নিন' : 'প্রস্তুত করুন'}
          </button>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">রক্তের গ্রুপ</span>
          <div className="flex items-center justify-between">
            <BloodGroupBadge bloodGroup={user?.bloodGroup || 'O+'} size="lg" />
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">
            {isDonor ? 'মোট রক্তদান' : 'মোট রক্তের অনুরোধ'}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-en">
              {isDonor ? (user?.totalDonations || 12) : 2} বার
            </span>
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">সক্রিয় অনুরোধ</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-rose-600 font-en">১</span>
            <Droplet className="w-5 h-5 text-rose-500" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">নতুন নোটিফিকেশন</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-sky-600 font-en">৩</span>
            <Bell className="w-5 h-5 text-sky-500" />
          </div>
        </div>
      </div>

      {/* Nearby / Matching Blood Requests */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {isDonor ? 'আপনার গ্রুপের সাথে ম্যাচিং জরুরি অনুরোধ' : 'নিকটস্থ সক্রিয় রক্তের অনুরোধ'}
            </h3>
            <p className="text-xs text-slate-500">ঢাকা ও আশপাশের হাসপাতালের তাজা অনুরোধসমূহ</p>
          </div>
          <Link to="/blood-requests" className="text-xs font-bold text-rose-600 hover:underline">
            সকল অনুরোধ দেখুন →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyRequests.map(req => (
            <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <BloodGroupBadge bloodGroup={req.bloodGroup} size="sm" />
                  <UrgencyBadge level={req.urgencyLevel} size="sm" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{req.patientName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{req.hospitalName}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500">{req.requiredDate}</span>
                <Link to={`/blood-requests/${req.id}`} className="font-bold text-rose-600 hover:underline">
                  সাড়া দিন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
