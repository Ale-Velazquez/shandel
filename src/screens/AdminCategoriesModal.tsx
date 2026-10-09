import React, { useState } from 'react';
import { Category } from '../types/bakery';

interface AdminCategoriesModalProps {
  isOpen: boolean;
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminCategoriesModal: React.FC<AdminCategoriesModalProps> = ({
  isOpen,
  categories,
  onUpdateCategories,
  onClose,
  onShowToast,
}) => {
  const [newCatName, setNewCatName] = useState('');

  if (!isOpen) return null;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: Category = {
      id: 'cat-' + Date.now(),
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/\s+/g, '-'),
      icon: 'category',
      count: 0,
      order: categories.length + 1,
      isHidden: false,
    };

    onUpdateCategories([...categories, newCat]);
    setNewCatName('');
    onShowToast(`Categoría "${newCat.name}" agregada`);
  };

  const handleToggleHide = (catId: string) => {
    const updated = categories.map((c) =>
      c.id === catId ? { ...c, isHidden: !c.isHidden } : c
    );
    onUpdateCategories(updated);
    onShowToast('Estado de categoría actualizado');
  };

  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) {
      onShowToast('Debe existir al menos una categoría en el sistema');
      return;
    }
    const updated = categories.filter((c) => c.id !== catId);
    onUpdateCategories(updated);
    onShowToast('Categoría eliminada');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= categories.length) return;

    const copy = [...categories];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    onUpdateCategories(copy);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#422b22]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto border border-[#d7c1c3]/30">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7c1c3]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19]">folder_managed</span>
            <h2 className="font-serif-shandel text-lg font-semibold text-[#2a170f]">
              Administrar Categorías
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

        {/* Crear nueva categoría */}
        <form onSubmit={handleAddCategory} className="flex gap-2 my-4">
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Nueva categoría (ej. Tartas Francesas)"
            className="flex-1 h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
          />
          <button
            type="submit"
            className="px-3.5 h-10 rounded-xl bg-[#775a19] text-white text-xs font-semibold hover:bg-[#5d4201] active:scale-95 transition-all"
          >
            + Agregar
          </button>
        </form>

        {/* Lista de categorías */}
        <div className="flex flex-col gap-2">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="p-3 rounded-2xl bg-[#fff1ec] border border-[#d7c1c3]/30 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#775a19] text-[18px]">
                  {cat.icon || 'category'}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-semibold truncate ${cat.isHidden ? 'line-through text-[#857374]' : 'text-[#2a170f]'}`}>
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#524345]">
                    {cat.isHidden ? 'Oculta en catálogo' : 'Visible para clientes'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Reordenar */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="w-7 h-7 rounded-lg bg-white text-[#524345] disabled:opacity-30 flex items-center justify-center"
                  title="Subir"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button
                  type="button"
                  disabled={idx === categories.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="w-7 h-7 rounded-lg bg-white text-[#524345] disabled:opacity-30 flex items-center justify-center"
                  title="Bajar"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>

                {/* Alternar visibilidad */}
                <button
                  type="button"
                  onClick={() => handleToggleHide(cat.id)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    cat.isHidden ? 'bg-[#fed488] text-[#785a1a]' : 'bg-white text-[#2f6736]'
                  }`}
                  title={cat.isHidden ? 'Mostrar categoría' : 'Ocultar categoría'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {cat.isHidden ? 'visibility_off' : 'visibility'}
                  </span>
                </button>

                {/* Eliminar */}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center hover:bg-[#ba1a1a] hover:text-white transition-colors"
                  title="Eliminar categoría"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-[#d7c1c3]/30">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#8a4853] text-white text-xs font-semibold"
          >
            Guardar &amp; Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
