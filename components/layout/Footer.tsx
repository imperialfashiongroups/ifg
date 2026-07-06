import Link from 'next/link';
import { MapPin, Mail, ExternalLink, Truck, RefreshCw, ShieldCheck, Award } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'About Us',          href: '/about' },
  { label: 'Contact Us',        href: '/contact' },
  { label: 'Track My Order',    href: '/account/orders' },
  { label: 'All Products',      href: '/products' },
  { label: 'Women Ethnic Wear', href: '/categories/women-ethnic' },
  { label: 'Women Western',     href: '/categories/women-western' },
  { label: 'Men\'s Collection',  href: '/categories/men' },
  { label: 'Kids Fashion',      href: '/categories/kids' },
];

const POLICY_LINKS = [
  { label: 'Return & Refund Policy', href: '/policies/return' },
  { label: 'Shipping Policy',        href: '/policies/shipping' },
  { label: 'Privacy Policy',         href: '/policies/privacy' },
  { label: 'Terms of Service',       href: '/policies/terms' },
  { label: 'Contact Us',             href: '/contact' },
];

const CATEGORIES = [
  { label: 'Women Ethnic',  href: '/categories/women-ethnic' },
  { label: 'Women Western', href: '/categories/women-western' },
  { label: 'Men',           href: '/categories/men' },
  { label: 'Kids',          href: '/categories/kids' },
  { label: 'Footwear',      href: '/categories/footwear' },
  { label: 'Accessories',   href: '/categories/accessories' },
  { label: 'Home & Living', href: '/categories/home-living' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* USP Strip */}
      <div className="bg-brand-black border-b border-white/10">
        <div className="section py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck,       title: 'Free Shipping',    desc: 'On orders above ₹499' },
              { icon: RefreshCw,   title: '7-Day Returns',    desc: 'Hassle-free returns' },
              { icon: ShieldCheck, title: 'Secure Payment',   desc: 'Razorpay & COD' },
              { icon: Award,       title: 'Premium Quality',  desc: 'Since 2009' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-gold-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <p className="text-gold-gradient font-display text-3xl font-black tracking-widest uppercase">Imperial</p>
              <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase">Fashion Groups</p>
            </Link>
            <p className="text-gray-400 text-sm mb-1 italic font-serif">"Wear your attitude"</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium Indian fashion brand founded in 2009. Delivering style and quality
              across Raipur, Hyderabad, and Bengaluru.
            </p>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>401, Atlantis Complex, Raipur Bypass,<br />Telibandha, Raipur, CG - 492001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:imperialfashiongroups@gmail.com" className="hover:text-gold-400 transition-colors">
                  imperialfashiongroups@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Facebook',  href: '#' },
                { label: 'YouTube',   href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-400 hover:text-brand-black flex items-center justify-center transition-all duration-200 text-xs font-bold"
                >
                  {label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Policies</h3>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">GST Registration</p>
              <p className="text-xs text-gray-300 font-mono">22ASVPC0275C1Z4</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider mb-1">Founder & CEO</p>
              <p className="text-xs text-gray-300">K. Chakravarthy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Imperial Fashion Groups. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="/icons/razorpay.svg" alt="Razorpay" className="h-5 opacity-60" />
            <span className="text-gray-600 text-xs">UPI · Cards · Netbanking · COD</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Secure & Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
