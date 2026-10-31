/**
 * GALLERY: the one place to add or remove images.
 * Put the file in public/images/, then add a line here: filename, caption (brand name), location and orientation.
 * Keep it to sharp, well-lit photos. Order here is the starting order on the page: keep the same brand at least
 * 5 positions apart (the gallery also swaps images at runtime if two of a brand end up touching).
 */
export interface GalleryItem {
  file: string;
  caption: string;
  /** Place shown with the caption, e.g. "Jeddah, Saudi Arabia". Use "India" where unknown. */
  location: string;
  orientation: "landscape" | "portrait" | "square";
  /** Natural size in pixels, so the grid reserves space before the image loads. */
  width: number;
  height: number;
}

export const GALLERY: GalleryItem[] = [
  { file: "kuber-01.jpg", caption: "Kuber", location: "India", orientation: "landscape", width: 1600, height: 1200 },
  { file: "global-republic-rajouri-garden-01.jpg", caption: "Global Republic", location: "Rajouri Garden, Delhi", orientation: "portrait", width: 763, height: 1139 },
  { file: "madame-jeddah-02.jpg", caption: "Madame", location: "Jeddah, Saudi Arabia", orientation: "landscape", width: 1280, height: 940 },
  { file: "wardrobe-gwalior-02.jpg", caption: "Wardrobe", location: "Gwalior, Madhya Pradesh", orientation: "portrait", width: 662, height: 883 },
  { file: "anytime-fitness-karol-bagh-01.jpg", caption: "Anytime Fitness", location: "Karol Bagh, Delhi", orientation: "landscape", width: 1280, height: 960 },
  { file: "mi-arcus-01.jpg", caption: "Mi Arcus", location: "India", orientation: "landscape", width: 722, height: 425 },
  { file: "global-republic-mohali-01.jpg", caption: "Global Republic", location: "Mohali, Punjab", orientation: "landscape", width: 960, height: 540 },
  { file: "madame-jeddah-01.jpg", caption: "Madame", location: "Jeddah, Saudi Arabia", orientation: "landscape", width: 791, height: 543 },
  { file: "wardrobe-gwalior-04.jpg", caption: "Wardrobe", location: "Gwalior, Madhya Pradesh", orientation: "landscape", width: 691, height: 439 },
  { file: "shri-ram-hari-ram-jewellers-01.jpg", caption: "Shri Ram Hari Ram Jewellers", location: "India", orientation: "square", width: 760, height: 760 },
  { file: "workshop-01.jpg", caption: "Adhvik workshop", location: "Mundka, Delhi", orientation: "portrait", width: 600, height: 800 },
  { file: "global-republic-mohali-04.jpg", caption: "Global Republic", location: "Mohali, Punjab", orientation: "landscape", width: 960, height: 540 },
  { file: "madame-jeddah-03.jpg", caption: "Madame", location: "Jeddah, Saudi Arabia", orientation: "landscape", width: 791, height: 632 },
  { file: "wardrobe-gwalior-06.jpg", caption: "Wardrobe", location: "Gwalior, Madhya Pradesh", orientation: "landscape", width: 586, height: 439 },
  { file: "stanmax-dehradun-05.jpg", caption: "Stanmax", location: "Dehradun, Uttarakhand", orientation: "landscape", width: 751, height: 505 },
  { file: "mi-arcus-02.jpg", caption: "Mi Arcus", location: "India", orientation: "landscape", width: 596, height: 335 },
  { file: "workshop-06.jpg", caption: "Adhvik workshop", location: "Mundka, Delhi", orientation: "landscape", width: 800, height: 600 },
];
