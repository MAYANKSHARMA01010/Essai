# WaxHeave - Candle E-commerce Application

## Overview

WaxHeave is a full-stack e-commerce application for selling artisan candles. It's built with a modern technology stack featuring a React frontend with TypeScript, Express.js backend, PostgreSQL database with Drizzle ORM, and integrated Replit authentication. The application provides a complete shopping experience with product browsing, cart management, user authentication, and order processing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for cart state, React Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL store

### Database Design
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Shared TypeScript schema definitions
- **Tables**: Users, products, addresses, orders, order items, cart items, sessions
- **Validation**: Zod schemas for type-safe data validation

## Key Components

### Authentication System
- **Provider**: Replit OpenID Connect for secure authentication
- **Session Storage**: PostgreSQL-based session store
- **User Management**: Automatic user creation and profile management
- **Authorization**: Route-level authentication checks

### Product Management
- **Catalog**: Comprehensive product database with categories, types, and pricing
- **Filtering**: Product filtering by scent type, wax type, and search terms
- **Images**: External image hosting with fallback support
- **Inventory**: Stock tracking and availability management

### Shopping Cart
- **Storage**: Browser-based persistence with Zustand
- **Sync**: Server-side cart synchronization for authenticated users
- **Management**: Add, remove, update quantity operations
- **Checkout**: Integration with order processing system

### Order Processing
- **Address Management**: Multiple shipping addresses per user
- **Order Creation**: Atomic order creation with item details
- **Order History**: Complete order tracking and history
- **Payment Integration**: Prepared for payment processor integration

## Data Flow

### User Authentication Flow
1. User clicks login → Redirected to Replit OAuth
2. OAuth callback → User profile created/updated
3. Session established → User authenticated across requests
4. Frontend receives user data → UI updates accordingly

### Shopping Flow
1. Browse products → Filter and search functionality
2. Add to cart → Local storage + server sync
3. Proceed to checkout → Address selection/creation
4. Order confirmation → Database transaction
5. Order completion → Cart cleared, confirmation displayed

### Data Synchronization
- **Cart State**: Local Zustand store syncs with server for authenticated users
- **User Preferences**: Addresses and order history stored server-side
- **Product Data**: Cached on client with React Query for optimal performance

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-kit for migrations
- **Authentication**: openid-client for Replit OAuth integration
- **UI**: Extensive Radix UI component library
- **Validation**: Zod for runtime type checking
- **State Management**: @tanstack/react-query and zustand

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Database Management**: Drizzle Kit for schema management
- **Session Storage**: connect-pg-simple for PostgreSQL sessions
- **Error Handling**: @replit/vite-plugin-runtime-error-modal

## Deployment Strategy

### Development Environment
- **Server**: tsx for TypeScript execution in development
- **Client**: Vite dev server with HMR
- **Database**: Managed PostgreSQL instance
- **Port Configuration**: Server on 5000, client proxied through Vite

### Production Build
- **Frontend**: Vite build to static assets in dist/public
- **Backend**: esbuild bundle to dist/index.js
- **Database**: Production PostgreSQL with connection pooling
- **Deployment**: Replit autoscale deployment target

### Environment Configuration
- **Database**: DATABASE_URL environment variable
- **Authentication**: REPL_ID, SESSION_SECRET, ISSUER_URL
- **Sessions**: PostgreSQL-based session storage
- **CORS**: Configured for Replit domains

## Changelog

```
Changelog:
- June 18, 2025. Initial setup
- June 18, 2025. Enhanced design and expanded catalog:
  * Added 25+ new products across multiple categories (luxury, seasonal, gift sets, travel, wellness)
  * Improved product cards with hover effects, wishlist functionality, star ratings, and category badges
  * Enhanced landing page with collections preview, customer reviews, and stats section
  * Added interactive elements and better visual hierarchy
  * Expanded filtering system with new categories
  * Improved responsive design and user experience
- June 18, 2025. Complete UI/UX Flow Enhancement:
  * Enhanced color scheme with warm amber gradients and candle-inspired palette
  * Added comprehensive animations: flicker effects, glow pulses, floating elements, gradient shifts
  * Implemented advanced cart synchronization between local storage and server
  * Created complete phone authentication flow with OTP verification
  * Enhanced product cards with premium badges, wishlist functionality, and interactive elements
  * Improved cart component with free shipping indicators and enhanced styling
  * Added dark mode support with theme provider
  * Enhanced header with authentication status indicators and cart synchronization feedback
  * Improved loading states with branded skeleton animations
  * Enhanced mobile responsiveness across all components
  * Added comprehensive search and filtering experience
  * Integrated authentication state management throughout the application
- June 18, 2025. New Brand Color Theme & Complete Page Structure:
  * Implemented custom brand color palette based on user-provided purple/pink gradient theme
  * Created global semantic color system for easy future customization
  * Added comprehensive utility classes for brand colors with hover and focus states
  * Built complete page structure: FAQ, Terms of Service, Privacy Policy, and Blog pages
  * Updated navigation system with all new pages and fixed routing issues
  * Enhanced header component with new brand colors and proper Link usage
  * Added 16 premium candle products to database with authentic product data
  * Created cohesive brand identity throughout the application
  * Implemented gradient utilities and animation effects with new color system
- June 18, 2025. Exact Color Palette Implementation:
  * Applied user's exact hex color palette: #0C0430, #503C54, #7B466A, #9F6460, #D39780, #EA638F
  * Created comprehensive color documentation system with step-by-step customization guide
  * Built semantic color mapping for easy role assignment changes
  * Added COLOR_CUSTOMIZATION.md guide for future theme modifications
  * Enhanced CSS with detailed comments for easy color system maintenance
  * Tested color consistency across light and dark modes
- June 18, 2025. Pastel Color Theme Implementation:
  * Switched to soft pastel palette: Lemon Chiffon (#FBF8CC), Champagne Pink (#FDE4CF), Baby Pink (#FFCFD2), Pink Lavender (#F1C0E8), Lavender Blue (#CFBAF0), Baby Blue Eyes (#A3C4F3)
  * Updated semantic color roles to match suggested usage patterns
  * Enhanced dark mode with muted pastel variants for better contrast
  * Updated gradient utilities for soft color transitions
  * Refreshed COLOR_CUSTOMIZATION.md with new palette documentation
  * Maintained global color system architecture for easy future customization
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```