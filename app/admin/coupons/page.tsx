'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ticket, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';

const INITIAL_COUPONS = [
  { id: '1', code: 'ATTITUDE25', discount: 25, type: 'percentage', minSpend: 1499, expiry: '31 Dec 2025', status: 'active',   uses: 142 },
  { id: '2', code: 'WELCOME10',  discount: 10, type: 'percentage', minSpend: 499,  expiry: '31 Dec 2025', status: 'active',   uses: 580 },
  { id: '3', code: 'FESTIVE500', discount: 500,type: 'fixed',      minSpend: 3999, expiry: '15 Nov 2024', status: 'expired',  uses: 89 },
  { id: '4', code: 'RAIPUR20',   discount: 20, type: 'percentage', minSpend: 999,  expiry: '30 Jun 2025', status: 'active',   uses: 34 },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  const deleteCoupon = (id: string) => {
    if (confirm('Are you sure you want to delete this promotional coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-gold-500" /> Discount Coupons & Offers
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage promotional codes and checkout discounts</p>
        </div>
        <Link href="/admin/coupons/new" className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5 shadow-gold">
          <Plus className="w-4 h-4" /> Create New Coupon
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Coupon Code</th>
                <th className="py-4 px-6">Discount Value</th>
                <th className="py-4 px-6">Min Purchase</th>
                <th className="py-4 px-6">Expiry Date</th>
                <th className="py-4 px-6">Total Uses</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {coupons.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-brand-black bg-gold-50 border border-gold-200 px-3 py-1 rounded-lg text-xs">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-800">
                    {c.type === 'percentage' ? `${c.discount}% OFF` : `₹${c.discount} Flat OFF`}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-600">
                    ₹{c.minSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500 flex items-center gap-1 mt-3">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> {c.expiry}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-700">
                    {c.uses} times
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                      c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {c.status === 'active' ? <CheckCircle className="w-3 h-3" /> : null}
                      {c.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
