'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Upload, X, Loader2, ImagePlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

interface Category { id: string; name: string; slug: string; }
interface ProductImage { id?: string; url: string; sort_order: number; is_primary: boolean; }

export default function AdminEditProductPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading]       = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [name, setName]             = useState('');
  const [description, setDesc]      = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mrp, setMrp]               = useState('');
  const [discountPct, setDiscount]  = useState('0');
  const [basePrice, setBasePrice]   = useState('');
  const [gstRate, setGstRate]       = useState('5');
  const [selectedSizes, setSizes]   = useState<string[]>([]);
  const [color, setColor]           = useState('');
  const [variantStock, setVariantStock] = useState<Record<string, string>>({});

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [imageFiles, setImageFiles]         = useState<File[]>([]);
  const [imagePreviews, setImagePreviews]   = useState<string[]>([]);
  
  const [saving, setSaving]             = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError]               = useState('');
  const [submitted, setSubmitted]       = useState(false);

  const sellingPrice = mrp && discountPct
    ? Math.round(Number(mrp) * (1 - Number(discountPct) / 100))
    : Number(basePrice) || 0;

  // Load categories & product data
  useEffect(() => {
    async function load() {
      // 1. Load Categories
      const { data: cats } = await supabase.from('categories').select('id, name, slug').eq('is_active', true).order('name');
      if (cats) setCategories(cats);

      // 2. Load Product
      const { data: product, error: pErr } = await supabase
        .from('products')
        .select(`
          *,
          product_variants ( size, color, stock_qty ),
          product_images ( id, url, sort_order, is_primary )
        `)
        .eq('id', id)
        .single();

      if (pErr || !product) { router.replace('/admin/products'); return; }

      setName(product.name || '');
      setDesc(product.description || '');
      setCategoryId(product.category_id || (cats?.[0]?.id ?? ''));
      setMrp(String(product.mrp || ''));
      setDiscount(String(product.discount_pct || '0'));
      setBasePrice(String(product.base_price || ''));
      setGstRate(String(product.gst_rate || '5'));
      
      const variants = product.product_variants || [];
      if (variants.length > 0) {
        setSizes(Array.from(new Set(variants.map((v: any) => v.size).filter(Boolean))) as string[]);
        const uniqueColors = Array.from(new Set(variants.map((v: any) => v.color).filter(Boolean))) as string[];
        setColor(uniqueColors.join(', '));
        
        const initialStock: Record<string, string> = {};
        variants.forEach((v: any) => {
          if (v.size && v.color) {
            initialStock[`${v.size}-${v.color}`] = String(v.stock_qty || 0);
          }
        });
        setVariantStock(initialStock);
      }

      if (product.product_images) {
        setExistingImages(
          [...product.product_images].sort((a: any, b: any) => a.sort_order - b.sort_order)
        );
      }
      
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleSize = (s: string) =>
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const currentTotal = existingImages.length + imageFiles.length;
    const allowed = 6 - currentTotal;
    const toAdd = files.slice(0, allowed);
    
    setImageFiles(prev => [...prev, ...toAdd]);
    toAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setImagePreviews(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (idx: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      // 1. Update product
      const productSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

      const { error: productErr } = await supabase
        .from('products')
        .update({
          name,
          slug:         productSlug,
          description,
          category_id:  categoryId || null,
          mrp:          Number(mrp) || null,
          discount_pct: Number(discountPct),
          base_price:   Number(basePrice) || Math.round(sellingPrice / 1.05),
          gst_rate:     Number(gstRate),
          updated_at:   new Date().toISOString()
        })
        .eq('id', id);

      if (productErr) throw new Error(`Product update failed: ${productErr.message}`);

      // 2. Update variants (recreate approach for simplicity)
      if (selectedSizes.length > 0) {
        // Delete old variants
        await supabase.from('product_variants').delete().eq('product_id', id);
        
        // Insert new ones
        const colorList = color ? color.split(',').map(c => c.trim()).filter(Boolean) : ['Default'];
        
        const variants = colorList.flatMap(c => 
          selectedSizes.map(size => {
            const key = `${size}-${c}`;
            const qty = Number(variantStock[key]) || 0;
            return {
              product_id: id,
              sku:        `${(id as string).slice(0, 8)}-${size.toUpperCase()}-${c.substring(0,3).toUpperCase()}`,
              size,
              color:      c,
              color_hex:  '#C9A84C',
              stock_qty:  qty,
              price:      sellingPrice,
              is_active:  true,
            };
          })
        );
        await supabase.from('product_variants').insert(variants);
      }
      setUploadProgress(20);

      // 3. Manage images
      // First, delete old images that were removed
      const remainingImageUrls = existingImages.map(img => img.url);
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id)
        .not('url', 'in', `(${remainingImageUrls.length ? remainingImageUrls.join(',') : 'dummy'})`);
        
      // Update sort order for remaining existing images
      for (let i = 0; i < existingImages.length; i++) {
        await supabase.from('product_images').update({ sort_order: i, is_primary: i === 0 }).eq('id', existingImages[i].id);
      }

      // Upload new images
      let startIndex = existingImages.length;
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const ext  = file.name.split('.').pop();
        const path = `products/${id}/${Date.now()}-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from('product-images').upload(path, file, { upsert: true });
        if (upErr) continue;

        const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
        await supabase.from('product_images').insert({
          product_id: id,
          url:        urlData.publicUrl,
          alt_text:   name,
          sort_order: startIndex + i,
          is_primary: (startIndex + i) === 0,
        });
        setUploadProgress(20 + Math.round(((i + 1) / imageFiles.length) * 75));
      }

      setUploadProgress(100);
      setSaving(false);
      setSubmitted(true);
      setTimeout(() => router.push('/admin/products'), 1500);

    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setSaving(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  const totalImages = existingImages.length + imagePreviews.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-sm text-gray-500">Update product details and inventory</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Updated!</h2>
          <p className="text-sm text-gray-500">Redirecting to inventory...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-card space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">⚠ {error}</div>
          )}

          {/* 1. Product Info */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">1. Product Information</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Product Title *</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Description</label>
              <textarea rows={3} value={description} onChange={e => setDesc(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Category *</label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white">
                <option value="">— Select category —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* 2. Pricing */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">2. Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">MRP (₹) *</label>
                <input type="number" required value={mrp} onChange={e => setMrp(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Discount (%)</label>
                <input type="number" min="0" max="99" value={discountPct} onChange={e => setDiscount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Selling Price (₹)</label>
                <div className="w-full bg-gold-50 border border-gold-300 rounded-xl px-4 py-3 font-bold text-brand-black">
                  ₹{sellingPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">GST Rate (%)</label>
                <select value={gstRate} onChange={e => setGstRate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white">
                  <option value="0">0% (Exempt)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Variants */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">3. Variants & Stock</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(s => (
                  <button type="button" key={s} onClick={() => toggleSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSizes.includes(s) ? 'bg-brand-black text-gold-400 border-brand-black' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gold-400'
                    }`}>
                    {s} {selectedSizes.includes(s) ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Color Names</label>
                <input type="text" value={color} onChange={e => setColor(e.target.value)}
                  placeholder="e.g., Red, Blue (comma-separated)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-gold-400 focus:bg-white" />
              </div>
            </div>

            {/* Dynamic Variant Stock Table */}
            {selectedSizes.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden mt-4">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-700">
                    <tr>
                      <th className="px-4 py-3">Color</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3 w-32">Stock Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(color ? color.split(',').map(c => c.trim()).filter(Boolean) : ['Default']).map((c) => (
                      selectedSizes.map((size) => {
                        const key = `${size}-${c}`;
                        return (
                          <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-2 font-medium text-brand-black">{c}</td>
                            <td className="px-4 py-2 font-bold text-gray-700">{size}</td>
                            <td className="px-4 py-2">
                              <input 
                                type="number" 
                                min="0" 
                                value={variantStock[key] !== undefined ? variantStock[key] : ''}
                                onChange={e => setVariantStock(prev => ({ ...prev, [key]: e.target.value }))}
                                placeholder="0"
                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none"
                              />
                            </td>
                          </tr>
                        );
                      })
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 4. Images */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">4. Product Photos</h2>

            {totalImages > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {/* Existing Images */}
                {existingImages.map((img, i) => (
                  <div key={img.id || i} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-[9px] font-bold text-center bg-brand-black/70 text-gold-400 py-0.5">MAIN</span>}
                    <button type="button" onClick={() => removeExistingImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* New Image Previews */}
                {imagePreviews.map((src, i) => (
                  <div key={`new-${i}`} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    {(i === 0 && existingImages.length === 0) && <span className="absolute bottom-0 left-0 right-0 text-[9px] font-bold text-center bg-brand-black/70 text-gold-400 py-0.5">MAIN</span>}
                    <button type="button" onClick={() => removeNewImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {totalImages < 6 && (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-gold-400 hover:text-gold-500 transition-colors">
                    <ImagePlus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gold-50/30 hover:border-gold-400 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-gold-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-700 text-sm">Click to upload product photos</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 10MB each · max 6 images</p>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple className="hidden" onChange={handleFileChange} />

            {saving && uploadProgress > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Saving changes...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gold-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/products" className="btn-secondary text-xs px-6 py-3">Cancel</Link>
            <button type="submit" disabled={saving}
              className="btn-primary text-xs px-10 py-3 shadow-gold font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
