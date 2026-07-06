import Link from 'next/link';
import { Eye, Edit, Truck } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending:          'bg-yellow-100 text-yellow-700',
  confirmed:        'bg-blue-100 text-blue-700',
  processing:       'bg-purple-100 text-purple-700',
  shipped:          'bg-cyan-100 text-cyan-700',
  out_for_delivery: 'bg-teal-100 text-teal-700',
  delivered:        'bg-green-100 text-green-700',
  cancelled:        'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
  refunded:         'bg-gray-100 text-gray-700',
};

const MOCK_ORDERS = [
  { id: 'IFG-A1B2', customer: 'Priya Sharma',  amount: 3999, status: 'delivered',  method: 'razorpay', city: 'Raipur',    date: '2025-06-20' },
  { id: 'IFG-C3D4', customer: 'Rahul Gupta',   amount: 5499, status: 'processing', method: 'razorpay', city: 'Hyderabad', date: '2025-07-01' },
  { id: 'IFG-E5F6', customer: 'Anita Patel',   amount: 1299, status: 'shipped',    method: 'cod',      city: 'Bengaluru', date: '2025-06-28' },
  { id: 'IFG-G7H8', customer: 'Suresh Reddy',  amount: 2199, status: 'confirmed',  method: 'cod',      city: 'Raipur',    date: '2025-07-03' },
  { id: 'IFG-I9J0', customer: 'Meena Joshi',   amount: 4599, status: 'pending',    method: 'razorpay', city: 'Mumbai',    date: '2025-07-05' },
];

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_ORDERS.length} total orders</p>
        </div>
        {/* Filter row */}
        <div className="flex gap-2">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(f => (
            <button key={f} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${f === 'All' ? 'bg-brand-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order #</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_ORDERS.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="font-mono text-xs text-gold-600 font-bold">{order.id}</span>
                </td>
                <td className="px-5 py-4 font-medium text-gray-900">{order.customer}</td>
                <td className="px-5 py-4 text-gray-500">{order.city}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase ${order.method === 'cod' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {order.method}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">{order.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/orders/${order.id}`} className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-amber-500 transition-colors" title="Update Status">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-teal-500 transition-colors" title="Add Tracking">
                      <Truck className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
