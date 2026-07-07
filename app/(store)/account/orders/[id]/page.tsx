'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Download, RefreshCw, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function CustomerOrderDetailPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ORD-2024-001';

  // Mock order details
  const order = {
    id: orderId,
    orderNumber: `IFG-${orderId.replace(/[^0-9A-Z]/g, '').slice(-4) || '8821'}`,
    date: '12 May 2024, 02:30 PM',
    status: 'delivered',
    paymentMethod: 'Razorpay Online',
    paymentId: 'pay_Nj3892kL0928aB',
    shippingAddress: {
      name: 'Priyanshu Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Royal Heritage Apartments',
      addressLine2: 'VIP Road, Telibandha',
      city: 'Raipur',
      state: 'Chhattisgarh',
      pincode: '492001',
    },
    items: [
      {
        id: 'item-1',
        name: 'Embroidered Lehenga Choli',
        size: 'M',
        color: 'Ruby Red',
        price: 2999,
        mrp: 3999,
        quantity: 1,
        slug: 'embroidered-lehenga-choli',
      },
      {
        id: 'item-2',
        name: 'Designer Silk Dupatta',
        size: 'Free Size',
        color: 'Gold',
        price: 1000,
        mrp: 1499,
        quantity: 1,
        slug: 'designer-silk-saree',
      },
    ],
    summary: {
      subtotal: 3999,
      gst: 480,
      shipping: 0,
      discount: 480,
      total: 3999,
    },
    timeline: [
      { status: 'Order Confirmed', date: '12 May 2024, 02:30 PM', completed: true, desc: 'Your order has been verified and confirmed.' },
      { status: 'Processing & Packed', date: '13 May 2024, 11:15 AM', completed: true, desc: 'Packed at Imperial Fashion Groups Raipur Hub.' },
      { status: 'Shipped via BlueDart', date: '14 May 2024, 04:20 PM', completed: true, desc: 'Tracking AWB: BD992837162IN.' },
      { status: 'Delivered', date: '16 May 2024, 01:10 PM', completed: true, desc: 'Delivered to Priyanshu Sharma.' },
    ],
  };

  const handleDownloadInvoice = () => {
    alert(`Downloading Tax Invoice for Order #${order.orderNumber} (GST: 22ASVPC0275C1Z4)...`);
  };

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-5xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6">
          <Link href="/account/orders" className="text-xs font-semibold text-gray-500 hover:text-gold-600 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Order History
          </Link>
        </div>

        {/* Order Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-8 mb-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-gold-100 text-gold-700 font-bold text-xs rounded-full uppercase tracking-wider">
                Order #{order.orderNumber}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Delivered
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">
              Order Details
            </h1>
            <p className="text-xs text-gray-400 mt-1">Placed on {order.date} · Order ID: <span className="font-mono">{order.id}</span></p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="btn-secondary text-xs px-5 py-3 flex items-center gap-2 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 text-gold-500" /> Download GST Invoice
            </button>
            <Link
              href={`/account/returns/new?order_id=${order.id}`}
              className="btn-primary text-xs px-5 py-3 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Request Return
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline & Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Status Timeline */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-brand-black mb-6 flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-gold-500" /> Delivery Tracking
              </h2>

              <div className="relative pl-6 border-l-2 border-gold-200 space-y-8 ml-2">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                      step.completed ? 'bg-gold-500 shadow-gold' : 'bg-gray-300'
                    }`} />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className={`font-semibold text-sm ${step.completed ? 'text-brand-black' : 'text-gray-400'}`}>
                        {step.status}
                      </h4>
                      <span className="text-[11px] text-gray-400 font-medium">{step.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-brand-black mb-6 flex items-center gap-2.5">
                <Package className="w-5 h-5 text-gold-500" /> Items in Order ({order.items.length})
              </h2>

              <div className="divide-y divide-gray-100">
                {order.items.map(item => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gold-400 font-serif font-bold text-lg shrink-0">
                        IFG
                      </div>
                      <div>
                        <Link href={`/products/${item.slug}`} className="font-semibold text-brand-black hover:text-gold-600 text-sm md:text-base transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: <strong className="text-brand-black">{item.size}</strong> · Color: <strong className="text-brand-black">{item.color}</strong>
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-brand-black text-base block">{formatINR(item.price * item.quantity)}</span>
                      <span className="text-xs text-gray-400 line-through">{formatINR(item.mrp * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Shipping & Summary */}
          <div className="space-y-8">
            {/* Price Summary */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-8">
              <h3 className="font-serif text-lg font-bold text-brand-black mb-6">Payment Summary</h3>

              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>{formatINR(order.summary.subtotal + order.summary.discount)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatINR(order.summary.discount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated GST (12%)</span>
                  <span>{formatINR(order.summary.gst)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline font-bold text-brand-black text-lg mb-6">
                <span>Total Paid</span>
                <span className="text-gold-600 text-xl">{formatINR(order.summary.total)}</span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <CreditCard className="w-4 h-4 text-gold-500" />
                  <span>{order.paymentMethod}</span>
                </div>
                <p className="text-gray-400 font-mono text-[11px]">Transaction ID: {order.paymentId}</p>
                <div className="pt-2 border-t border-gray-200/60 flex items-center gap-1.5 text-green-700 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GSTIN: 22ASVPC0275C1Z4</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 md:p-8">
              <h3 className="font-serif text-lg font-bold text-brand-black mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" /> Shipping Address
              </h3>
              <div className="text-xs text-gray-600 space-y-1.5 leading-relaxed">
                <p className="font-bold text-brand-black text-sm">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                <p>{order.shippingAddress.addressLine2}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p className="pt-2 text-gray-500 font-medium">Phone: <span className="text-brand-black">{order.shippingAddress.phone}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
