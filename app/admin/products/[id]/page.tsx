'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Package, Tag, Layers, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatINR } from '@/lib/utils';

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const router  = useRouter();
  const supabase = createClient();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          product_images(url, sort_order),
          product_variants(size, color, stock_qty)
        `)
        .eq('id', id)
        .single();
        
      if (error || !data) {
        console.error("Error loading product:", error);
        router.replace('/admin/products');
        return;
      }
      setProduct(data);
      setLoading(false);
    }
    load();
  }, [id, router, supabase]);

  const handleDelete = async () => {
    if (!confirm(`Delete "${product?.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from('products').delete().eq('id', id);
    router.push('/admin/products');
  };

  const toggleActive = async () => {
    const next = !product.is_active;
    await supabase.from('products').update({ is_active: next }).eq('id', id);
    setProduct((p: any) => ({ ...p, is_active: next }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const images: string[] = product.product_images 
    ? [...product.product_images].sort((a: any, b: any) => a.sort_order - b.sort_order).map((img: any) => img.url)
    : [];
    
  const discount = product.discount_pct || 0;
  const sellingPrice = product.base_price || (product.mrp ? Math.round(product.mrp * (1 - discount / 100)) : 0);
  
  const totalStock = product.product_variants?.reduce((sum: number, v: any) => sum + (v.stock_qty || 0), 0) || 0;
  const sizes = Array.from(new Set(product.product_variants?.map((v: any) => v.size).filter(Boolean)));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-brand-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">{product.name}</h1>
            <p className="text-sm text-gray-500">Product ID: {product.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleActive}
            className={`text-xs px-4 py-2 rounded-xl font-semibold border transition-all ${
              product.is_active
                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {product.is_active ? '● Active' : '○ Inactive'}
          </button>
          <Link
            href={`/admin/products/${id}/edit`}
            className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs px-4 py-2 rounded-xl font-semibold border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Images */}
        <div className="bg-white rounded-2xl shadow-card p-5 space-y-3">
          <h2 className="font-semibold text-gray-800 text-sm">Product Photos</h2>
          {images.length > 0 ? (
            <>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i ? 'border-gold-400' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-400">
              <Package className="w-12 h-12 mb-2" />
              <p className="text-sm">No photos uploaded</p>
              <Link href={`/admin/products/${id}/edit`} className="text-xs text-gold-500 underline mt-1">
                Add photos
              </Link>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-gold-500" /> Pricing
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">MRP</p>
                <p className="font-bold text-gray-800">₹{product.mrp?.toLocaleString('en-IN') || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Discount</p>
                <p className="font-bold text-green-600">{discount}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Selling Price</p>
                <p className="font-bold text-gold-600 text-lg">₹{sellingPrice?.toLocaleString('en-IN') || 0}</p>
              </div>
            </div>
          </div>

          {/* Stock & Category */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-500" /> Inventory
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-800">{product.categories?.name || 'Uncategorized'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Stock</span>
                <span className={`font-bold ${totalStock === 0 ? 'text-red-500' : totalStock < 5 ? 'text-amber-500' : 'text-green-600'}`}>
                  {totalStock === 0 ? 'Out of Stock' : `${totalStock} units`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Badge</span>
                <span className="font-medium text-gray-800">{product.badge || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Featured</span>
                <span>{product.is_featured ? '⭐ Yes' : 'No'}</span>
              </div>
              {sizes.length > 0 && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Sizes</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {sizes.map((s: any) => (
                      <span key={s as string} className="text-xs px-2 py-0.5 bg-gray-100 rounded-lg font-medium text-gray-700">{s as string}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* View on Store */}
          <Link
            href={`/products/${product.slug || product.id}`}
            target="_blank"
            className="block text-center py-3 text-sm font-semibold text-gold-600 bg-gold-50 border border-gold-200 rounded-xl hover:bg-gold-100 transition-colors"
          >
            🛍 View on Store →
          </Link>
        </div>
      </div>
    </div>
  );
}
