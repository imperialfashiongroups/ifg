import AuthForm from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your Imperial Fashion Groups account',
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
