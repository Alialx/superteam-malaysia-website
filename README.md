# Superteam Malaysia Website

Official website for Superteam Malaysia. Features a community landing page, members directory, events feed, ecosystem partners, and featured projects.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility styling |
| Framer Motion | Scroll/entrance animations |
| GSAP | BounceCards stacked animation |
| Sanity v3 | Headless CMS |
| `next-sanity` | Sanity client + live preview |
| `@sanity/image-url` | Image URL builder |
| Luma | Events integration |
| shadcn/ui | Base UI primitives |

---

## Environment Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the root:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token            # write access — keep secret

# Luma
LUMA_API_KEY=your_luma_api_key
```

3. Add CORS origins in [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS Origins**:
   - `http://localhost:3000`
   - Your production URL (e.g. `https://superteam.my`)
   - Check **Allow credentials** on both entries

4. Run locally:

```bash
npm run dev
```

---

## Sanity CMS

### Studio Access

Sanity Studio is embedded in the app at `app/sanity-studio/[[...tool]]/page.tsx` — no separate Studio deployment needed.

- **Local:** `http://localhost:3000/sanity-studio`
- **Production:** `https://yoursite.com/sanity-studio`

You must be signed into a Sanity account with access to the project. Manage team members at [sanity.io/manage](https://sanity.io/manage) → your project → **Members**.

The sidebar layout is customised in `sanity/structure.ts` and the full Studio config lives in `sanity.config.ts`.

---

### Schemas

All schemas are in `sanity/schemaTypes/` and registered via `sanity/schemaTypes/index.ts`.

| Schema | Powers |
|---|---|
| `projectType` | Featured projects card grid |
| `memberType` | Members carousel + members directory page |
| `partnerType` | Ecosystem partners logo grid |
| `galleryType` | 5-image gallery (3 top, 2 bottom) — enforces exactly 5 images |
| `faqType` | FAQ accordion |
| `statType` | Community statistics count-up section |
| `skillType` | Skill tags referenced by members |

---

### Client & Queries

**`lib/sanity/client.ts`** exports `sanityClient` and `urlFor()` used across all components:

```ts
import { sanityClient, urlFor } from '@/lib/sanity/client'

const data = await sanityClient.fetch(query)
const src = urlFor(image).width(400).url()
```

> Note: `sanity/lib/client.ts` is a separate internal client used only by the embedded Studio — do not import this in components.

All GROQ queries, TypeScript interfaces, and `getX()` fetch functions are in `lib/sanity/queries.ts`:

| Function | Used by |
|---|---|
| `getProjects()` | `FeaturedProjects.tsx` |
| `getMembers()` | `MemberCarousel.tsx`, `members/page.tsx` |
| `getPartners()` | `PartnerLogosServer.tsx` |
| `getGallery()` | `ImageGallery.tsx` |
| `getFAQs()` | `FAQServer.tsx` |
| `getStats()` | `StatServer.tsx` |

Two data-fetching patterns are used across the app:

**Server wrapper** — Stats, FAQ, Partners: an async server component fetches and passes data as props to a `'use client'` component.

**Self-fetching client** — Projects, Gallery, WhyCards: the component calls `getX()` directly inside a `useEffect`.

---

### Adding Content

**Projects** — Studio → Project → New. Fill in title, tag, description, image, URL, people (name + initials + avatar hex color), and awards (label + tier + date). Set display order.

**Members** — Create skill documents first, then Studio → Member → New. Fill in name, role, avatar, bio, socials, and reference skills. Toggle Featured on for homepage carousel.

**Partners** — Studio → Partner → New. Fill in name, logo URL, website URL, and set Row to `1` or `2`.

**Gallery** — Studio → Gallery → open the existing document. Must keep exactly 5 images. Drag to reorder. Alt text appears on hover.

**FAQ** — Studio → FAQ → New. Fill in question, answer, and order.

**Stats** — Studio → Stat → open existing documents and update values.

All changes go live within ~60 seconds via ISR revalidation.

---

## External Integrations

### Luma Events

Events are fetched via `lib/luma/client.ts` and rendered in `LumaEvents.tsx`. A webhook handler at `app/api/luma/webhook/route.ts` receives Luma event notifications and can trigger revalidation. Requires `LUMA_API_KEY` in `.env.local`.

---

## Design System

All components share a consistent dark aesthetic with these core tokens:

| Token | Value |
|---|---|
| Card background | `#0d0b14` / `#121218` |
| Border | `#333333` / `#2a2a35` |
| Corner bracket accent | `#3C2B8C` |
| Hover glow | `#5C4F9C` |

**Corner Brackets** — a shared `CornerBrackets` component renders four L-shaped bracket spans at each card corner using `border-top/bottom/left/right` in `#3C2B8C`.

**Backgrounds** — section backgrounds use large PNGs from `public/assets/` layered with CSS gradients.

**Fonts** — Inter for body text, JetBrains Mono for tags, badges, and labels.
