import React from 'react';
import { ActiveScreen } from '../types/bakery';

interface ConfirmationScreenProps {
  orderSummary: any;
  onNavigate: (screen: ActiveScreen) => void;
  onShowToast: (msg: string) => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  orderSummary,
  onNavigate,
  onShowToast,
}) => {
  if (!orderSummary) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#524345]">No hay una solicitud activa.</p>
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="mt-4 px-4 py-2 bg-[#8a4853] text-white rounded-xl text-xs font-semibold"
        >
          Ir al Inicio
        </button>
      </div>
    );
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Pastelería Shandel! Acabo de enviar mi solicitud de cotización con el Folio: ${orderSummary.folio}.\n` +
      `Cliente: ${orderSummary.customerName}\n` +
      `Total estimado: $${orderSummary.total?.toFixed(2)} MXN\n` +
      `Quedo al pendiente de su confirmación de disponibilidad.`
    );
    window.open(`https://wa.me/5215512345678?text=${text}`, '_blank');
  };

  const handleCopyFolio = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderSummary.folio);
      onShowToast(`Folio ${orderSummary.folio} copiado al portapapeles`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto pb-28 pt-2">
      {/* Sello de Confirmación */}
      <div className="w-16 h-16 rounded-full bg-[#b4f2b3] text-[#2f6736] flex items-center justify-center mb-3 shadow-sm">
        <span className="material-symbols-outlined text-[34px]">task_alt</span>
      </div>

      <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] mb-1">
        Pastelería Shandel
      </span>

      <h1 className="font-serif-shandel text-2xl sm:text-3xl font-semibold text-[#2a170f] text-center leading-tight mb-2">
        ¡Solicitud de Cotización Recibida!
      </h1>

      <p className="text-xs sm:text-sm text-[#524345] text-center max-w-sm mb-6 leading-relaxed">
        Hemos registrado los detalles de tu pedido. Nuestro equipo de repostería verificará el calendario de horneado para confirmar tu fecha.
      </p>

      {/* Tarjeta de Folio */}
      <div className="w-full bg-white rounded-3xl p-5 border border-[#d7c1c3]/40 shadow-sm flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#d7c1c3]/25">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Folio de Cotización
            </span>
            <span className="font-serif-shandel text-xl font-bold text-[#8a4853]">
              {orderSummary.folio}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyFolio}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fff1ec] text-xs font-semibold text-[#8a4853] hover:bg-[#ffe2d8] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copiar</span>
          </button>
        </div>

        {/* Resumen */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#524345]">Cliente:</span>
            <strong className="text-[#2a170f]">{orderSummary.customerName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#524345]">Teléfono / WhatsApp:</span>
            <strong className="text-[#2a170f]">{orderSummary.customerPhone}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#524345]">Fecha de registro:</span>
            <span className="text-[#2a170f]">{orderSummary.date}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#d7c1c3]/20">
            <span className="text-[#524345] font-semibold">Cotización total aproximada:</span>
            <strong className="font-serif-shandel text-base text-[#8a4853]">
              ${orderSummary.total?.toFixed(2)} MXN
            </strong>
          </div>
        </div>

        {/* Artículos cotizados */}
        {orderSummary.items && orderSummary.items.length > 0 && (
          <div className="pt-2 border-t border-[#d7c1c3]/20 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#857374]">
              Delicias en la cotización:
            </span>
            {orderSummary.items.map((it: any, i: number) => (
              <div key={i} className="flex justify-between text-xs text-[#524345]">
                <span>
                  {it.quantity}x {it.productName} ({it.sizeName})
                </span>
                <span className="text-[#2a170f] font-medium">
                  ${(it.unitPrice * it.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="w-full flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full h-12 rounded-2xl bg-[#2f6736] hover:bg-[#48814d] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span>Enviar Copia Directa por WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('catalogo')}
          className="w-full h-12 rounded-2xl bg-white hover:bg-[#fff1ec] text-[#2a170f] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#d7c1c3]/40 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>Explorar Más Pasteles</span>
        </button>
      </div>
    </div>
  );
};
