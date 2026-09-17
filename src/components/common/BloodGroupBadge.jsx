import React from 'react';
import { Droplet } from 'lucide-react';
import { URGENCY_LABELS } from '../../constants';

export function BloodGroupBadge({ bloodGroup, size = 'md', className = '' }) {
  const isNegative = bloodGroup && bloodGroup.includes('-');

  const sizes = {
    sm: 'text-xs px-2 py-0.5 min-w-[36px]',
    md: 'text-sm px-3 py-1 min-w-[48px]',
    lg: 'text-base px-4 py-1.5 min-w-[56px] font-bold',
    xl: 'text-xl px-5 py-2.5 min-w-[70px] font-extrabold'
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded-xl border shadow-sm transition-transform ${sizes[size]}
        ${isNegative 
          ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-700' 
          : 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-600'}
        ${className}`}
    >
      <Droplet className="w-3.5 h-3.5 mr-1 fill-white opacity-80" />
      <span className="tracking-tight">{bloodGroup}</span>
    </span>
  );
}

export function UrgencyBadge({ level = 'urgent', size = 'md', className = '' }) {
  const config = URGENCY_LABELS[level] || URGENCY_LABELS.normal;

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${config.color} ${sizes[size]} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.text}
    </span>
  );
}
