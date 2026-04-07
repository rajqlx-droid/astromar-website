"use client"
import { useState } from "react";
import { DollarSign, Download } from "lucide-react";
import { downloadPDF } from "@/lib/pdfExport";

const CostIntelligence = () => {
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

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  const exportPDF = () => {
    downloadPDF({
      reportTitle: "Cost Intelligence Report – Landed Cost & Profit Analysis",
      subtitle: `CIF Value: ${fmt(cifValue)} | Selling Price: ${fmt(sp)}`,
      sections: [
        {
          title: "Cost Components",
          rows: [
            { label: "Product Cost", value: fmt(pc) },
            { label: "Freight", value: fmt(fr) },
            { label: "Insurance", value: fmt(ins) },
            { label: "CIF Value", value: fmt(cifValue), bold: true },
            { label: `Customs Duty (${cd}%)`, value: fmt(dutyAmount) },
            { label: "Assessable Value", value: fmt(assessableValue) },
            { label: `GST (${g}%)`, value: fmt(gstAmount) },
            { label: "Handling & Other", value: fmt(hc) },
            { label: "Total Landed Cost", value: fmt(landedCost), bold: true },
          ],
        },
        {
          title: "Profit Analysis",
          rows: [
            { label: "Selling Price", value: fmt(sp) },
            { label: "Landed Cost", value: fmt(landedCost) },
            { label: "Gross Profit", value: fmt(profit), bold: true },
            { label: "Profit Margin", value: `${margin.toFixed(1)}%` },
            { label: "Markup", value: `${markup.toFixed(1)}%` },
          ],
        },
        {
          title: "Summary",
          rows: [
            {
              label: profit >= 0 ? `✓ Profitable at ${margin.toFixed(1)}% margin` : "✗ Loss – review pricing strategy",
              value: fmt(Math.abs(profit)),
              bold: true,
            },
          ],
        },
      ],
    }, "cost-intelligence-report.pdf");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" /> Cost Components
        </h3>
        {[
          ["Product Cost (₹)", productCost, setProductCost],
          ["Freight Cost (₹)", freight, setFreight],
          ["Insurance (₹)", insurance, setInsurance],
          ["Customs Duty (%)", customsDuty, setCustomsDuty],
          ["GST (%)", gst, setGst],
          ["Handling & Other (₹)", handling, setHandling],
          ["Selling Price (₹)", sellingPrice, setSellingPrice],
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

      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={exportPDF}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Landed Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              ["Product Cost", fmt(pc)],
              ["Freight", fmt(fr)],
              ["Insurance", fmt(ins)],
              ["CIF Value", fmt(cifValue)],
              [`Customs Duty (${cd}%)`, fmt(dutyAmount)],
              ["Assessable Value", fmt(assessableValue)],
              [`GST (${g}%)`, fmt(gstAmount)],
              ["Handling & Other", fmt(hc)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="font-bold text-foreground">Total Landed Cost</span>
              <span className="font-extrabold text-primary text-lg">{fmt(landedCost)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="font-bold text-foreground mb-4">Profit Analysis</h4>
          <div className="space-y-3">
            {[
              ["Selling Price", fmt(sp)],
              ["Landed Cost", fmt(landedCost)],
              ["Gross Profit", fmt(profit)],
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

        <div
          className={`rounded-xl p-6 text-center ${
            profit >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          <p className="text-sm font-semibold text-muted-foreground mb-1">Net Profit / Loss</p>
          <p className={`text-3xl font-extrabold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
            {fmt(Math.abs(profit))}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {profit >= 0 ? `${margin.toFixed(1)}% margin` : "Loss – review pricing"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostIntelligence;
