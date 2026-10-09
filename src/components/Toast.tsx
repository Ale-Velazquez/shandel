import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 bg-[#422b22] text-[#ffede7] px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className={`material-symbols-outlined text-[20px] flex-shrink-0 ${
            type === 'error' ? 'text-[#ffdad6]' : 'text-[#b4f2b3]'
          }`}
        >
          {type === 'error' ? 'error' : 'check_circle'}
        </span>
        <span className="text-sm font-medium leading-snug truncate">{message}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-[11px] font-bold uppercase tracking-wider text-[#d7c1c3] hover:text-white px-2 py-1 rounded"
      >
        Listo
      </button>
    </div>
  );
};
