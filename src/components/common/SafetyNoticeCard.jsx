import React from 'react';
import { ShieldCheck, AlertCircle, HeartHandshake, FileCheck, PhoneCall } from 'lucide-react';
import { Modal } from '../ui/Modal';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BLOOD_COMPATIBILITY = {
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
  'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] }
};

export function SafetyNoticeCard({ type = 'transfusion', className = '' }) {
  if (type === 'transfusion') {
    return (
      <div className={`p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-sm ${className}`}>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">জরুরি নিরাপত্তা ও স্বাস্থ্যবিধি সংক্রান্ত নোটিশ</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              • রক্ত গ্রহণের পূর্বে হাসপাতাল বা রেজিস্টার্ড ল্যাবরেটরিতে বাধ্যতামূলকভাবে <strong>ক্রস-ম্যাচিং (Cross-matching)</strong> এবং স্ক্রিনিং (HIV, Hepatitis B/C, Malaria, Syphilis) সম্পন্ন করুন।
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              • রক্তকণিকা প্ল্যাটফর্ম শুধুমাত্র রোগী এবং রক্তদাতার মধ্যে সংযোগ স্থাপন করে। রক্তদাতার সাথে কোনো ধরনের আর্থিক লেনদেন করা থেকে বিরত থাকুন।
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'donor_privacy') {
    return (
      <div className={`p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-sky-950 text-xs sm:text-sm ${className}`}>
        <div className="flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">গোপনীয়তা সুরক্ষা: </span>
            <span>স্প্যাম এবং অপব্যবহার রোধে রক্তদাতার ব্যক্তিগত বাড়ির ঠিকানা ও পূর্ণ ফোন নম্বর সুরক্ষিত রাখা হয়েছে। রক্তদানের সরাসরি অনুরোধের মাধ্যমেই যোগাযোগ স্থাপন করা হয়।</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs sm:text-sm flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <PhoneCall className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <span>জরুরি জীবন সংকটাপন্ন অবস্থায় সরাসরি জাতীয় জরুরি সেবা <strong>৯৯৯</strong> অথবা নিকটস্থ হাসপাতালে যোগাযোগ করুন।</span>
      </div>
    </div>
  );
}

export function BloodCompatibilityModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="রক্তের গ্রুপ ও ম্যাচিং নির্দেশিকা (Blood Compatibility Matrix)"
      subtitle="কোন গ্রুপের রক্ত কাকে দেওয়া যায় এবং কার থেকে গ্রহণ করা যায়"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
              <tr>
                <th className="p-3">রক্তের গ্রুপ</th>
                <th className="p-3">যাদের রক্ত দিতে পারবেন (Donate To)</th>
                <th className="p-3">যাদের থেকে রক্ত নিতে পারবেন (Receive From)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BLOOD_GROUPS.map(bg => {
                const comp = BLOOD_COMPATIBILITY[bg];
                return (
                  <tr key={bg} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-rose-600 whitespace-nowrap">{bg}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {comp.canDonateTo.map(item => (
                          <span key={item} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {comp.canReceiveFrom.map(item => (
                          <span key={item} className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-600 space-y-1">
          <p>• <strong>O- (ও নেগেটিভ):</strong> সর্বজনীন দাতা (Universal Donor) — যেকোনো গ্রুপের রোগীকে রক্ত দিতে পারে।</p>
          <p>• <strong>AB+ (এবি পজিটিভ):</strong> সর্বজনীন গ্রহীতা (Universal Recipient) — যেকোনো গ্রুপের রক্ত গ্রহণ করতে পারে।</p>
        </div>
      </div>
    </Modal>
  );
}
