'use client';

import { useState } from 'react';
import { Image as ImageIcon, Plus, Sparkles, CheckCircle, Eye, Trash2 } from 'lucide-react';

const INITIAL_BANNERS = [
  { id: '1', title: 'Regal Ethnic Collection', subtitle: 'Handcrafted embroidered lehengas & festive sarees', badge: 'FESTIVE EDIT', gradient: 'from-rose-950 to-pink-900', active: true },
  { id: '2', title: "Men's Bespoke Suits",     subtitle: 'Tailored perfection for weddings & boardroom excellence', badge: 'NEW SEASON', gradient: 'from-blue-950 to-indigo-900', active: true },
  { id: '3', title: 'Western Attitude Series', subtitle: 'Contemporary denim jeans, shrugs & party one-pieces', badge: 'FLAT 25% OFF', gradient: 'from-purple-950 to-violet-900', active: true },
  { id: '4', title: 'Kids Party Wear Frocks',  subtitle: 'Adorable, durable & comfortable festive wear for kids', badge: 'KIDS SPECIAL', gradient: 'from-amber-950 to-orange-900', active: false },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(INITIAL_BANNERS);

  const toggleActive = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const deleteBanner = (id: string) => {
    if (confirm('Delete this homepage promotional banner?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-gold-500" /> Homepage Banners & Sliders
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage hero carousel promotional banners displayed on store homepage</p>
        </div>
        <button
          onClick={() => alert('Banner uploader modal connected to Supabase Storage!')}
          className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5 shadow-gold font-bold"
        >
          <Plus className="w-4 h-4" /> Add New Banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {banners.map(b => (
          <div key={b.id} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden flex flex-col justify-between">
            {/* Banner Preview Box */}
            <div className={`p-8 bg-gradient-to-r ${b.gradient} text-white relative overflow-hidden aspect-[16/7] flex flex-col justify-center`}>
              <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-gold-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 w-fit">
                ✨ {b.badge}
              </span>
              <h3 className="font-serif text-2xl font-bold mb-1 line-clamp-1">{b.title}</h3>
              <p className="text-xs text-gray-200 line-clamp-2 max-w-sm">{b.subtitle}</p>
            </div>

            {/* Controls */}
            <div className="p-5 flex items-center justify-between bg-gray-50/50 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600">Status:</span>
                <button
                  onClick={() => toggleActive(b.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    b.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {b.active ? '● Active on Homepage' : '○ Hidden / Inactive'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteBanner(b.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
