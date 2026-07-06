'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-off-white py-16 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card max-w-md w-full mx-4">
        <Link href="/login" className="text-xs font-semibold text-gray-400 hover:text-brand-black flex items-center gap-1.5 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">Check Your Email</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              We have sent password reset instructions to <strong className="text-brand-black">{email}</strong>. Please click the link inside to set a new password.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs px-6 py-2.5 w-full">
              Try Another Email
            </button>
          </div>
        ) : (
          <div>
            <h1 className="font-serif text-2xl font-bold text-brand-black mb-2">Reset Password</h1>
            <p className="text-xs text-gray-500 mb-6">Enter the email address associated with your Imperial Fashion Groups account.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:border-gold-400 focus:bg-white transition-all"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-bold shadow-gold mt-2">
                Send Reset Link
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
