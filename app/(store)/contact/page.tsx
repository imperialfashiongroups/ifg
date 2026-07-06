import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Mail, Clock, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Imperial Fashion Groups — Raipur, Hyderabad, Bengaluru.',
};

const OFFICES = [
  {
    city: 'Raipur (HQ)',
    state: 'Chhattisgarh',
    address: '401, Atlantis Complex, Raipur Bypass, Telibandha, Raipur, CG - 492001',
    isPrimary: true,
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Hyderabad, Telangana',
    isPrimary: false,
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Bengaluru, Karnataka',
    isPrimary: false,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="page-header">
        <div className="section text-center">
          <h1 className="font-display text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-400">We're here to help you</p>
        </div>
      </div>

      <div className="section py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              <a href="mailto:imperialfashiongroups@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gold-50 transition-colors">
                <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-brand-black">imperialfashiongroups@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Business Hours</p>
                  <p className="text-sm font-semibold text-brand-black">Mon – Sat: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-brand-black mb-4">Our Locations</h3>
            <div className="space-y-3">
              {OFFICES.map(office => (
                <div key={office.city} className={`p-4 rounded-xl border ${office.isPrimary ? 'border-gold-200 bg-gold-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 mt-0.5 shrink-0 ${office.isPrimary ? 'text-gold-500' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-semibold text-brand-black">
                        {office.city}
                        {office.isPrimary && <span className="ml-2 text-[10px] bg-gold-400 text-brand-black px-1.5 py-0.5 rounded font-bold">HQ</span>}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{office.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Your name" id="contact-name" />
                </div>
                <div>
                  <label className="form-label">Mobile</label>
                  <input className="form-input" placeholder="10-digit mobile" maxLength={10} id="contact-phone" />
                </div>
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" id="contact-email" />
              </div>
              <div>
                <label className="form-label">Order Number (optional)</label>
                <input className="form-input" placeholder="IFG-XXXXXXXX" id="contact-order" />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea className="form-input resize-none" rows={5} placeholder="How can we help you?" id="contact-message" />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 justify-center" id="contact-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
