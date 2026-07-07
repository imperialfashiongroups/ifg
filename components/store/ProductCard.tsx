'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types/database';
import { formatINR, getEffectivePrice, formatDiscount, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { isWishlisted, toggleItem } = useWishlistStore();

  const primaryImage = product.product_images?.find(i => i.is_primary) || product.product_images?.[0];
  const imageUrl = primaryImage?.url || '/placeholder/product.jpg';
  const effectivePrice = getEffectivePrice(product.mrp, product.discount_pct);
  const discountPct = formatDiscount(product.mrp, effectivePrice);
  const wishlisted = isWishlisted(product.id);

  // Average rating from reviews
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      product_id: product.id,
      name: product.name,
      image_url: imageUrl,
      price: effectivePrice,
      mrp: product.mrp,
      gst_rate: product.gst_rate,
      quantity: 1,
      slug: product.slug,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link href={`/products/${product.slug}`} className={cn('product-card block', className)}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={primaryImage?.alt_text || product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new_arrival && (
            <span className="badge bg-brand-black text-white text-[10px] px-2 py-0.5">NEW</span>
          )}
          {product.is_bestseller && (
            <span className="badge bg-gold-400 text-brand-black text-[10px] px-2 py-0.5">BESTSELLER</span>
          )}
          {discountPct > 0 && (
            <span className="badge bg-green-500 text-white text-[10px] px-2 py-0.5">
              {discountPct}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400')}
          />
        </button>

        {/* Quick Add (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-brand-black text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gold-400 hover:text-brand-black transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {product.categories && (
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 truncate">
            {product.categories.name}
          </p>
        )}
        <h3 className="text-sm font-semibold text-brand-black line-clamp-2 leading-tight mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        {avgRating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span className="text-xs text-gray-600 font-medium">{avgRating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({product.reviews?.length})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-brand-black">{formatINR(effectivePrice)}</span>
          {discountPct > 0 && (
            <span className="text-xs text-gray-400 line-through">{formatINR(product.mrp)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
