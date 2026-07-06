# Imperial Fashion Groups — Full-Stack eCommerce Implementation Plan

A premium Indian fashion eCommerce platform built with Next.js (App Router), TypeScript, Supabase, Razorpay, and Tailwind CSS.

---

## Open Questions

> [!IMPORTANT]
> **Please answer these before I begin building:**
>
> 1. **Admin Panel**: Do you want a custom admin dashboard (within the same Next.js app) for managing products, orders, and customers — or will you use the Supabase Studio UI directly?
> 2. **Authentication**: Should customers log in via Email/Password, Google OAuth, or both?
> 3. **Search**: Basic keyword search or an AI-powered/Algolia search?
> 4. **Phase scope**: Should I build the **complete** site in one go, or deliver in phases (Storefront → Cart/Checkout → Auth/Account → Admin)?
> 5. **Deployment target**: Vercel, Netlify, or self-hosted? (Affects environment config.)
>
> *I'll proceed with sensible defaults (Custom Admin, Email+Google Auth, basic search, full build, Vercel) if you approve without changes.*

---

## Proposed Architecture

```
d:/ifg/
├── app/                          # Next.js App Router
│   ├── (store)/                  # Public storefront layout
│   │   ├── page.tsx              # Homepage
│   │   ├── products/             # Product listing & detail
│   │   ├── categories/           # Category pages
│   │   ├── cart/                 # Cart page
│   │   ├── checkout/             # Checkout flow
│   │   ├── account/              # User account (orders, profile)
│   │   └── search/               # Search results
│   ├── (auth)/                   # Auth pages (login, register, forgot)
│   ├── admin/                    # Protected admin dashboard
│   │   ├── products/             # Product CRUD
│   │   ├── orders/               # Order management
│   │   ├── customers/            # Customer management
│   │   └── analytics/            # Sales analytics
│   └── api/                      # Route handlers
│       ├── razorpay/             # Payment API routes
│       ├── webhooks/             # Razorpay & Supabase webhooks
│       └── admin/                # Admin-only API routes
├── components/
│   ├── ui/                       # Reusable design system
│   ├── store/                    # Storefront components
│   ├── admin/                    # Admin components
│   └── layout/                   # Header, Footer, Sidebar
├── lib/
│   ├── supabase/                 # Supabase client & helpers
│   ├── razorpay/                 # Payment helpers
│   ├── store/                    # Zustand cart & wishlist stores
│   └── validations/              # Zod schemas
├── types/                        # TypeScript types/interfaces
├── hooks/                        # Custom React hooks
├── public/
│   └── placeholder/              # Placeholder product images
└── supabase/
    └── migrations/               # Database schema migrations
```

---

## Database Schema (Supabase / PostgreSQL)

### Tables
| Table | Purpose |
|-------|---------|
| `profiles` | Extended user data (linked to `auth.users`) |
| `categories` | Product categories (hierarchical, parent/child) |
| `products` | Product master with GST rate, HSN code |
| `product_variants` | SKU-level: size, color, stock, price |
| `product_images` | Multiple images per product |
| `addresses` | Saved shipping addresses |
| `orders` | Order header (status, total, GST breakup) |
| `order_items` | Line items linking order → product_variant |
| `payments` | Razorpay payment records |
| `reviews` | Product reviews & ratings |
| `wishlist` | User wishlisted products |
| `coupons` | Discount codes |
| `banners` | Homepage/promotional banners |

---

## Proposed Changes

### Phase 1 — Project Bootstrap & Design System

#### [NEW] `package.json` + `next.config.ts`
- Next.js 15 with App Router, TypeScript, strict mode
- Tailwind CSS v4, Framer Motion, Zustand, React Hook Form, Zod

#### [NEW] `tailwind.config.ts`
- Brand color tokens: Gold (`#C9A84C`), Black (`#1A1A1A`), White (`#FFFFFF`)
- Custom fonts: Playfair Display (headings) + Inter (body)
- Custom animations and shadow utilities

#### [NEW] `app/globals.css`
- CSS custom properties for brand colors
- Scrollbar styling, selection colors, smooth scroll

---

### Phase 2 — Supabase Setup

#### [NEW] `supabase/migrations/001_schema.sql`
- Full schema: all tables with RLS policies
- Enum types: `order_status`, `payment_status`, `gender_category`
- Indexes for performance

#### [NEW] `lib/supabase/client.ts` + `server.ts` + `middleware.ts`
- Browser + server Supabase clients
- Next.js middleware for auth route protection

#### [NEW] `types/database.ts`
- Auto-generated Supabase TypeScript types
- Enriched domain types (Product, Order, Cart, etc.)

---

### Phase 3 — Core Layout & Navigation

#### [NEW] `components/layout/Header.tsx`
- Sticky header with brand logo + gold gradient
- Category mega-menu (all 7 categories with subcategories)
- Search bar, wishlist icon, cart icon (with item count badge)
- Login/Account button

#### [NEW] `components/layout/Footer.tsx`
- Brand info, GST number, locations (Raipur/Hyderabad/Bengaluru)
- Quick links, policy links, social icons
- Newsletter signup

#### [NEW] `components/layout/MobileNav.tsx`
- Slide-in drawer navigation for mobile

---

### Phase 4 — Homepage

#### [NEW] `app/(store)/page.tsx`
- Hero carousel with Framer Motion (banner images)
- Category grid with hover animations
- Featured products section
- New arrivals, bestsellers
- Brand story snippet (Founded 2009, Online 2022)
- Testimonials / review section
- USP banner (7-day returns, free delivery threshold, COD)

---

### Phase 5 — Product Catalog

#### [NEW] `app/(store)/products/page.tsx`
- Filterable product grid (category, price range, size, color, rating)
- Sort: Price (low/high), Newest, Rating
- Pagination / infinite scroll

#### [NEW] `app/(store)/products/[slug]/page.tsx`
- Product detail: image gallery, variant selector (size/color)
- Price with GST breakdown (MRP vs effective price)
- Add to Cart / Wishlist
- Reviews & ratings
- Related products

#### [NEW] `app/(store)/categories/[slug]/page.tsx`
- Category-specific listing with subcategory tabs

---

### Phase 6 — Cart & Wishlist

#### [NEW] `lib/store/cart.ts` (Zustand)
- Cart state: add, remove, update quantity, clear
- Persistent via localStorage
- Price totals, GST calculation

#### [NEW] `lib/store/wishlist.ts` (Zustand)
- Wishlist: add/remove, move to cart

#### [NEW] `components/store/CartDrawer.tsx`
- Slide-in cart sidebar with Framer Motion
- Item list, quantity controls, subtotal

#### [NEW] `app/(store)/cart/page.tsx`
- Full cart page with coupon code input

---

### Phase 7 — Checkout & Payments

#### [NEW] `app/(store)/checkout/page.tsx`
- Multi-step: Address → Shipping → Payment → Confirmation
- React Hook Form + Zod validation
- Address form (Indian states, pincode validation)
- GST invoice generation

#### [NEW] `app/api/razorpay/create-order/route.ts`
- Creates Razorpay order server-side

#### [NEW] `app/api/razorpay/verify/route.ts`
- Verifies payment signature, updates order status in DB

#### [NEW] `components/store/RazorpayButton.tsx`
- Loads Razorpay checkout script
- Handles success/failure callbacks

---

### Phase 8 — Auth & User Account

#### [NEW] `app/(auth)/login/page.tsx` + `register/page.tsx`
- Email/Password + Google OAuth via Supabase Auth
- React Hook Form + Zod validation

#### [NEW] `app/(store)/account/page.tsx`
- Order history with status tracking
- Saved addresses management
- Profile settings
- Wishlist view

---

### Phase 9 — Admin Dashboard

#### [NEW] `app/admin/` (protected by middleware + role check)
- **Products**: Create/Edit/Delete products, manage variants, upload images to Supabase Storage
- **Orders**: View all orders, update status (Processing → Shipped → Delivered)
- **Customers**: View customer list, order count
- **Analytics**: Revenue chart, top products, order volume

---

### Phase 10 — Polish & SEO

#### [NEW] `app/sitemap.ts` + `app/robots.ts`
- Dynamic sitemap for all products and categories

#### Per-page metadata
- Title tags, Open Graph, structured data (Product schema)

#### [NEW] `public/placeholder/`
- Placeholder images organized by category

---

## Verification Plan

### Automated Tests
```bash
npx tsc --noEmit          # TypeScript type check
npm run build             # Production build check
npm run lint              # ESLint check
```

### Manual Verification
- Browse all category pages
- Add items to cart and checkout with Razorpay test keys
- Complete a full order flow end-to-end
- Test admin product creation and order status update
- Verify mobile responsiveness on 320px, 768px, 1280px viewports
- Verify GST calculation accuracy
- Test auth: register, login, Google OAuth, forgot password

---

## Estimated File Count
~80–100 files across components, pages, API routes, and lib utilities.

> [!NOTE]
> I'll build this systematically phase-by-phase and update the task checklist as I go. The entire build is feasible in a single session.
