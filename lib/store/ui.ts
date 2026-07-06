import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
