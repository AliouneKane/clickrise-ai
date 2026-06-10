# CLAUDE.md — Clickrise AI

## Project overview

**Clickrise AI** is an agency website built to present AI integration services for SMBs worldwide, and let prospects book a discovery call directly from the site. The core value proposition: helping businesses save time and money through AI.

The site is a **single or multi-page Next.js app** built with React and standard HTML/CSS/JS where needed.

---

## Goals

1. **Present the agency** — who we are, what we do, why it matters for SMBs.
2. **Build trust** — case studies, testimonials, personality-driven storytelling.
3. **Convert visitors** — every section pushes toward a booked call via Cal.com.

---

## Target audience

Small and medium businesses (SMBs) worldwide looking to:
- Save time through AI-powered automation
- Save money by replacing manual/repetitive workflows with AI

Tone should feel **confident, direct, and human** — not overly technical or academic. Speak to business owners and decision-makers, not developers.

---

## Tech stack

- **Framework**: Next.js (App Router)
- **UI**: React components + Tailwind CSS (or CSS Modules)
- **Booking**: Cal.com embed or redirect
- **Language**: TypeScript preferred
- **Animations**: Framer Motion for transitions and scroll effects

Do not introduce new dependencies without checking first. Keep the bundle lean.

---

## Site structure

### Pages / Sections (single-page scroll)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | **Hero** | Bold headline, subheadline, primary CTA → book a call |
| 2 | **Services** | 3–5 core AI services offered, each with a short outcome statement |
| 3 | **Case Studies** | 2–4 real or representative projects with before/after framing |
| 4 | **Testimonials** | Social proof from past clients (SMBs) |
| 5 | **Booking / CTA** | Dedicated section with Cal.com integration |
| 6 | **Contact** | Fallback contact option (email or form) |

---

## Design system

### Identity

- **Brand name**: Clickrise AI
- **Personality**: Sharp, innovative, results-driven, human

### Visual pattern

- **Storytelling + Case Studies** approach — every section tells a story, not a feature list
- **Full-screen sections** with immersive scroll transitions
- **Horizontal scroll galleries** for case studies
- **Visual impact first** — lead with outcomes and imagery, not bullet points

### Color palette

Define a strong, intentional palette. Suggestion:
- **Primary background**: Deep near-black (`#0A0A0F`)
- **Accent**: Electric or neon-adjacent — one bold color (e.g. `#6EE7B7` mint or `#7C3AED` violet)
- **Text primary**: Off-white (`#F5F5F0`)
- **Text secondary**: Muted gray (`#9CA3AF`)
- **Surface**: Dark cards (`#111118`)

> The palette can evolve, but always maintain strong contrast and avoid generic purple-on-white. Commit to a dark, premium feel.

### Typography

- **Display / Headings**: A distinctive, characterful font — e.g. Clash Display, Syne, or Cabinet Grotesk
- **Body**: A clean, readable pairing — e.g. DM Sans, Plus Jakarta Sans
- Never use Inter, Roboto, or Arial

### Motion principles

- Staggered fade-in on scroll enter (Framer Motion `useInView`)
- Smooth section transitions — no abrupt jumps
- Subtle parallax on hero background
- Hover effects on cards and CTAs (lift + glow or border reveal)
- Horizontal scroll on case studies gallery (CSS `overflow-x: scroll` with momentum)

---

## Component conventions

- All components go in `/components/`
- Each section is its own component: `HeroSection.tsx`, `ServicesSection.tsx`, etc.
- Shared UI primitives (Button, Card, Badge) go in `/components/ui/`
- Use `cn()` utility for conditional classNames
- Avoid prop drilling — use context or co-location
- All images use `next/image` with proper `alt` text

---

## Booking integration (Cal.com)

- Embed Cal.com inline in the Booking section using the official Cal.com embed script
- Also add a floating or sticky **"Book a call"** CTA button visible on scroll
- The calendar should open either inline or as a modal — not a redirect to another tab if avoidable
- Cal.com namespace/username must be set via an environment variable: `NEXT_PUBLIC_CAL_USERNAME`

---

## Copy & content guidelines

- **Headline formula**: Outcome first, not feature first.
  - ✅ "Save 10 hours a week — without hiring anyone."
  - ❌ "We offer AI automation solutions."
- **CTA text**: Action-oriented and specific — "Book your free call", "See how it works", "Get my free audit"
- **Case studies**: Follow the format → Problem → Solution → Result (with numbers when possible)
- **Multilingual**: Site starts in English. Structure copy in a way that makes it easy to add French later (use a `content/` or `locales/` folder if needed)

---

## Do's and Don'ts

### Do
- Prioritize visual storytelling over feature lists
- Make every section push toward the booking CTA
- Keep components modular and reusable
- Use semantic HTML and accessible markup (`aria-label`, proper heading hierarchy)
- Optimize for Core Web Vitals (LCP, CLS, FID)

### Don't
- Don't use cookie-cutter SaaS templates or generic layouts
- Don't add unnecessary libraries without approval
- Don't use lorem ipsum — write real placeholder copy that matches the brand voice
- Don't sacrifice mobile experience for desktop aesthetics — test both
- Don't hardcode content that should be configurable (colors, copy, Cal.com username)

---

## Environment variables

```env
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
NEXT_PUBLIC_SITE_URL=https://clickriseai.com
```

---

## File structure (suggested)

```
/
├── app/
│   ├── page.tsx          # Main single-page layout
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── globals.css       # CSS variables, base styles
├── components/
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── CaseStudiesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── BookingSection.tsx
│   ├── ContactSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SectionWrapper.tsx
├── content/
│   └── data.ts           # All copy, services, case studies as typed objects
├── public/
│   └── images/
└── CLAUDE.md             # This file
```

---

## Definition of done (per section)

A section is complete when:
- [ ] It renders correctly on mobile (375px) and desktop (1440px)
- [ ] Animations trigger correctly on scroll
- [ ] Copy matches brand voice (no filler text)
- [ ] CTA is present and linked
- [ ] No console errors or TypeScript errors
- [ ] Lighthouse score ≥ 90 on Performance and Accessibility
