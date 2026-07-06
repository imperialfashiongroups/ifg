import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/database';

interface WishlistItem {
  product_id: string;
  product: Product;
  added_at: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (product_id: string) => void;
  isWishlisted: (product_id: string) => boolean;
  toggleItem: (product: Product) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        if (!get().isWishlisted(product.id)) {
          set(state => ({
            items: [...state.items, {
              product_id: product.id,
              product,
              added_at: new Date().toISOString(),
            }],
          }));
        }
      },

      removeItem: (product_id: string) => {
        set(state => ({
          items: state.items.filter(i => i.product_id !== product_id),
        }));
      },

      isWishlisted: (product_id: string) => {
        return get().items.some(i => i.product_id === product_id);
      },

      toggleItem: (product: Product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'ifg-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
