# AI Studio prompt — Adhvik Projects website

Paste everything below the line into AI Studio (Build mode). Upload the 46 photos from adhvik-project-photos.zip in the same message.

---

Build a portfolio website for **Adhvik Projects**, a Delhi-based architecture, interior design and turnkey execution firm (est. 2013) that designs and builds retail stores, hotels and commercial interiors across India and abroad.

## Tech
- React + TypeScript + Tailwind, client-side routing (hash router so it works on any static host).
- All project content lives in ONE data file (`src/data/projects.ts`) so I can edit text and add projects without touching components.
- I've attached the project photos. Put them in `public/images/` and reference them by their exact filenames. If you can't access an attached file, keep the exact filename in the data file anyway so I can drop it in later — never substitute stock photos.
- Light mode only. Fully responsive (mobile first, works at 375px with no horizontal scroll).

## Pages
1. **Home** (`/`) — hero → ticker → work list → footer
2. **About** (`/about`)
3. **Contact** (`/contact`)
4. **Project detail** (`/work/:slug`) — one per project, generated from the data file

"Work" in the menu scrolls to the work section on Home (from any page: navigate home, then scroll to `#work`).

## Design direction
Minimal, editorial, confident. Lots of whitespace, big type, photos do the talking. Think of three references:
- **dvdrod.com** — numbered project list (01, 02…) with client/meta line, title and a large cover image; a scrolling skills marquee under the hero; a sparse Work / About / Contact nav.
- **goodside.studio** — warm off-white background, calm editorial feel, a full-screen menu overlay with very large links, and a footer contact block ("For business inquiries…" + email).
- **how.studio** — oversized headline in the hero sitting with a row/collage of project imagery.

### Tokens
- Background `#F4F1EA` (warm off-white), surface `#EAE5DA`, text `#141414`, muted text `#6B6660`, hairline borders `#D6D0C4`, one accent `#B5562E` (terracotta, used sparingly: hover states, small labels).
- Fonts (Google Fonts): **Inter Tight** for headings and the giant uppercase name (700, letter-spacing −0.04em, line-height 0.9); **Inter** for body (400/500); **Instrument Serif italic** for occasional accent words only.
- Images: square corners, no shadows, no gradients over photos. Subtle hover: image scales to 1.03 over 600ms.
- Motion: gentle fade-up on scroll for sections; respect `prefers-reduced-motion`.

## Navigation (every page)
Top bar: small wordmark "ADHVIK PROJECTS" on the left; on the right a "Menu" button. Clicking it opens a full-screen overlay (Goodside style) with huge links: **Work, About, Contact**, plus the email and phone in small text at the bottom. "Close" in the same spot as "Menu". Bar is sticky and gets a background once you scroll.

## Home

### Hero
- The name **ADHVIK PROJECTS** in huge uppercase, spanning nearly the full viewport width (clamp so it fits on mobile on two lines).
- One short line under it: *Architecture, interiors and turnkey execution — from first sketch to opening day.*
- A row of 3–4 project photos beside/below the name (How&How style): use `wardrobe-gwalior-01.jpg`, `fern-hotel-bhimtal-01.jpg`, `global-republic-rajouri-garden-01.jpg`, `camla-gurgaon-01.jpg`. On mobile they become a horizontal scroll strip.
- Small meta line: "Est. 2013 · Delhi, India".

### Ticker
An infinitely scrolling marquee (pause on hover), separated by a small "✦":
`900+ PROJECTS DELIVERED ✦ 20 STATES ✦ INTERNATIONAL: UAE & SAUDI ARABIA ✦ ARCHITECTURE ✦ INTERIOR DESIGN ✦ TURNKEY EXECUTION ✦ RETAIL & BRAND STORES ✦ HOTELS & RESORTS ✦ CORPORATE INTERIORS ✦ IN-HOUSE FURNITURE WORKSHOP ✦`

### Work (`id="work"`)
Section label "Selected Projects", heading "Work". A numbered vertical list (dvdrod style). Each item:
- Number (01, 02…), project name, location, area in sq ft, type tag (Retail / Hospitality).
- Large cover image.
- Whole item links to its detail page.
On desktop, alternate nothing fancy — keep a consistent left-aligned meta column + image layout.

### Footer (every page)
- Big line: "Have a space in mind? *Let's build it.*" (accent word in Instrument Serif italic)
- Email `rs.adhvikprojects@gmail.com` (mailto), phone `+91 98180 20640` (tel link), address "203, Azadpur Village, Delhi – 110033, India".
- Small links: Work, About, Contact. "© 2026 Adhvik Projects".

## Project detail page
- Back link "← All work".
- Big project name (uppercase), then a meta row: Location · Area · Type · Scope ("Design + turnkey execution").
- Full-width cover image, then a gallery of the remaining photos in a simple 2-column grid (1 column on mobile). Click an image to open a lightbox with next/prev and Esc to close.
- At the bottom: "Next project →" linking to the next item (loop from last to first).
- Do not invent descriptions, years or client quotes. If a field is empty in the data file, hide it.

## Project data (in this order)

| # | slug | Name | Location | Area | Type | Cover | Gallery |
|---|---|---|---|---|---|---|---|
| 01 | wardrobe-gwalior | Wardrobe | Lashkar, Gwalior, MP | 19,000 sq ft | Retail | wardrobe-gwalior-01.jpg | wardrobe-gwalior-02 to 05 |
| 02 | fern-hotel-bhimtal | The Fern Hotel | Bhimtal, Nainital, Uttarakhand | 1,20,000 sq ft | Hospitality | fern-hotel-bhimtal-01.jpg | fern-hotel-bhimtal-02 to 08 |
| 03 | stanmax-dehradun | Stanmax | Rajpur Road, Dehradun | 36,000 sq ft | Retail | stanmax-dehradun-05.jpg | stanmax-dehradun-01 to 04 |
| 04 | madame-jeddah | Madame | Al Andalus Mall, Jeddah, KSA | 1,950 sq ft | Retail · International | madame-jeddah-02.jpg | madame-jeddah-01, 03 |
| 05 | global-republic-mohali | Global Republic | Bestech, Mohali | 2,550 sq ft | Retail | global-republic-mohali-01.jpg | global-republic-mohali-02 to 05 |
| 06 | global-republic-rajouri-garden | Global Republic | Rajouri Garden Main Market, Delhi | 1,900 sq ft | Retail | global-republic-rajouri-garden-01.jpg | global-republic-rajouri-garden-02 to 05 |
| 07 | camla-gurgaon | Camla | Ambience Mall, Gurugram | 2,950 sq ft | Retail | camla-gurgaon-01.jpg | camla-gurgaon-02 to 05 |
| 08 | madame-gwalior | Madame | City Centre, Gwalior | 2,350 sq ft | Retail | madame-gwalior-01.jpg | madame-gwalior-02 to 04 |

All files are `.jpg`.

## About page
Hero line: "We design spaces, then we build them."

Body copy (use as written):

> Adhvik Projects was founded in Delhi in 2013 by Mr. Nagpal. Since then we've grown into a design-and-build practice working across North India and beyond, with over 900 projects completed across 20 states and work delivered in the UAE and Saudi Arabia.
>
> Our work spans large-format retail (multi-brand, exclusive brand and high-end stores), commercial buildings, hotels and resorts, and corporate interiors. Every project starts with research: understanding the site, the brand and the people who'll use the space. Our approach is modern and contemporary — simple, useful spaces that respond to local conditions and culture.
>
> Because we run our own furniture workshop and execution teams, we can take a project from concept to completion under one roof: one team, one point of accountability.

**Services** — a clean two-column list:
1. Site survey, analysis, land acquisition and liaison with agencies
2. Theme-based design and drawings
3. Furniture, fixtures and wall/floor modules — designed and produced in-house
4. Carpentry, MS & SS fabrication and civil works
5. Flooring — marble, tiles, micro-cement, epoxy, wood
6. Ceilings — gypsum, POP, fibre, wood, glass, metal
7. Wall finishes — wallpaper, paint, stone and more
8. Glass and mirror concepts, interior and exterior
9. Façades, landscaping and signage
10. HVAC, electrical, lighting and fire-fighting installation
11. AMCs, renovation and repairs
12. Indoor and outdoor branding

**The team** — a tag-style row: Architects · Interior Designers · Project Managers · Analysts · Land Acquisition · Technicians · Electricians · Execution Team · Contractors · Suppliers

**Our workshop** — short line "Furniture and fixtures, built in our own workshop." followed by a photo grid of `workshop-01.jpg` to `workshop-06.jpg`.

## Contact page
Large heading "Let's talk about your space." Then email, phone and address as big clickable lines, and a simple Google Maps embed link for "Azadpur Village, Delhi 110033". No contact form for now.

## Quality bar
- Semantic HTML, alt text on every image ("Wardrobe, Gwalior — store façade" etc.), visible focus states, keyboard-operable menu and lightbox.
- Lazy-load gallery images; set width/height to avoid layout shift.
- No lorem ipsum, no placeholder stats, no invented copy beyond what's written here.
