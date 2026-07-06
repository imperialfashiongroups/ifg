'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Shirt, User, Smile, Footprints, ShoppingBag, Home } from 'lucide-react';

const CATEGORIES = [
  { label: 'Women Ethnic',  href: '/categories/women-ethnic',  icon: Sparkles,    color: 'from-rose-900/40 to-pink-900/40',    count: '200+ styles' },
  { label: 'Women Western', href: '/categories/women-western',  icon: Shirt,       color: 'from-purple-900/40 to-violet-900/40', count: '150+ styles' },
  { label: 'Men',           href: '/categories/men',            icon: User,        color: 'from-blue-900/40 to-indigo-900/40',  count: '100+ styles' },
  { label: 'Kids',          href: '/categories/kids',           icon: Smile,       color: 'from-yellow-900/40 to-orange-900/40', count: '80+ styles' },
  { label: 'Footwear',      href: '/categories/footwear',       icon: Footprints,  color: 'from-green-900/40 to-teal-900/40',  count: '50+ styles' },
  { label: 'Accessories',   href: '/categories/accessories',    icon: ShoppingBag, color: 'from-amber-900/40 to-yellow-900/40', count: '60+ styles' },
  { label: 'Home & Living', href: '/categories/home-living',    icon: Home,        color: 'from-slate-700/40 to-gray-700/40',  count: '40+ items' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-off-white">
      <div className="section">
        <div className="text-center mb-12">
          <p className="text-gold-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Shop by Category</p>
          <h2 className="section-heading">Find Your Style</h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {CATEGORIES.map(({ label, href, icon: Icon, color, count }) => (
            <motion.div key={href} variants={item}>
              <Link href={href} className="group block">
                <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${color} bg-brand-black border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:border-gold-400 group-hover:shadow-gold group-hover:-translate-y-1`}>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-gold-400/10 to-transparent" />

                  <Icon className="w-8 h-8 mb-2 text-gold-400 group-hover:animate-float" />
                  <p className="text-white text-xs font-semibold text-center leading-tight">{label}</p>
                  <p className="text-gray-300 text-[11px] font-medium text-center mt-1.5 group-hover:text-gold-300 transition-colors">{count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
