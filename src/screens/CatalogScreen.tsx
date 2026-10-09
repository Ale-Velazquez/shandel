import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types/bakery';

interface CatalogScreenProps {
  products: Product[];
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  categories,
  selectedCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  favorites,
  onToggleFavorite,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Filter published products only for customer catalog
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.isPublished);

    if (selectedCategoryId && selectedCategoryId !== 'all') {
      list = list.filter((p) => p.categoryId === selectedCategoryId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.flavors.some((f) => f.name.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    } else {
      // popular
      list = [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [products, selectedCategoryId, searchQuery, sortBy]);

  const totalPublishedCount = products.filter((p) => p.isPublished).length;

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. Encabezado sutil */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
            Selección Artesanal
          </span>
          <span className="text-xs text-[#524345] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#2f6736] animate-pulse"></span>
            {totalPublishedCount} delicias activas
          </span>
        </div>
        <h1 className="font-serif-shandel text-2xl sm:text-3xl font-semibold text-[#2a170f] tracking-tight">
          Catálogo de Repostería
        </h1>
        <p className="text-xs sm:text-sm text-[#524345] leading-relaxed">
          Elaborados diariamente con mantequilla pura, vainas de vainilla de Papantla y chocolate de origen.
        </p>
      </div>

      {/* 2. Buscador sensorial y selector de orden */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#524345]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, sabor o textura..."
            className="w-full h-12 pl-10 pr-10 rounded-2xl bg-white text-[#2a170f] text-sm placeholder:text-[#857374] focus:outline-none focus:ring-2 focus:ring-[#8a4853]/40 border border-[#d7c1c3]/30 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#524345] hover:text-[#8a4853]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Fila de contador interactivo y ordenamiento */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#524345]">
            <span className="material-symbols-outlined text-[16px] text-[#8a4853]">
              auto_awesome
            </span>
            <span className="font-medium">
              Mostrando {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'} disponible{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fff1ec] border border-[#d7c1c3]/40 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">
                swap_vert
              </span>
              <select
                aria-label="Ordenar productos"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#2a170f] font-semibold focus:outline-none appearance-none pr-3 cursor-pointer"
              >
                <option value="popular">Más Populares</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
              <span className="material-symbols-outlined text-[14px] text-[#524345] -ml-2 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Píldoras de Categorías (Horizontal Scrollable) */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-5">
        <div className="flex items-center gap-2 min-w-max py-1">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 ${
              selectedCategoryId === 'all' || !selectedCategoryId
                ? 'bg-[#8a4853] text-white'
                : 'bg-white text-[#2a170f] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
            }`}
          >
            <span>Todos</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategoryId === 'all' || !selectedCategoryId
                  ? 'bg-white/20 text-white'
                  : 'bg-[#ffe9e2] text-[#8a4853]'
              }`}
            >
              {totalPublishedCount}
            </span>
          </button>

          {categories
            .filter((c) => !c.isHidden)
            .map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#8a4853] text-white'
                      : 'bg-white text-[#2a170f] hover:bg-[#ffe9e2] border border-[#d7c1c3]/30'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
        </div>
      </div>

      {/* 4. Rejilla de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((prod) => {
            const isFav = favorites.includes(prod.id);
            const statusConfig =
              prod.status === 'disponible_hoy'
                ? { label: 'Disponible hoy', bg: 'bg-[#b4f2b3]', text: 'text-[#002107]', dot: 'bg-[#2f6736]' }
                : prod.status === 'bajo_pedido'
                ? { label: 'Bajo pedido', bg: 'bg-[#ffdea5]', text: 'text-[#261900]', dot: 'bg-[#775a19]' }
                : { label: 'Personalizable', bg: 'bg-[#ffd9dd]', text: 'text-[#3a0915]', dot: 'bg-[#8a4853]' };

            return (
              <article
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-[#d7c1c3]/30 transition-all duration-300 group cursor-pointer"
              >
                {/* Product Image & Badges */}
                <div className="relative w-full aspect-[4/3] bg-[#ffe9e2] overflow-hidden">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    type="button"
                    aria-label="Agregar a favoritos"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(prod.id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-sm ${
                      isFav ? 'text-[#8a4853]' : 'text-[#857374] hover:text-[#8a4853]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Info Content */}
                <div className="flex-1 flex flex-col p-4 justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-serif-shandel text-base font-semibold text-[#2a170f] leading-snug line-clamp-1 group-hover:text-[#8a4853] transition-colors">
                      {prod.name}
                    </h2>
                    <p className="text-xs text-[#524345] line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#d7c1c3]/20 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
                        Precio estimado
                      </span>
                      <div className="flex items-baseline gap-1 text-[#2a170f]">
                        <span className="font-serif-shandel text-base font-bold text-[#8a4853]">
                          ${prod.basePrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-medium text-[#524345]">MXN</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="w-full h-11 rounded-xl bg-[#ffe9e2] hover:bg-[#8a4853] text-[#2a170f] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                    >
                      <span>Ver detalles</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* 5. Estado Vacío Elegante */
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-2xl shadow-sm border border-[#d7c1c3]/30 mt-2">
          <div className="w-16 h-16 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#8a4853] mb-3">
            <span className="material-symbols-outlined text-[32px]">cookie</span>
          </div>
          <h3 className="font-serif-shandel text-xl font-semibold text-[#2a170f] mb-1">
            Ninguna receta encontrada
          </h3>
          <p className="text-xs text-[#524345] max-w-xs mb-4">
            No encontramos postres con ese término de búsqueda. Prueba explorando otra categoría o borra el filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#8a4853] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
          >
            Ver todo el catálogo
          </button>
        </div>
      )}

      {/* 6. Banner Informativo de Pedidos y Cotizaciones */}
      <aside className="mt-8 p-4 rounded-2xl bg-[#fff1ec] border border-[#d7c1c3]/40 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#fed488] text-[#785a1a] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[22px]">info</span>
        </div>
        <div className="flex-1 flex flex-col">
          <span className="text-sm font-semibold text-[#2a170f]">
            Nota de Pedidos y Cotizaciones
          </span>
          <p className="text-xs text-[#524345] leading-relaxed">
            Los precios se expresan en Pesos Mexicanos (MXN). Catálogo de consulta digital sin cobro en línea inmediato. Su solicitud pasará a confirmación directa con nuestro obrador para garantizar frescura y disponibilidad.
          </p>
        </div>
      </aside>
    </div>
  );
};
