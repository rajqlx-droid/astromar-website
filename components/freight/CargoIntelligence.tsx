"use client"
import { useState } from "react";
import { Globe, Plus, Trash2, Download } from "lucide-react";
import { downloadPDF } from "@/lib/pdfExport";

interface CargoItem {
  id: number;
  length: string;
  width: string;
  height: string;
  qty: string;
  weight: string;
}

type Unit = "cm" | "in" | "m";
type FreightMode = "sea" | "air";

const unitFactors: Record<Unit, number> = { cm: 1e6, in: 61023.7, m: 1 };
const volWeightDivisors: Record<FreightMode, number> = { sea: 1000000, air: 6000 };

const containers = [
  { name: "20ft Standard", volume: 33.2 },
  { name: "40ft Standard", volume: 67.72 },
  { name: "40ft High Cube", volume: 76.35 },
];

let nextId = 2;

const CargoIntelligence = () => {
  const [unit, setUnit] = useState<Unit>("cm");
  const [mode, setMode] = useState<FreightMode>("sea");
  const [items, setItems] = useState<CargoItem[]>([
    { id: 1, length: "", width: "", height: "", qty: "1", weight: "" },
  ]);

  const updateItem = (id: number, field: keyof CargoItem, val: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: nextId++, length: "", width: "", height: "", qty: "1", weight: "" },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const factor = unitFactors[unit];
  const totalVolume = items.reduce(
    (sum, i) => {
      const l = parseFloat(i.length) || 0;
      const w = parseFloat(i.width) || 0;
      const h = parseFloat(i.height) || 0;
      const q = parseFloat(i.qty) || 0;
      return sum + (l * w * h * q) / factor;
    },
    0
  );
  const totalWeight = items.reduce((sum, i) => sum + (parseFloat(i.weight) || 0) * (parseFloat(i.qty) || 0), 0);
  const volWeight =
    mode === "air"
      ? items.reduce(
          (sum, i) => {
            const l = parseFloat(i.length) || 0;
            const w = parseFloat(i.width) || 0;
            const h = parseFloat(i.height) || 0;
            const q = parseFloat(i.qty) || 0;
            return sum + (l * w * h * q) / volWeightDivisors.air;
          },
          0
        )
      : totalVolume * 1000;
  const chargeableWeight = Math.max(totalWeight, volWeight);
  const density = totalVolume > 0 ? totalWeight / totalVolume : 0;

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  const exportPDF = () => {
    downloadPDF({
      reportTitle: "Cargo Intelligence Report",
      subtitle: `Mode: ${mode === "sea" ? "Sea Freight" : "Air Freight"} | Unit: ${unit}`,
      sections: [
        {
          title: "Cargo Items",
          rows: items.map((item, idx) => ({
            label: `Item #${idx + 1}: ${item.length || 0}×${item.width || 0}×${item.height || 0} ${unit} × ${item.qty || 0}`,
            value: `${item.weight || 0} kg`,
          })),
        },
        {
          title: "Volume & Weight Analysis",
          rows: [
            { label: "Total Volume", value: `${totalVolume.toFixed(4)} m³`, bold: true },
            { label: "Total Weight", value: `${totalWeight.toFixed(2)} kg` },
            { label: `Volumetric Weight (÷${mode === "air" ? "6000" : "1,000,000"})`, value: `${volWeight.toFixed(2)} kg` },
            { label: "Chargeable Weight", value: `${chargeableWeight.toFixed(2)} kg`, bold: true },
            { label: "Cargo Density", value: `${density.toFixed(2)} kg/m³` },
          ],
        },
        {
          title: "Container Fit Analysis",
          rows: containers.map((c) => {
            const pct = c.volume > 0 ? Math.min((totalVolume / c.volume) * 100, 100) : 0;
            const remaining = Math.max(c.volume - totalVolume, 0);
            return {
              label: `${c.name} (${pct.toFixed(1)}% utilized)`,
              value: `${remaining.toFixed(2)} m³ remaining`,
            };
          }),
        },
      ],
    }, "cargo-intelligence-report.pdf");
  };

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
          {(["sea", "air"] as FreightMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${
                mode === m
                  ? "bg-brand-navy text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "sea" ? "🚢" : "✈️"} {m === "sea" ? "Sea Freight" : "Air Freight"}
            </button>
          ))}
        </div>
      </div>

      {/* Cargo Dimensions */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Cargo Dimensions</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Unit:</span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
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
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {(
                  [
                    ["length", `Length (${unit})`],
                    ["width", `Width (${unit})`],
                    ["height", `Height (${unit})`],
                    ["qty", "Qty"],
                    ["weight", "Weight (kg)"],
                  ] as const
                ).map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      {label}
                    </label>
                    <input
                      type="number"
                      value={item[field]}
                      onChange={(e) => updateItem(item.id, field, e.target.value)}
                      min={0}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Results */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            📊 Results
          </h3>
          <button
            onClick={exportPDF}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        <div className="space-y-3">
          {[
            ["Total Volume", `${totalVolume.toFixed(4)} m³`, true],
            ["Total Weight", `${totalWeight.toFixed(2)} kg`, false],
            [
              `Volumetric Weight (÷${mode === "air" ? "6000" : "1,000,000"})`,
              `${volWeight.toFixed(2)} kg`,
              false,
            ],
            ["Chargeable Weight", `${chargeableWeight.toFixed(2)} kg`, true],
            ["Cargo Density", `${density.toFixed(2)} kg/m³`, false],
          ].map(([label, value, bold]) => (
            <div key={label as string} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {label as string}
              </span>
              <span className={`text-sm ${bold ? "font-bold text-foreground" : "font-semibold text-foreground"}`}>
                {value as string}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Container Fit */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
          🚛 Container Fit
        </h3>
        <div className="space-y-4">
          {containers.map((c, i) => {
            const used = totalVolume;
            const pct = c.volume > 0 ? Math.min((used / c.volume) * 100, 100) : 0;
            const remaining = Math.max(c.volume - used, 0);
            const best = i === 0;
            return (
              <div key={c.name} className="rounded-lg border border-border p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">{c.name}</span>
                  {best && totalVolume > 0 && (
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{pct.toFixed(1)}% utilized</span>
                  <span>{remaining.toFixed(2)} m³ remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CargoIntelligence;
