import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Droplet, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Hospital, 
  Users, 
  Activity, 
  ArrowRight, 
  PlusCircle, 
  CheckCircle2, 
  PhoneCall, 
  HelpCircle,
  Building2,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BloodGroupBadge, UrgencyBadge } from '../../components/common/BloodGroupBadge';
import { LocationSelector } from '../../components/common/LocationSelector';
import { BloodCompatibilityModal } from '../../components/common/BloodCompatibilityModal';
import { bloodRequestService } from '../../services/bloodRequestService';
import { hospitalService, bloodBankService } from '../../services/hospitalService';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function HomePage() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [compatModalOpen, setCompatModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [reqs, hosps, banks] = await Promise.all([
          bloodRequestService.getRequests({ urgencyLevel: 'critical' }),
          hospitalService.getHospitals(),
          bloodBankService.getBloodBanks()
        ]);
        setUrgentRequests(reqs.slice(0, 3));
        setHospitals(hosps.slice(0, 3));
        setBloodBanks(banks.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedGroup) queryParams.set('group', selectedGroup);
    if (selectedDivision) queryParams.set('division', selectedDivision);
    if (selectedDistrict) queryParams.set('district', selectedDistrict);
    navigate(`/find-blood?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-rose-50/70 via-white to-slate-50">
        {/* Background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>বাংলাদেশের সর্ববৃহৎ জরুরি রক্ত সংযোগ নেটওয়ার্ক</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                রক্তের প্রয়োজনে, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 bg-clip-text text-transparent">
                  মানুষের পাশে
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                জরুরি মুহূর্তে রক্তের সন্ধানে আর দুশ্চিন্তা নয়। আপনার নিকটস্থ স্বেচ্ছাসেবী রক্তদাতা, হাসপাতাল ও ব্লাড ব্যাংকের সাথে দ্রুত যোগাযোগ করুন মুহূর্তেই।
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link to="/request-blood">
                  <Button variant="emergency" size="lg" leftIcon={<PlusCircle className="w-5 h-5" />}>
                    রক্ত প্রয়োজন (পোস্ট করুন)
                  </Button>
                </Link>
                <Link to="/become-a-donor">
                  <Button variant="outline" size="lg" leftIcon={<HeartHandshake className="w-5 h-5 text-rose-600" />}>
                    রক্তদান করতে চাই
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setCompatModalOpen(true)}
                  className="text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  ম্যাচিং চার্ট দেখুন
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-700">১০০% ভেরিফাইড অনুরোধ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-700">২৪/৭ জরুরি সহায়তা</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-700">৬৪ জেলায় কার্যক্রম</span>
                </div>
              </div>
            </div>

            {/* Right Quick Blood Search Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-0 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-rose-600 fill-rose-600" />
                      তাত্ক্ষণিক রক্তদাতা অনুসন্ধান
                    </h3>
                    <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2.5 py-0.5 rounded-full">
                      লাইভ সার্চ
                    </span>
                  </div>

                  <form onSubmit={handleHeroSearch} className="space-y-4">
                    {/* Blood group selector pills */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        রক্তের গ্রুপ নির্বাচন করুন <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {BLOOD_GROUPS.map(bg => (
                          <button
                            key={bg}
                            type="button"
                            onClick={() => setSelectedGroup(bg)}
                            className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-extrabold border transition-all text-center
                              ${selectedGroup === bg
                                ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-105'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-300'}`}
                          >
                            {bg}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location selector */}
                    <div className="space-y-3">
                      <LocationSelector
                        division={selectedDivision}
                        district={selectedDistrict}
                        onDivisionChange={setSelectedDivision}
                        onDistrictChange={setSelectedDistrict}
                        showArea={false}
                        layout="grid"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="emergency"
                      className="w-full py-3.5 text-base shadow-lg"
                      leftIcon={<Search className="w-5 h-5" />}
                    >
                      রক্তদাতা খুঁজুন
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMERGENCY REQUESTS HIGHLIGHT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              জরুরি রক্তের প্রয়োজন
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              জরুরি রক্তের অনুরোধসমূহ
            </h2>
          </div>
          <Link to="/blood-requests">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              সকল অনুরোধ দেখুন ({urgentRequests.length}+)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentRequests.map((req) => (
            <Card key={req.id} hoverEffect className="flex flex-col justify-between border-slate-200">
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <BloodGroupBadge bloodGroup={req.bloodGroup} size="lg" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base leading-tight">
                        {req.patientName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {req.reason} • {req.gender} ({req.patientAge} বছর)
                      </p>
                    </div>
                  </div>
                  <UrgencyBadge level={req.urgencyLevel} size="sm" />
                </div>

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

                <div className="bg-rose-50/60 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">রক্তের পরিমাণ:</span>
                  <span className="font-bold text-rose-700 text-sm">{req.unitsRequired} ব্যাগ প্রয়োজন</span>
                </div>
              </CardBody>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <Link to={`/blood-requests/${req.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    বিস্তারিত দেখুন
                  </Button>
                </Link>
                <Link to={`/blood-requests/${req.id}`} className="flex-1">
                  <Button variant="emergency" size="sm" className="w-full text-xs">
                    রক্ত দিতে চাই
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= STATISTICS METRICS ================= */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">আমাদের প্ল্যাটফর্মের প্রভাব ও পরিসংখ্যান</h2>
            <p className="text-sm text-slate-400">প্রতিটি রক্তবিন্দু মানুষের জীবন রক্ষার অমূল্য উপহার</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white font-en">১২,৪৫০+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">নিবন্ধিত স্বেচ্ছাসেবী রক্তদাতা</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white font-en">৮,৯২০+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">সফল রক্তদান ও জীবন রক্ষা</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-400 flex items-center justify-center mx-auto mb-4">
                <Hospital className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white font-en">১৪০+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">সংযুক্ত হাসপাতাল ও ক্লিনিক</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white font-en">৬৪</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">জেলায় সক্রিয় কভারেজ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOOD GROUP COMPATIBILITY & CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
            <Droplet className="w-4 h-4 fill-rose-600" />
            রক্তের গ্রুপ তালিকা
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            রক্তের গ্রুপ ও তথ্য নির্দেশিকা
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            যেকোনো গ্রুপের উপর ক্লিক করে সরাসরি ঐ গ্রুপের ডোনার খুঁজুন
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BLOOD_GROUPS.map(bg => (
            <div
              key={bg}
              onClick={() => navigate(`/find-blood?group=${bg}`)}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <BloodGroupBadge bloodGroup={bg} size="lg" />
                <span className="text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                  খুঁজুন →
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm">গ্রুপ {bg}</h4>
              <p className="text-xs text-slate-500 mt-1">জরুরি ও নিয়মিত দাতা তালিকা দেখতে ক্লিক করুন</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">সহজ ও দ্রুত ধাপ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">রক্তকণিকা কীভাবে কাজ করে?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
              <span className="absolute top-4 right-4 text-2xl font-black text-slate-700">০১</span>
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold mb-4">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">১. অনুরোধ পোস্ট করুন</h3>
              <p className="text-xs text-slate-400 leading-relaxed">রোগীর গ্রুপ, হাসপাতালের নাম ও প্রয়োজনীয় সময় উল্লেখ করে পোস্ট দিন।</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
              <span className="absolute top-4 right-4 text-2xl font-black text-slate-700">০২</span>
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">২. রক্তদাতা খুঁজুন</h3>
              <p className="text-xs text-slate-400 leading-relaxed">নিকটস্থ এলাকায় অবস্থানরত উপযুক্ত রক্তদাতাদের নোটিফিকেশন পৌঁছায়।</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
              <span className="absolute top-4 right-4 text-2xl font-black text-slate-700">০৩</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">৩. যোগাযোগ ও সাড়া</h3>
              <p className="text-xs text-slate-400 leading-relaxed">রক্তদাতা আগ্রহ প্রকাশ করলে নিরাপদে কল বা মেসেজে সরাসরি যোগাযোগ করুন।</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
              <span className="absolute top-4 right-4 text-2xl font-black text-slate-700">০৪</span>
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">৪. রক্তদান ও জীবন রক্ষা</h3>
              <p className="text-xs text-slate-400 leading-relaxed">হাসপাতালে ক্রস-ম্যাচিংয়ের পর সফলভাবে রক্তদান সম্পন্ন করুন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEARBY HOSPITALS & BLOOD BANKS PREVIEW ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hospitals Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-rose-600" />
                  প্রধান হাসপাতাল ও আইসিইউ
                </h3>
                <p className="text-xs text-slate-500">জরুরি সেবা ও ২৪ ঘণ্টা খোলা হাসপাতালসমূহ</p>
              </div>
              <Link to="/hospitals" className="text-xs font-bold text-rose-600 hover:underline">
                সব দেখুন →
              </Link>
            </div>

            <div className="space-y-3">
              {hospitals.map(h => (
                <div key={h.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{h.banglaName}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{h.fullAddress}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {h.hasICU && <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">ICU</span>}
                      {h.hasBloodBank && <span className="text-[10px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded-md border border-sky-200">ব্লাড ব্যাংক</span>}
                    </div>
                  </div>
                  <a href={`tel:${h.emergencyHelpline}`} className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex-shrink-0" title="জরুরি কল">
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Blood Banks Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-rose-600" />
                  ব্লাড ব্যাংক ও রক্তের বর্তমান স্টক
                </h3>
                <p className="text-xs text-slate-500">স্বীকৃত রক্ত পরিসঞ্চালন কেন্দ্রসমূহ</p>
              </div>
              <Link to="/blood-banks" className="text-xs font-bold text-rose-600 hover:underline">
                সব দেখুন →
              </Link>
            </div>

            <div className="space-y-3">
              {bloodBanks.map(bb => (
                <div key={bb.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{bb.banglaName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{bb.area}, {bb.district}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      ভেরিফাইড
                    </span>
                  </div>

                  {/* Stock Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {Object.entries(bb.stock).slice(0, 6).map(([grp, status]) => (
                      <span
                        key={grp}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border
                          ${status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                          ${status === 'low' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                          ${status === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                          ${status === 'unavailable' ? 'bg-slate-100 text-slate-500 border-slate-200 line-through' : ''}`}
                      >
                        {grp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DONOR CTA HERO BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              আজ একজনের পাশে দাঁড়ান — রক্তদান করুন, জীবন বাঁচান
            </h2>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
              আপনার মাত্র এক ব্যাগ রক্ত বাঁচাতে পারে একটি মুমূর্ষু রোগীর প্রাণ ও ফিরিয়ে দিতে পারে একটি পরিবারের মুখে হাসি।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link to="/become-a-donor" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-rose-700 hover:bg-rose-50 shadow-xl font-bold">
                Donor হিসেবে যুক্ত হোন
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full text-white hover:bg-white/10 border border-white/30">
                আমাদের জানুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BloodCompatibilityModal
        isOpen={compatModalOpen}
        onClose={() => setCompatModalOpen(false)}
      />
    </div>
  );
}
