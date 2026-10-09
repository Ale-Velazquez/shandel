import React, { useState } from 'react';

interface CustomCakeScreenProps {
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const CustomCakeScreen: React.FC<CustomCakeScreenProps> = ({ onBack, onShowToast }) => {
  const [eventType, setEventType] = useState('Boda / Aniversario');
  const [guests, setGuests] = useState('30 a 40 personas');
  const [tiers, setTiers] = useState('2 pisos');
  const [stylePreference, setStylePreference] = useState('Naked Cake con Flores Naturales');
  const [flavorPreference, setFlavorPreference] = useState('Vainilla Bourbon y Chocolate Belga');
  const [conceptNotes, setConceptNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      onShowToast('Por favor escribe tu nombre y teléfono de contacto');
      return;
    }

    const message = encodeURIComponent(
      `¡Hola Shandel! Deseo cotizar un pastel personalizado para mi evento.\n\n` +
      `• Nombre: ${clientName}\n` +
      `• Evento: ${eventType}\n` +
      `• Fecha: ${eventDate || 'Por definir'}\n` +
      `• Invitados: ${guests}\n` +
      `• Pisos: ${tiers}\n` +
      `• Estilo: ${stylePreference}\n` +
      `• Sabores: ${flavorPreference}\n` +
      `• Concepto: ${conceptNotes || 'Sin comentarios adicionales'}\n\n` +
      `¿Podrían confirmarme disponibilidad y presupuesto estimado?`
    );

    window.open(`https://wa.me/5215512345678?text=${message}`, '_blank');
    onShowToast('Solicitud de diseño preparada con éxito');
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Cabecera */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#524345] hover:text-[#8a4853] hover:bg-[#ffe9e2] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
            Atelier Shandel
          </span>
          <h1 className="font-serif-shandel text-2xl font-semibold text-[#2a170f]">
            Diseña tu pastel a medida
          </h1>
        </div>
      </div>

      {/* Banner de inspiración */}
      <div className="relative rounded-3xl overflow-hidden mb-5 bg-[#ffe9e2] border border-[#d7c1c3]/30">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY4BJ5mE92CA86EEU1f38CjEL7C5F9yRP506nk7UJAGJDy206MbgHytX74sw8Txe-C4ojowVND78M1889rhcuoZ6M5uDCL5kiG3a_nFbgXfUgTEs280_cbGWFXkk4PFo0OVSpJ7E7po4conn46kZ0RmltOAIZMKx9T2ywBgpuv764-vO-QD3E9xIYQAdtu3Ds5ilRSEWz_mJKiAZzswCZOI0yPwNqD6ydByAAJJ6D9AlxCPpqxdRG6PA"
          alt="Pastel de autor en atelier"
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a170f]/80 to-transparent p-4 flex flex-col justify-end text-white">
          <span className="text-xs font-bold text-[#ffdea5] uppercase tracking-wider">
            Piezas únicas de alta repostería
          </span>
          <p className="text-xs text-[#ffede7] leading-relaxed">
            Creamos pasteles artísticos según tu concepto, paleta de colores y ocasión especial.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Tipo de evento */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
            1. Tipo de Celebración
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full h-12 px-3 rounded-2xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 shadow-xs focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
          >
            <option value="Boda / Aniversario">Boda / Aniversario</option>
            <option value="XV Años">XV Años</option>
            <option value="Cumpleaños Especial">Cumpleaños Especial</option>
            <option value="Bautizo o Baby Shower">Bautizo o Baby Shower</option>
            <option value="Evento Corporativo">Evento Corporativo</option>
            <option value="Graduación">Graduación</option>
          </select>
        </div>

        {/* Invitados y Pisos */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
              2. Invitados
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full h-12 px-3 rounded-2xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 shadow-xs focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            >
              <option value="15 a 20 personas">15 a 20 personas</option>
              <option value="30 a 40 personas">30 a 40 personas</option>
              <option value="50 a 70 personas">50 a 70 personas</option>
              <option value="80 a 120 personas">80 a 120 personas</option>
              <option value="Más de 120 personas">Más de 120 personas</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
              3. Pisos Sugeridos
            </label>
            <select
              value={tiers}
              onChange={(e) => setTiers(e.target.value)}
              className="w-full h-12 px-3 rounded-2xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 shadow-xs focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
            >
              <option value="1 piso (Formato ancho)">1 piso</option>
              <option value="2 pisos">2 pisos</option>
              <option value="3 pisos o más">3 pisos o más</option>
              <option value="Mesa de postres combinada">Mesa de postres</option>
            </select>
          </div>
        </div>

        {/* Estilo Visual */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
            4. Estilo Decorativo Deseado
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Naked Cake con Flores Naturales',
              'Fondant Esculpido Elegante',
              'Buttercream Texturizado',
              'Detalles en Hoja de Oro 24k',
            ].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setStylePreference(style)}
                className={`p-3 rounded-2xl text-left text-xs font-semibold border transition-all ${
                  stylePreference === style
                    ? 'bg-[#ffe2d8] border-[#8a4853] text-[#8a4853] shadow-xs'
                    : 'bg-white border-[#d7c1c3]/30 text-[#2a170f] hover:bg-[#fff1ec]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Notas y Concepto */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
            5. Cuéntanos tu concepto o temática
          </label>
          <textarea
            rows={3}
            value={conceptNotes}
            onChange={(e) => setConceptNotes(e.target.value)}
            placeholder="Ej. Colores en tonos crema y lavanda, flores naturales de temporada, dedicatoria especial..."
            className="w-full p-3.5 rounded-2xl bg-white text-[#2a170f] text-xs sm:text-sm border border-[#d7c1c3]/30 shadow-xs focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
          />
        </div>

        {/* Fecha del evento */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
            6. Fecha del Evento
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full h-12 px-3 rounded-2xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 shadow-xs focus:ring-2 focus:ring-[#8a4853]/40 outline-none"
          />
        </div>

        {/* Datos de contacto */}
        <div className="p-4 rounded-2xl bg-[#fff1ec] border border-[#d7c1c3]/30 flex flex-col gap-3">
          <span className="text-xs font-bold text-[#2a170f] uppercase tracking-wide">
            Tus Datos para la Cotización
          </span>
          <input
            type="text"
            required
            placeholder="Tu nombre completo"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 outline-none"
          />
          <input
            type="tel"
            required
            placeholder="Teléfono o WhatsApp (10 dígitos)"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-white text-[#2a170f] text-sm border border-[#d7c1c3]/30 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-13 rounded-2xl bg-[#8a4853] hover:bg-[#a6606b] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all mt-2"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          <span>Solicitar Presupuesto al Atelier Shandel</span>
        </button>
      </form>
    </div>
  );
};
