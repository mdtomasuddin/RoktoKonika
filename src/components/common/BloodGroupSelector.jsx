import React from 'react';
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function BloodGroupSelector({ value, onChange, includeAll = false, className = '' }) {
  const groups = includeAll ? ['ALL', ...BLOOD_GROUPS] : BLOOD_GROUPS;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {groups.map(bg => {
        const isSelected = value === bg;
        const label = bg === 'ALL' ? 'সকল গ্রুপ' : bg;
        return (
          <button
            key={bg}
            type="button"
            onClick={() => onChange(bg)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border
              ${isSelected
                ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50'}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
