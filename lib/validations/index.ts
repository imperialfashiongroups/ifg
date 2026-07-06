import { z } from 'zod';

// ============================================================
// Indian-specific validators
// ============================================================

// Indian phone: 10 digits, starts with 6-9
export const indianPhone = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number');

// Indian pincode: 6 digits
export const indianPincode = z
  .string()
  .regex(/^\d{6}$/, 'Enter a valid 6-digit pincode');

// Indian states list
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
] as const;

export type IndianState = typeof INDIAN_STATES[number];

// ============================================================
// Auth Schemas
// ============================================================

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().email('Enter a valid email address'),
  phone: indianPhone,
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

// ============================================================
// Address Schema
// ============================================================

export const addressSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  phone: indianPhone,
  address_line1: z.string().min(5, 'Enter your full address').max(200),
  address_line2: z.string().max(200).optional(),
  city: z.string().min(2, 'Enter your city').max(60),
  state: z.enum(INDIAN_STATES, { message: 'Select a valid state' }),
  pincode: indianPincode,
  is_default: z.boolean().default(false),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

// ============================================================
// Checkout Schema
// ============================================================

export const checkoutAddressSchema = addressSchema;

export const checkoutSchema = z.object({
  address: addressSchema,
  payment_method: z.enum(['razorpay', 'cod']),
  notes: z.string().max(300).optional(),
  coupon_code: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// ============================================================
// Profile Schema
// ============================================================

export const profileSchema = z.object({
  full_name: z.string().min(2).max(60),
  phone: indianPhone,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// ============================================================
// Review Schema
// ============================================================

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().min(10, 'Review must be at least 10 characters').max(1000),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

// ============================================================
// Return Request Schema
// ============================================================

export const returnRequestSchema = z.object({
  reason: z.enum(['defective', 'wrong_item', 'size_issue', 'not_as_described', 'changed_mind', 'other']),
  description: z.string().min(10, 'Please describe the issue in at least 10 characters').max(500),
});

export type ReturnRequestFormValues = z.infer<typeof returnRequestSchema>;

// ============================================================
// Search Schema
// ============================================================

export const searchSchema = z.object({
  q: z.string().min(1).max(100),
  category: z.string().optional(),
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  size: z.string().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'rating', 'discount']).default('newest'),
  page: z.coerce.number().min(1).default(1),
});

// ============================================================
// Admin: Product Schema
// ============================================================

export const productSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().min(10).max(2000),
  category_id: z.string().uuid('Select a category'),
  hsn_code: z.string().max(20).optional(),
  gst_rate: z.number().min(0).max(28).default(12),
  base_price: z.number().positive('Price must be positive'),
  mrp: z.number().positive('MRP must be positive'),
  discount_pct: z.number().min(0).max(90).default(0),
  is_featured: z.boolean().default(false),
  is_new_arrival: z.boolean().default(true),
  is_bestseller: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
