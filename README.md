# Mobile Dorms - Full Stack Application

A modern, animated full-stack website for a startup that provides foldable mobile dormitory capsules made from repurposed generator boxes, integrated with an app-based booking system and AI-powered demand prediction.

## 🚀 Features

### Frontend
- **Ultra-modern Design**: Clean, futuristic startup aesthetic with dark/light theme support
- **Performance-First Animations**: GPU-accelerated animations using Framer Motion
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Accessibility Compliant**: Respects prefers-reduced-motion and ARIA labels

### Backend
- **RESTful API**: Next.js API routes with comprehensive CRUD operations
- **Database**: Prisma ORM with MongoDB (production-ready)
- **Authentication**: Role-based access control (Admin/User)
- **Rate Limiting**: Built-in API rate limiting (100 requests per 15 minutes)
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Logging**: Structured logging for debugging and monitoring
- **Form Validation**: Zod schema validation for all inputs
- **Admin Dashboard**: Manage bookings, inquiries, and capsules
- **Type Safety**: Full TypeScript coverage

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: High-performance animation library
- **Prisma**: Modern ORM for database management
- **Zod**: Schema validation
- **React Hook Form**: Form management
- **Lucide React**: Modern icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up MongoDB (see MONGODB_SETUP.md for detailed instructions)
# ⚠️ IMPORTANT: Prisma requires MongoDB to run as a replica set
# Option 1: MongoDB Atlas (Cloud - Recommended - Already configured as replica set)
# Option 2: Local MongoDB (Requires replica set setup - use provided scripts)

# For MongoDB Atlas (Easiest):
# 1. Sign up at https://www.mongodb.com/cloud/atlas
# 2. Create a free M0 cluster
# 3. Get your connection string
# 4. Update .env with: DATABASE_URL="mongodb+srv://..."

# For Local MongoDB:
# Windows: Run .\scripts\setup-local-mongodb.ps1 (as Administrator)
# macOS/Linux: Run ./scripts/setup-local-mongodb.sh
# Then use: DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"

# Set up environment variables
# Copy .env.example to .env and update with your MongoDB connection string

# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push

# Seed the database (creates admin user and sample data)
npx prisma db seed

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Admin Credentials
ADMIN_EMAIL="admin@mobiledorms.com"
ADMIN_PASSWORD="admin123"
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── bookings/      # Booking API endpoints
│   │   └── partners/      # Partner inquiry API endpoints
│   ├── admin/             # Admin dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── BookingForm.tsx    # Booking form component
│   ├── PartnerForm.tsx    # Partner inquiry form
│   └── ...                # Other UI components
├── lib/
│   ├── prisma.ts          # Prisma client instance
│   └── validations.ts     # Zod schemas
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Database seed script
```

## 🎨 Website Sections

1. **Hero Section**: Animated fold/transport/deploy sequence
2. **Problem Section**: Accommodation challenges with animated statistics
3. **Solution Section**: Step-by-step transformation process
4. **Product Features**: Animated feature cards
5. **AI-Powered Demand Prediction**: Data visualizations and insights
6. **Booking Platform**: App-style UI with functional booking form
7. **Use Cases**: Industry-specific applications
8. **Sustainability Impact**: Environmental benefits
9. **Partners & Government**: Collaboration opportunities with inquiry form
10. **Call to Action**: Strong conversion-focused section

## 📊 Database Schema (MongoDB)

- **User**: Admin and user accounts with role-based access
- **Booking**: Event booking requests with status tracking
- **PartnerInquiry**: Partner collaboration inquiries
- **Capsule**: Available capsule units with location and pricing

All models include:
- Automatic timestamps (createdAt, updatedAt)
- Indexed fields for optimal query performance
- Relationships between models

## 🔐 Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all booking requests
- View partner inquiries
- Update booking/inquiry status
- Manage the system

## ⚡ Performance Optimizations

- GPU-accelerated animations (transform, opacity only)
- Lazy loading with Intersection Observer
- Throttled scroll animations
- Optimized images and assets
- Code splitting and modular components
- Database query optimization with Prisma

## 🌙 Theme Support

- Light and dark mode
- System preference detection
- Persistent theme selection
- Smooth theme transitions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🎯 API Endpoints

### Bookings
- `POST /api/bookings` - Create a new booking (public)
- `GET /api/bookings` - Get bookings (filtered by email for users, all for admins)
- `GET /api/bookings/[id]` - Get specific booking (admin or owner)
- `PATCH /api/bookings/[id]` - Update booking status (admin only)
- `DELETE /api/bookings/[id]` - Delete booking (admin only)

### Partners
- `POST /api/partners` - Create a partner inquiry (public)
- `GET /api/partners` - Get all inquiries (admin only)
- `GET /api/partners/[id]` - Get specific inquiry (admin only)
- `PATCH /api/partners/[id]` - Update inquiry status (admin only)
- `DELETE /api/partners/[id]` - Delete inquiry (admin only)

### Capsules
- `POST /api/capsules` - Create a new capsule (admin only)
- `GET /api/capsules` - Get all capsules (public, with filters)
- `GET /api/capsules/[id]` - Get specific capsule (public)
- `PATCH /api/capsules/[id]` - Update capsule (admin only)
- `DELETE /api/capsules/[id]` - Delete capsule (admin only)

### Statistics
- `GET /api/stats` - Get dashboard statistics (admin only)

### Authentication
All admin endpoints require authentication via `x-api-key` header or Bearer token.
Set `ADMIN_API_KEY` in your `.env` file.

## 🚀 Deployment

1. Update environment variables for production
2. Run database migrations: `npx prisma migrate deploy`
3. Build the application: `npm run build`
4. Start the server: `npm start`

For production, consider:
- Using PostgreSQL or MySQL instead of SQLite
- Setting up proper authentication
- Adding rate limiting
- Implementing email notifications
- Setting up monitoring and logging

## 📄 License

This project is proprietary and confidential.
