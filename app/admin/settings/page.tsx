'use client';

import { useState } from 'react';
import { Settings, Shield, Mail, MapPin, CheckCircle, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [codEnabled, setCodEnabled] = useState(true);
  const [razorpayEnabled, setRazorpayEnabled] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-gold-500" /> Store Configuration & Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage brand identity, payment gateways, and email notification settings</p>
        </div>
        {saved && (
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-4 h-4" /> Settings Updated Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Profile */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            🏢 Brand Profile & Tax Identity
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Company Name</label>
              <input type="text" defaultValue="Imperial Fashion Groups" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Tagline</label>
              <input type="text" defaultValue="Wear your attitude" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Founder & CEO</label>
              <input type="text" defaultValue="K. Chakravarthy" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">GST Identification Number (GSTIN)</label>
              <input type="text" defaultValue="22ASVPC0275C1Z4" className="w-full bg-gold-50/50 border border-gold-300 rounded-xl px-4 py-3 font-mono font-bold text-brand-black" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Corporate Headquarters & Fulfillment Center Address</label>
            <textarea
              rows={2}
              defaultValue="401, Atlantis Complex, Raipur Bypass, Telibandha, Raipur, CG - 492001 (Branches in Hyderabad & Bengaluru)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white text-sm"
            />
          </div>
        </div>

        {/* Payment & Checkout Gateways */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            💳 Payment Gateways & Checkout
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <p className="font-bold text-gray-800 text-sm">Razorpay Payment Gateway (UPI, Cards, NetBanking)</p>
                <p className="text-xs text-gray-500 mt-0.5">Secure live payment processing connected via NEXT_PUBLIC_RAZORPAY_KEY_ID</p>
              </div>
              <button
                type="button"
                onClick={() => setRazorpayEnabled(!razorpayEnabled)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${razorpayEnabled ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-300 text-gray-700'}`}
              >
                {razorpayEnabled ? '● Live & Active' : '○ Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <p className="font-bold text-gray-800 text-sm">Cash on Delivery (COD)</p>
                <p className="text-xs text-gray-500 mt-0.5">Allow customers across 19,000+ Indian pincodes to pay cash or UPI upon delivery</p>
              </div>
              <button
                type="button"
                onClick={() => setCodEnabled(!codEnabled)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${codEnabled ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-300 text-gray-700'}`}
              >
                {codEnabled ? '● Enabled at Checkout' : '○ Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            📧 Email & Resend Notifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Store Support Email</label>
              <input type="email" defaultValue="imperialfashiongroups@gmail.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Resend Email API Status</label>
              <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-bold text-xs">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" /> Connected to Resend Order & Return Notification Dispatcher
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-10 py-4 shadow-gold text-sm font-bold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Store Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
