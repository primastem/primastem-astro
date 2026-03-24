# PrimaSTEM Astro Project Index

## Content Source Files (ready texts)
Located in: `C:\Users\andrei\Documents\Claude\web\astro-site\src\content\`

| File | Page | Sections |
|------|------|----------|
| `pages/home.md` | Homepage `/` | hero, two-levels, drawing, maps, pricing, video, trust, newsletter, tagline |
| `pages/distributors.md` | Distributors `/distributors` | hero, why-primastem, margins, how-it-works, support, cta |
| `pages/schools.md` | Schools `/schools` | hero, curriculum, two-levels, what-you-get, pricing, cta |
| `pages/parents.md` | Parents `/parents` | hero, what-is-it, two-levels, screen-free, what-you-get, pricing, cta |
| `pages/product.md` | Product `/product` | hero, two-levels, drawing, components, specs, maps, docs-link |
| `pages/about.md` | About `/about` | hero, story, mission, team, awards, contact-link |
| `pages/contact.md` | Contact `/contact` | hero, form, details, social |
| `legal/mentions-legales.md` | Legal `/legal` | French legal mentions |
| `legal/privacy.md` | Privacy `/privacy` | Privacy policy |
| `site.json` | Central data | company info, contact, social, pricing, navigation, partners |

## Memory & Research Files
Located in: `C:\Users\andrei\Documents\Claude\web\memory\`

| File | Contents |
|------|----------|
| `00_START_HERE.md` | Project overview, team, product summary |
| `01_economics.md` | Pricing, costs, margins |
| `02_clients_partners.md` | Client list, distributors, pipeline |
| `03_target_audience.md` | Audience segmentation |
| `04_competitors.md` | Competitor analysis |
| `05_product_features.md` | Complete feature list |
| `06_website_plan.md` | Website structure plan |
| `07_competitor_marketing.md` | Competitor marketing analysis |

## Company Requisites
- `C:\Users\andrei\Documents\Claude\web\sources\PrimaSTEM_SAS_requisites.md`

## Astro Project Structure
Located in: `C:\Users\andrei\Documents\GitHub\primastem-astro\`

### Current Navigation
- **Header:** Product | Distributors | Schools | Parents | Contact + [Docs] button
- **Footer columns:** Product (Product, FAQ) | Legal (Legal Notice, Privacy Policy) | About us (About, Contact)
- **Footer copyright:** © PrimaSTEM SAS 2026. All rights reserved.

### Config Files (src/config/)
- `config.ts` — site title, description, logo, mode (auto)
- `navigationBar.ts` — header nav items + Docs CTA
- `footerNavigation.ts` — footer columns + copyright
- `socialLinks.ts` — Instagram, Facebook, YouTube, LinkedIn
- `analytics.ts` — Google tracking (empty)

### Brand Assets
- `/public/logo.svg` — light theme logo (black text, h=48px in header)
- `/public/logo-dark.svg` — dark theme logo (white text)
- `/public/favicon.svg` — green gear icon
- Primary color: `#5AA02C` (green)

### Available Foxi Components — Full Catalog

#### BLOCK COMPONENTS (src/components/blocks/)

**Hero sections:**
| Component | Visual | Props |
|-----------|--------|-------|
| `hero/HomeCTA` | Centered: chip + avatars + h1 + text + CTA button + big image | Hardcoded |
| `hero/PageHeader` | Centered: h1 title + description text | title, text |
| `hero/ContactHero` | 2 columns: left text + right contact form | title, text |

**Feature sections:**
| Component | Visual | Props |
|-----------|--------|-------|
| `features/FeatureCards` | 3-col asymmetric card grid with icons + text | Hardcoded (5 cards) |
| `features/FeatureList` | 4-col grid: icon + title + description | Hardcoded from JSON |
| `features/FeatureSticky` | Sticky sidebar left + 3-col feature grid right | title, text, data[] |

**Content sections:**
| Component | Visual | Props |
|-----------|--------|-------|
| `highlights/HightlightRows` | 4 alternating text+image rows | Hardcoded |
| `basic/TextImage` | 2 columns: text + image (left or right) | title, text, image, imagePosition |
| `basic/StickySidebar` | Sticky sidebar + scrolling content | type (left/right) |

**CTA sections:**
| Component | Visual | Props |
|-----------|--------|-------|
| `CTA/BasicDark` | Dark bg + badge + title + text + button | Hardcoded |
| `CTA/BasicLight` | Light bg + title + text + 5-star rating + button | Hardcoded |

**Testimonials & Social Proof:**
| Component | Visual | Props |
|-----------|--------|-------|
| `testimonials/BasicDark` | Dark section + large blockquote + author | blockquote, figcaption, cite, bg |
| `socialproof/Basic` | Title + logo grid (6 logos) | Hardcoded |

**FAQ:**
| Component | Visual | Props |
|-----------|--------|-------|
| `FAQ/Basic` | Centered title + accordion list in card | Hardcoded |
| `FAQ/FaqSticky` | Sticky sidebar + accordion list | title, text, data[] |

**Pricing:**
| Component | Visual | Props |
|-----------|--------|-------|
| `pricing/PricingColumns` | 3-col pricing table + month/year toggle | Hardcoded from JSON |

**Contact:**
| Component | Visual | Props |
|-----------|--------|-------|
| `contact/BasicForm` | Card with form: name, email, phone, message, submit | Hardcoded |
| `contact/ContactCards` | 4-col grid of contact info cards with icons | Hardcoded |

**Blog:**
| Component | Visual | Props |
|-----------|--------|-------|
| `blog/BlogPostHero` | Breadcrumbs + title + author + date + tags | title, author, publishDate, tags |
| `blog/BlogPosts` | 3-col blog card grid + tag filter | data (posts) |

**Feed:**
| Component | Visual | Props |
|-----------|--------|-------|
| `feeds/BasicFeed` | Vertical timeline with dots, titles, dates | data[] |

**Modal:**
| Component | Visual | Props |
|-----------|--------|-------|
| `modal/SignUp` | Popup with email input + sign up buttons | Hardcoded |

#### UI COMPONENTS (src/components/ui/)

**Layout:** Section, Row (12-col grid), Col (span 1-12), Main, Spacer
**Navigation:** NavigationBar, Footer, Breadcrumbs, ModeSwitcher
**Cards:** BasicCard (icon/image + title + text), FeatureCard, BlogCard, Card (base), CardBody
**Buttons:** Button (primary/secondary/neutral/white, sm/base/lg, outline/link variants)
**Forms:** Form, InputField, TextArea, Toggle, FormField
**Text:** Highlight (4 styles: colored/box/rotated/gradient), List (basic/checklist)
**Feedback:** Badge (pill label), ChipNotification (chip with slot), Toast (auto-dismiss notification)
**People:** Avatar, AvatarGroup (overlapping avatars), Rating (1-5 stars)
**Testimonial:** Testimonial (blockquote + author + optional avatar/rating)
**Other:** Accordion (expandable), Modal (popup dialog), CTA (card container with bg)
**Pricing:** PricingTable, Header, Body, Footer

### Pages to Create
| Page | URL | Status |
|------|-----|--------|
| Home | `/` | Exists (Foxi demo) — needs rewrite |
| Product | `/product` | Need to create |
| Distributors | `/distributors` | Need to create |
| Schools | `/schools` | Need to create |
| Parents | `/parents` | Need to create |
| About | `/about` | Need to create |
| Contact | `/contact` | Exists (Foxi demo) — needs rewrite |
| FAQ | `/faq` | Exists (Foxi demo) — needs rewrite, text TBD |
| Legal | `/legal` | Need to create |
| Privacy | `/privacy` | Need to create |

### Pages to Delete (Foxi demo)
- `/pricing` — not needed
- `/features` — not needed
- `/changelog` — not needed
- `/terms` — replaced by `/legal`
- `/blog/*` — not needed (for now)

### Completed Steps
1. ✅ Config: site title, description, logo, favicon
2. ✅ Social links: Instagram, Facebook, YouTube, LinkedIn
3. ✅ Navigation: header + footer restructured
4. ✅ Docs button → links to docs.primastem.com
5. ✅ Color scheme: green #5AA02C with generated palette
6. ✅ Dark/light logo switching
7. ✅ Logo sizing: header 48px, footer 24px

### Home Page Content → Block Mapping (TO DO)
From `home.md`:
| Section | Content | Suggested Block |
|---------|---------|----------------|
| hero | Title + subtitle + price + CTA + media | HomeCTA (customize) |
| two-levels | 2-column comparison + images | TextImage or HighlightRows |
| drawing | Gallery of robot drawings | Custom gallery or FeatureCards |
| maps | Compatibility info | TextImage |
| pricing | Price + 3 audience links | PricingColumns or custom |
| video | YouTube embed | Custom or CTA block |
| trust | Partner logos + stats | socialproof/Basic |
| newsletter | Email signup form | Custom or CTA |
| tagline | Closing statement | CTA block |
