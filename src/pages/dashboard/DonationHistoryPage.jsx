import React, { useState } from 'react';
import { Heart, Award, Calendar, MapPin, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';

export function DonationHistoryPage() {
  const { addToast } = useToast();
  const [records, setRecords] = useState([
    { id: '1', date: '২০২৬-০৫-১৪', hospital: 'ঢাকা মেডিকেল কলেজ হাসপাতাল', patient: 'বেগম সুফিয়া খাতুন', units: '১ ব্যাগ', verified: true },
    { id: '2', date: '২০২৬-০১-২০', hospital: 'বিএসএমএমইউ (পিজি হাসপাতাল)', patient: 'মো. রফিকুল ইসলাম', units: '১ ব্যাগ', verified: true },
    { id: '3', date: '২০২৫-০৯-১২', hospital: 'সিএমএইচ ঢাকা', patient: 'জরুরি ট্রমা রোগী', units: '১ ব্যাগ', verified: true },
    { id: '4', date: '২০২৫-০৫-০৪', hospital: 'রেড ক্রিসেন্ট ব্লাড সেন্টার', patient: 'স্বেচ্ছাসেবী ক্যাম্প', units: '১ ব্যাগ', verified: true }
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newHospital, setNewHospital] = useState('');
  const [newPatient, setNewPatient] = useState('');

  const handleAddDonation = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      date: newDate,
      hospital: newHospital,
      patient: newPatient || 'জরুরি রোগী',
      units: '১ ব্যাগ',
      verified: true
    };
    setRecords([newEntry, ...records]);
    setAddModalOpen(false);
    setNewHospital('');
    setNewPatient('');
    addToast('নতুন রক্তদানের রেকর্ড সফলভাবে যোগ করা হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">রক্তদান হিস্টোরি ও সম্মাননা</h1>
          <p className="text-xs sm:text-sm text-slate-500">আপনার মানবসেবার প্রতিটি রক্তদানের স্থায়ী রেকর্ড</p>
        </div>

        <Button variant="emergency" size="sm" onClick={() => setAddModalOpen(true)} leftIcon={<PlusCircle className="w-4 h-4" />}>
          নতুন রক্তদান রেকর্ড যোগ করুন
        </Button>
      </div>

      {/* Badge Achievement Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs flex-shrink-0">
            <Award className="w-9 h-9 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200">বর্তমান ডোনার সম্মাননা</span>
            <h3 className="text-2xl font-black">গোল্ড লাইফ সেভার ব্যাজ (Gold Donor)</h3>
            <p className="text-xs text-rose-100 mt-1">আপনি ইতিমধ্যে ১২ বার রক্তদান করে বহু মানুষের জীবন বাঁচিয়েছেন!</p>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs text-center border border-white/20">
          <span className="text-xs text-rose-200 block">পরবর্তী রক্তদানের সম্ভাব্য তারিখ</span>
          <span className="text-lg font-bold block text-white mt-0.5">১৪ সেপ্টেম্বর ২০২৬</span>
          <span className="text-[11px] text-emerald-300 font-bold block mt-1">✓ বর্তমানে রক্তদানে প্রস্তুত</span>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <Table headers={['তারিখ', 'হাসপাতাল / স্থান', 'রোগীর বিবরণ', 'পরিমাণ', 'স্ট্যাটাস']}>
          {records.map(rec => (
            <tr key={rec.id} className="hover:bg-slate-50/70 text-xs sm:text-sm">
              <td className="px-5 py-4 font-bold text-slate-900">{rec.date}</td>
              <td className="px-5 py-4 text-slate-700">{rec.hospital}</td>
              <td className="px-5 py-4 text-slate-600">{rec.patient}</td>
              <td className="px-5 py-4 font-bold text-rose-600">{rec.units}</td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Add Donation Modal */}
      {addModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAddModalOpen(false)}
          title="নতুন রক্তদানের তথ্য সংরক্ষণ"
          subtitle="আপনার সফল রক্তদানের তথ্য যোগ করুন"
        >
          <form onSubmit={handleAddDonation} className="space-y-4">
            <Input
              label="রক্তদানের তারিখ"
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <Input
              label="হাসপাতাল / ব্লাড ব্যাংকের নাম"
              required
              value={newHospital}
              onChange={(e) => setNewHospital(e.target.value)}
              placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল"
            />
            <Input
              label="রোগী বা ইভেন্টের বিবরণ"
              value={newPatient}
              onChange={(e) => setNewPatient(e.target.value)}
              placeholder="যেমন: থ্যালাসেমিয়া রোগী / ওপেন হার্ট সার্জারি"
            />

            <div className="flex items-center gap-3 pt-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setAddModalOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit" variant="emergency" className="flex-1">
                সংরক্ষণ করুন
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function NotificationsPage() {
  const [filter, setFilter] = useState('ALL');
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'emergency', title: 'জরুরি রক্তের অনুরোধ!', desc: 'ঢাকা মেডিকেলে ও-নেগেটিভ (O-) রক্তের অতি জরুরি প্রয়োজন।', time: '১০ মিনিট আগে', unread: true },
    { id: '2', type: 'donor_response', title: 'রক্তদাতা আপনার অনুরোধ গ্রহণ করেছেন', desc: 'ডোনার তানভীর আহমেদ আপনার রক্তদানের আবেদনে সম্মতি দিয়েছেন।', time: '১ ঘণ্টা আগে', unread: true },
    { id: '3', type: 'system', title: 'প্রোফাইল ভেরিফাইড হয়েছে', desc: 'অভিনন্দন! আপনার স্বেচ্ছাসেবী ডোনার অ্যাকাউন্ট সফলভাবে যাচাই করা হয়েছে।', time: '২ দিন আগে', unread: false }
  ]);

  const filtered = filter === 'ALL' ? notifications : notifications.filter(n => n.type === filter);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">বিজ্ঞপ্তিসমূহ (Notifications)</h1>
          <p className="text-xs sm:text-sm text-slate-500">জরুরি রক্তের নোটিফিকেশন ও সিস্টেম আপডেট</p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          {[{ id: 'ALL', label: 'সকল' }, { id: 'emergency', label: 'জরুরি' }, { id: 'donor_response', label: 'ডোনার মেসেজ' }].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(n => (
          <div
            key={n.id}
            className={`p-5 rounded-3xl border transition-colors flex items-start gap-4 ${n.unread ? 'bg-rose-50/40 border-rose-200/80 font-medium' : 'bg-white border-slate-200/80 text-slate-600'}`}
          >
            <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-rose-600 animate-ping' : 'bg-slate-300'}`} />
            <div className="flex-1 text-xs sm:text-sm">
              <h4 className="font-bold text-slate-900 mb-0.5">{n.title}</h4>
              <p className="text-slate-600 leading-relaxed">{n.desc}</p>
              <span className="text-[11px] text-slate-400 mt-2 block">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
