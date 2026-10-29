// Per-location display data for the /locations pages (hero image, about text, port, services, hours).
// SEO copy and schema for each location live in ./ftwzLocations.ts.
export interface LocationDisplay {
  slug: string;
  city: string;
  state: string;
  type: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  port: string;
  nearestAirport: string;
  operatingHours: string;
  heroImage: string;
  services: string[];
  about: string;
}

export const locationDisplay: LocationDisplay[] = [
  {
    slug: "kochi",
    city: "Kochi",
    state: "Kerala",
    type: "FTWZ Warehouse",
    address: "SEZ ICTT, Vallarpadam, Kochi, Kerala 682504",
    phone: "+91 99402 11014",
    lat: 9.9312,
    lng: 76.2673,
    port: "Kochi Port (ICTT)",
    nearestAirport: "Cochin International Airport (COK) — 28 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "/images/locations/kochi.webp",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Cold Chain Storage", "Single Window Clearance", "Transshipment Hub", "Marine Export Logistics"],
    about: "Astromar's Kochi FTWZ facility is strategically located at the International Container Transshipment Terminal (ICTT), Vallarpadam — India's first dedicated container transshipment terminal. Offering world-class bonded warehousing with seamless port connectivity.",
  },
  {
    slug: "vizag",
    city: "Vizag",
    state: "Andhra Pradesh",
    type: "FTWZ Warehouse",
    address: "VSEZ, Duvvada, Visakhapatnam, AP 530049",
    phone: "+91 99402 11014",
    lat: 17.6868,
    lng: 83.2185,
    port: "Visakhapatnam Port",
    nearestAirport: "Visakhapatnam Airport (VTZ) — 15 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "/images/locations/vizag.webp",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance", "Steel & Engineering Logistics", "Pharma Logistics"],
    about: "Located within the Visakhapatnam Special Economic Zone (VSEZ), Astromar's Vizag facility offers strategic access to one of India's busiest eastern ports, supporting imports, exports, and re-export operations across the Bay of Bengal trade corridor.",
  },
  {
    slug: "delhi-khurja",
    city: "Delhi (Khurja)",
    state: "Uttar Pradesh",
    type: "FTWZ Warehouse",
    address: "Khurja Industrial Area, Bulandshahr, UP 203131",
    phone: "+91 99402 11014",
    lat: 28.2476,
    lng: 77.8538,
    port: "ICD Tughlakabad / Dadri",
    nearestAirport: "Indira Gandhi International Airport (DEL) — 75 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "ICD Connectivity", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance", "Retail & FMCG Distribution", "Consumer Electronics Hub"],
    about: "Astromar's Delhi (Khurja) FTWZ serves the National Capital Region and North India's industrial hinterland. With excellent connectivity to ICD Tughlakabad and Dadri, this facility is ideal for importers and exporters in Delhi, UP, Haryana, and Punjab.",
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "FTWZ Warehouse",
    address: "Aerospace SEZ, Devanahalli, Bengaluru, Karnataka 562165",
    phone: "+91 99402 11014",
    lat: 13.2486,
    lng: 77.7066,
    port: "ICD Whitefield / Bengaluru",
    nearestAirport: "Kempegowda International Airport (BLR) — 8 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1627309366653-2dedc084cdf1?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Aerospace Logistics", "High-Value Cargo", "Cold Chain Storage", "Single Window Clearance", "Air Cargo Express", "Biotech & Life Sciences"],
    about: "Located within the Aerospace SEZ at Devanahalli — just 8 km from Bengaluru International Airport — Astromar's Bengaluru FTWZ is purpose-built for aerospace, electronics, and high-value cargo. Ideal for India's growing tech and manufacturing sector.",
  },
  {
    slug: "dahej",
    city: "Dahej",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    address: "Z-85/2A, Dahej SEZ-1, Dahej, Gujarat",
    phone: "+91 99402 11014",
    lat: 21.7051,
    lng: 72.5793,
    port: "Dahej Port",
    nearestAirport: "Vadodara Airport (BDQ) — 80 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "/images/locations/dahej.webp",
    services: ["Duty-Free Storage", "GST Deferral", "Chemical Logistics", "Bulk Cargo", "Bonded Warehousing", "Single Window Clearance", "Hazmat Handling", "Tanker Terminal Access"],
    about: "Astromar's Dahej FTWZ is located within Dahej SEZ-1, one of India's largest chemical and petrochemical industrial estates. This facility is specially equipped for chemical, polymer, and industrial cargo with full compliance and safety standards.",
  },
  {
    slug: "mundra",
    city: "Mundra",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    address: "APSEZ, Survey No. 169/36, Mundra, Kutch, Gujarat 370421",
    phone: "+91 99402 11014",
    lat: 22.8386,
    lng: 69.7295,
    port: "Mundra Port (APSEZ)",
    nearestAirport: "Bhuj Airport (BHJ) — 65 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "/images/locations/mundra.webp",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bulk Cargo", "Single Window Clearance", "ULCV Container Operations", "Middle East & Africa Gateway"],
    about: "Located at Adani Ports and SEZ (APSEZ), Mundra — India's largest commercial port — Astromar's Mundra FTWZ offers unmatched scale and connectivity for importers, exporters, and re-export operators. Strategically positioned for trade with the Middle East, Africa, and Europe.",
  },
  {
    slug: "chennai-hq",
    city: "Chennai HQ",
    state: "Tamil Nadu",
    type: "Registered Office",
    address: "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai - 600 040",
    phone: "+91 99402 11014",
    lat: 13.0850,
    lng: 80.2101,
    port: "Chennai Port (18 km)",
    nearestAirport: "Chennai International Airport (MAA) — 18 km",
    operatingHours: "Mon–Sat: 9:00 AM – 7:00 PM",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    services: ["FTWZ Consulting", "Customs & Compliance", "Freight Management", "Supply Chain Advisory", "Trade Finance Support", "Business Development"],
    about: "Astromar Logistics Pvt Ltd's registered and corporate office in Anna Nagar, Chennai. The central hub for all business development, customer support, compliance, and operations coordination across our pan-India FTWZ network.",
  },
  {
    "slug": "chennai",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "FTWZ Warehouse",
    "address": "Sriperumbudur: Mannur Village, Sriperumbudur, Kancheepuram, Tamil Nadu 602105; Vallur: Vallur Village, Ponneri, Tiruvallur, Tamil Nadu 600120",
    "phone": "+91 99402 11014",
    "lat": 12.9716,
    "lng": 79.9473,
    "port": "Sriperumbudur: Chennai Port; Vallur: Kamarajar Port (Ennore)",
    "nearestAirport": "Sriperumbudur: Chennai International Airport (MAA) — 42 km; Vallur: Chennai International Airport (MAA) — 35 km",
    "operatingHours": "Monday to Saturday, 8:00 AM to 8:00 PM",
    "heroImage": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
    "services": [
      "Repacking and Relabelling",
      "Sorting and Kitting",
      "Quality Inspection",
      "Consolidation",
      "CKD/SKD Assembly",
      "Cold Storage Warehouse",
      "Dangerous Goods Warehouse",
      "On-Site Customs Clearance"
    ],
    "about": "Astromar Logistics Pvt. Ltd. runs two free trade warehousing zone (FTWZ) facilities in Chennai: Sriperumbudur, on the NH 48 industrial corridor, and Vallur, close to the north Chennai ports. Customs duty and IGST are deferred until goods are cleared into the domestic market."
  },
  {
    "slug": "mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "FTWZ Warehouse",
    "address": "JNPA: JNPA SEZ, Uran, Raigad, Maharashtra 400707; Panvel: Village Sai, Taluka Panvel, Raigad, Maharashtra 410206",
    "phone": "+91 99402 11014",
    "lat": 18.9543,
    "lng": 72.9479,
    "port": "JNPA: Jawaharlal Nehru Port (JNPA); Panvel: Nhava Sheva (JNPA)",
    "nearestAirport": "JNPA: Chhatrapati Shivaji Maharaj International Airport (BOM) — 40 km; Panvel: Chhatrapati Shivaji Maharaj International Airport (BOM) — 45 km",
    "operatingHours": "Monday to Saturday, 8:00 AM to 8:00 PM",
    "heroImage": "/images/locations/panvel.webp",
    "services": [
      "Repacking and Relabelling",
      "Sorting and Kitting",
      "Quality Inspection",
      "Consolidation",
      "CKD/SKD Assembly",
      "Cold Storage Warehouse",
      "Dangerous Goods Warehouse",
      "On-Site Customs Clearance"
    ],
    "about": "Astromar Logistics Pvt. Ltd. operates two FTWZ facilities in the Mumbai region: an on-port site inside the JNPA SEZ at Uran, and an inland site at Panvel in Navi Mumbai. Customs duty and IGST are deferred until goods are cleared into the domestic market."
  },
];
