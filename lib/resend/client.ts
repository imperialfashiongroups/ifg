import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789_placeholder');

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@imperialfashiongroups.com';
export const BRAND_NAME = 'Imperial Fashion Groups';

// Helper to format INR currency
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
