import Link from 'next/link';
import { TrendingUp, ShoppingBag, Users, RefreshCw, Package, ArrowUpRight, Plus, Ticket } from 'lucide-react';

// Mock analytics data
const stats = {
  isRealData: false,
  totalRevenue: 245680,
  totalOrders: 342,
  totalProducts: 124,
  totalCustomers: 1284,
  pendingReturns: 14,
};

const RECENT_ORDERS = [
  { id: 'IFG-A1B2', customer: 'Priya Sharma',   amount: 3999,  status: 'delivered',  method: 'razorpay', time: '2h ago' },
  { id: 'IFG-C3D4', customer: 'Rahul Gupta',    amount: 5499,  status: 'processing', method: 'razorpay', time: '4h ago' },
  { id: 'IFG-E5F6', customer: 'Anita Patel',    amount: 1299,  status: 'shipped',    method: 'cod',      time: '6h ago' },
  { id: 'IFG-G7H8', customer: 'Suresh Reddy',   amount: 2199,  status: 'confirmed',  method: 'cod',      time: '8h ago' },
  { id: 'IFG-I9J0', customer: 'Meena Joshi',    amount: 4599,  status: 'pending',    method: 'razorpay', time: '10h ago' },
];

const TOP_PRODUCTS = [
  { name: 'Embroidered Lehenga Choli', category: 'Women Ethnic',  sold: 42, revenue: 167958 },
  { name: "Men's Premium Suit",         category: 'Men',            sold: 28, revenue: 153972 },
  { name: 'Floral Kurti Set',           category: 'Women Ethnic',  sold: 65, revenue: 84435 },
  { name: 'Kids Frock Party Wear',      category: 'Kids',           sold: 38, revenue: 30362 },
];

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-cyan-100 text-cyan-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Imperial Fashion Groups — Admin Overview</p>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>Founder: K. Chakravarthy</p>
          <p>GST: 22ASVPC0275C1Z4</p>
        </div>
      </div>

      {/* Mock Data Banner */}
      {!stats.isRealData && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
          <span>⚠️ Showing mock data. Connect Supabase database to see live store analytics.</span>
          <Link href="/admin/settings" className="font-semibold underline">Configure</Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Revenue',    val: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, sub: '+18% this month', color: 'text-green-600' },
          { label: 'Total Orders',     val: stats.totalOrders,    sub: '12 today',         color: 'text-blue-600' },
          { label: 'Total Products',   val: stats.totalProducts,  sub: '4 low stock',      color: 'text-purple-600' },
          { label: 'Active Customers', val: stats.totalCustomers, sub: '+8 this week',     color: 'text-amber-600' },
          { label: 'Pending Returns',  val: stats.pendingReturns, sub: 'Needs review',     color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-card">
            <p className="text-xs text-gray-400 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.val}</p>
            <p className={`text-xs mt-1 font-medium ${s.color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-800">Recent Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">Latest transactions across all cities</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-semibold text-gold-500 hover:text-gold-600">View All →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ORDERS.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50/50">
                    <td className="py-3 font-mono font-medium text-gray-800">{o.id}</td>
                    <td className="py-3 text-gray-700">{o.customer}</td>
                    <td className="py-3 uppercase text-xs font-semibold text-gray-500">{o.method}</td>
                    <td className="py-3 font-semibold text-gray-900">₹{o.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        o.status === 'delivered'  ? 'bg-green-100 text-green-700' :
                        o.status === 'shipped'    ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-gray-400">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800">Top Bestsellers</h2>
            <span className="text-xs text-gray-400">By revenue</span>
          </div>

          <div className="space-y-4">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category} · {p.sold} sold</p>
                </div>
                <p className="text-xs font-semibold text-gray-700 shrink-0">₹{Number(p.revenue).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Add New Product', href: '/admin/products/new', icon: Plus,      color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Manage Returns',  href: '/admin/returns',      icon: RefreshCw, color: 'bg-amber-600 hover:bg-amber-700' },
          { label: 'Create Coupon',   href: '/admin/coupons/new',  icon: Ticket,    color: 'bg-purple-600 hover:bg-purple-700' },
        ].map(({ label, href, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`${color} text-white rounded-2xl p-5 flex items-center gap-4 transition-all`}
          >
            <Icon className="w-6 h-6" />
            <span className="font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
