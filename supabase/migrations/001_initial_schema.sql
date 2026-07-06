-- ============================================================
-- Imperial Fashion Groups — Supabase Database Schema
-- Migration: 001_initial_schema.sql
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE gender_category AS ENUM ('women', 'men', 'kids', 'unisex');

CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'return_requested',
  'return_approved',
  'return_picked',
  'refund_initiated',
  'refunded'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded',
  'partially_refunded'
);

CREATE TYPE payment_method AS ENUM ('razorpay', 'cod');

CREATE TYPE return_reason AS ENUM (
  'defective',
  'wrong_item',
  'size_issue',
  'not_as_described',
  'changed_mind',
  'other'
);

CREATE TYPE return_status AS ENUM (
  'requested',
  'approved',
  'rejected',
  'picked_up',
  'received',
  'refund_initiated',
  'refunded'
);

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================

CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- CATEGORIES
-- ============================================================

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  parent_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  gender      gender_category,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable" ON categories
  FOR SELECT USING (TRUE);

CREATE POLICY "Only admins can modify categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- PRODUCTS
-- ============================================================

CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  category_id     UUID NOT NULL REFERENCES categories(id),
  brand           TEXT NOT NULL DEFAULT 'Imperial Fashion Groups',
  hsn_code        TEXT,
  gst_rate        DECIMAL(5,2) NOT NULL DEFAULT 12.00, -- 12% for apparel
  base_price      DECIMAL(10,2) NOT NULL,  -- price before GST
  mrp             DECIMAL(10,2) NOT NULL,  -- Maximum Retail Price
  discount_pct    DECIMAL(5,2) NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  is_new_arrival  BOOLEAN NOT NULL DEFAULT FALSE,
  is_bestseller   BOOLEAN NOT NULL DEFAULT FALSE,
  tags            TEXT[] DEFAULT '{}',
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- PRODUCT VARIANTS (SKU level)
-- ============================================================

CREATE TABLE product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku         TEXT NOT NULL UNIQUE,
  size        TEXT,
  color       TEXT,
  color_hex   TEXT,
  stock_qty   INT NOT NULL DEFAULT 0,
  price       DECIMAL(10,2), -- override product price if different
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variants are publicly readable" ON product_variants
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage variants" ON product_variants
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================

CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt_text    TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images are publicly readable" ON product_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage product images" ON product_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- ADDRESSES
-- ============================================================

CREATE TABLE addresses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city          TEXT NOT NULL,
  state         TEXT NOT NULL,
  pincode       TEXT NOT NULL,
  is_default    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses" ON addresses
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- ORDERS
-- ============================================================

CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number      TEXT NOT NULL UNIQUE DEFAULT 'IFG-' || UPPER(SUBSTRING(uuid_generate_v4()::TEXT, 1, 8)),
  user_id           UUID REFERENCES profiles(id),
  
  -- Shipping address snapshot
  shipping_name     TEXT NOT NULL,
  shipping_phone    TEXT NOT NULL,
  shipping_address1 TEXT NOT NULL,
  shipping_address2 TEXT,
  shipping_city     TEXT NOT NULL,
  shipping_state    TEXT NOT NULL,
  shipping_pincode  TEXT NOT NULL,
  
  -- Pricing
  subtotal          DECIMAL(10,2) NOT NULL,
  gst_amount        DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount   DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_charge   DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount      DECIMAL(10,2) NOT NULL,
  
  -- Status
  status            order_status NOT NULL DEFAULT 'pending',
  payment_method    payment_method NOT NULL DEFAULT 'razorpay',
  payment_status    payment_status NOT NULL DEFAULT 'pending',
  
  coupon_code       TEXT,
  notes             TEXT,
  
  -- Tracking
  tracking_id       TEXT,
  courier_name      TEXT,
  
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- ORDER ITEMS
-- ============================================================

CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id),
  variant_id      UUID REFERENCES product_variants(id),
  product_name    TEXT NOT NULL,  -- snapshot
  variant_name    TEXT,           -- e.g. "Red / XL"
  image_url       TEXT,
  quantity        INT NOT NULL DEFAULT 1,
  unit_price      DECIMAL(10,2) NOT NULL,
  gst_rate        DECIMAL(5,2) NOT NULL DEFAULT 12,
  total_price     DECIMAL(10,2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage order items" ON order_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- PAYMENTS
-- ============================================================

CREATE TABLE payments (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id              UUID NOT NULL REFERENCES orders(id),
  razorpay_order_id     TEXT,
  razorpay_payment_id   TEXT,
  razorpay_signature    TEXT,
  amount                DECIMAL(10,2) NOT NULL,
  currency              TEXT NOT NULL DEFAULT 'INR',
  status                payment_status NOT NULL DEFAULT 'pending',
  method                TEXT,  -- card, upi, netbanking, wallet
  error_code            TEXT,
  error_description     TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage payments" ON payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- RETURN REQUESTS
-- ============================================================

CREATE TABLE return_requests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id),
  user_id       UUID NOT NULL REFERENCES profiles(id),
  reason        return_reason NOT NULL,
  description   TEXT,
  images        TEXT[],  -- URLs of uploaded photos
  status        return_status NOT NULL DEFAULT 'requested',
  admin_notes   TEXT,
  refund_amount DECIMAL(10,2),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE return_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own returns" ON return_requests
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all returns" ON return_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id),
  order_id    UUID REFERENCES orders(id),
  rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       TEXT,
  body        TEXT,
  images      TEXT[],
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are publicly readable" ON reviews
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can manage own reviews" ON reviews
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- WISHLIST
-- ============================================================

CREATE TABLE wishlists (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- COUPONS
-- ============================================================

CREATE TABLE coupons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT NOT NULL UNIQUE,
  description     TEXT,
  discount_type   TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value  DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  max_discount    DECIMAL(10,2),
  usage_limit     INT,
  used_count      INT NOT NULL DEFAULT 0,
  valid_from      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until     TIMESTAMPTZ,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active coupons are publicly readable" ON coupons
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage coupons" ON coupons
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- BANNERS (Homepage / Promotional)
-- ============================================================

CREATE TABLE banners (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  subtitle    TEXT,
  image_url   TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url    TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active banners are publicly readable" ON banners
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage banners" ON banners
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ============================================================
-- SEED: Parent Categories
-- ============================================================

INSERT INTO categories (name, slug, gender, sort_order) VALUES
  ('Women Ethnic', 'women-ethnic', 'women', 1),
  ('Women Western', 'women-western', 'women', 2),
  ('Men', 'men', 'men', 3),
  ('Kids', 'kids', 'kids', 4),
  ('Footwear', 'footwear', 'unisex', 5),
  ('Accessories', 'accessories', 'unisex', 6),
  ('Home & Living', 'home-living', 'unisex', 7);

-- Women Ethnic subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'women-ethnic')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Lehenga','3 Piece Set','2 Piece Set','Kurti','One Piece','Tops','Skirts','Jumpsuit']),
       unnest(ARRAY['lehenga','3-piece-set','2-piece-set','kurti','one-piece','womens-tops','womens-skirts','womens-jumpsuit']),
       parent.id, 'women', generate_series(1,8)
FROM parent;

-- Women Western subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'women-western')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Shorts','Jeans','Pants','Bottom Wear','Leggings','Bras','Panties','Slips','Shrugs','Jackets','Sweater']),
       unnest(ARRAY['womens-shorts','womens-jeans','womens-pants','bottom-wear','leggings','bras','panties','slips','shrugs','womens-jackets','sweater']),
       parent.id, 'women', generate_series(1,11)
FROM parent;

-- Men subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'men')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Suits','Shirts','Pants','Jeans','T-Shirts','Track Pants','Jackets']),
       unnest(ARRAY['suits','shirts','mens-pants','mens-jeans','t-shirts','track-pants','mens-jackets']),
       parent.id, 'men', generate_series(1,7)
FROM parent;

-- Kids subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'kids')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Frocks','Tops','Skirts','Shorts','Leggings','Jumpsuit','Jeans','Formal Wear']),
       unnest(ARRAY['frocks','kids-tops','kids-skirts','kids-shorts','kids-leggings','kids-jumpsuit','kids-jeans','formal-wear']),
       parent.id, 'kids', generate_series(1,8)
FROM parent;

-- Accessories subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'accessories')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Bags','Ties','Wallets','Belts']),
       unnest(ARRAY['bags','ties','wallets','belts']),
       parent.id, 'unisex', generate_series(1,4)
FROM parent;

-- Home & Living subcategories
WITH parent AS (SELECT id FROM categories WHERE slug = 'home-living')
INSERT INTO categories (name, slug, parent_id, gender, sort_order)
SELECT unnest(ARRAY['Towels','Bedsheets','Room Fresheners','Deodorants']),
       unnest(ARRAY['towels','bedsheets','room-fresheners','deodorants']),
       parent.id, 'unisex', generate_series(1,4)
FROM parent;
