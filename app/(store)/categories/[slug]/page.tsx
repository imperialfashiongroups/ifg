import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Shirt, User, Smile, Footprints, ShoppingBag, Home, ArrowRight, Star } from 'lucide-react';

const CATEGORY_META: Record<string, { name: string; desc: string; icon: any; color: string; count: string }> = {
  // Main Categories
  'women-ethnic': {
    name: 'Women Ethnic Wear',
    desc: 'Explore our regal collection of embroidered lehengas, silk sarees, Anarkali suits, kurtis, and festive 3-piece sets.',
    icon: Sparkles,
    color: 'from-rose-950 via-rose-900 to-pink-900',
    count: '200+ Styles Available',
  },
  'women-western': {
    name: 'Women Western Wear',
    desc: 'Contemporary western fashion — chic dresses, denim jeans, trousers, shrugs, jackets, and premium tops.',
    icon: Shirt,
    color: 'from-purple-950 via-purple-900 to-violet-900',
    count: '150+ Styles Available',
  },
  'men': {
    name: "Men's Collection",
    desc: 'Tailored perfection for modern men. Formal suits, linen shirts, trousers, denim jeans, track suits, and winter jackets.',
    icon: User,
    color: 'from-blue-950 via-blue-900 to-indigo-900',
    count: '100+ Styles Available',
  },
  'kids': {
    name: 'Kids Fashion',
    desc: 'Adorable, comfortable, and durable clothing for kids. Party wear frocks, shirts, denim skirts, shorts, and ethnic wear.',
    icon: Smile,
    color: 'from-amber-950 via-yellow-900 to-orange-900',
    count: '80+ Styles Available',
  },
  'footwear': {
    name: 'Footwear & Shoes',
    desc: 'Step out in confidence. Running sports shoes, formal leather shoes, ethnic juttis, sandals, and casual sneakers.',
    icon: Footprints,
    color: 'from-emerald-950 via-green-900 to-teal-900',
    count: '50+ Styles Available',
  },
  'accessories': {
    name: 'Accessories & Bags',
    desc: 'Complete your attitude with handcrafted silk dupattas, designer handbags, clutches, belts, and statement jewelry.',
    icon: ShoppingBag,
    color: 'from-amber-950 via-amber-900 to-yellow-900',
    count: '60+ Styles Available',
  },
  'home-living': {
    name: 'Home & Living',
    desc: 'Bring luxury into your home. Designer cushion covers, embroidered table runners, curtains, and premium bedsheets.',
    icon: Home,
    color: 'from-slate-950 via-slate-900 to-gray-900',
    count: '40+ Items Available',
  },

  // Women Ethnic Subcategories
  'lehenga':       { name: 'Designer Lehengas',         desc: 'Bridal and festive embroidered lehenga choli sets crafted with intricate zari and sequin work.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '45+ Styles' },
  '3-piece-set':   { name: 'Ethnic 3-Piece Sets',       desc: 'Complete kurta, palazzo, and dupatta ensembles designed for effortless elegance.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '38+ Styles' },
  '2-piece-set':   { name: 'Kurta & Pant 2-Piece Sets', desc: 'Chic and comfortable 2-piece sets for everyday luxury and festive gatherings.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '42+ Styles' },
  'kurti':         { name: 'Anarkali & Straight Kurtis', desc: 'Hand-block printed, floral, and embroidered kurtis in premium cotton and rayon.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '65+ Styles' },
  'one-piece':     { name: 'Ethnic & Western One-Piece', desc: 'Flowing dresses and gowns combining traditional Indian motifs with modern cuts.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '30+ Styles' },
  'womens-tops':   { name: "Women's Fashion Tops",      desc: 'Peplum, tunic, and crop tops designed to pair perfectly with skirts and trousers.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '55+ Styles' },
  'womens-skirts': { name: 'Flared & Ethnic Skirts',    desc: 'Voluminous block-print and brocade skirts for festive and casual wear.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '25+ Styles' },
  'womens-jumpsuit':{ name: 'Ethnic & Western Jumpsuits',desc: 'Contemporary jumpsuits with fusion Indian embroidery and flattering silhouettes.', icon: Sparkles, color: 'from-rose-950 via-rose-900 to-pink-900', count: '20+ Styles' },

  // Women Western Subcategories
  'womens-shorts': { name: "Women's Casual Shorts",     desc: 'Comfortable denim, linen, and cotton shorts for relaxed everyday outings.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '22+ Styles' },
  'womens-jeans':  { name: "Women's Denim Jeans",       desc: 'High-waist, wide-leg, and skinny fit denim jeans crafted with stretch comfort.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '40+ Styles' },
  'womens-pants':  { name: "Women's Trousers & Pants",  desc: 'Tailored formal trousers, cigarette pants, and casual culottes.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '35+ Styles' },
  'leggings':      { name: 'Premium Cotton Leggings',   desc: 'Ultra-soft ankle-length and churidar stretch leggings in 30+ vibrant shades.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '50+ Styles' },
  'bras':          { name: 'Intimate Wear & Bras',      desc: 'Seamless, padded, and cotton everyday lingerie providing superior comfort and support.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '30+ Styles' },
  'shrugs':        { name: 'Layering Shrugs & Capes',   desc: 'Embroidered, sheer, and knitted shrugs to elevate any outfit.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '18+ Styles' },
  'womens-jackets':{ name: "Women's Jackets & Coats",   desc: 'Denim jackets, tailored blazers, and winter outerwear crafted for style.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '24+ Styles' },
  'sweater':       { name: 'Winter Sweaters & Cardigans',desc: 'Cozy knitwear, pullovers, and cardigans for chilly evenings and winter days.', icon: Shirt, color: 'from-purple-950 via-purple-900 to-violet-900', count: '28+ Styles' },

  // Men Subcategories
  'suits':         { name: "Men's Tailored Suits",      desc: '3-piece formal suits, tuxedos, and bandhgalas for weddings and business excellence.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '32+ Styles' },
  'shirts':        { name: "Men's Casual & Formal Shirts",desc: 'Pure linen, crisp cotton, and printed shirts for work and weekend wear.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '75+ Styles' },
  'mens-pants':    { name: "Men's Formal Trousers",     desc: 'Slim-fit and classic tailored trousers in premium wool-blend and cotton fabrics.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '45+ Styles' },
  'mens-jeans':    { name: "Men's Denim Jeans",         desc: 'Rugged, stretch-denim jeans in classic indigo, black, and washed styles.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '50+ Styles' },
  't-shirts':      { name: "Men's Polo & Crew T-Shirts",desc: 'Breathable combed cotton tees, polos, and graphic tees for everyday attitude.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '80+ Styles' },
  'track-pants':   { name: 'Activewear & Track Pants',  desc: 'Moisture-wicking joggers and track pants for gym, workouts, and lounging.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '35+ Styles' },
  'mens-jackets':  { name: "Men's Jackets & Blazers",   desc: 'Leather jackets, bomber jackets, and casual blazers for sophisticated layering.', icon: User, color: 'from-blue-950 via-blue-900 to-indigo-900', count: '28+ Styles' },

  // Kids Subcategories
  'frocks':        { name: 'Kids Party Wear Frocks',    desc: 'Fairytale frocks and flared gowns for birthdays, weddings, and celebrations.', icon: Smile, color: 'from-amber-950 via-yellow-900 to-orange-900', count: '36+ Styles' },
  'kids-tops':     { name: 'Kids Tops & T-Shirts',      desc: 'Colorful, soft cotton tops and tees featuring playful prints and designs.', icon: Smile, color: 'from-amber-950 via-yellow-900 to-orange-900', count: '45+ Styles' },
  'kids-jumpsuit': { name: 'Kids Playful Jumpsuits',    desc: 'Easy-to-wear rompers and jumpsuits designed for active play and all-day comfort.', icon: Smile, color: 'from-amber-950 via-yellow-900 to-orange-900', count: '18+ Styles' },
  'kids-jeans':    { name: 'Kids Denim & Shorts',       desc: 'Durable, elastic-waist denim jeans and shorts built to withstand energetic adventures.', icon: Smile, color: 'from-amber-950 via-yellow-900 to-orange-900', count: '25+ Styles' },
  'formal-wear':   { name: 'Kids Festive & Formal Wear',desc: 'Mini sherwanis, kurta sets, and formal suits for your little gentlemen and princesses.', icon: Smile, color: 'from-amber-950 via-yellow-900 to-orange-900', count: '22+ Styles' },
};

const MOCK_PRODUCTS = [
  { id: '1',  name: 'Embroidered Lehenga Choli', category: 'women-ethnic', sub: 'lehenga',       price: 2999, mrp: 3999, discount: 25, rating: 4.8, reviews: 120, badge: 'NEW',        slug: 'embroidered-lehenga-choli' },
  { id: '2',  name: "Men's Premium Suit",        category: 'men',          sub: 'suits',         price: 4674, mrp: 5499, discount: 15, rating: 4.9, reviews: 85,  badge: 'BESTSELLER', slug: 'mens-premium-suit' },
  { id: '3',  name: 'Floral Anarkali Kurti Set', category: 'women-ethnic', sub: 'kurti',         price: 909,  mrp: 1299, discount: 30, rating: 4.6, reviews: 210, badge: 'SALE',       slug: 'floral-kurti-set' },
  { id: '4',  name: 'Kids Party Wear Frock',     category: 'kids',         sub: 'frocks',        price: 799,  mrp: 999,  discount: 20, rating: 4.7, reviews: 45,  badge: 'NEW',        slug: 'kids-frock-party-wear' },
  { id: '5',  name: 'Designer Silk Saree',       category: 'women-ethnic', sub: 'one-piece',     price: 4499, mrp: 4999, discount: 10, rating: 4.9, reviews: 310, badge: '',           slug: 'designer-silk-saree' },
  { id: '6',  name: 'Casual Linen Shirt',        category: 'men',          sub: 'shirts',        price: 1199, mrp: 1499, discount: 20, rating: 4.5, reviews: 67,  badge: 'NEW',        slug: 'casual-linen-shirt' },
  { id: '7',  name: 'Palazzo Kurta Set',         category: 'women-ethnic', sub: '3-piece-set',   price: 1169, mrp: 1799, discount: 35, rating: 4.7, reviews: 180, badge: 'SALE',       slug: 'palazzo-set' },
  { id: '8',  name: 'Kids Denim Jeans',          category: 'kids',         sub: 'kids-jeans',    price: 679,  mrp: 799,  discount: 15, rating: 4.4, reviews: 33,  badge: '',           slug: 'kids-denim-jeans' },
  { id: '9',  name: 'Printed Kurti',             category: 'women-ethnic', sub: 'kurti',         price: 599,  mrp: 899,  discount: 33, rating: 4.3, reviews: 90,  badge: '',           slug: 'printed-kurti' },
  { id: '10', name: 'Running Sports Shoes',      category: 'footwear',     sub: 'footwear',      price: 1599, mrp: 2199, discount: 27, rating: 4.6, reviews: 55,  badge: 'BESTSELLER', slug: 'running-sports-shoes' },
  { id: '11', name: 'Silk Dupatta',              category: 'accessories',  sub: 'accessories',   price: 499,  mrp: 699,  discount: 28, rating: 4.8, reviews: 140, badge: '',           slug: 'silk-dupatta' },
  { id: '12', name: 'Formal Trouser Pants',      category: 'men',          sub: 'mens-pants',    price: 1299, mrp: 1699, discount: 23, rating: 4.5, reviews: 78,  badge: '',           slug: 'formal-trouser-pants' },
  { id: '13', name: 'Western Denim Shrug',       category: 'women-western',sub: 'shrugs',        price: 1499, mrp: 1999, discount: 25, rating: 4.7, reviews: 88,  badge: 'NEW',        slug: 'western-denim-shrug' },
  { id: '14', name: 'Chic Party One-Piece',      category: 'women-western',sub: 'one-piece',     price: 2199, mrp: 2899, discount: 24, rating: 4.8, reviews: 112, badge: 'BESTSELLER', slug: 'chic-party-one-piece' },
  { id: '15', name: 'Luxury Cushion Cover Set',  category: 'home-living',  sub: 'home-living',   price: 899,  mrp: 1299, discount: 30, rating: 4.6, reviews: 42,  badge: '',           slug: 'luxury-cushion-cover-set' },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let cat = CATEGORY_META[slug];
  if (!cat) {
    const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${formatted} — Imperial Fashion Groups`,
      description: `Explore premium ${formatted} collection at Imperial Fashion Groups.`,
    };
  }
  return {
    title: `${cat.name} — Imperial Fashion Groups`,
    description: cat.desc,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let cat = CATEGORY_META[slug];

  // Smart dynamic fallback: if slug is not explicitly listed, generate a beautiful category profile!
  if (!cat) {
    const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    cat = {
      name: formattedName,
      desc: `Explore our latest collection of premium ${formattedName} at Imperial Fashion Groups. Designed with attitude and crafted for exceptional comfort.`,
      icon: Sparkles,
      color: 'from-brand-gray via-brand-black to-gray-900',
      count: 'New Styles Arriving Soon',
    };
  }

  const Icon = cat.icon || Sparkles;
  
  // Match products either by primary category or subcategory
  const products = MOCK_PRODUCTS.filter(p => p.category === slug || p.sub === slug || slug === 'all');

  return (
    <div className="min-h-screen bg-off-white pb-16">
      {/* Category Hero Banner */}
      <div className={`bg-gradient-to-r ${cat.color} text-white py-16 relative overflow-hidden border-b border-white/10`}>
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="section relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <nav className="text-xs text-gold-300 mb-4 flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest font-semibold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:underline">Categories</Link>
              <span>/</span>
              <span className="text-white">{cat.name}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{cat.name}</h1>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6">{cat.desc}</p>
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-gold-300 text-xs font-semibold px-4 py-2 rounded-full">
              ✨ {cat.count}
            </span>
          </div>
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center text-gold-400 shrink-0 shadow-gold">
            <Icon className="w-16 h-16 md:w-20 md:h-20 animate-float" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section mt-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <strong className="text-brand-black">{products.length}</strong> styles in <strong className="text-brand-black">{cat.name}</strong>
          </p>
          <Link href="/products" className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1">
            View All Store Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-card">
            <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">New Styles Arriving Soon</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              We are currently restocking our latest seasonal and festive collection for {cat.name}. Check back shortly!
            </p>
            <Link href="/products" className="btn-primary text-sm px-6 py-3">
              Explore All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => {
              const effectivePrice = p.mrp * (1 - p.discount / 100);
              return (
                <Link key={p.id} href={`/products/${p.slug}`} className="product-card group">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex flex-col items-center justify-center p-4">
                    <Icon className="w-14 h-14 text-gold-400/80 group-hover:scale-110 transition-transform mb-2" />
                    <span className="text-xs text-gray-400 font-medium">Product View</span>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.badge === 'NEW' ? 'bg-brand-black text-white' :
                        p.badge === 'BESTSELLER' ? 'bg-gold-400 text-brand-black' :
                        'bg-green-600 text-white'
                      }`}>
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-brand-black flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" /> {p.rating}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{cat.name}</p>
                    <h3 className="text-sm font-semibold text-brand-black line-clamp-1 mb-2 group-hover:text-gold-600 transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-black">₹{Math.round(effectivePrice).toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">{p.discount}% OFF</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
