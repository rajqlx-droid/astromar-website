import type { ImageAudit, ImageRow } from "./types";

/** Merge per-page image rows into one row per (file, alt) with the pages it appears on. */
export function groupImages(rows: ImageRow[]): ImageAudit[] {
  const map = new Map<string, ImageAudit>();
  for (const { pageUrl, data } of rows) {
    const key = `${data.src}|${data.alt ?? "\u0000"}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        key,
        src: data.src,
        fileName: data.fileName,
        external: data.external,
        alt: data.alt,
        foundOn: [pageUrl],
        sizeBytes: data.sizeBytes,
        sizeNote: data.sizeNote,
        flags: [...data.flags],
        hasProblem: data.flags.length > 0,
      });
      continue;
    }
    if (!existing.foundOn.includes(pageUrl)) existing.foundOn.push(pageUrl);
    for (const f of data.flags) {
      if (!existing.flags.some((x) => x.text === f.text)) existing.flags.push(f);
    }
    existing.hasProblem = existing.flags.length > 0;
  }
  return Array.from(map.values());
}
