import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hospital as HospitalIcon, 
  Search, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Navigation, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { hospitalService } from '../../services/hospitalService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { LocationSelector } from '../../components/common/LocationSelector';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';

export function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [hasICU, setHasICU] = useState(false);
  const [hasBloodBank, setHasBloodBank] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const data = await hospitalService.getHospitals({
        division,
        district,
        hasICU,
        hasBloodBank,
        search: searchQuery
      });
      setHospitals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [division, district, hasICU, hasBloodBank]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <HospitalIcon className="w-4 h-4" />
            স্বাস্থ্যসেবা কেন্দ্রসমূহ
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            হাসপাতাল ও আইসিইউ ডিরেক্টরি (Hospitals)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            বাংলাদেশের সরকারি ও বেসরকারি মেডিকেল কলেজ এবং ২৪ ঘণ্টা জরুরি সেবা সম্পন্ন হাসপাতালসমূহের পূর্ণাঙ্গ তালিকা।
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchHospitals()}
              placeholder="হাসপাতালের নাম বা এলাকা দিয়ে অনুসন্ধান করুন..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <Button size="sm" onClick={fetchHospitals} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs">
              খুঁজুন
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={hasICU}
                onChange={(e) => setHasICU(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">শুধুমাত্র ICU সুবিধা</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={hasBloodBank}
                onChange={(e) => setHasBloodBank(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">ব্লাড ব্যাংক সংযুক্ত</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <LocationSelector
            division={division}
            district={district}
            onDivisionChange={setDivision}
            onDistrictChange={setDistrict}
            showArea={false}
          />
        </div>
      </div>

      {/* Hospitals Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : hospitals.length === 0 ? (
        <EmptyState
          title="কোনো হাসপাতাল পাওয়া যায়নি"
          description="আপনার প্রদত্ত তথ্যে কোনো হাসপাতাল মেলেনি। ফিল্টার পরিবর্তন করুন।"
          actionLabel="ফিল্টার রিসেট করুন"
          onAction={() => {
            setDivision('');
            setDistrict('');
            setHasICU(false);
            setHasBloodBank(false);
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hosp) => (
            <Card key={hosp.id} hoverEffect className="flex flex-col justify-between border-slate-200/90">
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {hosp.banglaName}
                    </h3>
                    <p className="text-xs text-rose-600 font-semibold mt-0.5">{hosp.type}</p>
                  </div>
                  {hosp.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" title="ভেরিফাইড" />
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{hosp.fullAddress}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-mono text-slate-800">
                    <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>হেল্পলাইন: <a href={`tel:${hosp.emergencyHelpline}`} className="font-bold hover:underline">{hosp.emergencyHelpline}</a></span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {hosp.hasICU && <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">ICU সেবা</span>}
                  {hosp.hasCCU && <span className="text-[10px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded-md border border-sky-200">CCU সেবা</span>}
                  {hosp.hasBloodBank && <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-md border border-rose-200">ব্লাড ব্যাংক</span>}
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md">{hosp.totalBeds} টি শয্যা</span>
                </div>
              </CardBody>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <Link to={`/hospitals/${hosp.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    বিস্তারিত দেখুন
                  </Button>
                </Link>
                <a href={`tel:${hosp.emergencyHelpline}`} className="flex-1">
                  <Button variant="emergency" size="sm" className="w-full text-xs" leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
                    জরুরি কল
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function HospitalDetailPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await hospitalService.getHospitalById(id);
        setHospital(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">হাসপাতাল খুঁজে পাওয়া যায়নি</h2>
        <Link to="/hospitals"><Button variant="outline">সকল হাসপাতাল দেখুন</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link to="/hospitals" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-rose-600">
        ← হাসপাতাল তালিকায় ফিরে যান
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">{hospital.type}</span>
            <h1 className="text-2xl sm:text-4xl font-black">{hospital.banglaName}</h1>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" /> {hospital.fullAddress}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a href={`tel:${hospital.emergencyHelpline}`}>
              <Button variant="emergency" size="lg" leftIcon={<PhoneCall className="w-5 h-5" />}>
                জরুরি হেল্পলাইন: {hospital.emergencyHelpline}
              </Button>
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">আইসিইউ (ICU)</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">{hospital.hasICU ? 'উপলব্ধ' : 'নেই'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">সিসিইউ (CCU)</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">{hospital.hasCCU ? 'উপলব্ধ' : 'নেই'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">ব্লাড ব্যাংক</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">{hospital.hasBloodBank ? 'সংযুক্ত' : 'নেই'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">মোট শয্যা</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">{hospital.totalBeds} টি</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">জরুরি ফোন ও অ্যাম্বুলেন্স নম্বরসমূহ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <p>• জরুরি বিভাগ: <strong>{hospital.emergencyHelpline}</strong></p>
              <p>• সাধারণ অনুসন্ধান: <strong>{hospital.generalPhone}</strong></p>
              <p>• অ্যাম্বুলেন্স সার্ভিস: <strong>{hospital.ambulancePhone}</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to={`/request-blood`}>
              <Button variant="emergency" size="lg">
                এই হাসপাতালের জন্য রক্তের অনুরোধ দিন →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
