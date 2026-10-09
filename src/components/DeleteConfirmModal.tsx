import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  productName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#422b22]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 transition-opacity duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 border border-[#d7c1c3]/30">
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-1">
          <span className="material-symbols-outlined text-[26px]">warning</span>
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-1">
          <h3 className="font-serif-shandel text-[19px] text-[#2a170f] font-semibold leading-snug">
            ¿Deseas eliminar <span className="font-bold text-[#8a4853]">"{productName}"</span>?
          </h3>
          <p className="text-sm text-[#524345] leading-relaxed mt-1">
            Esta acción no se puede deshacer y retirará el pastel del catálogo público de inmediato.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full bg-[#ba1a1a] text-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#93000a] active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">delete_forever</span>
            <span>Sí, eliminar producto</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-[#ffe2d8] text-[#2a170f] py-2.5 px-4 rounded-xl font-semibold text-sm hover:bg-[#ffdbce] active:scale-95 transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
