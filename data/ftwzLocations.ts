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
    slug: "chennai-sriperumbudur",
    city: "Chennai (Sriperumbudur)",
    state: "Tamil Nadu",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 12.9716,
    lng: 79.9473,
    address: "Mannur & Valarpuram Village, Sriperumbudur Taluk, Kancheepuram District, 602105, Tamil Nadu, India",
    seo: {
      title: "FTWZ Warehouse Sriperumbudur Chennai | Kancheepuram SEZ | Astromar",
      description: "Duty-free FTWZ warehousing at Sriperumbudur, Kancheepuram — South India's electronics and automotive manufacturing hub. Direct access to Chennai Port and NH 48 corridor.",
      keywords: "FTWZ Sriperumbudur, Kancheepuram warehouse, Chennai FTWZ, duty free zone Tamil Nadu, Sriperumbudur SEZ logistics",
    },
    portOverview: {
      headline: "Sriperumbudur — South India's Electronics & Automotive FTWZ Hub",
      description: "Our Sriperumbudur facility is located in Kancheepuram district — India's premier electronics and automotive manufacturing corridor. Home to Foxconn, Samsung, Dell, Hyundai, and BMW manufacturing plants, this location provides duty-free warehousing with seamless access to Chennai Port via NH 48. The facility supports inbound component logistics and outbound finished goods for South India's largest industrial cluster.",
      portName: "Chennai Port (via NH 48)",
      portType: "FTWZ Warehouse — Electronics & Automotive Corridor",
      sezZone: "Sriperumbudur FTWZ Zone, Kancheepuram",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Operational",
      totalArea: "Multi-warehouse campus",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Sriperumbudur",
      road: [
        "NH 48 (Chennai–Bangalore highway) — facility located directly on the corridor",
        "Outer Ring Road (ORR) — 20 km, connecting to all Chennai arterials",
        "SH 57 to Kancheepuram and Chengalpattu",
        "Chennai Port — 52 km via NH 48 and Inner Ring Road",
      ],
      rail: [
        "Sriperumbudur Railway Station on Chennai–Arakkonam line",
        "Chennai Central — 45 km (major junction for pan-India rail)",
        "Container rake services from Irugur and Tondiarpet ICD",
      ],
      sea: [
        "Chennai Port — India's 2nd largest container port (1.5 million TEUs capacity)",
        "Kattupalli Port (Adani) — 75 km",
        "Direct liner services to East Asia, Southeast Asia, Europe, and Americas",
      ],
      air: [
        "Chennai International Airport (MAA) — 38 km",
        "Major international air cargo hub — 400,000+ MT annually",
        "Dedicated air cargo complex with cold chain facilities",
      ],
    },
    keyAdvantages: [
      "Located in India's largest electronics manufacturing cluster",
      "Proximity to Foxconn, Samsung, Dell, and Hyundai plants",
      "Direct NH 48 access to Chennai Port for seamless export",
      "Duty-free warehousing for imported components and sub-assemblies",
      "Kancheepuram FTWZ zone benefits under SEZ Act",
      "Skilled industrial workforce and strong supplier ecosystem",
    ],
    industries: ["Electronics & IT Hardware", "Automotive & Auto Components", "Pharmaceuticals", "Textiles & Leather", "Heavy Engineering", "Renewable Energy Equipment"],
  },
  {
    slug: "chennai-vallur",
    city: "Chennai (Vallur)",
    state: "Tamil Nadu",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 13.2090,
    lng: 80.2843,
    address: "Vallur & Edayanchavadi Village, Ponneri Taluk, Tiruvallur District, 600120, Tamil Nadu, India",
    seo: {
      title: "FTWZ Warehouse Vallur Ponneri Chennai | Kattupalli Port | Astromar",
      description: "Duty-free FTWZ warehousing at Vallur, Ponneri Taluk, Tiruvallur — adjacent to Kattupalli Port and Ennore. Ideal for bulk cargo, chemicals, and energy sector imports across North Chennai.",
      keywords: "FTWZ Vallur, Ponneri warehouse, Kattupalli port logistics, Tiruvallur FTWZ, North Chennai duty free zone",
    },
    portOverview: {
      headline: "Vallur — North Chennai's Port-Adjacent FTWZ",
      description: "Our Vallur facility in Ponneri Taluk, Tiruvallur district sits at the heart of North Chennai's industrial and port corridor, positioned between Kattupalli Port (Adani) and Ennore Port (Kamarajar Port). This strategic location makes it ideal for duty-free warehousing of bulk commodities, chemicals, LNG-related industries, and energy sector cargo. The facility provides direct port access with minimal transit distances for both import and re-export operations.",
      portName: "Kattupalli Port (Adani) & Ennore (Kamarajar) Port",
      portType: "FTWZ Warehouse — Port-Adjacent, Bulk & Container",
      sezZone: "Ponneri FTWZ Zone, Tiruvallur",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Operational",
      totalArea: "Multi-warehouse campus",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Vallur (Ponneri)",
      road: [
        "NH 16 (Chennai–Kolkata East Coast highway) — 8 km from facility",
        "Ennore Expressway providing direct port access",
        "NH 716 to Gummidipoondi industrial area",
        "Chennai Port — 35 km via Ennore Expressway",
      ],
      rail: [
        "Ponneri Railway Station on Chennai–Gudur mainline",
        "Ennore Port rail siding — direct bulk cargo connectivity",
        "Chennai Central — 32 km (major junction for pan-India rail)",
        "Container rake services from Tondiarpet ICD",
      ],
      sea: [
        "Kattupalli Port (Adani) — 15 km (container and multi-purpose terminal)",
        "Ennore (Kamarajar) Port — 20 km (bulk, coal, LNG, and container)",
        "Chennai Port — 35 km (India's 2nd largest container port)",
        "Direct access to 3 ports within a 35 km radius",
      ],
      air: [
        "Chennai International Airport (MAA) — 28 km",
        "Major international air cargo hub — 400,000+ MT annually",
        "Dedicated air cargo complex with cold chain facilities",
      ],
    },
    keyAdvantages: [
      "Adjacent to Kattupalli Port — shortest port-to-warehouse transit in Tamil Nadu",
      "Access to 3 ports within 35 km — unmatched port diversity",
      "Ideal for bulk cargo, chemicals, LNG, and energy sector industries",
      "North Chennai industrial cluster — thermal power, petrochemicals",
      "Ennore Expressway provides fast, dedicated freight movement",
      "Duty-free zone benefits under Tiruvallur FTWZ notification",
    ],
    industries: ["Chemicals & Petrochemicals", "Energy & LNG", "Bulk Commodities", "Automotive & Auto Components", "Steel & Metals", "FMCG & Consumer Goods"],
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
  {
    slug: "dahej",
    city: "Dahej",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 21.7051,
    lng: 72.5793,
    address: "Z-85/2A, Dahej SEZ - 1, Dahej, Gujarat, India",
    seo: {
      title: "FTWZ Warehouse Dahej | Dahej SEZ Gujarat | Astromar",
      description: "Duty-free FTWZ warehousing at Dahej SEZ, Gujarat — India's largest petrochemical and chemicals hub. Strategic access to Dahej Port, GIPCL jetty, and the PCPIR corridor.",
      keywords: "FTWZ Dahej, Dahej SEZ warehouse, duty free zone Gujarat, Dahej port logistics, PCPIR Gujarat",
    },
    portOverview: {
      headline: "Dahej SEZ — India's Largest Petrochemical & Chemicals Corridor",
      description: "Dahej is home to India's largest Petroleum, Chemicals & Petrochemicals Investment Region (PCPIR) and one of the country's most significant SEZ clusters. Our FTWZ facility within Dahej SEZ-1 provides duty-free storage for chemicals, petrochemical feedstocks, industrial gases, and bulk raw materials. The location offers direct proximity to the Dahej LNG terminal, GIPCL jetty, and Dahej port, making it ideal for energy-intensive industries and bulk importers.",
      portName: "Dahej Port & GIPCL Jetty",
      portType: "FTWZ Warehouse — Petrochemical & Bulk Cargo SEZ",
      sezZone: "Dahej SEZ - 1, Bharuch",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Operational",
      totalArea: "Dahej SEZ — 2,000+ hectares",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Dahej",
      road: [
        "NH 48 (Vadodara–Mumbai highway) — 60 km via Bharuch",
        "State Highway to Bharuch (55 km) and Surat (100 km)",
        "Well-maintained industrial road network within Dahej SEZ",
        "Dedicated freight route to Hazira port complex",
      ],
      rail: [
        "Bharuch Railway Station — 55 km (Western Railway mainline)",
        "Vadodara Junction — 80 km (major junction for pan-India rail)",
        "Proposed dedicated rail siding for Dahej SEZ under development",
      ],
      sea: [
        "Dahej Port (GIPCL Jetty) — 3 km from facility",
        "Hazira Port (Adani/Shell) — 50 km",
        "Pipavav Port — 120 km",
        "Direct bulk vessel and tanker services for chemicals and LNG",
      ],
      air: [
        "Surat International Airport — 90 km",
        "Vadodara Airport — 80 km",
        "Ahmedabad International Airport — 160 km (primary air cargo hub)",
      ],
    },
    keyAdvantages: [
      "Located within India's largest PCPIR — 40+ chemical companies on-site",
      "3 km from Dahej Port jetty — minimal port-to-warehouse transit",
      "Duty-free storage for petrochemical feedstocks and bulk chemicals",
      "Dahej SEZ Act benefits including customs duty exemption",
      "LNG terminal proximity for energy sector supply chains",
      "ONGC, GAIL, and major chemical MNC operations in the cluster",
    ],
    industries: ["Petrochemicals & Chemicals", "LNG & Energy", "Bulk Commodities", "Pharmaceuticals (API)", "Plastics & Polymers", "Industrial Gases"],
  },
  {
    slug: "chennai-hq",
    city: "Chennai HQ",
    state: "Tamil Nadu",
    type: "Registered Office",
    phone: "+91 99402 11014",
    lat: 13.0850,
    lng: 80.2101,
    address: "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai - 600 040, Tamil Nadu, India",
    seo: {
      title: "Astromar Logistics HQ Chennai | Anna Nagar Registered Office",
      description: "Astromar Logistics Pvt Ltd registered office in Anna Nagar, Chennai. Centralized operations, customer support, and business development for all FTWZ and logistics services across India.",
      keywords: "Astromar Logistics Chennai, Anna Nagar office, FTWZ company headquarters, logistics company Chennai, Astromar registered office",
    },
    portOverview: {
      headline: "Chennai HQ — Astromar's Centralized Operations Hub",
      description: "Astromar Logistics Pvt Ltd's registered and corporate office is located in Anna Nagar, one of Chennai's most prominent commercial districts. This is the central hub for all business development, customer support, compliance, and operations coordination across our pan-India FTWZ network. The office serves clients across industries with expert guidance on FTWZ benefits, customs duty optimization, and integrated logistics solutions.",
      portName: "Corporate Office — Not a Port Facility",
      portType: "Registered Office & Operations Centre",
      sezZone: "Anna Nagar, Chennai",
      operatedBy: "Astromar Logistics Pvt Ltd",
      established: "Corporate Headquarters",
      totalArea: "Commercial office premises",
    },
    connectivity: {
      headline: "Accessibility from Chennai HQ",
      road: [
        "Anna Nagar — centrally located in North-West Chennai",
        "Poonamallee High Road (NH 4) — 2 km",
        "Inner Ring Road — 3 km for city-wide access",
        "Chennai Port — 18 km via Anna Salai",
      ],
      rail: [
        "Anna Nagar Tower Metro Station (Blue Line) — 1 km",
        "Egmore Railway Station — 8 km",
        "Chennai Central — 10 km",
      ],
      sea: [
        "Chennai Port — 18 km",
        "Kattupalli Port — 35 km via NH 16",
        "Ennore (Kamarajar) Port — 32 km",
      ],
      air: [
        "Chennai International Airport (MAA) — 18 km via ORR",
        "Direct Metro Rail connectivity to airport (Blue Line)",
      ],
    },
    keyAdvantages: [
      "Central Chennai location — accessible from all parts of the city",
      "Dedicated client servicing and FTWZ consultation team",
      "Coordination hub for all 9 FTWZ warehouse locations",
      "Expert customs, compliance, and documentation support",
      "Business development and key account management",
      "Walking distance from Anna Nagar Metro — easy client access",
    ],
    industries: ["All Industries — Corporate Support", "FTWZ Consulting", "Customs & Compliance", "Freight Management", "Supply Chain Advisory", "Trade Finance Support"],
  },
];

export const getLocationBySlug = (slug: string): FTWZLocationDetail | undefined => {
  return ftwzLocationDetails.find((loc) => loc.slug === slug);
};
