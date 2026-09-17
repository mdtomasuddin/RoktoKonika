import React from 'react';
import { BANGLADESH_DIVISIONS } from '../../mocks/locations';
import { BLOOD_GROUPS } from '../../constants';

export function LocationSelector({
  division,
  district,
  area,
  onDivisionChange,
  onDistrictChange,
  onAreaChange,
  showArea = true,
  layout = 'grid',
  required = false
}) {
  const divisions = Object.values(BANGLADESH_DIVISIONS);
  const currentDivObj = division ? BANGLADESH_DIVISIONS[division] : null;
  const districts = currentDivObj ? Object.values(currentDivObj.districts) : [];
  const currentDistObj = district && currentDivObj ? currentDivObj.districts[district] : null;
  const areas = currentDistObj ? currentDistObj.areas : [];

  const handleDivisionSelect = (e) => {
    const val = e.target.value;
    onDivisionChange(val);
    if (onDistrictChange) onDistrictChange('');
    if (onAreaChange) onAreaChange('');
  };

  const handleDistrictSelect = (e) => {
    const val = e.target.value;
    onDistrictChange(val);
    if (onAreaChange) onAreaChange('');
  };

  return (
    <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-3'}>
      {/* Division */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          বিভাগ {required && <span className="text-rose-500">*</span>}
        </label>
        <select
          value={division || ''}
          onChange={handleDivisionSelect}
          className="w-full text-sm rounded-xl border border-slate-300 bg-white py-2.5 px-3 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        >
          <option value="">সকল বিভাগ / নির্বাচন করুন</option>
          {divisions.map(d => (
            <option key={d.name} value={d.name}>{d.banglaName} ({d.name})</option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          জেলা {required && <span className="text-rose-500">*</span>}
        </label>
        <select
          value={district || ''}
          onChange={handleDistrictSelect}
          disabled={!division}
          className="w-full text-sm rounded-xl border border-slate-300 bg-white py-2.5 px-3 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">সকল জেলা</option>
          {districts.map(dist => (
            <option key={dist.name} value={dist.name}>{dist.banglaName}</option>
          ))}
        </select>
      </div>

      {/* Area */}
      {showArea && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            এলাকা / থানা
          </label>
          <select
            value={area || ''}
            onChange={(e) => onAreaChange && onAreaChange(e.target.value)}
            disabled={!district || areas.length === 0}
            className="w-full text-sm rounded-xl border border-slate-300 bg-white py-2.5 px-3 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">সকল এলাকা</option>
            {areas.map((ar, idx) => (
              <option key={idx} value={ar}>{ar}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

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
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 border
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
