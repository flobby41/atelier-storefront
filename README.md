# Avant-Garde Fashion Storefront

Atelier is a **headless Shopify storefront** built with **Next.js App Router** and **TypeScript**.

The goal was to understand what it actually takes to build on top of Shopify's APIs — not just display data, but manage it. I worked with both the **Storefront GraphQL API** for the shopping experience and the **Admin API** to build a lightweight back-office for managing products, stock and pricing. I also wrote migration scripts to import and publish a local product catalogue to Shopify, mixing GraphQL and REST depending on what the API actually supported.

The project sits at the intersection of a bespoke Next.js frontend and Shopify as a commerce engine.

## TL;DR (for recruiters)

- **What**: headless Shopify storefront + lightweight back-office (Admin API) + migration scripts
- **Why**: demonstrates **API integration**, **frontend architecture**, **state management**, **UX polish**, and **responsive design**
- **Tech**: Next.js (App Router), React, TypeScript, Tailwind v4, shadcn/ui, Zustand, Shopify Storefront/Admin APIs

## What you can do in the app

- **Browse** collections: Women / Men / New Arrivals / Sale
- **Search** products (realtime filtering)
- **Open a product** page with images, sizes, and details
- **Wishlist** items (persisted)
- **Cart** management (sizes, quantities, totals; persisted)
- **Checkout** flow (shipping + payment information forms)
- **Navigate** content pages: About, Sustainability, Stores, Support, Legal

## Tech stack

- **Framework**: Next.js 16 (App Router, Server Components), React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Radix UI, Lucide
- **State**: Zustand + `localStorage` persistence (cart, wishlist)
- **UX components**: Embla Carousel
- **Fonts**: Cormorant Garamond (headings), Inter (body)

## Quick start

### Prerequisites

- Node.js 18+
- npm (or yarn)

### Install & run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

## Key routes (product-focused)

- **/**: homepage (hero + featured carousel + grid)
- **/women**, **/men**, **/newarrivals**, **/sale**: collection pages
- **/products/[id]**: product details (PDP)
- **/checkout**: checkout flow
- **/login**, **/signup**: authentication screens (UI)

## UI / design direction

The visual language follows a “**hype aesthetic with soft UI**” approach:

- **Typography**: elegant serif headings + clean sans body
- **Palette**: charcoal blacks, warm stone neutrals, soft cream accents
- **Layout**: editorial spacing, subtle dividers, soft shadows
- **Motion**: smooth transitions and interaction feedback

## Project structure (high-level)

```text
├── app/                    # Routes (App Router)
├── components/             # UI building blocks (cart, header, search, etc.)
├── hooks/                  # Zustand hooks (cart, wishlist)
├── lib/                    # Product data + utilities
└── public/                 # Static assets
```

## Notes / roadmap

- **Current scope**: UI-first demo storefront (front-only data + local persistence)
- **Next steps** (if extended): backend auth, orders, inventory, payments, admin dashboard

## Credits

Design inspiration: Isabel Marant, Rick Owens, Vivienne Westwood.