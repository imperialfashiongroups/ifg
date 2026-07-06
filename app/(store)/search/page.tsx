'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Sparkles, ArrowRight } from 'lucide-react';

const ALL_PRODUCTS = [
  { id: '1',  name: 'Embroidered Lehenga Choli', category: 'Women Ethnic',  price: 2999, mrp: 3999, discount: 25, slug: 'embroidered-lehenga-choli' },
  { id: '2',  name: "Men's Premium Suit",        category: 'Men',           price: 4674, mrp: 5499, discount: 15, slug: 'mens-premium-suit' },
  { id: '3',  name: 'Floral Anarkali Kurti Set', category: 'Women Ethnic',  price: 909,  mrp: 1299, discount: 30, slug: 'floral-kurti-set' },
  { id: '4',  name: 'Kids Party Wear Frock',     category: 'Kids',          price: 799,  mrp: 999,  discount: 20, slug: 'kids-frock-party-wear' },
  { id: '5',  name: 'Designer Silk Saree',       category: 'Women Ethnic',  price: 4499, mrp: 4999, discount: 10, slug: 'designer-silk-saree' },
  { id: '6',  name: 'Casual Linen Shirt',        category: 'Men',           price: 1199, mrp: 1499, discount: 20, slug: 'casual-linen-shirt' },
  { id: '7',  name: 'Palazzo Kurta Set',         category: 'Women Ethnic',  price: 1169, mrp: 1799, discount: 35, slug: 'palazzo-set' },
  { id: '8',  name: 'Kids Denim Jeans',          category: 'Kids',          price: 679,  mrp: 799,  discount: 15, slug: 'kids-denim-jeans' },
  { id: '9',  name: 'Printed Kurti',             category: 'Women Ethnic',  price: 599,  mrp: 899,  discount: 33, slug: 'printed-kurti' },
  { id: '10', name: 'Running Sports Shoes',      category: 'Footwear',      price: 1599, mrp: 2199, discount: 27, slug: 'running-sports-shoes' },
  { id: '11', name: 'Silk Dupatta',              category: 'Accessories',   price: 499,  mrp: 699,  discount: 28, slug: 'silk-dupatta' },
  { id: '12', name: 'Formal Trouser Pants',      category: 'Men',           price: 1299, mrp: 1699, discount: 23, slug: 'formal-trouser-pants' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filtered = query.trim() === '' ? [] : ALL_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-black mb-3">Search Our Catalog</h1>
          <p className="text-sm text-gray-500 mb-6">Find your attitude across Women Ethnic, Western, Men, Kids & Accessories</p>
          
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by keyword, style or category (e.g., 'Lehenga', 'Suit', 'Silk')..."
              className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-gold-400 shadow-card transition-all"
              autoFocus
            />
            <SearchIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-brand-black">
                Clear
              </button>
            )}
          </div>
        </div>

        {query.trim() === '' ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
            <h2 className="font-serif font-bold text-lg text-brand-black mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {['Lehenga Choli', 'Silk Saree', "Men's Suit", 'Anarkali Kurti', 'Kids Frock', 'Linen Shirt', 'Palazzo Set', 'Footwear'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gold-50 border border-gray-200 hover:border-gold-400 rounded-full text-xs font-semibold text-gray-700 hover:text-gold-600 transition-all"
                >
                  🔍 {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Found <strong className="text-brand-black">{filtered.length}</strong> results for &quot;<span className="text-gold-600 font-semibold">{query}</span>&quot;
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-card">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-1">No matches found</h3>
                <p className="text-xs text-gray-500 mb-6">Try searching for broader terms or check out our full product listing.</p>
                <Link href="/products" className="btn-primary text-xs px-6 py-2.5">
                  View All Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map(p => (
                  <Link key={p.id} href={`/products/${p.slug}`} className="product-card group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex flex-col items-center justify-center p-4">
                      <Sparkles className="w-12 h-12 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                      <span className="text-xs text-gray-400">View Product</span>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">{p.category}</p>
                      <h3 className="text-sm font-semibold text-brand-black line-clamp-1 group-hover:text-gold-600 transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-brand-black">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
