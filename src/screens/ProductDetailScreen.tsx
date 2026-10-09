import React, { useState } from 'react';
import { Product, CartItem } from '../types/bakery';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Customization state
  const defaultSize = product.sizes.find((s) => s.isDefault) || product.sizes[0] || {
    id: 'mediano',
    name: 'Mediano',
    portions: '15 a 20 porciones',
    price: product.basePrice,
  };
  const [selectedSizeId, setSelectedSizeId] = useState<string>(defaultSize.id);

  const defaultFlavor = product.flavors[0] || {
    id: 'vainilla',
    name: 'Vainilla Francesa',
    extraPrice: 0,
  };
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>(defaultFlavor.id);

  const defaultFilling = product.fillings[0] || {
    id: 'frutos-bosque',
    name: 'Frutos del bosque',
    description: 'Reducción casera de zarzamora, fresa y frambuesa',
  };
  const [selectedFillingId, setSelectedFillingId] = useState<string>(defaultFilling.id);

  const [dedication, setDedication] = useState<string>('');

  // Delivery date (+2 days default)
  const defaultDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };
  const [deliveryDate, setDeliveryDate] = useState<string>(defaultDateStr());

  // Calculations
  const currentSize = product.sizes.find((s) => s.id === selectedSizeId) || defaultSize;
  const currentFlavor = product.flavors.find((f) => f.id === selectedFlavorId) || defaultFlavor;
  const currentFilling = product.fillings.find((f) => f.id === selectedFillingId) || defaultFilling;

  const currentTotal = (currentSize?.price || product.basePrice) + (currentFlavor?.extraPrice || 0);

  // Gallery items (fallback to main product images or generic)
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAzMqDauw-zbmCEEy2bAKsDCx6s86N65IMAGiCnqnxJ11Y7sRuPjry8ciSM_SVD1NNA8vKD3Qcx4N8aLGrSdUAb-0Wj2ert8pKki9-xOjWSUOtTT9fZ0-nT2JNJMN6tM56I_JfFcqxrc9lM1AIUWkjiv7ozqSj8UCQZr6dRo2KxYs5TdHN_NtqA3vCA7DN4EmTKrBRRaWITCj6EXs5jycMdrJcFjsz8O8pSR26L41DE-fC3ttN_BV3-qQ',
        ];

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productImage: galleryImages[0],
      sizeName: currentSize.name,
      portions: currentSize.portions,
      flavorName: currentFlavor.name,
      fillingName: currentFilling.name,
      dedication: dedication.trim() || undefined,
      deliveryDate: deliveryDate,
      unitPrice: currentTotal,
      quantity: 1,
    });
    onShowToast(`"${product.name}" agregado a tu solicitud`);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `¡Hola Pastelería Shandel! Me gustaría consultar la disponibilidad del "${product.name}" en tamaño ${currentSize.name} (${currentSize.portions}) con bizcocho de ${currentFlavor.name} y relleno de ${currentFilling.name}. Fecha deseada: ${deliveryDate}.`
    );
    window.open(`https://wa.me/5215512345678?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | Pastelería Shandel`,
        text: `Mira este delicioso pastel en el catálogo de Pastelería Shandel: ${product.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      onShowToast('Enlace de producto listo para compartir');
    }
  };

  return (
    <div className="flex flex-col w-full pb-36">
      {/* 1. Sub-barra de navegación superior */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#8a4853] hover:text-[#70343e] font-semibold text-xs active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver al catálogo</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Compartir producto"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#2a170f] hover:bg-[#ffe2d8] active:scale-90 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            type="button"
            aria-label="Guardar en favoritos"
            onClick={() => onToggleFavorite(product.id)}
            className={`w-9 h-9 rounded-full bg-[#ffe9e2] flex items-center justify-center active:scale-90 transition-all shadow-xs ${
              isFavorite ? 'text-[#8a4853]' : 'text-[#857374] hover:text-[#8a4853]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        </div>
      </div>

      {/* 2. Galería Interactiva */}
      <section className="flex flex-col gap-2.5 mb-4">
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#ffe9e2] shadow-sm border border-[#d7c1c3]/30">
          <img
            src={galleryImages[selectedImageIndex] || galleryImages[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Badge artesanal */}
          <div className="absolute bottom-3 left-3 bg-[#422b22]/85 backdrop-blur-md text-[#ffede7] px-3 py-1 rounded-full flex items-center gap-1.5 text-xs shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-[#ffdea5]">auto_awesome</span>
            <span>Elaborado artesanalmente</span>
          </div>

          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-[#2a170f] w-8 h-8 rounded-full flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </div>
        </div>

        {/* Miniaturas */}
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((imgUrl, index) => {
            const isSelected = selectedImageIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-xl overflow-hidden bg-[#ffe9e2] transition-all shadow-xs ${
                  isSelected
                    ? 'ring-2 ring-[#8a4853] scale-100 opacity-100'
                    : 'opacity-70 hover:opacity-100 scale-95'
                }`}
              >
                <img src={imgUrl} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Información Principal y Disponibilidad */}
      <section className="flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#775a19] bg-[#fed488]/40 px-2.5 py-1 rounded-full">
            {product.categoryName || 'Pasteles para eventos / Personalizados'}
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#b4f2b3]/40 text-[#2f6736] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2f6736] animate-pulse"></span>
            <span>
              {product.status === 'disponible_hoy' ? 'Disponible hoy en vitrina' : 'Disponible bajo pedido'}
            </span>
          </div>
        </div>

        <h2 className="font-serif-shandel text-2xl sm:text-3xl font-semibold text-[#2a170f] leading-tight mt-1">
          {product.name}
        </h2>

        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-xs uppercase tracking-wide text-[#524345]">Precio estimado:</span>
          <span className="font-serif-shandel text-2xl font-bold text-[#8a4853]">
            ${currentTotal.toFixed(2)} MXN
          </span>
        </div>

        {/* Banner de anticipación */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#fff1ec] text-[#524345] shadow-xs border border-[#d7c1c3]/30 mt-1">
          <span className="material-symbols-outlined text-[#775a19] text-[20px] flex-shrink-0 mt-0.5">
            schedule
          </span>
          <div className="flex flex-col text-xs">
            <span className="text-[#2a170f] font-bold">
              Anticipación requerida: {product.anticipationHours} horas
            </span>
            <span>Cada pieza se hornea al momento con insumos naturales de temporada.</span>
          </div>
        </div>

        {/* Descripción sensorial */}
        <div className="mt-2 text-xs sm:text-sm text-[#524345] leading-relaxed">
          {product.fullDescription || product.description}
        </div>
      </section>

      {/* 4. Formulario de Opciones de Personalización */}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
        {/* Paso 1: Tamaño y porciones */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#2a170f] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#8a4853] text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Tamaño y porciones</span>
            </label>
            <span className="text-[11px] font-bold text-[#8a4853] uppercase">Obligatorio</span>
          </div>
          <p className="text-xs text-[#524345] -mt-0.5 mb-1">
            Selecciona el rendimiento idóneo para tus invitados:
          </p>

          <div className="flex flex-col gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSizeId === size.id;
              return (
                <label
                  key={size.id}
                  onClick={() => setSelectedSizeId(size.id)}
                  className={`relative flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all active:scale-[0.99] border ${
                    isSelected
                      ? 'bg-[#ffe2d8] border-[#8a4853]/60 shadow-xs ring-1 ring-[#8a4853]/40'
                      : 'bg-[#fff1ec] border-[#d7c1c3]/30 hover:bg-[#ffe9e2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="cake-size"
                      checked={isSelected}
                      onChange={() => setSelectedSizeId(size.id)}
                      className="accent-[#8a4853] w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#2a170f]">{size.name}</span>
                        {size.badge && (
                          <span className="bg-[#ffdea5] text-[#261900] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {size.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#524345]">Rinde para {size.portions}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#8a4853]">${size.price.toFixed(2)} MXN</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Paso 2: Sabor de bizcocho */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#2a170f] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8a4853] text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span>Sabor de bizcocho</span>
          </label>
          <p className="text-xs text-[#524345] -mt-0.5 mb-1">
            Miga aireada preparada con mantequilla pura:
          </p>

          <div className="grid grid-cols-3 gap-2">
            {product.flavors.map((flavor) => {
              const isSelected = selectedFlavorId === flavor.id;
              return (
                <label
                  key={flavor.id}
                  onClick={() => setSelectedFlavorId(flavor.id)}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#ffe2d8] border-[#8a4853]/60 shadow-xs ring-1 ring-[#8a4853]/40'
                      : 'bg-[#fff1ec] border-[#d7c1c3]/30 hover:bg-[#ffe9e2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="cake-flavor"
                    checked={isSelected}
                    onChange={() => setSelectedFlavorId(flavor.id)}
                    className="hidden"
                  />
                  <span
                    className={`material-symbols-outlined text-[24px] mb-1 ${
                      isSelected ? 'text-[#8a4853]' : 'text-[#524345]'
                    }`}
                  >
                    {flavor.icon || 'bakery_dining'}
                  </span>
                  <span className="text-xs font-bold text-[#2a170f] leading-tight">
                    {flavor.name}
                  </span>
                  <span className="text-[10px] text-[#524345] mt-1">
                    {flavor.extraPrice > 0 ? `+ $${flavor.extraPrice.toFixed(2)}` : 'Clásico'}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Paso 3: Relleno artesanal */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#2a170f] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8a4853] text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
            <span>Relleno artesanal</span>
          </label>
          <p className="text-xs text-[#524345] -mt-0.5 mb-1">
            El corazón de sabor entre cada capa:
          </p>

          <div className="flex flex-col gap-2">
            {product.fillings.map((filling) => {
              const isSelected = selectedFillingId === filling.id;
              return (
                <label
                  key={filling.id}
                  onClick={() => setSelectedFillingId(filling.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#ffe2d8] border-[#8a4853]/60 shadow-xs ring-1 ring-[#8a4853]/40'
                      : 'bg-[#fff1ec] border-[#d7c1c3]/30 hover:bg-[#ffe9e2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="cake-filling"
                    checked={isSelected}
                    onChange={() => setSelectedFillingId(filling.id)}
                    className="accent-[#8a4853] w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-[#2a170f]">
                      {filling.name}
                    </span>
                    <span className="text-[11px] text-[#524345]">{filling.description}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Paso 4: Placa de dedicatoria */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="dedication" className="text-sm font-bold text-[#2a170f] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#8a4853] text-white text-[11px] font-bold flex items-center justify-center">
                4
              </span>
              <span>Placa de dedicatoria</span>
            </label>
            <span className="text-[11px] text-[#524345] uppercase">Opcional</span>
          </div>
          <p className="text-xs text-[#524345] -mt-0.5">
            Caligrafía a mano sobre placa fina de chocolate blanco o amargo:
          </p>
          <div className="relative">
            <input
              id="dedication"
              type="text"
              maxLength={45}
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Ej. ¡Feliz Cumpleaños Sofía!"
              className="w-full h-12 px-3.5 pr-10 rounded-2xl bg-white text-[#2a170f] placeholder:text-[#857374] text-xs sm:text-sm shadow-xs border border-[#d7c1c3]/30 focus:outline-none focus:ring-2 focus:ring-[#8a4853]/40"
            />
            <span className="material-symbols-outlined text-[#857374] text-[18px] absolute right-3.5 top-1/2 -translate-y-1/2">
              edit_note
            </span>
          </div>
        </div>

        {/* Paso 5: Fecha estimada de entrega */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="deliveryDate" className="text-sm font-bold text-[#2a170f] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#8a4853] text-white text-[11px] font-bold flex items-center justify-center">
                5
              </span>
              <span>Fecha estimada de entrega</span>
            </label>
            <span className="text-[11px] font-bold text-[#8a4853] uppercase">Requerido</span>
          </div>
          <p className="text-xs text-[#524345] -mt-0.5">
            Mínimo 48 hrs a partir de hoy para garantizar frescura y calidad:
          </p>
          <input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            min={defaultDateStr()}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full h-12 px-3.5 rounded-2xl bg-white text-[#2a170f] text-xs sm:text-sm shadow-xs border border-[#d7c1c3]/30 focus:outline-none focus:ring-2 focus:ring-[#8a4853]/40"
          />
        </div>

        {/* Aviso de cotización */}
        <div className="p-3.5 rounded-2xl bg-[#ffe9e2] text-[#524345] flex items-start gap-2.5 border border-[#d7c1c3]/40">
          <span className="material-symbols-outlined text-[#8a4853] text-[20px] flex-shrink-0 mt-0.5">
            info
          </span>
          <p className="text-xs leading-relaxed">
            Esta pantalla prepara una solicitud de cotización para <strong className="text-[#2a170f]">Pastelería Shandel</strong>. No se realizarán cargos automáticos hasta validar tu fecha y especificaciones con nuestra maestra pastelera.
          </p>
        </div>
      </form>

      {/* 5. Bandeja Inferior Fija (Sticky Bottom Action Tray) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-t border-[#d7c1c3]/40 pb-safe shadow-[0_-4px_20px_rgba(42,23,15,0.08)]">
        <div className="max-w-md mx-auto px-4 py-3 flex flex-col gap-2">
          {/* Resumen dinámico */}
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[10px] uppercase tracking-wide text-[#524345] font-semibold">
                Cotización estimada
              </span>
              <span className="text-xs font-semibold text-[#2a170f] truncate">
                {currentSize.name} · {currentFlavor.name}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-serif-shandel text-lg font-bold text-[#8a4853]">
                ${currentTotal.toFixed(2)} MXN
              </span>
            </div>
          </div>

          {/* Botones de acción principal */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-12 rounded-xl bg-[#8a4853] hover:bg-[#a6606b] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">assignment_add</span>
              <span>Agregar a mi solicitud de pedido</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppContact}
              className="w-full h-11 rounded-xl bg-[#ffe9e2] hover:bg-[#ffe2d8] text-[#2a170f] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#d7c1c3]/40 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[#2f6736] text-[20px]">chat</span>
              <span>Consultar por WhatsApp / Atención directa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
