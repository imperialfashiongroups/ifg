import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import CartDrawer from '@/components/store/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'Imperial Fashion Groups — Wear Your Attitude',
    template: '%s | Imperial Fashion Groups',
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileNav />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
