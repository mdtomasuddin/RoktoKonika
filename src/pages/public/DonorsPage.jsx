import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  HeartHandshake, 
  Calendar, 
  Filter, 
  Phone 
} from 'lucide-react';
import { donorService } from '../../services/donorService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { LocationSelector } from '../../components/common/LocationSelector';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';

export function DonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bloodGroup, setBloodGroup] = useState('ALL');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const data = await donorService.getDonors({
        bloodGroup,
        division,
        district,
        availableOnly,
        search: searchQuery
      });
      setDonors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, division, district, availableOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            স্বেচ্ছাসেবী ডিরেক্টরি
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            নিবন্ধিত রক্তদাতাদের তালিকা (Donor Directory)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            বাংলাদেশের ৬৪ জেলার হাজারো স্বেচ্ছাসেবী রক্তদাতা সর্বদা প্রস্তুত। আপনার এলাকায় উপযুক্ত রক্তদাতা খুঁজুন।
          </p>
        </div>

        <Link to="/become-a-donor" className="flex-shrink-0">
          <Button variant="emergency" size="lg" leftIcon={<HeartHandshake className="w-5 h-5" />}>
            রক্তদাতা হিসেবে যুক্ত হোন
          </Button>
        </Link>
      </div>

      <SafetyNoticeCard type="donor_privacy" />

      {/* Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchDonors()}
              placeholder="ডোনারের নাম, এলাকা বা গ্রুপ দিয়ে অনুসন্ধান করুন..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <Button size="sm" onClick={fetchDonors} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs">
              খুঁজুন
            </Button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">শুধুমাত্র প্রস্তুত ডোনার</span>
          </label>
        </div>

        {/* Group & Location */}
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

      {/* Donors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : donors.length === 0 ? (
        <EmptyState
          title="কোনো রক্তদাতা পাওয়া যায়নি"
          description="আপনার প্রদত্ত ফিল্টারের তথ্যে কোনো রক্তদাতা পাওয়া যায়নি। ফিল্টার রিসেট করুন অথবা সরাসরি রক্তের জরুরি অনুরোধ পোস্ট করুন।"
          actionLabel="ফিল্টার রিসেট করুন"
          onAction={() => {
            setBloodGroup('ALL');
            setDivision('');
            setDistrict('');
            setSearchQuery('');
            setAvailableOnly(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <Card key={donor.id} hoverEffect className="flex flex-col justify-between border-slate-200/90">
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={donor.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                      alt={donor.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {donor.name}
                        </h3>
                        {donor.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" title="ভেরিফাইড" />
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                        {donor.badgeLevel}
                      </span>
                    </div>
                  </div>
                  <BloodGroupBadge bloodGroup={donor.bloodGroup} size="md" />
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{donor.area}, {donor.district}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>সর্বশেষ রক্তদান: {donor.lastDonationDate || 'নতুন রক্তদাতা'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>মোট রক্তদান: <strong className="text-slate-900">{donor.totalDonations} বার</strong> • রেসপন্স রেট: {donor.responseRatePercentage}%</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className={`inline-flex items-center gap-1.5 font-bold ${donor.isAvailable ? 'text-emerald-700' : 'text-slate-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${donor.isAvailable ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {donor.isAvailable ? 'বর্তমানে প্রস্তুত' : 'সাময়িক বিরতিতে'}
                  </span>
                  <span className="text-slate-400">
                    ফোন: {donor.phoneMasked}
                  </span>
                </div>
              </CardBody>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <Link to={`/donors/${donor.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    প্রোফাইল দেখুন
                  </Button>
                </Link>
                <Link to={`/find-blood?group=${donor.bloodGroup}&division=${donor.division}`} className="flex-1">
                  <Button variant="emergency" size="sm" className="w-full text-xs">
                    সাহায্য চান
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
