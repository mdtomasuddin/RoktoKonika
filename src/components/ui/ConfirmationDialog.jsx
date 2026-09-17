import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'আপনি কি নিশ্চিত?',
  message = 'এই কাজটি সম্পন্ন করার পর পরিবর্তন করা যাবে না।',
  confirmText = 'হ্যাঁ, নিশ্চিত করুন',
  cancelText = 'বাতিল',
  variant = 'danger',
  isLoading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" showClose={!isLoading}>
      <div className="flex flex-col items-center text-center p-2">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-6">{message}</p>
        
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'primary' : 'emergency'}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
