import React from 'react';

export function Badge({
  children,
  variant = 'slate',
  size = 'md',
  className = '',
  icon
}) {
  const variants = {
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    emergency: 'bg-rose-600 text-white font-bold shadow-sm animate-pulse'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-semibold gap-2'
  };

  return (
    <span className={`inline-flex items-center rounded-full border border-transparent font-medium ${variants[variant] || variants.slate} ${sizes[size] || sizes.md} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function Card({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300
        ${hoverEffect ? 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-5 sm:p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 sm:px-6 sm:py-4 bg-slate-50/70 border-t border-slate-100 ${className}`}>
      {children}
    </div>
  );
}
