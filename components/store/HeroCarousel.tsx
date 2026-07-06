'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Wear Your',
    titleBold: 'Attitude',
    subtitle: 'New Collection 2025 — Women Ethnic',
    cta: 'Shop Women Ethnic',
    href: '/categories/women-ethnic',
    bg: 'from-[#1A1A1A] via-[#2d1a0a] to-[#1A1A1A]',
    image: '/placeholder/hero-1.jpg',
  },
  {
    id: 2,
    title: 'Redefining',
    titleBold: 'Men\'s Style',
    subtitle: 'Premium Suits & Formals for the Modern Man',
    cta: 'Shop Men',
    href: '/categories/men',
    bg: 'from-[#0d1a2d] via-[#1a1a1a] to-[#0d1a2d]',
    image: '/placeholder/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Little Ones,',
    titleBold: 'Big Style',
    subtitle: 'Kids Collection — Vibrant Colors & Comfort',
    cta: 'Shop Kids',
    href: '/categories/kids',
    bg: 'from-[#1a0d2d] via-[#1a1a1a] to-[#1a0d2d]',
    image: '/placeholder/hero-3.jpg',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-brand-black">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-700`} />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center"
        >
          <div className="section w-full">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4"
              >
                {slide.subtitle}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-5xl md:text-7xl font-black text-white mb-2 leading-tight"
              >
                {slide.title}
                <br />
                <span className="text-gold-gradient">{slide.titleBold}</span>
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '5rem' }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="h-1 bg-gold-gradient rounded-full mb-6"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href={slide.href} className="btn-primary text-base px-8 py-4 animate-pulse-gold">
                  {slide.cta}
                </Link>
                <Link href="/products" className="btn-secondary text-base px-8 py-4 border-white text-white hover:border-gold-400">
                  View All
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-gold-400 rounded-full flex items-center justify-center text-white hover:text-brand-black transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-gold-400 rounded-full flex items-center justify-center text-white hover:text-brand-black transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
