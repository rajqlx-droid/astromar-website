"use client";

import { useState } from "react";
import type { ImageAudit, ImageFlag } from "@/lib/seo-audit/types";
import { formatBytes } from "./ui";

/** Flag text prefix -> short tag label, most important first. */
const FLAG_ORDER: { prefix: string; label: string }[] = [
  { prefix: "Alt missing", label: "Alt missing" },
  { prefix: "Alt empty", label: "Alt empty" },
  { prefix: "Alt equals file name", label: "Alt = file name" },
  { prefix: "Alt too short", label: "Alt too short" },
  { prefix: "Alt too long", label: "Alt too long" },
  { prefix: "Over 200 KB", label: "Over 200 KB" },
  { prefix: "No width/height", label: "No width/height" },
];

function rank(flag: ImageFlag): number {
  const i = FLAG_ORDER.findIndex((f) => flag.text.startsWith(f.prefix));
  return i < 0 ? FLAG_ORDER.length : i;
}

function mainLabel(flag: ImageFlag): string {
  return FLAG_ORDER.find((f) => flag.text.startsWith(f.prefix))?.label ?? flag.text;
}

function thumbSrc(img: ImageAudit): string {
  if (!img.external) return img.src;
  try {
    const u = new URL(img.src);
    if (u.hostname === "images.unsplash.com") {
      u.searchParams.set("w", "160");
      u.searchParams.set("q", "50");
    }
    return u.toString();
  } catch {
    return img.src;
  }
}

function Thumb({ img }: { img: ImageAudit }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={img.src}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-[54px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[var(--seo-thumbBg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary audit thumbnails
        <img src={thumbSrc(img)} alt="" loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
      <span className="sr-only">Open {img.fileName}</span>
    </a>
  );
}

/** One grey card per image found on the open page. */
export default function ImagePageList({ images, onEveryPage }: { images: ImageAudit[]; onEveryPage: (img: ImageAudit) => boolean }) {
  if (images.length === 0) return <p className="px-4 py-8 text-center text-sm text-[color:var(--seo-mutedText)]">No images found on this page.</p>;
  return (
    <ul className="flex flex-col gap-2 px-5 py-2">
      {images.map((img) => {
        const flags = [...img.flags].sort((a, b) => rank(a) - rank(b));
        const main = flags[0];
        const others = flags.slice(1);
        const alt = img.alt === null ? "(missing)" : img.alt.trim() === "" ? "(empty)" : img.alt;
        const altBad = img.alt === null || img.alt.trim() === "";
        return (
          <li key={img.key} className="flex items-center gap-3 rounded-[10px] bg-[var(--seo-greyCard)] p-3">
            <Thumb img={img} />
            <div className="min-w-0 flex-1">
              <div className="break-all font-mono text-xs text-[color:var(--seo-ink)]">{img.fileName}</div>
              <div className="mt-0.5 break-words text-[13px] text-[color:var(--seo-inkSoft)]">
                Alt: {altBad ? <span className="font-bold text-[color:var(--seo-badText)]">{alt}</span> : alt}
              </div>
              <div className="mt-0.5 text-xs text-[color:var(--seo-subtleText)]">
                {formatBytes(img.sizeBytes)}
                {img.sizeNote ? ` - ${img.sizeNote}` : ""}
              </div>
              {others.length > 0 && <div className="mt-0.5 text-[11px] text-[color:var(--seo-subtleText)]">Also: {others.map((f) => f.text).join(", ")}</div>}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${
                  main ? "bg-[var(--seo-warnBg)] text-[color:var(--seo-warnText)]" : "bg-[var(--seo-okBg)] text-[color:var(--seo-okText)]"
                }`}
              >
                {main ? mainLabel(main) : "Good"}
              </span>
              {onEveryPage(img) && <span className="whitespace-nowrap rounded-md bg-[var(--seo-neutralBg)] px-2 py-0.5 text-[11px] font-semibold text-[color:var(--seo-navy)]">On every page</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
