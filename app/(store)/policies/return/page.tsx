import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, RefreshCw, Package, Clock, CheckCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description: 'Imperial Fashion Groups return and refund policy. 7-day returns, 3-5 day refunds.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="page-header">
        <div className="section text-center">
          <h1 className="font-display text-4xl font-bold mb-2">Return & Refund Policy</h1>
          <p className="text-gray-400">Last updated: January 2025</p>
        </div>
      </div>

      <div className="section py-12 max-w-4xl mx-auto">
        {/* Quick Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: RefreshCw, title: '7-Day Returns',  desc: 'Return window from delivery date',       color: 'text-green-600', bg: 'bg-green-50' },
            { icon: Clock,     title: '3–5 Business Days', desc: 'For refund processing',               color: 'text-blue-600',  bg: 'bg-blue-50' },
            { icon: Shield,    title: 'Free Replacement', desc: 'For damaged or defective items',       color: 'text-gold-500',  bg: 'bg-gold-50' },
          ].map(card => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className={`${card.bg} ${card.color} p-3 rounded-xl shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">{card.title}</p>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">1. Return Policy</h2>
            <p className="text-gray-600">We at <strong>Imperial Fashion Groups</strong> want you to be completely satisfied with your purchase. If for any reason you are not satisfied, we offer a straightforward return policy.</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> Returns are accepted within <strong>7 days</strong> of the delivery date.</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> Items must be unused, unwashed, and in their original packaging with all tags intact.</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> Items must not be altered or washed.</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> Original invoice must be presented.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">2. Non-Returnable Items</h2>
            <p className="text-gray-600">The following items cannot be returned:</p>
            <ul className="mt-3 space-y-1 text-gray-600 list-disc pl-5">
              <li>Innerwear, lingerie (Bras, Panties, Slips)</li>
              <li>Items purchased during clearance/final sale</li>
              <li>Items that show signs of use, washing, or alteration</li>
              <li>Deodorants and personal hygiene products</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">3. Damaged / Defective Items</h2>
            <div className="bg-gold-50 border border-gold-200 rounded-xl p-5">
              <p className="text-gray-700">If you receive a damaged or defective item, we will <strong>replace it at no additional cost</strong>. Please contact us within 48 hours of delivery with photos of the damage.</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">4. Refund Process</h2>
            <ol className="space-y-3 text-gray-600">
              {[
                'Submit a return request through your account or contact us at imperialfashiongroups@gmail.com',
                'Our team reviews the request within 1–2 business days',
                'Once approved, our logistics partner will pick up the item',
                'After we receive and inspect the item, the refund is initiated',
                'Refunds are credited to the original payment method within 3–5 business days',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-black text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">5. Cash on Delivery Orders</h2>
            <p className="text-gray-600">For COD orders, refunds will be processed via bank transfer (NEFT/IMPS) after you submit your bank account details. Processing time may be 5–7 business days.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">6. Contact Us</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:imperialfashiongroups@gmail.com" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 transition-colors">
                <Mail className="w-5 h-5 text-gold-500" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-brand-black">imperialfashiongroups@gmail.com</p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
