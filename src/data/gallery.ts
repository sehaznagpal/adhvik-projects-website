/**
 * GALLERY: the one place to add or remove images.
 * Put the file in public/images/, then add a line here: filename, caption (brand name) and orientation.
 * Keep it to sharp, well-lit photos. Order here is the order on the page.
 */
export interface GalleryItem {
  file: string;
  caption: string;
  orientation: "landscape" | "portrait" | "square";
  /** Natural size in pixels, so the grid reserves space before the image loads. */
  width: number;
  height: number;
}

export const GALLERY: GalleryItem[] = [
  { file: "kuber-01.jpg", caption: "Kuber", orientation: "landscape", width: 1600, height: 1200 },
  { file: "global-republic-rajouri-garden-01.jpg", caption: "Global Republic", orientation: "portrait", width: 763, height: 1139 },
  { file: "madame-jeddah-02.jpg", caption: "Madame", orientation: "landscape", width: 1280, height: 940 },
  { file: "wardrobe-gwalior-02.jpg", caption: "Wardrobe", orientation: "portrait", width: 662, height: 883 },
  { file: "anytime-fitness-karol-bagh-01.jpg", caption: "Anytime Fitness", orientation: "landscape", width: 1280, height: 960 },
  { file: "mi-arcus-01.jpg", caption: "Mi Arcus", orientation: "landscape", width: 722, height: 425 },
  { file: "shri-ram-hari-ram-jewellers-01.jpg", caption: "Shri Ram Hari Ram Jewellers", orientation: "square", width: 760, height: 760 },
  { file: "global-republic-mohali-01.jpg", caption: "Global Republic", orientation: "landscape", width: 960, height: 540 },
  { file: "workshop-01.jpg", caption: "Adhvik workshop", orientation: "portrait", width: 600, height: 800 },
  { file: "stanmax-dehradun-05.jpg", caption: "Stanmax", orientation: "landscape", width: 751, height: 505 },
  { file: "madame-jeddah-03.jpg", caption: "Madame", orientation: "landscape", width: 791, height: 632 },
  { file: "wardrobe-gwalior-04.jpg", caption: "Wardrobe", orientation: "landscape", width: 691, height: 439 },
  { file: "global-republic-mohali-04.jpg", caption: "Global Republic", orientation: "landscape", width: 960, height: 540 },
];
