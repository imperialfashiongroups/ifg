'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { loginSchema, registerSchema, LoginValues, RegisterValues } from '@/lib/validations';
import { createClient } from '@/lib/supabase/client';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleLogin = async (data: LoginValues) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) setError(error.message);
    else window.location.href = '/account';
    setLoading(false);
  };

  const handleRegister = async (data: RegisterValues) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name, phone: data.phone },
      },
    });
    if (error) setError(error.message);
    else window.location.href = '/account';
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-black via-brand-gray to-brand-black items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="text-center z-10">
          <p className="text-gold-gradient font-display text-5xl font-black tracking-widest uppercase mb-2">Imperial</p>
          <p className="text-gray-500 text-sm tracking-[0.4em] uppercase mb-8">Fashion Groups</p>
          <p className="text-gold-400 font-serif text-2xl italic">"Wear your attitude"</p>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xs mx-auto">
            {[{ v: '2009', l: 'Founded' }, { v: '3', l: 'Cities' }, { v: '10K+', l: 'Customers' }].map(s => (
              <div key={s.l} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-gold-gradient font-display">{s.v}</p>
                <p className="text-xs text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <p className="text-gold-gradient font-display text-3xl font-black tracking-widest">IMPERIAL</p>
            <p className="text-gray-500 text-xs tracking-[0.3em]">FASHION GROUPS</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h1 className="font-serif text-2xl font-bold text-brand-black mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              {mode === 'login' ? 'Sign in to your account' : 'Join Imperial Fashion Groups'}
            </p>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gold-400 hover:bg-gold-50 transition-all duration-200 mb-4"
              id="google-auth-btn"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">or with email</div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">{error}</div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <label className="form-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...loginForm.register('email')} className="form-input pl-10" placeholder="you@example.com" id="login-email" type="email" />
                  </div>
                  {loginForm.formState.errors.email && <p className="form-error">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...loginForm.register('password')} type={showPassword ? 'text' : 'password'} className="form-input pl-10 pr-10" placeholder="••••••••" id="login-password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && <p className="form-error">{loginForm.formState.errors.password.message}</p>}
                </div>
                <div className="text-right">
                  <Link href="/forgot-password" className="text-xs text-gold-500 hover:underline">Forgot password?</Link>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base justify-center" id="login-btn">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...registerForm.register('full_name')} className="form-input pl-10" placeholder="Your full name" id="reg-name" />
                  </div>
                  {registerForm.formState.errors.full_name && <p className="form-error">{registerForm.formState.errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...registerForm.register('email')} className="form-input pl-10" placeholder="you@example.com" id="reg-email" type="email" />
                  </div>
                  {registerForm.formState.errors.email && <p className="form-error">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label">Mobile Number</label>
                  <div className="relative flex">
                    <span className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-sm text-gray-500 font-medium">+91</span>
                    <input {...registerForm.register('phone')} className="form-input rounded-l-none flex-1" placeholder="10-digit mobile" maxLength={10} id="reg-phone" />
                  </div>
                  {registerForm.formState.errors.phone && <p className="form-error">{registerForm.formState.errors.phone.message}</p>}
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...registerForm.register('password')} type={showPassword ? 'text' : 'password'} className="form-input pl-10 pr-10" placeholder="Min 8 chars, 1 uppercase, 1 number" id="reg-password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.password && <p className="form-error">{registerForm.formState.errors.password.message}</p>}
                </div>
                <div>
                  <label className="form-label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...registerForm.register('confirm_password')} type="password" className="form-input pl-10" placeholder="Repeat your password" id="reg-confirm-password" />
                  </div>
                  {registerForm.formState.errors.confirm_password && <p className="form-error">{registerForm.formState.errors.confirm_password.message}</p>}
                </div>
                <p className="text-xs text-gray-400">By registering, you agree to our <Link href="/policies/terms" className="text-gold-500 hover:underline">Terms</Link> and <Link href="/policies/privacy" className="text-gold-500 hover:underline">Privacy Policy</Link>.</p>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base justify-center" id="register-btn">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            <p className="text-center text-sm text-gray-500 mt-5">
              {mode === 'login' ? (
                <>Don't have an account? <Link href="/register" className="text-gold-500 font-semibold hover:underline">Sign up</Link></>
              ) : (
                <>Already have an account? <Link href="/login" className="text-gold-500 font-semibold hover:underline">Sign in</Link></>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
