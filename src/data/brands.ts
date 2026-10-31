/**
 * Clients shown in the Trusted By row.
 * `logo` is a single-colour mask (SVG or transparent PNG in public/logos/) and `ratio` is its width / height.
 * Brands without a logo file show their name as typeset text.
 */
export interface Client {
  name: string;
  logo?: string;
  ratio?: number;
}

export const BRANDS: Client[] = [
  { name: "Wardrobe" },
  { name: "Mi Arcus", logo: "/logos/mi-arcus.png", ratio: 744 / 415 },
  { name: "Anytime Fitness" },
  { name: "Libas" },
  { name: "Manyavar" },
  { name: "Jockey", logo: "/logos/jockey.png", ratio: 720 / 131 },
  { name: "HP", logo: "/logos/hp.svg", ratio: 1014 / 1012 },
  { name: "Shri Ram Hari Ram Jewellers" },
  { name: "Kuber" },
  { name: "Global Republic" },
  { name: "Madame" },
  { name: "Camla" },
  { name: "Stanmax" },
];
