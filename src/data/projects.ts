export interface Project {
  number: string;
  slug: string;
  name: string;
  location: string;
  area: string;
  type: string;
  category: string;
  scope?: string;
  coverImage: string;
  coverAlt: string;
  gallery: {
    src: string;
    alt: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    slug: "wardrobe-gwalior",
    name: "Wardrobe",
    location: "Lashkar, Gwalior, MP",
    area: "19,000 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/wardrobe-gwalior-01.jpg",
    coverAlt: "Wardrobe, Gwalior, store façade and street entrance in Lashkar",
    gallery: [
      {
        src: "/images/wardrobe-gwalior-02.jpg",
        alt: "Wardrobe, reception and bespoke monolithic billing counter with geometric textured ceiling",
      },
      {
        src: "/images/wardrobe-gwalior-03.jpg",
        alt: "Wardrobe, formal menswear showcase with ambient coffered ceiling lighting",
      },
      {
        src: "/images/wardrobe-gwalior-04.jpg",
        alt: "Wardrobe, luxury lounge seating area with custom display racks and brass highlights",
      },
      {
        src: "/images/wardrobe-gwalior-05.jpg",
        alt: "Wardrobe, custom perimeter shelving and bespoke wardrobe architectural millwork",
      },
    ],
  },
  {
    number: "02",
    slug: "stanmax-dehradun",
    name: "Stanmax",
    location: "Rajpur Road, Dehradun",
    area: "36,000 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/stanmax-dehradun-05.jpg",
    coverAlt: "Stanmax, Dehradun, flagship retail store architectural exterior on Rajpur Road",
    gallery: [
      {
        src: "/images/stanmax-dehradun-01.jpg",
        alt: "Stanmax, evening multi-floor glazed storefront with illuminated mannequins",
      },
      {
        src: "/images/stanmax-dehradun-02.jpg",
        alt: "Stanmax, daytime street perspective highlighting the curved glass rotunda",
      },
      {
        src: "/images/stanmax-dehradun-03.jpg",
        alt: "Stanmax, multi-tier retail floor with custom timber fixtures and display tables",
      },
      {
        src: "/images/stanmax-dehradun-04.jpg",
        alt: "Stanmax, circular central mannequin stage with geometric acoustic ceiling baffles",
      },
    ],
  },
  {
    number: "03",
    slug: "madame-jeddah",
    name: "Madame",
    location: "Al Andalus Mall, Jeddah, KSA",
    area: "1,950 sq ft",
    type: "Retail · International",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/madame-jeddah-02.jpg",
    coverAlt: "Madame, Jeddah, international retail showroom glass facade at Al Andalus Mall",
    gallery: [
      {
        src: "/images/madame-jeddah-01.jpg",
        alt: "Madame, boutique entrance featuring bilingual Arabic and English brand signage",
      },
      {
        src: "/images/madame-jeddah-03.jpg",
        alt: "Madame, interior merchandise displays with hanging pendant luminaires and polished flooring",
      },
    ],
  },
  {
    number: "04",
    slug: "global-republic-mohali",
    name: "Global Republic",
    location: "Bestech, Mohali",
    area: "2,550 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/global-republic-mohali-01.jpg",
    coverAlt: "Global Republic, Mohali, storefront showcase with glass bays at Bestech",
    gallery: [
      {
        src: "/images/global-republic-mohali-02.jpg",
        alt: "Global Republic, retail floor with bespoke natural wood wall bays and center islands",
      },
      {
        src: "/images/global-republic-mohali-03.jpg",
        alt: "Global Republic, mid-floor garment hanging displays and industrial mobile racks",
      },
      {
        src: "/images/global-republic-mohali-04.jpg",
        alt: "Global Republic, entrance vista showcasing merchandise zoning and track spotlights",
      },
      {
        src: "/images/global-republic-mohali-05.jpg",
        alt: "Global Republic, folded apparel modular shelving and full-length dressing mirrors",
      },
    ],
  },
  {
    number: "05",
    slug: "global-republic-rajouri-garden",
    name: "Global Republic",
    location: "Rajouri Garden Main Market, Delhi",
    area: "1,900 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/global-republic-rajouri-garden-01.jpg",
    coverAlt: "Global Republic, Rajouri Garden, flagship store entrance in Main Market, Delhi",
    gallery: [
      {
        src: "/images/global-republic-rajouri-garden-02.jpg",
        alt: "Global Republic, split-level retail space with custom industrial staircase and tall cabinetry",
      },
      {
        src: "/images/global-republic-rajouri-garden-03.jpg",
        alt: "Global Republic, double-height oak millwork display shelving under exposed concrete ceilings",
      },
      {
        src: "/images/global-republic-rajouri-garden-04.jpg",
        alt: "Global Republic, exposed white brick feature wall with wrought-iron globe pendant lights",
      },
      {
        src: "/images/global-republic-rajouri-garden-05.jpg",
        alt: "Global Republic, custom floor fixtures and tailored perimeter metal shelving system",
      },
    ],
  },
  {
    number: "06",
    slug: "camla-gurgaon",
    name: "Camla",
    location: "Ambience Mall, Gurugram",
    area: "2,950 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/camla-gurgaon-01.jpg",
    coverAlt: "Camla, Gurugram, store entrance with backlit signage at Ambience Mall",
    gallery: [
      {
        src: "/images/camla-gurgaon-02.jpg",
        alt: "Camla, concrete-finish architectural niche display with slatted wooden shelving",
      },
      {
        src: "/images/camla-gurgaon-03.jpg",
        alt: "Camla, minimalist tubular clothing racks and backlit brand lifestyle graphic",
      },
      {
        src: "/images/camla-gurgaon-04.jpg",
        alt: "Camla, curated apparel section with hand-carved baroque natural wood mirror",
      },
      {
        src: "/images/camla-gurgaon-05.jpg",
        alt: "Camla, structured denim wall modules with blue ombre feature backdrop",
      },
    ],
  },
  {
    number: "07",
    slug: "madame-gwalior",
    name: "Madame",
    location: "City Centre, Gwalior",
    area: "2,350 sq ft",
    type: "Retail",
    category: "retail-stores",
    scope: "Design + turnkey execution",
    coverImage: "/images/madame-gwalior-01.jpg",
    coverAlt: "Madame, Gwalior, storefront in City Centre with contemporary slatted canopy",
    gallery: [
      {
        src: "/images/madame-gwalior-02.jpg",
        alt: "Madame, apparel floor layout with glossy porcelain floor tiles and suspended spotlight rails",
      },
      {
        src: "/images/madame-gwalior-03.jpg",
        alt: "Madame, handbag and accessories island with modular white illuminated cubic pedestals",
      },
      {
        src: "/images/madame-gwalior-04.jpg",
        alt: "Madame, vertical column shelving and color-graded knitwear merchandise presentation",
      },
    ],
  },
  {
    number: "08",
    slug: "fern-hotel-bhimtal",
    name: "The Fern Hotel",
    location: "Bhimtal, Nainital, Uttarakhand",
    area: "1,20,000 sq ft",
    type: "Hospitality",
    category: "hotels-banquet-halls",
    scope: "Design + turnkey execution",
    coverImage: "/images/fern-hotel-bhimtal-01.jpg",
    coverAlt: "The Fern Hotel, Bhimtal, resort illuminated evening panoramic exterior",
    gallery: [
      {
        src: "/images/fern-hotel-bhimtal-02.jpg",
        alt: "The Fern Hotel, open terrace dining pavilion with mountain valley views",
      },
      {
        src: "/images/fern-hotel-bhimtal-03.jpg",
        alt: "The Fern Hotel, luxury guest bedroom suite featuring vaulted timber ceiling",
      },
      {
        src: "/images/fern-hotel-bhimtal-04.jpg",
        alt: "The Fern Hotel, grand banquet and conference hall with layered ceiling lighting",
      },
      {
        src: "/images/fern-hotel-bhimtal-05.jpg",
        alt: "The Fern Hotel, fine dining restaurant with custom chandeliers and marble flooring",
      },
      {
        src: "/images/fern-hotel-bhimtal-06.jpg",
        alt: "The Fern Hotel, recreation lounge with custom woodwork and French armchairs",
      },
      {
        src: "/images/fern-hotel-bhimtal-07.jpg",
        alt: "The Fern Hotel, landscaped hill gazebo pavilion with mountain backdrop",
      },
      {
        src: "/images/fern-hotel-bhimtal-08.jpg",
        alt: "The Fern Hotel, manicured step lawns and stone paved garden promenade",
      },
    ],
  },
];

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

export const HERO_FEATURED_PHOTOS = [
  {
    src: "/images/wardrobe-gwalior-01.jpg",
    slug: "wardrobe-gwalior",
    label: "Wardrobe",
    location: "Gwalior",
    alt: "Wardrobe retail facade in Gwalior",
  },
  {
    src: "/images/fern-hotel-bhimtal-01.jpg",
    slug: "fern-hotel-bhimtal",
    label: "The Fern Hotel",
    location: "Bhimtal",
    alt: "The Fern Hotel exterior in Bhimtal",
  },
  {
    src: "/images/global-republic-rajouri-garden-01.jpg",
    slug: "global-republic-rajouri-garden",
    label: "Global Republic",
    location: "Delhi",
    alt: "Global Republic in Rajouri Garden, Delhi",
  },
  {
    src: "/images/camla-gurgaon-01.jpg",
    slug: "camla-gurgaon",
    label: "Camla",
    location: "Gurugram",
    alt: "Camla store in Ambience Mall, Gurugram",
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

export const TICKER_ITEMS = [
  "900+ PROJECTS DELIVERED",
  "20 STATES",
  "INTERNATIONAL: UAE & SAUDI ARABIA",
  "TURNKEY SOLUTIONS",
  "RETAIL STORES (MBO & EBO)",
  "HOTELS & BANQUET HALLS",
  "GYMS",
  "FOOD COURTS & CAFETERIAS",
  "CORPORATE OFFICES",
  "EXHIBITIONS",
  "IN-HOUSE FURNITURE WORKSHOP",
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
