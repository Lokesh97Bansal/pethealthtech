# PetStories Platform

## Overview

PetStories is a modern full-stack web application that allows pet owners to share heartwarming stories about their beloved companions. The platform features a beautiful, responsive design with smooth animations and provides functionality for users to submit stories for review and browse approved content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Query (TanStack Query) for server state management
- **Animations**: Framer Motion for smooth UI transitions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Request Logging**: Custom middleware for API request monitoring
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM for type-safe database operations
- **Hosting**: Neon Database (serverless PostgreSQL)
- **Development Storage**: In-memory storage implementation for development/testing
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Database Schema
- **Users Table**: Basic user authentication structure (username, password)
- **Stories Table**: Pet story submissions with fields for:
  - Owner and pet information (name, type)
  - Story content and category
  - Optional photo URL
  - Approval status and timestamps

### API Endpoints
- `GET /api/stories` - Retrieve all approved stories
- `POST /api/stories` - Submit a new story for review

### Frontend Components
- **Navigation**: Responsive header with smooth scrolling
- **Hero Section**: Full-screen landing with call-to-action
- **Pet Carousel**: Animated showcase of pet images
- **Story Features**: Category-based story browsing
- **Featured Stories**: Display of approved content
- **Submission Form**: Multi-step form with validation
- **Footer**: Site links and information

## Data Flow

1. **Story Submission**: Users fill out the submission form → Form validation via Zod → API request to backend → Story saved with approval status false
2. **Story Display**: Frontend requests approved stories → Backend filters by approval status → Stories rendered in UI
3. **Real-time Updates**: React Query handles caching and refetching of story data

## External Dependencies

### UI & Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide React for iconography

### Development Tools
- Vite with React plugin
- TypeScript for type safety
- ESBuild for production builds
- PostCSS with Autoprefixer

### Database & Validation
- Drizzle ORM with Zod integration
- Neon Database serverless driver
- React Hook Form resolvers

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Concurrent Vite dev server and Express API
- **Production Build**: `npm run build` - Vite build + ESBuild bundling for server
- **Type Checking**: `npm run check` - TypeScript compilation verification

### Database Management
- **Schema Updates**: `npm run db:push` - Push schema changes to database
- **Migrations**: Automated via Drizzle Kit configuration

### Environment Configuration
- DATABASE_URL required for PostgreSQL connection
- Vite handles client-side environment variables
- Express server configured for production and development modes

## Changelog
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.