'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Ticket, ArrowLeft, CheckCircle } from 'lucide-react';

export default function AdminNewCouponPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('20');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [minSpend, setMinSpend] = useState('999');
  const [expiry, setExpiry] = useState('2025-12-31');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/admin/coupons');
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/coupons" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Promotional Coupon</h1>
          <p className="text-sm text-gray-500">Configure discount code rules for checkout</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coupon Created Successfully!</h2>
          <p className="text-sm text-gray-500">Redirecting to coupons dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Coupon Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="e.g., DIWALI30 or ATTITUDE20"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono font-bold text-brand-black uppercase focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Discount Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as 'percentage' | 'fixed')}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
              >
                <option value="percentage">Percentage (%) OFF</option>
                <option value="fixed">Flat Amount (₹) OFF</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Discount {type === 'percentage' ? 'Percentage (%)' : 'Amount (₹)'}
              </label>
              <input
                type="number"
                required
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                placeholder={type === 'percentage' ? '20' : '500'}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Minimum Order Value (₹)</label>
              <input
                type="number"
                required
                value={minSpend}
                onChange={e => setMinSpend(e.target.value)}
                placeholder="999"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Expiry Date</label>
              <input
                type="date"
                required
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/coupons" className="btn-secondary text-xs px-6 py-3">
              Cancel
            </Link>
            <button type="submit" className="btn-primary text-xs px-8 py-3 shadow-gold font-bold">
              Save Promotional Coupon
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
