import React, { useState } from 'react';
import { Product, Category, ActiveScreen } from '../types/bakery';

interface HomeScreenProps {
  products: Product[];
  categories: Category[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onSearchQuery: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenStoreModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  categories,
  onSelectProduct,
  onNavigate,
  onSearchQuery,
  onSelectCategory,
  onOpenStoreModal,
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onSearchQuery(localSearch.trim());
      onNavigate('catalogo');
    }
  };

  // Best sellers selection
  const bestSellers = products.filter((p) => p.isPublished).slice(0, 3);

  // Category showcase images matching Stitch
  const getCatImage = (catId: string) => {
    switch (catId) {
      case 'cumpleanos':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtZF5dFV2annu7BxCNXoKAU0rByH1UnY52uFn1JIGQztniHdbcgOb0aS-91KfjnrMo_ZHkBd9mW5sKaNpmKF0bQR90_es2T2ADBe9oSGWzawdO8E9winS03XqFeKbnFQZre0464E6OJAjmI3EsRLemEdKhoKWt4eNzG1_qAWmC3YNEtM3Te3Q7m8C-r09QImsk5_30P4cVMJoP12QdSrXGk7yFcOiZ23PrICb2L2WerKW6ORh_nUOGag';
      case 'personalizados':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY4BJ5mE92CA86EEU1f38CjEL7C5F9yRP506nk7UJAGJDy206MbgHytX74sw8Txe-C4ojowVND78M1889rhcuoZ6M5uDCL5kiG3a_nFbgXfUgTEs280_cbGWFXkk4PFo0OVSpJ7E7po4conn46kZ0RmltOAIZMKx9T2ywBgpuv764-vO-QD3E9xIYQAdtu3Ds5ilRSEWz_mJKiAZzswCZOI0yPwNqD6ydByAAJJ6D9AlxCPpqxdRG6PA';
      case 'bodas':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9SBoPqjLajJ5uSPK6ySXQkb0mY0AcyQ5kYj8HBmXq8OIzqxlSVEGL-CMAr84Oz1C6u7VTiI7N-U0XgnRAxwCitFJnUVMd-iCj2GIcUqnTQMWibkiAtWQg-C20bUkkC5DnVJMIz-lrrQXKH3WZNygy5ehJgYxQWpg--9S3n3dxnzA-4yoZFu_BXRRLyHMAXGBu2t8crONsYUxENg6oFbApGEdwRl3la26pACbPrH6KOKFW1eL8jt6NHg';
      case 'cheesecakes':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCbs_O-B3w_ErKQ9Sgft53W8UY-EGvNrIN_XUBrB4XD78xowrY0ms2nKWaLnmKR5UJYRR5nPQUukQQ1OyLZN6KCiQibi_4Ybmr4kvCJXoWBOGi3kFiuivpSY8YjM165Zm2VEuIvWKumKb2s2IaHdyj3su5-8FBV_tv6H--AxetqfK5EfTfVavmaTnUg71-LdbqhtAGrNCRVaEsZm2tH4mRMLWjUOQUp8A_MjfA9n_TUIo2StYkMAfCWQ';
      case 'individuales':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaP2GJYyhFMIJXVXTI5HNVDW0pkBklNVJ4-F2epuiiUUiFex7l9wWPUQ4MDuNXuscr6W5IxP4RKnWLsBgv8sMjVpxxrA4sImdeVDRljR2wP5GbfTw2BTfrpuqW6dwi9JR1Ir85zezkM7Quxp2kdGTb-flhSres7HDogd70RoOR6OIFNM_uwbRLXR2i-dUHOF5KNETP2tDnmQLnSsXgiw-eqZaEDADD0vfTmBgCJJghq6HUaZs4Hy5xQw';
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsgUIjNKBNLcxiq7rJWKKCyigsDSoJJuJjrqnYK07F4l_G__BjyfV8p_-MoBv84BQ71JPsvu3ptmU87TTmnRfR-V7rxwHMU-Pfi9mZkZfYWC1r7Sy-UgrzNKF6Za5FeDo9mmcbwNNiV8-VdmGGFozdeztk3aKhXjuKb9adS354ojfrtoG2ws42YjMwB-yHKDykfqiyt45M9goW5WWECCmaK33Yw48AqGxC02ERj4KJRbSL_DOtEnleQg';
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-28">
      {/* 1. Header de bienvenida y buscador rápido */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
              Artesanía &amp; Tradición
            </span>
            <h1 className="font-serif-shandel text-2xl sm:text-3xl font-semibold text-[#2a170f] leading-tight">
              ¡Hola, bienvenido!
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fed488]/40 text-[#785a1a]">
            <span
              className="material-symbols-outlined text-[16px] text-[#775a19]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_florist
            </span>
            <span className="text-xs font-semibold">Taller abierto</span>
          </div>
        </div>

        {/* Formulario de búsqueda interactivo */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#524345]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Buscar pasteles, tartas o postres..."
            className="w-full h-12 pl-11 pr-12 rounded-2xl bg-white text-[#2a170f] placeholder:text-[#857374] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a4853]/40 border border-[#d7c1c3]/30 transition-all"
          />
          <button
            type="submit"
            aria-label="Filtrar catálogo"
            className="absolute right-1.5 w-9 h-9 rounded-xl bg-[#ffe9e2] text-[#2a170f] flex items-center justify-center hover:bg-[#ffe2d8] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </form>
      </section>

      {/* 2. Banner Hero Destacado */}
      <section className="relative overflow-hidden rounded-3xl bg-[#fff1ec] shadow-sm border border-[#d7c1c3]/30">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlVCNynfz9BcRFQpdL1TG-lhYyeFnI34r-0sgbTpUlCv9ymRKFDh-SStAB1E2nzi6Q6aC1C7c_taMhj5zohBF6xeSH7tAJJs4752d6XhghVnxhys3jsOhW_E9NmWCdHl5VTCBQGNKXp9MNl4zb2UosZj5joYet1h9Hi4xAil57PJFbkHEMAKde3oVPFp7P3LFWaplfmmFuRzyfh63ojxlI0KJetU8NabLcCaU5uaVYauFAqWy7ICqdIg"
            alt="Pastel Gourmet Shandel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#422b22]/90 via-[#422b22]/40 to-transparent" />

          {/* Badge Gourmet MX */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#775a19] shadow-sm font-semibold">
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="text-[11px] tracking-wider uppercase">Gourmet MX</span>
          </div>

          {/* Textos del Hero */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col gap-1.5 text-white">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ffdea5]">
              Pastelería Shandel
            </span>
            <h2 className="font-serif-shandel text-2xl sm:text-3xl text-white font-semibold leading-tight drop-shadow-sm">
              Momentos especiales, hechos más dulces
            </h2>
            <p className="text-xs sm:text-sm text-[#ffede7]/95 line-clamp-2">
              Repostería fina elaborada artesanalmente para tus celebraciones inolvidables en México.
            </p>
          </div>
        </div>

        {/* Botones de acción del Hero */}
        <div className="p-4 sm:p-5 bg-[#fff1ec] flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('catalogo')}
            className="w-full sm:flex-1 h-12 rounded-xl bg-[#8a4853] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-[#a6606b] active:scale-[0.99] transition-all"
          >
            <span>Explorar catálogo</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('personalizados')}
            className="w-full sm:flex-1 h-12 rounded-xl bg-white text-[#2a170f] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#ffe9e2] border border-[#d7c1c3]/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#775a19]">cake</span>
            <span>Pasteles personalizados</span>
          </button>
        </div>
      </section>

      {/* 3. Especialidades / Categorías (Carrusel horizontal) */}
      <section className="flex flex-col gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-shandel text-xl text-[#2a170f] font-semibold">
              Especialidades
            </h3>
            <p className="text-xs text-[#524345]">Elige por tu ocasión favorita</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalogo')}
            className="text-xs font-bold text-[#8a4853] flex items-center gap-0.5 hover:underline"
          >
            <span>Ver todo</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('catalogo');
              }}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 w-24 group focus:outline-none"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#ffe9e2] shadow-sm group-hover:shadow-md group-active:scale-95 transition-all relative border border-[#d7c1c3]/30">
                <img
                  src={getCatImage(cat.id)}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] font-semibold text-center text-[#2a170f] leading-tight line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Más Vendidos & Favoritos */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-shandel text-xl text-[#2a170f] font-semibold">
              Más Vendidos &amp; Favoritos
            </h3>
            <p className="text-xs text-[#524345]">Los consentidos de nuestros clientes</p>
          </div>
          <div className="flex items-center text-[#775a19]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {bestSellers.map((prod, idx) => {
            const badgeLabel = idx === 0 ? 'Top 1' : idx === 1 ? 'Favorito' : 'Clásico';
            const badgeStyle =
              idx === 0
                ? 'bg-[#ffdea5] text-[#261900]'
                : idx === 1
                ? 'bg-[#ffd9dd] text-[#3a0915]'
                : 'bg-[#fed488] text-[#785a1a]';

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-md border border-[#d7c1c3]/30 flex gap-3.5 items-center relative overflow-hidden cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 relative bg-[#ffe9e2]">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm ${badgeStyle}`}
                  >
                    {badgeLabel}
                  </span>
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0 h-28 py-0.5">
                  <div>
                    <div className="flex items-center gap-1 text-[#775a19] mb-0.5">
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-[11px] font-bold">{prod.rating || 4.9}</span>
                      <span className="text-[11px] text-[#857374]">
                        ({prod.reviewCount || 100})
                      </span>
                    </div>
                    <h4 className="font-serif-shandel text-base font-semibold text-[#2a170f] truncate leading-snug">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#524345] line-clamp-1">{prod.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold text-[#8a4853] tracking-tight">
                      ${prod.basePrice.toFixed(2)} MXN
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="h-8 px-3 rounded-lg bg-[#ffe2d8] text-[#2a170f] text-xs font-semibold flex items-center gap-1 hover:bg-[#8a4853] hover:text-white transition-all active:scale-95"
                    >
                      <span>Ver</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Sección Promocional: Atelier Creativo / Diseña tu pastel */}
      <section className="rounded-3xl p-5 bg-[#ffe9e2] relative overflow-hidden shadow-sm border border-[#d7c1c3]/40">
        <div className="relative flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdea5] flex items-center justify-center text-[#261900]">
              <span className="material-symbols-outlined text-[18px]">brush</span>
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#775a19]">
              Atelier Creativo
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-serif-shandel text-xl text-[#2a170f] font-semibold">
              Diseña tu pastel a medida
            </h3>
            <p className="text-xs text-[#524345] leading-relaxed">
              ¿Tienes una idea en mente para XV años, boda o temática especial? Cuéntanos tu concepto, sabores preferidos y número de invitados.
            </p>
          </div>

          {/* Pasos visuales */}
          <div className="grid grid-cols-3 gap-2 my-1">
            <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-[#8a4853] mb-1">
                palette
              </span>
              <span className="text-[10px] font-bold text-[#2a170f] leading-tight">1. Tu idea</span>
            </div>
            <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-[#8a4853] mb-1">
                receipt_long
              </span>
              <span className="text-[10px] font-bold text-[#2a170f] leading-tight">2. Cotización</span>
            </div>
            <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-[#8a4853] mb-1">
                celebration
              </span>
              <span className="text-[10px] font-bold text-[#2a170f] leading-tight">3. Entrega</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('personalizados')}
              className="w-full h-12 rounded-xl bg-[#8a4853] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#a6606b] active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
              <span>Solicitar información &amp; cotizar</span>
            </button>
            <p className="text-center text-[11px] text-[#857374]">
              Recomendamos solicitar con 4 a 7 días de anticipación
            </p>
          </div>
        </div>
      </section>

      {/* 6. Compromiso de calidad */}
      <section className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white border border-[#d7c1c3]/30 flex items-start gap-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#ffe9e2] flex items-center justify-center text-[#8a4853] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#2a170f]">100% Mantequilla</span>
            <span className="text-[11px] text-[#524345]">Sin conservadores ni premezclas</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-[#d7c1c3]/30 flex items-start gap-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#ffe9e2] flex items-center justify-center text-[#775a19] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#2a170f]">Entrega con Cuidado</span>
            <span className="text-[11px] text-[#524345]">Transporte refrigerado en CDMX</span>
          </div>
        </div>
      </section>

      {/* 7. Footer informativo con avisos */}
      <footer className="mt-2 flex flex-col gap-3 p-4 rounded-2xl bg-[#fff1ec] text-[#524345] border border-[#d7c1c3]/30">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#775a19] flex-shrink-0 mt-0.5">
            info
          </span>
          <p className="text-[11px] leading-relaxed">
            <strong>Aviso importante:</strong> Los precios y disponibilidad mostrados en esta app tienen fines de demostración de carta. Para pedidos de eventos, consulta con antelación a nuestro equipo de repostería.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#d7c1c3]/30 text-[11px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenStoreModal}
              className="text-[#8a4853] hover:underline flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Horarios de atención</span>
            </button>
            <button
              type="button"
              onClick={onOpenStoreModal}
              className="text-[#8a4853] hover:underline flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px]">policy</span>
              <span>Políticas de pedido</span>
            </button>
          </div>
          <span className="text-[#857374]">Shandel Pastelería © 2025</span>
        </div>
      </footer>
    </div>
  );
};
