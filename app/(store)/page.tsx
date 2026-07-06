import type { Metadata } from 'next';
import HeroCarousel from '@/components/store/HeroCarousel';
import CategoryGrid from '@/components/store/CategoryGrid';
import USPBanner from '@/components/store/USPBanner';
import BrandStory from '@/components/store/BrandStory';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shirt, Smile, Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Imperial Fashion Groups — Wear Your Attitude | Premium Indian Fashion',
  description:
    'Shop premium Indian fashion online — Women Ethnic, Western, Men, Kids, Footwear & more. Free shipping above ₹499. 7-Day returns. Founded 2009, Raipur.',
};

// Mock featured products data (will be replaced with Supabase fetch)
const FEATURED_PRODUCTS = [
  { id: '1', name: 'Embroidered Lehenga Choli', slug: 'embroidered-lehenga-choli', mrp: 3999, discount_pct: 25, category: 'Women Ethnic', badge: 'NEW' },
  { id: '2', name: 'Men\'s Premium Suit',         slug: 'mens-premium-suit',         mrp: 5499, discount_pct: 15, category: 'Men',           badge: 'BESTSELLER' },
  { id: '3', name: 'Floral Kurti Set',            slug: 'floral-kurti-set',           mrp: 1299, discount_pct: 30, category: 'Women Ethnic', badge: 'SALE' },
  { id: '4', name: 'Kids Frock Party Wear',       slug: 'kids-frock-party-wear',      mrp: 999,  discount_pct: 20, category: 'Kids',          badge: 'NEW' },
  { id: '5', name: 'Designer Silk Saree',         slug: 'designer-silk-saree',        mrp: 4999, discount_pct: 10, category: 'Women Ethnic', badge: '' },
  { id: '6', name: 'Casual Linen Shirt',          slug: 'casual-linen-shirt',         mrp: 1499, discount_pct: 20, category: 'Men',           badge: 'NEW' },
  { id: '7', name: 'Palazzo Set',                 slug: 'palazzo-set',                mrp: 1799, discount_pct: 35, category: 'Women Ethnic', badge: 'SALE' },
  { id: '8', name: 'Kids Denim Jeans',            slug: 'kids-denim-jeans',           mrp: 799,  discount_pct: 15, category: 'Kids',          badge: '' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',     city: 'Raipur',    rating: 5, text: 'Amazing quality and super fast delivery! The lehenga was exactly as described. Love Imperial Fashion!' },
  { name: 'Rahul Gupta',      city: 'Hyderabad', rating: 5, text: 'Bought a suit for my wedding — the fitting and finish were perfect. Highly recommend!' },
  { name: 'Anita Patel',      city: 'Bengaluru', rating: 5, text: 'The kurti sets are so beautiful! Great fabric, wonderful stitching, and great prices. 10/10!' },
  { name: 'Suresh Reddy',     city: 'Raipur',    rating: 5, text: 'Very smooth shopping experience. COD option is great. Returns are also hassle-free.' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-gold-400' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroCarousel />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Bestsellers */}
      <section className="py-20 bg-white">
        <div className="section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-gold-500 text-sm font-medium tracking-[0.2em] uppercase mb-2">Curated for You</p>
              <h2 className="section-heading">Featured Bestsellers</h2>
              <div className="gold-divider mt-3" />
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-600 mt-4 md:mt-0 transition-colors group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map(p => {
              const effectivePrice = p.mrp * (1 - p.discount_pct / 100);
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="product-card group"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex flex-col items-center justify-center text-gray-400 text-xs">
                    {p.category === 'Women Ethnic' ? (
                      <Sparkles className="w-10 h-10 text-gold-400 opacity-60 mb-2 group-hover:scale-110 transition-transform" />
                    ) : p.category === 'Men' ? (
                      <Shirt className="w-10 h-10 text-blue-500 opacity-60 mb-2 group-hover:scale-110 transition-transform" />
                    ) : p.category === 'Kids' ? (
                      <Smile className="w-10 h-10 text-amber-500 opacity-60 mb-2 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Footprints className="w-10 h-10 text-emerald-500 opacity-60 mb-2 group-hover:scale-110 transition-transform" />
                    )}
                    <span>Product Image</span>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.badge === 'NEW' ? 'bg-brand-black text-white' :
                        p.badge === 'BESTSELLER' ? 'bg-gold-400 text-brand-black' :
                        'bg-green-500 text-white'
                      }`}>
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{p.category}</p>
                    <h3 className="text-sm font-semibold text-brand-black line-clamp-2 mb-2">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-black text-sm">
                        ₹{Math.round(effectivePrice).toLocaleString('en-IN')}
                      </span>
                      {p.discount_pct > 0 && (
                        <>
                          <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-green-600 font-medium">{p.discount_pct}% off</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/products" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Banner — Special Offer */}
      <section className="bg-gold-gradient py-14">
        <div className="section text-center">
          <p className="text-brand-black/70 text-sm font-medium tracking-[0.2em] uppercase mb-2">Limited Time Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-brand-black mb-4">
            Sale Up to 50% Off
          </h2>
          <p className="text-brand-black/70 mb-8 text-lg">On selected Women Ethnic & Men's Formals</p>
          <Link href="/products?sort=discount" className="btn-dark text-base px-10 py-4 inline-flex">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* USP Banner */}
      <USPBanner />

      {/* Brand Story */}
      <BrandStory />

      {/* Testimonials */}
      <section className="py-16 bg-off-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">What Our Customers Say</p>
            <h2 className="section-heading">Loved Across India</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <StarRating rating={t.rating} />
                <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-brand-black font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-black">
        <div className="section max-w-2xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">Stay in the Loop</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Get Exclusive Offers
          </h2>
          <p className="text-gray-400 mb-8">Subscribe to get early access to sales, new arrivals, and fashion tips.</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
          <p className="text-gray-600 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
