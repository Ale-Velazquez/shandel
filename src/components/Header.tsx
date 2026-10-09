import React from 'react';
import { ActiveScreen } from '../types/bakery';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onSearchClick?: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin?: () => void;
  cartCount: number;
  deviceViewMode: 'mobile' | 'desktop';
  onToggleDeviceView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  onSearchClick,
  isAdminLoggedIn,
  cartCount,
  deviceViewMode,
  onToggleDeviceView,
}) => {
  const getSubTitle = () => {
    switch (activeScreen) {
      case 'inicio':
        return 'Inicio';
      case 'catalogo':
        return 'Catálogo';
      case 'detalle':
        return 'Detalle De Producto';
      case 'personalizados':
        return 'Atelier & Diseño';
      case 'mi-solicitud':
        return 'Mi Solicitud';
      case 'confirmacion':
        return 'Cotización Lista';
      case 'login-admin':
        return 'Acceso Seguro';
      case 'panel-admin':
        return 'Panel Admin';
      default:
        return 'Inicio';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fff8f6]/90 backdrop-blur-xl pt-safe shadow-[0_2px_12px_rgba(42,23,15,0.04)] border-b border-[#d7c1c3]/30">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Brand Identity */}
        <div
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-2.5 min-w-0 cursor-pointer select-none group"
        >
          {activeScreen === 'detalle' ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('catalogo');
              }}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#2a170f] hover:text-[#8a4853] hover:bg-[#fff1ec] active:scale-95 transition-transform"
              title="Volver al catálogo"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1VKIQQHapTXXEaEG9zttd1uLYID6xpPgJaI7HcJbqxj4d8PpmPs4slftzHlVESMQAb-h_lFxG8N8lIot3khZIp4R66WJUuOhIpXZhxPCf6wT2lQvDS2d6YWpHEY9eJZ5zeMyobtsSJEaKopL3vBWdNrVYQQy25eNdohKgriedrKyctnXRGyJcLmYol_l3Uu_4lzpQd6baWfzbCHcmeHdPthnFgPaKXW7SFEC57g8SvPMxMjQokYhG6d2nrU"
            alt="Logotipo Pastelería Shandel"
            className="h-8 w-auto object-contain flex-shrink-0 transition-transform group-hover:scale-105"
          />

          <div className="flex flex-col truncate">
            <span className="font-serif-shandel text-xl text-[#2a170f] tracking-tight truncate leading-none font-bold">
              Shandel
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8a4853] mt-0.5">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onNavigate('inicio')}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeScreen === 'inicio'
                ? 'bg-[#8a4853] text-white shadow-sm'
                : 'text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('catalogo')}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeScreen === 'catalogo'
                ? 'bg-[#8a4853] text-white shadow-sm'
                : 'text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec]'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => onNavigate('personalizados')}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeScreen === 'personalizados'
                ? 'bg-[#8a4853] text-white shadow-sm'
                : 'text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec]'
            }`}
          >
            Pasteles Personalizados
          </button>
          <button
            onClick={() => onNavigate('mi-solicitud')}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              activeScreen === 'mi-solicitud'
                ? 'bg-[#8a4853] text-white shadow-sm'
                : 'text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec]'
            }`}
          >
            <span>Solicitud</span>
            {cartCount > 0 && (
              <span className="bg-[#ffd9dd] text-[#8a4853] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Device viewport preview toggle */}
          <button
            type="button"
            onClick={onToggleDeviceView}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#fff1ec] text-[#524345] hover:text-[#8a4853] hover:bg-[#ffe9e2] border border-[#d7c1c3]/50 transition-all"
            title="Alternar entre vista simulada móvil o vista extendida"
          >
            <span className="material-symbols-outlined text-[16px]">
              {deviceViewMode === 'mobile' ? 'stay_current_portrait' : 'laptop_mac'}
            </span>
            <span>{deviceViewMode === 'mobile' ? 'Vista Móvil' : 'Vista Escritorio'}</span>
          </button>

          {/* Quick Search */}
          <button
            type="button"
            aria-label="Buscar en el catálogo"
            onClick={() => {
              if (onSearchClick) onSearchClick();
              else onNavigate('catalogo');
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Admin Lock / Key Icon */}
          <button
            type="button"
            aria-label="Acceso de administración"
            onClick={() => onNavigate(isAdminLoggedIn ? 'panel-admin' : 'login-admin')}
            className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all ${
              activeScreen === 'login-admin' || activeScreen === 'panel-admin'
                ? 'bg-[#8a4853] text-white'
                : 'text-[#524345] hover:text-[#8a4853] hover:bg-[#fff1ec]'
            }`}
            title={isAdminLoggedIn ? 'Panel de Administración' : 'Iniciar sesión como Administrador'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAdminLoggedIn ? 'admin_panel_settings' : 'lock'}
            </span>
          </button>

          {/* Bakery Master Avatar */}
          <button
            type="button"
            onClick={() => onNavigate(isAdminLoggedIn ? 'panel-admin' : 'login-admin')}
            className="w-10 h-10 flex items-center justify-center rounded-full p-0.5 ml-0.5 active:scale-95 transition-transform"
            title="Chef Repostera Shandel"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtqQwFFhJEvQbkRgZ4u64_NmIOspXH8UXQy46jUEiGkRMRGaV0Q8bWz5j4jBgip0DUZ12DbiEAkEpMQk7mjyzUf4Zb84jVp6bU21DqqHJoH-dSMy7IBQ6Krj9BHIlKVxs-WUNbiK3eD2gKOU9wgUtKVcna7unyr6MkQaHRzhEFuZkSa9G3ig2stpbF6--7KE4MC1zPi2MaUGojME-cZdZU2oxXBnx_vvWv0qGtB-vVB5UJEnjHw9LcnA"
              alt="Perfil Administradora Shandel"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#8a4853]/25"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
