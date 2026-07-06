'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { useUIStore } from '@/lib/store/ui';

const NAV_ITEMS = [
  {
    label: 'Women Ethnic',
    href: '/categories/women-ethnic',
    sub: ['Lehenga', 'Kurti', '3 Piece Set', 'Tops', 'Jumpsuit'],
  },
  {
    label: 'Women Western',
    href: '/categories/women-western',
    sub: ['Jeans', 'Leggings', 'Shrugs', 'Jackets'],
  },
  {
    label: 'Men',
    href: '/categories/men',
    sub: ['Shirts', 'Suits', 'Jeans', 'T-Shirts'],
  },
  {
    label: 'Kids',
    href: '/categories/kids',
    sub: ['Frocks', 'Tops', 'Jeans'],
  },
  { label: 'Footwear',     href: '/categories/footwear',    sub: [] },
  { label: 'Accessories',  href: '/categories/accessories',  sub: [] },
  { label: 'Home & Living', href: '/categories/home-living', sub: [] },
];

export default function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUIStore();

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-brand-black z-50 flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <p className="text-gold-gradient font-display text-xl font-black tracking-widest">IMPERIAL</p>
                <p className="text-gray-500 text-[9px] tracking-[0.3em]">FASHION GROUPS</p>
              </div>
              <button
                onClick={closeMobileNav}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4">
              {NAV_ITEMS.map(item => (
                <div key={item.label} className="border-b border-white/5">
                  <Link
                    href={item.href}
                    onClick={closeMobileNav}
                    className="flex items-center justify-between px-5 py-4 text-white hover:text-gold-400 transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                  {item.sub.length > 0 && (
                    <div className="bg-white/5 pb-2">
                      {item.sub.map(sub => (
                        <Link
                          key={sub}
                          href={`/categories/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={closeMobileNav}
                          className="block px-8 py-2.5 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom Links */}
            <div className="p-5 border-t border-white/10 space-y-3">
              <Link
                href="/account"
                onClick={closeMobileNav}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
              >
                My Account
              </Link>
              <Link
                href="/account/orders"
                onClick={closeMobileNav}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
              >
                My Orders
              </Link>
              <Link
                href="/wishlist"
                onClick={closeMobileNav}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
              >
                Wishlist
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
