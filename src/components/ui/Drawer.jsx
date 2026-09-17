import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right'
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const positionClasses = {
    right: 'inset-y-0 right-0 max-w-md w-full animate-in slide-in-from-right duration-300',
    left: 'inset-y-0 left-0 max-w-md w-full animate-in slide-in-from-left duration-300',
    bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-3xl animate-in slide-in-from-bottom duration-300'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 pointer-events-none flex">
        <div className={`pointer-events-auto fixed bg-white shadow-2xl flex flex-col ${positionClasses[position]}`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
            <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
