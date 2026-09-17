import React from 'react';

export function Input({
  label,
  error,
  helperText,
  required = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`block w-full rounded-xl border bg-white text-slate-900 placeholder-slate-400 text-sm transition-all duration-200
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            py-2.5
            ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'}
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

export function Select({
  label,
  error,
  helperText,
  required = false,
  options = [],
  className = '',
  id,
  placeholder,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`block w-full rounded-xl border bg-white text-slate-900 text-sm py-2.5 px-3.5 transition-all duration-200 appearance-none
            ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'}
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt, idx) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const val = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return <option key={idx} value={val}>{text}</option>;
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  required = false,
  className = '',
  id,
  rows = 3,
  ...props
}) {
  const areaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={areaId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      <textarea
        id={areaId}
        rows={rows}
        className={`block w-full rounded-xl border bg-white text-slate-900 placeholder-slate-400 text-sm p-3.5 transition-all duration-200
          ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'}
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
