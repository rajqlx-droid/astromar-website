"use client"
import { useState } from "react";
import { AlertTriangle, Download } from "lucide-react";
import { downloadPDF } from "@/lib/pdfExport";

const RiskIntelligence = () => {
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

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  const exportPDF = () => {
    downloadPDF({
      reportTitle: "Risk Intelligence Report – Demurrage & Detention Analysis",
      subtitle: `${cnt} Container(s) | ${excessDays} Excess Days`,
      sections: [
        {
          title: "Delay Parameters",
          rows: [
            { label: "Number of Containers", value: `${cnt}` },
            { label: "Free Time", value: `${free} days` },
            { label: "Actual Days at Port", value: `${actual} days` },
            { label: "Demurrage Rate", value: `${fmt(demRate)}/day/container` },
            { label: "Detention Rate", value: `${fmt(detRate)}/day/container` },
            { label: "Cargo Value", value: fmt(cv) },
            { label: "Interest Rate", value: `${ir}% p.a.` },
          ],
        },
        {
          title: "Cost Breakdown",
          rows: [
            { label: "Excess Days", value: `${excessDays} days`, bold: true },
            { label: "Demurrage Cost", value: fmt(demurrageCost) },
            { label: "Detention Cost", value: fmt(detentionCost) },
            { label: "Total Port Charges", value: fmt(totalPortCharges) },
            { label: "Capital / Opportunity Cost", value: fmt(capitalCost) },
            { label: "Total Delay Cost", value: fmt(totalDelayCost), bold: true },
            { label: "Cost Per Day of Delay", value: fmt(costPerDay) },
          ],
        },
        {
          title: "FTWZ Advantage",
          rows: [
            { label: "Potential Savings with FTWZ", value: fmt(totalDelayCost), bold: true },
            { label: "Note: FTWZ eliminates demurrage by de-stuffing containers on arrival", value: "" },
          ],
        },
      ],
    }, "risk-intelligence-report.pdf");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-brand-orange" /> Delay Parameters
        </h3>
        {[
          ["Number of Containers", containerCount, setContainerCount],
          ["Free Time (days)", freeTime, setFreeTime],
          ["Actual Days at Port", actualDays, setActualDays],
          ["Demurrage Rate (₹/day/container)", demurrageRate, setDemurrageRate],
          ["Detention Rate (₹/day/container)", detentionRate, setDetentionRate],
          ["Cargo Value (₹)", cargoValue, setCargoValue],
          ["Interest Rate (% p.a.)", interestRate, setInterestRate],
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
          <h4 className="font-bold text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              ["Free Time", `${free} days`],
              ["Excess Days", `${excessDays} days`],
              ["Demurrage Cost", fmt(demurrageCost)],
              ["Detention Cost", fmt(detentionCost)],
              ["Total Port Charges", fmt(totalPortCharges)],
              ["Capital / Opportunity Cost", fmt(capitalCost)],
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
          <p className="text-3xl font-extrabold text-red-600">{fmt(totalDelayCost)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {fmt(costPerDay)} per day of delay
          </p>
        </div>

        {excessDays > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-3">Impact Timeline</h4>
            <div className="space-y-2">
              {Array.from({ length: Math.min(excessDays, 5) }, (_, i) => {
                const day = i + 1;
                const cumDem = day * demRate * cnt;
                const cumDet = day * detRate * cnt;
                const cumCap = cv * (ir / 100) * (day / 365);
                return (
                  <div key={day} className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-foreground w-16">Day {day}</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(((cumDem + cumDet + cumCap) / totalDelayCost) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-semibold text-foreground w-28 text-right">
                      {fmt(cumDem + cumDet + cumCap)}
                    </span>
                  </div>
                );
              })}
              {excessDays > 5 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  ...and {excessDays - 5} more days
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskIntelligence;
