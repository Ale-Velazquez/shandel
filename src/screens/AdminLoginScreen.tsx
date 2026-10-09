import React, { useState } from 'react';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
  onBackToClient: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  onLoginSuccess,
  onBackToClient,
}) => {
  const [email, setEmail] = useState('admin@pasteleriashandel.com');
  const [password, setPassword] = useState('shandel2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Authentication simulation
    setTimeout(() => {
      if (email.trim() && password.trim().length >= 4) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage('Por favor ingresa un correo y contraseña válidos.');
      }
    }, 500);
  };

  const handleFillDemo = () => {
    setEmail('admin@pasteleriashandel.com');
    setPassword('shandel2025');
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto pb-28 pt-2">
      {/* 1. Sello de la marca y badge superior */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full bg-[#ffdea5] flex items-center justify-center shadow-sm">
            <span
              className="material-symbols-outlined text-[#261900] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cake
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8a4853] flex items-center justify-center shadow">
            <span
              className="material-symbols-outlined text-white text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_person
            </span>
          </div>
        </div>
        <span className="font-serif-shandel text-2xl text-[#2a170f] font-semibold tracking-tight">
          Shandel
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] mt-1 bg-[#fed488]/40 text-[#785a1a] px-3 py-0.5 rounded-full">
          Panel de Gestión &amp; Control
        </span>
      </div>

      {/* 2. Cabecera editorial */}
      <div className="text-center mb-5 px-2">
        <h1 className="font-serif-shandel text-2xl font-semibold text-[#2a170f] tracking-tight mb-1.5">
          Acceso Administrativo
        </h1>
        <p className="text-xs text-[#524345] leading-relaxed max-w-xs mx-auto">
          Área restringida exclusivamente al personal y administrador autorizado de Pastelería Shandel.
        </p>
      </div>

      {/* 3. Tarjeta de Seguridad y Formulario */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-[#d7c1c3]/30 mb-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Usuario / Correo */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="admin-email" className="text-xs font-semibold text-[#2a170f]">
                Usuario o Correo Institucional
              </label>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                Cifrado SSL
              </span>
            </div>
            <div className="relative flex items-center bg-[#fff1ec] rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#8a4853]/40 border border-[#d7c1c3]/30 transition-all">
              <span className="material-symbols-outlined text-[#857374] absolute left-3 pointer-events-none text-xl">
                badge
              </span>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pasteleriashandel.com"
                className="w-full bg-transparent py-3 pl-11 pr-3 text-xs sm:text-sm text-[#2a170f] placeholder:text-[#857374] outline-none"
              />
            </div>
          </div>

          {/* Contraseña con toggle */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="admin-pwd" className="text-xs font-semibold text-[#2a170f]">
                Contraseña de Seguridad
              </label>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-medium text-[#8a4853] hover:underline"
              >
                Auto-llenar Demo
              </button>
            </div>
            <div className="relative flex items-center bg-[#fff1ec] rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#8a4853]/40 border border-[#d7c1c3]/30 transition-all">
              <span className="material-symbols-outlined text-[#857374] absolute left-3 pointer-events-none text-xl">
                lock
              </span>
              <input
                id="admin-pwd"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent py-3 pl-11 pr-11 text-xs sm:text-sm text-[#2a170f] placeholder:text-[#857374] outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 p-1 text-[#857374] hover:text-[#2a170f] transition-colors"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Casilla de recordar sesión */}
          <label className="flex items-start gap-2.5 pt-0.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="mt-0.5 accent-[#8a4853] w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-[11px] text-[#524345] leading-snug">
              Mantener sesión activa en este dispositivo seguro y de confianza.
            </span>
          </label>

          {/* Mensaje de error si falla */}
          {errorMessage && (
            <div className="text-center p-2 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#422b22] text-[#fff8f6] py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm shadow hover:bg-[#2a170f] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden mt-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5] animate-ping absolute left-4 opacity-75"></span>
            <span
              className="material-symbols-outlined text-[#ffdea5] text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              key
            </span>
            <span>{isLoading ? 'Validando credenciales seguras...' : 'Iniciar sesión en el panel'}</span>
          </button>
        </form>
      </div>

      {/* 4. Protocolo de Auditoría Activa */}
      <div className="w-full bg-[#fff1ec] rounded-2xl p-4 mb-4 flex items-start gap-3 border border-[#d7c1c3]/30">
        <div className="w-8 h-8 rounded-full bg-[#ffd9dd] flex-shrink-0 flex items-center justify-center text-[#8a4853]">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            gshield
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#2a170f] mb-0.5">
            Protocolo de Auditoría Activa
          </span>
          <p className="text-[11px] text-[#524345] leading-relaxed">
            Las acciones de edición, alta y baja de productos quedan registradas. El acceso no autorizado está estrictamente monitoreado.
          </p>
        </div>
      </div>

      {/* 5. Fotografía del Taller Pastelero */}
      <div className="w-full relative rounded-2xl overflow-hidden mb-4 shadow-sm border border-[#d7c1c3]/30">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDupQjQb9-OBFM3geZwIpPTOhKa4dpiDWMVMpKIL7GI_YuMMQh6QBDF2v7bC4HqkS1qIrrAJPrNcb2ySeP6OYwxA3SlV-MXRDNE4HE-Gdhr0apNQM94QNST5xMYDeh68fuU_ppfv5m6ibR2DXy2VCxZ3RlDWnNzjirbvRbYfgu4DT762Ri1xMaWh8UC4BbKcmVWaj4ORLSvZlt1iN5O0-E44p_krhKjWTy0Gr9cDGTtVbindFvmWoJoHQ"
          alt="Taller Pastelero Artesanal Shandel"
          className="w-full h-24 object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#422b22]/90 via-[#422b22]/30 to-transparent flex items-end p-2.5">
          <div className="flex items-center gap-1.5 text-white">
            <span className="material-symbols-outlined text-[#ffdea5] text-sm">verified</span>
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-95">
              Taller Pastelero Artesanal Shandel
            </span>
          </div>
        </div>
      </div>

      {/* 6. Enlace de escape para volver al catálogo de clientes */}
      <button
        type="button"
        onClick={onBackToClient}
        className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#ffe9e2] hover:bg-[#ffe2d8] text-[#2a170f] text-xs font-semibold transition-all active:scale-95 border border-[#d7c1c3]/30"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        <span>Regresar al catálogo público de clientes</span>
      </button>
    </div>
  );
};
