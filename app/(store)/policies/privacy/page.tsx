import type { Metadata } from 'next';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Imperial Fashion Groups',
  description: 'Imperial Fashion Groups privacy policy. Learn how we protect your data and personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="section max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-brand-black mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500">How we collect, use, and safeguard your personal information</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong>Imperial Fashion Groups</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you visit our website or purchase our products.
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">1. Information We Collect</h2>
          <p>We may collect and process the following data about you:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Personal Identification:</strong> Name, email address, phone number, shipping and billing address.</li>
            <li><strong>Payment Information:</strong> Transactions are securely processed by Razorpay. We do not store sensitive credit/debit card numbers on our servers.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, operating system, and device information for analytical purposes.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill your fashion orders and returns.</li>
            <li>Send order confirmations, shipping updates, and invoice notifications via Resend email service.</li>
            <li>Provide customer support and resolve any queries regarding your purchases.</li>
            <li>Improve our website design, product catalog, and user experience.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">3. Data Security & Protection</h2>
          <p>
            We implement industry-standard security measures, including SSL encryption and secure Supabase PostgreSQL database protocols, to protect your personal information against unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="font-serif text-xl font-bold text-brand-black pt-4">4. Contact Our Privacy Officer</h2>
          <p>
            If you have any questions about this privacy policy or wish to request data deletion, please contact us at: <a href="mailto:imperialfashiongroups@gmail.com" className="text-gold-600 underline font-semibold">imperialfashiongroups@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
