/**
 * HOW TO ADD PHOTOS TO A PROJECT
 *
 * 1. Put the image files in public/images/ (for example public/images/libas-delhi-01.jpg).
 * 2. List the filenames (no folder) in the project's `images` array. The first one is the cover.
 * 3. Optionally add `imageAlts` with one description per image, in the same order.
 *
 * A project with a non-empty `images` array automatically becomes a clickable card in the Work grid
 * with its own detail page at /work/:slug. A project with `images: []` shows as a text tile and is not a link.
 * Categories come from src/data/categories.ts (use a category slug).
 */
export interface Project {
  slug: string;
  name: string;
  location: string;
  category: string;
  images: string[];
  imageAlts?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "wardrobe-gwalior",
    name: "Wardrobe",
    location: "Lashkar, Gwalior",
    category: "high-end-retail",
    images: [
      "wardrobe-gwalior-01.jpg",
      "wardrobe-gwalior-02.jpg",
      "wardrobe-gwalior-03.jpg",
      "wardrobe-gwalior-04.jpg",
      "wardrobe-gwalior-05.jpg",
      "wardrobe-gwalior-06.jpg",
      "wardrobe-gwalior-07.jpg",
      "wardrobe-gwalior-08.jpg",
    ],
    imageAlts: [
      "Wardrobe, Lashkar, Gwalior, store façade lit at night",
      "Wardrobe, Gwalior, store façade and street entrance in Lashkar",
      "Wardrobe, reception and bespoke monolithic billing counter with geometric textured ceiling",
      "Wardrobe, formal menswear showcase with ambient coffered ceiling lighting",
      "Wardrobe, luxury lounge seating area with custom display racks and brass highlights",
      "Wardrobe, custom perimeter shelving and bespoke wardrobe architectural millwork",
      "Wardrobe, Gwalior, store façade by day",
      "Wardrobe, Gwalior, glazed entrance and signage",
    ],
  },
  {
    slug: "mi-arcus",
    name: "Mi Arcus",
    location: "India",
    category: "high-end-retail",
    images: [
      "mi-arcus-01.jpg",
      "mi-arcus-02.jpg",
      "mi-arcus-03.jpg",
    ],
    imageAlts: [
      "Mi Arcus, India, store entrance",
      "Mi Arcus, India, store interior",
      "Mi Arcus, India, kids apparel and toy display",
    ],
  },
  {
    slug: "anytime-fitness-karol-bagh",
    name: "Anytime Fitness",
    location: "Karol Bagh, Delhi",
    category: "gyms",
    images: [
      "anytime-fitness-karol-bagh-01.jpg",
      "anytime-fitness-karol-bagh-02.jpg",
    ],
    imageAlts: [
      "Anytime Fitness, Karol Bagh, cardio floor",
      "Anytime Fitness, Karol Bagh, strength and free weights area",
    ],
  },
  {
    slug: "kuber",
    name: "Kuber",
    location: "India",
    category: "high-end-retail",
    images: [
      "kuber-01.jpg",
      "kuber-02.jpg",
    ],
    imageAlts: [
      "Kuber, India, store interior with timber baffle ceiling",
      "Kuber, India, shopping aisle and billing counter",
    ],
  },
  {
    slug: "stanmax-dehradun",
    name: "Stanmax",
    location: "Rajpur Road, Dehradun",
    category: "high-end-retail",
    images: [
      "stanmax-dehradun-05.jpg",
      "stanmax-dehradun-01.jpg",
      "stanmax-dehradun-02.jpg",
      "stanmax-dehradun-03.jpg",
      "stanmax-dehradun-04.jpg",
    ],
    imageAlts: [
      "Stanmax, Dehradun, flagship retail store architectural exterior on Rajpur Road",
      "Stanmax, evening multi-floor glazed storefront with illuminated mannequins",
      "Stanmax, daytime street perspective highlighting the curved glass rotunda",
      "Stanmax, multi-tier retail floor with custom timber fixtures and display tables",
      "Stanmax, circular central mannequin stage with geometric acoustic ceiling baffles",
    ],
  },
  {
    slug: "madame-jeddah",
    name: "Madame",
    location: "Al Andalus Mall, Jeddah, KSA",
    category: "high-end-retail",
    images: [
      "madame-jeddah-02.jpg",
      "madame-jeddah-01.jpg",
      "madame-jeddah-03.jpg",
    ],
    imageAlts: [
      "Madame, Jeddah, international retail showroom glass facade at Al Andalus Mall",
      "Madame, boutique entrance featuring bilingual Arabic and English brand signage",
      "Madame, interior merchandise displays with hanging pendant luminaires and polished flooring",
    ],
  },
  {
    slug: "global-republic-mohali",
    name: "Global Republic",
    location: "Bestech, Mohali",
    category: "high-end-retail",
    images: [
      "global-republic-mohali-01.jpg",
      "global-republic-mohali-02.jpg",
      "global-republic-mohali-03.jpg",
      "global-republic-mohali-04.jpg",
      "global-republic-mohali-05.jpg",
    ],
    imageAlts: [
      "Global Republic, Mohali, storefront showcase with glass bays at Bestech",
      "Global Republic, retail floor with bespoke natural wood wall bays and center islands",
      "Global Republic, mid-floor garment hanging displays and industrial mobile racks",
      "Global Republic, entrance vista showcasing merchandise zoning and track spotlights",
      "Global Republic, folded apparel modular shelving and full-length dressing mirrors",
    ],
  },
  {
    slug: "global-republic-rajouri-garden",
    name: "Global Republic",
    location: "Rajouri Garden Main Market, Delhi",
    category: "high-end-retail",
    images: [
      "global-republic-rajouri-garden-01.jpg",
      "global-republic-rajouri-garden-02.jpg",
      "global-republic-rajouri-garden-03.jpg",
      "global-republic-rajouri-garden-04.jpg",
      "global-republic-rajouri-garden-05.jpg",
    ],
    imageAlts: [
      "Global Republic, Rajouri Garden, flagship store entrance in Main Market, Delhi",
      "Global Republic, split-level retail space with custom industrial staircase and tall cabinetry",
      "Global Republic, double-height oak millwork display shelving under exposed concrete ceilings",
      "Global Republic, exposed white brick feature wall with wrought-iron globe pendant lights",
      "Global Republic, custom floor fixtures and tailored perimeter metal shelving system",
    ],
  },
  {
    slug: "camla-gurgaon",
    name: "Camla",
    location: "Ambience Mall, Gurugram",
    category: "high-end-retail",
    images: [
      "camla-gurgaon-01.jpg",
      "camla-gurgaon-02.jpg",
      "camla-gurgaon-03.jpg",
      "camla-gurgaon-04.jpg",
      "camla-gurgaon-05.jpg",
    ],
    imageAlts: [
      "Camla, Gurugram, store entrance with backlit signage at Ambience Mall",
      "Camla, concrete-finish architectural niche display with slatted wooden shelving",
      "Camla, minimalist tubular clothing racks and backlit brand lifestyle graphic",
      "Camla, curated apparel section with hand-carved baroque natural wood mirror",
      "Camla, structured denim wall modules with blue ombre feature backdrop",
    ],
  },
  {
    slug: "madame-gwalior",
    name: "Madame",
    location: "City Centre, Gwalior",
    category: "high-end-retail",
    images: [
      "madame-gwalior-01.jpg",
      "madame-gwalior-02.jpg",
      "madame-gwalior-03.jpg",
      "madame-gwalior-04.jpg",
    ],
    imageAlts: [
      "Madame, Gwalior, storefront in City Centre with contemporary slatted canopy",
      "Madame, apparel floor layout with glossy porcelain floor tiles and suspended spotlight rails",
      "Madame, handbag and accessories island with modular white illuminated cubic pedestals",
      "Madame, vertical column shelving and color-graded knitwear merchandise presentation",
    ],
  },
  {
    slug: "shri-ram-hari-ram-jewellers",
    name: "Shri Ram Hari Ram Jewellers",
    location: "India",
    category: "high-end-retail",
    images: [
      "shri-ram-hari-ram-jewellers-01.jpg",
      "shri-ram-hari-ram-jewellers-02.jpg",
    ],
    imageAlts: [
      "Shri Ram Hari Ram Jewellers, India, jewellery showroom display counters",
      "Shri Ram Hari Ram Jewellers, India, showroom interior with display niches",
    ],
  },
  { slug: "libas", name: "Libas", location: "India", category: "high-end-retail", images: [] },
  { slug: "manyavar", name: "Manyavar", location: "India", category: "high-end-retail", images: [] },
  { slug: "jockey", name: "Jockey", location: "India", category: "high-end-retail", images: [] },
  { slug: "hp", name: "HP", location: "Vegas Mall, Dwarka, Delhi", category: "high-end-retail", images: [] },
];

/** Projects with photos get a detail page and a clickable card. */
export const hasPhotos = (p: Project) => p.images.length > 0;
export const imageUrl = (file: string) => `/images/${file}`;
export const imageAlt = (p: Project, i: number) => p.imageAlts?.[i] ?? `${p.name}, ${p.location}`;

export const WORKSHOP_IMAGES = [
  {
    src: "/images/workshop-01.jpg",
    caption: "Heavy-Duty Edge Banding",
    alt: "Automatic edge-banding machine in operation at the Adhvik furniture workshop",
  },
  {
    src: "/images/workshop-02.jpg",
    caption: "Precision Panel Sizing",
    alt: "Sliding table panel saw and sheet cutting station with workshop technicians",
  },
  {
    src: "/images/workshop-03.jpg",
    caption: "Spindle Moulder & Joinery",
    alt: "Heavy duty woodworking spindle moulder and wood shaping machinery",
  },
  {
    src: "/images/workshop-04.jpg",
    caption: "Hydraulic Hot and Cold Press",
    alt: "Hydraulic multi-cylinder cold press for veneer and laminate sheet bonding",
  },
  {
    src: "/images/workshop-05.jpg",
    caption: "Automated CNC Routing",
    alt: "Industrial CNC routing machine with high-volume dust extraction ducting",
  },
  {
    src: "/images/workshop-06.jpg",
    caption: "CNC Control Station",
    alt: "Digital CNC machine console and computerized panel fabrication setup",
  },
];

/**
 * Hero crossfade. Only images 1000px wide or larger belong here.
 * wardrobe-gwalior-01 (422px), mi-arcus-01 (722px) and the workshop photos (800px or less) are too small.
 */
export const HERO_FEATURED_PHOTOS = [
  {
    src: "/images/anytime-fitness-karol-bagh-01.jpg",
    slug: "anytime-fitness-karol-bagh",
    label: "Anytime Fitness",
    location: "Karol Bagh, Delhi",
    alt: "Anytime Fitness, Karol Bagh, Delhi, gym floor",
  },
  {
    src: "/images/kuber-01.jpg",
    slug: "kuber",
    label: "Kuber",
    location: "India",
    alt: "Kuber store interior",
  },
];

export const SERVICES = [
  "Site survey, analysis, land acquisition and liaison with agencies",
  "Theme-based design and drawings",
  "Furniture, fixtures and wall/floor modules, designed and produced in-house",
  "Carpentry, MS & SS fabrication and civil works",
  "Flooring: marble, tiles, micro-cement, epoxy, wood",
  "Ceilings: gypsum, POP, fibre, wood, glass, metal",
  "Wall finishes: wallpaper, paint, stone and more",
  "Glass and mirror concepts, interior and exterior",
  "Façades, landscaping and signage",
  "HVAC, electrical, lighting and fire-fighting installation",
  "AMCs, renovation and repairs",
  "Indoor and outdoor branding",
];

export const TEAM_ROLES = [
  "Architects",
  "Interior Designers",
  "Project Managers",
  "Analysts",
  "Land Acquisition",
  "Technicians",
  "Electricians",
  "Execution Team",
  "Contractors",
  "Suppliers",
];

export const CONTACT_INFO = {
  email: "rs.adhvikprojects@gmail.com",
  phone: "+91 98180 20640",
  phoneSecondary: "+91 99711 40640",
  address: "203, Azadpur Village, Delhi 110033, India",
  googleMapsUrl: "https://maps.google.com/?q=Azadpur+Village,+Delhi+110033",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13997.771900130932!2d77.1687258!3d28.7062402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d023b499ee8db%3A0xb30e38634c44f57c!2sAzadpur%2C%20Delhi%2C%20110033!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin",
  est: "2013",
  founder: "Mr. Nagpal",
};
