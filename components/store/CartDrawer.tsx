'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import { formatINR, cn } from '@/lib/utils';

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, subtotal, discountAmount, total, coupon } = useCartStore();
  const shipping = subtotal() > 499 ? 0 : 49;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h2 className="font-serif text-xl font-bold text-brand-black">Shopping Bag</h2>
                {items.length > 0 && (
                  <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-medium">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gold-300" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-black mb-2">Your bag is empty</h3>
                  <p className="text-gray-500 text-sm mb-6">Add some items to get started</p>
                  <button onClick={closeCart} className="btn-primary">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        <Image
                          src={item.image_url || '/placeholder/product.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-brand-black hover:text-gold-500 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.variant_name && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.variant_name}</p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-sm font-bold text-brand-black">
                              {formatINR(item.price)}
                            </span>
                            {item.mrp > item.price && (
                              <span className="text-xs text-gray-400 line-through ml-1.5">
                                {formatINR(item.mrp)}
                              </span>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gold-400 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gold-400 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-start"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary & CTA */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 pt-4 pb-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal())}</span>
                  </div>
                  {discountAmount() > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount {coupon?.code && `(${coupon.code})`}</span>
                      <span>-{formatINR(discountAmount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'FREE' : formatINR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-black pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-gold-500">{formatINR(total())}</span>
                  </div>
                </div>

                {subtotal() < 499 && (
                  <p className="text-xs text-center text-gray-500 mb-3">
                    Add {formatINR(499 - subtotal())} more for free shipping 🚚
                  </p>
                )}

                <Link href="/checkout" onClick={closeCart}>
                  <button className="btn-primary w-full justify-between text-base py-4">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link href="/cart" onClick={closeCart}>
                  <button className="btn-ghost w-full mt-2 text-sm text-gray-500">
                    View Full Cart
                  </button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
