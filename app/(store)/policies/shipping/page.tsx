import type { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, MapPin, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy — Imperial Fashion Groups',
  description: 'Imperial Fashion Groups shipping policy. Free delivery on orders above ₹499 across India.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="section max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">Shipping & Delivery Policy</h1>
          <p className="text-sm text-gray-500">Fast, secure, and reliable shipping across India</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Truck,       title: 'Free Shipping',    desc: 'On all orders above ₹499 across India', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Clock,     title: '2–5 Business Days', desc: 'Standard dispatch and transit time',    color: 'text-green-600', bg: 'bg-green-50' },
            { icon: ShieldCheck, title: 'Insured Transit',  desc: '100% protection against loss or damage', color: 'text-gold-600',  bg: 'bg-gold-50' },
          ].map(c => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                <div className={`${c.bg} ${c.color} p-3 rounded-xl shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-black text-sm">{c.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-600 leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-brand-black">1. Dispatch & Delivery Timelines</h2>
          <p>
            At <strong>Imperial Fashion Groups</strong>, we strive to deliver your orders promptly. All orders placed on our website are processed within 24–48 business hours from our fulfillment centers in Raipur, Hyderabad, and Bengaluru.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai):</strong> 2 to 3 working days.</li>
            <li><strong>Tier 2 & Tier 3 Cities (Raipur, Nagpur, Indore, Pune, etc.):</strong> 3 to 5 working days.</li>
            <li><strong>Remote / North-Eastern Regions:</strong> 5 to 7 working days.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">2. Shipping Charges</h2>
          <p>
            We offer **FREE standard delivery** on all orders with a total value of ₹499 and above. For orders below ₹499, a nominal shipping charge of ₹49 is applicable per order.
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">3. Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is available across 19,000+ pin codes in India. Please ensure that someone is available at the delivery address to make the cash or UPI payment upon arrival.
          </p>
        </div>
      </div>
    </div>
  );
}
