export interface FTWZLocationDetail {
  slug: string;
  city: string;
  state: string;
  type: string;
  phone: string;
  lat: number;
  lng: number;
  address: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  portOverview: {
    headline: string;
    description: string;
    portName: string;
    portType: string;
    sezZone: string;
    operatedBy: string;
    established: string;
    totalArea: string;
  };
  connectivity: {
    headline: string;
    road: string[];
    rail: string[];
    sea: string[];
    air: string[];
  };
  keyAdvantages: string[];
  industries: string[];
}

export const ftwzLocationDetails: FTWZLocationDetail[] = [
  {
    slug: "kochi",
    city: "Kochi",
    state: "Kerala",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 9.9312,
    lng: 76.2673,
    address: "SEZ ICTT, Vallarpadam, Kochi, Ernakulam, Kerala 682504",
    seo: {
      title: "FTWZ Warehouse Kochi | Vallarpadam Port SEZ | Astromar",
      description: "Duty-free FTWZ warehousing at Vallarpadam International Container Transshipment Terminal (ICTT) in Kochi. Strategic access to India's first transshipment port for seamless cargo operations.",
      keywords: "FTWZ Kochi, Vallarpadam ICTT, Kochi port warehouse, duty free zone Kerala, transshipment terminal Kochi",
    },
    portOverview: {
      headline: "Vallarpadam ICTT — India's Premier Transshipment Hub",
      description: "The International Container Transshipment Terminal (ICTT) at Vallarpadam is India's first dedicated transshipment facility, operated by Adani Ports (DP World). Located within the Cochin SEZ, the terminal handles containerized cargo with direct mother-vessel calls, reducing transshipment via Colombo or Singapore. The deep-draft berths accommodate ultra-large container vessels (ULCVs), making it a gateway for South India's import-export trade.",
      portName: "Cochin Port (Vallarpadam ICTT)",
      portType: "Major Port — Container Transshipment Terminal",
      sezZone: "Cochin SEZ, Vallarpadam",
      operatedBy: "Adani Ports / DP World",
      established: "2011",
      totalArea: "30 hectares (terminal area)",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Kochi",
      road: [
        "NH 66 (Kochi–Mangalore–Mumbai coastal highway)",
        "NH 544 (Kochi–Salem–Bengaluru)",
        "Goshree bridges connecting Vallarpadam island to mainland Kochi",
        "4-lane dedicated expressway from NH to ICTT",
      ],
      rail: [
        "Dedicated rail corridor linking ICTT to Indian Railways network",
        "Direct rail connectivity to Ernakulam Junction (18 km)",
        "Container rail service to hinterland ICDs across Kerala and Tamil Nadu",
      ],
      sea: [
        "Direct mother-vessel services to Europe, Middle East, and Far East",
        "Feeder services to Colombo, Singapore, and Jebel Ali",
        "14.5m draft — accommodates Post-Panamax vessels",
        "Annual handling capacity: 1 million TEUs",
      ],
      air: [
        "Cochin International Airport (CIAL) — 28 km away",
        "India's first fully solar-powered airport",
        "Cargo terminal handles 60,000+ MT annually",
      ],
    },
    keyAdvantages: [
      "India's first transshipment terminal — direct mother-vessel connectivity",
      "Reduces dependency on Colombo/Singapore transshipment by 3–5 days",
      "Duty-free storage within Cochin SEZ with FTWZ benefits",
      "Strategic location for trade with Middle East, Africa, and Europe",
      "Dedicated rail corridor ensures efficient hinterland movement",
      "Proximity to Kerala's spice, seafood, and rubber export industries",
    ],
    industries: ["Spices & Agri-products", "Seafood & Marine Products", "Rubber & Latex", "Electronics", "Pharmaceuticals", "Textiles"],
  },
  {
    slug: "vizag",
    city: "Vizag",
    state: "Andhra Pradesh",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 17.6868,
    lng: 83.2185,
    address: "VSEZ, Duvvada, Visakhapatnam, Andhra Pradesh 530049",
    seo: {
      title: "FTWZ Warehouse Vizag | Visakhapatnam Port SEZ | Astromar",
      description: "FTWZ warehousing at Visakhapatnam SEZ (VSEZ) with direct access to Vizag Port — India's East Coast gateway for bulk and container cargo to Southeast Asia and Far East.",
      keywords: "FTWZ Vizag, Visakhapatnam port, VSEZ warehouse, duty free zone Andhra Pradesh, Vizag SEZ",
    },
    portOverview: {
      headline: "Visakhapatnam Port — East Coast's Largest Commercial Port",
      description: "Visakhapatnam Port is the largest port by cargo volume on India's East Coast, handling over 70 million tonnes annually. The port specializes in bulk cargo including iron ore, coal, petroleum, and fertilizers, while also offering container handling facilities. Located adjacent to the Visakhapatnam SEZ (VSEZ) at Duvvada, our FTWZ facility provides duty-free warehousing with seamless port connectivity for businesses trading with Southeast Asia, Far East, and beyond.",
      portName: "Visakhapatnam Port Trust",
      portType: "Major Port — Multi-Cargo (Bulk + Container)",
      sezZone: "Visakhapatnam SEZ (VSEZ), Duvvada",
      operatedBy: "Visakhapatnam Port Authority",
      established: "1933 (Port), 1989 (SEZ)",
      totalArea: "VSEZ — 360 hectares",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Vizag",
      road: [
        "NH 16 (Chennai–Kolkata highway) passes through Visakhapatnam",
        "NH 65 connecting to Hyderabad via Vijayawada",
        "Well-developed industrial road network to VSEZ Duvvada",
      ],
      rail: [
        "Visakhapatnam Railway Junction — major junction on Howrah-Chennai main line",
        "Dedicated freight corridor for port cargo movement",
        "Container rakes available from VSEZ ICD",
      ],
      sea: [
        "Direct services to Southeast Asia, Far East, and Middle East",
        "Inner harbour: 10.7m draft; Outer harbour: 18.1m draft",
        "Annual cargo throughput: 70+ million tonnes",
        "Container terminal capacity: 0.7 million TEUs",
      ],
      air: [
        "Visakhapatnam International Airport — 15 km from VSEZ",
        "Cargo handling facility for express and air freight",
        "Domestic and international connections",
      ],
    },
    keyAdvantages: [
      "Largest cargo port on India's East Coast by volume",
      "Strategic gateway for trade with Southeast Asia and Far East",
      "VSEZ offers multi-product SEZ benefits across sectors",
      "Deep-draft outer harbour handles capesize vessels",
      "Proximity to steel, pharma, and petrochemical industrial clusters",
      "Competitive land and operational costs compared to West Coast ports",
    ],
    industries: ["Steel & Metals", "Pharmaceuticals", "Petrochemicals", "Fertilizers", "Engineering Goods", "Food Processing"],
  },
  {
    slug: "mumbai-panvel",
    city: "Mumbai (Panvel)",
    state: "Maharashtra",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 18.9894,
    lng: 73.1175,
    address: "Village Sai, Taluka Panvel, District - Raigad, Mumbai, Maharashtra, 410206, India",
    seo: {
      title: "FTWZ Warehouse Mumbai Panvel | Navi Mumbai SEZ | Astromar",
      description: "Duty-free FTWZ warehousing in Panvel, Navi Mumbai — strategically positioned between JNPA port and Mumbai's industrial corridor for rapid cargo distribution across Western India.",
      keywords: "FTWZ Mumbai Panvel, Navi Mumbai warehouse, Panvel SEZ, duty free zone Mumbai, JNPA logistics",
    },
    portOverview: {
      headline: "Panvel — Gateway to Mumbai's Industrial Heartland",
      description: "Strategically located in the Raigad district of Navi Mumbai, our Panvel FTWZ facility serves as a critical link between Jawaharlal Nehru Port Authority (JNPA) and Mumbai's vast industrial and commercial corridors. Panvel's location at the junction of major highways makes it ideal for duty-free warehousing, re-export operations, and just-in-time distribution across Maharashtra and Western India.",
      portName: "JNPA (Jawaharlal Nehru Port Authority) — served via road",
      portType: "Inland FTWZ — Adjacent to India's busiest container port",
      sezZone: "Navi Mumbai SEZ",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Active",
      totalArea: "Multi-warehouse campus",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Panvel",
      road: [
        "Mumbai–Pune Expressway (25 km from facility)",
        "NH 4 (Mumbai–Bangalore national highway)",
        "Mumbai Trans Harbour Link (MTHL) — direct access to South Mumbai",
        "Panvel–JNPA road corridor (35 km)",
      ],
      rail: [
        "Panvel Railway Junction — Central and Harbour line terminus",
        "Proposed Navi Mumbai Metro connectivity",
        "Container rail services to JNPA ICD network",
      ],
      sea: [
        "JNPA — India's largest container port (35 km)",
        "5 container terminals with 18m+ draft",
        "Annual handling capacity: 6+ million TEUs",
        "Direct liner services to 200+ global ports",
      ],
      air: [
        "Navi Mumbai International Airport (NMIA) — ~15 km",
        "Chhatrapati Shivaji Maharaj International Airport — 45 km",
        "Major air cargo hub for Western India",
      ],
    },
    keyAdvantages: [
      "Proximity to JNPA — India's #1 container port",
      "Excellent highway connectivity to Pune, Nashik, and Gujarat industrial belts",
      "MTHL reduces South Mumbai access time to 20 minutes",
      "Upcoming Navi Mumbai Airport will further enhance logistics efficiency",
      "Lower warehousing costs compared to core Mumbai",
      "Central location for pan-India distribution",
    ],
    industries: ["Automotive & Auto Parts", "Electronics & IT Hardware", "FMCG", "Chemicals", "Textiles & Garments", "Machinery & Equipment"],
  },
  {
    slug: "mumbai-jnpa",
    city: "Mumbai (JNPA)",
    state: "Maharashtra",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 18.9543,
    lng: 72.9479,
    address: "JNPA SEZ, Village-Sawarkhar, Uran, Raigad, Maharashtra, 400707",
    seo: {
      title: "FTWZ Warehouse JNPA Mumbai | Nhava Sheva SEZ | Astromar",
      description: "On-port FTWZ warehousing at JNPA SEZ, Nhava Sheva — India's busiest container port. Zero transit time for import/re-export with direct terminal access.",
      keywords: "FTWZ JNPA, Nhava Sheva warehouse, JNPA SEZ, duty free zone Mumbai port, container port warehouse",
    },
    portOverview: {
      headline: "JNPA — India's Busiest Container Port",
      description: "Jawaharlal Nehru Port Authority (JNPA) at Nhava Sheva handles approximately 50% of India's containerized cargo, making it the nation's most critical trade gateway. Our FTWZ facility within the JNPA SEZ offers the unique advantage of on-port duty-free warehousing — eliminating transit time and costs between the terminal and warehouse. This is ideal for re-export operations, consolidation, and just-in-time supply chains.",
      portName: "Jawaharlal Nehru Port Authority (JNPA / Nhava Sheva)",
      portType: "Major Port — India's Largest Container Port",
      sezZone: "JNPA SEZ, Uran",
      operatedBy: "JNPA / Multiple Terminal Operators (APMT, BMCT, NSIGT, NSICT)",
      established: "1989 (Port), 2006 (SEZ)",
      totalArea: "JNPA SEZ — 277 hectares",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from JNPA",
      road: [
        "NH 348 (Uran–Panvel highway) connecting to Mumbai–Pune Expressway",
        "JNPA port road network with dedicated freight corridors",
        "Mumbai Trans Harbour Link (MTHL) for South Mumbai access",
      ],
      rail: [
        "Dedicated Freight Corridor (DFC) — Western corridor terminus",
        "On-port rail connectivity to all container terminals",
        "Direct rail to North India ICDs (Delhi, Ludhiana, Jaipur)",
      ],
      sea: [
        "5 container terminals: APMT, BMCT, NSIGT, NSICT, JNPCT",
        "Handles 6+ million TEUs annually",
        "16–18m draft — accommodates ultra-large container vessels",
        "Direct liner connectivity to 200+ ports in 70+ countries",
      ],
      air: [
        "Navi Mumbai International Airport (NMIA) — 12 km",
        "CSMIA Mumbai — 55 km via MTHL/freeway",
      ],
    },
    keyAdvantages: [
      "On-port FTWZ — zero transit time between terminal and warehouse",
      "India's #1 container port handling 50% of national container trade",
      "Direct liner services to all major global trade routes",
      "Dedicated Freight Corridor for efficient rail distribution to North India",
      "Ideal for re-export, consolidation, and break-bulk operations",
      "Multiple terminal operators ensure competitive handling rates",
    ],
    industries: ["Electronics & Consumer Goods", "Automotive Parts", "Pharmaceuticals", "Chemicals", "Textiles & Apparel", "Machinery"],
  },
  {
    slug: "mundra",
    city: "Mundra",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 22.8394,
    lng: 69.7214,
    address: "APSEZ, Village Dhrub, District: Kutch, Gujarat, Mundra 370421, India",
    seo: {
      title: "FTWZ Warehouse Mundra | Adani Port SEZ Gujarat | Astromar",
      description: "FTWZ warehousing at Adani Port SEZ (APSEZ) Mundra — India's largest private port. Multi-modal connectivity with dedicated rail and the shortest sea route to the Middle East and Europe.",
      keywords: "FTWZ Mundra, Adani port warehouse, APSEZ Mundra, duty free zone Gujarat, Mundra port logistics",
    },
    portOverview: {
      headline: "Mundra Port — India's Largest Private Sector Port",
      description: "Mundra Port, operated by Adani Ports and SEZ (APSEZ), is India's largest commercial port by cargo volume, handling over 150 million metric tonnes annually. The port offers India's deepest container terminal berths and the shortest sailing distance to the Middle East, Europe, and Africa. Our FTWZ facility within APSEZ provides duty-free storage with seamless port-to-warehouse logistics for diverse cargo types.",
      portName: "Mundra Port (APSEZ)",
      portType: "Private Port — India's Largest by Cargo Volume",
      sezZone: "Adani Port SEZ (APSEZ)",
      operatedBy: "Adani Ports and SEZ Ltd",
      established: "1998 (Port), 2003 (SEZ)",
      totalArea: "APSEZ — 8,500+ hectares",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Mundra",
      road: [
        "NH 8A connecting to Ahmedabad (380 km) and Rajasthan",
        "SH 6 to Bhuj and Gandhidham",
        "Well-maintained industrial road network within APSEZ",
      ],
      rail: [
        "Dedicated rail siding within APSEZ connected to Western DFC",
        "Regular container rakes to North India ICDs",
        "Gandhidham Junction — 50 km (major railhead for Kutch region)",
      ],
      sea: [
        "19 berths including India's deepest container berths (16.5m draft)",
        "Annual throughput: 150+ million metric tonnes",
        "Container capacity: 6.5 million TEUs",
        "Shortest sailing distance from India to Middle East and Europe",
        "Direct services to 50+ international ports",
      ],
      air: [
        "Bhuj Airport — 55 km (limited cargo capacity)",
        "Ahmedabad International Airport — 380 km (primary air cargo hub for Gujarat)",
        "Kandla Airport — 60 km",
      ],
    },
    keyAdvantages: [
      "India's largest port — unmatched scale and handling capacity",
      "Shortest sea route to Middle East, Europe, and Africa",
      "Deepest draft berths in India accommodate the world's largest vessels",
      "Fully integrated port-SEZ-FTWZ ecosystem within APSEZ",
      "Dedicated rail corridor for efficient North India distribution",
      "Hub for Gujarat's manufacturing and petrochemical export industries",
    ],
    industries: ["Petrochemicals", "Agri-commodities", "Minerals & Metals", "Textiles", "Ceramics & Tiles", "Engineering Goods"],
  },
  {
    slug: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Hub & HQ",
    phone: "+91 99402 11014",
    lat: 13.0827,
    lng: 80.2707,
    address: "Mannur & Valarpuram Village, Sriperumbudur Taluk, Kancheepuram District, 602105 & Vallur & Edayanchavadi Village, Ponneri Taluk, Tiruvallur District, 600120, Tamil Nadu, India",
    seo: {
      title: "FTWZ Hub Chennai | Astromar HQ | Sriperumbudur & Ponneri",
      description: "Astromar's headquarters and FTWZ hub in Chennai — dual facilities in Sriperumbudur and Ponneri. Strategic access to Chennai Port, Kattupalli Port, and South India's automotive-electronics corridor.",
      keywords: "FTWZ Chennai, Sriperumbudur warehouse, Ponneri FTWZ, Chennai port logistics, duty free zone Tamil Nadu",
    },
    portOverview: {
      headline: "Chennai — South India's Trade & Manufacturing Capital",
      description: "Chennai serves as Astromar's operational hub and headquarters, with dual FTWZ facilities strategically located in Sriperumbudur (Kancheepuram) and Ponneri (Tiruvallur). These locations provide direct access to both Chennai Port (India's 2nd largest container port) and Kattupalli Port (Adani). Chennai's position as the 'Detroit of India' for automotive and a major electronics manufacturing hub makes it a critical node for India's FTWZ network.",
      portName: "Chennai Port & Kattupalli Port",
      portType: "Major Port — Container & Automotive Hub",
      sezZone: "Sriperumbudur & Ponneri FTWZ Zones",
      operatedBy: "Astromar Logistics Pvt Ltd (HQ)",
      established: "Operational Hub",
      totalArea: "Dual-campus facilities",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Chennai",
      road: [
        "NH 48 (Chennai–Bangalore highway) via Sriperumbudur",
        "NH 16 (Chennai–Kolkata East Coast highway)",
        "Grand Southern Trunk Road (NH 45) to Madurai and South TN",
        "Outer Ring Road and Peripheral Expressway for city bypass",
      ],
      rail: [
        "Chennai Central & Egmore — major railway junctions",
        "Dedicated container rake services from Chennai Port ICD",
        "Southern Railway network connects to all South India destinations",
        "Proposed DFC extension to Chennai",
      ],
      sea: [
        "Chennai Port — India's 2nd largest container port (1.5 million TEUs capacity)",
        "Kattupalli Port (Adani) — 30 km from Ponneri facility",
        "Ennore Port — bulk cargo and LNG terminal",
        "Direct liner services to East Asia, Southeast Asia, Europe, and Americas",
      ],
      air: [
        "Chennai International Airport (MAA) — 35 km from Sriperumbudur, 25 km from Ponneri",
        "Major international air cargo hub — 400,000+ MT annually",
        "Dedicated air cargo complex with cold chain facilities",
      ],
    },
    keyAdvantages: [
      "Astromar HQ — centralized operations and customer support",
      "Dual facilities ensure redundancy and wider coverage",
      "Access to 3 ports: Chennai Port, Kattupalli, and Ennore",
      "'Detroit of India' — hub for automotive OEMs and tier-1 suppliers",
      "Electronics manufacturing cluster (Foxconn, Samsung, Dell)",
      "Excellent skilled workforce and established logistics ecosystem",
    ],
    industries: ["Automotive & Auto Components", "Electronics & IT Hardware", "Pharmaceuticals", "Textiles & Leather", "Heavy Engineering", "Renewable Energy Equipment"],
  },
  {
    slug: "delhi-khurja",
    city: "Delhi (Khurja)",
    state: "Uttar Pradesh",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 28.2476,
    lng: 77.8538,
    address: "Junction Road, Khurja Industrial Area, Village Maujpur, Khurja, District - Bulandshahr, UP - 203131, India",
    seo: {
      title: "FTWZ Warehouse Delhi NCR Khurja | North India Gateway | Astromar",
      description: "FTWZ warehousing at Khurja near Delhi NCR — North India's trade gateway on the Western Dedicated Freight Corridor. Serve Delhi, Haryana, Punjab, and UP markets with duty-free logistics.",
      keywords: "FTWZ Delhi, Khurja FTWZ warehouse, Delhi NCR duty free zone, North India logistics, DFC Khurja",
    },
    portOverview: {
      headline: "Khurja — North India's FTWZ Gateway on the DFC",
      description: "Located in Bulandshahr district of Uttar Pradesh, our Khurja FTWZ facility is strategically positioned on the Western Dedicated Freight Corridor (DFC) — India's most important rail freight artery connecting JNPA and Mundra ports to North India's consumption heartland. Khurja serves the massive Delhi-NCR, Haryana, Punjab, and UP markets, making it the ideal inland FTWZ location for duty-free warehousing, deferred duty operations, and pan-North India distribution.",
      portName: "Inland FTWZ — Connected to JNPA & Mundra via DFC",
      portType: "Inland FTWZ — Dedicated Freight Corridor Node",
      sezZone: "Khurja Industrial Area",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Active",
      totalArea: "Industrial campus",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Khurja",
      road: [
        "NH 91 (Delhi–Agra highway) — 15 km from facility",
        "Yamuna Expressway (28 km) connecting Greater Noida to Agra",
        "NH 34 connecting Khurja to Aligarh and Bareilly",
        "Delhi NCR — 85 km via Noida expressway",
      ],
      rail: [
        "Western Dedicated Freight Corridor (DFC) — Khurja junction node",
        "Direct DFC connectivity to JNPA (Mumbai) and Mundra (Gujarat)",
        "Khurja Junction — major railhead on Delhi-Howrah mainline",
        "Regular container rake services to/from western ports",
      ],
      sea: [
        "Connected to JNPA (Mumbai) via DFC — ~24 hours rail transit",
        "Connected to Mundra Port via DFC — ~20 hours rail transit",
        "ICD Dadri (Greater Noida) — 40 km, handles port-bound containers",
      ],
      air: [
        "Noida International Airport (Jewar) — 50 km",
        "IGI Airport Delhi — 95 km",
        "Major air cargo hub for North India",
      ],
    },
    keyAdvantages: [
      "Located on the Western DFC — India's freight superhighway",
      "Serves the 600+ million population of North India",
      "85 km from Delhi NCR — India's largest consumption market",
      "Duty-free warehousing for deferred customs clearance",
      "Upcoming Jewar Airport will transform logistics infrastructure",
      "Cost-effective warehousing compared to Delhi NCR",
    ],
    industries: ["Consumer Electronics", "FMCG & Retail", "Automotive Parts", "Ceramics & Pottery", "Textiles & Garments", "Machinery & Equipment"],
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 13.2486,
    lng: 77.7066,
    address: "Innomech Aerospace Tooling Pvt Ltd, Aerospace SEZ Sector, Devanahalli, Bengaluru, Karnataka, 562165",
    seo: {
      title: "FTWZ Warehouse Bengaluru | Aerospace SEZ Devanahalli | Astromar",
      description: "FTWZ warehousing in Bengaluru's Aerospace SEZ at Devanahalli — India's aerospace and defence hub. Duty-free storage for precision equipment, electronics, and high-value engineering goods.",
      keywords: "FTWZ Bengaluru, Aerospace SEZ warehouse, Devanahalli FTWZ, duty free zone Karnataka, Bangalore logistics",
    },
    portOverview: {
      headline: "Bengaluru Aerospace SEZ — India's Hi-Tech FTWZ Hub",
      description: "Our Bengaluru FTWZ facility is located within the prestigious Aerospace SEZ at Devanahalli — India's premier aerospace and defence manufacturing cluster. Home to HAL, Boeing, Airbus, and major defence contractors, this SEZ provides a unique FTWZ environment for high-value aerospace components, precision engineering goods, and advanced electronics. The proximity to Kempegowda International Airport makes it ideal for air-freight dependent industries.",
      portName: "Inland FTWZ — Connected to Chennai & Mangalore Ports",
      portType: "Inland FTWZ — Aerospace SEZ Sector",
      sezZone: "Aerospace SEZ, Devanahalli",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Active",
      totalArea: "Aerospace SEZ campus",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Bengaluru",
      road: [
        "NH 44 (Bengaluru–Chennai–Hyderabad) and NH 48 (Bengaluru–Mangalore)",
        "Bengaluru–Mysuru Expressway for Southwest Karnataka",
        "NICE Ring Road and Peripheral Ring Road for city bypass",
        "Devanahalli well-connected to Bengaluru IT corridors",
      ],
      rail: [
        "Bengaluru City & Yeshwantpur junctions — South Western Railway hub",
        "Container rake services to Chennai Port and Mangalore Port",
        "ICD Whitefield (30 km) for containerized cargo",
      ],
      sea: [
        "Chennai Port — 345 km (primary container port)",
        "New Mangalore Port — 350 km (bulk and container cargo)",
        "Krishnapatnam Port — 470 km (emerging deep-water port)",
      ],
      air: [
        "Kempegowda International Airport (BLR) — 5 km from facility",
        "India's busiest airport for air cargo after Mumbai and Delhi",
        "500,000+ MT air cargo annually",
        "Dedicated air freight station and cold chain zone",
      ],
    },
    keyAdvantages: [
      "Located within India's premier Aerospace SEZ",
      "5 km from Kempegowda International Airport — fastest air freight access",
      "Hub for aerospace, defence, and precision engineering supply chains",
      "Duty-free storage for high-value imported components and equipment",
      "Proximity to IT/ITES corridor — supports electronics manufacturing",
      "Strategic location between Chennai and Mangalore ports",
    ],
    industries: ["Aerospace & Defence", "Precision Engineering", "Electronics & Semiconductors", "IT Hardware", "Biotech & Life Sciences", "Machine Tools"],
  },
];

export const getLocationBySlug = (slug: string): FTWZLocationDetail | undefined => {
  return ftwzLocationDetails.find((loc) => loc.slug === slug);
};
