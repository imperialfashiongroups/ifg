// ============================================================
// Imperial Fashion Groups — TypeScript Types
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// ---- Enums ----
export type GenderCategory = 'women' | 'men' | 'kids' | 'unisex';
export type OrderStatus =
  | 'pending' | 'confirmed' | 'processing' | 'shipped'
  | 'out_for_delivery' | 'delivered' | 'cancelled'
  | 'return_requested' | 'return_approved' | 'return_picked'
  | 'refund_initiated' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type PaymentMethod = 'razorpay' | 'cod';
export type ReturnReason = 'defective' | 'wrong_item' | 'size_issue' | 'not_as_described' | 'changed_mind' | 'other';
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'picked_up' | 'received' | 'refund_initiated' | 'refunded';

// ---- Database Row Types ----

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  gender: GenderCategory | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  // Relations
  subcategories?: Category[];
  parent?: Category;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  brand: string;
  hsn_code: string | null;
  gst_rate: number;
  base_price: number;
  mrp: number;
  discount_pct: number;
  is_active: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  categories?: Category;
  product_variants?: ProductVariant[];
  product_images?: ProductImage[];
  reviews?: Review[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: string | null;
  color: string | null;
  color_hex: string | null;
  stock_qty: number;
  price: number | null;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  shipping_name: string;
  shipping_phone: string;
  shipping_address1: string;
  shipping_address2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  subtotal: number;
  gst_amount: number;
  discount_amount: number;
  shipping_charge: number;
  total_amount: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  coupon_code: string | null;
  notes: string | null;
  tracking_id: string | null;
  courier_name: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  items?: OrderItem[];
  payment?: Payment;
  return_request?: ReturnRequest;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  variant_name: string | null;
  image_url: string | null;
  quantity: number;
  unit_price: number;
  gst_rate: number;
  total_price: number;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string | null;
  error_code: string | null;
  error_description: string | null;
  created_at: string;
}

export interface ReturnRequest {
  id: string;
  order_id: string;
  user_id: string;
  reason: ReturnReason;
  description: string | null;
  images: string[] | null;
  status: ReturnStatus;
  admin_notes: string | null;
  refund_amount: number | null;
  created_at: string;
  updated_at: string;
  // Relations
  order?: Order;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  images: string[] | null;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
  // Relations
  profile?: Pick<Profile, 'full_name' | 'avatar_url'>;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_value: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// ---- Cart Types (client-side Zustand) ----

export interface CartItem {
  id: string; // variant_id or product_id
  product_id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  image_url: string;
  price: number; // effective selling price per unit (incl. GST)
  mrp: number;
  gst_rate: number;
  quantity: number;
  slug: string;
  size?: string;
  color?: string;
}

export interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  subtotal: () => number;
  gstAmount: () => number;
  discountAmount: () => number;
  total: () => number;
  itemCount: () => number;
}

// ---- Size Chart Types ----

export interface SizeChartRow {
  size: string;
  chest?: string;
  waist?: string;
  hips?: string;
  length?: string;
  inseam?: string;
  shoulder?: string;
}

export interface SizeChart {
  category: string;
  unit: 'cm' | 'inches';
  rows: SizeChartRow[];
}

// ---- API Response Types ----

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
