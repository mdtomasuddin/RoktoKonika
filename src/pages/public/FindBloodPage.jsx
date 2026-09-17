import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Phone, 
  CheckCircle2, 
  SlidersHorizontal, 
  List, 
  Map, 
  Sparkles,
  Calendar,
  Star,
  Activity,
  UserCheck
} from 'lucide-react';
import { donorService } from '../../services/donorService';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { LocationSelector } from '../../components/common/LocationSelector';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { InteractiveMapMock } from '../../components/common/InteractiveMapMock';
import { SafetyNoticeCard } from '../../components/common/SafetyNoticeCard';
import { useToast } from '../../contexts/ToastContext';

export function FindBloodPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  const [bloodGroup, setBloodGroup] = useState(searchParams.get('group') || 'ALL');
  const [division, setDivision] = useState(searchParams.get('division') || '');
  const [district, setDistrict] = useState(searchParams.get('district') || '');
  const [area, setArea] = useState('');
  const [availableOnly, setAvailableOnly] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [radiusKm, setRadiusKm] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Request help contact modal state
  const [selectedDonorForHelp, setSelectedDonorForHelp] = useState(null);
  const [helpMessage, setHelpMessage] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const data = await donorService.getDonors({
        bloodGroup,
        division,
        district,
        area,
        availableOnly,
        verifiedOnly,
        search: searchQuery
      });
      setDonors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, division, district, area, availableOnly, verifiedOnly]);

  const handleSendHelpRequest = async (e) => {
    e.preventDefault();
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
      setSelectedDonorForHelp(null);
      setHelpMessage('');
      addToast(`ডোনার ${selectedDonorForHelp.name}-কে সফলভাবে অনুরোধ পাঠানো হয়েছে!`, 'success');
    }, 600);
  };

  const handleClearFilters = () => {
    setBloodGroup('ALL');
    setDivision('');
    setDistrict('');
    setArea('');
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setSearchQuery('');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Blood Group */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          রক্তের গ্রুপ
        </label>
        <BloodGroupSelector
          value={bloodGroup}
          onChange={setBloodGroup}
          includeAll
        />
      </div>

      {/* Location */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          অবস্থান ও এলাকা
        </label>
        <LocationSelector
          division={division}
          district={district}
          area={area}
          onDivisionChange={setDivision}
          onDistrictChange={setDistrict}
          onAreaChange={setArea}
          layout="vertical"
        />
      </div>

      {/* Radius */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            সর্বোচ্চ দূরত্ব (Radius)
          </label>
          <span className="text-xs font-bold text-rose-600 font-mono">{radiusKm} কি.মি.</span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
        />
      </div>

      {/* Toggles */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
          />
          <span className="text-xs font-semibold text-slate-700">বর্তমানে রক্তদানে প্রস্তুত শুধু তাদের দেখান</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
          />
          <span className="text-xs font-semibold text-slate-700">শুধুমাত্র ভেরিফাইড রক্তদাতা</span>
        </label>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="w-full text-slate-500">
          ফিল্টার রিসেট করুন
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
            <Search className="w-4 h-4" />
            রক্তদাতা সন্ধান
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            রক্তদাতা অনুসন্ধান ও লাইভ ডিরেক্টরি
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার কাঙ্ক্ষিত রক্তের গ্রুপ ও এলাকার রক্তদাতাদের তালিকা থেকে যোগাযোগ করুন
          </p>
        </div>

        {/* View Switcher & Mobile Filter Trigger */}
        <div className="flex items-center gap-2">
          {/* List vs Map View toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" /> তালিকা
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" /> ম্যাপ ভিউ
            </button>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200"
          >
            <SlidersHorizontal className="w-4 h-4" /> ফিল্টার
          </button>
        </div>
      </div>

      <SafetyNoticeCard type="donor_privacy" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs sticky top-28">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-600" /> ফিল্টার সমূহ
            </h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {donors.length} জন ডোনার
            </span>
          </div>
          <FilterContent />
        </aside>

        {/* Results Canvas */}
        <section className="lg:col-span-8 space-y-6">
          {/* Search bar inside canvas */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchDonors()}
              placeholder="নাম, এলাকা বা রক্তের গ্রুপ লিখে খুঁজুন..."
              className="w-full pl-11 pr-24 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 shadow-xs"
            />
            <Button
              size="sm"
              onClick={fetchDonors}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
            >
              খুঁজুন
            </Button>
          </div>

          {/* Map Mode */}
          {viewMode === 'map' ? (
            <InteractiveMapMock
              items={donors}
              type="donors"
              onSelect={(donor) => setSelectedDonorForHelp(donor)}
            />
          ) : (
            /* List Mode */
            <>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : donors.length === 0 ? (
                <EmptyState
                  title="কোনো রক্তদাতা পাওয়া যায়নি"
                  description="আপনার নির্বাচিত গ্রুপ ও ঠিকানায় এই মুহূর্তে কোনো ডোনার পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন অথবা সরাসরি রক্তের জরুরি অনুরোধ পোস্ট করুন।"
                  actionLabel="রক্তের অনুরোধ পোস্ট করুন"
                  onAction={() => window.location.href = '/request-blood'}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {donors.map((donor) => (
                    <Card key={donor.id} hoverEffect className="flex flex-col justify-between border-slate-200/90">
                      <CardBody className="space-y-4">
                        {/* Header: Avatar, Name, Group Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={donor.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                              alt={donor.name}
                              className="w-12 h-12 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-slate-900 text-base leading-tight">
                                  {donor.name}
                                </h4>
                                {donor.isVerified && (
                                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" title="ভেরিফাইড রক্তদাতা" />
                                )}
                              </div>
                              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                                {donor.badgeLevel}
                              </span>
                            </div>
                          </div>
                          <BloodGroupBadge bloodGroup={donor.bloodGroup} size="md" />
                        </div>

                        {/* Location & Stats */}
                        <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                          <p className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{donor.area}, {donor.district}</span>
                            {donor.approxDistanceKm && (
                              <span className="text-slate-400 font-mono">({donor.approxDistanceKm} কি.মি.)</span>
                            )}
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

                        {/* Availability Status */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${donor.isAvailable ? 'text-emerald-700' : 'text-slate-500'}`}>
                            <span className={`w-2 h-2 rounded-full ${donor.isAvailable ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            {donor.isAvailable ? 'বর্তমানে প্রস্তুত' : 'সাময়িক বিরতিতে'}
                          </span>
                          <span className="text-xs text-slate-400">
                            ফোন: {donor.phoneMasked}
                          </span>
                        </div>
                      </CardBody>

                      {/* Card Footer Actions */}
                      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                        <Link to={`/donors/${donor.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            প্রোফাইল
                          </Button>
                        </Link>
                        <Button
                          variant="emergency"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => setSelectedDonorForHelp(donor)}
                        >
                          সাহায্য চান
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="ফিল্টার সমূহ"
        position="right"
      >
        <FilterContent />
        <div className="mt-6 pt-4 border-t">
          <Button variant="primary" className="w-full" onClick={() => setMobileFilterOpen(false)}>
            ফলাফল দেখুন ({donors.length})
          </Button>
        </div>
      </Drawer>

      {/* Request Help / Connect Modal */}
      {selectedDonorForHelp && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDonorForHelp(null)}
          title={`রক্তের আবেদন পাঠান: ${selectedDonorForHelp.name}`}
          subtitle={`গ্রুপ: ${selectedDonorForHelp.bloodGroup} | এলাকা: ${selectedDonorForHelp.area}`}
        >
          <form onSubmit={handleSendHelpRequest} className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              নিরাপত্তা নীতি: আপনার অনুরোধটি রক্তদাতার অ্যাপ নোটিফিকেশন ও মেসেজে পৌঁছাবে। রক্তদাতা সম্মত হলে আপনি পূর্ণ যোগাযোগের তথ্য পাবেন।
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                রোগীর নাম ও হাসপাতালের বিবরণ <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                placeholder="উদাহরণ: রোগী ঢাকা মেডিকেল কলেজ হাসপাতালের আইসিইউতে আছেন, আগামীকাল সকাল ১০টায় ১ ব্যাগ ও-পজিটিভ রক্ত লাগবে..."
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedDonorForHelp(null)}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                variant="emergency"
                className="flex-1"
                isLoading={isSendingRequest}
              >
                অনুরোধ পাঠান
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
