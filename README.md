# InnovateInDigital

**Private AI & Automation Roundtables · Zurich, Switzerland**

Landing page built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Scroll animations |
| TypeScript | Type safety |
| Vercel | Hosting |

---

## Project Structure

```
innovateindigital/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Page — assembles all sections
│   └── globals.css       # Tailwind + custom utilities
├── components/
│   ├── Nav.tsx           # Sticky nav with scroll effect
│   ├── Hero.tsx          # Full-screen hero with stats
│   ├── Gallery.tsx       # 6-photo strip (variable-width grid)
│   ├── Community.tsx     # Event format — 4 cards
│   ├── Different.tsx     # What makes this different — 3 cols
│   ├── Audience.tsx      # Who attends + organisations
│   ├── AboutMark.tsx     # Founder bio + photo
│   ├── Sponsors.tsx      # Sponsor CTA (gated pack)
│   ├── Apps.tsx          # Agentic applications teaser
│   ├── CTA.tsx           # Final call to action
│   └── Footer.tsx        # Footer with links
├── lib/
│   └── useReveal.ts      # Shared scroll-reveal hook
├── public/
│   └── images/           # Optimised JPGs (add your own here)
│       ├── mark.jpg
│       ├── ev1.jpg – ev6.jpg
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## Deploy to Vercel (3 steps)

### Step 1 — Push to GitHub

```bash
cd innovateindigital

git init
git add .
git commit -m "Initial commit — InnovateInDigital landing page"

# Create repo on GitHub first at github.com/new
# Name it: innovateindigital

git remote add origin https://github.com/markross100/innovateindigital.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import `markross100/innovateindigital`
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live at `innovateindigital.vercel.app` in ~60 seconds

### Step 3 — Add Your Custom Domain

1. In Vercel → Project → **Settings → Domains**
2. Add `innovateindigital.com`
3. Copy the DNS records Vercel gives you
4. Go to your domain registrar and update the DNS:
   - **A record**: `@` → Vercel IP
   - **CNAME**: `www` → `cname.vercel-dns.com`
5. SSL is automatic — done ✓

---

## Updating Content

All content is in the component files. Key locations:

| What to change | File |
|---|---|
| Hero headline / subtext | `components/Hero.tsx` |
| Stats (4+, 14, 100%, 40+) | `components/Hero.tsx` → `stats` array |
| Event format cards | `components/Community.tsx` → `cards` array |
| Organisation logos | `components/Audience.tsx` → `orgs` array |
| Mark's bio | `components/AboutMark.tsx` |
| Sponsor perks list | `components/Sponsors.tsx` → `perks` array |
| App names/badges | `components/Apps.tsx` → `badges` array |
| Photos | Replace files in `public/images/` |
| Brand colours | `tailwind.config.ts` → `theme.extend.colors` |
| Fonts | `app/layout.tsx` |

---

## Adding New Photos

Drop optimised JPEGs into `public/images/` and update the `photos` array in `components/Gallery.tsx`:

```tsx
const photos = [
  { src: '/images/your-new-photo.jpg', alt: 'Description', span: 2 }, // landscape
  { src: '/images/portrait-photo.jpg', alt: 'Description', span: 1 }, // portrait
]
```

`span: 2` = landscape (wider cell), `span: 1` = portrait (narrower cell).

---

## Colour Reference

| Variable | Hex | Usage |
|---|---|---|
| `bg` | `#08080F` | Page background |
| `bg2` | `#0F0F18` | Section backgrounds |
| `bg3` | `#141420` | Card backgrounds |
| `gold` | `#C9A84C` | Primary accent |
| `gold-l` | `#DDB96A` | Hover state |
| `yellow` | `#E8F000` | Logo dot, pulse, AI tiles |
| `ink` | `#EDE9E0` | Primary text |
| `muted` | `#7A7A90` | Secondary text |

---

## Contact

**Mark Ross** — Founder, InnovateInDigital  
mark.ross@innovateindigital.com  
[linkedin.com/in/markrossch](https://www.linkedin.com/in/markrossch/)  
Zurich, Switzerland
