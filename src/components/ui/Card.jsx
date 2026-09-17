import React from 'react';

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
      className={`bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300
        ${hoverEffect ? 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5' : ''}
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
