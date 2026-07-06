'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User, Package, MapPin, Heart, LogOut, Settings, RefreshCw,
  ChevronRight, Clock, CheckCircle, Truck, AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatINR, getOrderStatusInfo, formatDate } from '@/lib/utils';

// Mock data — will come from Supabase
const MOCK_PROFILE = { full_name: 'Demo User', email: 'demo@example.com', phone: '9876543210', created_at: '2024-01-15' };
const MOCK_ORDERS = [
  { id: '1', order_number: 'IFG-A1B2C3D4', total_amount: 2999, status: 'delivered',  created_at: '2025-06-20', items: [{ product_name: 'Embroidered Lehenga Choli', quantity: 1 }] },
  { id: '2', order_number: 'IFG-E5F6G7H8', total_amount: 1299, status: 'shipped',    created_at: '2025-06-28', items: [{ product_name: 'Floral Kurti Set', quantity: 2 }] },
  { id: '3', order_number: 'IFG-I9J0K1L2', total_amount: 5499, status: 'processing', created_at: '2025-07-01', items: [{ product_name: "Men's Premium Suit", quantity: 1 }] },
];

type AccountTab = 'overview' | 'orders' | 'addresses' | 'profile' | 'returns';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const TABS = [
    { id: 'overview',   label: 'Overview',   icon: User },
    { id: 'orders',     label: 'My Orders',  icon: Package },
    { id: 'returns',    label: 'Returns',    icon: RefreshCw },
    { id: 'addresses',  label: 'Addresses',  icon: MapPin },
    { id: 'profile',    label: 'Profile',    icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-black py-10">
        <div className="section">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-2xl font-bold text-brand-black shadow-gold">
              {MOCK_PROFILE.full_name[0]}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">{MOCK_PROFILE.full_name}</h1>
              <p className="text-gray-400 text-sm">{MOCK_PROFILE.email}</p>
              <p className="text-gray-500 text-xs mt-1">Member since {new Date(MOCK_PROFILE.created_at).getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-white rounded-2xl shadow-card overflow-hidden">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all border-b border-gray-50 last:border-0 ${
                      activeTab === tab.id
                        ? 'bg-gold-50 text-gold-600 border-l-4 border-l-gold-400'
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                    }`}
                    id={`tab-${tab.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-all border-l-4 border-l-transparent"
                id="sign-out-btn"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Orders',   value: '3',  icon: Package,      color: 'bg-blue-50 text-blue-600' },
                    { label: 'Delivered',       value: '1',  icon: CheckCircle,  color: 'bg-green-50 text-green-600' },
                    { label: 'In Transit',      value: '1',  icon: Truck,        color: 'bg-amber-50 text-amber-600' },
                    { label: 'Total Spent',     value: '₹9.7K', icon: User,     color: 'bg-purple-50 text-purple-600' },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card text-center">
                        <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-xl font-bold text-brand-black">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-serif text-lg font-bold text-brand-black">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-xs text-gold-500 hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {MOCK_ORDERS.slice(0, 3).map(order => {
                      const statusInfo = getOrderStatusInfo(order.status);
                      return (
                        <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm shrink-0">📦</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-brand-black">{order.order_number}</p>
                            <p className="text-xs text-gray-500 truncate">{order.items[0]?.product_name}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-brand-black">{formatINR(order.total_amount)}</p>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-serif text-xl font-bold text-brand-black mb-5">My Orders</h2>
                <div className="space-y-4">
                  {MOCK_ORDERS.map(order => {
                    const statusInfo = getOrderStatusInfo(order.status);
                    return (
                      <div key={order.id} className="bg-white rounded-2xl shadow-card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <p className="font-semibold text-brand-black">{order.order_number}</p>
                            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {formatDate(order.created_at)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gold-500">{formatINR(order.total_amount)}</p>
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {order.items.map((item, i) => (
                            <p key={i}>{item.quantity}× {item.product_name}</p>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          <Link href={`/account/orders/${order.id}`} className="btn-secondary text-xs px-3 py-1.5">View Details</Link>
                          {order.status === 'delivered' && (
                            <button
                              onClick={() => setActiveTab('returns')}
                              className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
                            >
                              Request Return
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* RETURNS */}
            {activeTab === 'returns' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-serif text-xl font-bold text-brand-black mb-2">Returns & Refunds</h2>
                <p className="text-gray-500 text-sm mb-6">7-day return window | Refunds in 3–5 business days</p>

                {/* Return Policy Banner */}
                <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Return Policy</p>
                    <ul className="space-y-1 text-gray-600 text-xs">
                      <li>• Returns accepted within <strong>7 days</strong> of delivery</li>
                      <li>• Items must be unused and in original packaging</li>
                      <li>• Damaged/defective items get <strong>free replacement</strong></li>
                      <li>• Refunds processed in <strong>3–5 business days</strong></li>
                    </ul>
                  </div>
                </div>

                {/* Eligible for Return */}
                <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
                  <h3 className="font-semibold text-brand-black mb-4">Eligible for Return</h3>
                  {MOCK_ORDERS.filter(o => o.status === 'delivered').map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                      <div>
                        <p className="text-sm font-semibold text-brand-black">{order.order_number}</p>
                        <p className="text-xs text-gray-500">{order.items[0]?.product_name}</p>
                      </div>
                      <Link href={`/account/returns/new?order_id=${order.id}`} className="btn-secondary text-xs px-3 py-1.5">
                        Request Return
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h3 className="font-semibold text-brand-black mb-4">No Active Returns</h3>
                  <p className="text-sm text-gray-500">Your return requests will appear here.</p>
                </div>
              </motion.div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-serif text-xl font-bold text-brand-black mb-5">Profile Settings</h2>
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="form-label">Full Name</label>
                      <input className="form-input" defaultValue={MOCK_PROFILE.full_name} id="profile-name" />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input className="form-input" defaultValue={MOCK_PROFILE.email} disabled id="profile-email" />
                      <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
                    </div>
                    <div>
                      <label className="form-label">Mobile Number</label>
                      <div className="relative flex">
                        <span className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-sm text-gray-500">+91</span>
                        <input className="form-input rounded-l-none flex-1" defaultValue={MOCK_PROFILE.phone} maxLength={10} id="profile-phone" />
                      </div>
                    </div>
                    <button className="btn-primary py-3 px-6" id="save-profile-btn">Save Changes</button>
                  </form>
                </div>
              </motion.div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
