export interface Category {
  slug: string;
  name: string;
  line: string;
  image?: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "retail-stores",
    name: "Retail Stores (MBO & EBO)",
    line: "Multi-brand and exclusive brand outlets, from flagship to mall store.",
    image: "/images/wardrobe-gwalior-02.jpg",
  },
  {
    slug: "hotels-banquet-halls",
    name: "Hotels / Banquet Halls",
    line: "Rooms, lobbies, dining and event spaces.",
  },
  {
    slug: "gyms",
    name: "Gyms",
    line: "Fitness floors, studios and locker rooms.",
  },
  {
    slug: "food-courts-cafeterias",
    name: "Food Courts & Cafeterias",
    line: "High-footfall dining, built to last.",
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
