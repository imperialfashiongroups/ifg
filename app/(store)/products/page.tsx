'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, Sparkles, Shirt, Smile, Footprints, ShoppingBag, Home, User, Star } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const CATEGORIES = ['All', 'Women Ethnic', 'Women Western', 'Men', 'Kids', 'Footwear', 'Accessories', 'Home & Living'];

// Mock product data
const MOCK_PRODUCTS = [
  { id: '1',  name: 'Embroidered Lehenga Choli', category: 'Women Ethnic',  price: 2999, mrp: 3999, discount: 25, rating: 4.8, reviews: 120, badge: 'NEW',        slug: 'embroidered-lehenga-choli', icon: Sparkles },
  { id: '2',  name: "Men's Premium Suit",        category: 'Men',           price: 4674, mrp: 5499, discount: 15, rating: 4.9, reviews: 85,  badge: 'BESTSELLER', slug: 'mens-premium-suit',         icon: User },
  { id: '3',  name: 'Floral Anarkali Kurti Set', category: 'Women Ethnic',  price: 909,  mrp: 1299, discount: 30, rating: 4.6, reviews: 210, badge: 'SALE',       slug: 'floral-kurti-set',          icon: Sparkles },
  { id: '4',  name: 'Kids Party Wear Frock',     category: 'Kids',          price: 799,  mrp: 999,  discount: 20, rating: 4.7, reviews: 45,  badge: 'NEW',        slug: 'kids-frock-party-wear',     icon: Smile },
  { id: '5',  name: 'Designer Silk Saree',       category: 'Women Ethnic',  price: 4499, mrp: 4999, discount: 10, rating: 4.9, reviews: 310, badge: '',           slug: 'designer-silk-saree',       icon: Sparkles },
  { id: '6',  name: 'Casual Linen Shirt',        category: 'Men',           price: 1199, mrp: 1499, discount: 20, rating: 4.5, reviews: 67,  badge: 'NEW',        slug: 'casual-linen-shirt',        icon: Shirt },
  { id: '7',  name: 'Palazzo Kurta Set',         category: 'Women Ethnic',  price: 1169, mrp: 1799, discount: 35, rating: 4.7, reviews: 180, badge: 'SALE',       slug: 'palazzo-set',               icon: Sparkles },
  { id: '8',  name: 'Kids Denim Jeans',          category: 'Kids',          price: 679,  mrp: 799,  discount: 15, rating: 4.4, reviews: 33,  badge: '',           slug: 'kids-denim-jeans',          icon: Smile },
  { id: '9',  name: 'Printed Kurti',             category: 'Women Ethnic',  price: 599,  mrp: 899,  discount: 33, rating: 4.3, reviews: 90,  badge: '',           slug: 'printed-kurti',             icon: Sparkles },
  { id: '10', name: 'Running Sports Shoes',      category: 'Footwear',      price: 1599, mrp: 2199, discount: 27, rating: 4.6, reviews: 55,  badge: 'BESTSELLER', slug: 'running-sports-shoes',      icon: Footprints },
  { id: '11', name: 'Silk Dupatta',              category: 'Accessories',   price: 499,  mrp: 699,  discount: 28, rating: 4.8, reviews: 140, badge: '',           slug: 'silk-dupatta',              icon: ShoppingBag },
  { id: '12', name: 'Formal Trouser Pants',      category: 'Men',           price: 1299, mrp: 1699, discount: 23, rating: 4.5, reviews: 78,  badge: '',           slug: 'formal-trouser-pants',      icon: User },
  { id: '13', name: 'Western Denim Shrug',       category: 'Women Western', price: 1499, mrp: 1999, discount: 25, rating: 4.7, reviews: 88,  badge: 'NEW',        slug: 'western-denim-shrug',       icon: Shirt },
  { id: '14', name: 'Chic Party One-Piece',      category: 'Women Western', price: 2199, mrp: 2899, discount: 24, rating: 4.8, reviews: 112, badge: 'BESTSELLER', slug: 'chic-party-one-piece',      icon: Shirt },
  { id: '15', name: 'Luxury Cushion Cover Set',  category: 'Home & Living', price: 899,  mrp: 1299, discount: 30, rating: 4.6, reviews: 42,  badge: '',           slug: 'luxury-cushion-cover-set',  icon: Home },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popularity');

  // Filter products
  let filtered = MOCK_PRODUCTS.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  // Sort products
  if (sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'discount') filtered.sort((a, b) => b.discount - a.discount);
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-off-white pb-16">
      {/* Page Header */}
      <div className="bg-brand-black text-white py-12 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="section relative z-10 text-center">
          <nav className="text-xs text-gold-300 mb-3 flex items-center justify-center gap-2 uppercase tracking-widest font-semibold">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">All Products</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Our Complete Collection</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Explore curated attitude across Ethnic Wear, Western Styles, Tailored Suits, Footwear & Accessories.
          </p>
        </div>
      </div>

      <div className="section py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card sticky top-24">
              <h2 className="font-serif font-bold text-brand-black mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-500" /> Filter by Category
              </h2>
              <div className="space-y-2.5">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-brand-black cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-gold-500 w-4 h-4"
                    />
                    <span className={selectedCategory === cat ? 'font-bold text-brand-black' : ''}>{cat}</span>
                  </label>
                ))}
              </div>

              {/* Size Filter */}
              <h2 className="font-serif font-bold text-brand-black mt-6 mb-3 pt-4 border-t border-gray-100 text-sm">
                Filter by Size
              </h2>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-brand-black text-gold-400 border-brand-black'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gold-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Reset Filters Button */}
              {(selectedCategory !== 'All' || selectedSize !== null) && (
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedSize(null); }}
                  className="w-full mt-6 py-2 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-card">
              <p className="text-sm text-gray-600">
                Showing <strong className="text-brand-black">{filtered.length}</strong> styles
                {selectedCategory !== 'All' && <span> in <strong className="text-gold-600">{selectedCategory}</strong></span>}
                {selectedSize && <span> (Size: <strong>{selectedSize}</strong>)</span>}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-brand-black focus:outline-none focus:border-gold-400 cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-card">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">No Styles Match Your Filters</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Try selecting a different category or clearing your size filters to see more of our collection.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedSize(null); }}
                  className="btn-primary text-sm px-6 py-3"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {filtered.map(p => {
                  const Icon = p.icon || Sparkles;
                  return (
                    <Link key={p.id} href={`/products/${p.slug}`} className="product-card group">
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex flex-col items-center justify-center p-4">
                        <Icon className="w-14 h-14 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                        <span className="text-xs text-gray-400 font-medium">View Product</span>
                        {p.badge && (
                          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                            p.badge === 'NEW' ? 'bg-brand-black text-white' :
                            p.badge === 'BESTSELLER' ? 'bg-gold-400 text-brand-black' :
                            'bg-green-600 text-white'
                          }`}>
                            {p.badge}
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-brand-black flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-gold-400 text-gold-400" /> {p.rating}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{p.category}</p>
                        <h3 className="text-sm font-semibold text-brand-black line-clamp-1 mb-2 group-hover:text-gold-600 transition-colors">{p.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-brand-black text-base">₹{p.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">{p.discount}% OFF</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    page === 1 ? 'bg-brand-black text-white shadow-gold' : 'bg-white text-gray-600 hover:bg-gold-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
