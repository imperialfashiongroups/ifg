import Link from 'next/link';
import { Check, X, Eye } from 'lucide-react';

const MOCK_RETURNS = [
  { id: 'RET-001', order: 'IFG-A1B2', customer: 'Priya Sharma', reason: 'size_issue',    status: 'requested', amount: 3999, date: '2025-07-04' },
  { id: 'RET-002', order: 'IFG-C3D4', customer: 'Meena Joshi',  reason: 'defective',     status: 'approved',  amount: 1299, date: '2025-07-02' },
  { id: 'RET-003', order: 'IFG-E5F6', customer: 'Arjun Singh',  reason: 'wrong_item',    status: 'picked_up', amount: 5499, date: '2025-06-30' },
  { id: 'RET-004', order: 'IFG-G7H8', customer: 'Sunita Rao',   reason: 'changed_mind',  status: 'refunded',  amount: 999,  date: '2025-06-25' },
];

const REASON_LABELS: Record<string, string> = {
  defective:         '🔴 Defective',
  wrong_item:        '🟠 Wrong Item',
  size_issue:        '📏 Size Issue',
  not_as_described:  '❌ Not as Described',
  changed_mind:      '💭 Changed Mind',
  other:             '📋 Other',
};

const STATUS_COLORS: Record<string, string> = {
  requested:       'bg-yellow-100 text-yellow-700',
  approved:        'bg-blue-100 text-blue-700',
  rejected:        'bg-red-100 text-red-700',
  picked_up:       'bg-purple-100 text-purple-700',
  received:        'bg-cyan-100 text-cyan-700',
  refund_initiated:'bg-teal-100 text-teal-700',
  refunded:        'bg-green-100 text-green-700',
};

export default function AdminReturnsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Return Requests</h1>
        <p className="text-gray-500 text-sm mt-1">{MOCK_RETURNS.length} return requests</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending Review', value: '1', color: 'border-yellow-400' },
          { label: 'Approved',       value: '1', color: 'border-blue-400' },
          { label: 'In Transit',     value: '1', color: 'border-purple-400' },
          { label: 'Refunded',       value: '1', color: 'border-green-400' },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-xl p-4 border-l-4 ${s.color} shadow-card`}>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Return ID</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Order</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Reason</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_RETURNS.map(ret => (
              <tr key={ret.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-gold-600 font-bold">{ret.id}</td>
                <td className="px-5 py-4 font-mono text-xs text-gray-600">{ret.order}</td>
                <td className="px-5 py-4 text-gray-900 font-medium">{ret.customer}</td>
                <td className="px-5 py-4 text-xs text-gray-600">{REASON_LABELS[ret.reason]}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{ret.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[ret.status]}`}>
                    {ret.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">{ret.date}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    {ret.status === 'requested' && (
                      <>
                        <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                      <Eye className="w-4 h-4" />
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
