'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getEffectivePrice } from '@/lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setLoading(false);
      return;
    }
    
    const timeout = setTimeout(async () => {
      setLoading(true);
      
      // Perform case-insensitive search across name and description
      const { data } = await supabase
        .from('products')
        .select('*, categories(name), product_images(url)')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_active', true)
        .limit(24);
      
      setFiltered(data || []);
      setLoading(false);
    }, 400); // 400ms debounce
    
    return () => clearTimeout(timeout);
  }, [query, supabase]);

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
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Found <strong className="text-brand-black">{filtered.length}</strong> results for &quot;<span className="text-gold-600 font-semibold">{query}</span>&quot;
              </p>
              {loading && <Loader2 className="w-5 h-5 text-gold-500 animate-spin" />}
            </div>

            {!loading && filtered.length === 0 ? (
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
                {filtered.map(p => {
                  const price = getEffectivePrice(p.mrp, p.discount_pct);
                  const primaryImage = p.product_images?.[0]?.url || '';
                  
                  return (
                    <Link key={p.id} href={`/products/${p.slug}`} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col justify-between group">
                      <div>
                        <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden flex flex-col items-center justify-center p-4 block">
                          {primaryImage ? (
                             <img src={primaryImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                             <>
                               <Sparkles className="w-14 h-14 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                               <span className="text-xs text-gray-400 font-medium">No Image</span>
                             </>
                          )}
                          {p.discount_pct && p.discount_pct > 0 ? (
                            <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {p.discount_pct}% OFF
                            </span>
                          ) : null}
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                            {p.categories?.name || 'Uncategorized'}
                          </p>
                          <h3 className="text-sm font-semibold text-brand-black line-clamp-1 group-hover:text-gold-600 transition-colors">{p.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-brand-black text-base">₹{price.toLocaleString('en-IN')}</span>
                            {p.discount_pct && p.discount_pct > 0 && (
                               <span className="text-xs text-gray-400 line-through">₹{p.mrp?.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
