'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

const MOCK_WISHLIST = [
  { id: '1', name: 'Embroidered Lehenga Choli', category: 'Women Ethnic', price: 2999, mrp: 3999, discount: 25, slug: 'embroidered-lehenga-choli' },
  { id: '2', name: "Men's Premium Suit",        category: 'Men',          price: 4674, mrp: 5499, discount: 15, slug: 'mens-premium-suit' },
  { id: '5', name: 'Designer Silk Saree',       category: 'Women Ethnic', price: 4499, mrp: 4999, discount: 10, slug: 'designer-silk-saree' },
];

export default function WishlistPage() {
  const addItem = useCartStore(s => s.addItem);

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-black flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 mt-1">Saved styles from Imperial Fashion Groups</p>
          </div>
          <span className="text-xs font-semibold bg-white border border-gray-200 px-3 py-1.5 rounded-full text-brand-black">
            {MOCK_WISHLIST.length} Items Saved
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_WISHLIST.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col justify-between group">
              <div>
                <Link href={`/products/${item.slug}`} className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex flex-col items-center justify-center p-4 block">
                  <Sparkles className="w-14 h-14 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-xs text-gray-400 font-medium">Product Image</span>
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.discount}% OFF
                  </span>
                </Link>
                <div className="p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{item.category}</p>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-sm font-semibold text-brand-black line-clamp-1 hover:text-gold-600 transition-colors">{item.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-brand-black text-base">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.mrp.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => addItem({
                    id: item.id,
                    product_id: item.id,
                    name: item.name,
                    image_url: '',
                    price: item.price,
                    mrp: item.mrp,
                    gst_rate: 12,
                    size: 'M',
                    color: 'Default',
                    quantity: 1,
                    slug: item.slug,
                  })}
                  className="btn-primary flex-1 py-2 text-xs justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" /> Move to Cart
                </button>
                <button
                  onClick={() => alert('Removed from wishlist')}
                  className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="btn-secondary text-sm px-8 py-3.5 inline-flex items-center gap-2">
            Explore More Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
