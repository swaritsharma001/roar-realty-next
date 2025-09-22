# ROAR Properties - Luxury Real Estate Platform

## Overview

ROAR Properties is a luxury real estate platform specializing in premium properties in Dubai. The platform consists of a Next.js-based customer-facing website and a Vite React-based admin interface, backed by a Node.js/Express API with MongoDB. The system enables property discovery, viewing, and management with AI-powered chat assistance, Google OAuth authentication, and comprehensive admin controls.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Dual Frontend Strategy**: The project employs two separate frontend applications:
- **Next.js Application**: Customer-facing website with SSR/SSG for SEO optimization, property listings, and user interactions
- **Vite React Application**: Admin dashboard for content management, property administration, and team management

**Component Architecture**: Both frontends use a component-based architecture with shadcn/ui components, providing consistent design patterns and reusable UI elements. The system implements lazy loading for performance optimization and skeleton loaders for improved user experience.

**State Management**: Uses React Query (TanStack Query) for server state management, providing caching, synchronization, and background updates for API data.

**Styling Framework**: Tailwind CSS with custom design tokens for luxury branding, including gold/luxury color schemes and elegant shadow effects.

### Backend Architecture

**API Design**: RESTful Express.js API with modular routing structure separating concerns into user management, property data, page content, team management, and AI chat functionality.

**Database Layer**: MongoDB with Mongoose ODM for data modeling, supporting property listings, user profiles, team members, and page content management.

**Authentication System**: Implements Google OAuth 2.0 with Passport.js for user authentication and JWT tokens for session management. Role-based access control distinguishes between regular users and administrators.

**File Upload**: Cloudinary integration for image storage and management, supporting property photos and team member images.

### Data Storage Solutions

**Primary Database**: MongoDB Atlas for all application data including properties, users, team members, and page content.

**Image Storage**: Cloudinary CDN for optimized image delivery with automatic format conversion and responsive sizing.

**Session Management**: Express sessions with JWT tokens stored in cookies for client-side authentication state.

### Authentication and Authorization

**OAuth Integration**: Google OAuth 2.0 for seamless user login without password management.

**Role-Based Access**: Two-tier authorization system with "user" and "admin" roles, where admins can manage content, properties, and team members.

**Token Security**: JWT tokens with configurable expiration and secure HTTP-only cookie storage.

### Performance Optimizations

**Image Optimization**: Next.js Image component with custom optimization settings including WebP/AVIF formats, multiple device sizes, and quality tiers.

**Code Splitting**: Lazy loading implementation for React components and pages to reduce initial bundle size.

**Caching Strategy**: Browser caching headers and API response caching with React Query for improved performance.

**SEO Optimization**: Server-side rendering with dynamic meta tags, sitemap generation, and robots.txt configuration.

## External Dependencies

### Core Frameworks
- **Next.js**: React framework for the customer website with SSR/SSG capabilities
- **Vite**: Build tool and development server for the admin interface
- **Express.js**: Backend API framework
- **MongoDB/Mongoose**: Database and ODM for data persistence

### Authentication Services
- **Google OAuth 2.0**: Primary authentication provider
- **Passport.js**: Authentication middleware for Node.js

### UI and Design
- **Radix UI**: Headless UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library built on Radix UI

### External APIs and Services
- **Cloudinary**: Image storage, optimization, and CDN delivery
- **OpenAI/Google Generative AI**: AI-powered chat assistant for property inquiries
- **Google Maps**: Interactive maps for property location display

### Development and Build Tools
- **TypeScript**: Type safety across frontend and backend
- **ESLint**: Code linting and quality enforcement
- **React Query**: Server state management and caching
- **Axios**: HTTP client for API communications

### Deployment and Performance
- **Vercel**: Hosting platform with automatic deployments
- **PostCSS/Autoprefixer**: CSS processing and browser compatibility
- **Image optimization**: Multiple formats and responsive sizing support