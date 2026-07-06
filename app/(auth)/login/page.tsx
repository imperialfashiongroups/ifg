import AuthForm from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Imperial Fashion Groups account',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
