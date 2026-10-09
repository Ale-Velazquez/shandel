import React, { useState } from 'react';
import { StoreSettings } from '../types/bakery';

interface AdminStoreModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onSave: (newSettings: StoreSettings) => void;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminStoreModal: React.FC<AdminStoreModalProps> = ({
  isOpen,
  settings,
  onSave,
  onClose,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<StoreSettings>(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onShowToast('Información de la pastelería actualizada');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#422b22]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto border border-[#d7c1c3]/30">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7c1c3]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8a4853]">schedule</span>
            <h2 className="font-serif-shandel text-lg font-semibold text-[#2a170f]">
              Tienda, Horarios &amp; Políticas
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe9e2] text-[#524345] hover:text-[#2a170f] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Nombre Comercial
            </label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Horario Lunes a Sábado
            </label>
            <input
              type="text"
              required
              value={formData.scheduleWeekday}
              onChange={(e) => setFormData({ ...formData, scheduleWeekday: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Horario Domingos
            </label>
            <input
              type="text"
              required
              value={formData.scheduleWeekend}
              onChange={(e) => setFormData({ ...formData, scheduleWeekend: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Canal WhatsApp de Atención
            </label>
            <input
              type="text"
              required
              value={formData.phoneWhatsApp}
              onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none font-mono"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Ubicación / Ciudad
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#2a170f] uppercase">
              Aviso o Política de Demostración
            </label>
            <textarea
              rows={2}
              value={formData.noticeBanner}
              onChange={(e) => setFormData({ ...formData, noticeBanner: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 outline-none"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-[#d7c1c3]/30">
            <button
              type="submit"
              className="flex-1 h-11 bg-[#8a4853] hover:bg-[#a6606b] text-white rounded-xl text-xs font-semibold"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-11 bg-[#ffe2d8] text-[#2a170f] rounded-xl text-xs font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
