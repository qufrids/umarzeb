# Quick Start Guide — Choose Your Path

## ✅ You Just Opened the HTML Template!

The HTML file should be open in your browser now. That's the quickest way to see the design.

---

## 🚀 Two Ways to Run This Portfolio

### PATH 1: HTML Template (Already Running!)

**What you just saw** - The standalone HTML file is fully functional.

**To customize and deploy:**

1. **Edit the HTML file** with your content:
   - Open `founder-portfolio-template.html` in any text editor
   - Replace all `[Your Name]` placeholders
   - Update links, descriptions, and content

2. **Add your images:**
   - Save your profile photo as `profile.jpg` in the same folder
   - Update image paths in the HTML

3. **Deploy (choose one):**

   **Netlify (Easiest):**
   - Go to https://app.netlify.com/drop
   - Drag and drop your HTML file + images
   - Get instant URL
   - Add custom domain (optional)

   **Vercel:**
   - Go to https://vercel.com
   - Import folder
   - Deploy

**Time: 1-2 hours total**

---

### PATH 2: Next.js Production Build

**For a scalable, production-grade website with best performance**

#### Step 1: Create Next.js App

Open a **new terminal** in the folder where you want your project:

```bash
# Create the app (will ask you questions)
npx create-next-app@latest founder-portfolio

# When prompted, choose:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes (or your preference)
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: No
# ✅ App Router: Yes
# ✅ Import alias: Yes (use @/*)
# ✅ Customize default import alias: No
```

#### Step 2: Navigate into the project

```bash
cd founder-portfolio
```

#### Step 3: Install dependencies

```bash
npm install lucide-react
```

#### Step 4: Copy configuration files

I'll create these for you - see below ⬇️

#### Step 5: Run development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser

#### Step 6: Customize your content

Edit these files:
- `lib/data.ts` - Your content (companies, projects, etc.)
- `app/layout.tsx` - Metadata (title, description)
- `public/` - Add your images

#### Step 7: Build and deploy

```bash
# Build for production
npm run build

# Deploy to Vercel (easiest)
npx vercel
```

**Time: 1-2 days for full customization**

---

## 📁 Next.js File Structure (Quick Reference)

After running `create-next-app`, your project will look like:

```
founder-portfolio/
├── app/
│   ├── layout.tsx          ← Root layout (metadata, fonts)
│   ├── page.tsx            ← Main page
│   ├── globals.css         ← Tailwind imports
│   └── components/         ← Create this folder
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Companies.tsx
│       └── ... (other sections)
├── lib/
│   └── data.ts             ← Your content data
├── public/
│   ├── profile.jpg         ← Your images
│   └── og-image.jpg
├── tailwind.config.ts      ← Tailwind configuration
├── next.config.js          ← Next.js configuration
└── package.json
```

---

## 🎯 Recommended Approach for Beginners

### Start with HTML (Today)
1. Open the HTML template (you just did! ✅)
2. Edit it with your content
3. Deploy to Netlify
4. **You're live!**

### Upgrade to Next.js (Later)
Once you're comfortable and want:
- Better performance
- Blog functionality
- Dynamic content
- Advanced features

Then migrate to the Next.js version.

---

## 🛠️ What You Need Installed

### For HTML Template:
- ✅ Nothing! Just a web browser

### For Next.js:
- Node.js (v18 or later)
- npm (comes with Node.js)
- Text editor (VS Code recommended)

**Check if you have Node.js:**
```bash
node --version
```

**If not installed:**
Download from https://nodejs.org/ (choose LTS version)

---

## ⚡ Commands Cheat Sheet

### Next.js Project

```bash
# Create new project
npx create-next-app@latest founder-portfolio

# Navigate into project
cd founder-portfolio

# Install dependencies
npm install

# Run development server (local preview)
npm run dev

# Build for production
npm run build

# Start production server (local)
npm run start

# Deploy to Vercel
npx vercel
```

### Quick Deploy (HTML)

```bash
# Install Netlify CLI (one-time)
npm install -g netlify-cli

# Deploy HTML file
netlify deploy --prod
```

---

## 🆘 Troubleshooting

### "HTML file opened but looks broken"
**Solution:** Make sure you're viewing it in a modern browser (Chrome, Firefox, Edge). The CSS is loaded from a CDN.

### "Can't run `npx create-next-app`"
**Solution:** Install Node.js first from https://nodejs.org/

### "Port 3000 is already in use"
**Solution:** Run on a different port:
```bash
npm run dev -- -p 3001
```

### "Images not showing"
**Solution:**
- For HTML: Images must be in the same folder or use full paths
- For Next.js: Images must be in the `public/` folder

---

## 📞 Next Steps

### If You Want HTML (Quick & Simple):
1. ✅ HTML template is already open in your browser
2. Edit `founder-portfolio-template.html` with your content
3. Follow the customization checklist in `IMPLEMENTATION-GUIDE.md`
4. Deploy to Netlify

### If You Want Next.js (Production-Grade):
1. Open a new terminal
2. Run: `npx create-next-app@latest founder-portfolio`
3. Follow the prompts
4. Then read `portfolio-nextjs-setup.md` for component setup
5. Copy component code from that file

---

## 🎯 I Recommend...

**For your first version:**
→ Use the HTML template (it's open in your browser now!)
→ Customize it with your content
→ Deploy to Netlify in 1 hour
→ **Get feedback from real users**

**For version 2.0:**
→ Rebuild with Next.js
→ Add blog, case studies, etc.
→ Optimize for maximum performance

---

## 📝 Quick Checklist

**Before deploying (HTML or Next.js):**
- [ ] Replace all placeholder content
- [ ] Add your professional photo
- [ ] Update all links (LinkedIn, GitHub, etc.)
- [ ] Add your email address
- [ ] Update company/project descriptions
- [ ] Add testimonials (if you have them)
- [ ] Proofread everything
- [ ] Test on mobile (resize browser window)

---

## 💬 Questions?

### "Which option should I choose?"
- **Need it today?** → HTML template
- **Want maximum quality?** → Next.js (but takes longer)
- **Not sure?** → Start with HTML, migrate later

### "How do I edit the HTML?"
- Right-click `founder-portfolio-template.html`
- Choose "Open with" → VS Code (or any text editor)
- Edit the content
- Save and refresh browser

### "Where do I put my images?"
- **HTML:** Same folder as the HTML file
- **Next.js:** In the `public/` folder

---

**You're ready to build! 🚀**

Choose your path and follow the instructions above.
