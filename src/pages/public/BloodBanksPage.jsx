import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Droplet, 
  Activity, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { bloodBankService } from '../../services/hospitalService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { LocationSelector } from '../../components/common/LocationSelector';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { BLOOD_GROUPS } from '../../constants';

export function BloodBanksPage() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [division, setDivision] = useState('');
  const [bloodGroup, setBloodGroup] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBloodBanks = async () => {
    setLoading(true);
    try {
      const data = await bloodBankService.getBloodBanks({
        division,
        bloodGroup,
        search: searchQuery
      });
      setBloodBanks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodBanks();
  }, [division, bloodGroup]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            স্বীকৃত রক্ত পরিসঞ্চালন কেন্দ্র
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            ব্লাড ব্যাংক ও রক্তের লাইভ স্টক ডিরেক্টরি
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            রেড ক্রিসেন্ট, সন্ধানী, কোয়ান্টাম ও বাঁধনসহ অনুমোদিত ব্লাড ব্যাংক সমূহের রক্তের প্রাপ্যতা ও যোগাযোগ নম্বর।
          </p>
        </div>
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
              onKeyDown={(e) => e.key === 'Enter' && fetchBloodBanks()}
              placeholder="ব্লাড ব্যাংকের নাম বা এলাকা দিয়ে অনুসন্ধান করুন..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <Button size="sm" onClick={fetchBloodBanks} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs">
              খুঁজুন
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">রক্তের গ্রুপের প্রাপ্যতা</label>
            <BloodGroupSelector value={bloodGroup} onChange={setBloodGroup} includeAll />
          </div>

          <LocationSelector
            division={division}
            onDivisionChange={setDivision}
            showArea={false}
          />
        </div>
      </div>

      {/* Disclaimer Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>সতর্কতা ও নির্দেশিকা:</strong> রক্তের স্টক পরিস্থিতি প্রতি মিনিটে পরিবর্তিত হতে পারে। রক্ত সংগ্রহের উদ্দেশ্যে রওয়ানা দেওয়ার পূর্বে অবশ্যই ফোনে কথা বলে স্টক এবং ক্রস-ম্যাচিংয়ের প্রস্তুতি নিশ্চিত করুন।
        </div>
      </div>

      {/* Blood Banks Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      ) : bloodBanks.length === 0 ? (
        <EmptyState
          title="কোনো ব্লাড ব্যাংক পাওয়া যায়নি"
          description="আপনার প্রদত্ত ফিল্টারের তথ্যের সাথে কোনো ব্লাড ব্যাংক মেলেনি। ফিল্টার পরিবর্তন করুন।"
          actionLabel="ফিল্টার রিসেট করুন"
          onAction={() => {
            setDivision('');
            setBloodGroup('ALL');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bloodBanks.map((bb) => (
            <Card key={bb.id} hoverEffect className="flex flex-col justify-between border-slate-200/90">
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      {bb.banglaName}
                    </h3>
                    <p className="text-xs text-rose-600 font-semibold mt-0.5">{bb.type} • {bb.serviceType}</p>
                  </div>
                  {bb.isVerified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                      ভেরিফাইড
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{bb.address}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-mono text-slate-800">
                    <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>ফোন: <a href={`tel:${bb.phone}`} className="font-bold hover:underline">{bb.phone}</a></span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>সময়: {bb.operatingHours} • আপডেট: {bb.lastStockUpdated}</span>
                  </p>
                </div>

                {/* Stock Matrix Table */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block mb-2">রক্তের বর্তমান স্টক স্ট্যাটাস:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_GROUPS.map(bg => {
                      const st = bb.stock[bg];
                      const statusMap = {
                        available: { label: 'আছে', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        low: { label: 'কম', style: 'bg-amber-50 text-amber-700 border-amber-200' },
                        critical: { label: 'সীমিত', style: 'bg-rose-50 text-rose-700 border-rose-200' },
                        unavailable: { label: 'নেই', style: 'bg-slate-100 text-slate-400 border-slate-200 line-through' }
                      };
                      const conf = statusMap[st] || statusMap.unavailable;

                      return (
                        <div key={bg} className={`p-2 rounded-xl border text-center ${conf.style}`}>
                          <span className="font-black text-xs block">{bg}</span>
                          <span className="text-[10px] font-semibold">{conf.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardBody>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <Link to={`/blood-banks/${bb.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    বিস্তারিত বিবরণ
                  </Button>
                </Link>
                <a href={`tel:${bb.emergencyPhone || bb.phone}`} className="flex-1">
                  <Button variant="emergency" size="sm" className="w-full text-xs" leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
                    সরাসরি কল
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

export function BloodBankDetailPage() {
  const { id } = useParams();
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await bloodBankService.getBloodBankById(id);
        setBank(data);
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

  if (!bank) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">ব্লাড ব্যাংক খুঁজে পাওয়া যায়নি</h2>
        <Link to="/blood-banks"><Button variant="outline">সকল ব্লাড ব্যাংক দেখুন</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link to="/blood-banks" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-rose-600">
        ← ব্লাড ব্যাংক তালিকায় ফিরে যান
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">{bank.type}</span>
            <h1 className="text-2xl sm:text-4xl font-black">{bank.banglaName}</h1>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" /> {bank.address}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a href={`tel:${bank.emergencyPhone || bank.phone}`}>
              <Button variant="emergency" size="lg" leftIcon={<PhoneCall className="w-5 h-5" />}>
                হটলাইন: {bank.emergencyPhone || bank.phone}
              </Button>
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">রক্তের পূর্ণাঙ্গ স্টক প্রাপ্যতা সূচক</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BLOOD_GROUPS.map(bg => {
                const st = bank.stock[bg];
                const statusMap = {
                  available: { label: 'পর্যাপ্ত রয়েছে', badge: 'bg-emerald-100 text-emerald-800', desc: 'মজুদ পর্যাপ্ত' },
                  low: { label: 'স্বল্প পরিমাণ', badge: 'bg-amber-100 text-amber-800', desc: 'দ্রুত শেষ হচ্ছে' },
                  critical: { label: 'সংকটপূর্ণ', badge: 'bg-rose-100 text-rose-800', desc: 'জরুরি ভিত্তিতে দাতা প্রয়োজন' },
                  unavailable: { label: 'মজুদ নেই', badge: 'bg-slate-100 text-slate-500', desc: 'বর্তমানে রক্ত খালি' }
                };
                const conf = statusMap[st] || statusMap.unavailable;

                return (
                  <div key={bg} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-2">
                    <span className="text-2xl font-black text-rose-600 block">{bg}</span>
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${conf.badge}`}>
                      {conf.label}
                    </span>
                    <p className="text-[11px] text-slate-500">{conf.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
            <p>• <strong>কার্যক্রমের সময়:</strong> {bank.operatingHours}</p>
            <p>• <strong>সেবার ধরন:</strong> {bank.serviceType}</p>
            <p>• <strong>সর্বশেষ স্টক আপডেট:</strong> {bank.lastStockUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
