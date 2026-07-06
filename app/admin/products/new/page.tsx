'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, CheckCircle, Upload, Sparkles } from 'lucide-react';

const CATEGORIES = ['Women Ethnic', 'Women Western', 'Men', 'Kids', 'Footwear', 'Accessories', 'Home & Living'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function AdminNewProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Women Ethnic');
  const [mrp, setMrp] = useState('3999');
  const [discount, setDiscount] = useState('25');
  const [stock, setStock] = useState('45');
  const [badge, setBadge] = useState('NEW');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [submitted, setSubmitted] = useState(false);

  const toggleSize = (s: string) => {
    if (selectedSizes.includes(s)) setSelectedSizes(selectedSizes.filter(x => x !== s));
    else setSelectedSizes([...selectedSizes, s]);
  };

  const sellingPrice = Math.round(Number(mrp || 0) * (1 - Number(discount || 0) / 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/admin/products');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product to Catalog</h1>
          <p className="text-sm text-gray-500">Create a new fashion listing for store inventory</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Listed Successfully!</h2>
          <p className="text-sm text-gray-500">Adding to database and redirecting to inventory...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          {/* General Info */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">1. Product Information</h2>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Product Title</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Embroidered Zari Lehenga Choli"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Promotional Badge</label>
                <select
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
                >
                  <option value="">None (Standard)</option>
                  <option value="NEW">NEW</option>
                  <option value="BESTSELLER">BESTSELLER</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4 pt-4">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">2. Pricing & Inventory</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Maximum Retail Price (MRP ₹)</label>
                <input
                  type="number"
                  required
                  value={mrp}
                  onChange={e => setMrp(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Discount (%)</label>
                <input
                  type="number"
                  required
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Selling Price (₹)</label>
                <div className="w-full bg-gold-50 border border-gold-300 rounded-xl px-4 py-3 font-bold text-brand-black">
                  ₹{sellingPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Total Stock Quantity</label>
              <input
                type="number"
                required
                value={stock}
                onChange={e => setStock(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4 pt-4">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">3. Available Sizes</h2>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedSizes.includes(s)
                      ? 'bg-brand-black text-gold-400 border-brand-black shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gold-400'
                  }`}
                >
                  {s} {selectedSizes.includes(s) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4 pt-4">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">4. Product Media</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gold-50/30 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gold-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 text-sm">Drag & drop high-resolution product images here</p>
              <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, WEBP up to 10MB (Connected to Supabase Storage)</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/products" className="btn-secondary text-xs px-6 py-3">
              Cancel
            </Link>
            <button type="submit" className="btn-primary text-xs px-10 py-3 shadow-gold font-bold">
              Publish Product to Store
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
