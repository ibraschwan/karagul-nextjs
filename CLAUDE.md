# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Karagül Ajans** is a comprehensive Turkish business directory platform built with Next.js 15 and Supabase, designed as a modern rewrite of the original PHP/Laravel version. The platform connects businesses with potential customers through a searchable, categorized directory with SEO optimization and Turkish-language URL structure.

## Technology Stack

- **Frontend/Backend**: Next.js 15.4.4 with App Router and React 19
- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS)
- **Authentication**: Supabase Auth with role-based access control
- **UI Framework**: Tailwind CSS 4 with TypeScript 5
- **Forms**: React Hook Form 7.61.1 with Zod 4.0.10 validation
- **Icons**: Lucide React 0.525.0
- **HTTP Client**: Axios 1.11.0
- **Deployment**: Configured for Netlify with standalone output

## Development Commands

```bash
# Initial setup
npm install
# Set up environment variables (see .env.local configuration below)

# Development server
npm run dev        # Start Next.js development server (http://localhost:3000)

# Production build and deployment
npm run build      # Build for production (outputs to .next/)
npm run start      # Start production server
npm run lint       # Run ESLint for code quality

# Database operations (via Supabase CLI if configured)
# Note: Database migrations are in supabase/migrations/
```

## Project Architecture

### Next.js App Router Structure
```
app/
├── auth/
│   ├── login/page.tsx         # Turkish URL: /giris via rewrites
│   └── register/page.tsx      # Turkish URL: /kayit via rewrites
├── layout.tsx                 # Root layout with Turkish metadata
├── page.tsx                   # Homepage
└── globals.css               # Global Tailwind styles
```

### Component Organization
```
components/
├── auth/
│   ├── LoginForm.tsx         # Authentication forms
│   └── RegisterForm.tsx
└── layout/
    ├── Header.tsx            # Site navigation
    └── Footer.tsx            # Site footer
```

### Database & Type System
- **Database Schema**: Defined in `supabase/migrations/001_initial_schema.sql`
- **Type Safety**: Auto-generated types in `types/supabase.ts` from Supabase schema
- **Key Models**: Users, Businesses, Categories, Contact Messages, Business Images
- **Role System**: Admin, Business, User roles with RLS policies

## URL Structure & SEO

The application uses Turkish SEO-friendly URLs implemented via Next.js rewrites:

- Homepage: `/`
- Search: `/ara` → `/search`
- Categories: `/kategori/{slug}` → `/category/{slug}`
- Business listings: `/ilan/{city}/{slug}` → `/business/{city}/{slug}`
- Authentication: `/giris` → `/auth/login`, `/kayit` → `/auth/register`
- Dashboard: `/isletme/*` → `/dashboard/*`

### SEO Implementation
- Turkish language meta tags and OpenGraph data
- Structured data ready for LocalBusiness schema
- Security headers (X-Frame-Options, CSP, etc.)
- Image optimization for Supabase storage and placeholder images

## Database Architecture

### Core Relations
- **Users** → **Businesses** (1:many, business owners)
- **Businesses** ↔ **Categories** (many:many via business_categories)
- **Businesses** → **Business Images** (1:many, gallery)
- **Businesses** → **Contact Messages** (1:many, inquiries)
- **Categories** → **Categories** (self-referential for hierarchy)

### Business Workflow
1. User registers with 'business' role via `/kayit`
2. Business creates listing (status: 'pending')
3. Admin approves/rejects via admin panel
4. Approved businesses appear in public directory

### Key Database Features
- Auto-slug generation for businesses and categories
- View tracking with `increment_business_views()` function
- RLS policies enforce role-based data access
- Hierarchical category system with parent-child relationships

## Authentication & Authorization

### Role-Based Access Control
- **Admin**: Full access to all data and admin functions
- **Business**: Can manage their own business listings and view messages
- **User**: Public browsing, no special permissions

### Supabase Integration
- Authentication handled by `lib/supabase.ts` and `lib/auth.ts`
- Server-side user fetching with `getUser()` helper
- Profile management with `getUserProfile()` helper

## Environment Configuration

Required environment variables (`.env.local`):
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://karagulajans.com
```

## Deployment Architecture

### Netlify Configuration (`netlify.toml`)
- Standalone Next.js build output
- Turkish URL redirects mirroring Next.js rewrites
- Security headers (XSS protection, frame options, etc.)
- Static asset caching for performance
- SPA fallback for client-side routing

### Build Configuration
- **Output**: Standalone mode for serverless deployment
- **Image Domains**: Configured for Supabase storage and placeholder.com
- **Security**: Frame options, content type sniffing protection
- **Performance**: Optimized for CDN deployment

## Key Implementation Details

### Type System Architecture
- Comprehensive TypeScript coverage with strict mode
- Auto-generated Supabase types with helper types
- Business and Category models with relationship types
- Form validation schemas using Zod

### SEO & Internationalization
- Turkish language throughout (tr_TR locale)
- Meta title/description system per business/category
- Structured data preparation for rich snippets
- Turkish URL slug generation and validation

### Data Fetching Patterns
- Server components for initial data loading
- Client components for interactive features
- Supabase RLS for secure data access
- Optimistic updates for better UX

## Migration from PHP/Laravel Version

This Next.js version maintains compatibility with the original Laravel database schema while modernizing the frontend architecture. Key architectural improvements:

- **Performance**: App Router with React Server Components
- **Type Safety**: Full TypeScript with generated Supabase types
- **Modern Stack**: Latest React/Next.js with Tailwind CSS 4
- **Simplified Deployment**: Serverless-ready with Netlify integration
- **Enhanced Security**: Built-in Next.js security features + RLS

## Development Guidelines

### Code Organization
- Use App Router conventions for routing and layouts
- Implement server components for data fetching where possible
- Follow React Hook Form + Zod pattern for form validation
- Maintain Turkish language consistency in user-facing content

### Database Operations
- Always use typed Supabase client from `lib/supabase.ts`
- Respect RLS policies - don't bypass with service role key in frontend
- Use helper functions for common operations (user fetching, profile management)
- Test role-based access thoroughly

### Styling & UI
- Follow Tailwind CSS 4 conventions
- Use Lucide React for consistent iconography
- Maintain responsive design principles
- Follow accessibility best practices