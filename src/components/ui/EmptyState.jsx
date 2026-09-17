import React from 'react';
import { Search, HeartHandshake, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = HeartHandshake,
  title = 'কোনো তথ্য পাওয়া যায়নি',
  description = 'আপনার দেওয়া ফিল্টার বা অনুসন্ধানের তথ্যের সাথে মিল পাওয়া যায়নি। অন্য তথ্য দিয়ে চেষ্টা করুন।',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`} />
  );
}

export function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold'
  };

  const getInitials = (n) => {
    if (!n) return 'র';
    const parts = n.trim().split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0 ${sizes[size]} ${className}`}>
      {getInitials(name)}
    </div>
  );
}

export function StatusIndicator({ status, label, className = '' }) {
  const statusColors = {
    available: 'bg-emerald-500',
    low: 'bg-amber-500',
    critical: 'bg-rose-500 animate-pulse',
    unavailable: 'bg-slate-400',
    active: 'bg-emerald-500',
    fulfilled: 'bg-sky-500',
    pending: 'bg-amber-500'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status] || 'bg-slate-400'}`} />
      {label && <span>{label}</span>}
    </span>
  );
}

export function Alert({ type = 'info', title, message, action, className = '' }) {
  const types = {
    info: 'bg-sky-50 text-sky-900 border-sky-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    emergency: 'bg-rose-50 text-rose-950 border-rose-200',
    success: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  };

  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${types[type] || types.info} ${className}`}>
      <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">
        {title && <h4 className="font-bold mb-0.5">{title}</h4>}
        <div className="leading-relaxed opacity-90">{message}</div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'অনুসন্ধান করুন...', onClear, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 placeholder-slate-400 transition-all"
      />
    </div>
  );
}
