import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types/bakery';

interface AdminDashboardScreenProps {
  products: Product[];
  categories: Category[];
  onToggleProductVisibility: (productId: string) => void;
  onEditProduct: (product: Product) => void;
  onCreateProduct: () => void;
  onDeleteProductClick: (product: Product) => void;
  onOpenCategoriesManager: () => void;
  onOpenStoreSettings: () => void;
  onLogout: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  products,
  categories,
  onToggleProductVisibility,
  onEditProduct,
  onCreateProduct,
  onDeleteProductClick,
  onOpenCategoriesManager,
  onOpenStoreSettings,
  onLogout,
}) => {
  const [filterSegment, setFilterSegment] = useState<'todos' | 'publicados' | 'ocultos' | 'destacados'>('todos');
  const [searchAdmin, setSearchAdmin] = useState('');

  // Counts
  const totalCount = products.length;
  const publishedCount = products.filter((p) => p.isPublished).length;
  const hiddenCount = products.filter((p) => !p.isPublished).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;
  const activeCategoriesCount = categories.filter((c) => !c.isHidden).length;

  const filteredList = useMemo(() => {
    let list = products;
    if (filterSegment === 'publicados') {
      list = list.filter((p) => p.isPublished);
    } else if (filterSegment === 'ocultos') {
      list = list.filter((p) => !p.isPublished);
    } else if (filterSegment === 'destacados') {
      list = list.filter((p) => p.isFeatured);
    }

    if (searchAdmin.trim()) {
      const q = searchAdmin.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, filterSegment, searchAdmin]);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. Sincronización y Chip de estado en nube */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe2d8] text-[#524345]">
          <span className="w-2 h-2 rounded-full bg-[#2f6736] animate-pulse"></span>
          <span className="text-[11px] font-semibold tracking-normal">
            Sincronizado con la base de datos
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#857374]">v2.4.1 • Modo Admin</span>
      </div>

      {/* 2. Tarjeta de Perfil / Administradora */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#d7c1c3]/30 mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtqQwFFhJEvQbkRgZ4u64_NmIOspXH8UXQy46jUEiGkRMRGaV0Q8bWz5j4jBgip0DUZ12DbiEAkEpMQk7mjyzUf4Zb84jVp6bU21DqqHJoH-dSMy7IBQ6Krj9BHIlKVxs-WUNbiK3eD2gKOU9wgUtKVcna7unyr6MkQaHRzhEFuZkSa9G3ig2stpbF6--7KE4MC1zPi2MaUGojME-cZdZU2oxXBnx_vvWv0qGtB-vVB5UJEnjHw9LcnA"
                alt="Administradora Shandel"
                className="w-13 h-13 rounded-full object-cover shadow-xs ring-2 ring-[#ffd9dd]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#2f6736] ring-2 ring-white" />
            </div>
            <div className="min-w-0 flex flex-col">
              <h1 className="font-serif-shandel text-base sm:text-lg font-semibold text-[#2a170f] truncate leading-tight">
                Hola, Administradora Shandel
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#261900] text-[10px] font-bold">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  Rol: Administrador Principal
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Cerrar sesión"
            className="flex-shrink-0 p-2.5 rounded-xl bg-[#ffe2d8] text-[#524345] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>

      {/* 3. Bento de Métricas KPI (4 tarjetas) */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Total Productos */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#d7c1c3]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#524345] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Total Productos
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#8a4853]">inventory_2</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-shandel text-2xl font-bold text-[#2a170f]">{totalCount}</span>
            <span className="text-xs text-[#524345]">en tienda</span>
          </div>
          <div className="mt-2 w-full bg-[#ffe2d8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#8a4853] h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Publicados Activos */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#d7c1c3]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#524345] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Publicados
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#2f6736]">check_circle</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-shandel text-2xl font-bold text-[#2a170f]">{publishedCount}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#b4f2b3] text-[#002107] text-[10px] font-bold">
              Activos
            </span>
          </div>
          <div className="mt-2 w-full bg-[#ffe2d8] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#2f6736] h-full rounded-full"
              style={{ width: `${totalCount > 0 ? (publishedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Ocultos / Pausa */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#d7c1c3]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#524345] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Ocultos / Pausa
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#857374]">visibility_off</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-shandel text-2xl font-bold text-[#2a170f]">{hiddenCount}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ffe2d8] text-[#524345] text-[10px] font-bold">
              Borrador
            </span>
          </div>
          <div className="mt-2 w-full bg-[#ffe2d8] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#857374] h-full rounded-full"
              style={{ width: `${totalCount > 0 ? (hiddenCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#d7c1c3]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#524345] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Categorías
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#775a19]">category</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-shandel text-2xl font-bold text-[#2a170f]">
              {activeCategoriesCount}
            </span>
            <span className="text-xs text-[#524345]">activas</span>
          </div>
          <div className="mt-2 w-full bg-[#ffe2d8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#e9c176] h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* 4. Acción de Creación Principal */}
      <div className="mb-3">
        <button
          type="button"
          onClick={onCreateProduct}
          className="w-full flex items-center justify-center gap-2 bg-[#8a4853] hover:bg-[#a6606b] text-white py-3.5 px-4 rounded-xl font-semibold text-sm shadow-sm active:scale-[0.99] transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          <span>+ Nuevo Producto de Repostería</span>
        </button>
      </div>

      {/* 5. Acciones Rápidas Secundarias */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          type="button"
          onClick={onOpenCategoriesManager}
          className="flex items-center justify-center gap-2 bg-white text-[#2a170f] py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#d7c1c3]/30 shadow-xs hover:bg-[#ffe9e2] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#775a19]">folder_managed</span>
          <span>Categorías</span>
        </button>

        <button
          type="button"
          onClick={onOpenStoreSettings}
          className="flex items-center justify-center gap-2 bg-white text-[#2a170f] py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#d7c1c3]/30 shadow-xs hover:bg-[#ffe9e2] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#8a4853]">schedule</span>
          <span>Tienda y Horarios</span>
        </button>
      </div>

      {/* 6. Barra de Segmentos y Filtros */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif-shandel text-lg font-semibold text-[#2a170f]">
          Catálogo Comercial
        </h2>
        <span className="text-xs text-[#857374] font-medium">Total {totalCount} ítems</span>
      </div>

      {/* Buscador interno admin */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchAdmin}
          onChange={(e) => setSearchAdmin(e.target.value)}
          placeholder="Buscar por nombre, SKU o categoría..."
          className="w-full h-10 pl-9 pr-8 rounded-xl bg-white text-xs text-[#2a170f] border border-[#d7c1c3]/30 focus:outline-none focus:ring-1 focus:ring-[#8a4853]"
        />
        <span className="material-symbols-outlined text-[18px] text-[#857374] absolute left-2.5 top-2.5 pointer-events-none">
          search
        </span>
        {searchAdmin && (
          <button
            type="button"
            onClick={() => setSearchAdmin('')}
            className="absolute right-2.5 top-2.5 text-[#857374] hover:text-[#2a170f]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Botones de filtro de estado */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        <button
          type="button"
          onClick={() => setFilterSegment('todos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
            filterSegment === 'todos'
              ? 'bg-[#8a4853] text-white'
              : 'bg-white text-[#524345] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
          }`}
        >
          Todos ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterSegment('publicados')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
            filterSegment === 'publicados'
              ? 'bg-[#8a4853] text-white'
              : 'bg-white text-[#524345] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
          }`}
        >
          Publicados ({publishedCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterSegment('ocultos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
            filterSegment === 'ocultos'
              ? 'bg-[#8a4853] text-white'
              : 'bg-white text-[#524345] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
          }`}
        >
          Ocultos ({hiddenCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterSegment('destacados')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
            filterSegment === 'destacados'
              ? 'bg-[#8a4853] text-white'
              : 'bg-white text-[#524345] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
          }`}
        >
          Destacados ({featuredCount})
        </button>
      </div>

      {/* 7. Lista de Gestión de Productos */}
      <div className="flex flex-col gap-3">
        {filteredList.map((prod) => {
          return (
            <div
              key={prod.id}
              className={`bg-white rounded-2xl p-3.5 shadow-xs border border-[#d7c1c3]/30 flex flex-col gap-3 transition-opacity ${
                !prod.isPublished ? 'opacity-90' : ''
              }`}
            >
              <div className="flex gap-3 items-start">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#ffe9e2] border border-[#d7c1c3]/20">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className={`w-full h-full object-cover ${!prod.isPublished ? 'grayscale-[30%]' : ''}`}
                  />
                  {!prod.isPublished && (
                    <div className="absolute inset-0 bg-[#422b22]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[20px]">
                        visibility_off
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    {prod.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#b4f2b3] text-[#002107] text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2f6736]" />
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffe2d8] text-[#524345] text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#857374]" />
                        Oculto / Pausa
                      </span>
                    )}

                    {prod.isFeatured && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#261900] text-[10px] font-bold tracking-wider uppercase">
                        <span
                          className="material-symbols-outlined text-[12px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        Destacado
                      </span>
                    )}

                    <span className="text-[10px] font-medium text-[#857374] ml-auto">
                      {prod.sku}
                    </span>
                  </div>

                  <h3 className="font-serif-shandel text-sm font-semibold text-[#2a170f] leading-snug truncate">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#524345] mt-0.5">
                    Categoría: <span className="font-semibold text-[#2a170f]">{prod.categoryName}</span>
                  </p>
                  <p className="text-sm font-bold text-[#8a4853] mt-1">
                    ${prod.basePrice.toFixed(2)}{' '}
                    <span className="text-[10px] text-[#857374] font-normal">MXN</span>
                  </p>
                </div>
              </div>

              {/* Barra de control de fila (Switch de visibilidad + Editar + Eliminar) */}
              <div className="flex items-center justify-between pt-2 bg-[#fff1ec] px-3 py-2 rounded-xl">
                {/* Switch de Visibilidad */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleProductVisibility(prod.id);
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      prod.isPublished ? 'bg-[#2f6736]' : 'bg-[#d7c1c3]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                        prod.isPublished ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-[#524345] font-medium">
                    {prod.isPublished ? 'Visible en catálogo' : 'Oculto en catálogo'}
                  </span>
                </label>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditProduct(prod)}
                    className="w-8 h-8 rounded-full bg-white text-[#524345] hover:text-[#8a4853] flex items-center justify-center shadow-2xs border border-[#d7c1c3]/40 active:scale-95 transition-all"
                    title="Editar producto"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteProductClick(prod)}
                    className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white flex items-center justify-center shadow-2xs active:scale-95 transition-all"
                    title="Eliminar producto"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#d7c1c3]/30 text-xs text-[#524345]">
            No hay productos registrados en este filtro.
          </div>
        )}
      </div>
    </div>
  );
};
