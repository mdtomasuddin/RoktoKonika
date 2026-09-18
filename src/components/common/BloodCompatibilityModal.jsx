import React from 'react';
import { Modal } from '../ui/Modal';

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const BLOOD_COMPATIBILITY = {
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
  'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] }
};

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
