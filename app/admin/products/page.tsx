import Link from 'next/link';
import { Plus, Edit, Eye, ShoppingBag, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProductsPage() {
  const supabase = await createClient();

  // Fetch products joined with category name and primary image
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id, name, slug, mrp, discount_pct, is_active, is_featured, is_new_arrival, is_bestseller, tags,
      categories ( id, name, slug ),
      product_variants ( stock_qty ),
      product_images ( url, is_primary, sort_order )
    `)
    .order('created_at', { ascending: false });

  const rows = products || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{rows.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary gap-2" id="add-product-btn">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Database error: {error.message}
        </div>
      )}

      {rows.length === 0 && !error ? (
        <div className="bg-white rounded-2xl shadow-card p-16 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-2">No products yet</h2>
          <p className="text-sm text-gray-400 mb-6">Add your first product to start selling</p>
          <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add First Product
          </Link>
        </div>
      ) : (
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
              {rows.map((product: any) => {
                const sellingPrice = product.mrp
                  ? Math.round(product.mrp * (1 - (product.discount_pct || 0) / 100))
                  : 0;
                const totalStock = (product.product_variants || []).reduce(
                  (sum: number, v: any) => sum + (v.stock_qty || 0), 0
                );
                const primaryImg = (product.product_images || [])
                  .sort((a: any, b: any) => (a.sort_order ?? 99) - (b.sort_order ?? 99))
                  .find((img: any) => img.is_primary) || (product.product_images || [])[0];
                const category = product.categories as any;

                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {primaryImg?.url ? (
                            <img src={primaryImg.url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gold-500">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{product.id.slice(0, 8)}…</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{category?.name || '—'}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      ₹{product.mrp?.toLocaleString('en-IN') || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-green-600 font-semibold">{product.discount_pct || 0}%</span>
                      <span className="text-xs text-gray-400 ml-1">(₹{sellingPrice.toLocaleString('en-IN')})</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold ${
                        totalStock === 0 ? 'text-red-500' :
                        totalStock < 5  ? 'text-amber-500' :
                        'text-green-600'
                      }`}>
                        {totalStock === 0 ? 'Out of Stock' : `${totalStock} units`}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {product.is_active ? '● Active' : '○ Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${product.slug || product.id}`} target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" title="View on store">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/products/${product.id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gold-500 hover:bg-gold-50 transition-colors" title="View details">
                          <ShoppingBag className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-black hover:bg-gray-100 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
