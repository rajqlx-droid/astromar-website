"use client";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  
  ChevronRight,
  GitCompareArrows,
  History as HistoryIcon,
  Menu,
  X,
  Lightbulb,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { nextId } from "@/lib/freight/ids";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { HistoryPanel } from "@/components/freight/history-panel";
import { CbmCalculator } from "@/components/freight/cbm-calculator";
import { AirCalculator } from "@/components/freight/air-calculator";
import { LandedCalculator } from "@/components/freight/landed-calculator";
import { ExportCalculator } from "@/components/freight/export-calculator";
import { CompareCalculator } from "@/components/freight/compare-calculator";
import { RiskCalculator } from "@/components/freight/risk-calculator";
import { MobileResultBar } from "@/components/freight/mobile-result-bar";
import { MiniHistoryStrip } from "@/components/freight/mini-history-strip";
import { CompareDialog } from "@/components/freight/compare-dialog";
import { SplitCompareView } from "@/components/freight/split-compare-view";
import { CargoBannerScene } from "@/components/freight/cargo-banner-scene";
import { CALCULATORS, type CalcKey } from "@/lib/freight/types";
import {
  calcAir,
  calcCbm,
  calcCompare,
  calcExport,
  calcLanded,
  calcRisk,
  emptyAirItem,
  emptyCbmItem,
  emptyExportLine,
  emptyLandedLine,
  type AirItem,
  type CbmItem,
  type CompareInput,
  type ExportInput,
  type LandedInput,
  type RiskInput,
} from "@/lib/freight/calculators";

const BANNER_KEY = "astromar.freight.banner";
const CURRENCY_KEY = "astromar.freight.currency";

interface CurrencyPrefs {
  currency: string;
  baseCurrency: string;
  fxRate: number;
}

const DEFAULT_CURRENCY_PREFS: CurrencyPrefs = {
  currency: "INR",
  baseCurrency: "INR",
  fxRate: 0,
};

function readCurrencyPrefs(): CurrencyPrefs {
  if (typeof window === "undefined") return DEFAULT_CURRENCY_PREFS;
  try {
    const raw = localStorage.getItem(CURRENCY_KEY);
    if (!raw) return DEFAULT_CURRENCY_PREFS;
    const parsed = JSON.parse(raw) as Partial<CurrencyPrefs>;
    return {
      currency: parsed.currency ?? DEFAULT_CURRENCY_PREFS.currency,
      baseCurrency: parsed.baseCurrency ?? DEFAULT_CURRENCY_PREFS.baseCurrency,
      fxRate: typeof parsed.fxRate === "number" ? parsed.fxRate : DEFAULT_CURRENCY_PREFS.fxRate,
    };
  } catch {
    return DEFAULT_CURRENCY_PREFS;
  }
}

function FreightIntelligencePage() {
  const [active, setActive] = useState<CalcKey>("cbm");
  const [bannerOpen, setBannerOpen] = useState(true);
  const [historySheetOpen, setHistorySheetOpen] = useState(false);
  const [compareMode, setCompareMode] = useState<{ left: CalcKey; right: CalcKey } | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // ----- per-calculator state, lifted so values persist across tab switches -----
  const [cbmItems, setCbmItems] = useState<CbmItem[]>(() => [emptyCbmItem(0)]);
  const [airItems, setAirItems] = useState<AirItem[]>(() => [emptyAirItem(0)]);
  const [airDivisor, setAirDivisor] = useState(6000);
  const [landed, setLanded] = useState<LandedInput>(() => {
    const p = readCurrencyPrefs();
    return {
      lines: [emptyLandedLine(0)],
      freight: 0,
      insurance: 0,
      additional: 0,
      gstRate: 18,
      currency: p.currency,
      fxRate: p.fxRate,
      baseCurrency: p.baseCurrency,
    };
  });
  const [exp, setExp] = useState<ExportInput>(() => {
    const p = readCurrencyPrefs();
    return {
      lines: [emptyExportLine(0)],
      freight: 0,
      insurance: 0,
      additional: 0,
      currency: p.currency,
      fxRate: p.fxRate,
      baseCurrency: p.baseCurrency,
    };
  });
  const [compare, setCompare] = useState<CompareInput>({
    seaFreight: 0,
    seaDays: 30,
    airFreight: 0,
    airDays: 5,
    dailyRate: 0.05,
    productValue: 0,
    handling: 0,
  });
  const [risk, setRisk] = useState<RiskInput>({
    containerType: "40ft",
    daysAtPort: 7,
    dailyRate: 2500,
    goodsValue: 0,
    insurance: 0,
    port: "",
    cargoType: "General",
    freeDays: 5,
  });

  // Persist currency prefs whenever Landed or Export changes them.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefs: CurrencyPrefs = {
      currency: landed.currency,
      baseCurrency: landed.baseCurrency ?? "INR",
      fxRate: landed.fxRate ?? 0,
    };
    try {
      localStorage.setItem(CURRENCY_KEY, JSON.stringify(prefs));
    } catch {
      /* quota — ignore */
    }
  }, [landed.currency, landed.baseCurrency, landed.fxRate]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefs: CurrencyPrefs = {
      currency: exp.currency,
      baseCurrency: exp.baseCurrency ?? "INR",
      fxRate: exp.fxRate ?? 0,
    };
    try {
      localStorage.setItem(CURRENCY_KEY, JSON.stringify(prefs));
    } catch {
      /* quota — ignore */
    }
  }, [exp.currency, exp.baseCurrency, exp.fxRate]);

  // Cross-calc: copy Landed line items → Export with default margin.
  const duplicateLandedToExport = () => {
    const DEFAULT_MARGIN = 20;
    setExp((prev) => ({
      ...prev,
      currency: landed.currency,
      baseCurrency: landed.baseCurrency,
      fxRate: landed.fxRate,
      freight: landed.freight,
      insurance: landed.insurance,
      additional: landed.additional,
      lines: landed.lines.map((l) => ({
        id: nextId("el"),
        description: l.description,
        hsCode: l.hsCode,
        qty: l.qty,
        unitValue: l.unitValue,
        margin: DEFAULT_MARGIN,
      })),
    }));
    setActive("export");
    toast.success("Copied to Export Price", {
      description: `${landed.lines.length} line item(s) duplicated with ${DEFAULT_MARGIN}% default margin.`,
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem(BANNER_KEY);
    setBannerOpen(stored !== "0");
  }, []);

  // Dev-only debug check removed for Next.js compatibility

  // Track page scroll to add a subtle shadow under the sticky tab strip.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll active tab into view (covers click + keyboard nav).
  useEffect(() => {
    const idx = CALCULATORS.findIndex((c) => c.key === active);
    const btn = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[idx];
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);



  const dismissBanner = () => {
    setBannerOpen(false);
    localStorage.setItem(BANNER_KEY, "0");
  };
  const reopenBanner = () => {
    setBannerOpen(true);
    localStorage.removeItem(BANNER_KEY);
  };

  const meta = CALCULATORS.find((c) => c.key === active)!;
  const activeIdx = CALCULATORS.findIndex((c) => c.key === active);

  // Compute current result + inputs at the route level so the mobile bottom bar
  // can mirror the same data shown by ResultsCard inside each calculator.
  const { mobileResult, mobileInputs } = useMemo(() => {
    switch (active) {
      case "cbm":
        return {
          mobileResult: calcCbm(cbmItems),
          mobileInputs: cbmItems.flatMap((it, idx) => [
            { label: `Item ${idx + 1} L×W×H (cm)`, value: `${it.length} × ${it.width} × ${it.height}` },
            { label: `Item ${idx + 1} Qty / Weight`, value: `${it.qty} pcs / ${it.weight} kg` },
          ]),
        };
      case "air":
        return {
          mobileResult: calcAir(airItems, airDivisor),
          mobileInputs: airItems.flatMap((it, idx) => [
            { label: `Item ${idx + 1} L×W×H (cm)`, value: `${it.length} × ${it.width} × ${it.height}` },
            { label: `Item ${idx + 1} Qty / Actual Weight`, value: `${it.qty} pcs / ${it.weight} kg` },
          ]),
        };
      case "landed":
        return { mobileResult: calcLanded(landed), mobileInputs: undefined };
      case "export":
        return { mobileResult: calcExport(exp), mobileInputs: undefined };
      case "compare":
        return { mobileResult: calcCompare(compare), mobileInputs: undefined };
      case "risk":
        return { mobileResult: calcRisk(risk), mobileInputs: undefined };
    }
  }, [active, cbmItems, airItems, airDivisor, landed, exp, compare, risk]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + CALCULATORS.length) % CALCULATORS.length;
      setActive(CALCULATORS[next].key);
      const btn = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next];
      btn?.focus();
    }
  };

  /**
   * Renders the calculator UI for a given key. Reused by the single-tool view
   * and the split-compare view (each pane calls this with its own key).
   */
  const renderCalculator = (key: CalcKey) => {
    switch (key) {
      case "cbm":
        return <CbmCalculator items={cbmItems} setItems={setCbmItems} />;
      case "air":
        return (
          <AirCalculator
            items={airItems}
            setItems={setAirItems}
            divisor={airDivisor}
            setDivisor={setAirDivisor}
          />
        );
      case "landed":
        return (
          <LandedCalculator
            state={landed}
            setState={setLanded}
            onDuplicateToExport={duplicateLandedToExport}
          />
        );
      case "export":
        return <ExportCalculator state={exp} setState={setExp} />;
      case "compare":
        return <CompareCalculator state={compare} setState={setCompare} />;
      case "risk":
        return <RiskCalculator state={risk} setState={setRisk} />;
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
{/* SKIP LINKS — visible only on keyboard focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-brand-navy focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <a
          href="#container-load-viewer"
          className="sr-only focus:not-sr-only focus:fixed focus:left-44 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-brand-navy focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Skip to 3D container viewer
        </a>
{/* TAB STRIP */}
        <div
          className={
            "no-print sticky top-[60px] z-40 bg-white bg-background pt-3 pb-1 border-b border-gray-100 shadow-sm backdrop-blur-md transition-shadow duration-200 " +
            (scrolled ? "shadow-[0_4px_12px_-4px_rgba(15,23,42,0.18)]" : "")
          }
        >
          <div className="relative">
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Calculator selector"
              className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-12 lg:px-16"
              style={{ scrollSnapType: "x mandatory" }}
            >
            {CALCULATORS.map((c, idx) => {
              const isActive = c.key === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.key)}
                  onKeyDown={(e) => onTabKey(e, idx)}
                  className={
                    "min-w-[120px] shrink-0 rounded-lg border px-3 py-2 text-left transition-all md:min-w-[140px] " +
                    (isActive
                      ? "text-white shadow-sm"
                      : "border-brand-navy/25 bg-background text-brand-navy hover:bg-brand-navy-soft hover:border-brand-navy/50")
                  }
                  style={
                    isActive
                      ? {
                          background: "#0f1f3d",
                          borderColor: "#081529",
                          scrollSnapAlign: "center",
                        }
                      : { scrollSnapAlign: "center" }
                  }
                >
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold leading-tight">
                    <span aria-hidden>{c.emoji}</span>
                    <span>{c.label}</span>
                  </div>
                  <div className={"mt-0.5 text-[10px] " + (isActive ? "text-white/80" : "text-muted-foreground")}>
                    {c.sub}
                  </div>
                </button>
              );
            })}
            </div>
            {/* Right-edge fade gradient — hints horizontal scroll on mobile */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-12 md:hidden"
              style={{
                background:
                  "linear-gradient(to left, color-mix(in oklab, #EFF6FF 95%, transparent), transparent)",
              }}
            />
          </div>
          {/* Active-tab progress indicator (hidden on lg where layout is calmer) */}
          <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16" aria-hidden>
            <div className="h-0.5 w-full overflow-hidden bg-brand-navy/10">
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${100 / CALCULATORS.length}%`,
                  marginLeft: `${(100 / CALCULATORS.length) * activeIdx}%`,
                  background: "#F97316",
                }}
              />
            </div>
          </div>
        </div>

        {/* BREADCRUMB */}
        <section className="mx-auto max-w-7xl px-6 pb-1 pt-2 md:px-12 lg:px-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-brand-orange">Home</Link>
            <ChevronRight className="size-3" />
            <span>Tools</span>
            <ChevronRight className="size-3" />
            <span className="font-semibold text-brand-navy">
              {compareMode
                ? `Compare: ${CALCULATORS.find((c) => c.key === compareMode.left)?.label} vs ${CALCULATORS.find((c) => c.key === compareMode.right)?.label}`
                : meta.label}
            </span>
          </nav>
        </section>

        {/* CALCULATOR — single tool OR split compare view */}
        <section
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-7xl px-6 pb-10 outline-none md:px-12 lg:px-16"
        >
          {compareMode ? (
            <SplitCompareView
              left={compareMode.left}
              right={compareMode.right}
              renderCalc={renderCalculator}
              onSwap={() =>
                setCompareMode({ left: compareMode.right, right: compareMode.left })
              }
              onExit={() => setCompareMode(null)}
            />
          ) : (
            <>
              {/* Heading row: title on left, promo banner in middle (CBM only), Compare/History stacked on right. */}
              <div className="mb-8 flex flex-row items-stretch gap-3 sm:mb-10 sm:gap-5">
                {/* Title block */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    aria-hidden
                    className="h-10 w-1.5 shrink-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, #0f1f3d, #F97316)",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-lg font-bold text-brand-navy md:text-xl">
                        {active === "cbm" ? (
                          <><span className="text-blue-600">CBM Calculator</span> — Load Optimizer</>
                        ) : (
                          <span className="text-blue-600">{meta.label} Calculator</span>
                        )}
                      </h2>
                    </div>
                    <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground md:text-sm">
                      <span className="truncate">{meta.sub}</span>
                      {!bannerOpen && (
                        <>
                          <span aria-hidden className="text-muted-foreground/50">/</span>
                          <button
                            onClick={reopenBanner}
                            className="no-print inline-flex shrink-0 items-center gap-1 rounded-md border border-brand-navy/20 bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground hover:border-brand-orange hover:text-brand-orange"
                            aria-label="Show pro tip"
                          >
                            <Lightbulb className="size-3" />
                            <span>Tip</span>
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Optimization Plan promo banner — modern solid bg + dot-pulse + shine-sweep */}
                <div className="no-print group/ad relative mx-2 hidden flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#1B3A6B] px-5 py-3.5 text-white shadow-sm md:flex md:items-center md:gap-5 lg:mx-4">
                    {/* Dot pattern */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                        animation: "dot-pulse 3s ease-in-out infinite",
                      }}
                    />
                    {/* Shine sweep */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-full w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                      style={{ animation: "shine-sweep 4s linear infinite" }}
                    />
                    <div className="relative z-10 flex min-w-0 shrink items-center gap-3">
                      <div
                        className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-transform duration-500 hover:scale-110"
                        style={{
                          background: "linear-gradient(135deg, rgba(249,115,22,0.30), rgba(249,115,22,0.15), transparent)",
                          border: "1px solid rgba(249,115,22,0.50)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent [animation:shimmer-sweep_3.5s_ease-in-out_infinite] motion-reduce:hidden"
                        />
                        <Sparkles
                          className="relative size-4"
                          style={{ color: "#F97316", filter: "drop-shadow(0 0 6px rgba(249,115,22,0.8))" }}
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="truncate text-sm font-bold leading-tight">Get your container optimization plan</p>
                        <p className="truncate text-xs text-white/70">Recommend the best container, render a 3D loading plan</p>
                      </div>
                    </div>
                    {/* Live 3D cargo scene — fills the remaining lane to the right of the text */}
                    <div className="relative z-10 ml-2 hidden h-12 min-w-0 flex-1 md:block">
                      <CargoBannerScene />
                    </div>
                  </div>

                {/* Action cluster: History only */}
                <div className="ml-auto flex shrink-0 items-center rounded-lg border border-brand-navy/30 bg-background p-1.5 shadow-sm">
                  <Sheet open={historySheetOpen} onOpenChange={setHistorySheetOpen}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-label="View history"
                            className="h-8 justify-start gap-2 rounded-md px-2.5 text-xs font-medium text-brand-navy hover:bg-brand-navy-soft"
                          >
                            <HistoryIcon className="size-3.5" />
                            <span className="hidden sm:inline">History</span>
                          </Button>
                        </SheetTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="sm:hidden">View history</TooltipContent>
                    </Tooltip>
                    <SheetContent side="right" className="w-full p-0 sm:max-w-sm">
                      <SheetTitle className="sr-only">Calculation History</SheetTitle>
                      <HistoryPanel />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>


              {/* Mobile-only optimization promo (full width, since desktop version is inline above) */}
              <div
                  className="no-print mb-3 overflow-hidden rounded-xl border border-brand-navy/10 bg-gradient-to-r from-brand-navy to-[#1a2f5a] px-3 py-2.5 text-white shadow-sm md:hidden"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 shrink-0 text-brand-orange" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold">Get your container optimization plan</p>
                      <p className="truncate text-[11px] text-white/70">Recommend the best container, render a 3D loading plan</p>
                    </div>
                    {active === "cbm" && (
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("cbm-optimize-cta")
                            ?.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-brand-orange px-2.5 py-1.5 text-[11px] font-semibold text-white"
                      >
                        View
                        <ArrowRight className="size-3" />
                      </button>
                    )}
                  </div>
                </div>

              {/* Pro tip — full-width row below heading, no overlap with controls */}
              {bannerOpen && (
                <div
                  className="no-print mb-3 flex items-start gap-2 rounded-lg border-l-4 bg-brand-navy-soft p-2.5 text-xs sm:text-sm"
                  style={{ borderColor: "#F97316" }}
                >
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand-orange" />
                  <p className="min-w-0 flex-1 text-foreground/90">
                    <span className="font-semibold text-brand-navy">Pro tip · </span>
                    {meta.tip}
                  </p>
                  <button
                    onClick={dismissBanner}
                    aria-label="Dismiss tip"
                    className="shrink-0 rounded p-1 text-muted-foreground hover:bg-background hover:text-brand-navy"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              )}

              {renderCalculator(active)}
            </>
          )}
        </section>

        {/* Mobile-only sticky bottom result bar (mirrors active calculator's result) */}
        <MobileResultBar result={mobileResult ?? null} inputsTable={mobileInputs} />

        {/* CTA banner removed — replaced by CommercialPoster above the calculator */}

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-6 pb-12 md:px-12 lg:px-16">
          <h2 className="text-xl font-bold text-brand-navy md:text-2xl">Frequently asked questions</h2>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_320px]">
            <Accordion type="single" collapsible>
              {[
                { q: "How is CBM calculated?", a: "CBM = Length × Width × Height ÷ 1,000,000 (cm to m³). For multiple cartons, multiply by quantity." },
                { q: "Why is volumetric weight ÷5000 for sea and ÷6000 for air?", a: "Sea LCL freight uses a 1:1000 ratio between m³ and kg (so chargeable kg = CBM × 200). Airlines apply the IATA 6000 divisor for low-density cargo." },
                { q: "What duty rate should I use for landed cost?", a: "Use the BCD (Basic Customs Duty) rate from your product's HSN code. Add IGST on (CIF + Duty). Default 10% / 18% are common, but always verify your HSN." },
                { q: "How is the air vs sea comparison fair?", a: "We add the working-capital cost of having goods in transit (product value × daily rate × days) to each freight cost, so you compare the true cash impact." },
                { q: "What counts as a free day at the port?", a: "Most Indian ports give 4–5 free days from container landing. After that, demurrage stacks daily and may double after a week." },
                { q: "Are my saved calculations stored on a server?", a: "No. Saves and history live entirely in your browser's localStorage. Clearing your browser data deletes them." },
              ].map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-brand-navy py-4">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <aside className="self-start rounded-2xl border border-brand-navy/10 bg-brand-navy-soft p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                  <BookOpen className="size-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">Quick reference</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-brand-navy">
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">Sea LCL divisor</span><span className="font-semibold">÷1000</span></li>
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">Air IATA divisor</span><span className="font-semibold">÷6000</span></li>
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">20' GP usable</span><span className="font-semibold">~28 CBM</span></li>
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">40' GP usable</span><span className="font-semibold">~58 CBM</span></li>
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">40' HC usable</span><span className="font-semibold">~68 CBM</span></li>
                <li className="flex justify-between gap-3"><span className="text-muted-foreground">Free days (India)</span><span className="font-semibold">4–5</span></li>
              </ul>
              <p className="mt-4 border-t border-brand-navy/10 pt-3 text-xs text-muted-foreground">
                Always verify duty/HSN with your CHA.
              </p>
            </aside>
          </div>
        </section>
</div>
    </TooltipProvider>
  );
}

export default FreightIntelligencePage;
