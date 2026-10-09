import type { ImageAudit } from "@/lib/seo-audit/types";
import { IconImage } from "./icons";
import { Chip, EmptyRow, formatBytes, toneFor } from "./ui";

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

const COLS = "grid-cols-[88px_minmax(140px,1.3fr)_minmax(140px,1.1fr)_minmax(160px,1.5fr)_80px_minmax(150px,1.3fr)]";

export default function ImagesTab({ images }: { images: ImageAudit[] }) {
  if (images.length === 0) return <EmptyRow>No images match the current filters.</EmptyRow>;
  return (
    <div className="min-w-[860px]" role="table" aria-label="Images">
        <div
          role="row"
          className={`sticky top-0 z-10 grid ${COLS} gap-4 bg-[#EDF1F8] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#3A4560]`}
        >
          <div role="columnheader">Image</div>
          <div role="columnheader">File name</div>
          <div role="columnheader">Found on</div>
          <div role="columnheader">Alt text</div>
          <div role="columnheader">Size</div>
          <div role="columnheader">Flags</div>
        </div>
        {images.map((img) => (
          <div role="row" key={img.key} className={`grid ${COLS} items-start gap-4 border-t border-[#E6EAF2] px-5 py-4 text-sm`}>
            <div role="cell">
              <a href={img.src} target="_blank" rel="noopener noreferrer" className="block h-[52px] w-[72px] overflow-hidden rounded-md bg-[#E6EBF5]">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary audit thumbnails */}
                <img src={thumbSrc(img)} alt={`Thumbnail of ${img.fileName}`} loading="lazy" className="h-full w-full object-cover" />
                <span className="sr-only">Open image</span>
              </a>
            </div>
            <div role="cell" className="min-w-0">
              <div className="break-all font-mono text-[13px] text-[#1A2233]">{img.fileName}</div>
              {img.external && (
                <div className="mt-1 flex items-center gap-1 text-xs text-[#4A5670]">
                  <IconImage className="h-3.5 w-3.5" />
                  External: {new URL(img.src).hostname}
                </div>
              )}
            </div>
            <div role="cell" className="min-w-0 font-mono text-[13px] text-[#1B3A6B]">
              {img.foundOn.slice(0, 3).map((p) => (
                <div key={p} className="break-all">
                  {p}
                </div>
              ))}
              {img.foundOn.length > 3 && (
                <details className="mt-1">
                  <summary className="cursor-pointer font-sans text-xs font-semibold text-[#4A5670]">+{img.foundOn.length - 3} more</summary>
                  {img.foundOn.slice(3).map((p) => (
                    <div key={p} className="break-all">
                      {p}
                    </div>
                  ))}
                </details>
              )}
            </div>
            <div role="cell" className="min-w-0 break-words">
              {img.alt === null ? (
                <span className="font-semibold text-[#7A1010]">(no alt attribute)</span>
              ) : img.alt.trim() === "" ? (
                <span className="font-semibold text-[#7A1010]">(empty)</span>
              ) : (
                <span className="text-[#2B364D]">{img.alt}</span>
              )}
            </div>
            <div role="cell" className="text-[#1A2233]">
              {formatBytes(img.sizeBytes)}
              {img.sizeNote && <div className="text-xs text-[#4A5670]">{img.sizeNote}</div>}
            </div>
            <div role="cell" className="flex flex-wrap gap-1.5">
              {img.flags.length ? (
                img.flags.map((f) => (
                  <Chip key={f.text} tone={toneFor(f.severity)}>
                    {f.text}
                  </Chip>
                ))
              ) : (
                <Chip tone="ok">Good</Chip>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
