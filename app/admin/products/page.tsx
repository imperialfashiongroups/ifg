import Link from 'next/link';
import { Plus, Search, Edit, Eye, Trash2, ShoppingBag } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Embroidered Lehenga Choli', category: 'Women Ethnic', mrp: 3999, discount: 25, stock: 18, active: true,  featured: true  },
  { id: '2', name: "Men's Premium Suit",         category: 'Men',          mrp: 5499, discount: 15, stock: 12, active: true,  featured: false },
  { id: '3', name: 'Floral Kurti Set',           category: 'Women Ethnic', mrp: 1299, discount: 30, stock: 45, active: true,  featured: false },
  { id: '4', name: 'Kids Frock Party Wear',      category: 'Kids',         mrp: 999,  discount: 20, stock: 0,  active: false, featured: false },
  { id: '5', name: 'Designer Silk Saree',        category: 'Women Ethnic', mrp: 4999, discount: 10, stock: 7,  active: true,  featured: true  },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_PRODUCTS.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary gap-2" id="add-product-btn">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 transition-colors"
            placeholder="Search products by name, SKU, or category..."
            id="product-search"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">MRP</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_PRODUCTS.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gold-500">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                      {product.featured && <span className="text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded font-medium">FEATURED</span>}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{product.category}</td>
                <td className="px-5 py-4 font-medium text-gray-900">₹{product.mrp.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4">
                  <span className="text-green-600 font-medium">{product.discount}%</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-medium ${product.stock === 0 ? 'text-red-500' : product.stock < 5 ? 'text-amber-500' : 'text-gray-700'}`}>
                    {product.stock === 0 ? 'Out of stock' : product.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/products/${product.id}`} className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/admin/products/${product.id}/edit`} className="p-1.5 text-gray-400 hover:text-gold-500 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
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
