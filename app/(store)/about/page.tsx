import type { Metadata } from 'next';
import Link from 'next/link';
import { Crown, HeartHandshake, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Imperial Fashion Groups — premium Indian fashion brand founded in 2009 by K. Chakravarthy in Raipur.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="page-header">
        <div className="section text-center">
          <h1 className="font-display text-4xl font-bold mb-2">About Us</h1>
          <p className="text-gray-400 italic font-serif text-lg">"Wear your attitude"</p>
        </div>
      </div>

      <div className="section py-12 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gold-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Our Story</p>
            <h2 className="font-serif text-3xl font-bold text-brand-black mb-5">Fashion with Purpose, Quality with Pride</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-brand-black">Imperial Fashion Groups</strong> was founded in <strong>2009</strong> by
                <strong className="text-brand-black"> K. Chakravarthy</strong> in the vibrant city of Raipur, Chhattisgarh.
                What began as a small boutique has grown into a multi-city fashion brand with a loyal customer base
                spanning thousands of families.
              </p>
              <p>
                In <strong>2022</strong>, we took Imperial online — bringing our curated collections of ethnic wear,
                western wear, men's fashion, kidswear, footwear, accessories, and home living products to every corner of India.
              </p>
              <p>
                Today, Imperial Fashion Groups operates across three cities: <strong>Raipur (CG)</strong>,
                <strong> Hyderabad (TS)</strong>, and <strong>Bengaluru (KA)</strong> — serving customers
                who believe that fashion is an expression of identity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2009', label: 'Year Founded', sub: 'Raipur, Chhattisgarh' },
              { value: '15+',  label: 'Years of Excellence', sub: 'In Indian fashion' },
              { value: '3',    label: 'Cities',         sub: 'Raipur · Hyderabad · Bengaluru' },
              { value: '10K+', label: 'Happy Customers', sub: 'And growing' },
            ].map(stat => (
              <div key={stat.label} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-3xl font-bold text-gold-gradient font-display mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-brand-black">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="section-heading text-2xl">Our Values</h2>
            <div className="gold-divider mx-auto mt-3" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Crown,          title: 'Premium Quality',  desc: 'Every product is carefully sourced and quality-checked before it reaches you.' },
              { icon: HeartHandshake, title: 'Customer First',   desc: 'Your satisfaction is our top priority. 7-day returns, free replacements, 24/7 support.' },
              { icon: Sparkles,       title: 'Made for India',  desc: 'Designs inspired by Indian culture, crafted for the modern Indian lifestyle.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-gray-50">
                <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-500 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-brand-black mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="bg-brand-black text-white rounded-2xl p-6">
          <h3 className="font-serif font-bold text-lg text-gold-400 mb-4">Business Information</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Company Name</p><p>Imperial Fashion Groups</p></div>
            <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Founder & CEO</p><p>K. Chakravarthy</p></div>
            <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">GST Registration</p><p className="font-mono">22ASVPC0275C1Z4</p></div>
            <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Established</p><p>2009 | Online: 2022</p></div>
            <div className="sm:col-span-2"><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Registered Address</p><p>401, Atlantis Complex, Raipur Bypass, Telibandha, Raipur, CG - 492001</p></div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-primary text-base px-10 py-4 inline-flex">
            Explore Our Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
