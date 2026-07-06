'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';

const NAV_CATEGORIES = [
  {
    label: 'Women Ethnic',
    href: '/categories/women-ethnic',
    subcategories: [
      { label: 'Lehenga',    href: '/categories/lehenga' },
      { label: '3 Piece Set', href: '/categories/3-piece-set' },
      { label: '2 Piece Set', href: '/categories/2-piece-set' },
      { label: 'Kurti',      href: '/categories/kurti' },
      { label: 'One Piece',  href: '/categories/one-piece' },
      { label: 'Tops',       href: '/categories/womens-tops' },
      { label: 'Skirts',     href: '/categories/womens-skirts' },
      { label: 'Jumpsuit',   href: '/categories/womens-jumpsuit' },
    ],
  },
  {
    label: 'Women Western',
    href: '/categories/women-western',
    subcategories: [
      { label: 'Shorts',    href: '/categories/womens-shorts' },
      { label: 'Jeans',     href: '/categories/womens-jeans' },
      { label: 'Pants',     href: '/categories/womens-pants' },
      { label: 'Leggings',  href: '/categories/leggings' },
      { label: 'Bras',      href: '/categories/bras' },
      { label: 'Shrugs',    href: '/categories/shrugs' },
      { label: 'Jackets',   href: '/categories/womens-jackets' },
      { label: 'Sweater',   href: '/categories/sweater' },
    ],
  },
  {
    label: 'Men',
    href: '/categories/men',
    subcategories: [
      { label: 'Suits',       href: '/categories/suits' },
      { label: 'Shirts',      href: '/categories/shirts' },
      { label: 'Pants',       href: '/categories/mens-pants' },
      { label: 'Jeans',       href: '/categories/mens-jeans' },
      { label: 'T-Shirts',    href: '/categories/t-shirts' },
      { label: 'Track Pants', href: '/categories/track-pants' },
      { label: 'Jackets',     href: '/categories/mens-jackets' },
    ],
  },
  {
    label: 'Kids',
    href: '/categories/kids',
    subcategories: [
      { label: 'Frocks',      href: '/categories/frocks' },
      { label: 'Tops',        href: '/categories/kids-tops' },
      { label: 'Jumpsuit',    href: '/categories/kids-jumpsuit' },
      { label: 'Jeans',       href: '/categories/kids-jeans' },
      { label: 'Formal Wear', href: '/categories/formal-wear' },
    ],
  },
  { label: 'Footwear',     href: '/categories/footwear',    subcategories: [] },
  { label: 'Accessories',  href: '/categories/accessories',  subcategories: [] },
  { label: 'Home & Living', href: '/categories/home-living', subcategories: [] },
];

export default function Header() {
  const itemCount = useCartStore(s => s.itemCount());
  const { openCart, openMobileNav } = useUIStore();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'shadow-dark bg-glass-dark' : 'bg-brand-black'
    )}>
      {/* Top Bar */}
      <div className="bg-gold-400 text-brand-black text-xs font-medium">
        <div className="section flex items-center justify-between py-2">
          <span>Free shipping on orders above ₹499 | 7-Day Easy Returns</span>
          <div className="flex items-center gap-4">
            <a href="tel:+91" className="flex items-center gap-1 hover:underline">
              <Phone className="w-3 h-3" />
              <span>imperialfashiongroups@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="section">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={openMobileNav}
            className="lg:hidden text-white p-2 hover:text-gold-400 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <span className="text-gold-gradient font-display text-xl lg:text-2xl font-black tracking-widest uppercase">
              Imperial
            </span>
            <span className="text-white text-[9px] tracking-[0.3em] uppercase font-light">
              Fashion Groups
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            ref={menuRef}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {NAV_CATEGORIES.map(cat => (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(cat.label)}
              >
                <Link
                  href={cat.href}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    'text-gray-300 hover:text-gold-400'
                  )}
                >
                  {cat.label}
                  {cat.subcategories.length > 0 && (
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeMenu === cat.label && 'rotate-180'
                    )} />
                  )}
                </Link>

                {/* Mega Menu */}
                {cat.subcategories.length > 0 && (
                  <AnimatePresence>
                    {activeMenu === cat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-gray-100 py-2 z-50"
                      >
                        <Link
                          href={cat.href}
                          className="block px-4 py-2 text-xs font-semibold text-gold-500 uppercase tracking-wider border-b border-gray-100 mb-1"
                        >
                          View All {cat.label}
                        </Link>
                        {cat.subcategories.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              href="/search"
              className="p-2 text-gray-300 hover:text-gold-400 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              className="p-2 text-gray-300 hover:text-gold-400 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/account"
              className="p-2 text-gray-300 hover:text-gold-400 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 text-gray-300 hover:text-gold-400 transition-colors"
              aria-label="Cart"
              id="cart-button"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-400 text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
