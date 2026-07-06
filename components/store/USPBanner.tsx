import { CheckCircle, RefreshCw, Shield, Star, Truck, Headphones } from 'lucide-react';

const USP_ITEMS = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders above ₹499. Delivered in 3–5 business days.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: RefreshCw,
    title: '7-Day Easy Returns',
    desc: 'Not satisfied? Return within 7 days, no questions asked.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'Pay with Razorpay, UPI, cards, netbanking or Cash on Delivery.',
    color: 'text-gold-500',
    bg: 'bg-gold-50',
  },
  {
    icon: CheckCircle,
    title: 'Free Replacement',
    desc: 'Damaged or defective item? We replace it free of charge.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    desc: 'Curated fashion from trusted manufacturers since 2009.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our team is always here to help you with any query.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
];

export default function USPBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="section">
        <div className="text-center mb-12">
          <p className="text-gold-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
          <h2 className="section-heading">The Imperial Promise</h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USP_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300"
              >
                <div className={`${item.bg} ${item.color} p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
