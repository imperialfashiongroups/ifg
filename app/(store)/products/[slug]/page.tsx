import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, Share2, ChevronRight, Shield, Truck, RefreshCw, Sparkles } from 'lucide-react';
import SizeChart from '@/components/store/SizeChart';
import AddToCartSection from '@/components/store/AddToCartSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fetches a product — tries Supabase first (by slug or UUID id), falls back to sample data
async function getProduct(slug: string) {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    let query = supabase
      .from('products')
      .select(`
        *,
        categories ( id, name, slug ),
        product_variants ( id, size, color, color_hex, stock_qty, price ),
        product_images ( id, url, sort_order, is_primary, alt_text )
      `)
      .eq('is_active', true);

    if (isUUID) {
      query = query.or(`slug.eq.${slug},id.eq.${slug}`);
    } else {
      query = query.eq('slug', slug);
    }

    const { data, error } = await query.single();

    if (data) {
      const category = data.categories as any;
      const variants = data.product_variants || [];
      const images = (data.product_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order);

      return {
        id:             data.id,
        name:           data.name,
        slug:           data.slug || data.id,
        description:    data.description || '',
        mrp:            Number(data.mrp) || 0,
        discount_pct:   Number(data.discount_pct) || 0,
        gst_rate:       Number(data.gst_rate) || 5,
        is_new_arrival: data.is_new_arrival,
        is_bestseller:  data.is_bestseller,
        categories: {
          name: category?.name || 'Uncategorized',
          slug: category?.slug || 'uncategorized',
        },
        product_variants: variants.map((v: any, i: number) => ({
          id: v.id || `v${i}`,
          size: v.size || 'Default',
          color: v.color || 'Default',
          color_hex: v.color_hex || '#000000',
          stock_qty: v.stock_qty || 10,
          price: v.price || Number(data.mrp) || 0,
        })),
        product_images: images.length > 0 ? images : [{ url: '/placeholder/product.jpg', is_primary: true }],
        reviews: [],
        tags: [category?.slug].filter(Boolean),
      };
    }
  } catch (err) {
    console.error('Supabase fetch error:', err);
    // Supabase unavailable or query failed — fall through to sample data
  }

  // 2. Sample product data fallback
  const SAMPLE_PRODUCTS: Record<string, any> = {
    'embroidered-lehenga-choli': {
      id: 'sample-1', name: 'Embroidered Lehenga Choli', slug: 'embroidered-lehenga-choli',
      description: 'A stunning hand-embroidered lehenga choli perfect for weddings, festivals, and special occasions. Crafted from premium georgette fabric with intricate zari work and mirror embellishments.',
      mrp: 3999, discount_pct: 25, gst_rate: 12, is_new_arrival: true, is_bestseller: false,
      category: { name: 'Women Ethnic', slug: 'women-ethnic' },
      variants: [
        { id: 'v1', size: 'S', color: 'Red',  color_hex: '#dc2626', stock_qty: 5 },
        { id: 'v2', size: 'M', color: 'Red',  color_hex: '#dc2626', stock_qty: 3 },
        { id: 'v3', size: 'L', color: 'Red',  color_hex: '#dc2626', stock_qty: 8 },
        { id: 'v4', size: 'S', color: 'Blue', color_hex: '#2563eb', stock_qty: 4 },
        { id: 'v5', size: 'M', color: 'Blue', color_hex: '#2563eb', stock_qty: 6 },
      ],
      images: [{ id: 'i1', url: '/placeholder/lehenga-1.jpg', is_primary: true, alt_text: 'Embroidered Lehenga Choli' }],
      reviews: [
        { id: 'r1', rating: 5, title: 'Absolutely Beautiful!', body: 'The embroidery is stunning and the fabric quality is excellent.', profile: { full_name: 'Priya S.' }, created_at: '2025-06-15' },
        { id: 'r2', rating: 4, title: 'Great Quality', body: 'Loved the color and fit.', profile: { full_name: 'Anita K.' }, created_at: '2025-06-10' },
      ],
      tags: ['wedding', 'festive', 'lehenga', 'ethnic'],
    },
    'mens-premium-suit': {
      id: 'sample-2', name: "Men's Premium Suit", slug: 'mens-premium-suit',
      description: "A sophisticated premium suit tailored for the modern Indian man. Crafted from imported Italian wool-blend fabric.",
      mrp: 5499, discount_pct: 15, gst_rate: 12, is_new_arrival: false, is_bestseller: true,
      category: { name: 'Men', slug: 'men' },
      variants: [
        { id: 'v1', size: 'S', color: 'Black', color_hex: '#1a1a1a', stock_qty: 4 },
        { id: 'v2', size: 'M', color: 'Black', color_hex: '#1a1a1a', stock_qty: 7 },
        { id: 'v3', size: 'L', color: 'Black', color_hex: '#1a1a1a', stock_qty: 5 },
      ],
      images: [{ id: 'i1', url: '/placeholder/suit-1.jpg', is_primary: true, alt_text: "Men's Premium Suit" }],
      reviews: [
        { id: 'r1', rating: 5, title: 'Perfect Fit!', body: "Wore it at my cousin's wedding. Got so many compliments!", profile: { full_name: 'Rahul G.' }, created_at: '2025-05-20' },
      ],
      tags: ['formal', 'suit', 'wedding', 'men'],
    },
    'floral-kurti-set': {
      id: 'sample-3', name: 'Floral Anarkali Kurti Set', slug: 'floral-kurti-set',
      description: 'A beautiful floral printed Anarkali kurti set with matching palazzo pants and dupatta.',
      mrp: 1299, discount_pct: 30, gst_rate: 5, is_new_arrival: false, is_bestseller: false,
      category: { name: 'Women Ethnic', slug: 'women-ethnic' },
      variants: [
        { id: 'v1', size: 'S', color: 'Pink', color_hex: '#ec4899', stock_qty: 10 },
        { id: 'v2', size: 'M', color: 'Pink', color_hex: '#ec4899', stock_qty: 12 },
        { id: 'v3', size: 'L', color: 'Pink', color_hex: '#ec4899', stock_qty: 8 },
      ],
      images: [{ id: 'i1', url: '/placeholder/kurti-1.jpg', is_primary: true, alt_text: 'Floral Anarkali Kurti Set' }],
      reviews: [
        { id: 'r1', rating: 5, title: 'Love the fabric!', body: 'So comfortable and the print is exactly as shown.', profile: { full_name: 'Meena J.' }, created_at: '2025-07-01' },
      ],
      tags: ['kurti', 'ethnic', 'casual', 'women'],
    },
    'designer-silk-saree': {
      id: 'sample-5', name: 'Designer Silk Saree', slug: 'designer-silk-saree',
      description: 'An exquisite pure silk saree with intricate Banarasi weaving and gold zari border.',
      mrp: 4999, discount_pct: 10, gst_rate: 12, is_new_arrival: false, is_bestseller: true,
      category: { name: 'Women Ethnic', slug: 'women-ethnic' },
      variants: [
        { id: 'v1', size: 'Free Size', color: 'Gold',  color_hex: '#C9A84C', stock_qty: 6 },
        { id: 'v2', size: 'Free Size', color: 'Green', color_hex: '#16a34a', stock_qty: 4 },
        { id: 'v3', size: 'Free Size', color: 'Red',   color_hex: '#dc2626', stock_qty: 5 },
      ],
      images: [{ id: 'i1', url: '/placeholder/saree-1.jpg', is_primary: true, alt_text: 'Designer Silk Saree' }],
      reviews: [
        { id: 'r1', rating: 5, title: 'Pure Silk Quality', body: 'Absolutely gorgeous saree.', profile: { full_name: 'Lakshmi R.' }, created_at: '2025-07-02' },
      ],
      tags: ['saree', 'silk', 'wedding', 'banarasi'],
    },
  };

  return SAMPLE_PRODUCTS[slug] || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description?.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 155),
    },
  };
}

function RatingStars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-400">({count} reviews)</span>
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const effectivePrice = product.mrp * (1 - product.discount_pct / 100);
  const discountPct = Math.round(product.discount_pct);
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((s: number, r: any) => s + r.rating, 0) / product.reviews.length
    : 0;

  // GST breakdown
  const gstMultiplier = product.gst_rate / (100 + product.gst_rate);
  const gstAmount = effectivePrice * gstMultiplier;
  const basePrice = effectivePrice - gstAmount;

  // Unique colors and sizes
  const colors = [...new Set(product.product_variants.map((v: any) => v.color as string))] as string[];
  const sizes  = [...new Set(product.product_variants.map((v: any) => v.size as string))] as string[];

  // Get first uploaded image if available
  const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="section py-3">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/categories/${product.categories?.slug}`}>{product.categories?.name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-black font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

          {/* === LEFT: Images === */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
              {primaryImage?.url ? (
                <img src={primaryImage.url} alt={primaryImage.alt_text || product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center flex flex-col items-center">
                    <Sparkles className="w-16 h-16 text-gold-400/50 mb-4" />
                    <p className="text-sm font-medium">No Image</p>
                  </div>
                </div>
              )}
              {discountPct > 0 && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {discountPct}% OFF
                </div>
              )}
              {product.is_new_arrival && (
                <div className="absolute top-4 right-4 bg-brand-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  NEW
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {product.product_images?.length > 1 ? product.product_images.map((img: any, i: number) => (
                <div key={i} className="w-20 h-24 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                  <img src={img.url} alt={img.alt_text} className="w-full h-full object-cover" />
                </div>
              )) : [1, 2, 3].map(i => (
                <div key={i} className="w-20 h-24 rounded-xl bg-gray-100 shrink-0 cursor-pointer hover:ring-2 hover:ring-gold-400 transition-all overflow-hidden flex items-center justify-center text-gold-400/70">
                  <Sparkles className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>

          {/* === RIGHT: Details === */}
          <div>
            {/* Category */}
            <Link
              href={`/categories/${product.categories?.slug}`}
              className="text-xs font-medium text-gold-500 uppercase tracking-wider hover:underline"
            >
              {product.categories?.name}
            </Link>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-black mt-2 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviews.length > 0 && (
              <div className="mb-4">
                <RatingStars rating={avgRating} count={product.reviews.length} />
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-black">
                ₹{Math.round(effectivePrice).toLocaleString('en-IN')}
              </span>
              {discountPct > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Save {discountPct}%
                  </span>
                </>
              )}
            </div>

            {/* GST Note */}
            <p className="text-xs text-gray-400 mb-6">
              Incl. GST ({product.gst_rate}%) ₹{gstAmount.toFixed(2)} | Base price: ₹{basePrice.toFixed(2)}
            </p>

            <hr className="border-gray-100 mb-6" />

            {/* Add to Cart Section (client component) */}
            <AddToCartSection product={product} colors={colors} sizes={sizes} />

            {/* Size Chart */}
            <div className="mt-3">
              <SizeChart category={product.categories?.name} />
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-brand-black mb-3">Product Details</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag: string) => (
                    <span key={tag} className="badge-gold text-[11px]">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Assurance icons */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck,     text: 'Free Delivery', sub: 'Above ₹499' },
                { icon: RefreshCw, text: '7 Day Returns', sub: 'Easy returns' },
                { icon: Shield,    text: 'Secure',        sub: 'Razorpay / COD' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="text-center p-3 rounded-xl bg-gray-50">
                  <Icon className="w-5 h-5 text-gold-400 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-brand-black">{text}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-heading text-2xl">Customer Reviews</h2>
                <div className="gold-divider mt-2" />
              </div>
              {avgRating > 0 && (
                <div className="text-right">
                  <p className="text-4xl font-bold text-brand-black font-display">{avgRating.toFixed(1)}</p>
                  <RatingStars rating={avgRating} count={product.reviews.length} />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_,i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  {review.title && <p className="font-semibold text-sm text-brand-black mb-1">{review.title}</p>}
                  <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center text-[10px] font-bold text-brand-black">
                        {review.profile.full_name[0]}
                      </div>
                      <span className="text-xs font-medium text-gray-600">{review.profile.full_name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
