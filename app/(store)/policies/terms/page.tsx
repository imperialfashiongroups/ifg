import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Imperial Fashion Groups',
  description: 'Imperial Fashion Groups terms of service and user agreements.',
};

export default function TermsPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="section max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-500">Please read these terms carefully before using our platform</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-600 leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-brand-black">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the website of <strong>Imperial Fashion Groups</strong> (founded by K. Chakravarthy in 2009, online since 2022), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">2. Product Descriptions & Pricing</h2>
          <p>
            We strive for utmost accuracy in our product descriptions, fabric details, sizing charts, and pricing. However, slight color variations may occur due to screen resolutions and studio lighting. All prices are listed in Indian Rupees (INR) and are inclusive of GST (GSTIN: 22ASVPC0275C1Z4).
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">3. Intellectual Property</h2>
          <p>
            All content on this website—including logos, photography, graphics, and text—is the exclusive property of Imperial Fashion Groups and is protected by Indian copyright and trademark laws.
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">4. Governing Law & Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts in Raipur, Chhattisgarh.
          </p>
        </div>
      </div>
    </div>
  );
}
