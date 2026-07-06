# Imperial Fashion Groups — Build Tasks

## Phase 1 — Project Bootstrap & Design System
- `[x]` Initialize Next.js 15 project (App Router, TypeScript, Tailwind)
- `[x]` Install all dependencies (Framer Motion, Zustand, RHF, Zod, Supabase, Razorpay, Resend)
- `[x]` Configure tailwind.config.ts (brand tokens, fonts, animations)
- `[x]` Configure next.config.ts (image domains, env vars)
- `[x]` Set up app/globals.css (brand variables, base styles)
- `[x]` Create .env.local.example
- `[x]` Create placeholder images (public/placeholder/)

## Phase 2 — Types, Lib & Supabase Schema
- `[x]` Write types/database.ts (all Supabase table types)
- `[x]` Write supabase/migrations/001_schema.sql
- `[x]` Write lib/supabase/client.ts + server.ts
- `[x]` Write middleware.ts (auth route protection)
- `[x]` Write lib/validations/ (Zod schemas incl. Indian phone validation)

## Phase 3 — Zustand Stores
- `[x]` lib/store/cart.ts
- `[x]` lib/store/wishlist.ts
- `[x]` lib/store/ui.ts (drawer, modal state)

## Phase 4 — Core Layout
- `[x]` components/layout/Header.tsx (mega-menu, cart badge)
- `[x]` components/layout/Footer.tsx (brand info, GST, locations)
- `[x]` components/layout/MobileNav.tsx
- `[x]` app/(store)/layout.tsx

## Phase 5 — Homepage
- `[x]` components/store/HeroCarousel.tsx (Framer Motion)
- `[x]` components/store/CategoryGrid.tsx
- `[x]` components/store/ProductCard.tsx
- `[x]` components/store/FeaturedProducts.tsx
- `[x]` components/store/USPBanner.tsx
- `[x]` components/store/BrandStory.tsx
- `[x]` app/(store)/page.tsx

## Phase 6 — Product Catalog
- `[x]` app/(store)/products/page.tsx (grid + filters)
- `[x]` app/(store)/products/[slug]/page.tsx (detail + size chart)
- `[x]` app/(store)/categories/[slug]/page.tsx
- `[x]` components/store/SizeChart.tsx
- `[x]` components/store/ProductGallery.tsx
- `[x]` components/store/ProductFilters.tsx
- `[x]` components/store/ReviewSection.tsx

## Phase 7 — Cart & Wishlist
- `[x]` components/store/CartDrawer.tsx
- `[x]` app/(store)/cart/page.tsx
- `[x]` app/(store)/wishlist/page.tsx

## Phase 8 — Checkout & Payments
- `[x]` app/(store)/checkout/page.tsx (multi-step)
- `[x]` components/store/CheckoutSteps.tsx
- `[x]` components/store/AddressForm.tsx (Indian validation)
- `[x]` components/store/RazorpayButton.tsx
- `[x]` components/store/CODOption.tsx
- `[x]` app/api/razorpay/create-order/route.ts
- `[x]` app/api/razorpay/verify/route.ts
- `[x]` app/api/orders/route.ts

## Phase 9 — Email Notifications (Resend)
- `[x]` lib/resend/client.ts
- `[x]` lib/resend/templates/ (order confirmation, shipped, delivered, return)
- `[x]` app/api/webhooks/razorpay/route.ts

## Phase 10 — Auth & User Account
- `[x]` app/(auth)/login/page.tsx
- `[x]` app/(auth)/register/page.tsx
- `[x]` app/(auth)/forgot-password/page.tsx
- `[x]` app/(store)/account/page.tsx (orders, profile, addresses)
- `[x]` app/(store)/account/orders/[id]/page.tsx
- `[x]` app/(store)/account/returns/page.tsx (return request flow)
- `[x]` app/api/returns/route.ts

## Phase 11 — Admin Dashboard
- `[x]` app/admin/layout.tsx
- `[x]` app/admin/page.tsx (analytics overview)
- `[x]` app/admin/products/page.tsx + [id]/page.tsx
- `[x]` app/admin/orders/page.tsx + [id]/page.tsx
- `[x]` app/admin/customers/page.tsx
- `[x]` app/admin/returns/page.tsx
- `[x]` components/admin/ (DataTable, StatCard, Charts)

## Phase 12 — SEO & Polish
- `[x]` app/sitemap.ts
- `[x]` app/robots.ts
- `[x]` Per-page metadata (title, description, OG)
- `[x]` Structured data (Product, Organization schema)
- `[x]` app/(store)/search/page.tsx
- `[x]` app/(store)/policies/ (return, shipping, privacy)
