import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, CartState, Coupon } from '@/types/database';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (newItem: CartItem) => {
        set(state => {
          const existing = state.items.find(i => i.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === newItem.id
                  ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, 10) }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id: string) => {
        set(state => ({ items: state.items.filter(i => i.id !== id) }));
      },

      updateQuantity: (id: string, qty: number) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity: Math.min(qty, 10) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon: Coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      gstAmount: () => {
        // GST is included in the price (reverse-calculate)
        return get().items.reduce((sum, item) => {
          const gstMultiplier = item.gst_rate / (100 + item.gst_rate);
          return sum + item.price * item.quantity * gstMultiplier;
        }, 0);
      },

      discountAmount: () => {
        const subtotal = get().subtotal();
        const coupon = get().coupon;
        if (!coupon) return 0;
        if (subtotal < coupon.min_order_value) return 0;
        let discount = coupon.discount_type === 'percentage'
          ? subtotal * (coupon.discount_value / 100)
          : coupon.discount_value;
        if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
        return discount;
      },

      total: () => {
        const subtotal = get().subtotal();
        const discount = get().discountAmount();
        const shipping = subtotal > 499 ? 0 : 49; // Free shipping above ₹499
        return Math.max(0, subtotal - discount + shipping);
      },

      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'ifg-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
