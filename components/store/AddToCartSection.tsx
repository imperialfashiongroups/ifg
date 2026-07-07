'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Share2, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useUIStore } from '@/lib/store/ui';
import { getEffectivePrice, cn } from '@/lib/utils';

interface AddToCartSectionProps {
  product: any;
  colors: string[];
  sizes: string[];
}

export default function AddToCartSection({ product, colors, sizes }: AddToCartSectionProps) {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addItem, openCart } = { ...useCartStore(), ...useUIStore() };
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { openCart: openCartFn } = useUIStore();

  const effectivePrice = getEffectivePrice(product.mrp, product.discount_pct);

  // Find selected variant
  const selectedVariant = product.product_variants?.find(
    (v: any) => v.color === selectedColor && v.size === selectedSize
  );
  const inStock = selectedVariant ? selectedVariant.stock_qty > 0 : true;
  const wishlisted = mounted ? isWishlisted(product.id) : false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const { addItem: add } = useCartStore.getState();
    add({
      id: selectedVariant?.id || product.id,
      product_id: product.id,
      variant_id: selectedVariant?.id,
      name: product.name,
      variant_name: `${selectedColor} / ${selectedSize}`,
      image_url: product.product_images?.[0]?.url || '/placeholder/product.jpg',
      price: effectivePrice,
      mrp: product.mrp,
      gst_rate: product.gst_rate,
      quantity,
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    openCartFn();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-5">
      {/* Color Selection */}
      {(colors.length > 1 || (colors.length === 1 && colors[0] !== 'Default')) && (
        <div>
          <p className="text-sm font-medium text-brand-black mb-2.5">
            Colour: <span className="text-gray-600">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((color: string) => {
              const variant = product.product_variants?.find((v: any) => v.color === color);
              const hex = variant?.color_hex || '#888';
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={cn(
                    'w-9 h-9 rounded-full border-2 transition-all duration-200',
                    selectedColor === color
                      ? 'border-gold-400 scale-110 shadow-gold'
                      : 'border-gray-200 hover:border-gray-400'
                  )}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-brand-black mb-2.5">
            Size: {selectedSize && <span className="text-gray-600">{selectedSize}</span>}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size: string) => {
              const variant = product.product_variants?.find(
                (v: any) => v.size === size && v.color === selectedColor
              );
              const outOfStock = variant && variant.stock_qty === 0;
              return (
                <button
                  key={size}
                  onClick={() => !outOfStock && setSelectedSize(size)}
                  disabled={outOfStock}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200',
                    selectedSize === size
                      ? 'bg-brand-black text-white border-brand-black'
                      : outOfStock
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                      : 'border-gray-200 text-brand-black hover:border-gold-400 hover:text-gold-500'
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-brand-black">Qty:</p>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 text-brand-black hover:bg-gray-50 transition-colors text-lg font-medium"
          >−</button>
          <span className="px-4 py-2 text-sm font-semibold min-w-[2rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(q => Math.min(10, q + 1))}
            className="px-4 py-2 text-brand-black hover:bg-gray-50 transition-colors text-lg font-medium"
          >+</button>
        </div>
        {selectedVariant && (
          <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-500'}`}>
            {inStock ? `${selectedVariant.stock_qty} in stock` : 'Out of stock'}
          </span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={cn(
            'flex-1 btn-primary py-4 text-base justify-center relative overflow-hidden',
            added && 'bg-green-500 hover:bg-green-500'
          )}
          id="add-to-cart-btn"
        >
          {added ? (
            <><Check className="w-5 h-5" /> Added!</>
          ) : (
            <><ShoppingBag className="w-5 h-5" /> Add to Bag</>
          )}
        </button>

        <button
          onClick={() => toggleItem(product)}
          className={cn(
            'p-4 rounded-lg border-2 transition-all duration-200',
            wishlisted
              ? 'border-red-400 bg-red-50 text-red-500'
              : 'border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-400'
          )}
          aria-label="Add to wishlist"
          id="wishlist-btn"
        >
          <Heart className={cn('w-5 h-5', wishlisted && 'fill-red-500')} />
        </button>

        <button
          onClick={handleShare}
          className="p-4 rounded-lg border-2 border-gray-200 text-gray-500 hover:border-gold-400 hover:text-gold-500 transition-all duration-200"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
