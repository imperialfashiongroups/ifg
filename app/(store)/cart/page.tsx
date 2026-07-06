'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatINR } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, gstAmount, discountAmount, total, clearCart } = useCartStore();
  const sub = subtotal();
  const gst = gstAmount();
  const disc = discountAmount();
  const tot = total();
  const shipping = sub > 499 ? 0 : 49;

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-black flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-gold-500" />
              Shopping Bag
            </h1>
            <p className="text-xs text-gray-500 mt-1">Review your selected items before checkout</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-card max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center text-gold-500 mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">Your Shopping Bag is Empty</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
              Looks like you haven&apos;t added any attitude to your wardrobe yet. Explore our latest arrivals!
            </p>
            <Link href="/products" className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2">
              Browse Store Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-card flex gap-4 items-center">
                  <Link href={`/products/${item.slug}`} className="w-24 h-28 rounded-xl bg-gray-100 flex flex-col items-center justify-center shrink-0 text-gold-400">
                    <Sparkles className="w-8 h-8 mb-1" />
                    <span className="text-[10px] text-gray-400">View</span>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-semibold text-brand-black hover:text-gold-600 line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">Size: <strong className="text-brand-black">{item.size}</strong> · Color: <strong className="text-brand-black">{item.color}</strong></p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-sm font-bold text-gray-600 hover:bg-gray-200"
                        >-</button>
                        <span className="px-3 py-1 text-xs font-semibold text-brand-black bg-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-sm font-bold text-gray-600 hover:bg-gray-200"
                        >+</button>
                      </div>
                      <span className="font-bold text-brand-black text-base">{formatINR(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card sticky top-24 space-y-6">
              <h2 className="font-serif font-bold text-lg text-brand-black pb-3 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-brand-black">{formatINR(sub)}</span>
                </div>
                {disc > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatINR(disc)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Estimated GST (5%)</span>
                  <span className="font-semibold text-brand-black">{formatINR(gst)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-black">
                    {shipping === 0 ? <span className="text-green-600">FREE</span> : formatINR(shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-lg text-brand-black">
                  <span>Total Amount</span>
                  <span className="text-gold-600">{formatINR(tot + shipping)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full py-3.5 justify-center text-sm font-bold shadow-gold block text-center">
                Proceed to Checkout →
              </Link>

              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> 100% Secure Razorpay & COD Payments</p>
                <p className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-500 shrink-0" /> Free Delivery across India on orders above ₹499</p>
                <p className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-gold-500 shrink-0" /> 7-Day Hassle-Free Returns & Replacements</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
