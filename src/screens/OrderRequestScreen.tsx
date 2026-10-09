import React, { useState } from 'react';
import { CartItem, ActiveScreen } from '../types/bakery';

interface OrderRequestScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onCompleteOrder: (orderSummary: any) => void;
}

export const OrderRequestScreen: React.FC<OrderRequestScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onCompleteOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const folio = 'SH-' + Math.floor(1000 + Math.random() * 9000);
      onCompleteOrder({
        folio,
        customerName,
        customerPhone,
        customerEmail,
        deliveryNotes,
        items,
        total: subtotal,
        date: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      setIsSubmitting(false);
      onClearCart();
      onNavigate('confirmacion');
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl shadow-sm border border-[#d7c1c3]/30 my-4">
        <div className="w-20 h-20 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#8a4853] mb-4">
          <span className="material-symbols-outlined text-[36px]">shopping_bag</span>
        </div>
        <h2 className="font-serif-shandel text-2xl font-semibold text-[#2a170f] mb-2">
          Tu solicitud está vacía
        </h2>
        <p className="text-xs text-[#524345] max-w-xs mb-6">
          Aún no has agregado delicias de nuestro catálogo. Explora nuestras recetas artesanales y prepara tu pedido.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('catalogo')}
          className="px-6 py-3 rounded-2xl bg-[#8a4853] text-white text-sm font-semibold hover:bg-[#a6606b] active:scale-95 transition-all shadow-sm"
        >
          Explorar el catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
            Preparar Pedido
          </span>
          <h1 className="font-serif-shandel text-2xl font-semibold text-[#2a170f]">
            Mi Solicitud de Cotización
          </h1>
        </div>
        <span className="text-xs font-semibold text-[#8a4853] bg-[#ffd9dd] px-2.5 py-1 rounded-full">
          {items.reduce((acc, i) => acc + i.quantity, 0)} postres seleccionados
        </span>
      </div>

      {/* Lista de productos agregados */}
      <div className="flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-white border border-[#d7c1c3]/30 shadow-xs flex flex-col gap-2.5"
          >
            <div className="flex gap-3 items-start">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 rounded-xl object-cover bg-[#ffe9e2] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif-shandel text-sm font-semibold text-[#2a170f] truncate leading-tight">
                    {item.productName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#857374] hover:text-[#ba1a1a] transition-colors p-1"
                    title="Eliminar de la solicitud"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <div className="text-[11px] text-[#524345] mt-0.5 space-y-0.5">
                  <p>
                    <strong className="text-[#2a170f]">{item.sizeName}</strong> ({item.portions}) · {item.flavorName}
                  </p>
                  <p className="text-[#775a19]">Relleno: {item.fillingName}</p>
                  {item.dedication && (
                    <p className="text-[#8a4853] italic">Placa: "{item.dedication}"</p>
                  )}
                  <p className="text-[#857374]">Fecha deseada: {item.deliveryDate}</p>
                </div>
              </div>
            </div>

            {/* Fila de Cantidad y Precio */}
            <div className="flex items-center justify-between pt-2 border-t border-[#d7c1c3]/20">
              <div className="flex items-center gap-2 bg-[#fff1ec] px-2 py-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded-lg bg-white text-[#2a170f] flex items-center justify-center font-bold text-xs hover:bg-[#ffe9e2] shadow-2xs"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#2a170f] px-1">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded-lg bg-white text-[#2a170f] flex items-center justify-center font-bold text-xs hover:bg-[#ffe9e2] shadow-2xs"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#857374] uppercase block">Subtotal</span>
                <span className="font-serif-shandel text-sm font-bold text-[#8a4853]">
                  ${(item.unitPrice * item.quantity).toFixed(2)} MXN
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de Solicitante */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#d7c1c3]/30 shadow-xs flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#775a19]">
            Datos para Confirmar Disponibilidad
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#2a170f]">Nombre Completo *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej. Sofía Mendoza"
              className="w-full h-11 px-3 rounded-xl bg-[#fff8f6] text-[#2a170f] text-sm border border-[#d7c1c3]/40 focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#2a170f]">Teléfono / WhatsApp *</label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Ej. 55 1234 5678"
              className="w-full h-11 px-3 rounded-xl bg-[#fff8f6] text-[#2a170f] text-sm border border-[#d7c1c3]/40 focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#2a170f]">Correo Electrónico (Opcional)</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="sofia@ejemplo.com"
              className="w-full h-11 px-3 rounded-xl bg-[#fff8f6] text-[#2a170f] text-sm border border-[#d7c1c3]/40 focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#2a170f]">Notas para entrega o taller</label>
            <textarea
              rows={2}
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="Indicaciones sobre horario preferido o alergias..."
              className="w-full p-3 rounded-xl bg-[#fff8f6] text-[#2a170f] text-xs border border-[#d7c1c3]/40 focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            />
          </div>
        </div>

        {/* Aviso de cotización */}
        <div className="p-3.5 rounded-2xl bg-[#fed488]/30 border border-[#fed488] flex items-start gap-2.5 text-xs text-[#785a1a]">
          <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">
            verified
          </span>
          <p className="leading-relaxed">
            <strong>Solicitud de Cotización Oficial:</strong> No requerimos pago inmediato. Revisaremos tu fecha y te responderemos por WhatsApp o llamada con la cotización final y detalles de anticipo.
          </p>
        </div>

        {/* Desglose de totales */}
        <div className="p-4 rounded-2xl bg-[#fff1ec] border border-[#d7c1c3]/40 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs text-[#524345]">
            <span>Productos cotizados:</span>
            <span>{items.reduce((acc, i) => acc + i.quantity, 0)} unidades</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#d7c1c3]/30">
            <span className="text-sm font-bold text-[#2a170f]">Cotización Total Estimada:</span>
            <span className="font-serif-shandel text-xl font-bold text-[#8a4853]">
              ${subtotal.toFixed(2)} MXN
            </span>
          </div>
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 rounded-2xl bg-[#8a4853] hover:bg-[#a6606b] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all mt-1"
        >
          {isSubmitting ? (
            <span>Enviando solicitud...</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send_and_archive</span>
              <span>Enviar Solicitud de Pedido</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
