# Founder Portfolio - Next.js Production Setup

## Quick Start

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest founder-portfolio --typescript --tailwind --app --no-src-dir

cd founder-portfolio

# Install dependencies
npm install lucide-react
npm install -D @types/node
```

---

## Project Structure

```
founder-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Tailwind imports
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Companies.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Achievements.tsx
│       ├── Education.tsx
│       ├── Testimonials.tsx
│       └── Contact.tsx
├── public/
│   ├── profile.jpg         # Your professional headshot
│   ├── og-image.jpg        # Open Graph image (1200x630)
│   └── documents/
│       ├── resume.pdf
│       └── press-kit.pdf
├── lib/
│   └── data.ts             # Content data (companies, projects, etc.)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Configuration Files

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
```

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // For static export (optional)
  // output: 'export',
}

module.exports = nextConfig
```

---

## Core Files

### `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Your Name — Founder & Software Engineer',
  description: 'Founder building AI-powered SaaS products. Track record of shipping products that scale.',
  keywords: ['founder', 'software engineer', 'AI', 'SaaS', 'entrepreneur'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name — Founder & Software Engineer',
    description: 'Founder building AI-powered SaaS products.',
    url: 'https://yourname.com',
    siteName: 'Your Name',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name — Founder & Software Engineer',
    description: 'Founder building AI-powered SaaS products.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

### `app/page.tsx`

```typescript
import Hero from './components/Hero'
import About from './components/About'
import Companies from './components/Companies'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Education from './components/Education'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Companies />
      <Projects />
      <Skills />
      <Achievements />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="/privacy" className="hover:text-gray-900">Privacy</a>
          <a href="/terms" className="hover:text-gray-900">Terms</a>
          <a href="/documents/resume.pdf" className="hover:text-gray-900">Resume (PDF)</a>
        </div>
      </div>
    </footer>
  )
}
```

### `app/components/Navigation.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-xl font-semibold">YN</a>
        <div className="flex gap-8 text-sm">
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About</a>
          <a href="#companies" className="text-gray-600 hover:text-gray-900 transition">Companies</a>
          <a href="#projects" className="text-gray-600 hover:text-gray-900 transition">Projects</a>
          <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
        </div>
      </div>
    </nav>
  )
}
```

### `app/components/Hero.tsx`

```typescript
import Image from 'next/image'
import { Mail, Linkedin, Github } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/profile.jpg"
            alt="Your Name"
            width={128}
            height={128}
            className="rounded-full mx-auto object-cover border-2 border-gray-200"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
          Your Name
        </h1>
        <p className="text-2xl text-gray-600 mb-6">
          Founder & Software Engineer
        </p>

        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Building AI-powered SaaS products that scale.<br/>
          Currently: <span className="font-medium">Company Name</span> | Previously: <span className="font-medium">Notable Role</span>
        </p>

        <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-10">
          <span>📍 San Francisco, CA</span>
          <span>•</span>
          <span>Open to partnerships</span>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="mailto:you@example.com"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <Mail size={18} />
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center gap-2"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
```

### `app/components/Companies.tsx`

```typescript
import { companies } from '@/lib/data'
import { ExternalLink } from 'lucide-react'

export default function Companies() {
  return (
    <section id="companies" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          Companies & Ventures
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: company.color }}
                >
                  {company.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <span
                    className={`text-sm font-medium ${
                      company.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {company.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{company.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <p>Founded: {company.founded}</p>
                {company.users && <p>Users: {company.users}</p>}
                <p className="font-mono text-xs">{company.tech}</p>
              </div>

              {company.url && (
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-primary hover:underline text-sm"
                >
                  View product <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `lib/data.ts`

```typescript
// Centralized content data for easy updates

export const companies = [
  {
    id: 1,
    name: 'Company One',
    logo: 'C1',
    color: '#0A0A0A',
    status: 'Active',
    description: 'AI-powered automation platform for enterprise workflows.',
    founded: '2024',
    users: '5,000+',
    tech: 'Next.js • Python • PostgreSQL',
    url: 'https://company1.com',
  },
  {
    id: 2,
    name: 'Company Two',
    logo: 'C2',
    color: '#2563EB',
    status: 'Active',
    description: 'Developer tools for faster API integration testing.',
    founded: '2023',
    users: '12,000+',
    tech: 'TypeScript • React • Node.js',
    url: 'https://company2.com',
  },
  {
    id: 3,
    name: 'Company Three',
    logo: 'C3',
    color: '#9CA3AF',
    status: 'Archived',
    description: 'Mobile analytics platform (acquired 2022).',
    founded: '2021',
    users: null,
    tech: 'React Native • Firebase',
    url: null,
  },
]

export const projects = [
  {
    id: 1,
    title: 'AI Document Parser',
    tags: ['Python', 'OpenAI API', 'PostgreSQL'],
    problem: 'Enterprise clients needed to extract structured data from unstructured legal documents at scale.',
    solution: 'Built an AI-powered extraction pipeline using GPT-4 with custom prompt engineering and validation layers, processing 10,000+ documents daily with 98% accuracy.',
    impact: 'Reduced document processing time from 4 hours to 3 minutes per document. Deployed to 15 enterprise clients.',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/yourname/project',
  },
  // Add more projects...
]

export const testimonials = [
  {
    id: 1,
    quote: '[Your Name] is one of the most technically capable founders I've worked with. Their ability to ship production-grade software at speed is rare.',
    author: 'John Doe',
    role: 'Partner at Sequoia Capital',
    avatar: '/avatars/john.jpg',
  },
  // Add more testimonials...
]
```

---

## SEO & Performance

### Add Structured Data

Create `app/components/StructuredData.tsx`:

```typescript
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    jobTitle: 'Founder & Software Engineer',
    url: 'https://yourname.com',
    sameAs: [
      'https://linkedin.com/in/yourname',
      'https://github.com/yourname',
      'https://twitter.com/yourname',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Company Name',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Stanford University',
    },
    knowsAbout: ['AI', 'SaaS', 'Software Engineering', 'Entrepreneurship'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

Add to `app/layout.tsx` inside `<body>`:

```typescript
<StructuredData />
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Build for Production

```bash
npm run build
npm run start
```

---

## Performance Checklist

✅ Use `next/image` for all images (automatic WebP/AVIF)
✅ Minimize client-side JavaScript (use Server Components)
✅ Add proper caching headers
✅ Enable compression (automatic on Vercel)
✅ Lazy load below-the-fold content
✅ Use font optimization (`next/font`)
✅ Add sitemap.xml (create `app/sitemap.ts`)
✅ Add robots.txt (create `app/robots.ts`)

---

## Custom Domain Setup

1. Buy domain (Namecheap, Google Domains)
2. Add domain in Vercel dashboard
3. Update DNS records (A/CNAME)
4. Enable HTTPS (automatic)

---

## Content Update Workflow

1. Update `lib/data.ts` for companies/projects
2. Update component files for copy changes
3. Replace images in `/public/`
4. Test locally: `npm run dev`
5. Deploy: `git push` (auto-deploy on Vercel)

---

## Analytics (Optional)

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

// Inside <body>
<Analytics />
```

### Privacy-first Alternative: Plausible

```bash
npm install next-plausible
```

---

## Immigration/Legal Use

For professional credibility documentation:

1. Create `/public/documents/` folder
2. Add PDFs: resume, recommendation letters, press mentions
3. Link from "Media" section
4. Ensure all claims are verifiable (link to evidence)
5. Use professional email domain (not Gmail)

---

## Maintenance

Monthly tasks:
- Update project metrics
- Add new testimonials
- Refresh achievements
- Check broken links
- Update dependencies: `npm update`

---

## Support

Questions? Create an issue or contact [your@email.com]
