'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, ArrowLeft, CheckCircle, Truck, MapPin, Mail, Phone, Clock, ShieldCheck } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function AdminOrderDetailsPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('processing');
  const [saved, setSaved] = useState(false);

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-brand-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Order Details: <span className="font-mono text-gold-600">#{params.id}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Placed on 14 Jan 2025 · Paid via Razorpay UPI</p>
          </div>
        </div>

        {saved && (
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-4 h-4" /> Order Status Updated!
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Items & Timeline */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
            <h2 className="font-bold text-gray-800 text-base pb-3 border-b border-gray-100">Order Items (2)</h2>
            
            <div className="space-y-4">
              {[
                { name: 'Embroidered Lehenga Choli', size: 'M', color: 'Red', price: 2999, qty: 1 },
                { name: 'Silk Dupatta',              size: 'Free', color: 'Gold', price: 499, qty: 1 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Size: <strong className="text-gray-700">{item.size}</strong> · Color: <strong className="text-gray-700">{item.color}</strong> · Qty: <strong className="text-gray-700">{item.qty}</strong></p>
                  </div>
                  <span className="font-bold text-gray-800">{formatINR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹3,498</span></div>
              <div className="flex justify-between text-gray-600"><span>GST (5%)</span><span>₹175</span></div>
              <div className="flex justify-between text-green-600 font-semibold"><span>Shipping</span><span>FREE</span></div>
              <div className="flex justify-between font-bold text-lg text-brand-black pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-gold-600">₹3,673</span>
              </div>
            </div>
          </div>

          {/* Fulfillment Status Updater */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
            <h2 className="font-bold text-gray-800 text-base pb-2 flex items-center justify-between">
              <span>Update Fulfillment Status</span>
              <span className="text-xs font-normal text-gray-400">Triggers Resend email update</span>
            </h2>
            
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'pending',    label: '1. Pending',    color: 'bg-amber-100 text-amber-800 border-amber-300' },
                { id: 'processing', label: '2. Processing', color: 'bg-blue-100 text-blue-800 border-blue-300' },
                { id: 'shipped',    label: '3. Shipped',    color: 'bg-purple-100 text-purple-800 border-purple-300' },
                { id: 'delivered',  label: '4. Delivered',  color: 'bg-green-100 text-green-800 border-green-300' },
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => handleStatusUpdate(st.id)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                    status === st.id ? `${st.color} ring-2 ring-gold-400 ring-offset-2` : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
            <h2 className="font-bold text-gray-800 text-base pb-3 border-b border-gray-100">Customer Details</h2>
            <div className="space-y-3 text-xs text-gray-600">
              <p className="font-bold text-gray-800 text-sm">Aarav Sharma</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400 shrink-0" /> aarav.sharma@gmail.com</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400 shrink-0" /> +91 98765 43210</p>
            </div>

            <h3 className="font-bold text-gray-800 text-sm pt-4 border-t border-gray-100">Shipping Address</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Flat 402, Royal Towers, MG Road, Telibandha, Raipur, Chhattisgarh - 492001 (India)
            </p>
          </div>

          <div className="bg-brand-black text-white p-6 rounded-3xl space-y-3 shadow-card">
            <h3 className="font-bold text-gold-400 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Payment Verification
            </h3>
            <p className="text-xs text-gray-300">Transaction verified via Razorpay Live Gateway.</p>
            <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 font-mono space-y-1">
              <p>PAY_ID: pay_Ok9283748239</p>
              <p>METHOD: UPI / GPay</p>
              <p>STATUS: SUCCESS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
