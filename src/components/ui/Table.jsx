import React from 'react';

export function Table({ headers = [], children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white ${className}`}>
      <table className="w-full text-left text-sm text-slate-600">
        {headers.length > 0 && (
          <thead className="bg-slate-50/80 text-xs uppercase font-bold text-slate-700 border-b border-slate-200">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} scope="col" className="px-5 py-3.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}
