import Link from 'next/link';
import type { Metadata } from 'next';
import { LayoutDashboard, ShoppingBag, Package, Users, RefreshCw, Ticket, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';   // Don't cache admin pages
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin — Imperial Fashion Groups',
  robots: { index: false },
};

const NAV = [
  { label: 'Dashboard',  href: '/admin',          icon: LayoutDashboard },
  { label: 'Products',   href: '/admin/products',  icon: ShoppingBag },
  { label: 'Orders',     href: '/admin/orders',    icon: Package },
  { label: 'Customers',  href: '/admin/customers', icon: Users },
  { label: 'Returns',    href: '/admin/returns',   icon: RefreshCw },
  { label: 'Coupons',    href: '/admin/coupons',   icon: Ticket },
  { label: 'Banners',    href: '/admin/banners',   icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-black text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <p className="text-gold-gradient font-display text-lg font-black tracking-widest">IMPERIAL</p>
          <p className="text-gray-500 text-[9px] tracking-[0.3em] mt-0.5">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-3.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon className="w-5 h-5 text-gold-400/80" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-white/10">
          <Link href="/" className="text-xs text-gray-500 hover:text-gold-400 transition-colors flex items-center gap-2">
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">● Live</span>
            <span className="text-xs text-gray-500">GST: 22ASVPC0275C1Z4</span>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
