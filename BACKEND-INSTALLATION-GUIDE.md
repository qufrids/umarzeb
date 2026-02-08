# 🚀 Complete Backend Installation Guide

Step-by-step guide to set up your Next.js Full Stack portfolio backend.

---

## ⏱️ Time Required: 30-45 minutes

---

## 📋 Prerequisites

- [x] Node.js 18+ installed
- [x] Git installed
- [x] GitHub account
- [x] Vercel account (free)
- [x] Code editor (VS Code recommended)

---

## 🎯 What You'll Build

- ✅ Contact form with email notifications
- ✅ Blog/CMS system
- ✅ Admin dashboard
- ✅ Analytics tracking
- ✅ Settings management

---

## 📦 Step 1: Create Next.js Project

```bash
# Create new project
npx create-next-app@latest portfolio-backend \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# Navigate to project
cd portfolio-backend
```

**Options selected:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ App Router: Yes
- ✅ Import alias: Yes (@/*)

---

## 📦 Step 2: Install Dependencies

```bash
# Core dependencies
npm install @prisma/client prisma next-auth@beta resend zod

# Supabase (database & storage)
npm install @supabase/supabase-js

# Forms & Validation
npm install react-hook-form @hookform/resolvers

# UI & Charts
npm install recharts date-fns lucide-react

# Dev dependencies
npm install -D @types/node @types/react

# Optional: Rich text editor
npm install @tiptap/react @tiptap/starter-kit
```

---

## 🗄️ Step 3: Set Up Database (Supabase)

### 3.1 Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - **Name**: `portfolio-backend`
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Wait 2-3 minutes for setup

### 3.2 Get Database URL

1. Go to Project Settings → Database
2. Copy "Connection string" under "URI"
3. Replace `[YOUR-PASSWORD]` with your database password

Example:
```
postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### 3.3 Create `.env.local`

Create a file named `.env.local` in your project root:

```env
# Database
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Resend (Email)
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="contact@umarzeb.com"
EMAIL_TO="contact@umarzeb.com"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Admin Credentials
ADMIN_EMAIL="contact@umarzeb.com"
ADMIN_PASSWORD="your-secure-password-here"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🗄️ Step 4: Initialize Prisma

### 4.1 Initialize Prisma

```bash
npx prisma init
```

### 4.2 Copy Prisma Schema

Copy the contents of `prisma-schema.prisma` (that I created) into `prisma/schema.prisma`

### 4.3 Create Database Tables

```bash
# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 4.4 Seed Initial Data (Optional)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Umar Zeb',
      email: process.env.ADMIN_EMAIL || 'contact@umarzeb.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create initial settings
  await prisma.settings.create({
    data: {
      key: 'site',
      value: {
        title: 'Umar Zeb - AI Engineer',
        description: 'Building AGI Systems',
        url: 'https://umarzeb.com',
      },
    },
  });

  console.log('✅ Settings created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.disconnect();
  });
```

Run seed:
```bash
npx prisma db seed
```

---

## 📧 Step 5: Set Up Email (Resend)

### 5.1 Create Resend Account

1. Go to https://resend.com/
2. Sign up with GitHub
3. Verify your email

### 5.2 Verify Domain (For Production)

1. Go to "Domains" → "Add Domain"
2. Enter: `umarzeb.com`
3. Add DNS records to your domain:
   ```
   TXT record: @ → resend_verification_code
   MX record: @ → resend.mx (Priority: 10)
   ```
4. Wait for verification (5-10 minutes)

### 5.3 Get API Key

1. Go to "API Keys"
2. Click "Create API Key"
3. Name: `Portfolio Backend`
4. Copy the key → Add to `.env.local`

**For Testing (No Domain):**
Use `onboarding@resend.dev` as `EMAIL_FROM` during development.

---

## 📁 Step 6: Create Project Structure

Copy all the API route files I created into your project:

```
portfolio-backend/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          ← api-contact-route.ts
│   │   ├── blog/
│   │   │   ├── route.ts          ← api-blog-route.ts
│   │   │   └── [slug]/
│   │   │       └── route.ts
│   │   └── analytics/
│   │       └── route.ts          ← api-analytics-route.ts
│   ├── dashboard/
│   │   └── page.tsx              ← admin-dashboard-page.tsx
│   └── layout.tsx
├── lib/
│   ├── db.ts                     ← Create Prisma client
│   └── utils.ts
├── prisma/
│   ├── schema.prisma             ← prisma-schema.prisma
│   └── seed.ts
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

### Create `lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 🎨 Step 7: Update Tailwind Config

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: '#0f172a',
        darker: '#020617',
      },
    },
  },
  plugins: [],
};

export default config;
```

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-darker text-white;
  }
}

@layer components {
  .glass {
    @apply bg-dark/70 backdrop-blur-xl border border-white/10;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }
}
```

---

## 🧪 Step 8: Test Locally

### 8.1 Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 8.2 Test API Endpoints

**Test Contact Form:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**Test Analytics:**
```bash
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/",
    "title": "Home Page",
    "visitorId": "test-visitor-123"
  }'
```

### 8.3 View Database

```bash
npx prisma studio
```

Opens a GUI at http://localhost:5555 to view your database.

---

## 🚀 Step 9: Deploy to Vercel

### 9.1 Push to GitHub

```bash
git add .
git commit -m "Initial backend setup"
git push origin main
```

### 9.2 Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add Environment Variables:
   - Copy ALL variables from `.env.local`
   - Add them in "Environment Variables" section
4. Click "Deploy"

### 9.3 Run Migrations on Production

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migration
vercel env pull .env.production
npx prisma migrate deploy
```

---

## ✅ Step 10: Verify Everything Works

### Production Checklist:

- [ ] Website loads: https://your-site.vercel.app
- [ ] Contact form submits successfully
- [ ] Email notifications arrive
- [ ] Admin dashboard accessible: /dashboard
- [ ] Blog API returns data: /api/blog
- [ ] Analytics tracking works: Check `/dashboard/analytics`
- [ ] Database connected (check Supabase dashboard)

---

## 🎯 Next Steps

1. **Integrate with Your Portfolio**
   - Copy your `index.html` content into `app/page.tsx`
   - Convert HTML to React components
   - Add contact form integration

2. **Create Admin Pages**
   - Blog editor: `/dashboard/blog/new`
   - Message inbox: `/dashboard/messages`
   - Analytics dashboard: `/dashboard/analytics`
   - Settings panel: `/dashboard/settings`

3. **Add Authentication**
   - Set up NextAuth.js
   - Protect admin routes
   - Add login page

4. **Enhance Features**
   - Rich text editor for blog
   - Image uploads (Supabase Storage)
   - Email templates
   - SEO optimization

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Resend Docs**: https://resend.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Check DATABASE_URL in `.env.local`
- Verify Supabase project is running
- Check firewall/network settings

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### Error: "Email not sending"
- Check RESEND_API_KEY is correct
- Verify domain is verified (or use onboarding@resend.dev for testing)
- Check email quota (3000/month on free tier)

### Error: "Module not found"
```bash
npm install
npx prisma generate
```

---

## 🎉 Congratulations!

You now have a fully functional backend for your portfolio with:
- ✅ Contact form with email notifications
- ✅ Blog/CMS system
- ✅ Analytics tracking
- ✅ Admin dashboard
- ✅ Database integration
- ✅ Deployed on Vercel

Need help? Let me know! 🚀
