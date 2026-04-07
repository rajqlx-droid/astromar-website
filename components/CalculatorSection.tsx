"use client"
import { useState } from "react";
import { Calculator, TableProperties } from "lucide-react";

const CalculatorSection = () => {
  const [importValue, setImportValue] = useState("");
  const [dutyRate, setDutyRate] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [storageMo, setStorageMo] = useState("6");
  const [reExport, setReExport] = useState("30");
  const [calculated, setCalculated] = useState(false);

  const value = parseFloat(importValue) || 0;
  const duty = parseFloat(dutyRate) || 0;
  const gst = parseFloat(gstRate) || 0;
  const storage = parseFloat(storageMo) || 0;
  const reExportPct = parseFloat(reExport) || 0;

  const customsDuty = value * (duty / 100);
  const gstOnImport = (value + customsDuty) * (gst / 100);
  const totalDutyGst = customsDuty + gstOnImport;
  const reExportSavings = totalDutyGst * (reExportPct / 100);
  const deferralBenefit = (totalDutyGst - reExportSavings) * (storage / 12) * 0.10;
  const totalSavings = reExportSavings + deferralBenefit;

  const fmt = (n: number) => "â‚¹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const handleCalculate = () => {
    setCalculated(true);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <section id="calculator" className="py-20 bg-brand-light">
      <div className="container">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary text-center mb-3">
          INTERACTIVE TOOL
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
          FTWZ Duty &amp; GST Savings Calculator
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Estimate how much you can save on customs duty and GST by using Astromar's FTWZ facilities.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Enter Your Details</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Import Value (â‚¹)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={importValue}
                  onChange={(e) => {
                    setImportValue(e.target.value.replace(/[^0-9.]/g, ""));
                    setCalculated(false);
                  }}
                  placeholder="e.g. 1,00,00,000"
                  maxLength={15}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Customs Duty Rate (%)
                </label>
                <input
                  type="number"
                  value={dutyRate}
                  onChange={(e) => {
                    setDutyRate(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="e.g. 15"
                  min={0}
                  max={100}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    GST Rate (%)
                  </label>
                  <input
                    type="number"
                    value={gstRate}
                    onChange={(e) => {
                      setGstRate(e.target.value);
                      setCalculated(false);
                    }}
                    min={0}
                    max={100}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Storage (months)
                  </label>
                  <input
                    type="number"
                    value={storageMo}
                    onChange={(e) => {
                      setStorageMo(e.target.value);
                      setCalculated(false);
                    }}
                    min={1}
                    max={120}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Re-export Percentage (%)
                </label>
                <input
                  type="number"
                  value={reExport}
                  onChange={(e) => {
                    setReExport(e.target.value);
                    setCalculated(false);
                  }}
                  min={0}
                  max={100}
                  className={inputClass}
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Calculate Savings
              </button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <TableProperties className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Your Estimated Savings</h3>
            </div>

            {calculated && value > 0 ? (
              <div className="space-y-4 flex-1">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Import Value</span>
                  <span className="font-semibold text-foreground">{fmt(value)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Customs Duty ({duty}%)</span>
                  <span className="font-semibold text-foreground">{fmt(customsDuty)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">GST on Import ({gst}%)</span>
                  <span className="font-semibold text-foreground">{fmt(gstOnImport)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Total Duty + GST</span>
                  <span className="font-semibold text-foreground">{fmt(totalDutyGst)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Re-export Duty Saved ({reExportPct}%)</span>
                  <span className="font-semibold text-green-600">{fmt(reExportSavings)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Deferral Benefit ({storage} mo)</span>
                  <span className="font-semibold text-green-600">{fmt(deferralBenefit)}</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="font-bold text-foreground text-lg">Total Estimated Savings</span>
                  <span className="font-extrabold text-primary text-xl">{fmt(totalSavings)}</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <TableProperties className="w-12 h-12 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-sm max-w-xs">
                  Enter your import details and click "Calculate Savings" to see your estimated duty &amp; GST deferral benefits.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

