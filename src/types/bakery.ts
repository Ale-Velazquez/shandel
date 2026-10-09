export type ProductStatus = 'disponible_hoy' | 'bajo_pedido' | 'oculto';

export interface CakeSize {
  id: string;
  name: string;
  portions: string;
  price: number;
  badge?: string;
  isDefault?: boolean;
}

export interface CakeFlavor {
  id: string;
  name: string;
  extraPrice: number;
  description?: string;
  icon?: string;
}

export interface CakeFilling {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  basePrice: number;
  status: ProductStatus;
  isPublished: boolean;
  isFeatured: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  anticipationHours: number;
  images: string[];
  sizes: CakeSize[];
  flavors: CakeFlavor[];
  fillings: CakeFilling[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  order: number;
  isHidden: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sizeName: string;
  portions: string;
  flavorName: string;
  fillingName: string;
  dedication?: string;
  deliveryDate: string;
  unitPrice: number;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phoneWhatsApp: string;
  email: string;
  address: string;
  city: string;
  scheduleWeekday: string;
  scheduleWeekend: string;
  anticipationDays: number;
  noticeBanner: string;
}

export type ActiveScreen = 
  | 'inicio'
  | 'catalogo'
  | 'detalle'
  | 'personalizados'
  | 'mi-solicitud'
  | 'confirmacion'
  | 'login-admin'
  | 'panel-admin';
