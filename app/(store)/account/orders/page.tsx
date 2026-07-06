'use client';

import Link from 'next/link';
import { Package, ArrowRight, Clock, CheckCircle, Truck } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'ORD-2024-001',
    date: '12 May 2024',
    total: 3999,
    status: 'delivered',
    items: [{ name: 'Embroidered Lehenga Choli', size: 'M', color: 'Red', price: 3999, qty: 1 }],
  },
  {
    id: 'ORD-2024-002',
    date: '28 Apr 2024',
    total: 5499,
    status: 'shipped',
    items: [{ name: "Men's Premium Suit", size: 'L', color: 'Black', price: 5499, qty: 1 }],
  },
];

export default function AccountOrdersPage() {
  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <nav className="text-xs text-gray-400 mb-2 flex gap-2">
              <Link href="/account" className="hover:text-gold-600">My Account</Link>
              <span>/</span>
              <span className="text-brand-black">Orders</span>
            </nav>
            <h1 className="font-serif text-3xl font-bold text-brand-black flex items-center gap-3">
              <Package className="w-8 h-8 text-gold-500" />
              Order History
            </h1>
          </div>
          <Link href="/products" className="btn-secondary text-xs px-4 py-2">
            + Shop New Arrivals
          </Link>
        </div>

        <div className="space-y-6">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="bg-gray-50/80 p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex gap-6">
                  <div>
                    <span className="text-gray-400 block">Order ID</span>
                    <strong className="font-mono text-brand-black">{order.id}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Date Placed</span>
                    <strong className="text-brand-black">{order.date}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total Amount</span>
                    <strong className="text-brand-black">₹{order.total.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status === 'delivered' ? '✓ Delivered' : '🚚 Shipped'}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-brand-black text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} · Color: {item.color} · Qty: {item.qty}</p>
                    </div>
                    <Link href={`/account/orders/${order.id}`} className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1">
                      View Order Details →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
