import React from 'react';
import { ActiveScreen } from '../types/bakery';

interface BottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  cartCount: number;
  isAdminLoggedIn: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  isAdminLoggedIn,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#fff8f6]/92 backdrop-blur-xl border-t border-[#d7c1c3]/40 shadow-[0_-4px_16px_rgba(42,23,15,0.04)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {/* 1. Inicio */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors active:scale-95 ${
            activeScreen === 'inicio'
              ? 'text-[#8a4853] font-bold'
              : 'text-[#524345] hover:text-[#8a4853]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings: activeScreen === 'inicio' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            storefront
          </span>
          <span className="text-[10px] font-semibold tracking-tight">Inicio</span>
        </button>

        {/* 2. Catálogo */}
        <button
          type="button"
          onClick={() => onNavigate('catalogo')}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors active:scale-95 ${
            activeScreen === 'catalogo' || activeScreen === 'detalle'
              ? 'text-[#8a4853] font-bold'
              : 'text-[#524345] hover:text-[#8a4853]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings:
                activeScreen === 'catalogo' || activeScreen === 'detalle' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            menu_book
          </span>
          <span className="text-[10px] font-semibold tracking-tight">Catálogo</span>
        </button>

        {/* 3. Diseño / Personalizados */}
        <button
          type="button"
          onClick={() => onNavigate('personalizados')}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors active:scale-95 ${
            activeScreen === 'personalizados'
              ? 'text-[#8a4853] font-bold'
              : 'text-[#524345] hover:text-[#8a4853]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings: activeScreen === 'personalizados' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            cake
          </span>
          <span className="text-[10px] font-semibold tracking-tight">Diseño</span>
        </button>

        {/* 4. Solicitud */}
        <button
          type="button"
          onClick={() => onNavigate('mi-solicitud')}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors active:scale-95 ${
            activeScreen === 'mi-solicitud' || activeScreen === 'confirmacion'
              ? 'text-[#8a4853] font-bold'
              : 'text-[#524345] hover:text-[#8a4853]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{
                fontVariationSettings:
                  activeScreen === 'mi-solicitud' || activeScreen === 'confirmacion'
                    ? "'FILL' 1"
                    : "'FILL' 0",
              }}
            >
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#8a4853] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Solicitud</span>
        </button>

        {/* 5. Admin */}
        <button
          type="button"
          onClick={() => onNavigate(isAdminLoggedIn ? 'panel-admin' : 'login-admin')}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors active:scale-95 ${
            activeScreen === 'panel-admin' || activeScreen === 'login-admin'
              ? 'text-[#8a4853] font-bold'
              : 'text-[#524345] hover:text-[#8a4853]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings:
                activeScreen === 'panel-admin' || activeScreen === 'login-admin'
                  ? "'FILL' 1"
                  : "'FILL' 0",
            }}
          >
            admin_panel_settings
          </span>
          <span className="text-[10px] font-semibold tracking-tight">Admin</span>
        </button>
      </div>
    </nav>
  );
};
