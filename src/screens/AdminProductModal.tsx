import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types/bakery';

interface AdminProductModalProps {
  isOpen: boolean;
  product: Product | null;
  categories: Category[];
  onSave: (productData: Partial<Product>) => void;
  onClose: () => void;
}

const PRESET_BAKERY_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDY2h7FvFfoV7Cv1HFCrp-0C5WaYE78lwJzK37o2nIAkMq7nAHYgu_NA51PE6cKThvP2p43jSYgv7CYQr15YFnX1hTIazNdJUE3o6NAGT2wA7SQc-N04S57LV4KoM5BWGDOt6rCL-J_zr2-tgNONhjDzoxpSsy5-ZYpvcatyD1KakPdUcZ36vsg0KOuKS4NCsWhZxEWykDbTsU3TAVnfGdG8waa4r-wYaH3z48vvug0i5qQYFw-8APeFg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAzMqDauw-zbmCEEy2bAKsDCx6s86N65IMAGiCnqnxJ11Y7sRuPjry8ciSM_SVD1NNA8vKD3Qcx4N8aLGrSdUAb-0Wj2ert8pKki9-xOjWSUOtTT9fZ0-nT2JNJMN6tM56I_JfFcqxrc9lM1AIUWkjiv7ozqSj8UCQZr6dRo2KxYs5TdHN_NtqA3vCA7DN4EmTKrBRRaWITCj6EXs5jycMdrJcFjsz8O8pSR26L41DE-fC3ttN_BV3-qQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJggBn3hbjreyCli6UxqQ2XktIcAwdGyP8ha27M8V9gzN-_8qwQTE1WkbyHxKH1oXmCxI-3VWoiKXnUNzgMXEKzFynjgvohjG3AyjoPoNUBrVlvOw1Ta6DJou7i3tNIW-KabwgUbLEUYa0_G0C9cijTmR5fx2QcEPIW3MT6jyTPr1WzUbR5DpEWIhqDqtCZN4AtQR2pfaLUy3w2OquKCvgmrUAv_WFFx0UMF9KnKg0gBJCSvwiIWzCdQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBCty91QkvZEbpRI69MTBMLcCylt86J1icDnHcKirIuat6M0vEzr3VWdLk2NvgX4sjKZhWV9jkA7cgpiKdYOoVV79VKoloTRo8-pTRtUjvC-zUKdHHO4_M7ff9oAKi1UC77O7Cb0hQEGyvegR-Y4eiAGof7BD8qwBF05ZRVOFa9J22X_dSQDCnMvJLJAA49QXMFHEIMTbJQx4Ut4pN2bBXMPUcaBI_yoFZkvEVCGaP46pHiN25mZ4rmgA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC--ckAM3E70pcU9m4BHyUJGr8-AAp73pfpct3OFV02Bu5g54F25M8f7v4qcZ_u-b6q1LFouyUTs-yZgpKBLF2h2UcPPavBAOEHAUvP05ZCGCIFcXXYoaF3zW0-9sTndoewey68zYFxxW8ojsrpZpcq_ChhianMYfvbnxtVVJPqNp41O6A_nrDwv7j1HVa0euym7T8WO0D4vkalXSE-weldEFt_lXFRZthu8-GS7pCrakSQ4W81bkLvIg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAn3TAtX4Iy9_RvYkziCQ0EgAMoK66gligPvJOV6QgctS2NF4JayGrUaRisdut-_HCfsUmu_J91tisf0NpupJDWUlBmHwxgG2kBegdEfqg0fSf3kzRLploiWbDX1qtoQPzjCFfa8NbCTF9TPt6qsaMboo_bK8jMP-envGkYl_HFGbwfidyRI99oDJIKXfd-ARFYVPbY9KNvgxn0iG7vLh2wM-3P1-CA8btLJdQ9uxVp-7YDtURvjymkUw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLs3iueEvi5pPsA34EE34x6lw4wKuWfci6R_cipNsEx3dK831Lj9vOHUx6304ZzJzAakMHqV7vKueFExG3fq6ViWup7QKMkHbJI4fWsGFtTsrZQ3cVyzXVSWqp-3lvFZIz0J1NiNoJBr6lDJg5IFHtj3w06HVd2kL3HZj6fGGjVbfcNs-2-3rTX-YBQcD-YViM33Fe4-zSG5O5LeGR71H81LOv70wDk2JZm3E3fy_f-guRALbCicOkbA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDwQK-nz-eVjvx0vbY9AW51vZKnfi4rjgKL7nuMmTT3VxWEcet49mU7ASRcJ8n3prjh4ntNThm-YZs4TndPKeoXQjGNjeJlvUYpEwYPchCahYvCVjYtKAdRz5kc0Awk_a38cr7OTrbzaE0l6ErCMZqT1ntQUkjNnj_o1LbHReZrxlgFNXv1nMqJbLFu9JF9vHCtbxtWYtrSrO3AfDsOGWUJl_Gd3QPhg-XeESHP9fWGgP35hyiMXZZzKA',
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  product,
  categories,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cumpleanos');
  const [basePrice, setBasePrice] = useState('480');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [anticipationHours, setAnticipationHours] = useState('24');
  const [selectedImage, setSelectedImage] = useState(PRESET_BAKERY_IMAGES[0]);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setCategoryId(product.categoryId);
      setBasePrice(product.basePrice.toString());
      setDescription(product.description);
      setFullDescription(product.fullDescription || product.description);
      setIsPublished(product.isPublished);
      setIsFeatured(product.isFeatured);
      setAnticipationHours(product.anticipationHours.toString());
      setSelectedImage(product.images[0] || PRESET_BAKERY_IMAGES[0]);
    } else {
      setName('');
      setSku('SKU-' + Math.floor(1000 + Math.random() * 9000));
      setCategoryId(categories[0]?.id || 'cumpleanos');
      setBasePrice('480');
      setDescription('');
      setFullDescription('');
      setIsPublished(true);
      setIsFeatured(false);
      setAnticipationHours('24');
      setSelectedImage(PRESET_BAKERY_IMAGES[0]);
    }
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === categoryId);

    onSave({
      id: product?.id,
      name,
      sku,
      categoryId,
      categoryName: cat?.name || 'Repostería',
      basePrice: parseFloat(basePrice) || 450,
      description,
      fullDescription,
      isPublished,
      status: isPublished ? 'disponible_hoy' : 'oculto',
      isFeatured,
      anticipationHours: parseInt(anticipationHours) || 24,
      images: [selectedImage],
      sizes: product?.sizes || [
        { id: 'chico', name: 'Chico', portions: '8 a 10 porciones', price: parseFloat(basePrice) * 0.9 },
        { id: 'mediano', name: 'Mediano', portions: '15 a 20 porciones', price: parseFloat(basePrice), isDefault: true },
        { id: 'grande', name: 'Grande', portions: '25 a 30 porciones', price: parseFloat(basePrice) * 1.35 },
      ],
      flavors: product?.flavors || [
        { id: 'vainilla', name: 'Vainilla Francesa', extraPrice: 0 },
        { id: 'chocolate', name: 'Chocolate Belga', extraPrice: 40 },
      ],
      fillings: product?.fillings || [
        { id: 'frutos-bosque', name: 'Frutos del Bosque', description: 'Reducción casera' },
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#422b22]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto border border-[#d7c1c3]/30">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[#d7c1c3]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffd9dd] text-[#8a4853] flex items-center justify-center font-bold text-sm">
              <span className="material-symbols-outlined text-[18px]">cake</span>
            </div>
            <h2 className="font-serif-shandel text-lg font-semibold text-[#2a170f]">
              {product ? 'Editar Producto' : 'Nuevo Pastel de Repostería'}
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

        {/* Pestañas Formulario vs Vista Previa */}
        <div className="flex gap-2 my-3">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'form'
                ? 'bg-[#8a4853] text-white shadow-xs'
                : 'bg-[#fff1ec] text-[#524345] hover:bg-[#ffe2d8]'
            }`}
          >
            Datos del Producto
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#8a4853] text-white shadow-xs'
                : 'bg-[#fff1ec] text-[#524345] hover:bg-[#ffe2d8]'
            }`}
          >
            Vista Previa en Catálogo
          </button>
        </div>

        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Nombre y SKU */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                  Nombre del Pastel *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Pastel de Fresas con Crema"
                  className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#2a170f] uppercase">SKU</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none font-mono"
                />
              </div>
            </div>

            {/* Categoría y Precio Base */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#2a170f] uppercase">Categoría</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full h-10 px-2 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                  Precio Base (MXN) *
                </label>
                <input
                  type="number"
                  required
                  step="10"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
                />
              </div>
            </div>

            {/* Descripción breve */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                Descripción Corta (Carta)
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Bizcocho de vainilla, relleno de fresas frescas y crema batida ligera."
                className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
              />
            </div>

            {/* Descripción completa */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                Descripción Detallada &amp; Técnicas
              </label>
              <textarea
                rows={2}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detalles sobre insumos naturales, origen del chocolate, etc."
                className="w-full p-2.5 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
              />
            </div>

            {/* Selector de Fotografía */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                Fotografía del Producto
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_BAKERY_IMAGES.slice(0, 4).map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-[#8a4853] scale-102' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={imgUrl} alt={`Foto ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Configuración de Estado y Visibilidad */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fff1ec] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="accent-[#2f6736] w-4 h-4 rounded"
                />
                <span className="text-xs font-semibold text-[#2a170f]">Publicado en catálogo</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fff1ec] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#775a19] w-4 h-4 rounded"
                />
                <span className="text-xs font-semibold text-[#2a170f]">Destacar en inicio</span>
              </label>
            </div>

            {/* Anticipación */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#2a170f] uppercase">
                Anticipación mínima requerida (Horas)
              </label>
              <input
                type="number"
                value={anticipationHours}
                onChange={(e) => setAnticipationHours(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#fff8f6] text-xs text-[#2a170f] border border-[#d7c1c3]/40 focus:ring-1 focus:ring-[#8a4853] outline-none"
              />
            </div>

            {/* Botones de acción del modal */}
            <div className="flex gap-2 pt-2 border-t border-[#d7c1c3]/30">
              <button
                type="submit"
                className="flex-1 h-11 bg-[#8a4853] hover:bg-[#a6606b] text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 h-11 bg-[#ffe2d8] text-[#2a170f] rounded-xl text-xs font-semibold hover:bg-[#ffdbce] transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          /* Vista Previa */
          <div className="flex flex-col gap-3">
            <span className="text-xs text-[#857374] italic text-center">
              Así verán los clientes este producto en el catálogo:
            </span>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#d7c1c3]/40 max-w-xs mx-auto">
              <div className="relative aspect-[4/3] bg-[#ffe9e2]">
                <img src={selectedImage} alt={name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#b4f2b3] text-[#002107]">
                  {isPublished ? 'Disponible hoy' : 'Oculto'}
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1.5">
                <h3 className="font-serif-shandel text-sm font-semibold text-[#2a170f]">
                  {name || 'Nombre del Pastel'}
                </h3>
                <p className="text-xs text-[#524345] line-clamp-2">
                  {description || 'Descripción del pastel...'}
                </p>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[10px] text-[#857374] uppercase">Precio</span>
                  <span className="font-serif-shandel text-sm font-bold text-[#8a4853]">
                    ${parseFloat(basePrice || '0').toFixed(2)} MXN
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className="mt-2 text-xs text-[#8a4853] font-semibold hover:underline text-center"
            >
              ← Volver a editar campos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
