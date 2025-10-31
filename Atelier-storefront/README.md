# Avant-Garde Fashion Storefront

A sophisticated e-commerce platform for high-fashion clothing, inspired by the avant-garde aesthetics of Isabel Marant, Rick Owens, and Vivienne Westwood. This storefront combines refined minimalism with edgy design elements to create a premium shopping experience.

## Design Philosophy

The storefront embodies a "hype aesthetic with soft UI" approach, featuring:

- **Elegant Typography**: Cormorant Garamond for headings paired with Inter for body text
- **Refined Color Palette**: Charcoal blacks, warm stone neutrals, and soft cream accents
- **Minimal Borders**: Subtle dividers and soft shadows for depth without harshness
- **Editorial Layout**: Clean, spacious designs that let the products shine
- **Smooth Interactions**: Thoughtful animations and transitions throughout

## Features

### Shopping Experience
- **Product Catalog**: Browse curated collections of avant-garde fashion pieces
- **Category Pages**: Dedicated sections for Women's, Men's, New Arrivals, and Sale items
- **Product Detail Pages**: High-quality image galleries with zoom, size selection, and detailed descriptions
- **Smart Search**: Real-time product search with filtering by name, category, and gender
- **Wishlist**: Save favorite items for later with persistent storage
- **Shopping Cart**: Add items, adjust quantities, and proceed to checkout seamlessly

### User Features
- **Account Management**: Login and signup pages for personalized experiences
- **Checkout Flow**: Comprehensive checkout with shipping and payment information
- **Newsletter Signup**: Stay updated with the latest collections and offers

### Content Pages
- **About**: Brand story, philosophy, and values
- **Sustainability**: Commitment to ethical fashion and environmental responsibility
- **Store Locator**: Find physical retail locations
- **Customer Support**: Shipping info, returns policy, FAQ, and care guides
- **Legal**: Privacy policy, terms & conditions, and accessibility statement

### Navigation
- **Responsive Header**: Full navigation with search, wishlist, cart, and account access
- **Mobile Menu**: Touch-friendly navigation for smaller screens
- **Featured Carousel**: Showcase collections with manual navigation
- **Footer**: Comprehensive site map and quick links

## Tech Stack

### Framework & Core
- **Next.js 16**: React framework with App Router and Server Components
- **React 19**: Latest React features including useEffectEvent
- **TypeScript**: Type-safe development

### Styling
- **Tailwind CSS v4**: Utility-first CSS with custom design tokens
- **shadcn/ui**: High-quality, accessible component library
- **Lucide React**: Beautiful, consistent icons

### State Management
- **Zustand**: Lightweight state management for cart and wishlist
- **localStorage**: Persistent storage for user data

### UI Components
- **Embla Carousel**: Smooth, performant carousels
- **Radix UI**: Accessible primitives for dialogs, sheets, and more

### Fonts
- **Cormorant Garamond**: Elegant serif for headings
- **Inter**: Clean sans-serif for body text

## Project Structure

\`\`\`
├── app/
│   ├── about/              # Brand story and values
│   ├── accessibility/      # Accessibility statement
│   ├── care/              # Garment care guide
│   ├── checkout/          # Checkout flow
│   ├── contact/           # Contact page
│   ├── faq/               # Frequently asked questions
│   ├── login/             # User login
│   ├── men/               # Men's collection
│   ├── newarrivals/       # New arrivals collection
│   ├── privacy/           # Privacy policy
│   ├── products/[id]/     # Product detail pages
│   ├── returns/           # Returns policy
│   ├── sale/              # Sale items
│   ├── shipping/          # Shipping information
│   ├── signup/            # User registration
│   ├── stores/            # Store locations
│   ├── sustainability/    # Sustainability commitment
│   ├── terms/             # Terms & conditions
│   ├── women/             # Women's collection
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & design tokens
├── components/
│   ├── cart-sheet.tsx           # Shopping cart sidebar
│   ├── featured-carousel.tsx    # Homepage carousel
│   ├── footer.tsx               # Site footer
│   ├── header.tsx               # Navigation header
│   ├── hero.tsx                 # Homepage hero
│   ├── men-collection.tsx       # Men's products grid
│   ├── new-arrivals-collection.tsx  # New arrivals grid
│   ├── newsletter.tsx           # Newsletter signup
│   ├── product-card.tsx         # Product card component
│   ├── product-details.tsx      # PDP interactive elements
│   ├── product-grid.tsx         # Product grid layout
│   ├── related-products.tsx     # Related items section
│   ├── search-dialog.tsx        # Search modal
│   ├── wishlist-sheet.tsx       # Wishlist sidebar
│   └── women-collection.tsx     # Women's products grid
├── hooks/
│   ├── use-cart.ts        # Cart state management
│   └── use-wishlist.ts    # Wishlist state management
├── lib/
│   ├── products.ts        # Product data and utilities
│   └── utils.ts           # Helper functions
└── public/                # Static assets and images
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd fashion-ecommerce
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
# or
yarn build
yarn start
\`\`\`

## Key Pages

- **/** - Homepage with hero, featured carousel, and product grid
- **/women** - Women's collection with category filtering
- **/men** - Men's collection with category filtering
- **/newarrivals** - Latest products across all categories
- **/products/[id]** - Individual product detail pages
- **/checkout** - Complete checkout flow
- **/about** - Brand story and philosophy
- **/login** & **/signup** - User authentication

## Design Tokens

The application uses a custom design token system defined in `globals.css`:

\`\`\`css
--background: Warm off-white (#faf9f7)
--foreground: Deep charcoal (#1a1a1a)
--primary: Charcoal black (#2a2a2a)
--secondary: Warm stone (#8b7f76)
--accent: Soft terracotta (#c9a88a)
--muted: Light stone (#e8e4df)
--border: Subtle divider (#d4cfc8)
\`\`\`

## Features in Detail

### Cart System
- Add/remove items with size selection
- Quantity adjustment
- Persistent storage across sessions
- Real-time total calculation
- Auto-open on item addition

### Wishlist System
- Toggle items in/out of wishlist
- Heart icon with filled/unfilled states
- Badge counter in navigation
- Persistent storage
- Quick add to cart from wishlist

### Search Functionality
- Real-time filtering as you type
- Search by product name, category, description, or gender
- Visual results with product images
- Direct navigation to product pages

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Collapsible mobile menu
- Optimized layouts for all screen sizes

## Future Enhancements

- User authentication with backend integration
- Order history and tracking
- Product reviews and ratings
- Size guide and fit recommendations
- Advanced filtering and sorting
- Payment gateway integration
- Inventory management
- Admin dashboard

## License

This project is a demonstration storefront for educational purposes.

## Credits

Design inspired by the avant-garde aesthetics of:
- **Isabel Marant** - Effortless Parisian cool
- **Rick Owens** - Dark minimalist luxury
- **Vivienne Westwood** - Punk rebellion meets high fashion
