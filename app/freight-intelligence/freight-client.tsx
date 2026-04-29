"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plane, DollarSign, TrendingUp, BarChart2, AlertTriangle, Plus, Trash2, Download, Ship, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { downloadPDF } from "@/lib/pdfExport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Shared ────────────────────────────────────────────────────────────────
const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const fmtINR = (n: number) => "Rs." + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// ─── Tab 1: CBM Calculator ──────────────────────────────────────────────────
interface CargoItem { id: number; length: string; width: string; height: string; qty: string; weight: string; }
type Unit = "cm" | "in" | "m";
const unitFactors: Record<Unit, number> = { cm: 1e6, in: 61023.7, m: 1 };
const containers = [
  { name: "20ft Standard", volume: 25 },
  { name: "40ft Standard", volume: 55 },
  { name: "40ft High Cube", volume: 67 },
];
let nextId = 2;

const CbmCalculator = () => {
  const [unit, setUnit] = useState<Unit>("cm");
  const [items, setItems] = useState<CargoItem[]>([
    { id: 1, length: "", width: "", height: "", qty: "1", weight: "" },
  ]);

  const updateItem = (id: number, field: keyof CargoItem, val: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  const addItem = () => setItems((prev) => [...prev, { id: nextId++, length: "", width: "", height: "", qty: "1", weight: "" }]);
  const removeItem = (id: number) => { if (items.length > 1) setItems((prev) => prev.filter((i) => i.id !== id)); };

  const factor = unitFactors[unit];
  const totalVolume = items.reduce((sum, i) => {
    const l = parseFloat(i.length) || 0, w = parseFloat(i.width) || 0, h = parseFloat(i.height) || 0, q = parseFloat(i.qty) || 0;
    return sum + (l * w * h * q) / factor;
  }, 0);
  const totalWeight = items.reduce((sum, i) => sum + (parseFloat(i.weight) || 0) * (parseFloat(i.qty) || 0), 0);
  const density = totalVolume > 0 ? totalWeight / totalVolume : 0;

  const exportPDF = () => {
    const PAGE_SIZE = 10;
    const pages = Math.ceil(items.length / PAGE_SIZE);
    const sections: { title: string; rows: { label: string; value: string; bold?: boolean }[] }[] = [];
    for (let p = 0; p < pages; p++) {
      const pageItems = items.slice(p * PAGE_SIZE, (p + 1) * PAGE_SIZE);
      sections.push({
        title: p === 0 ? "Cargo Items" : `Cargo Items (continued — page ${p + 1})`,
        rows: pageItems.map((item, idx) => ({
          label: `Item #${p * PAGE_SIZE + idx + 1}: ${item.length || 0}x${item.width || 0}x${item.height || 0} ${unit} x ${item.qty || 0}`,
          value: `${item.weight || 0} kg`,
        })),
      });
    }
    sections.push(
      { title: "Volume & Weight", rows: [
        { label: "Total Volume", value: `${totalVolume.toFixed(4)} m3`, bold: true },
        { label: "Total Weight", value: `${totalWeight.toFixed(2)} kg` },
        { label: "Cargo Density", value: `${density.toFixed(2)} kg/m3` },
      ]},
      { title: "Container Fit", rows: containers.map((c) => {
        const pct = c.volume > 0 ? Math.min((totalVolume / c.volume) * 100, 100) : 0;
        return { label: `${c.name} (${pct.toFixed(1)}% utilized)`, value: `${Math.max(c.volume - totalVolume, 0).toFixed(2)} m3 remaining` };
      })},
    );
    downloadPDF({
      reportTitle: "CBM Calculator Report",
      subtitle: `Unit: ${unit} | ${items.length} item(s)`,
      sections,
    }, "cbm-calculator-report.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Cargo Dimensions</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Unit:</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="m">m</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-muted-foreground">Item #{idx + 1}</span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {([["length", `Length (${unit})`], ["width", `Width (${unit})`], ["height", `Height (${unit})`], ["qty", "Qty"], ["weight", "Weight (kg)"]] as const).map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
                    <input type="number" value={item[field]} onChange={(e) => updateItem(item.id, field, e.target.value)} min={0} className={inputClass} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Results</h3>
          <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>
        <div className="space-y-3">
          {([
            ["Total CBM", `${totalVolume.toFixed(4)} m3`, true],
            ["Total Weight", `${totalWeight.toFixed(2)} kg`, false],
            ["Cargo Density", `${density.toFixed(2)} kg/m3`, false],
          ] as [string, string, boolean][]).map(([label, value, bold]) => (
            <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
              <span className={`text-sm ${bold ? "font-bold text-primary" : "font-semibold text-foreground"}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-6">Container Fit — 20ft / 40ft / 40HC</h3>
        <div className="space-y-4">
          {containers.map((c) => {
            const pct = c.volume > 0 ? Math.min((totalVolume / c.volume) * 100, 100) : 0;
            const remaining = Math.max(c.volume - totalVolume, 0);
            const fits = totalVolume > 0 && totalVolume <= c.volume;
            return (
              <div key={c.name} className="rounded-lg border border-border p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">{c.name}</span>
                  {fits && pct <= 100 && (
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">Fits</span>
                  )}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{pct.toFixed(1)}% utilized</span>
                  <span>{remaining.toFixed(2)} m3 remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Tab 2: Air Volume Weight ───────────────────────────────────────────────
interface AirItem { id: number; length: string; width: string; height: string; qty: string; actualWeight: string; }
let airNextId = 2;

const AirVolumeWeight = () => {
  const [items, setItems] = useState<AirItem[]>([
    { id: 1, length: "", width: "", height: "", qty: "1", actualWeight: "" },
  ]);

  const updateItem = (id: number, field: keyof AirItem, val: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  const addItem = () => setItems((prev) => [...prev, { id: airNextId++, length: "", width: "", height: "", qty: "1", actualWeight: "" }]);
  const removeItem = (id: number) => { if (items.length > 1) setItems((prev) => prev.filter((i) => i.id !== id)); };

  const computed = items.map((item) => {
    const l = parseFloat(item.length) || 0;
    const w = parseFloat(item.width) || 0;
    const h = parseFloat(item.height) || 0;
    const q = parseFloat(item.qty) || 1;
    const aw = parseFloat(item.actualWeight) || 0;
    const volWeight = (l * w * h * q) / 6000;
    const chargeable = Math.max(aw, volWeight);
    return { l, w, h, q, aw, volWeight, chargeable, isVolumetric: volWeight > aw };
  });

  const totalActual = computed.reduce((s, c) => s + c.aw, 0);
  const totalVolumetric = computed.reduce((s, c) => s + c.volWeight, 0);
  const totalChargeable = computed.reduce((s, c) => s + c.chargeable, 0);

  const exportPDF = () => {
    const PAGE_SIZE = 10;
    const pages = Math.ceil(items.length / PAGE_SIZE);
    const sections: { title: string; rows: { label: string; value: string; bold?: boolean }[] }[] = [];
    for (let p = 0; p < pages; p++) {
      const pageItems = items.slice(p * PAGE_SIZE, (p + 1) * PAGE_SIZE);
      sections.push({
        title: p === 0 ? "Item Breakdown" : `Item Breakdown (continued — page ${p + 1})`,
        rows: pageItems.flatMap((item, idx) => {
          const c = computed[p * PAGE_SIZE + idx];
          return [
            { label: `Item #${p * PAGE_SIZE + idx + 1} — ${item.length || 0} x ${item.width || 0} x ${item.height || 0} cm, Qty ${item.qty || 1}`, value: "" },
            { label: "  Actual Weight", value: `${c.aw.toFixed(2)} kg` },
            { label: "  Volumetric Weight", value: `${c.volWeight.toFixed(2)} kg` },
            { label: "  Chargeable Weight", value: `${c.chargeable.toFixed(2)} kg${c.isVolumetric ? " (vol)" : " (actual)"}`, bold: true },
          ];
        }),
      });
    }
    sections.push({
      title: "Summary",
      rows: [
        { label: "Total Actual Weight", value: `${totalActual.toFixed(2)} kg` },
        { label: "Total Volumetric Weight", value: `${totalVolumetric.toFixed(2)} kg` },
        { label: "Total Chargeable Weight", value: `${totalChargeable.toFixed(2)} kg`, bold: true },
      ],
    });
    downloadPDF({
      reportTitle: "Air Volumetric Weight Report",
      subtitle: `Astromar Logistics Pvt Ltd | ${items.length} item(s)`,
      sections,
    }, "air-volumetric-weight-report.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Plane className="w-5 h-5 text-primary" /> Parcel Dimensions
          </h3>
          <p className="text-sm text-muted-foreground">Dimensions in cm</p>
        </div>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-muted-foreground">Item #{idx + 1}</span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {([["length", "Length (cm)"], ["width", "Width (cm)"], ["height", "Height (cm)"], ["qty", "Qty"], ["actualWeight", "Actual Wt (kg)"]] as const).map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
                    <input type="number" value={item[field]} onChange={(e) => updateItem(item.id, field, e.target.value)} min={0} className={inputClass} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Results</h3>
          <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>

        {items.length > 1 && (
          <div className="mb-6 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Per-Item Breakdown</p>
            {computed.map((c, idx) => (
              <div key={idx} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">Item #{idx + 1}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.isVolumetric ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {c.isVolumetric ? "Volumetric" : "Actual"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <span>Actual: <strong className="text-foreground">{c.aw.toFixed(2)} kg</strong></span>
                  <span>Volumetric: <strong className="text-foreground">{c.volWeight.toFixed(2)} kg</strong></span>
                  <span>Chargeable: <strong className="text-primary">{c.chargeable.toFixed(2)} kg</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 mb-6">
          {([
            ["Total Actual Weight", `${totalActual.toFixed(2)} kg`, false],
            ["Total Volumetric Weight", `${totalVolumetric.toFixed(2)} kg`, false],
          ] as [string, string, boolean][]).map(([label, value, bold]) => (
            <div key={label} className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className={`text-sm ${bold ? "font-bold text-primary" : "font-semibold text-foreground"}`}>{value}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-primary text-primary-foreground p-6 text-center">
          <p className="text-sm font-semibold opacity-80 mb-1">Total Chargeable Weight</p>
          <p className="text-4xl font-extrabold">{totalChargeable.toFixed(2)} kg</p>
          <p className="text-sm opacity-70 mt-2">
            {totalChargeable === 0 ? "Enter dimensions above" : totalVolumetric > totalActual ? "Volumetric weight is higher" : "Actual weight is higher"}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 mt-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Airlines charge based on chargeable weight — whichever is higher, actual or volumetric. Volumetric Weight = (L x W x H x Qty) / 6000.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Tab 3: Landed Cost ─────────────────────────────────────────────────────
const LandedCost = () => {
  const [productCost, setProductCost] = useState("100000");
  const [freight, setFreight] = useState("15000");
  const [insurance, setInsurance] = useState("2000");
  const [customsDuty, setCustomsDuty] = useState("15");
  const [gst, setGst] = useState("18");
  const [handling, setHandling] = useState("5000");
  const [sellingPrice, setSellingPrice] = useState("200000");

  const pc = parseFloat(productCost) || 0;
  const fr = parseFloat(freight) || 0;
  const ins = parseFloat(insurance) || 0;
  const cd = parseFloat(customsDuty) || 0;
  const g = parseFloat(gst) || 0;
  const hc = parseFloat(handling) || 0;
  const sp = parseFloat(sellingPrice) || 0;

  const cifValue = pc + fr + ins;
  const dutyAmount = cifValue * (cd / 100);
  const assessableValue = cifValue + dutyAmount;
  const gstAmount = assessableValue * (g / 100);
  const landedCost = assessableValue + gstAmount + hc;
  const profit = sp - landedCost;
  const margin = sp > 0 ? (profit / sp) * 100 : 0;
  const markup = landedCost > 0 ? (profit / landedCost) * 100 : 0;

  const exportPDF = () => downloadPDF({
    reportTitle: "Landed Cost Report",
    subtitle: `CIF Value: ${fmtINR(cifValue)} | Selling Price: ${fmtINR(sp)}`,
    sections: [
      { title: "Cost Components", rows: [
        { label: "Product Cost", value: fmtINR(pc) },
        { label: "Freight", value: fmtINR(fr) },
        { label: "Insurance", value: fmtINR(ins) },
        { label: "CIF Value", value: fmtINR(cifValue), bold: true },
        { label: `Customs Duty (${cd}%)`, value: fmtINR(dutyAmount) },
        { label: "Assessable Value", value: fmtINR(assessableValue) },
        { label: `GST (${g}%)`, value: fmtINR(gstAmount) },
        { label: "Handling & Other", value: fmtINR(hc) },
        { label: "Total Landed Cost", value: fmtINR(landedCost), bold: true },
      ]},
      { title: "Profit Analysis", rows: [
        { label: "Selling Price", value: fmtINR(sp) },
        { label: "Gross Profit", value: fmtINR(profit), bold: true },
        { label: "Profit Margin", value: `${margin.toFixed(1)}%` },
        { label: "Markup", value: `${markup.toFixed(1)}%` },
      ]},
    ],
  }, "landed-cost-report.pdf");

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" /> Cost Components
        </h3>
        {([
          ["Product Cost (INR)", productCost, setProductCost],
          ["Freight Cost (INR)", freight, setFreight],
          ["Insurance (INR)", insurance, setInsurance],
          ["Customs Duty (%)", customsDuty, setCustomsDuty],
          ["GST (%)", gst, setGst],
          ["Handling & Other (INR)", handling, setHandling],
          ["Selling Price (INR)", sellingPrice, setSellingPrice],
        ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
          <div key={label}>
            <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
            <input type="number" value={val} onChange={(e) => setter(e.target.value)} min={0} className={inputClass} />
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex justify-end">
          <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Landed Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              ["Product Cost", fmtINR(pc)],
              ["Freight", fmtINR(fr)],
              ["Insurance", fmtINR(ins)],
              ["CIF Value", fmtINR(cifValue)],
              [`Customs Duty (${cd}%)`, fmtINR(dutyAmount)],
              ["Assessable Value", fmtINR(assessableValue)],
              [`GST (${g}%)`, fmtINR(gstAmount)],
              ["Handling & Other", fmtINR(hc)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="font-bold text-foreground">Total Landed Cost</span>
              <span className="font-extrabold text-primary text-lg">{fmtINR(landedCost)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Profit Analysis</h4>
          <div className="space-y-3">
            {[
              ["Selling Price", fmtINR(sp)],
              ["Landed Cost", fmtINR(landedCost)],
              ["Gross Profit", fmtINR(profit)],
              ["Profit Margin", `${margin.toFixed(1)}%`],
              ["Markup", `${markup.toFixed(1)}%`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-xl p-6 text-center ${profit >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Net Profit / Loss</p>
          <p className={`text-3xl font-extrabold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>{fmtINR(Math.abs(profit))}</p>
          <p className="text-sm text-muted-foreground mt-1">{profit >= 0 ? `${margin.toFixed(1)}% margin` : "Loss - review pricing"}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Tab 4: Export Price Calculator ────────────────────────────────────────
const ExportPrice = () => {
  const [productCost, setProductCost] = useState("50000");
  const [freightInsurance, setFreightInsurance] = useState("8000");
  const [packaging, setPackaging] = useState("2000");
  const [commission, setCommission] = useState("1500");
  const [bankCharges, setBankCharges] = useState("500");
  const [margin, setMargin] = useState("20");

  const pc = parseFloat(productCost) || 0;
  const fi = parseFloat(freightInsurance) || 0;
  const pk = parseFloat(packaging) || 0;
  const cm = parseFloat(commission) || 0;
  const bc = parseFloat(bankCharges) || 0;
  const mg = parseFloat(margin) || 0;

  const totalCost = pc + fi + pk + cm + bc;
  const minExportPrice = mg < 100 ? totalCost / (1 - mg / 100) : 0;
  const breakEvenPrice = totalCost;

  const exportPDF = () => downloadPDF({
    reportTitle: "Export Price Calculator Report",
    subtitle: `Total Cost: ${fmtINR(totalCost)} | Margin: ${mg}%`,
    sections: [
      { title: "Cost Components", rows: [
        { label: "Product Cost", value: fmtINR(pc) },
        { label: "Freight & Insurance", value: fmtINR(fi) },
        { label: "Packaging & Labeling", value: fmtINR(pk) },
        { label: "Agent / CHA Commission", value: fmtINR(cm) },
        { label: "Bank Charges", value: fmtINR(bc) },
        { label: "Total Export Cost", value: fmtINR(totalCost), bold: true },
      ]},
      { title: "Pricing Summary", rows: [
        { label: "Break-even Price (0% margin)", value: fmtINR(breakEvenPrice) },
        { label: `Minimum Export Price (${mg}% margin)`, value: fmtINR(minExportPrice), bold: true },
        { label: "Recommended Selling Price", value: fmtINR(minExportPrice), bold: true },
      ]},
    ],
  }, "export-price-report.pdf");

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Export Cost Components
        </h3>
        {([
          ["Product Cost (INR)", productCost, setProductCost],
          ["Freight & Insurance (INR)", freightInsurance, setFreightInsurance],
          ["Packaging & Labeling (INR)", packaging, setPackaging],
          ["Agent / CHA Commission (INR)", commission, setCommission],
          ["Bank Charges (INR)", bankCharges, setBankCharges],
          ["Profit Margin (%)", margin, setMargin],
        ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
          <div key={label}>
            <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
            <input type="number" value={val} onChange={(e) => setter(e.target.value)} min={0} className={inputClass} />
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex justify-end">
          <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              ["Product Cost", fmtINR(pc)],
              ["Freight & Insurance", fmtINR(fi)],
              ["Packaging & Labeling", fmtINR(pk)],
              ["Agent / CHA Commission", fmtINR(cm)],
              ["Bank Charges", fmtINR(bc)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="font-bold text-foreground">Total Export Cost</span>
              <span className="font-extrabold text-primary text-lg">{fmtINR(totalCost)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-foreground">Pricing Summary</h4>
          <div className="rounded-lg bg-muted/50 p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Break-even Price</p>
              <p className="text-sm text-muted-foreground">0% margin</p>
            </div>
            <p className="text-xl font-bold text-foreground">{fmtINR(breakEvenPrice)}</p>
          </div>
          <div className="rounded-lg bg-primary p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mb-0.5">Recommended Selling Price</p>
              <p className="text-sm text-primary-foreground/70">{mg}% margin</p>
            </div>
            <p className="text-2xl font-extrabold text-primary-foreground">{fmtINR(minExportPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tab 5: Freight Compare ─────────────────────────────────────────────────
const FreightCompare = () => {
  const [weight, setWeight] = useState("1000");
  const [seaRate, setSeaRate] = useState("50");
  const [airRate, setAirRate] = useState("3.5");
  const [seaTransit, setSeaTransit] = useState("30");
  const [airTransit, setAirTransit] = useState("3");
  const [cargoValue, setCargoValue] = useState("500000");

  const w = parseFloat(weight) || 0;
  const cv = parseFloat(cargoValue) || 0;
  const sr = parseFloat(seaRate) || 0;
  const ar = parseFloat(airRate) || 0;
  const st = parseFloat(seaTransit) || 0;
  const at = parseFloat(airTransit) || 0;

  const seaCost = w * sr;
  const airCost = w * ar;
  const costDiff = airCost - seaCost;
  const timeSaved = st - at;
  const inventoryCostPerDay = cv * 0.0005;
  const inventorySaved = inventoryCostPerDay * timeSaved;
  const netBenefit = inventorySaved - costDiff;
  const breakEvenDays = costDiff > 0 ? costDiff / inventoryCostPerDay : 0;

  const exportPDF = () => downloadPDF({
    reportTitle: "Freight Compare Report - Air vs Sea",
    subtitle: `Cargo Weight: ${w} kg | Cargo Value: ${fmtINR(cv)}`,
    sections: [
      { title: "Shipment Parameters", rows: [
        { label: "Cargo Weight", value: `${w} kg` },
        { label: "Cargo Value", value: fmtINR(cv) },
        { label: "Sea Freight Rate", value: `${fmtINR(sr)}/kg` },
        { label: "Air Freight Rate", value: `${fmtINR(ar)}/kg` },
        { label: "Sea Transit Time", value: `${st} days` },
        { label: "Air Transit Time", value: `${at} days` },
      ]},
      { title: "Cost Comparison", rows: [
        { label: "Sea Freight Cost", value: fmtINR(seaCost), bold: true },
        { label: "Air Freight Cost", value: fmtINR(airCost), bold: true },
        { label: "Cost Difference (Air - Sea)", value: fmtINR(costDiff) },
      ]},
      { title: "Break-even Analysis", rows: [
        { label: "Time Saved via Air", value: `${timeSaved} days` },
        { label: "Inventory Cost / Day", value: fmtINR(inventoryCostPerDay) },
        { label: "Inventory Savings (Air)", value: fmtINR(inventorySaved) },
        { label: "Break-even Point", value: `${breakEvenDays.toFixed(1)} days` },
        { label: "Net Benefit of Air Freight", value: fmtINR(Math.abs(netBenefit)), bold: true },
      ]},
    ],
  }, "freight-compare-report.pdf");

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> Shipment Parameters
          </h3>
          {([
            ["Cargo Weight (kg)", weight, setWeight],
            ["Cargo Value (INR)", cargoValue, setCargoValue],
            ["Sea Freight Rate (INR/kg)", seaRate, setSeaRate],
            ["Air Freight Rate (INR/kg)", airRate, setAirRate],
            ["Sea Transit Time (days)", seaTransit, setSeaTransit],
            ["Air Transit Time (days)", airTransit, setAirTransit],
          ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
              <input type="number" value={val} onChange={(e) => setter(e.target.value)} min={0} className={inputClass} />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
              <Download size={16} /> Download PDF
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sea Freight</p>
              <p className="text-2xl font-extrabold text-foreground">{fmtINR(seaCost)}</p>
              <p className="text-sm text-muted-foreground mt-1">{st} days transit</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Air Freight</p>
              <p className="text-2xl font-extrabold text-foreground">{fmtINR(airCost)}</p>
              <p className="text-sm text-muted-foreground mt-1">{at} days transit</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-4">Break-even Analysis</h4>
            <div className="space-y-3">
              {[
                ["Cost Difference (Air - Sea)", fmtINR(costDiff)],
                ["Time Saved via Air", `${timeSaved} days`],
                ["Inventory Cost / Day", fmtINR(inventoryCostPerDay)],
                ["Inventory Savings (Air)", fmtINR(inventorySaved)],
                ["Break-even Point", `${breakEvenDays.toFixed(1)} days`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`rounded-xl p-6 text-center ${netBenefit >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Net Benefit of Air Freight</p>
            <p className={`text-3xl font-extrabold ${netBenefit >= 0 ? "text-green-600" : "text-red-600"}`}>{fmtINR(Math.abs(netBenefit))}</p>
            <p className="text-sm text-muted-foreground mt-1">{netBenefit >= 0 ? "Air freight is more cost-effective" : "Sea freight is more cost-effective"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tab 6: Risk & Demurrage ────────────────────────────────────────────────
const RiskDemurrage = () => {
  const [containerCount, setContainerCount] = useState("1");
  const [freeTime, setFreeTime] = useState("7");
  const [actualDays, setActualDays] = useState("15");
  const [demurrageRate, setDemurrageRate] = useState("5000");
  const [detentionRate, setDetentionRate] = useState("3000");
  const [cargoValue, setCargoValue] = useState("1000000");
  const [interestRate, setInterestRate] = useState("12");

  const cnt = parseFloat(containerCount) || 0;
  const free = parseFloat(freeTime) || 0;
  const actual = parseFloat(actualDays) || 0;
  const demRate = parseFloat(demurrageRate) || 0;
  const detRate = parseFloat(detentionRate) || 0;
  const cv = parseFloat(cargoValue) || 0;
  const ir = parseFloat(interestRate) || 0;

  const excessDays = Math.max(actual - free, 0);
  const demurrageCost = excessDays * demRate * cnt;
  const detentionCost = excessDays * detRate * cnt;
  const totalPortCharges = demurrageCost + detentionCost;
  const capitalCost = cv * (ir / 100) * (excessDays / 365);
  const totalDelayCost = totalPortCharges + capitalCost;
  const costPerDay = excessDays > 0 ? totalDelayCost / excessDays : 0;

  const exportPDF = () => downloadPDF({
    reportTitle: "Risk & Demurrage Calculator Report",
    subtitle: `${cnt} Container(s) | ${excessDays} Excess Days`,
    sections: [
      { title: "Delay Parameters", rows: [
        { label: "Number of Containers", value: `${cnt}` },
        { label: "Free Time", value: `${free} days` },
        { label: "Actual Days at Port", value: `${actual} days` },
        { label: "Demurrage Rate", value: `${fmtINR(demRate)}/day/container` },
        { label: "Detention Rate", value: `${fmtINR(detRate)}/day/container` },
        { label: "Cargo Value", value: fmtINR(cv) },
        { label: "Interest Rate", value: `${ir}% p.a.` },
      ]},
      { title: "Cost Breakdown", rows: [
        { label: "Excess Days", value: `${excessDays} days`, bold: true },
        { label: "Demurrage Cost", value: fmtINR(demurrageCost) },
        { label: "Detention Cost", value: fmtINR(detentionCost) },
        { label: "Total Port Charges", value: fmtINR(totalPortCharges) },
        { label: "Capital / Opportunity Cost", value: fmtINR(capitalCost) },
        { label: "Total Delay Cost", value: fmtINR(totalDelayCost), bold: true },
      ]},
    ],
  }, "risk-demurrage-report.pdf");

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-brand-orange" /> Delay Parameters
        </h3>
        {([
          ["Number of Containers", containerCount, setContainerCount],
          ["Free Time (days)", freeTime, setFreeTime],
          ["Actual Days at Port", actualDays, setActualDays],
          ["Demurrage Rate (INR/day/container)", demurrageRate, setDemurrageRate],
          ["Detention Rate (INR/day/container)", detentionRate, setDetentionRate],
          ["Cargo Value (INR)", cargoValue, setCargoValue],
          ["Interest Rate (% p.a.)", interestRate, setInterestRate],
        ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
          <div key={label}>
            <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
            <input type="number" value={val} onChange={(e) => setter(e.target.value)} min={0} className={inputClass} />
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex justify-end">
          <button onClick={exportPDF} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:text-primary/80 transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              ["Free Time", `${free} days`],
              ["Excess Days", `${excessDays} days`],
              ["Demurrage Cost", fmtINR(demurrageCost)],
              ["Detention Cost", fmtINR(detentionCost)],
              ["Total Port Charges", fmtINR(totalPortCharges)],
              ["Capital / Opportunity Cost", fmtINR(capitalCost)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-1">Total Delay Cost</p>
          <p className="text-3xl font-extrabold text-red-600">{fmtINR(totalDelayCost)}</p>
          <p className="text-sm text-muted-foreground mt-1">{fmtINR(costPerDay)} per day of delay</p>
        </div>
        {excessDays > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-3">Impact Timeline</h4>
            <div className="space-y-2">
              {Array.from({ length: Math.min(excessDays, 5) }, (_, i) => {
                const day = i + 1;
                const cum = day * demRate * cnt + day * detRate * cnt + cv * (ir / 100) * (day / 365);
                return (
                  <div key={day} className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-foreground w-16">Day {day}</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${Math.min((cum / totalDelayCost) * 100, 100)}%` }} />
                    </div>
                    <span className="font-semibold text-foreground w-28 text-right">{fmtINR(cum)}</span>
                  </div>
                );
              })}
              {excessDays > 5 && <p className="text-xs text-muted-foreground text-center mt-2">...and {excessDays - 5} more days</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tab Config ─────────────────────────────────────────────────────────────
const tabs = [
  { id: "cbm",     label: "CBM Calculator",    sub: "Sea · Container Fit",      icon: Globe },
  { id: "airvol",  label: "Air Volume Weight",  sub: "Volumetric · Chargeable",  icon: Plane },
  { id: "landed",  label: "Landed Cost",        sub: "Import · Duty · GST",      icon: DollarSign },
  { id: "export",  label: "Export Price",       sub: "FOB · CIF · Margin",       icon: TrendingUp },
  { id: "compare", label: "Freight Compare",    sub: "Air vs Sea · Break-even",  icon: BarChart2 },
  { id: "risk",    label: "Risk & Demurrage",   sub: "Delay · Penalty",          icon: AlertTriangle },
];

const tabContent: Record<string, React.FC> = {
  cbm:     CbmCalculator,
  airvol:  AirVolumeWeight,
  landed:  LandedCost,
  export:  ExportPrice,
  compare: FreightCompare,
  risk:    RiskDemurrage,
};

type EduEntry = { icon: React.ReactNode; title: string; paragraphs: string[]; formulas?: { label: string; formula: string }[] };
const educationalContent: Record<string, EduEntry> = {
  cbm: {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "What Is CBM and How to Calculate It?",
    paragraphs: [
      "CBM (Cubic Meter) is the universal unit for measuring cargo volume in sea freight. The formula is Length (m) x Width (m) x Height (m) x Quantity = Total CBM. Understanding your cargo volume is critical for selecting the right container size and avoiding costly under-utilisation or overweight penalties.",
      "Our CBM calculator supports input in centimeters, inches, and meters. Add multiple items with different dimensions and instantly see total CBM, cargo density, and container fit with utilisation percentages for 20ft Standard, 40ft Standard, and 40ft High Cube containers.",
    ],
    formulas: [
      { label: "Total CBM", formula: "L (m) x W (m) x H (m) x Quantity" },
      { label: "20ft Container", formula: "25 m3 usable volume" },
      { label: "40ft HC Container", formula: "67 m3 usable volume" },
    ],
  },
  airvol: {
    icon: <Plane className="w-8 h-8 text-primary" />,
    title: "How Is Air Volumetric Weight Calculated?",
    paragraphs: [
      "Airlines do not charge purely by actual weight. For lightweight but bulky cargo, they calculate a volumetric (dimensional) weight using the formula: (Length cm x Width cm x Height cm x Quantity) / 6000. The chargeable weight is whichever is higher — actual or volumetric.",
      "For example, a box of 50cm x 40cm x 30cm with actual weight 5kg has a volumetric weight of 50x40x30/6000 = 10kg. The airline charges for 10kg. Understanding this helps you optimise packaging to reduce volumetric weight and lower air freight costs.",
    ],
    formulas: [
      { label: "Volumetric Weight", formula: "(L cm x W cm x H cm x Qty) / 6000" },
      { label: "Chargeable Weight", formula: "MAX(Actual Weight, Volumetric Weight)" },
    ],
  },
  landed: {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "How to Calculate Landed Cost for Imports",
    paragraphs: [
      "Landed cost is the total price of importing goods to your warehouse — far beyond the CIF value on the commercial invoice. For Indian importers, duties and taxes can add 20-40% to the invoice value depending on HS Code classification.",
      "Our Landed Cost calculator computes the complete breakdown: CIF value, customs duty, IGST, and handling charges — plus profit margin against your selling price.",
    ],
    formulas: [
      { label: "CIF Value", formula: "Product Cost + Freight + Insurance" },
      { label: "Customs Duty", formula: "CIF Value x Duty Rate (%)" },
      { label: "IGST", formula: "(CIF Value + Customs Duty) x IGST Rate (%)" },
      { label: "Total Landed Cost", formula: "CIF Value + Customs Duty + IGST + Handling" },
    ],
  },
  export: {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "How to Calculate Your Export Selling Price",
    paragraphs: [
      "Setting the right export price is critical for profitability. Your minimum export price must cover all costs — product, freight, insurance, packaging, agent commissions, and bank charges — plus your target profit margin.",
      "The formula is: Minimum Export Price = Total Cost / (1 - Margin%). If total cost is INR 60,000 and you want a 20% margin, the minimum selling price is 60,000 / 0.80 = INR 75,000.",
    ],
    formulas: [
      { label: "Total Export Cost", formula: "Product + Freight & Insurance + Packaging + Commission + Bank Charges" },
      { label: "Minimum Export Price", formula: "Total Cost / (1 - Margin / 100)" },
      { label: "Break-even Price", formula: "Total Cost (at 0% margin)" },
    ],
  },
  compare: {
    icon: <BarChart2 className="w-8 h-8 text-primary" />,
    title: "Air Freight vs Sea Freight: Which Is More Cost-Effective?",
    paragraphs: [
      "The air vs sea freight decision is one of the most critical in international logistics. Most shippers compare only direct freight costs — this is misleading. A complete analysis must include inventory holding costs, insurance premiums, and the opportunity cost of delayed market entry.",
      "For high-value cargo like electronics, pharmaceuticals, or fashion goods, air freight often has a lower total landed cost than sea freight once holding costs are factored in. Our Freight Compare tool calculates the break-even threshold automatically.",
    ],
    formulas: [
      { label: "Inventory Holding Cost/Day", formula: "Cargo Value x 0.05%" },
      { label: "Inventory Savings via Air", formula: "Holding Cost/Day x Days Saved" },
      { label: "Net Benefit of Air", formula: "Inventory Savings - (Air Cost - Sea Cost)" },
    ],
  },
  risk: {
    icon: <AlertTriangle className="w-8 h-8 text-accent" />,
    title: "What Is Demurrage and Detention?",
    paragraphs: [
      "Demurrage and detention are daily penalty charges imposed by shipping lines when containers are not returned within the agreed timeframe. Demurrage applies when a loaded container stays at the port beyond free days. Detention applies when an empty container is held at the consignee's premises beyond the allowed period.",
      "These charges escalate rapidly. Our Risk & Demurrage calculator tracks free days remaining, chargeable days accrued, and projected total loss including capital/opportunity costs.",
      "FTWZ advantage: By storing goods in a Free Trade Warehousing Zone, containers are de-stuffed immediately upon arrival — eliminating demurrage risk entirely. Customs duty is deferred until goods are released for domestic consumption.",
    ],
  },
};

const faqItems = [
  { q: "What is CBM and how do you calculate it?", a: "CBM stands for Cubic Meter. It is calculated as Length x Width x Height (all in meters) x Quantity. For example, a box measuring 1.2m x 0.8m x 0.6m has a CBM of 0.576 m3. Our calculator supports input in cm, inches, and meters with automatic conversion." },
  { q: "How is volumetric weight calculated for air freight?", a: "Volumetric weight for air freight is calculated by dividing the volume in cubic centimeters by 6000: (L x W x H x Qty) / 6000. The chargeable weight is whichever is higher — actual weight or volumetric weight." },
  { q: "How do I calculate total landed cost for imports?", a: "Total landed cost = CIF Value + Customs Duty + IGST + Clearing Charges + Inland Transport + Insurance + Other Charges. CIF Value is the sum of product cost, freight, and insurance. Customs duty and IGST are percentage-based on the assessable value." },
  { q: "How do I calculate the minimum export price?", a: "Minimum Export Price = Total Cost / (1 - Margin%). Total cost includes product cost, freight & insurance, packaging, agent commission, and bank charges. If your margin target is 20%, divide total cost by 0.80." },
  { q: "What is the difference between air freight and sea freight costs?", a: "Air freight has higher per-kg rates but lower transit times (2-5 days vs 25-40 days). For high-value cargo, the inventory holding cost saved by air freight can offset the higher freight rate, making it more economical overall." },
  { q: "What are demurrage and detention charges in shipping?", a: "Demurrage is charged when a loaded container stays at the port beyond free days. Detention is charged when an empty container is held at the consignee's premises beyond the allowed period. Both escalate daily and can significantly increase import costs." },
  { q: "How many containers do I need for my shipment?", a: "This depends on your cargo volume (CBM) and weight. A 20ft container holds ~33 CBM, a 40ft holds ~67 CBM, and a 40HC holds ~76 CBM. Our CBM calculator shows utilisation percentages for each container type." },
  { q: "What is cargo density and why does it matter?", a: "Cargo density = weight (kg) / volume (m3). It determines whether cargo is 'heavy' (dense) or 'light' (voluminous). Dense cargo is charged by weight; light cargo by volume. Understanding density helps optimise container loading and freight costs." },
  { q: "How does FTWZ reduce import costs and demurrage risk?", a: "Free Trade Warehousing Zones allow duty-free storage of imported goods. Containers are de-stuffed immediately on arrival (eliminating demurrage), and customs duty is deferred until goods are released for domestic consumption, improving cash flow." },
  { q: "How accurate are these shipping calculators?", a: "Our calculators provide close estimates based on standard industry formulas. Actual costs may vary based on specific carrier rates, port charges, and regulatory changes. For precise quotations, contact our team for a customized assessment." },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
const FreightIntelligence = () => {
  const [activeTab, setActiveTab] = useState("cbm");
  const ActiveComponent = tabContent[activeTab];
  const education = educationalContent[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-2">
          <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 min-w-0 ${
                  activeTab === tab.id
                    ? "border-primary bg-primary text-primary-foreground rounded-t-lg"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={16} className="shrink-0" />
                <div className="text-left">
                  <div className="truncate">{tab.label}</div>
                  <div className={`text-[10px] sm:text-xs font-normal hidden sm:block ${activeTab === tab.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {tab.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-8 sm:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`edu-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-5">
              {education.icon}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground">
                {education.title}
              </h2>
            </div>
            <div className="space-y-5">
              {education.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg">{p}</p>
              ))}
            </div>
            {education.formulas && (
              <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5 sm:p-6 space-y-3">
                {education.formulas.map((f) => (
                  <p key={f.label} className="text-sm sm:text-base">
                    <strong className="text-foreground">{f.label}</strong>
                    <span className="text-muted-foreground"> = {f.formula}</span>
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <AccordionItem value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-sm">
                    <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <ScrollReveal>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4">
                  About Our Freight Intelligence Tools
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Astromar Logistics offers a comprehensive suite of free freight calculators designed for importers, exporters, freight forwarders, and supply chain professionals. Calculate CBM for container loading, compute air volumetric weight, estimate total landed cost, set export pricing, compare air vs sea freight, and track demurrage penalties — all in one platform.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Free CBM Calculator for Sea Freight</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Our CBM calculator supports multiple units — centimeters, meters, and inches. Add unlimited items with different dimensions and quantities to compute total shipment volume, cargo density, and container fit for 20ft, 40ft, and 40ft High Cube containers. Ideal for freight forwarders and logistics coordinators planning sea shipments.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Air Volumetric Weight Calculator</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Calculate chargeable weight for air freight instantly. Enter dimensions in cm and actual weight in kg — our calculator applies the standard / 6000 divisor and shows whether actual or volumetric weight is used for billing. Essential for comparing air freight quotes and optimising packaging.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Landed Cost Calculator for Indian Imports</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Calculate the complete cost of importing goods into India including CIF value, customs duty, IGST, clearing charges, and other charges. Our Landed Cost module shows duty as a percentage of CIF value and computes profit margins based on your selling price.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Export Price Calculator</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Set the right export selling price by accounting for all cost components — product cost, freight & insurance, packaging, CHA commission, and bank charges. Enter your target profit margin and instantly see your break-even price and recommended selling price.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Built by Astromar Logistics</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  These tools are built and maintained by Astromar Logistics Pvt Ltd — India's leading FTWZ provider with 8+ locations, 5 lakh+ sq. ft. of warehouse space, and 7+ years of experience in global logistics, customs clearance, freight forwarding, and supply chain operations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FreightIntelligence;
