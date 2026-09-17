import React from 'react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-4 font-medium text-sm border-b-2 transition-all duration-200 whitespace-nowrap
              ${isActive 
                ? 'border-rose-600 text-rose-600 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Table({ headers, children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white ${className}`}>
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50/80 text-xs uppercase font-bold text-slate-700 border-b border-slate-200">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} scope="col" className="px-5 py-3.5 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between gap-4 py-4 ${className}`}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3.5 py-2 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        পূর্ববর্তী
      </button>

      <span className="text-sm font-medium text-slate-600">
        পৃষ্ঠা <span className="font-bold text-slate-900">{currentPage}</span> / {totalPages}
      </span>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3.5 py-2 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        পরবর্তী
      </button>
    </div>
  );
}
