'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { RefreshCw, ArrowLeft, CheckCircle, AlertCircle, ShieldCheck, Package, Upload } from 'lucide-react';
import { formatINR } from '@/lib/utils';

function InitiateReturnForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams?.get('order_id') || 'ORD-2024-001';

  const [reason, setReason] = useState('size_issue');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock order item for return
  const item = {
    name: 'Embroidered Lehenga Choli',
    size: 'M',
    color: 'Ruby Red',
    price: 2999,
    orderNumber: `IFG-${orderId.replace(/[^0-9]/g, '').slice(-4) || '8821'}`,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/account/returns');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/account/orders" className="text-xs font-semibold text-gray-500 hover:text-gold-600 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-10">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <span className="px-3 py-1 bg-gold-100 text-gold-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3 inline-block">
              Order #{item.orderNumber}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-black flex items-center gap-3">
              <RefreshCw className="w-7 h-7 text-gold-500" /> Request a Return
            </h1>
            <p className="text-xs text-gray-400 mt-1">Select your return reason and pickup preferences</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-black">Return Request Submitted!</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                We have initiated a return request for Order <strong className="text-brand-black">#{item.orderNumber}</strong>. Our courier partner BlueDart will pick up the package within 24–48 hours.
              </p>
              <p className="text-xs text-gold-600 font-semibold">Redirecting to Returns Dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Item Card */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gold-400 font-serif font-bold text-sm shrink-0">
                    IFG
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-black text-sm md:text-base">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} · Color: {item.color}</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">✓ Eligible for 7-day return</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-brand-black text-base block">{formatINR(item.price)}</span>
                  <span className="text-[11px] text-gray-400">Refund Amount</span>
                </div>
              </div>

              {/* Return Reason */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-brand-black">Why are you returning this item?</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-gold-500 shadow-sm"
                >
                  <option value="size_issue">Size / Fit issue (Too tight or loose)</option>
                  <option value="color_mismatch">Color looks different from website</option>
                  <option value="quality_issue">Quality not up to expectations</option>
                  <option value="damaged">Received damaged / defective item</option>
                  <option value="wrong_item">Received wrong item / SKU</option>
                </select>
              </div>

              {/* Additional Comments */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-brand-black">Additional Comments (Optional)</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                  placeholder="Please provide any extra details to help our Raipur Quality Check team..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-brand-black focus:outline-none focus:border-gold-500 shadow-sm"
                />
              </div>

              {/* Pickup Info Banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-800">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Free Doorstep Pickup</strong>
                  <span>Our courier partner will collect the item from your registered delivery address. Please keep the product tags and original brand box intact.</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
                <Link href="/account/orders" className="btn-secondary text-xs px-6 py-3.5">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn-primary text-xs px-8 py-3.5 flex items-center gap-2 shadow-gold"
                >
                  <RefreshCw className="w-4 h-4" /> Confirm & Request Return
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InitiateReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-off-white flex flex-col items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading form...</p>
      </div>
    }>
      <InitiateReturnForm />
    </Suspense>
  );
}
