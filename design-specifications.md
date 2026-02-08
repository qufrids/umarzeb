# Founder Portfolio — Design Specifications

## Visual Design System

### Color Palettes

#### Light Theme (Primary)
```
Background:     #FFFFFF
Text Primary:   #0A0A0A
Text Secondary: #6B7280
Accent:         #2563EB (Blue)
Border:         #E5E7EB
Hover:          #F9FAFB
Success:        #10B981 (Green - for "Active" status)
Muted:          #9CA3AF
```

#### Dark Theme (Alternative)
```
Background:     #0A0A0A
Text Primary:   #F9FAFB
Text Secondary: #9CA3AF
Accent:         #3B82F6 (Lighter blue for contrast)
Border:         #1F2937
Hover:          #111827
Success:        #34D399
Card BG:        #111827
```

---

### Typography

#### Font Stack
```css
Primary: Inter (400, 500, 600, 700)
Mono:    JetBrains Mono (400, 500)
Fallback: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

#### Type Scale
```
Hero H1:        64px / line-height: 1.1 / weight: 600 / letter-spacing: -0.02em
Section H2:     42px / line-height: 1.2 / weight: 600 / letter-spacing: -0.01em
Subsection H3:  28px / line-height: 1.3 / weight: 600
Card Title:     20px / line-height: 1.4 / weight: 600
Body Large:     18px / line-height: 1.7 / weight: 400
Body:           16px / line-height: 1.7 / weight: 400
Small:          14px / line-height: 1.5 / weight: 400
Tiny:           12px / line-height: 1.4 / weight: 400
Tech Stack:     13px / line-height: 1.4 / weight: 400 / font-family: mono
```

#### Responsive Type
```
Mobile (< 768px):
  H1: 48px
  H2: 32px
  H3: 22px
  Body: 16px

Tablet (768px - 1024px):
  H1: 56px
  H2: 36px
  H3: 24px
  Body: 17px

Desktop (> 1024px):
  H1: 64px
  H2: 42px
  H3: 28px
  Body: 18px
```

---

### Spacing System

```
Section Padding:   120px vertical (mobile: 80px)
Container Max:     1200px (Companies: 1280px, Content: 768px)
Section Gap:       120px
Card Padding:      32px (mobile: 24px)
Element Gap:       16px, 24px, 32px (use 8px increments)
Grid Gap:          24px
```

---

### Layout Components

#### Navigation Bar
```
Height: 64px
Position: Fixed, top
Background: White with 80% opacity + backdrop blur
Border: 1px solid #E5E7EB (bottom)
Shadow: 0 1px 3px rgba(0,0,0,0.05) (on scroll)
Z-index: 50

Logo:
  Font size: 20px
  Font weight: 600

Links:
  Font size: 14px
  Color: #6B7280
  Hover: #0A0A0A
  Gap: 32px
```

#### Cards (Companies, Projects)
```
Border: 1px solid #E5E7EB
Border radius: 12px
Padding: 32px (24px mobile)
Background: #FFFFFF
Shadow (default): none
Shadow (hover): 0 4px 12px rgba(0,0,0,0.08)
Transition: all 0.2s ease

Hover state:
  Transform: translateY(-4px)
  Border color: #D1D5DB
```

#### Buttons

**Primary Button:**
```
Background: #0A0A0A
Text: #FFFFFF
Padding: 12px 24px
Border radius: 8px
Font size: 14px
Font weight: 500
Hover: #1F2937
Transition: background 0.2s ease
```

**Secondary Button:**
```
Background: transparent
Text: #0A0A0A
Border: 1px solid #E5E7EB
Padding: 12px 24px
Border radius: 8px
Hover: border #D1D5DB
```

**Icon Buttons:**
```
Size: 40px × 40px
Border radius: 8px
Icon size: 18px
```

#### Tech Stack Badges
```
Background: #F3F4F6
Text: #374151
Padding: 6px 12px
Border radius: 9999px (full)
Font size: 12px
Font weight: 500
Gap: 8px
```

#### Testimonial Cards
```
Border: 1px solid #E5E7EB
Border radius: 12px
Padding: 24px
Background: #FFFFFF

Quote:
  Font style: italic
  Color: #374151
  Margin bottom: 16px

Author:
  Font weight: 600
  Color: #0A0A0A

Role:
  Font size: 14px
  Color: #6B7280
```

---

### Images & Media

#### Profile Image
```
Size: 128px × 128px
Border radius: 100% (circular)
Border: 2px solid #E5E7EB
Object fit: cover
```

#### Company Logos
```
Size: 48px × 48px
Border radius: 12px
Background: Brand color or #0A0A0A
Text: 2 letter abbreviation
Font size: 16px
Font weight: 700
Color: #FFFFFF
```

#### Project Screenshots
```
Aspect ratio: 16:9 or 4:3
Border radius: 8px
Border: 1px solid #E5E7EB
Max width: 100%
Object fit: cover
```

#### Avatar Images (Testimonials)
```
Size: 40px × 40px
Border radius: 100%
Object fit: cover
```

---

### Animation & Transitions

#### Default Transitions
```css
transition: all 0.2s ease;
```

#### Hover Effects
```css
/* Cards */
transform: translateY(-4px);
box-shadow: 0 4px 12px rgba(0,0,0,0.08);

/* Links */
text-decoration: underline;
text-underline-offset: 4px;

/* Buttons */
background-color: #1F2937; /* for black buttons */
```

#### Smooth Scroll
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* offset for fixed nav */
}
```

#### Loading States
```
Skeleton: #F3F4F6 background with subtle shimmer
Fade in: opacity 0 → 1 over 0.3s
```

---

### Grid Systems

#### Companies Grid
```
Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column
Gap: 24px
```

#### Projects Grid
```
Desktop: 2 columns (large cards)
Mobile: 1 column
Gap: 32px
```

#### Skills Grid
```
Desktop: 2 columns
Mobile: 1 column
Gap: 32px
```

#### Testimonials Grid
```
Desktop: 2 columns
Mobile: 1 column
Gap: 24px
```

---

### Breakpoints

```css
Mobile:     < 640px
Tablet:     640px - 1024px
Desktop:    > 1024px
Wide:       > 1280px

Tailwind breakpoints:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

### Accessibility

#### Focus States
```css
outline: 2px solid #2563EB;
outline-offset: 2px;
border-radius: 4px;
```

#### Color Contrast
```
Text on white:     Must be ≥ #6B7280 (WCAG AA compliant)
Links:             Underline on hover
Interactive:       Minimum 44px × 44px touch target
```

#### Semantic HTML
```html
<nav>, <main>, <section>, <article>, <aside>, <footer>
Proper heading hierarchy: h1 → h2 → h3
Alt text for all images
aria-label for icon buttons
```

---

### Dark Mode Implementation (Optional)

If implementing dark mode, use this configuration:

#### Tailwind Dark Mode Setup

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // or 'media' for system preference
  // ... rest of config
}
```

#### Dark Mode Colors

```css
/* Apply via: dark:bg-gray-900 */

.dark {
  --background: #0A0A0A;
  --foreground: #F9FAFB;
  --card: #111827;
  --card-foreground: #F9FAFB;
  --primary: #3B82F6;
  --border: #1F2937;
  --muted: #9CA3AF;
}
```

#### Component Adjustments

```tsx
// Navigation
className="bg-white dark:bg-gray-900/80 border-gray-200 dark:border-gray-800"

// Cards
className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"

// Text
className="text-gray-900 dark:text-gray-100"
className="text-gray-600 dark:text-gray-400"

// Buttons
className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
```

---

## Design References

### Inspiration Sites

**Minimal Founder Sites:**
- stripe.com/about/team
- linear.app/about
- notion.so/about
- figma.com/community/designers

**YC Founder Sites:**
- paulgraham.com (minimal text-focused)
- patrickcollison.com (simple, authoritative)

**Corporate Trust:**
- aws.amazon.com/executive-insights
- microsoft.com/en-us/research/people

### Visual Tone

**Do:**
- Clean, generous whitespace
- Subtle shadows and borders
- Professional photography
- Muted color palette
- System fonts or Inter
- Minimal icons (Lucide/Heroicons)
- Grid-based layouts
- Consistent spacing

**Don't:**
- Gradients or heavy colors
- Animated illustrations
- Script fonts or decorative typefaces
- Stock photos with fake smiles
- Heavy drop shadows
- Cluttered layouts
- Inconsistent spacing
- Flashy animations

---

## Component Library Alternatives

If you want pre-built components instead of building from scratch:

### Option 1: shadcn/ui (Recommended)
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
```
- Tailwind-based
- Copy/paste components
- Highly customizable
- Minimal bundle size

### Option 2: Headless UI
```bash
npm install @headlessui/react
```
- Unstyled components
- Full accessibility
- Works with Tailwind

### Option 3: Radix UI
```bash
npm install @radix-ui/react-dialog
```
- Low-level primitives
- Unstyled by default
- Great for custom designs

---

## Image Guidelines

### Profile Photo
- High resolution (min 512px × 512px)
- Professional attire (business casual or formal)
- Neutral background (white, gray, or subtle gradient)
- Direct eye contact
- Good lighting (natural or softbox)
- Shot by professional photographer
- Format: JPG or WebP
- File size: < 200KB after optimization

### Open Graph Image
- Dimensions: 1200px × 630px
- Include: Name + Title
- Format: JPG
- File size: < 300KB
- Preview on https://www.opengraph.xyz/

### Company Logos
- Vector format preferred (SVG)
- Fallback: PNG with transparency
- Min size: 256px × 256px
- Format: SVG or PNG

### Project Screenshots
- Aspect ratio: 16:9
- Resolution: 1920px × 1080px
- Show actual product UI
- Annotate key features (optional)
- Format: WebP or PNG
- File size: < 500KB per image

---

## Performance Budget

Target metrics:

```
First Contentful Paint (FCP):     < 1.0s
Largest Contentful Paint (LCP):   < 2.5s
Time to Interactive (TTI):        < 3.0s
Cumulative Layout Shift (CLS):    < 0.1
Total Bundle Size:                < 200KB (JS)
Lighthouse Score:                 > 95

Test on:
- WebPageTest.org
- PageSpeed Insights
- Chrome DevTools Lighthouse
```

---

## Content Strategy

### SEO Optimization

**Primary Keywords:**
- [Your Name]
- [Your Name] founder
- [Your Name] software engineer
- [Primary Company Name]

**Secondary Keywords:**
- AI SaaS founder
- [Your Location] entrepreneur
- [Technology] expert

**Meta Descriptions:**
```
Homepage (155 chars):
"Founder & Software Engineer building AI-powered SaaS products. Track record of shipping [X] products used by [Y] users globally."

About (155 chars):
"Serial entrepreneur with [X] years building software companies. Alumni of [Accelerator]. Based in [City]."
```

**URL Structure:**
```
yourname.com (homepage)
yourname.com/about (optional)
yourname.com/projects/[project-slug]
yourname.com/blog (if applicable)
```

### Content Updates

**Monthly:**
- Update user metrics
- Add new testimonials
- Refresh project screenshots

**Quarterly:**
- Review all copy for accuracy
- Update achievements section
- Add new projects/companies

**Annually:**
- Refresh profile photo
- Update design if needed
- Review SEO performance

---

## Legal & Privacy

### Required Pages

**Privacy Policy** (`/privacy`):
- Data collection practices
- Cookie usage
- Analytics disclosure
- GDPR compliance (if EU visitors)

**Terms of Use** (`/terms`):
- Intellectual property
- Liability limitations
- Dispute resolution

### GDPR Compliance

If you have EU visitors:
- Cookie consent banner
- Privacy policy link in footer
- Data deletion request form
- Analytics opt-out option

### Email Compliance

- Use professional domain (not Gmail)
- Include physical address (if required)
- Add unsubscribe link (for newsletters)

---

## Maintenance Checklist

### Launch Checklist

- [ ] Replace all placeholder content
- [ ] Add real profile photo (high res)
- [ ] Create Open Graph image
- [ ] Set up custom domain
- [ ] Configure DNS properly
- [ ] Enable HTTPS
- [ ] Add Google Analytics / Plausible
- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Check all links
- [ ] Proofread all copy
- [ ] Add structured data (JSON-LD)
- [ ] Set up email forwarding
- [ ] Create backup of site

### Monthly Maintenance

- [ ] Update project metrics
- [ ] Check for broken links
- [ ] Review analytics
- [ ] Update dependencies
- [ ] Backup content

### Annual Review

- [ ] Refresh design
- [ ] Update all copy
- [ ] New profile photo
- [ ] Review SEO strategy
- [ ] Audit performance

---

## Contact & Support

For design questions or implementation help:
- Email: [your@email.com]
- Design tool: Figma (if you want mockups)
- Code: GitHub repository

---

**Document Version:** 1.0
**Last Updated:** 2024
**Framework:** Next.js 14+ with Tailwind CSS
**License:** MIT (for template code)
