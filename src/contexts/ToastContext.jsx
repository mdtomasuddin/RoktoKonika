import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
            info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />
          };

          const borderColors = {
            success: 'border-emerald-200 bg-white text-emerald-950',
            error: 'border-rose-200 bg-white text-rose-950',
            warning: 'border-amber-200 bg-white text-amber-950',
            info: 'border-sky-200 bg-white text-sky-950'
          };

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform translate-y-0 duration-300 animate-in fade-in slide-in-from-bottom-5 ${borderColors[toast.type] || borderColors.info}`}
            >
              {icons[toast.type] || icons.info}
              <div className="flex-1 text-sm font-medium leading-snug">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
