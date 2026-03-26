# PrimaSTEM Astro Project Index

## Working Notes
- **Layout debugging**: Always check CSS classes in code first (flex alignment, self-center vs self-start, grid spans), not just screenshots. Preview viewport may be mobile — desktop bugs won't show.
- **Push only when asked**: Don't auto-push, wait for user command.
- **Don't invent content**: All text comes from prepared .md files or user. Ask if unsure.

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

### Pages Status
| Page | URL | Status | Block/Component |
|------|-----|--------|----------------|
| Home | `/` | ✅ Done | Hero, TwoLevels, Drawing, Maps, Pricing, Video, Trust, Newsletter, Tagline |
| Product | `/product` | ✅ Done | Hero+3Steps+Video, Kit(2x2 cards+image), Commands, Drawing, Maps, OpenPlatform, Voice, Specs, Docs, Order CTA |
| Distributors | `/distributors` | ❌ TODO | |
| Schools | `/schools` | ❌ TODO | |
| Parents | `/parents` | ❌ TODO | |
| About | `/about` | ❌ TODO | |
| Contact | `/contact` | ✅ Done | ContactHero (form) + PrimaContactCards (Email, WhatsApp, Location) |
| FAQ | `/faq` | ✅ Done | PageHeader + FaqSticky + TextImage (demo questions — replace later) |
| Legal | `/legal` | ✅ Done | PageHeader + 3x StickySidebar (French mentions légales) |
| Privacy | `/privacy` | ✅ Done | PageHeader + 3x StickySidebar (French RGPD policy) |

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
7. ✅ Logo sizing: header 36px (1.5x), footer 24px (1x)
8. ✅ Home page: all 9 sections assembled
9. ✅ Contact page: Netlify Forms + 3 contact cards
10. ✅ FAQ page: sticky sidebar FAQ with demo questions
11. ✅ Legal page: French mentions légales
12. ✅ Privacy page: French RGPD policy
13. ✅ Form red validation removed, textarea padding fixed
14. ✅ Product page: all 11 sections assembled
15. ✅ TextImage component: set:html for text prop, rounded-xl on images
16. ✅ Logo text color changed to neutral-700 (#334155)
17. ✅ Custom icons added: robot.svg

### Custom Blocks Created (src/components/blocks/features/)
| File | Used on | Description |
|------|---------|-------------|
| `TwoLevels.astro` | Home | Two cards: Logic/Mathematics levels |
| `DrawingV1.astro` | Home | Row of 5 drawing placeholders |
| `MapsV2.astro` | Home | TextImage for map compatibility |
| `PricingV3.astro` | Home | 3-col PricingTable (School/Distributor/Parent) |
| `Video.astro` | Home | YouTube embed |
| `TrustV2.astro` | Home | Partner logos socialproof pattern |
| `NewsletterV1.astro` | Home | MailerLite form, two-column |
| `TaglineV3.astro` | Home | Testimonial on dark bg |
| `PrimaContactCards.astro` | Contact | 3 cards: Email, WhatsApp, Location |

### Image Placeholders to Replace
| Placeholder name | Where | Description |
|-----------------|-------|-------------|
| `hero-primastem.png` | Home hero | ✅ Already has real photo |
| `two-levels-logic.png` | Home TwoLevels | Photo of child with map (ages 4-7) |
| `two-levels-math.png` | Home TwoLevels | Photo of robot drawing (ages 7-10) |
| `drawing-square.png` | Home Drawing | Robot drawing of square |
| `drawing-pentagon.png` | Home Drawing | Robot drawing of pentagon |
| `drawing-star.png` | Home Drawing | Robot drawing of star |
| `drawing-spiral.png` | Home Drawing + Product | ✅ Already has real photo |
| `drawing-heart.png` | Home Drawing | Robot drawing of heart |
| `maps-compatibility.png` | Home Maps + Product | ✅ Already has real photo |
| `tokens-commands.png` | Product Commands | ✅ Already has real photo |
| `terra-numerica.svg` | Home Trust | Partner logo |
| `inria.svg` | Home Trust | Partner logo |
| `educazur.svg` | Home Trust | Partner logo |
| `afinef.svg` | Home Trust | Partner logo |

### Services Connected
- **Netlify Forms**: contact form → configure email notification in Netlify Dashboard
- **MailerLite**: newsletter form (account 1306223, form jdJlRe)
- **YouTube**: embedded video (Ztq_I1WBiVo)

### Next Steps
1. Create remaining pages: Distributors, Schools, Parents, About
2. Replace image placeholders with real photos
3. Replace FAQ demo questions with real PrimaSTEM questions
4. Delete unused Foxi demo pages (pricing, features, changelog, terms, blog)
5. Connect custom domain
6. Set up Google Analytics
