"use client"
import { useState } from "react";
import { TrendingUp, Download } from "lucide-react";
import { downloadPDF } from "@/lib/pdfExport";

const FreightIntelligence = () => {
  const [weight, setWeight] = useState("1000");
  const [distance, setDistance] = useState("5000");
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

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  const exportPDF = () => {
    downloadPDF({
      reportTitle: "Freight Intelligence Report – Air vs Sea Comparison",
      subtitle: `Cargo Weight: ${w} kg | Cargo Value: ${fmt(cv)}`,
      sections: [
        {
          title: "Shipment Parameters",
          rows: [
            { label: "Cargo Weight", value: `${w} kg` },
            { label: "Cargo Value", value: fmt(cv) },
            { label: "Sea Freight Rate", value: `₹${sr}/kg` },
            { label: "Air Freight Rate", value: `₹${ar}/kg` },
            { label: "Sea Transit Time", value: `${st} days` },
            { label: "Air Transit Time", value: `${at} days` },
          ],
        },
        {
          title: "Cost Comparison",
          rows: [
            { label: "Sea Freight Cost", value: fmt(seaCost), bold: true },
            { label: "Air Freight Cost", value: fmt(airCost), bold: true },
            { label: "Cost Difference (Air - Sea)", value: fmt(costDiff) },
          ],
        },
        {
          title: "Break-even Analysis",
          rows: [
            { label: "Time Saved via Air", value: `${timeSaved} days` },
            { label: "Inventory Cost / Day", value: fmt(inventoryCostPerDay) },
            { label: "Inventory Savings (Air)", value: fmt(inventorySaved) },
            { label: "Break-even Point", value: `${breakEvenDays.toFixed(1)} days` },
            { label: "Net Benefit of Air Freight", value: fmt(Math.abs(netBenefit)), bold: true },
          ],
        },
        {
          title: "Recommendation",
          rows: [
            {
              label: netBenefit >= 0 ? "✓ Air freight is more cost-effective for this shipment" : "✓ Sea freight is more cost-effective for this shipment",
              value: fmt(Math.abs(netBenefit)),
              bold: true,
            },
          ],
        },
      ],
    }, "freight-intelligence-report.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Shipment Parameters
          </h3>
          {[
            ["Cargo Weight (kg)", weight, setWeight],
            ["Distance (km)", distance, setDistance],
            ["Cargo Value (₹)", cargoValue, setCargoValue],
            ["Sea Freight Rate (₹/kg)", seaRate, setSeaRate],
            ["Air Freight Rate (₹/kg)", airRate, setAirRate],
            ["Sea Transit Time (days)", seaTransit, setSeaTransit],
            ["Air Transit Time (days)", airTransit, setAirTransit],
          ].map(([label, val, setter]) => (
            <div key={label as string}>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                {label as string}
              </label>
              <input
                type="number"
                value={val as string}
                onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                min={0}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={exportPDF}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg"
            >
              <Download size={16} /> Download PDF
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">🚢 Sea Freight</p>
              <p className="text-2xl font-extrabold text-foreground">{fmt(seaCost)}</p>
              <p className="text-sm text-muted-foreground mt-1">{st} days transit</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">✈️ Air Freight</p>
              <p className="text-2xl font-extrabold text-foreground">{fmt(airCost)}</p>
              <p className="text-sm text-muted-foreground mt-1">{at} days transit</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-4">Break-even Analysis</h4>
            <div className="space-y-3">
              {[
                ["Cost Difference (Air - Sea)", fmt(costDiff)],
                ["Time Saved via Air", `${timeSaved} days`],
                ["Inventory Cost / Day", fmt(inventoryCostPerDay)],
                ["Inventory Savings (Air)", fmt(inventorySaved)],
                ["Break-even Point", `${breakEvenDays.toFixed(1)} days`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-xl p-6 text-center ${
              netBenefit >= 0
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p className="text-sm font-semibold text-muted-foreground mb-1">Net Benefit of Air Freight</p>
            <p className={`text-3xl font-extrabold ${netBenefit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {fmt(Math.abs(netBenefit))}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {netBenefit >= 0 ? "Air freight is more cost-effective" : "Sea freight is more cost-effective"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightIntelligence;
