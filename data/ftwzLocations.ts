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
    h1?: string;
    h1Subtitle?: string;
    heroAlt?: string;
    bannerIntro?: { text: string; kw?: boolean; href?: string; target?: string; rel?: string }[];
    aboutH2?: { text: string; kw?: boolean }[];
    aboutParagraphs?: { text: string; kw?: boolean; href?: string; target?: string; rel?: string }[][];
    servicesH2?: { text: string; kw?: boolean }[];
    whyChooseH2?: { text: string; kw?: boolean }[];
    whyChooseBlocks?: {
      title: string;
      items: { text: string; kw?: boolean }[][];
    }[];
    faqH2?: { text: string; kw?: boolean }[];
    faqItems?: {
      question: { text: string; kw?: boolean }[];
      answer: { text: string; kw?: boolean }[];
    }[];
    relatedReading?: { title: string; href: string }[];
    localBusinessSchema?: object;
    faqPageSchema?: object;
    breadcrumbSchema?: object;
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
  connectivity?: {
    headline: string;
    road: string[];
    rail: string[];
    sea: string[];
    air: string[];
  };
  keyAdvantages: string[];
  industries: string[];
  facilitiesH2?: string;
  facilitySections?: { heading: string; paragraphs: string[] }[];
  facilities?: {
    id: string;
    name: string;
    area: string;
    summary: string[];
    capabilities?: string[];
    address: string;
    phone?: string;
    lat: number;
    lng: number;
    operatingHours?: string;
    port?: string;
    nearestAirport?: string;
    localBusinessSchema: Record<string, unknown>;
  }[];
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
      title: "FTWZ in Kochi — Vallarpadam ICTT Transshipment | Astromar",
      description: "Astromar's ftwz in kochi at Vallarpadam ICTT — India's first transshipment terminal. Duty-free FTWZ warehousing for spices, seafood, and pharma imports.",
      keywords: "ftwz in kochi, kochi ftwz, vallarpadam ictt warehouse, free trade warehouse zone in kochi, bonded warehouse in kochi, custom bonded warehouse in kochi, kerala ftwz",
      h1: "FTWZ in Kochi",
      h1Subtitle: "Vallarpadam ICTT, Kerala",
      heroAlt: "Illustration of wooden fishing nets on stilts in the foreground and a container ship at a crane-lined quay",
      bannerIntro: [
        { text: "Astromar's Kochi facility is a Government-notified " },
        { text: "ftwz in kochi", kw: true },
        { text: " located at Vallarpadam International Container Transshipment Terminal (ICTT) — India's first dedicated transshipment facility within the Cochin SEZ." },
      ],
      aboutH2: [
        { text: "FTWZ in Kochi", kw: true },
        { text: " — Vallarpadam ICTT Strategic Advantage" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Kochi FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in kochi", kw: true },
          { text: " operating within the Cochin SEZ at Vallarpadam — India's first dedicated container transshipment terminal. Operated by DP World (Adani Ports), the ICTT handles containerized cargo with direct mother-vessel calls, reducing transshipment dependency on Colombo or Singapore by 3-5 days." },
        ],
        [
          { text: "The Vallarpadam ICTT operates with 14.5m draft accommodating Post-Panamax vessels, with annual handling capacity of 1 million TEUs. Direct mother-vessel services connect Kochi to Europe, Middle East, and the Far East — making it a strategic gateway for South India's import-export trade. A dedicated rail corridor links ICTT to Indian Railways, enabling efficient hinterland distribution across Kerala and Tamil Nadu. For businesses also moving cargo along India's coastline, this connects naturally with Astromar's " },
          { text: "coastal shipping network", kw: true, href: "/free-trade-zone-services/coastal-shipping" },
          { text: "." },
        ],
        [
          { text: "As a fully-operational " },
          { text: "bonded warehouse in kochi", kw: true },
          { text: ", our facility provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " for imported goods and supports re-export operations targeting Middle East and African markets. With direct " },
          { text: "ocean freight integration", kw: true, href: "/free-trade-zone-services/ocean-freight" },
          { text: " and on-site customs clearance, importers benefit from streamlined logistics and the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Kochi serves Kerala's spice, seafood, rubber, and latex export industries alongside electronics, pharmaceuticals, and textile importers. For businesses requiring a custom bonded warehouse in kochi with direct transshipment capability and SEZ-notified status, Astromar's Vallarpadam facility delivers operational depth unmatched on India's southwest coast." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Kochi", kw: true },
        { text: " Services at Vallarpadam" },
      ],
      whyChooseH2: [
        { text: "Why Importers Choose " },
        { text: "Kochi Vallarpadam FTWZ", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "Transshipment Gateway",
          items: [
            [{ text: "India's first dedicated transshipment terminal" }],
            [{ text: "Direct mother-vessel services — no Colombo/Singapore detour" }],
            [{ text: "14.5m draft — handles Post-Panamax vessels" }],
            [{ text: "1 million TEUs annual capacity" }],
          ],
        },
        {
          title: "Tax & SEZ Benefits",
          items: [
            [
              { text: "Operating from a " },
              { text: "free trade warehouse zone in kochi", kw: true },
              { text: " gives zero customs duty until release" },
            ],
            [{ text: "100% GST deferral on imports" }],
            [{ text: "Income tax exemption on re-export profits (5 years)" }],
            [{ text: "Service tax exemption on FTWZ operations" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "Dedicated rail corridor to Indian Railways network" }],
            [{ text: "24/7 operations with on-site customs officer" }],
            [{ text: "Direct services to Middle East, Africa, Europe" }],
            [{ text: "Proximity to Kerala's spice and seafood exporters" }],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ in Kochi", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "What is the Vallarpadam ICTT and why is the " },
            { text: "ftwz in kochi", kw: true },
            { text: " strategic?" },
          ],
          answer: [
            { text: "Vallarpadam ICTT is India's first dedicated container transshipment terminal, located within the Cochin SEZ. It accepts direct mother-vessel services from Europe, Middle East, and the Far East — reducing dependency on Colombo or Singapore transshipment by 3-5 days. The on-port FTWZ at Vallarpadam combines this transshipment advantage with duty-deferred warehousing and re-export benefits." },
          ],
        },
        {
          question: [
            { text: "Which industries benefit from the Kochi Vallarpadam FTWZ?" },
          ],
          answer: [
            { text: "The Kochi FTWZ is optimised for: Kerala's spice, agri-products, and seafood exporters serving Middle East and Europe; rubber and latex exporters; electronics importers serving South India; pharmaceutical importers requiring port-side bonded storage; and textile importers and exporters using transshipment routes." },
          ],
        },
        {
          question: [
            { text: "How does the Kochi FTWZ support re-export to the Middle East?" },
          ],
          answer: [
            { text: "Vallarpadam's direct mother-vessel services to Jebel Ali, Salalah, and other Middle East ports make Kochi an ideal re-export hub. Goods imported from East Asia can be consolidated, repackaged, and re-exported to the Middle East/Africa within the FTWZ — without triggering customs duty, GST, or service tax. The 5-year income tax exemption on re-export profits further enhances commercial viability." },
          ],
        },
        {
          question: [
            { text: "What's the difference between Kochi FTWZ and a " },
            { text: "bonded warehouse in kochi", kw: true },
            { text: "?" },
          ],
          answer: [
            { text: "A standard bonded warehouse in Kochi allows duty-deferred storage but is restricted to typically 1-year storage limits and limited permitted activities. The Vallarpadam FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader activities including CKD/SKD assembly, repacking, relabelling, and other value addition, transshipment benefits, and stronger tax benefits under the SEZ Act, 2005." },
          ],
        },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ in Kochi (Vallarpadam ICTT)",
        "description": "Duty-free FTWZ warehousing at Vallarpadam ICTT — India's first dedicated transshipment terminal in Cochin SEZ.",
        "url": "https://www.astromarfreezone.com/locations/kochi",
        "image": "https://www.astromarfreezone.com/images/locations/kochi.webp",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "SEZ ICTT, Vallarpadam",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "postalCode": "682504",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 9.9312, "longitude": 76.2673 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Kochi", "Ernakulam", "Kerala", "South India", "India"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the Vallarpadam ICTT and why is the ftwz in kochi strategic?", "acceptedAnswer": { "@type": "Answer", "text": "Vallarpadam ICTT is India's first dedicated container transshipment terminal in Cochin SEZ — accepts direct mother-vessel services, reducing dependency on Colombo/Singapore by 3-5 days." } },
          { "@type": "Question", "name": "Which industries benefit from the Kochi Vallarpadam FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Spice and agri-products, seafood, rubber and latex, electronics, pharmaceuticals, and textile importers and exporters." } },
          { "@type": "Question", "name": "How does the Kochi FTWZ support re-export to the Middle East?", "acceptedAnswer": { "@type": "Answer", "text": "Direct mother-vessel services to Jebel Ali and Middle East ports enable consolidation and re-export from FTWZ without customs duty, GST, or service tax." } },
          { "@type": "Question", "name": "What's the difference between Kochi FTWZ and a bonded warehouse in kochi?", "acceptedAnswer": { "@type": "Answer", "text": "FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader activities including CKD/SKD assembly, repacking, and relabelling, and stronger SEZ Act 2005 tax benefits versus 1-year limited bonded warehouse." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ in Kochi", "item": "https://www.astromarfreezone.com/locations/kochi" }
        ]
      },
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
      title: "FTWZ in Vizag — Visakhapatnam Port VSEZ | Astromar",
      description: "Astromar's ftwz in vizag at Visakhapatnam SEZ (VSEZ) — East Coast's largest port. Duty-free FTWZ warehousing for steel, pharma, and fertilizers.",
      keywords: "ftwz in vizag, vizag ftwz, visakhapatnam ftwz, vsez warehouse, bonded warehouse in vizag, custom bonded warehouse in vizag, free trade warehouse zone in vizag, andhra pradesh ftwz",
      h1: "FTWZ in Vizag",
      h1Subtitle: "Visakhapatnam SEZ, Andhra Pradesh",
      heroAlt: "Illustration of a container ship at a quay under gantry cranes, with green hills and a sunset behind",
      bannerIntro: [
        { text: "Astromar's Vizag facility is a Government-notified " },
        { text: "ftwz in vizag", kw: true },
        { text: " located at Visakhapatnam SEZ (VSEZ) — adjacent to East Coast India's largest commercial port. Strategic gateway for Southeast Asia and Far East trade." },
      ],
      aboutH2: [
        { text: "FTWZ in Vizag", kw: true },
        { text: " — Visakhapatnam Port Gateway to Southeast Asia" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Vizag FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in vizag", kw: true },
          { text: " operating within the Visakhapatnam SEZ (VSEZ) at Duvvada. Visakhapatnam Port is the largest cargo port on India's East Coast — handling over 70 million tonnes annually across containers, bulk commodities, iron ore, coal, petroleum, and fertilizers." },
        ],
        [
          { text: "VSEZ spans 360 hectares as a multi-product SEZ, providing extensive infrastructure for steel, pharma, petrochemicals, engineering goods, and food processing industries. With inner harbour at 10.7m draft and outer harbour at 18.1m draft, the port accommodates capesize vessels, while the container terminal offers 0.7 million TEUs capacity. NH 16 and NH 65 provide road connectivity to Hyderabad and other major hinterland markets. Astromar's Vizag facility also supports the movement of " },
          { text: "heavy machinery and project cargo", kw: true, href: "/free-trade-zone-services/project-cargo" },
          { text: " for the region's steel and shipbuilding industries." },
        ],
        [
          { text: "As a fully-operational " },
          { text: "bonded warehouse in vizag", kw: true },
          { text: ", our facility provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " for imported goods and supports re-export operations to Southeast Asia and Far East. Combined with " },
          { text: "ocean freight services", kw: true, href: "/free-trade-zone-services/ocean-freight" },
          { text: " and on-site customs clearance, importers benefit from streamlined trade flows under the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Vizag serves Andhra Pradesh and Telangana's steel, pharma, petrochemical, and engineering clusters — supporting major industrial customers across the Bay of Bengal trade corridor. For businesses seeking a custom bonded warehouse in vizag with competitive land costs versus West Coast ports and direct Southeast Asia connectivity, VSEZ delivers strategic depth on India's East Coast." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Vizag", kw: true },
        { text: " Services at VSEZ Duvvada" },
      ],
      whyChooseH2: [
        { text: "Why Importers Choose " },
        { text: "Vizag VSEZ FTWZ", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "East Coast Gateway",
          items: [
            [{ text: "Largest cargo port on India's East Coast (70M+ MT)" }],
            [{ text: "Direct services to Southeast Asia, Far East, Middle East" }],
            [{ text: "Outer harbour 18.1m draft for capesize vessels" }],
            [{ text: "Container terminal capacity 0.7 million TEUs" }],
          ],
        },
        {
          title: "Industry Verticals",
          items: [
            [{ text: "Steel and metals (Vizag Steel Plant proximity)" }],
            [{ text: "Pharmaceuticals (AP's pharma corridor)" }],
            [{ text: "Petrochemicals and fertilizers" }],
            [{ text: "Engineering goods and machinery" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "24/7 operations with on-site customs officer" }],
            [{ text: "Dedicated freight corridor for port cargo" }],
            [{ text: "NH 16 connectivity to Chennai and Kolkata" }],
            [{ text: "Lower operating costs vs West Coast ports" }],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ in Vizag", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "What is VSEZ and why is the " },
            { text: "ftwz in vizag", kw: true },
            { text: " strategic?" },
          ],
          answer: [
            { text: "VSEZ (Visakhapatnam SEZ) is a 360-hectare multi-product Special Economic Zone at Duvvada, established in 1989. Located adjacent to Visakhapatnam Port — East Coast's largest commercial port — VSEZ provides duty-free warehousing, deferred customs, and re-export benefits for businesses trading with Southeast Asia, Far East, and Middle East." },
          ],
        },
        {
          question: [
            { text: "Which industries benefit from the Vizag VSEZ FTWZ?" },
          ],
          answer: [
            { text: "The Vizag FTWZ is optimised for: steel and metals (Vizag Steel Plant cluster); pharmaceuticals (AP's pharma corridor including major API manufacturers); petrochemicals and chemical importers; fertilizer companies; engineering goods exporters; and food processing companies." },
          ],
        },
        {
          question: [
            { text: "How does Vizag compare to West Coast ports for re-export?" },
          ],
          answer: [
            { text: "Vizag offers competitive advantages for Southeast Asian and Far East trade: shorter ocean transit time to Singapore, Bangkok, and Vietnamese ports; lower land and operating costs versus JNPA or Mundra; and proximity to the steel, pharma, and petrochemical clusters that already drive bilateral trade with Asia. For US/Europe trade, West Coast ports remain more efficient." },
          ],
        },
        {
          question: [
            { text: "What cargo categories can be stored in the VSEZ FTWZ?" },
          ],
          answer: [
            { text: "Steel and metals, pharmaceuticals (API, formulations, packaging), petrochemicals, fertilizers, engineering goods, machinery, food processing inputs, and containerised commodities. The facility supports both ambient and climate-controlled storage zones suitable for sensitive industrial cargo." },
          ],
        },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ in Vizag (VSEZ Duvvada)",
        "description": "Duty-free FTWZ warehousing at Visakhapatnam SEZ (VSEZ) adjacent to East Coast India's largest commercial port.",
        "url": "https://www.astromarfreezone.com/locations/vizag",
        "image": "https://www.astromarfreezone.com/images/locations/vizag.webp",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VSEZ, Duvvada",
          "addressLocality": "Visakhapatnam",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "530049",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 17.6868, "longitude": 83.2185 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Visakhapatnam", "Andhra Pradesh", "Telangana", "East Coast India", "India"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is VSEZ and why is the ftwz in vizag strategic?", "acceptedAnswer": { "@type": "Answer", "text": "VSEZ is a 360-hectare multi-product SEZ at Duvvada, adjacent to East Coast India's largest commercial port — providing duty-free warehousing for trade with Southeast Asia and Far East." } },
          { "@type": "Question", "name": "Which industries benefit from the Vizag VSEZ FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Steel and metals, pharmaceuticals, petrochemicals, fertilizers, engineering goods, and food processing." } },
          { "@type": "Question", "name": "How does Vizag compare to West Coast ports for re-export?", "acceptedAnswer": { "@type": "Answer", "text": "Vizag offers shorter transit to Southeast Asia/Far East, lower operating costs vs West Coast ports, and proximity to industrial clusters serving Asian markets." } },
          { "@type": "Question", "name": "What cargo categories can be stored in the VSEZ FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Steel, pharmaceuticals, petrochemicals, fertilizers, engineering goods, machinery, food processing inputs, containerised commodities — ambient and climate-controlled zones." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ in Vizag", "item": "https://www.astromarfreezone.com/locations/vizag" }
        ]
      },
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
    slug: "delhi-khurja",
    city: "Delhi (Khurja)",
    state: "Uttar Pradesh",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 28.2476,
    lng: 77.8538,
    address: "Junction Road, Khurja Industrial Area, Village Maujpur, Khurja, District - Bulandshahr, UP - 203131, India",
    seo: {
      title: "FTWZ in Delhi NCR — Khurja DFC Corridor | Astromar",
      description: "Astromar's ftwz in delhi at Khurja, on the Western Dedicated Freight Corridor. Duty-free FTWZ warehousing serving Delhi, Haryana, Punjab, and UP.",
      keywords: "ftwz in delhi, khurja ftwz, delhi ncr bonded warehouse, dfc corridor warehouse, bonded warehouse in delhi, custom bonded warehouse in delhi, free trade warehouse zone in delhi, north india ftwz",
      h1: "FTWZ in Delhi NCR",
      h1Subtitle: "Khurja, Uttar Pradesh",
      heroAlt: "Long warehouse aisle lined with tall pallet racks of boxed goods",
      bannerIntro: [
        { text: "Astromar's Khurja facility is a Government-notified " },
        { text: "ftwz in delhi", kw: true },
        { text: " strategically located on the Western Dedicated Freight Corridor (DFC) — North India's freight superhighway connecting JNPA and Mundra ports to Delhi NCR markets." },
      ],
      aboutH2: [
        { text: "FTWZ in Delhi NCR", kw: true },
        { text: " at Khurja — North India's Inland Gateway" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Khurja FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in delhi", kw: true },
          { text: " inland gateway located in Bulandshahr district, Uttar Pradesh. Positioned directly on the Western Dedicated Freight Corridor (DFC) — India's most important rail freight artery — the facility connects Mumbai's JNPA port and Gujarat's Mundra port to North India's 600+ million consumer market. Shipments benefit from " },
          { text: "dedicated customs clearance support", kw: true, href: "/free-trade-zone-services/customs-clearance" },
          { text: ", ensuring smooth movement from port of entry to final distribution across North India." },
        ],
        [
          { text: "Khurja's strategic location offers exceptional connectivity: 85 km from Delhi NCR via Noida expressway, 15 km from NH 91 (Delhi–Agra highway), 28 km from Yamuna Expressway, and direct DFC rail access enabling 20-24 hour transit from western ports. The upcoming Noida International Airport (Jewar) at 50 km will transform regional logistics infrastructure." },
        ],
        [
          { text: "As a fully-operational " },
          { text: "bonded warehouse in delhi", kw: true },
          { text: " inland facility, our Khurja location provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " for imported goods destined for North India distribution. Combined with " },
          { text: "integrated supply chain services", kw: true, href: "/free-trade-zone-services/supply-chain-management" },
          { text: " and on-site customs clearance, importers benefit from reduced port congestion costs and streamlined hinterland delivery under the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Khurja serves consumer electronics, FMCG, retail, automotive parts, ceramics, textiles, and machinery imports destined for Delhi NCR, Haryana, Punjab, UP, and Rajasthan markets. For businesses seeking a custom bonded warehouse in delhi region with DFC connectivity, lower operating costs than Delhi NCR, and proximity to India's largest consumption market, Khurja delivers strategic depth for North India operations." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Delhi NCR", kw: true },
        { text: " Services at Khurja" },
      ],
      whyChooseH2: [
        { text: "Why Importers Choose " },
        { text: "Khurja FTWZ Delhi NCR", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "DFC Corridor",
          items: [
            [{ text: "Located directly on Western Dedicated Freight Corridor" }],
            [{ text: "20-24 hour DFC rail transit from JNPA / Mundra" }],
            [{ text: "Direct connectivity to North India ICDs" }],
            [{ text: "Khurja Junction on Delhi–Howrah mainline" }],
          ],
        },
        {
          title: "North India Markets",
          items: [
            [{ text: "85 km from Delhi NCR — India's largest consumption market" }],
            [{ text: "Serves Haryana, Punjab, UP, Rajasthan, Uttarakhand" }],
            [{ text: "Total addressable market: 600+ million consumers" }],
            [{ text: "Jewar Airport (50 km) coming online" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "24/7 operations with on-site customs officer" }],
            [{ text: "Lower warehousing costs vs Delhi NCR" }],
            [
              { text: "Duty deferment advantage for custom bonded warehouse in delhi region distribution" },
            ],
            [{ text: "Bonded transport to Delhi NCR and surrounding markets" }],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ in Delhi NCR", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "Why is the " },
            { text: "ftwz in delhi", kw: true },
            { text: " located at Khurja and not in NCR itself?" },
          ],
          answer: [
            { text: "Khurja is strategically located on the Western Dedicated Freight Corridor (DFC) — providing direct rail connectivity to JNPA (Mumbai) and Mundra (Gujarat) ports with 20-24 hour transit. Land costs and operational expenses are significantly lower than Delhi NCR while still being within an 85 km radius. This combination of port connectivity, market proximity, and cost efficiency makes Khurja the optimal North India FTWZ location." },
          ],
        },
        {
          question: [
            { text: "What is the Western DFC and how does it benefit the Khurja FTWZ?" },
          ],
          answer: [
            { text: "The Western Dedicated Freight Corridor is India's first dedicated rail freight network, linking JNPA and Mundra ports to North India. It enables high-speed, high-capacity freight trains running at 100 km/h (vs 25 km/h on mixed-traffic lines) — cutting port-to-Khurja transit time to 20-24 hours. This eliminates road congestion costs and dramatically improves supply chain predictability for importers." },
          ],
        },
        {
          question: [
            { text: "Which industries use the Khurja FTWZ?" },
          ],
          answer: [
            { text: "The Khurja FTWZ is optimised for: consumer electronics importers serving NCR retail; FMCG and retail companies (Amazon, Flipkart, and direct-to-consumer brands); automotive parts and aftermarket suppliers; ceramics and pottery exporters (Khurja's traditional strength); textile and garment importers; and machinery and equipment distributors serving North India industries." },
          ],
        },
        {
          question: [
            { text: "How does Khurja FTWZ compare to a standard " },
            { text: "bonded warehouse in delhi", kw: true },
            { text: "?" },
          ],
          answer: [
            { text: "A standard bonded warehouse in Delhi typically operates within ICD facilities with limited storage tenure (1 year) and restricted permitted activities. The Khurja FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader permitted activities under SEZ Act 2005, full duty and GST deferral benefits, and DFC rail connectivity that no Delhi-based bonded warehouse can match." },
          ],
        },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ in Delhi NCR (Khurja DFC)",
        "description": "FTWZ warehousing at Khurja on the Western DFC — North India's inland gateway for Delhi NCR, Haryana, Punjab, UP, and Rajasthan markets.",
        "url": "https://www.astromarfreezone.com/locations/delhi-khurja",
        "image": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Khurja Industrial Area, Village Maujpur",
          "addressLocality": "Bulandshahr",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "203131",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 28.2476, "longitude": 77.8538 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Delhi NCR", "Haryana", "Punjab", "Uttar Pradesh", "Rajasthan", "Uttarakhand", "North India"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Why is the ftwz in delhi located at Khurja and not in NCR itself?", "acceptedAnswer": { "@type": "Answer", "text": "Khurja is on the Western DFC with 20-24 hour rail transit from JNPA/Mundra ports, lower operating costs than Delhi NCR, and 85 km proximity to the NCR consumption market — combining port connectivity, market reach, and cost efficiency." } },
          { "@type": "Question", "name": "What is the Western DFC and how does it benefit the Khurja FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Western Dedicated Freight Corridor is India's dedicated rail freight network linking JNPA and Mundra to North India — enabling 100 km/h freight transit and 20-24 hour port-to-Khurja delivery." } },
          { "@type": "Question", "name": "Which industries use the Khurja FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Consumer electronics, FMCG, retail, automotive parts, ceramics, textiles, and machinery importers serving Delhi NCR and North India." } },
          { "@type": "Question", "name": "How does Khurja FTWZ compare to a standard bonded warehouse in delhi?", "acceptedAnswer": { "@type": "Answer", "text": "Khurja FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader activities under SEZ Act 2005, full duty/GST deferral, and DFC rail connectivity unavailable to Delhi bonded warehouses." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ in Delhi NCR", "item": "https://www.astromarfreezone.com/locations/delhi-khurja" }
        ]
      },
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
      title: "FTWZ in Bangalore — Aerospace SEZ Devanahalli | Astromar",
      description: "Astromar's ftwz in bangalore at Devanahalli Aerospace SEZ — 5 km from Kempegowda Airport. Duty-free FTWZ warehousing for aerospace and defence.",
      keywords: "ftwz in bangalore, bangalore ftwz, devanahalli aerospace sez, aerospace ftwz india, bonded warehouse in bangalore, free trade warehouse zone in bangalore, free trade warehouse in bangalore, karnataka ftwz, kempegowda airport warehouse",
      h1: "FTWZ in Bangalore",
      h1Subtitle: "Devanahalli Aerospace SEZ, Karnataka",
      heroAlt: "Spacious warehouse with tall orange pallet racks stacked with boxes and loading doors along one wall",
      bannerIntro: [
        { text: "Astromar's Bengaluru facility is a Government-notified " },
        { text: "ftwz in bangalore", kw: true },
        { text: " located within the prestigious Aerospace SEZ at Devanahalli — just 5 km from Kempegowda International Airport. Purpose-built for aerospace, defence, and high-value cargo." },
      ],
      aboutH2: [
        { text: "FTWZ in Bangalore", kw: true },
        { text: " — Aerospace SEZ Hi-Tech Hub" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Bengaluru FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in bangalore", kw: true },
          { text: " operating within the Aerospace SEZ at Devanahalli — India's premier aerospace and defence manufacturing cluster. As a leading " },
          { text: "free trade warehouse in bangalore", kw: true },
          { text: ", the SEZ is home to HAL (Hindustan Aeronautics Limited), Boeing, Airbus, and major defence contractors, providing a unique FTWZ environment for high-value aerospace components, precision engineering goods, and advanced electronics. Moving aircraft assemblies and defence-grade equipment in and out of the SEZ often calls for " },
          { text: "coordinated heavy-lift and project cargo logistics", kw: true, href: "/free-trade-zone-services/project-cargo" },
          { text: " alongside standard FTWZ storage." },
        ],
        [
          { text: "The Devanahalli location offers a distinctive advantage: just 5 km from " },
          { text: "Kempegowda International Airport (BLR)", kw: true, href: "https://www.bengaluruairport.com/", target: "_blank", rel: "noopener noreferrer" },
          { text: " — India's third busiest airport for air cargo after Mumbai and Delhi, handling 500,000+ MT annually. With dedicated air freight stations, cold chain zones, and proximity to Bengaluru's IT/ITES corridor, the facility is ideal for air-freight dependent industries requiring fast turnaround." },
        ],
        [
          { text: "As a fully-operational " },
          { text: "bonded warehouse in bangalore", kw: true },
          { text: ", our Devanahalli facility provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " for imported aerospace components, precision instruments, and high-value electronics. Combined with " },
          { text: "specialised air freight services", kw: true, href: "/free-trade-zone-services/air-freight" },
          { text: " and on-site customs clearance, importers benefit from optimal logistics for time-sensitive high-value cargo under the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Bengaluru's Aerospace SEZ serves aerospace and defence manufacturers, precision engineering companies, semiconductor importers, IT hardware suppliers, biotech and life sciences firms, and machine tool manufacturers across South India. For businesses seeking a Karnataka " },
          { text: "ftwz", kw: true },
          { text: " location with direct airport access and specialised infrastructure for hi-tech " },
          { text: "manufacturing supply chains", kw: true, href: "/free-trade-zone-services/supply-chain-management" },
          { text: ", Devanahalli delivers operational depth unmatched in the region. " },
          { text: "Efficient customs clearance", kw: true, href: "/free-trade-zone-services/customs-clearance" },
          { text: " helps aerospace and electronics components move quickly from arrival to production line." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Bangalore", kw: true },
        { text: " Services at Devanahalli" },
      ],
      whyChooseH2: [
        { text: "Why Importers Choose " },
        { text: "Devanahalli Aerospace FTWZ", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "Aerospace SEZ",
          items: [
            [{ text: "Located within India's premier Aerospace SEZ" }],
            [{ text: "Proximity to HAL, Boeing, Airbus operations" }],
            [{ text: "Specialised for precision and high-value cargo" }],
            [{ text: "Defence manufacturing supply chain support" }],
          ],
        },
        {
          title: "Air Cargo Hub",
          items: [
            [{ text: "5 km from Kempegowda International Airport (BLR)" }],
            [{ text: "India's 3rd busiest air cargo hub (500,000+ MT/yr)" }],
            [{ text: "Dedicated air freight stations and cold chain zones" }],
            [{ text: "Ideal for time-sensitive high-value cargo" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "24/7 operations with on-site customs officer" }],
            [{ text: "Connectivity to Chennai and Mangalore ports" }],
            [{ text: "Proximity to IT/ITES corridor for electronics" }],
            [{ text: "Skilled aerospace/precision-engineering workforce" }],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ in Bangalore", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "What makes the Devanahalli " },
            { text: "ftwz in bangalore", kw: true },
            { text: " unique?" },
          ],
          answer: [
            { text: "Devanahalli is one of India's only FTWZs located within a dedicated Aerospace SEZ — co-located with HAL, Boeing, Airbus, and major defence manufacturers. This creates a specialised ecosystem for aerospace components, precision engineering goods, and high-value cargo. Combined with 5 km proximity to Kempegowda International Airport, the facility is purpose-built for air-freight dependent hi-tech industries." },
          ],
        },
        {
          question: [
            { text: "Which industries benefit from the Bengaluru FTWZ?" },
          ],
          answer: [
            { text: "Aerospace and defence manufacturers; precision engineering companies; semiconductor and electronics importers; IT hardware suppliers; biotech and pharmaceutical companies (cold chain capability); machine tool importers; and renewable energy equipment suppliers serving Karnataka's growing solar and wind sector." },
          ],
        },
        {
          question: [
            { text: "How does the Bengaluru FTWZ support air freight operations?" },
          ],
          answer: [
            { text: "Kempegowda International Airport handles 500,000+ MT of air cargo annually with dedicated air freight stations, perishable cargo facilities, and cold chain zones. The 5 km proximity from our FTWZ enables next-flight-out logistics, minimal ground handling time, and direct integration with international air freight networks — critical for aerospace, electronics, and pharma supply chains." },
          ],
        },
        {
          question: [
            { text: "What's the storage advantage over a standard " },
            { text: "bonded warehouse in bangalore", kw: true },
            { text: "?" },
          ],
          answer: [
            { text: "Standard Bangalore bonded warehouses (typically within ICD Whitefield) offer 1-year duty-deferred storage with limited activities. The Devanahalli Aerospace FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader SEZ Act 2005 activities including CKD/SKD assembly, repacking, and relabelling, specialised aerospace-grade infrastructure, and direct airport proximity that no inland bonded warehouse can match." },
          ],
        },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ in Bangalore (Devanahalli Aerospace SEZ)",
        "description": "FTWZ warehousing in Devanahalli Aerospace SEZ — 5 km from Kempegowda Airport. Specialised for aerospace, defence, electronics, and high-value cargo.",
        "url": "https://www.astromarfreezone.com/locations/bengaluru",
        "image": "https://images.unsplash.com/photo-1627309366653-2dedc084cdf1?w=1920&q=80",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Aerospace SEZ Sector, Devanahalli",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "562165",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 13.2486, "longitude": 77.7066 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Bengaluru", "Karnataka", "South India", "India"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What makes the Devanahalli ftwz in bangalore unique?", "acceptedAnswer": { "@type": "Answer", "text": "Devanahalli is one of India's only FTWZs inside a dedicated Aerospace SEZ — co-located with HAL, Boeing, Airbus. 5 km from Kempegowda Airport for time-sensitive high-value cargo." } },
          { "@type": "Question", "name": "Which industries benefit from the Bengaluru FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Aerospace and defence, precision engineering, semiconductors, IT hardware, biotech/pharma, machine tools, and renewable energy equipment." } },
          { "@type": "Question", "name": "How does the Bengaluru FTWZ support air freight operations?", "acceptedAnswer": { "@type": "Answer", "text": "Kempegowda Airport handles 500,000+ MT air cargo annually with dedicated freight stations and cold chain zones. 5 km proximity enables next-flight-out logistics." } },
          { "@type": "Question", "name": "What's the storage advantage over a standard bonded warehouse in bangalore?", "acceptedAnswer": { "@type": "Answer", "text": "Devanahalli FTWZ offers storage for up to 3 years, extendable to 5 years with special permission, broader SEZ activities, aerospace-grade infrastructure, and airport proximity unavailable to standard bonded warehouses." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ in Bangalore", "item": "https://www.astromarfreezone.com/locations/bengaluru" }
        ]
      },
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
      title: "FTWZ in Dahej — PCPIR Chemical SEZ Gujarat | Astromar",
      description: "Astromar's ftwz in dahej within Dahej SEZ-1 — India's largest petrochemical corridor (PCPIR). Duty-free FTWZ warehousing for chemicals and polymers.",
      keywords: "ftwz in dahej, dahej ftwz, dahej sez warehouse, pcpir gujarat, bonded warehouse in dahej, custom bonded warehousing in dahej, free trade warehouse zone in dahej, gujarat chemical sez, dangerous goods warehouse dahej, hazardous goods warehouse dahej",
      h1: "FTWZ in Dahej",
      h1Subtitle: "Dahej SEZ-1, Gujarat",
      heroAlt: "Illustration of a tanker moored at a jetty beside rows of white storage tanks and an industrial skyline",
      bannerIntro: [
        { text: "Astromar's Dahej facility is a Government-notified " },
        { text: "ftwz in dahej", kw: true },
        { text: " operating within Dahej SEZ-1 — India's largest Petroleum, Chemicals & Petrochemicals Investment Region (PCPIR). Specialised for chemicals, LNG, polymers, and bulk industrial cargo." },
      ],
      aboutH2: [
        { text: "FTWZ in Dahej", kw: true },
        { text: " — India's Largest Chemical & Petrochemical SEZ" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Dahej FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in dahej", kw: true },
          { text: " operating within Dahej SEZ-1 — part of India's largest " },
          { text: "Petroleum, Chemicals & Petrochemicals Investment Region (PCPIR)", kw: true, href: "https://gujaratpcpir.org/", target: "_blank", rel: "noopener noreferrer" },
          { text: ". The SEZ spans 2,000+ hectares with 40+ chemical and petrochemical companies on-site, making it the most concentrated industrial cluster of its kind in the country." },
        ],
        [
          { text: "Dahej's strategic advantage is its on-site port infrastructure: the Dahej Port (GIPCL Jetty) is just 3 km from our FTWZ, with direct bulk vessel and tanker services for chemicals and LNG. The location offers minimal port-to-warehouse transit, dedicated tanker terminals, and adjacent connectivity to Hazira Port (50 km) for additional throughput capacity. NH 48 (Vadodara–Mumbai highway) provides road connectivity to Gujarat's industrial belt." },
        ],
        [
          { text: "As a fully-operational custom bonded warehouse facility in Dahej, Astromar provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " for petrochemical feedstocks, bulk chemicals, polymers, and industrial gases with full safety and compliance protocols. Combined with " },
          { text: "specialised project cargo handling", kw: true, href: "/free-trade-zone-services/project-cargo" },
          { text: " and on-site customs clearance, importers benefit from streamlined operations under the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Dahej serves India's chemicals, petrochemicals, plastics, pharmaceuticals (API), and industrial gases industries, supported by " },
          { text: "integrated supply chain coordination", kw: true, href: "/free-trade-zone-services/supply-chain-management" },
          { text: " across the region — with major operations from ONGC, GAIL, and global chemical MNCs co-located in the PCPIR. For businesses needing a " },
          { text: "bonded warehousing in dahej", kw: true },
          { text: " with hazmat compliance, dedicated chemical infrastructure, and direct port jetty access, Astromar delivers specialised capability unmatched in the chemical logistics sector. Chemical cargo also carries some of the most complex HS classification and hazmat documentation requirements in Indian trade, which is why Astromar pairs Dahej storage with " },
          { text: "dedicated customs clearance support", kw: true, href: "/free-trade-zone-services/customs-clearance" },
          { text: " for every shipment." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Dahej", kw: true },
        { text: " Services at SEZ-1" },
      ],
      whyChooseH2: [
        { text: "Why Chemical Importers Choose " },
        { text: "Dahej FTWZ", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "PCPIR Cluster",
          items: [
            [{ text: "India's largest Petroleum, Chemicals & Petrochemicals SEZ" }],
            [{ text: "40+ chemical companies operating on-site" }],
            [{ text: "ONGC, GAIL, and major MNC presence" }],
            [{ text: "Dahej SEZ-1 spans 2,000+ hectares" }],
          ],
        },
        {
          title: "Chemical Compliance",
          items: [
            [{ text: "Hazmat-compliant storage zones" }],
            [{ text: "Dedicated tanker terminals for liquid chemicals" }],
            [{ text: "LNG and petrochemical feedstock handling" }],
            [{ text: "Industrial gas storage with full safety protocols" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "Dahej Port jetty just 3 km from facility" }],
            [{ text: "24/7 operations with on-site customs officer" }],
            [
              { text: "Direct port access for " },
              { text: "bonded warehousing in dahej", kw: true },
              { text: " bulk cargo" },
            ],
            [{ text: "NH 48 connectivity to Bharuch, Vadodara, Surat" }],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ in Dahej", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "What is the PCPIR and why is the " },
            { text: "ftwz in dahej", kw: true },
            { text: " strategic for chemicals?" },
          ],
          answer: [
            { text: "PCPIR (Petroleum, Chemicals & Petrochemicals Investment Region) is a Government-designated industrial corridor concentrating petrochemical and chemical companies in Dahej. Operating an FTWZ within PCPIR provides three critical advantages: co-location with 40+ chemical companies for B2B supply chain efficiency, dedicated chemical-grade infrastructure (hazmat zones, tanker terminals), and direct Dahej Port jetty access just 3 km away — minimal port transit for bulk chemicals and LNG." },
          ],
        },
        {
          question: [
            { text: "What types of chemical cargo can Dahej FTWZ handle?" },
          ],
          answer: [
            { text: "The Dahej FTWZ handles: petrochemical feedstocks (naphtha, ethylene, propylene); bulk chemicals (acids, alkalis, solvents); polymers and plastics (PE, PP, PVC, PET); industrial gases (oxygen, nitrogen, argon, hydrogen); pharmaceutical APIs; specialty chemicals; LNG-related equipment; and dangerous goods classified per IMDG/IATA standards. All cargo is stored under hazmat-compliant protocols with dedicated zones." },
          ],
        },
        {
          question: [
            { text: "How does the Dahej Port jetty integration work?" },
          ],
          answer: [
            { text: "Dahej Port operates the GIPCL Jetty (Gujarat Industries Power Company Ltd) — a dedicated bulk and tanker terminal just 3 km from our FTWZ. Imported chemicals and LNG arrive directly at the jetty and move via pipeline or short-haul tanker transport to our facility within hours. This eliminates long-haul road transport, reduces leakage and spillage risks, and supports the FTWZ's just-in-time delivery to PCPIR customers." },
          ],
        },
        {
          question: [
            { text: "What's the safety advantage of FTWZ over a standard " },
            { text: "bonded warehouse in dahej", kw: true },
            { text: "?" },
          ],
          answer: [
            { text: "Dahej FTWZ operates with dedicated hazmat-compliant zones, fire suppression systems, gas detection networks, emergency response protocols, and PESO-licensed storage for explosive and flammable cargo. Standard bonded warehouses typically lack this specialised chemical infrastructure. Combined with FTWZ benefits — storage for up to 3 years, extendable to 5 years with special permission, broader SEZ Act 2005 activities, and full duty/GST deferral — the facility is purpose-built for the chemical sector." },
          ],
        },
        {
          question: [
            { text: "What types of dangerous goods can be stored at your Dahej facility?" },
          ],
          answer: [
            { text: "Astromar's Dahej facility handles dangerous goods storage across multiple industries — including chemicals, metals, pharmaceutical inputs, textiles, and industrial spare parts — under applicable safety regulations, subject to appropriate classification and documentation." },
          ],
        },
        {
          question: [
            { text: "Can businesses outside the chemical industry use Dahej for bonded or hazardous goods storage?" },
          ],
          answer: [
            { text: "Yes — while Dahej is well known for its chemical and petrochemical corridor, Astromar's facility also supports bonded and dangerous goods storage for metal, pharmaceutical, textile, and spare parts importers, subject to applicable regulations and cargo classification." },
          ],
        },
        {
          question: [
            { text: "Is Astromar a licensed dangerous goods warehouse in Dahej?" },
          ],
          answer: [
            { text: "Yes — Astromar's Dahej facility operates as a dangerous goods warehouse handling hazardous cargo under applicable safety regulations, subject to appropriate classification and documentation." },
          ],
        },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ in Dahej (PCPIR SEZ-1)",
        "description": "FTWZ warehousing within Dahej SEZ-1 PCPIR cluster — specialised for chemicals, petrochemicals, LNG, polymers, and industrial gases.",
        "url": "https://www.astromarfreezone.com/locations/dahej",
        "image": "https://www.astromarfreezone.com/images/locations/dahej.webp",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Z-85/2A, Dahej SEZ-1",
          "addressLocality": "Bharuch",
          "addressRegion": "Gujarat",
          "postalCode": "392130",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 21.7051, "longitude": 72.5793 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Dahej", "Bharuch", "Vadodara", "Surat", "Gujarat", "India"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the PCPIR and why is the ftwz in dahej strategic for chemicals?", "acceptedAnswer": { "@type": "Answer", "text": "PCPIR is India's largest petrochemical investment region with 40+ chemical companies. FTWZ inside PCPIR gives B2B co-location, hazmat infrastructure, and 3 km port jetty access." } },
          { "@type": "Question", "name": "What types of chemical cargo can Dahej FTWZ handle?", "acceptedAnswer": { "@type": "Answer", "text": "Petrochemical feedstocks, bulk chemicals, polymers, industrial gases, pharmaceutical APIs, specialty chemicals, LNG equipment, and IMDG-classified dangerous goods." } },
          { "@type": "Question", "name": "How does the Dahej Port jetty integration work?", "acceptedAnswer": { "@type": "Answer", "text": "GIPCL Jetty is 3 km from FTWZ. Imported chemicals/LNG move via pipeline or short-haul tanker — eliminating long road transport and supporting just-in-time PCPIR delivery." } },
          { "@type": "Question", "name": "What's the safety advantage of FTWZ over a standard bonded warehouse in dahej?", "acceptedAnswer": { "@type": "Answer", "text": "Dahej FTWZ has hazmat zones, fire suppression, gas detection, PESO-licensed storage. Standard bonded warehouses lack this chemical infrastructure." } },
          { "@type": "Question", "name": "What types of dangerous goods can be stored at your Dahej facility?", "acceptedAnswer": { "@type": "Answer", "text": "Astromar's Dahej facility handles dangerous goods storage across multiple industries — including chemicals, metals, pharmaceutical inputs, textiles, and industrial spare parts — under applicable safety regulations, subject to appropriate classification and documentation." } },
          { "@type": "Question", "name": "Can businesses outside the chemical industry use Dahej for bonded or hazardous goods storage?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — while Dahej is well known for its chemical and petrochemical corridor, Astromar's facility also supports bonded and dangerous goods storage for metal, pharmaceutical, textile, and spare parts importers, subject to applicable regulations and cargo classification." } },
          { "@type": "Question", "name": "Is Astromar a licensed dangerous goods warehouse in Dahej?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Astromar's Dahej facility operates as a dangerous goods warehouse handling hazardous cargo under applicable safety regulations, subject to appropriate classification and documentation." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ in Dahej", "item": "https://www.astromarfreezone.com/locations/dahej" }
        ]
      },
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
    slug: "mundra",
    city: "Mundra",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    phone: "+91 99402 11014",
    lat: 22.8386,
    lng: 69.7295,
    address: "APSEZ, Survey No. 169/36, Mundra, Kutch, Gujarat 370421",
    seo: {
      title: "FTWZ Mundra — Adani Ports APSEZ India's Largest Port | Astromar",
      description: "Astromar's ftwz mundra at Adani Ports APSEZ — India's largest commercial port. Duty-free FTWZ warehousing for Middle East, Africa, Europe trade.",
      keywords: "ftwz mundra, ftwz in mundra, mundra ftwz, apsez warehouse, adani ports sez, bonded warehousing in mundra, custom bonded warehousing in mundra, free trade warehouse zone in mundra, gujarat ftwz",
      h1: "FTWZ Mundra",
      h1Subtitle: "Adani Ports APSEZ, Gujarat",
      heroAlt: "Illustration of a container ship berthed under blue gantry cranes beside a busy container yard with trucks",
      bannerIntro: [
        { text: "Astromar's Mundra facility is a Government-notified " },
        { text: "ftwz mundra", kw: true },
        { text: " operating within Adani Ports and SEZ (APSEZ) — India's largest commercial port handling 155+ million tonnes annually. Strategic gateway for Middle East, Africa, Europe, and Americas trade." },
      ],
      aboutH2: [
        { text: "FTWZ Mundra", kw: true },
        { text: " — India's Largest Commercial Port Gateway" },
      ],
      aboutParagraphs: [
        [
          { text: "Astromar's Mundra FTWZ is a Government-notified " },
          { text: "free trade warehouse zone in mundra", kw: true },
          { text: " operating within " },
          { text: "Adani Ports and SEZ (APSEZ)", kw: true, href: "https://www.adaniports.com/", target: "_blank", rel: "noopener noreferrer" },
          { text: " — India's largest commercial port by cargo volume. Spanning more than 13,000 hectares of integrated port, SEZ, and logistics infrastructure, this apsez warehouse gives importers, exporters, and re-export operators a scale of operation unmatched anywhere else in India. That scale makes Mundra a natural fit for businesses running " },
          { text: "multi-node supply chains", kw: true, href: "/free-trade-zone-services/supply-chain-management" },
          { text: " across containers, bulk, and FMCG categories, not just single-shipment storage." },
        ],
        [
          { text: "Mundra Port handles 155+ million tonnes annually across 7 container terminals with 6+ million TEU capacity. With 16–17m draft, the port accommodates ultra-large container vessels (ULCVs) and capesize bulkers, providing direct liner services to the Middle East, Europe, Africa, and the Americas. The Mundra Port Railway connects directly to the Western Dedicated Freight Corridor (DFC), enabling efficient rail freight to Delhi, Ludhiana, Jaipur, and Ahmedabad ICDs. Beyond international liner services, Mundra also functions as a key domestic " },
          { text: "coastal shipping hub", kw: true, href: "/free-trade-zone-services/coastal-shipping" },
          { text: ", with regular vessel connections southward to Paradip and Haldia on India's east coast." },
        ],
        [
          { text: "As a fully-operational " },
          { text: "ftwz in mundra", kw: true },
          { text: ", Astromar provides " },
          { text: "duty-deferred storage", kw: true, href: "/blogs/customs-duty-deferment-benefits" },
          { text: " ideal for re-export, consolidation, and multi-modal distribution. Combined with " },
          { text: "specialised ocean freight services", kw: true, href: "/free-trade-zone-services/ocean-freight" },
          { text: " and on-site customs clearance, importers achieve maximum supply chain efficiency under the " },
          { text: "full FTWZ benefit stack", kw: true, href: "/free-trade-zone" },
          { text: "." },
        ],
        [
          { text: "Mundra serves businesses operating across containers, bulk commodities, chemicals, petrochemicals, automotive parts, energy resources, and FMCG categories. With multi-cargo capabilities, integrated port operations, and a strategic position for Middle East and Africa trade lanes, this Gujarat FTWZ delivers custom bonded warehousing in mundra at a scale unmatched anywhere else in India. Businesses distributing goods along India's coastline can also take advantage of " },
          { text: "coastal shipping services", kw: true, href: "/free-trade-zone-services/coastal-shipping" },
          { text: " connecting Mundra to other major ports." },
        ],
      ],
      servicesH2: [
        { text: "FTWZ Mundra", kw: true },
        { text: " Services at APSEZ" },
      ],
      whyChooseH2: [
        { text: "Why Importers Choose " },
        { text: "Mundra APSEZ FTWZ", kw: true },
      ],
      whyChooseBlocks: [
        {
          title: "India's #1 Port",
          items: [
            [{ text: "Largest commercial port by volume (155M+ MT/yr)" }],
            [{ text: "16-17m draft for ultra-large container vessels" }],
            [{ text: "7 container terminals with 6+ million TEU capacity" }],
            [{ text: "Multi-cargo: containers, bulk, liquid, Ro-Ro" }],
          ],
        },
        {
          title: "Scale & Capacity",
          items: [
            [{ text: "Adani Ports SEZ (APSEZ) spans 13,000+ hectares (largest in India)" }],
            [{ text: "Integrated port + SEZ + logistics park" }],
            [{ text: "Direct liner services to 40+ countries" }],
            [{ text: "Strategic for Middle East, Africa, Europe trade" }],
          ],
        },
        {
          title: "Operational Advantages",
          items: [
            [{ text: "Direct DFC rail connectivity to North India" }],
            [{ text: "24/7 operations with on-site customs officer" }],
            [{ text: "Competitive port charges vs JNPA" }],
            [
              { text: "Ideal for " },
              { text: "bonded warehousing in mundra", kw: true },
              { text: " re-export and consolidation" },
            ],
          ],
        },
      ],
      faqH2: [
        { text: "FTWZ Mundra", kw: true },
        { text: " — Frequently Asked Questions" },
      ],
      faqItems: [
        {
          question: [
            { text: "Why is the " },
            { text: "ftwz mundra", kw: true },
            { text: " strategic for international trade?" },
          ],
          answer: [
            { text: "Mundra Port is India's largest commercial port by volume, handling 155+ million tonnes annually with direct liner services to the Middle East, Africa, Europe, and Americas. The integrated APSEZ — spanning 13,000+ hectares — combines port operations, SEZ benefits, and logistics infrastructure in one complex. Direct DFC rail connectivity to North India and competitive port charges versus JNPA make Mundra the preferred gateway for high-volume, multi-cargo international operations." },
          ],
        },
        {
          question: [
            { text: "What cargo types does Mundra FTWZ handle?" },
          ],
          answer: [
            { text: "Mundra's multi-cargo capabilities cover: containerised goods across 7 container terminals; bulk commodities (coal, iron ore, fertilizers, agri-products); chemicals and petrochemicals; automotive parts and vehicles (Ro-Ro terminal); energy resources (LNG, crude); FMCG and consumer goods. The FTWZ supports all these cargo categories with appropriate storage zones, including ambient, climate-controlled, and hazmat-compliant compartments." },
          ],
        },
        {
          question: [
            { text: "How does Mundra compare to JNPA for North India operations?" },
          ],
          answer: [
            { text: "Mundra offers three advantages for North India trade: (1) Direct DFC rail connectivity with high-speed freight transit to Delhi NCR; (2) Lower port charges compared to JNPA terminals; (3) Larger scale and capacity reducing congestion risks. For pure containerised cargo destined for Mumbai/Pune markets, JNPA remains optimal. For multi-cargo operations or North India distribution, Mundra typically offers better economics." },
          ],
        },
        {
          question: [
            { text: "What's the FTWZ advantage over a standard custom bonded warehousing in mundra facility?" },
          ],
          answer: [
            { text: "Standard bonded warehousing within APSEZ allows duty-deferred storage but typically with 1-year limits and restricted activities. The Astromar FTWZ at Mundra offers storage for up to 3 years (extendable to 5 years with special permission), broader permitted activities under SEZ Act 2005 (including CKD/SKD assembly, repacking, relabelling, and re-export), full duty and GST deferral, and 5-year income tax exemption on re-export profits — making it ideal for high-volume international traders and consolidators." },
          ],
        },
      ],
      relatedReading: [
        { title: "Why Global Importers Choose Mundra as a Gateway to North and West India", href: "/blogs/why-importers-choose-mundra-north-west-india" },
      ],
      localBusinessSchema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astromar Logistics — FTWZ Mundra (APSEZ)",
        "description": "FTWZ warehousing within Adani Ports APSEZ — India's largest commercial port. Multi-cargo capabilities for Middle East, Africa, Europe, and Americas trade.",
        "url": "https://www.astromarfreezone.com/locations/mundra",
        "image": "https://www.astromarfreezone.com/images/locations/mundra.webp",
        "telephone": "+91 99402 11014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "APSEZ, Survey No. 169/36",
          "addressLocality": "Mundra",
          "addressRegion": "Gujarat",
          "postalCode": "370421",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 22.8386, "longitude": 69.7295 },
        "openingHours": "Mo-Sa 08:00-20:00",
        "areaServed": ["Mundra", "Kutch", "Gujarat", "North India", "Middle East", "Africa", "Europe"]
      },
      faqPageSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Why is the ftwz mundra strategic for international trade?", "acceptedAnswer": { "@type": "Answer", "text": "India's largest commercial port (155M+ MT/yr) with direct liner services to Middle East, Africa, Europe, Americas. APSEZ integrates port + SEZ + logistics across 13,000+ hectares with DFC rail to North India." } },
          { "@type": "Question", "name": "What cargo types does Mundra FTWZ handle?", "acceptedAnswer": { "@type": "Answer", "text": "Containers (7 terminals), bulk commodities, chemicals, petrochemicals, automotive (Ro-Ro), energy resources (LNG, crude), and FMCG with ambient, climate-controlled, and hazmat zones." } },
          { "@type": "Question", "name": "How does Mundra compare to JNPA for North India operations?", "acceptedAnswer": { "@type": "Answer", "text": "Mundra offers direct DFC rail to Delhi NCR, lower port charges than JNPA, and larger capacity — typically better for multi-cargo and North India distribution. JNPA optimal for Mumbai/Pune container operations." } },
          { "@type": "Question", "name": "What's the FTWZ advantage over a standard custom bonded warehousing in mundra facility?", "acceptedAnswer": { "@type": "Answer", "text": "FTWZ offers storage for up to 3 years (extendable to 5 years with special permission), broader SEZ Act 2005 activities, full duty/GST deferral, and 5-year income tax exemption on re-export profits versus 1-year limited bonded warehouse." } }
        ]
      },
      breadcrumbSchema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.astromarfreezone.com/contact-us" },
          { "@type": "ListItem", "position": 3, "name": "FTWZ Mundra", "item": "https://www.astromarfreezone.com/locations/mundra" }
        ]
      },
    },
    portOverview: {
      headline: "Mundra Port — India's Largest Commercial Port",
      description: "Mundra Port, operated by Adani Ports and SEZ (APSEZ), is India's largest commercial port by cargo volume, handling over 155 million tonnes annually. Our FTWZ facility within the APSEZ offers unmatched scale and connectivity for importers, exporters, and re-export operators. Strategically positioned on the Gulf of Kutch, Mundra provides direct access to trade lanes serving the Middle East, Africa, Europe, and the Americas.",
      portName: "Mundra Port (Adani Ports and SEZ — APSEZ)",
      portType: "Major Port — Multi-Cargo (Container + Bulk + Liquid)",
      sezZone: "Adani Ports and SEZ (APSEZ), Mundra",
      operatedBy: "Adani Ports and SEZ Ltd",
      established: "2001 (Port), 2006 (SEZ)",
      totalArea: "APSEZ — 13,000+ hectares",
    },
    connectivity: {
      headline: "Multi-Modal Connectivity from Mundra",
      road: [
        "NH 341 connecting Mundra to Bhuj and Gandhidham",
        "State Highway to Rajkot (200 km) and Ahmedabad (330 km)",
        "Dedicated industrial road network within APSEZ",
        "Adani-operated road freight services across Gujarat",
      ],
      rail: [
        "Mundra Port Railway — dedicated broad gauge railway line to Indian Railways network",
        "Direct connectivity to Western Dedicated Freight Corridor (DFC)",
        "Container rake services to Delhi, Ludhiana, Jaipur, and Ahmedabad",
        "Mundra–Palanpur rail link for North India freight",
      ],
      sea: [
        "India's largest commercial port — 155+ million MT annually",
        "16–17m draft — accommodates ultra-large container vessels and capesize bulkers",
        "7 container terminals with 6+ million TEU capacity",
        "Direct liner services to Middle East, Europe, Africa, and Americas",
      ],
      air: [
        "Bhuj Airport (BHJ) — 65 km",
        "Ahmedabad International Airport (AMD) — 330 km (primary cargo hub)",
        "Rajkot Airport — 190 km",
      ],
    },
    keyAdvantages: [
      "India's #1 commercial port by volume — unmatched scale and infrastructure",
      "Strategic location for Middle East, Africa, and Europe trade lanes",
      "APSEZ — integrated port + SEZ + logistics park in one complex",
      "Western DFC connectivity for efficient North India distribution",
      "Multi-cargo capabilities: containers, bulk, liquid, and Ro-Ro",
      "Competitive port charges compared to west coast JNPA",
    ],
    industries: ["Bulk Commodities", "Chemicals & Petrochemicals", "Container Cargo", "Automotive & Auto Parts", "Energy & Resources", "FMCG & Consumer Goods"],
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
      heroAlt: "Looking up at glass office towers against a cloudy sky",
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
      "Coordination hub for all 10 FTWZ warehouse locations",
      "Expert customs, compliance, and documentation support",
      "Business development and key account management",
      "Walking distance from Anna Nagar Metro — easy client access",
    ],
    industries: ["All Industries — Corporate Support", "FTWZ Consulting", "Customs & Compliance", "Freight Management", "Supply Chain Advisory", "Trade Finance Support"],
  },
  {
    "slug": "chennai",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "FTWZ Warehouse",
    "phone": "+91 99402 11014",
    "lat": 12.9716,
    "lng": 79.9473,
    "address": "Sriperumbudur: Mannur Village, Sriperumbudur, Kancheepuram, Tamil Nadu 602105; Vallur: Vallur Village, Ponneri, Tiruvallur, Tamil Nadu 600120",
    "seo": {
      "title": "Chennai Free Trade Zone | Astromar Logistics Pvt. Ltd.",
      "description": "Chennai free trade zone: FTWZ facilities at Sriperumbudur and Vallur. Customs duty and IGST are deferred until goods clear into the domestic market.",
      "keywords": "chennai free trade zone, free trade warehouse in chennai, ftwz in chennai, sriperumbudur ftwz, vallur ftwz",
      "h1": "Chennai Free Trade Zone",
      "bannerIntro": [
        {
          "text": "Astromar Logistics Pvt. Ltd. runs two free trade warehousing zone (FTWZ) facilities in Chennai: Sriperumbudur, on the NH 48 industrial corridor, and Vallur, close to the north Chennai ports. Customs duty and IGST are deferred until goods are cleared into the domestic market."
        }
      ],
      "aboutParagraphs": [
        [
          {
            "text": "A free trade warehouse in Chennai lets you bring goods into India, hold them under customs control, and decide later whether to sell them domestically, re-export them or transfer them to another zone. Customs duty and IGST stay deferred while goods remain in the zone and become payable only when they are cleared into the Domestic Tariff Area (DTA). Goods that are re-exported do not attract customs duty. Both facilities are notified under the SEZ Act, 2005, subject to applicable regulations governing FTWZ status."
          }
        ],
        [
          {
            "text": "Storage is available for up to 3 years, extendable to 5 with special permission, which is longer than a standard bonded warehouse typically allows. While goods wait, the zone permits repacking, relabelling, sorting, kitting, quality inspection, consolidation and CKD/SKD assembly, so stock can be prepared for its next move before duty is paid. Customs clearance is handled on-site, with bonded transport linking each facility to the gateway ports and the airport."
          }
        ]
      ],
      "faqH2": [
        {
          "text": "Frequently Asked Questions"
        }
      ],
      "faqItems": [
        {
          "question": [
            {
              "text": "How long does clearance take?"
            }
          ],
          "answer": [
            {
              "text": "With complete documents and no customs query, assessment usually takes one working day, or two to three if Customs orders a physical examination. Movement into the facility follows the same or next working day, and the GRN is issued within about four hours of arrival."
            }
          ]
        },
        {
          "question": [
            {
              "text": "Can I sell to a domestic buyer directly from the zone?"
            }
          ],
          "answer": [
            {
              "text": "Yes. Sales made while goods are still in the zone are outside the scope of GST until clearance into the DTA. Duty and IGST become payable at clearance, based on the value and classification then. Confirm the treatment of your own transactions with your tax advisor."
            }
          ]
        },
        {
          "question": [
            {
              "text": "What if stock is nearing the storage limit?"
            }
          ],
          "answer": [
            {
              "text": "Tell us early. We track ageing stock and can raise an extension request or take your disposition instructions well before the period ends."
            }
          ]
        }
      ],
      "faqPageSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does clearance take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With complete documents and no customs query, assessment usually takes one working day, or two to three if Customs orders a physical examination. Movement into the facility follows the same or next working day, and the GRN is issued within about four hours of arrival."
            }
          },
          {
            "@type": "Question",
            "name": "Can I sell to a domestic buyer directly from the zone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Sales made while goods are still in the zone are outside the scope of GST until clearance into the DTA. Duty and IGST become payable at clearance, based on the value and classification then. Confirm the treatment of your own transactions with your tax advisor."
            }
          },
          {
            "@type": "Question",
            "name": "What if stock is nearing the storage limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tell us early. We track ageing stock and can raise an extension request or take your disposition instructions well before the period ends."
            }
          }
        ]
      },
      "breadcrumbSchema": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Astromar",
            "item": "https://www.astromarfreezone.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Locations",
            "item": "https://www.astromarfreezone.com/contact-us"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Chennai Free Trade Zone",
            "item": "https://www.astromarfreezone.com/locations/chennai"
          }
        ]
      }
    },
    "portOverview": {
      "headline": "Sriperumbudur and Vallur",
      "description": "Astromar Logistics Pvt. Ltd. runs two free trade warehousing zone (FTWZ) facilities in Chennai: Sriperumbudur, on the NH 48 industrial corridor, and Vallur, close to the north Chennai ports. Customs duty and IGST are deferred until goods are cleared into the domestic market.",
      "portName": "",
      "portType": "",
      "sezZone": "",
      "operatedBy": "Astromar Logistics Pvt. Ltd.",
      "established": "",
      "totalArea": ""
    },
    "keyAdvantages": [],
    "industries": [],
    "facilitiesH2": "Free Trade Warehouse in Chennai",
    "facilities": [
      {
        "id": "sriperumbudur",
        "name": "Sriperumbudur FTWZ",
        "area": "Sriperumbudur, Kancheepuram, Tamil Nadu",
        "summary": [
          "Sriperumbudur sits in Kancheepuram district on NH 48, the Chennai-Bengaluru highway, in South India's electronics and automotive belt. The facility is 52 km from Chennai Port and about 42 km from Chennai International Airport, so component importers can reach both gateways from one location. Kattupalli Port is 75 km away, and Sriperumbudur Railway Station on the Chennai-Arakkonam line is close by.",
          "The site suits importers who feed assembly lines on tight schedules. Components and sub-assemblies can be held in the zone without paying duty up front, then staged exactly as the line needs them through kitting, sorting and relabelling. When a shortage hits, air freight can come in from the airport and be released quickly. Electronics and IT hardware, automotive parts, pharmaceuticals, heavy engineering and renewable energy equipment are the cargo types this facility serves most."
        ],
        "address": "Mannur Village, Sriperumbudur, Kancheepuram, Tamil Nadu 602105",
        "phone": "+91 99402 11014",
        "lat": 12.9716,
        "lng": 79.9473,
        "operatingHours": "Mon–Sat: 8:00 AM – 8:00 PM",
        "port": "Chennai Port",
        "nearestAirport": "Chennai International Airport (MAA) — 42 km",
        "localBusinessSchema": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Astromar Logistics Pvt. Ltd. — Chennai Free Trade Zone (Sriperumbudur)",
          "description": "Sriperumbudur sits in Kancheepuram district on NH 48, the Chennai-Bengaluru highway, in South India's electronics and automotive belt.",
          "url": "https://www.astromarfreezone.com/locations/chennai",
          "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
          "telephone": "+91 99402 11014",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mannur & Valarpuram Village, Sriperumbudur Taluk",
            "addressLocality": "Kancheepuram",
            "addressRegion": "Tamil Nadu",
            "postalCode": "602105",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9716,
            "longitude": 79.9473
          },
          "openingHours": "Mo-Sa 08:00-20:00",
          "areaServed": [
            "Chennai",
            "Kancheepuram",
            "Tamil Nadu",
            "India"
          ]
        }
      },
      {
        "id": "vallur",
        "name": "Vallur FTWZ",
        "area": "Vallur, Tiruvallur, Tamil Nadu",
        "summary": [
          "Vallur is in Ponneri Taluk, Tiruvallur district, within about 35 km of three ports: Kattupalli (Adani) at 15 km, Ennore (Kamarajar) at 20 km and Chennai Port at 35 km via the Ennore Expressway. NH 16, the East Coast highway, is 8 km away. Ponneri Railway Station is on the Chennai-Gudur line, and the Ennore Port rail siding gives bulk cargo a rail link. Chennai Central is 32 km away.",
          "That short run from the terminal matters for bulk and industrial cargo. Containers can reach bonded storage quickly, which helps limit detention and demurrage while cargo waits for onward movement. The facility is set up for bulk commodities, chemicals and petrochemicals, energy-sector equipment, steel and metals, automotive parts and consumer goods, and it sits within North Chennai's energy and heavy-industry cluster."
        ],
        "address": "Vallur Village, Ponneri, Tiruvallur, Tamil Nadu 600120",
        "phone": "+91 99402 11014",
        "lat": 13.209,
        "lng": 80.2843,
        "operatingHours": "Mon–Sat: 8:00 AM – 8:00 PM",
        "port": "Kamarajar Port (Ennore)",
        "nearestAirport": "Chennai International Airport (MAA) — 35 km",
        "localBusinessSchema": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Astromar Logistics Pvt. Ltd. — Free Trade Warehouse Chennai (Vallur)",
          "description": "Vallur is in Ponneri Taluk, Tiruvallur district, within about 35 km of three ports: Kattupalli (Adani) at 15 km, Ennore (Kamarajar) at 20 km and Chennai Port at 35 km via the Ennore Expressway.",
          "url": "https://www.astromarfreezone.com/locations/chennai",
          "image": "https://images.unsplash.com/photo-1670121180530-cfcba4438038?w=1920&q=80",
          "telephone": "+91 99402 11014",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vallur & Edayanchavadi Village, Ponneri Taluk",
            "addressLocality": "Tiruvallur",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600120",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.209,
            "longitude": 80.2843
          },
          "openingHours": "Mo-Sa 08:00-20:00",
          "areaServed": [
            "Chennai",
            "Tiruvallur",
            "Ponneri",
            "North Chennai",
            "Tamil Nadu",
            "India"
          ]
        }
      }
    ],
    "facilitySections": [
      {
        "heading": "Cold Storage Warehouse in Chennai",
        "paragraphs": [
          "Importers of temperature-sensitive goods, such as some pharmaceutical products and food items, can hold them in cold storage at Astromar's Chennai FTWZ while clearance and release are planned. Goods stay under customs control, so you can time the move into the domestic market to when stock is actually needed. Share the cargo's temperature requirements and documents with the team before shipping so they can confirm it suits the facility."
        ]
      },
      {
        "heading": "Dangerous Goods Warehouse in Chennai",
        "paragraphs": [
          "Astromar handles dangerous goods at its Chennai FTWZ, alongside standard bonded storage. This covers hazardous components used in electronics and automotive supply chains and chemical, petrochemical and industrial cargo, subject to applicable regulations. Send the product's classification and safety data sheet before shipping so the team can confirm handling and storage."
        ]
      },
      {
        "heading": "Value-Added Services in the Zone",
        "paragraphs": [
          "Value-added work happens inside the zone while goods stay bonded. You raise a work order that sets out the scope, and the unit manager confirms it falls within the facility's authorised operations before work starts. Kitting, labelling, repackaging, quality inspection and palletisation are the common requests. This work does not change the deferred status of your goods, and input and output quantities, including any wastage, are recorded in the bonded ledger."
        ]
      },
      {
        "heading": "Who Uses Our Chennai FTWZ",
        "paragraphs": [
          "Importers of electronics and IT hardware, automotive and auto components, pharmaceuticals, chemicals and petrochemicals, energy and LNG-related equipment, bulk commodities, steel and metals, textiles and leather, heavy engineering, renewable energy equipment and consumer goods use the Chennai zone. Traders who buy for resale also use it, since stock can be sold on while it is still in the zone and cleared only when the buyer is ready."
        ]
      },
      {
        "heading": "Stock Control and Records",
        "paragraphs": [
          "Every consignment is entered in the bonded stock ledger against your reference and the Bill of Entry number, and tagged to a storage location. Periodic cycle counts are reconciled against the ledger, and any shortage or damage found on receipt is photographed, noted on the GRN and reported to you the same working day. Goods that need temperature control are kept in a designated area with logged monitoring."
        ]
      },
      {
        "heading": "How Your Shipment Moves",
        "paragraphs": [
          "You send the shipping instructions, commercial invoice, packing list, Bill of Lading or Air Waybill, and your Import Export Code (IEC), plus any product licences such as BIS, quarantine or drug licence. Astromar files the Bill of Entry for the goods to enter the zone, usually on the same working day the manifest is available. No duty or IGST is paid at that stage. After Customs clears the filing, the cargo moves into the zone under customs seal, and you receive a Goods Receipt Note (GRN) once it is checked and logged.",
          "When you are ready to move stock out, you choose one of three routes. For domestic sale, a Bill of Entry for home consumption is filed, customs duty and IGST are paid on the value at that time, and goods are released to your buyer. For re-export, a Shipping Bill is filed and goods leave India without customs duty. For a transfer, goods move under bond to another FTWZ or SEZ unit, still duty-deferred."
        ]
      }
    ]
  },
  {
    "slug": "mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "FTWZ Warehouse",
    "phone": "+91 99402 11014",
    "lat": 18.9543,
    "lng": 72.9479,
    "address": "JNPA: JNPA SEZ, Uran, Raigad, Maharashtra 400707; Panvel: Village Sai, Taluka Panvel, Raigad, Maharashtra 410206",
    "seo": {
      "title": "FTWZ in Mumbai | Astromar Logistics Pvt. Ltd.",
      "description": "FTWZ in Mumbai: facilities at JNPA, Uran and Panvel. Customs duty and IGST are deferred until goods are cleared into the domestic market.",
      "keywords": "ftwz in mumbai, free trade zone warehousing in mumbai, jnpa ftwz, panvel ftwz",
      "h1": "FTWZ in Mumbai",
      "bannerIntro": [
        {
          "text": "Astromar Logistics Pvt. Ltd. operates two FTWZ facilities in the Mumbai region: an on-port site inside the JNPA SEZ at Uran, and an inland site at Panvel in Navi Mumbai. Customs duty and IGST are deferred until goods are cleared into the domestic market."
        }
      ],
      "aboutParagraphs": [
        [
          {
            "text": "Free trade zone warehousing in Mumbai lets importers bring goods into India, hold them under customs control and choose later whether to sell them domestically, re-export them or move them to another zone. Customs duty and IGST remain deferred while goods stay in the zone and are payable only on clearance into the Domestic Tariff Area (DTA). Re-exported goods do not attract customs duty. Both facilities are notified under the SEZ Act, 2005, subject to applicable regulations governing FTWZ status."
          }
        ],
        [
          {
            "text": "Storage is available for up to 3 years, extendable to 5 with special permission, longer than a standard bonded warehouse typically allows. The zone permits repacking, relabelling, sorting, kitting, quality inspection, consolidation and CKD/SKD assembly, so cargo can be prepared before duty is paid. Customs clearance is handled on-site, and bonded transport connects the facilities with the JNPA terminals."
          }
        ]
      ],
      "faqH2": [
        {
          "text": "FAQs"
        }
      ],
      "faqItems": [
        {
          "question": [
            {
              "text": "How does an FTWZ differ from a standard bonded warehouse in Mumbai?"
            }
          ],
          "answer": [
            {
              "text": "A standard bonded warehouse allows duty-deferred storage but typically limits storage to one year and restricts permitted activities. The FTWZ allows storage up to 3 years, extendable to 5 with special permission, and the activities listed above."
            }
          ]
        },
        {
          "question": [
            {
              "text": "What happens to duty if I re-export?"
            }
          ],
          "answer": [
            {
              "text": "No customs duty becomes payable on goods re-exported from the zone. Duty and IGST arise only when goods are cleared into the DTA."
            }
          ]
        },
        {
          "question": [
            {
              "text": "Can stock be sold on while it is still in the zone?"
            }
          ],
          "answer": [
            {
              "text": "Yes. Sales made while goods are in the zone are outside the scope of GST until clearance into the DTA. Duty and IGST become payable at clearance, based on the value and classification then. Confirm the treatment of your own transactions with your tax advisor."
            }
          ]
        }
      ],
      "faqPageSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does an FTWZ differ from a standard bonded warehouse in Mumbai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard bonded warehouse allows duty-deferred storage but typically limits storage to one year and restricts permitted activities. The FTWZ allows storage up to 3 years, extendable to 5 with special permission, and the activities listed above."
            }
          },
          {
            "@type": "Question",
            "name": "What happens to duty if I re-export?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No customs duty becomes payable on goods re-exported from the zone. Duty and IGST arise only when goods are cleared into the DTA."
            }
          },
          {
            "@type": "Question",
            "name": "Can stock be sold on while it is still in the zone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Sales made while goods are in the zone are outside the scope of GST until clearance into the DTA. Duty and IGST become payable at clearance, based on the value and classification then. Confirm the treatment of your own transactions with your tax advisor."
            }
          }
        ]
      },
      "breadcrumbSchema": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Astromar",
            "item": "https://www.astromarfreezone.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Locations",
            "item": "https://www.astromarfreezone.com/contact-us"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "FTWZ in Mumbai",
            "item": "https://www.astromarfreezone.com/locations/mumbai"
          }
        ]
      }
    },
    "portOverview": {
      "headline": "JNPA (Uran) and Panvel",
      "description": "Astromar Logistics Pvt. Ltd. operates two FTWZ facilities in the Mumbai region: an on-port site inside the JNPA SEZ at Uran, and an inland site at Panvel in Navi Mumbai. Customs duty and IGST are deferred until goods are cleared into the domestic market.",
      "portName": "",
      "portType": "",
      "sezZone": "",
      "operatedBy": "Astromar Logistics Pvt. Ltd.",
      "established": "",
      "totalArea": ""
    },
    "keyAdvantages": [],
    "industries": [],
    "facilitiesH2": "Free Trade Zone Warehousing in Mumbai",
    "facilities": [
      {
        "id": "jnpa",
        "name": "JNPA FTWZ, Uran",
        "area": "Uran, Raigad, Maharashtra",
        "summary": [
          "The JNPA facility sits inside the JNPA SEZ at Uran, in Raigad district, beside Nhava Sheva, one of India's major container ports. Containers move from the terminal to the warehouse without inland transit, which removes trucking cost and the detention charges that build up while a box waits for a vehicle. That makes it the natural choice for importers who handle high volumes of containers, re-export, consolidate or run time-sensitive supply chains.",
          "Consolidation and break-bulk work are the facility's strengths: cargo from several suppliers can be received, sorted and combined into one outbound shipment, then released for re-export or cleared into the DTA when buyers are ready. The Western Dedicated Freight Corridor gives rail access to inland container depots in North India, and the NH 348 Uran-Panvel road links to the Mumbai-Pune Expressway and the Mumbai Trans Harbour Link (MTHL) for South Mumbai. Containerised electronics, automotive parts, consumer goods, pharmaceuticals, chemicals, textiles and machinery are the usual cargo."
        ],
        "address": "JNPA SEZ, Uran, Raigad, Maharashtra 400707",
        "phone": "+91 99402 11014",
        "lat": 18.9543,
        "lng": 72.9479,
        "operatingHours": "Mon–Sat: 8:00 AM – 8:00 PM",
        "port": "Jawaharlal Nehru Port (JNPA)",
        "nearestAirport": "Chhatrapati Shivaji Maharaj International Airport (BOM) — 40 km",
        "localBusinessSchema": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Astromar Logistics Pvt. Ltd. — FTWZ in Mumbai (JNPA Nhava Sheva)",
          "description": "The JNPA facility sits inside the JNPA SEZ at Uran, in Raigad district, beside Nhava Sheva, one of India's major container ports.",
          "url": "https://www.astromarfreezone.com/locations/mumbai",
          "image": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
          "telephone": "+91 99402 11014",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "JNPA SEZ, Village Sawarkhar, Uran",
            "addressLocality": "Raigad",
            "addressRegion": "Maharashtra",
            "postalCode": "400707",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.9543,
            "longitude": 72.9479
          },
          "openingHours": "Mo-Sa 08:00-20:00",
          "areaServed": [
            "Mumbai",
            "Navi Mumbai",
            "JNPA",
            "Maharashtra",
            "India"
          ]
        }
      },
      {
        "id": "panvel",
        "name": "Panvel FTWZ, Navi Mumbai",
        "area": "Panvel, Raigad, Maharashtra",
        "summary": [
          "The Panvel facility is in Taluka Panvel, Raigad district, about 35 km from JNPA by road. It sits where the Mumbai-Pune Expressway meets the NH 4 corridor, so it serves as a bridge between the port and Maharashtra's industrial belt, including Pune, Nashik and Aurangabad. Panvel Railway Junction, on the Central and Harbour lines, is nearby. Operating costs here are lower than in core Mumbai, and the MTHL shortens the drive to South Mumbai.",
          "Panvel is built for distribution and value-added work rather than container-side speed. Automotive OEMs and Tier-1 suppliers, electronics and IT hardware importers, FMCG and consumer goods companies, chemicals and pharma importers, and project cargo operators handling heavy machinery and capital equipment use it to hold stock close to their customers, kit and relabel it, and release it in batches. Many importers pair the two sites, using JNPA for fast container turns and Panvel for storage and onward distribution."
        ],
        "address": "Village Sai, Taluka Panvel, Raigad, Maharashtra 410206",
        "phone": "+91 99402 11014",
        "lat": 18.9894,
        "lng": 73.1175,
        "operatingHours": "Mon–Sat: 8:00 AM – 8:00 PM",
        "port": "Nhava Sheva (JNPA)",
        "nearestAirport": "Chhatrapati Shivaji Maharaj International Airport (BOM) — 45 km",
        "localBusinessSchema": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Astromar Logistics Pvt. Ltd. — Free Trade Warehouse Zone Mumbai (Panvel)",
          "description": "The Panvel facility is in Taluka Panvel, Raigad district, about 35 km from JNPA by road.",
          "url": "https://www.astromarfreezone.com/locations/mumbai",
          "image": "https://www.astromarfreezone.com/images/locations/panvel.webp",
          "telephone": "+91 99402 11014",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Village Sai, Taluka Panvel",
            "addressLocality": "Raigad",
            "addressRegion": "Maharashtra",
            "postalCode": "410206",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.9894,
            "longitude": 73.1175
          },
          "openingHours": "Mo-Sa 08:00-20:00",
          "areaServed": [
            "Mumbai",
            "Navi Mumbai",
            "Panvel",
            "Pune",
            "Maharashtra",
            "India"
          ]
        }
      }
    ],
    "facilitySections": [
      {
        "heading": "Cold Storage Warehouse in Mumbai",
        "paragraphs": [
          "Temperature-sensitive goods, such as some pharmaceutical products and food items, can be held in cold storage at Astromar's Mumbai FTWZ while clearance and release are planned. Goods stay under customs control, so you can match the move into the domestic market to when stock is needed. Share the cargo's temperature requirements and documents with the team before shipping so they can confirm it suits the facility."
        ]
      },
      {
        "heading": "Dangerous Goods Warehouse in Mumbai",
        "paragraphs": [
          "Astromar handles dangerous goods at its Mumbai FTWZ alongside standard bonded storage, subject to applicable regulations. This includes hazardous chemicals and components moving through the JNPA gateway. Send the product's classification and safety data sheet before shipping so the team can confirm handling and storage. Chemicals that are not classified as hazardous follow the standard route."
        ]
      },
      {
        "heading": "Getting Cargo In and Out",
        "paragraphs": [
          "By road, the NH 348 Uran-Panvel corridor and the Mumbai-Pune Expressway connect both sites to Pune, Nashik and Gujarat's industrial belts, and the MTHL cuts the drive to South Mumbai. By rail, the Western Dedicated Freight Corridor serves container movement to North India from JNPA, and Panvel Junction handles passenger and local links. By sea, Nhava Sheva's container terminals offer liner services to the main trade routes. By air, Navi Mumbai and Chhatrapati Shivaji Maharaj International Airport are the gateways for urgent or high-value consignments. Bonded transport carries cargo between the terminals and either facility under customs seal."
        ]
      },
      {
        "heading": "Value-Added Services and Stock Control",
        "paragraphs": [
          "Kitting, labelling, repackaging, quality inspection and palletisation are done inside the zone while goods stay bonded. Each job is scoped in a work order and checked against the facility's authorised operations before work starts. Every consignment is entered in the bonded stock ledger against your reference and tagged to a location, with periodic cycle counts and a Goods Receipt Note (GRN) issued on arrival. Shortage or damage found on receipt is photographed and reported to you the same working day."
        ]
      },
      {
        "heading": "Moving Stock Out",
        "paragraphs": [
          "Three exit routes are open. For domestic sale, a Bill of Entry for home consumption is filed, and customs duty and IGST are paid on the value at the time of clearance. For re-export, a Shipping Bill is filed and goods leave India without customs duty. For a transfer, goods move under bond to another FTWZ or SEZ unit, still duty-deferred. Clearance timelines and the documents we need are the same as at our Chennai zone, and we flag anything that may affect your schedule as soon as it arises."
        ]
      }
    ]
  },
];

export const getLocationBySlug = (slug: string): FTWZLocationDetail | undefined => {
  return ftwzLocationDetails.find((loc) => loc.slug === slug);
};
