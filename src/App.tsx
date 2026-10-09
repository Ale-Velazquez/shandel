/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, StoreSettings, ActiveScreen } from './types/bakery';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_STORE_SETTINGS,
} from './data/mockBakery';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CustomCakeScreen } from './screens/CustomCakeScreen';
import { OrderRequestScreen } from './screens/OrderRequestScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { AdminLoginScreen } from './screens/AdminLoginScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';
import { AdminProductModal } from './screens/AdminProductModal';
import { AdminCategoriesModal } from './screens/AdminCategoriesModal';
import { AdminStoreModal } from './screens/AdminStoreModal';

export default function App() {
  // State from LocalStorage or Initial
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('shandel_settings');
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('inicio');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_favs');
      return saved ? JSON.parse(saved) : ['prod-selva-negra', 'prod-naked-cake-vainilla'];
    } catch {
      return ['prod-selva-negra', 'prod-naked-cake-vainilla'];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shandel_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);
  const [editProductTarget, setEditProductTarget] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // Device view mode: 'mobile' simulator container vs fluid responsive
  const [deviceViewMode, setDeviceViewMode] = useState<'mobile' | 'desktop'>('mobile');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('shandel_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Error saving products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_categories', JSON.stringify(categories));
    } catch (e) {
      console.warn('Error saving categories:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Error saving cart:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_favs', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Error saving favorites:', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_admin_logged', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.warn('Error saving admin state:', e);
    }
  }, [isAdminLoggedIn]);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Cart operations
  const handleAddToCart = (itemData: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Producto retirado de la solicitud');
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showToast('Eliminado de favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Guardado en tus favoritos');
        return [...prev, productId];
      }
    });
  };

  // Product selection & navigation
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveScreen('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin handlers
  const handleToggleProductVisibility = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.isPublished;
          showToast(
            nextState
              ? `"${p.name}" ahora está visible en el catálogo`
              : `"${p.name}" se ocultó del catálogo`
          );
          return {
            ...p,
            isPublished: nextState,
            status: nextState ? 'disponible_hoy' : 'oculto',
          };
        }
        return p;
      })
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteProductTarget) return;
    const targetName = deleteProductTarget.name;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
    setDeleteProductTarget(null);
    showToast(`"${targetName}" eliminado permanentemente`);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (productData.id) {
      // Edit
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? ({ ...p, ...productData } as Product) : p))
      );
      showToast('Producto actualizado correctamente');
    } else {
      // Create
      const newProduct: Product = {
        id: 'prod-' + Date.now(),
        sku: productData.sku || 'SKU-' + Math.floor(1000 + Math.random() * 9000),
        name: productData.name || 'Nuevo Pastel',
        slug: (productData.name || 'nuevo-pastel').toLowerCase().replace(/\s+/g, '-'),
        description: productData.description || 'Elaborado artesanalmente',
        fullDescription: productData.fullDescription || '',
        categoryId: productData.categoryId || 'cumpleanos',
        categoryName: productData.categoryName || 'Cumpleaños',
        basePrice: productData.basePrice || 480,
        status: productData.status || 'disponible_hoy',
        isPublished: productData.isPublished ?? true,
        isFeatured: productData.isFeatured ?? false,
        anticipationHours: productData.anticipationHours || 24,
        images: productData.images || [INITIAL_PRODUCTS[0].images[0]],
        sizes: productData.sizes || INITIAL_PRODUCTS[0].sizes,
        flavors: productData.flavors || INITIAL_PRODUCTS[0].flavors,
        fillings: productData.fillings || INITIAL_PRODUCTS[0].fillings,
      };
      setProducts((prev) => [newProduct, ...prev]);
      showToast('Nuevo producto registrado exitosamente');
    }
    setIsProductModalOpen(false);
    setEditProductTarget(null);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setActiveScreen('panel-admin');
    showToast('Sesión administrativa iniciada con éxito');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveScreen('inicio');
    showToast('Sesión cerrada correctamente');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#2a170f] flex flex-col font-sans selection:bg-[#ffdea5] selection:text-[#261900]">
      {/* Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogout}
        cartCount={totalCartCount}
        deviceViewMode={deviceViewMode}
        onToggleDeviceView={() =>
          setDeviceViewMode((prev) => (prev === 'mobile' ? 'desktop' : 'mobile'))
        }
      />

      {/* Main Container: Adapts to either focused phone layout (matching Stitch mockup) or full fluid width */}
      <main
        className={`flex-1 flex flex-col relative w-full pt-16 transition-all ${
          deviceViewMode === 'mobile'
            ? 'max-w-md mx-auto px-4 shadow-[0_0_40px_rgba(42,23,15,0.06)] min-h-[calc(100vh-4rem)] bg-[#fff8f6]'
            : 'max-w-6xl mx-auto px-4 sm:px-6 w-full'
        }`}
      >
        {/* Screen Routing */}
        {activeScreen === 'inicio' && (
          <HomeScreen
            products={products}
            categories={categories}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            onSearchQuery={(q) => {
              setSearchQuery(q);
              setSelectedCategoryId('all');
            }}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
            }}
            onOpenStoreModal={() => setIsStoreModalOpen(true)}
          />
        )}

        {activeScreen === 'catalogo' && (
          <CatalogScreen
            products={products}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectProduct={handleSelectProduct}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeScreen === 'detalle' && selectedProduct && (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setActiveScreen('catalogo')}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'personalizados' && (
          <CustomCakeScreen
            onBack={() => setActiveScreen('inicio')}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'mi-solicitud' && (
          <OrderRequestScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={() => setCartItems([])}
            onNavigate={handleNavigate}
            onCompleteOrder={(summary) => setOrderSummary(summary)}
          />
        )}

        {activeScreen === 'confirmacion' && (
          <ConfirmationScreen
            orderSummary={orderSummary}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'login-admin' && (
          <AdminLoginScreen
            onLoginSuccess={handleLoginSuccess}
            onBackToClient={() => setActiveScreen('inicio')}
          />
        )}

        {activeScreen === 'panel-admin' && (
          <AdminDashboardScreen
            products={products}
            categories={categories}
            onToggleProductVisibility={handleToggleProductVisibility}
            onEditProduct={(p) => {
              setEditProductTarget(p);
              setIsProductModalOpen(true);
            }}
            onCreateProduct={() => {
              setEditProductTarget(null);
              setIsProductModalOpen(true);
            }}
            onDeleteProductClick={(p) => setDeleteProductTarget(p)}
            onOpenCategoriesManager={() => setIsCategoriesModalOpen(true)}
            onOpenStoreSettings={() => setIsStoreModalOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Bottom Tab Navigation */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Toast Feedback Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Delete Confirmation Modal (Image 1.png) */}
      <DeleteConfirmModal
        isOpen={deleteProductTarget !== null}
        productName={deleteProductTarget?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteProductTarget(null)}
      />

      {/* Product Edit / Create Modal */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        product={editProductTarget}
        categories={categories}
        onSave={handleSaveProduct}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditProductTarget(null);
        }}
      />

      {/* Categories Manager Modal */}
      <AdminCategoriesModal
        isOpen={isCategoriesModalOpen}
        categories={categories}
        onUpdateCategories={setCategories}
        onClose={() => setIsCategoriesModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Store Settings & Policies Modal */}
      <AdminStoreModal
        isOpen={isStoreModalOpen}
        settings={storeSettings}
        onSave={setStoreSettings}
        onClose={() => setIsStoreModalOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
}
