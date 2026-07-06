import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Imperial Fashion Groups — Wear Your Attitude',
    template: '%s | Imperial Fashion Groups',
  },
  description:
    'Premium Indian fashion brand since 2009. Shop women ethnic, women western, men, kids, footwear, accessories, and home living. Based in Raipur, Hyderabad & Bengaluru.',
  keywords: [
    'Imperial Fashion Groups',
    'Indian fashion',
    'online shopping India',
    'women ethnic wear',
    'Raipur fashion',
    'lehenga',
    'kurti',
    'men suits',
  ],
  openGraph: {
    title: 'Imperial Fashion Groups — Wear Your Attitude',
    description: 'Premium Indian fashion brand since 2009.',
    url: 'https://imperialfashiongroups.com',
    siteName: 'Imperial Fashion Groups',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imperial Fashion Groups — Wear Your Attitude',
    description: 'Premium Indian fashion brand since 2009.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
