import React, { useState } from 'react';
import { MapPin, Navigation, Hospital as HospitalIcon, Phone, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function InteractiveMapMock({ items = [], type = 'donors', onSelect }) {
  const [activePin, setActivePin] = useState(items[0] || null);

  // Simulated GPS pins around Bangladesh map canvas
  const pinCoordinates = [
    { top: '35%', left: '48%', label: 'Dhaka Central' },
    { top: '42%', left: '52%', label: 'Dhanmondi' },
    { top: '30%', left: '54%', label: 'Uttara' },
    { top: '65%', left: '78%', label: 'Chattogram' },
    { top: '25%', left: '75%', label: 'Sylhet' },
    { top: '38%', left: '28%', label: 'Rajshahi' },
    { top: '58%', left: '38%', label: 'Khulna' },
    { top: '70%', left: '50%', label: 'Barishal' },
  ];

  return (
    <div className="relative w-full h-[520px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl flex flex-col justify-between p-4 sm:p-6 text-white select-none">
      {/* Map Grid Background Styling */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#e11d48 1px, transparent 1px), radial-gradient(#38bdf8 1px, #0f172a 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px'
        }}
      />

      {/* Map Header Control */}
      <div className="relative z-10 flex items-center justify-between bg-slate-800/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700 max-w-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            {type === 'donors' ? 'লাইভ রক্তদাতা মানচিত্র' : 'নিকটস্থ হাসপাতাল ও ব্লাড ব্যাংক নেটওয়ার্ক'}
          </span>
        </div>
        <span className="text-xs bg-rose-600/30 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
          {items.length} টি সক্রিয় অবস্থান
        </span>
      </div>

      {/* Pins on the Map */}
      <div className="absolute inset-0 pointer-events-auto">
        {items.slice(0, 8).map((item, idx) => {
          const pos = pinCoordinates[idx] || { top: `${30 + (idx * 6)}%`, left: `${40 + (idx * 5)}%` };
          const isSelected = activePin?.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                setActivePin(item);
                if (onSelect) onSelect(item);
              }}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group`}
            >
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-transform ${
                isSelected 
                  ? 'bg-rose-600 text-white scale-125 ring-4 ring-rose-400/40' 
                  : 'bg-slate-800 text-slate-200 border border-slate-600 hover:bg-rose-600 hover:text-white hover:scale-110'
              }`}>
                {type === 'donors' ? (
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                ) : (
                  <HospitalIcon className="w-3 h-3" />
                )}
                <span>{item.bloodGroup || item.banglaName?.slice(0, 10) || item.name?.slice(0, 10)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Floating Card */}
      {activePin && (
        <div className="relative z-10 self-center sm:self-start bg-slate-800/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h4 className="font-bold text-white text-base leading-tight">
                {activePin.name || activePin.banglaName}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {activePin.area}, {activePin.district || activePin.division}
              </p>
            </div>
            {activePin.bloodGroup && (
              <span className="px-2.5 py-1 rounded-xl bg-rose-600 font-extrabold text-xs text-white shadow-sm">
                {activePin.bloodGroup}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60 mt-3 text-xs">
            {activePin.isVerified && (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড
              </span>
            )}
            {activePin.emergencyHelpline && (
              <span className="flex items-center gap-1 text-sky-400 font-mono ml-auto">
                <Phone className="w-3.5 h-3.5" /> {activePin.emergencyHelpline}
              </span>
            )}
            {activePin.approxDistanceKm && (
              <span className="text-slate-400 ml-auto">
                প্রায় {activePin.approxDistanceKm} কি.মি. দূরত্বে
              </span>
            )}
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="relative z-10 self-end text-right text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
        বাংলাদেশ ডিজিটাল হেলথ জিপিএস সিমুলেশন
      </div>
    </div>
  );
}
