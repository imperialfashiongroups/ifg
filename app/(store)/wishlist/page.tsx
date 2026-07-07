'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { getEffectivePrice } from '@/lib/utils';

export default function WishlistPage() {
  const addItem = useCartStore(s => s.addItem);
  const { items, removeItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

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
            {items.length} Items Saved
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-card">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-gray-800 mb-1">Your wishlist is empty</h3>
            <p className="text-xs text-gray-500 mb-6">Save your favorite items here to review them later.</p>
            <Link href="/products" className="btn-primary text-xs px-6 py-2.5">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ product }) => {
              const price = getEffectivePrice(product.mrp, product.discount_pct);
              const primaryImage = product.product_images?.[0]?.url || '';
              // Pick the first available variant to add to cart by default
              const variant = product.product_variants?.[0];

              return (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col justify-between group">
                  <div>
                    <Link href={`/products/${product.slug}`} className="aspect-[4/5] bg-gray-100 relative overflow-hidden flex flex-col items-center justify-center p-4 block">
                      {primaryImage ? (
                         <img src={primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                         <>
                           <Sparkles className="w-14 h-14 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                           <span className="text-xs text-gray-400 font-medium">No Image</span>
                         </>
                      )}
                      {product.discount_pct && product.discount_pct > 0 ? (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.discount_pct}% OFF
                        </span>
                      ) : null}
                    </Link>
                    <div className="p-4">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                        {product.categories?.name || 'Uncategorized'}
                      </p>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-sm font-semibold text-brand-black line-clamp-1 hover:text-gold-600 transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-brand-black text-base">₹{price.toLocaleString('en-IN')}</span>
                        {product.discount_pct && product.discount_pct > 0 && (
                           <span className="text-xs text-gray-400 line-through">₹{product.mrp?.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => {
                        if (!variant) return alert('This product is out of stock.');
                        addItem({
                          id: product.id,
                          product_id: product.id,
                          name: product.name,
                          image_url: primaryImage,
                          price: price,
                          mrp: product.mrp,
                          gst_rate: 12, // Default or fetch from product if available
                          size: variant.size ?? undefined,
                          color: variant.color ?? undefined,
                          quantity: 1,
                          slug: product.slug,
                        });
                      }}
                      className="btn-primary flex-1 py-2 text-xs justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
           <div className="mt-12 text-center">
             <Link href="/products" className="btn-secondary text-sm px-8 py-3.5 inline-flex items-center gap-2">
               Explore More Products <ArrowRight className="w-4 h-4" />
             </Link>
           </div>
        )}
      </div>
    </div>
  );
}
