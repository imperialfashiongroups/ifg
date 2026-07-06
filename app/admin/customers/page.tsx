'use client';

import { useState } from 'react';
import { Users, Search, Mail, Phone, ShoppingBag, Shield } from 'lucide-react';
import { formatINR } from '@/lib/utils';

const MOCK_CUSTOMERS = [
  { id: 'CUST-001', name: 'Aarav Sharma',     email: 'aarav.sharma@gmail.com',  phone: '+91 98765 43210', orders: 12, spent: 34500, status: 'VIP',    date: '14 Jan 2024' },
  { id: 'CUST-002', name: 'Priya Patel',      email: 'priya.p@yahoo.com',       phone: '+91 98123 45678', orders: 5,  spent: 12999, status: 'Active', date: '02 Feb 2024' },
  { id: 'CUST-003', name: 'Rohan Deshmukh',   email: 'rohan.d@outlook.com',     phone: '+91 97654 32109', orders: 8,  spent: 24150, status: 'Active', date: '19 Mar 2024' },
  { id: 'CUST-004', name: 'Ananya Iyer',      email: 'ananya.iyer@gmail.com',   phone: '+91 99887 76655', orders: 15, spent: 48900, status: 'VIP',    date: '11 Nov 2023' },
  { id: 'CUST-005', name: 'Vikram Singh',     email: 'vikram.singh@gmail.com',  phone: '+91 91234 56789', orders: 2,  spent: 4599,  status: 'New',    date: '05 May 2024' },
  { id: 'CUST-006', name: 'Neleakshi Reddy',  email: 'neleakshi.r@gmail.com',   phone: '+91 94567 89012', orders: 7,  spent: 19800, status: 'Active', date: '22 Apr 2024' },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-gold-500" /> Customer Directory
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage registered users and VIP clientele</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-gold-500" /> {MOCK_CUSTOMERS.length} Total Registered
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search customers by name, email, or Indian phone number..."
          className="w-full text-sm focus:outline-none bg-transparent"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-gray-400 hover:text-gray-600 font-semibold">
            Clear
          </button>
        )}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Orders</th>
                <th className="py-4 px-6">Total Spent</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-black text-gold-400 font-bold text-xs flex items-center justify-center">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-600 space-y-1">
                    <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {c.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {c.phone}</p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-lg text-xs">
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-500" /> {c.orders}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-800">
                    {formatINR(c.spent)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      c.status === 'VIP' ? 'bg-gold-100 text-gold-700 border border-gold-300' :
                      c.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {c.status === 'VIP' ? '👑 VIP' : c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500">
                    {c.date}
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
