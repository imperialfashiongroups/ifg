import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format INR currency
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Calculate effective price with discount
export function getEffectivePrice(mrp: number, discountPct: number): number {
  return mrp * (1 - discountPct / 100);
}

// Format discount percentage
export function formatDiscount(mrp: number, effectivePrice: number): number {
  return Math.round(((mrp - effectivePrice) / mrp) * 100);
}

// Generate slug from name
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Truncate text
export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '…' : text;
}

// Format date to Indian locale
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Get order status label and color
export function getOrderStatusInfo(status: string): { label: string; color: string; bg: string } {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending:            { label: 'Pending',            color: '#d97706', bg: '#fef3c7' },
    confirmed:          { label: 'Confirmed',          color: '#2563eb', bg: '#dbeafe' },
    processing:         { label: 'Processing',         color: '#7c3aed', bg: '#ede9fe' },
    shipped:            { label: 'Shipped',            color: '#0891b2', bg: '#cffafe' },
    out_for_delivery:   { label: 'Out for Delivery',   color: '#0891b2', bg: '#cffafe' },
    delivered:          { label: 'Delivered',          color: '#16a34a', bg: '#dcfce7' },
    cancelled:          { label: 'Cancelled',          color: '#dc2626', bg: '#fee2e2' },
    return_requested:   { label: 'Return Requested',   color: '#d97706', bg: '#fef3c7' },
    return_approved:    { label: 'Return Approved',    color: '#16a34a', bg: '#dcfce7' },
    return_picked:      { label: 'Return Picked',      color: '#7c3aed', bg: '#ede9fe' },
    refund_initiated:   { label: 'Refund Initiated',   color: '#0891b2', bg: '#cffafe' },
    refunded:           { label: 'Refunded',           color: '#16a34a', bg: '#dcfce7' },
  };
  return map[status] || { label: status, color: '#6b7280', bg: '#f3f4f6' };
}

// Get return status info
export function getReturnStatusInfo(status: string): { label: string; step: number } {
  const map: Record<string, { label: string; step: number }> = {
    requested:       { label: 'Request Submitted', step: 1 },
    approved:        { label: 'Request Approved',  step: 2 },
    rejected:        { label: 'Request Rejected',  step: 2 },
    picked_up:       { label: 'Item Picked Up',    step: 3 },
    received:        { label: 'Item Received',     step: 4 },
    refund_initiated:{ label: 'Refund Initiated',  step: 5 },
    refunded:        { label: 'Refunded',          step: 6 },
  };
  return map[status] || { label: status, step: 0 };
}

// Parse price string to number
export function parseINR(value: string): number {
  return parseFloat(value.replace(/[₹,\s]/g, '')) || 0;
}
