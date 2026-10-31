export interface Category {
  slug: string;
  name: string;
  line: string;
  image?: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "high-end-retail",
    name: "High-End Retail Stores",
    line: "Flagship and premium brand stores, from shopfront to shelf.",
    image: "/images/wardrobe-gwalior-01.jpg",
  },
  {
    slug: "premium-residences",
    name: "Premium Residences",
    line: "Turnkey homes, delivered from structure to finish.",
  },
  {
    slug: "restaurants-hotels-cafeterias",
    name: "Restaurants, Hotels & Cafeterias",
    line: "Hospitality and dining spaces built for high footfall.",
  },
  {
    slug: "banquet-halls",
    name: "Banquet Halls",
    line: "Event spaces designed, built and handed over ready to host.",
  },
  {
    slug: "gyms",
    name: "Gyms",
    line: "Fitness floors, studios and locker rooms.",
    image: "/images/anytime-fitness-karol-bagh-01.jpg",
  },
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    line: "Workspaces planned around how teams actually work.",
  },
  {
    slug: "exhibitions",
    name: "Exhibitions",
    line: "Stalls and pavilions designed, fabricated and installed.",
  },
];

export const categoryName = (slug: string): string =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
