import type { Severity } from "@/lib/seo-audit/types";
import { IconAlert, IconCheck, IconX } from "./icons";

export type Tone = "ok" | "warn" | "bad" | "neutral" | "keyword";

const toneClass: Record<Tone, string> = {
  ok: "bg-[#DDF3E4] text-[#0F4A22]",
  warn: "bg-[#FFE9B8] text-[#5A3A00]",
  bad: "bg-[#FAD4D4] text-[#7A1010]",
  neutral: "bg-[#E6EBF5] text-[#1B3A6B]",
  keyword: "bg-[#FDE7D3] text-[#6B2C00]",
};

export function toneFor(severity: Severity): Tone {
  return severity === "fix" ? "bad" : severity === "check" ? "warn" : "ok";
}

/** Chip with a text label and an icon, so meaning never depends on colour alone. */
export function Chip({ tone, children, icon = true }: { tone: Tone; children: React.ReactNode; icon?: boolean }) {
  const Icon = tone === "ok" ? IconCheck : tone === "warn" ? IconAlert : tone === "bad" ? IconX : null;
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ${toneClass[tone]}`}
    >
      {icon && Icon ? <Icon /> : null}
      {children}
    </span>
  );
}

export function SeverityTag({ severity }: { severity: Severity }) {
  const label = severity === "fix" ? "Fix" : severity === "check" ? "Check" : "Good";
  return <Chip tone={toneFor(severity)}>{label}</Chip>;
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-xl border border-[#D9DFEA] bg-white ${className}`}>{children}</div>;
}

export function formatBytes(bytes: number | null): string {
  if (bytes === null) return "Unknown";
  if (bytes < 1024) return `${bytes} B`;
  return `${Math.round(bytes / 1024)} KB`;
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "medium",
  timeZone: "Asia/Kolkata",
  hour12: true,
});

/** Fixed locale and time zone so server and browser render identical text. */
export function formatDateTime(value: string | number | Date): string {
  return dateTimeFormatter.format(new Date(value));
}

export function EmptyRow({ children }: { children: React.ReactNode }) {
  return <Card className="px-6 py-10 text-center text-sm text-[#4A5670]">{children}</Card>;
}

const shortDateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
  hour12: true,
});

/** Short form for the Saved scan dropdown, e.g. "9 Oct, 2:20 pm". */
export function formatShortDateTime(value: string | number | Date): string {
  return shortDateTimeFormatter.format(new Date(value));
}
