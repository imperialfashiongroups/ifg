'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, CheckCircle, Clock, AlertCircle, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatINR } from '@/lib/utils';

const MOCK_RETURNS = [
  {
    id: 'RET-2024-089',
    orderId: 'ORD-2024-001',
    date: '14 May 2024',
    status: 'approved',
    refundAmount: 2999,
    reason: 'Size issue / Fit too tight',
    item: {
      name: 'Embroidered Lehenga Choli',
      size: 'M',
      color: 'Ruby Red',
      price: 2999,
    },
    timeline: [
      { status: 'Return Requested', date: '14 May 2024', done: true },
      { status: 'Pickup Scheduled', date: '15 May 2024', done: true },
      { status: 'Quality Check & Approved', date: '17 May 2024', done: true },
      { status: 'Refund Initiated (3-5 days)', date: '18 May 2024', done: true },
    ],
  },
];

export default function CustomerReturnsPage() {
  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <nav className="text-xs text-gray-400 mb-2 flex gap-2">
              <Link href="/account" className="hover:text-gold-600">My Account</Link>
              <span>/</span>
              <span className="text-brand-black">Returns & Refunds</span>
            </nav>
            <h1 className="font-serif text-3xl font-bold text-brand-black flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-gold-500" />
              My Returns
            </h1>
            <p className="text-xs text-gray-500 mt-1">Track return pickups and refund statuses</p>
          </div>
          <Link href="/account/orders" className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5">
            + Request New Return
          </Link>
        </div>

        {/* Policy Banner */}
        <div className="bg-gold-50 border border-gold-200 rounded-3xl p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-gold-500 shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700 space-y-1">
            <h4 className="font-bold text-brand-black text-base">Imperial Fashion Groups Return Promise</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We offer a hassle-free <strong>7-day return window</strong> from the date of delivery. Items must be unused, unwashed, and with original brand tags attached. Refunds are processed to the original payment source within <strong>3–5 business days</strong> after our Raipur Quality Check team inspects the return.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gold-700">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Free Pickup Across India</span>
              <span>•</span>
              <span>GSTIN: 22ASVPC0275C1Z4</span>
            </div>
          </div>
        </div>

        {/* Returns List */}
        <div className="space-y-6">
          {MOCK_RETURNS.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-12 text-center space-y-4">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-brand-black">No Return Requests Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">You have not initiated any returns yet. If you need to return an order, select an eligible order from your Order History.</p>
              <Link href="/account/orders" className="btn-secondary text-xs px-6 py-3 inline-block">
                View Order History
              </Link>
            </div>
          ) : (
            MOCK_RETURNS.map(ret => (
              <div key={ret.id} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
                <div className="bg-gray-50/80 p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <span className="text-gray-400 block">Return ID</span>
                      <strong className="font-mono text-brand-black">{ret.id}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Original Order</span>
                      <Link href={`/account/orders/${ret.orderId}`} className="font-mono text-gold-600 hover:underline font-bold">
                        {ret.orderId}
                      </Link>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Refund Amount</span>
                      <strong className="text-green-600 font-bold text-sm">{formatINR(ret.refundAmount)}</strong>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] bg-green-100 text-green-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Approved & Refunded
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Item Summary */}
                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gold-400 font-serif font-bold text-sm shrink-0">
                        IFG
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black text-base">{ret.item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Size: {ret.item.size} · Color: {ret.item.color}</p>
                        <p className="text-xs text-rose-600 font-medium mt-1">Reason: {ret.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-brand-black text-base block">{formatINR(ret.item.price)}</span>
                      <span className="text-[11px] text-gray-400">Original Price Paid</span>
                    </div>
                  </div>

                  {/* Return Progress Bar */}
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Refund Status Tracking</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {ret.timeline.map((step, idx) => (
                        <div key={idx} className="relative bg-gray-50 p-3 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-1.5 mb-1 text-gold-600">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            <span className="text-xs font-bold text-brand-black line-clamp-1">{step.status}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 block">{step.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
