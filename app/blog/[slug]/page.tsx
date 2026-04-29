import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Article = {
  title: string
  metaDescription: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  intro: string
  sections: { heading: string; content: string }[]
  keywords: string[]
}

const articles: Record<string, Article> = {
  'what-is-ftwz-complete-guide': {
    title: 'What is FTWZ? A Complete Guide to Free Trade Warehousing Zones in India',
    metaDescription: 'Everything about FTWZ in India — what it is, how duty deferment works, GST benefits, FTZ vs FTWZ vs SEZ, and how to use it for import-export business.',
    category: 'FTWZ',
    date: '15 Feb 2026',
    readTime: '18 min read',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200',
    imageAlt: 'FTWZ bonded warehouse India with pallet racking',
    intro: 'A Free Trade Warehousing Zone (FTWZ) is a specially designated area in India where imported goods can be stored, processed, and re-exported without paying customs duty or GST — until the goods actually enter the domestic market. For importers, exporters, and multinational companies, FTWZ is one of the most powerful tools to reduce working capital costs, defer taxes, and streamline cross-border trade.',
    sections: [
      { heading: 'What is a Free Trade Warehousing Zone (FTWZ)?', content: 'A Free Trade Warehousing Zone (FTWZ) is a type of Special Economic Zone (SEZ) in India established specifically for warehousing and trading activities. Governed by the SEZ Act 2005 and SEZ Rules 2006, FTWZ facilities are treated as foreign territory for customs purposes — goods inside are not considered to have entered India until cleared for domestic sale.\n\nFTWZ differs from a regular bonded warehouse because:\n• It allows value-added services: repacking, relabeling, kitting, quality inspection\n• Permits re-export without any customs duty\n• Supports partial domestic clearance — clear a portion, keep the rest duty-free\n• Recognized under the SEZ Act with a robust legal framework' },
      { heading: 'FTWZ vs FTZ vs SEZ — Key Differences', content: 'Free Trade Zone (FTZ) is a global generic term for designated areas with relaxed trade regulations. In India this concept is implemented as FTWZ under the SEZ Act.\n\nFTWZ (Free Trade Warehousing Zone) is India\'s specific implementation — focused purely on warehousing and trading of goods. It is a subset of SEZ.\n\nSEZ (Special Economic Zone) is a broader category including manufacturing, IT parks, and other economic activities. FTWZ is a type of SEZ focused only on storage and trade.\n\nBonded Warehouse is a customs-controlled facility for duty deferment — less flexible, no value-added services, limited re-export facilitation.\n\nFor Indian importers and global companies routing trade through India, FTWZ offers the most comprehensive benefit package.' },
      { heading: 'Key Benefits of FTWZ', content: '1. 100% Customs Duty and GST Deferment — goods stored in FTWZ do not attract customs duty or IGST until cleared for domestic sale. Deferrable indefinitely.\n\n2. Re-export Without Duty — goods re-exported from FTWZ to any country attract zero customs duty, zero IGST, zero GST. Ideal for India-based regional distribution hubs.\n\n3. Value-Added Services — repacking, relabeling, kitting, quality inspection, sorting, and minor assembly — without triggering duty liability.\n\n4. Partial Domestic Clearance — clear a portion of inventory for domestic sale while keeping the rest duty-free.\n\n5. No Time Limit on Storage — no mandatory clearance timeline, ideal for strategic inventory management.\n\n6. Operational Flexibility — consolidate from multiple origins, break bulk, repack, and distribute from the FTWZ network.' },
      { heading: 'How Customs Duty Deferment Works in FTWZ', content: 'When goods arrive at an Indian port and are transferred to FTWZ:\n1. Goods enter under a Bill of Entry for Warehousing — zero duty paid\n2. Goods are stored under customs supervision inside FTWZ\n3. For domestic sale: DTA clearance is filed, duty + IGST paid only on quantity being cleared\n4. For re-export: goods leave under Shipping Bill with zero duty\n\nExample: An importer with 1,000 units can clear 200 for domestic sale (paying duty on 200 only) and re-export 800 units with zero duty — a significant cash flow advantage over traditional import clearance.' },
      { heading: 'FTWZ Locations in India', content: 'Astromar Logistics operates FTWZ facilities at:\n• Chennai Sriperumbudur — near Chennai Port, serving South India auto, electronics, pharma\n• Chennai Vallur — near Kamarajar Port, serving heavy industries and chemicals\n• Mumbai JNPA — adjacent to Jawaharlal Nehru Port, India\'s largest container port\n• Mumbai Panvel — serving FMCG, electronics, and retail sectors\n• Kochi Vallarpadam — at ICTT, serving Kerala and South India trade\n• Vizag Duvvada — at VSEZ, serving East India and pharma exporters\n• Delhi Khurja — serving North India manufacturing and trading\n• Bengaluru Devanahalli — at Aerospace SEZ, serving aerospace and electronics\n• Dahej Gujarat — serving chemical, petrochemical, and industrial sectors' },
      { heading: 'Who Should Use an FTWZ?', content: 'FTWZ is ideal for:\n• Importers wanting to defer customs duty and IGST until goods are sold\n• Exporters consolidating goods from multiple overseas suppliers\n• Multinational companies using India as a regional distribution hub\n• Pharma companies needing GDP-compliant cold storage with duty-free status\n• Electronics companies needing secure duty-free storage for high-value components\n• FMCG companies managing seasonal inventory without upfront duty payments\n• Trading companies importing for both domestic sale and re-export' },
      { heading: 'How to Start Using an FTWZ', content: '1. Identify your FTWZ location based on port of import or customer base\n2. Sign a warehousing agreement with an FTWZ operator like Astromar Logistics\n3. Obtain IEC (Import Export Code) — mandatory for all import-export in India\n4. File Bill of Entry for Warehousing at port of entry — duty deferred\n5. Transfer goods to FTWZ under customs supervision\n6. Manage inventory — request DTA clearance or re-export as needed\n7. Pay duty only on DTA clearance, only on quantity cleared\n\nAstromar Logistics handles all documentation, customs filing, and logistics coordination.' }
    ],
    keywords: ['FTWZ', 'Free Trade Warehousing Zone', 'FTZ India', 'Free Trade Zone India', 'duty free warehousing India', 'bonded warehouse India', 'SEZ warehousing', 'customs duty deferment India', 'FTWZ Chennai', 'FTWZ Mumbai']
  },

  'cbm-calculation-freight-shipping': {
    title: 'How to Calculate CBM for Freight Shipping: Formula, Examples & Tools',
    metaDescription: 'Learn how to calculate CBM (Cubic Meter) for sea freight and air volumetric weight. Includes formula, worked examples, container fit guide, and free calculator.',
    category: 'Freight',
    date: '01 Feb 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200',
    imageAlt: 'Container ship sea freight CBM calculation',
    intro: 'CBM — Cubic Meter — is the standard unit for measuring cargo volume in international freight. Whether shipping by sea, air, or land, understanding CBM calculation correctly can save thousands in freight costs. This guide covers the CBM formula, worked examples, air volumetric weight, and how to choose the right container.',
    sections: [
      { heading: 'What is CBM in Freight?', content: 'CBM stands for Cubic Meter — the universally accepted unit for cargo volume in sea freight, air freight, and road transport. Freight charges are based on actual weight or volumetric weight, whichever is higher.\n\nUnderstanding CBM helps you:\n• Calculate freight costs before booking\n• Determine how many units fit in a container\n• Compare FCL vs LCL shipping costs\n• Negotiate better freight rates with carriers' },
      { heading: 'CBM Formula', content: 'CBM = Length (m) × Width (m) × Height (m) × Quantity\n\nIf dimensions are in centimeters:\nCBM = (L cm ÷ 100) × (W cm ÷ 100) × (H cm ÷ 100) × Qty\n\nExample: A carton 60cm × 40cm × 50cm, quantity 100 boxes:\n= (0.60 × 0.40 × 0.50) × 100 = 0.12 × 100 = 12 CBM\n\nFor multiple item types, calculate CBM for each and sum.' },
      { heading: 'Container CBM Capacity Guide', content: 'Standard container usable volumes:\n• 20ft Standard: 25 CBM, max 21,700 kg\n• 40ft Standard: 55 CBM, max 26,500 kg\n• 40ft High Cube: 67 CBM, max 26,500 kg\n\nLCL (Less than Container Load): you pay per CBM.\nFCL (Full Container Load): flat rate for entire container — economical above 15–18 CBM.' },
      { heading: 'Air Freight Volumetric Weight', content: 'Air freight uses volumetric weight when it exceeds actual weight.\n\nFormula: Vol. Weight (kg) = L (cm) × W (cm) × H (cm) ÷ 6000\n\nExample: Package 80cm × 60cm × 40cm, actual weight 15 kg:\nVol. Weight = 80 × 60 × 40 ÷ 6000 = 32 kg\nCharged weight = 32 kg (volumetric, higher than actual 15 kg)\n\nCompact, dense cargo ships more economically by air — packaging optimization is critical.' },
      { heading: 'CBM and FTWZ Storage Costs', content: 'Inside an FTWZ, storage charges are calculated per CBM per day or per pallet position per month. Knowing your cargo CBM helps estimate monthly FTWZ storage costs, optimize pallet utilization, and plan partial clearances.\n\nAstromar\'s FTWZ facilities offer flexible storage pricing based on actual CBM with real-time WMS inventory tracking.' }
    ],
    keywords: ['CBM calculation', 'cubic meter freight', 'how to calculate CBM', 'CBM formula shipping', 'air volumetric weight', 'container CBM capacity', 'LCL CBM', 'freight volume calculation India']
  },

  'customs-duty-deferment-benefits': {
    title: '5 Ways Customs Duty Deferment Saves Your Business Money in India',
    metaDescription: 'How customs duty deferment through FTWZ improves cash flow, reduces import costs, and gives Indian importers a competitive advantage.',
    category: 'Customs',
    date: '20 Jan 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200',
    imageAlt: 'Customs clearance documentation India import duty',
    intro: 'Every rupee of customs duty paid upfront is working capital locked away. For importers bringing large volumes into India, customs duty and IGST liability can run into crores — paid months before goods are sold. FTWZ duty deferment solves this by allowing duty payment only when goods leave the warehouse for domestic sale.',
    sections: [
      { heading: 'What is Customs Duty Deferment?', content: 'Customs duty deferment means delaying import customs duty and IGST payment until goods are needed for domestic sale — rather than paying at time of import.\n\nIn India, deferment is achieved through:\n• FTWZ (Free Trade Warehousing Zone) under the SEZ Act\n• Bonded Warehouses under Section 57/58/59 of the Customs Act\n• SEZ units for manufacturing with export obligation\n\nFTWZ offers the most flexible structure for trading and distribution companies.' },
      { heading: 'Way 1 — Improve Working Capital', content: 'Traditional import clearance: you pay customs duty and IGST immediately — often 18–30% of CIF value.\n\nWith FTWZ:\n• Zero duty at time of import\n• Duty paid only when cleared for domestic sale\n• Stagger clearances based on actual sales\n\nExample: Electronics importer bringing ₹10 crore of goods at 20% duty saves ₹2 crore in immediate outflow. That ₹2 crore stays in the business earning returns.' },
      { heading: 'Way 2 — Re-export Without Any Duty', content: 'Goods stored in FTWZ and re-exported to third countries attract zero customs duty, zero IGST, zero GST.\n\nIdeal for companies using India as a regional hub supplying South Asia, Southeast Asia, and Middle East. Import once, store in FTWZ, distribute across multiple countries — paying duty only on what enters the Indian domestic market.' },
      { heading: 'Way 3 — Reduce Demurrage Costs', content: 'Demurrage is charged when containers are not cleared within free days (typically 3–7 days at Indian ports).\n\nWith FTWZ pre-arrangement:\n• Containers moved to FTWZ quickly — no port demurrage\n• FTWZ storage significantly cheaper than port storage\n• No pressure of rushed customs clearance decisions\n• Store while negotiating with buyers or waiting for better market prices' },
      { heading: 'Way 4 — Optimize Duty Payment Timing', content: 'Import duty is calculated on CIF value. Market prices fluctuate — sometimes goods are cleared when selling prices are low, squeezing margins.\n\nWith FTWZ:\n• Clear goods only when market prices are favorable\n• Avoid paying duty on goods that may be re-exported\n• Time DTA clearances to align with GST input credit utilization\n• Clear in smaller batches to manage duty outflow against receivables' },
      { heading: 'Way 5 — Value-Added Processing Before Duty Payment', content: 'FTWZ allows value-added services before domestic clearance:\n• Repacking and relabeling for Indian retail requirements\n• Kitting and bundling for promotional packs\n• Quality inspection and testing before committing to DTA clearance\n• Sorting and grading — clear premium grades domestically, re-export lower grades\n\nImprove realized value before paying duty — increasing effective margin on each clearance.\n\nAstromar Logistics provides all VAS at FTWZ facilities across Chennai, Mumbai, Kochi, Vizag, Delhi, Bengaluru, and Dahej.' }
    ],
    keywords: ['customs duty deferment India', 'FTWZ duty benefits', 'import duty savings India', 'bonded warehouse duty deferment', 'GST deferment FTWZ', 'reduce import costs India', 'duty free import India']
  },

  'cold-chain-logistics-india': {
    title: 'Cold Chain Logistics in India: Challenges, Solutions & FTWZ Integration',
    metaDescription: 'Complete guide to cold chain logistics in India for pharma, food, and perishables. How FTWZ cold storage enables GDP-compliant duty-free temperature-controlled warehousing.',
    category: 'Cold Storage',
    date: '10 Jan 2026',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200',
    imageAlt: 'Cold chain logistics warehouse temperature controlled storage India',
    intro: 'India\'s cold chain logistics sector is growing rapidly — driven by pharmaceutical exports, food processing, and expanding retail. Yet infrastructure gaps, GDP compliance requirements, and import duty make cold chain one of the most complex logistics segments. FTWZ cold storage offers a powerful solution: duty-free, GDP-compliant temperature-controlled warehousing near major ports.',
    sections: [
      { heading: 'What is Cold Chain Logistics?', content: 'Cold chain logistics is the end-to-end management of temperature-sensitive goods while maintaining a specified temperature range throughout. It includes refrigerated warehousing, temperature-controlled transport (reefer trucks and containers), temperature excursion monitoring, and regulatory compliance (GDP, GMP, FSSAI, CDSCO).\n\nKey cold chain segments in India:\n• Pharmaceuticals: 2°C to 8°C and -20°C\n• Food and perishables: 0°C to 4°C\n• Frozen goods: -18°C to -25°C' },
      { heading: 'Challenges in Indian Cold Chain', content: '1. Infrastructure Gaps: Cold storage capacity concentrated in agricultural hubs — not near ports where import-export cold chain is critical.\n\n2. GDP Compliance: Pharma importers require WHO-GDP compliant facilities with validated temperature mapping and calibrated sensors. Few port-proximate facilities meet this standard.\n\n3. Import Duty Burden: Biologics, vaccines, and food ingredients attract high customs duty — paying immediately on import is a major cash flow burden.\n\n4. Reefer Container Demurrage: At Indian ports, reefer containers on plug points attract higher demurrage than dry containers. Clearance delays significantly increase costs.\n\n5. Last-Mile Temperature Integrity: Maintaining cold chain from warehouse to final customer requires dedicated reefer fleet — still underdeveloped in Tier 2 and Tier 3 cities.' },
      { heading: 'FTWZ Cold Storage — Optimal for Pharma Importers', content: 'FTWZ cold storage combines two advantages:\n\n1. Duty-Free Storage: Biologics, vaccines, and medical devices stored in FTWZ do not attract customs duty or IGST until DTA clearance. At 10–20% duty rates, this represents significant working capital savings.\n\n2. GDP Compliance: Astromar FTWZ cold storage features validated temperature zones (2-8°C, -20°C, ambient), 24/7 monitoring with data loggers and SCADA systems, alarm systems with backup power, full batch traceability, and Qualified Person oversight.\n\n3. Re-export Capability: Pharma companies can re-export to Sri Lanka, Bangladesh, Nepal, Myanmar, and Southeast Asia from FTWZ with zero duty on re-exported quantities.' },
      { heading: 'Temperature Zones at Astromar FTWZ', content: 'Available temperature zones:\n• Ambient (15°C–25°C): APIs, excipients, packaging materials, medical devices\n• Cool Room (8°C–15°C): Specialty food ingredients, cosmetics, specialty chemicals\n• Refrigerated (2°C–8°C): Vaccines, biologics, insulin, blood products, fresh produce\n• Deep Frozen (-20°C): Plasma, enzymes, certain biologics, frozen food\n• Ultra Low (-80°C): Available at select locations for mRNA and specialty biologics\n\nAll zones have independent backup power, temperature mapping validation, and 24/7 remote monitoring.' },
      { heading: 'Food and Perishables Cold Chain in FTWZ', content: 'For food importers and exporters, FTWZ cold storage provides duty-free storage of imported seafood, meat, dairy, and frozen products; FSSAI compliance support; re-export of imported food without duty; and value-added services including repackaging, relabeling for Indian retail compliance, and quality grading.\n\nFTWZ is especially valuable for seafood exporters consolidating product from multiple regions, storing in FTWZ, and exporting to Japan, EU, and USA — paying zero customs duty at any stage.' }
    ],
    keywords: ['cold chain logistics India', 'FTWZ cold storage', 'GDP compliant warehouse India', 'pharma cold chain FTWZ', 'temperature controlled warehousing India', 'duty free cold storage India', 'cold chain pharma import India']
  },

  'air-vs-sea-freight-comparison': {
    title: 'Air Freight vs Sea Freight: Complete Guide to Choosing the Right Mode',
    metaDescription: 'Detailed comparison of air freight vs sea freight for Indian importers and exporters — cost, transit time, cargo suitability, and break-even analysis.',
    category: 'Freight',
    date: '28 Dec 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
    imageAlt: 'Air freight cargo aircraft vs sea freight container ship comparison',
    intro: 'The decision between air freight and sea freight is one of the most important choices in international logistics. Air freight is fast but expensive. Sea freight is economical but slow. But the real decision is far more nuanced — this guide gives you a complete framework to choose the right mode for your cargo, timeline, and budget.',
    sections: [
      { heading: 'Air vs Sea Freight — Key Differences', content: 'Transit Time India–Europe: Air 2–5 days vs Sea 18–25 days\nTransit Time India–USA: Air 3–6 days vs Sea 25–35 days\nCost per kg: Air ₹300–700/kg vs Sea ₹15–50/kg\nMinimum shipment: Air 1 kg vs Sea 1 CBM (LCL)\nCargo size limit: Air max ~150 cm longest side vs Sea no limit\nReliability: Air high (less weather risk) vs Sea moderate (port delays)\nBest for: Air = high value, time-sensitive; Sea = high volume, non-urgent' },
      { heading: 'When to Choose Air Freight', content: 'Choose air freight when:\n• Time is critical — product launches, retail replenishment, production line stoppages needing urgent parts\n• High value, low volume — electronics, semiconductors, pharmaceuticals where inventory carrying cost is high\n• Perishables — fresh produce, biologics, cut flowers, fresh seafood with short shelf life\n• Compliance deadlines — shipments needed before regulatory deadline or trade show\n• Security-sensitive cargo — high-value items where sea transit risk is unacceptable\n\nBreak-even rule: if cargo value exceeds ₹5,000–10,000 per kg, air freight economics often make sense.' },
      { heading: 'When to Choose Sea Freight', content: 'Choose sea freight when:\n• High volume — FCL economical above 15–18 CBM regardless of cargo type\n• Non-urgent cargo — raw materials, machinery, furniture, textiles, commodities\n• Heavy or oversized cargo — equipment, vehicles, project cargo that cannot fly\n• Price-sensitive products — where freight cost is a significant % of product value\n• FTWZ supply chain — sea freight into FTWZ with duty deferment is a powerful combination\n\nFor most manufacturing companies and bulk importers, sea freight is the default mode.' },
      { heading: 'Break-Even Analysis — Air vs Sea', content: 'Calculate your break-even point:\n\nAir freight premium over sea = (Air rate - Sea rate) per kg\nInventory carrying cost = (Product value × monthly interest rate) ÷ 30 days in transit\n\nIf inventory carrying cost for the extra sea transit days exceeds the air freight premium, air freight is economically justified — even for lower value goods.\n\nTypical break-even: Products valued above ₹3,000–5,000/kg with transit time sensitivity.' },
      { heading: 'Sea Freight + FTWZ — The Best of Both Worlds', content: 'For many Indian importers, the optimal strategy is:\n1. Ship by sea (lower freight cost)\n2. Store in FTWZ (defer customs duty and IGST)\n3. Clear domestically in batches as orders come in\n4. Re-export portions without duty\n\nThis combines sea freight cost savings with FTWZ working capital benefits — delivering the best overall landed cost for your products.\n\nAstromar Logistics manages end-to-end sea freight + FTWZ supply chains from all major global origins to our pan-India FTWZ network.' }
    ],
    keywords: ['air freight vs sea freight India', 'air freight India', 'sea freight India', 'FCL LCL India', 'freight comparison India', 'shipping mode selection', 'air cargo India', 'ocean freight India']
  },

  'landed-cost-calculation-importers': {
    title: 'Landed Cost Calculation for Importers: Every Cost You Need to Know',
    metaDescription: 'How to calculate total landed cost for importing goods into India — CIF value, customs duty, IGST, port charges, CHA fees, and hidden costs with worked examples.',
    category: 'Trade Finance',
    date: '15 Dec 2025',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200',
    imageAlt: 'Landed cost calculation import India customs duty GST',
    intro: 'Landed cost is the total cost of getting an imported product to your warehouse door in India — including product cost, freight, insurance, customs duty, IGST, port charges, CHA fees, and last-mile delivery. Many importers underestimate landed cost by 20–40%, causing margin erosion and pricing mistakes. This guide explains every component of landed cost with worked examples.',
    sections: [
      { heading: 'What is Landed Cost?', content: 'Landed cost is the complete cost of an imported product reaching your warehouse — not just the purchase price. It includes every cost incurred from the supplier\'s factory to your door.\n\nMost importers know the FOB or CIF price but miss several cost layers that add up to 30–50% on top of product cost.\n\nAccurate landed cost calculation is critical for:\n• Setting correct selling prices and maintaining margins\n• Comparing suppliers from different origins\n• Evaluating air freight vs sea freight economics\n• Assessing FTWZ duty deferment benefit vs traditional clearance' },
      { heading: 'Landed Cost Formula — All Components', content: 'Total Landed Cost = Product Cost (FOB)\n+ Ocean/Air Freight\n+ Marine Insurance (0.3–0.5% of CIF)\n= CIF Value\n+ Basic Customs Duty (% of CIF)\n+ Social Welfare Surcharge (10% of BCD)\n+ IGST (18% or applicable rate on CIF + BCD + SWS)\n+ Port Handling and THC\n+ CHA (Customs House Agent) Charges\n+ Internal Transport to Warehouse\n+ FTWZ or Warehouse Storage\n= Total Landed Cost' },
      { heading: 'Worked Example — Electronics Import', content: 'Product: Mobile phone components, 1,000 units\nFOB value: ₹50,00,000\nOcean freight: ₹1,50,000\nInsurance: ₹15,000\nCIF value: ₹51,65,000\n\nBasic Customs Duty (10%): ₹5,16,500\nSocial Welfare Surcharge (10% of BCD): ₹51,650\nIGST 18% on (CIF + BCD + SWS): ₹10,29,087\n\nPort THC and handling: ₹25,000\nCHA charges: ₹35,000\nTransport to warehouse: ₹20,000\n\nTotal Landed Cost: ₹68,42,237\nLanded cost per unit: ₹6,842\nLanded cost % over FOB: 36.8%' },
      { heading: 'Hidden Costs Most Importers Miss', content: '1. Demurrage and Detention: Port free days are typically 3–7 days. Beyond that, demurrage can be ₹3,000–8,000 per container per day. A 10-day delay costs ₹30,000–80,000 per container.\n\n2. Examination Charges: Customs may select your shipment for physical or scanning examination — adding ₹5,000–25,000 in charges and 2–5 days of delay.\n\n3. Bank Charges on LC: If using Letter of Credit, bank charges add 0.5–1.5% of invoice value.\n\n4. Fumigation and Compliance: Certain products (wood, food, agricultural goods) require fumigation, FSSAI testing, or BIS certification — adding ₹10,000–50,000+ per shipment.\n\n5. Insurance Claims Gap: Marine insurance rarely covers 100% of losses — factor in a self-insurance buffer of 0.2–0.5% for high-value goods.' },
      { heading: 'How FTWZ Reduces Your Effective Landed Cost', content: 'FTWZ reduces landed cost in two ways:\n\n1. Duty Deferment Cash Flow Value: By deferring ₹15–20 lakh of duty on a ₹1 crore shipment, you save the financing cost of that money — typically 10–14% per annum. On a 6-month deferral, that is ₹75,000–1,40,000 in saved financing costs.\n\n2. Demurrage Avoidance: Pre-arranging FTWZ storage allows fast container evacuation from port — eliminating demurrage costs entirely.\n\n3. Re-export Benefit: For goods partially re-exported, the duty avoided on re-exported quantities directly reduces total landed cost on your domestic inventory.\n\nUse Astromar\'s free Landed Cost Calculator at astromarfreezone.com/freight-intelligence to compute your exact landed cost with FTWZ vs without FTWZ comparison.' }
    ],
    keywords: ['landed cost calculation India', 'import cost India', 'customs duty calculation India', 'IGST import India', 'CIF value India', 'landed cost formula', 'import landed cost India', 'total cost of import India']
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      images: [{ url: article.image }],
      type: 'article',
    },
  }
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center">
        <img src={article.image} alt={article.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-3">{article.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl leading-tight mb-4">{article.title}</h1>
          <p className="text-white/70 text-sm">{article.date} &nbsp;·&nbsp; {article.readTime}</p>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-10">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-100">{article.category}</span>
        </nav>

        {/* Intro */}
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-12 border-l-4 border-orange-400 pl-5">{article.intro}</p>

        {/* Sections */}
        {article.sections.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
            <div className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">{section.content}</div>
          </div>
        ))}

        {/* Keywords */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Related Topics</p>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((kw, i) => (
              <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">{kw}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Need FTWZ Warehousing or Freight Support?</h3>
          <p className="text-blue-200 mb-6">Talk to our logistics experts — free consultation, no commitment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">Request a Consultation</Link>
            <Link href="/freight-intelligence" className="border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors">Try Free Calculators</Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Back to all articles</Link>
        </div>
      </section>
    </main>
  )
}
