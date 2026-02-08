# 🚀 Next.js Full Stack Backend Setup Guide

Complete backend setup for your AI Engineer Portfolio with:
- ✅ Contact Form with Email Notifications
- ✅ Blog/CMS System
- ✅ Analytics Dashboard
- ✅ Admin Panel with Authentication
- ✅ Settings Management

---

## 📋 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL (via Supabase - free tier)
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **Email**: Resend (free 3000 emails/month)
- **Storage**: Supabase Storage (images, files)
- **Analytics**: Vercel Analytics + Custom tracking
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 🏗️ Project Structure

```
portfolio-fullstack/
├── app/
│   ├── (public)/              # Public-facing pages
│   │   ├── page.tsx           # Home (your portfolio)
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/        # Individual blog post
│   │   └── contact/           # Contact page
│   ├── (admin)/               # Admin panel (protected)
│   │   └── dashboard/
│   │       ├── page.tsx       # Dashboard overview
│   │       ├── blog/          # Blog management
│   │       ├── messages/      # Contact form submissions
│   │       ├── analytics/     # Analytics dashboard
│   │       └── settings/      # Site settings
│   ├── api/
│   │   ├── auth/              # NextAuth endpoints
│   │   ├── contact/           # Contact form API
│   │   ├── blog/              # Blog CRUD APIs
│   │   ├── analytics/         # Analytics API
│   │   └── settings/          # Settings API
│   └── layout.tsx
├── components/
│   ├── admin/                 # Admin components
│   ├── blog/                  # Blog components
│   ├── forms/                 # Form components
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── db.ts                  # Prisma client
│   ├── auth.ts                # Auth configuration
│   └── utils.ts               # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
├── .env.local                 # Environment variables
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗄️ Database Schema

### Tables:
1. **users** - Admin users
2. **blog_posts** - Blog articles
3. **projects** - Portfolio projects
4. **messages** - Contact form submissions
5. **analytics** - Page views, events
6. **settings** - Site configuration

---

## 📦 Installation Steps

### 1. Create Next.js Project
```bash
npx create-next-app@latest portfolio-fullstack --typescript --tailwind --app
cd portfolio-fullstack
```

### 2. Install Dependencies
```bash
npm install @prisma/client prisma next-auth@beta resend
npm install @supabase/supabase-js
npm install react-hook-form zod
npm install @tanstack/react-query
npm install recharts date-fns
npm install -D @types/node
```

### 3. Set Up Supabase (Database)
1. Go to https://supabase.com/dashboard
2. Create new project
3. Copy database URL from Settings → Database
4. Add to `.env.local`

### 4. Configure Environment Variables
Create `.env.local`:
```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl"

# Resend (Email)
RESEND_API_KEY="re_..."
EMAIL_FROM="contact@umarzeb.com"
EMAIL_TO="contact@umarzeb.com"

# Supabase (Optional for Storage)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# Admin Credentials
ADMIN_EMAIL="contact@umarzeb.com"
ADMIN_PASSWORD="your-secure-password"

# Analytics
VERCEL_ANALYTICS_ID="..."
```

### 5. Initialize Prisma
```bash
npx prisma init
```

---

## 🎯 Quick Start (5 Minutes)

I'll create all the files for you. Here's what we'll build:

1. **Contact Form Backend** → Sends emails via Resend
2. **Blog System** → Create, edit, publish blog posts
3. **Admin Dashboard** → Manage everything
4. **Analytics** → Track page views, visitors
5. **Settings Panel** → Update site info

---

## 🔐 Security Features

- ✅ Authentication with NextAuth.js
- ✅ Protected API routes
- ✅ CSRF protection
- ✅ Rate limiting on contact form
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection

---

## 📧 Email Setup (Resend)

1. Go to https://resend.com/
2. Sign up with GitHub
3. Verify domain: umarzeb.com
4. Get API key
5. Add to `.env.local`

Free tier: 3,000 emails/month

---

## 🚀 Deployment Checklist

- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel
- [ ] Set up Supabase production database
- [ ] Run `npx prisma migrate deploy`
- [ ] Test contact form
- [ ] Test admin login
- [ ] Enable Vercel Analytics

---

## 📱 Features Overview

### Contact Form
- Name, Email, Message fields
- Email notifications
- Store in database
- Anti-spam protection
- View submissions in admin panel

### Blog/CMS
- Rich text editor (Markdown)
- Draft/Published status
- Tags & categories
- SEO meta fields
- Image uploads
- Slug generation

### Analytics
- Page views
- Unique visitors
- Popular pages
- Traffic sources
- Custom events
- Real-time dashboard

### Admin Panel
- Login/logout
- Dashboard overview
- Manage blog posts
- View contact messages
- Analytics reports
- Update settings

### Settings
- Site title & description
- Social media links
- Contact information
- SEO settings
- Feature toggles

---

## 🎨 UI Components

- Dark theme admin panel (matches your portfolio)
- Responsive design
- Toast notifications
- Loading states
- Error handling
- Form validation

---

## 🔄 API Endpoints

### Public APIs
- `POST /api/contact` - Submit contact form
- `GET /api/blog` - List blog posts
- `GET /api/blog/[slug]` - Get single post
- `POST /api/analytics/track` - Track page view

### Protected APIs (Admin only)
- `POST /api/blog/create` - Create blog post
- `PUT /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Delete blog post
- `GET /api/messages` - Get contact submissions
- `GET /api/analytics` - Get analytics data
- `PUT /api/settings` - Update settings

---

## 📊 Admin Dashboard Features

1. **Overview**
   - Total visitors (last 30 days)
   - New messages
   - Published blog posts
   - Quick stats

2. **Blog Management**
   - Create new post
   - Edit/delete posts
   - View drafts
   - Publish/unpublish

3. **Messages**
   - View all submissions
   - Mark as read/unread
   - Reply via email
   - Delete messages

4. **Analytics**
   - Page views chart
   - Top pages
   - Traffic sources
   - Device breakdown

5. **Settings**
   - Site info
   - Social links
   - Email settings
   - SEO config

---

## 🎯 Next Steps

Ready to build? I'll create all the files for you:

1. Database schema (Prisma)
2. API routes (Contact, Blog, etc.)
3. Admin panel components
4. Authentication setup
5. Integration with your existing portfolio

**Estimated time to complete**: 30-45 minutes

Should I proceed with creating all the files? 🚀
