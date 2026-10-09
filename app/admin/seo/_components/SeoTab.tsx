"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ImageAudit, WordingMatch } from "@/lib/seo-audit/types";
import ImagePageList from "./ImagePageList";
import { IconFilter, IconSearch, IconX } from "./icons";
import PageDetailModal from "./PageDetailModal";
import { buildMenu, issueCount, type MenuItem, type TreeRow, type ViewPage } from "./pageTree";
import { EmptyRow } from "./ui";

export type { ViewPage } from "./pageTree";

interface Props {
  pages: ViewPage[];
  /** Images found on the scanned pages (hidden pages already removed). */
  images: ImageAudit[];
  markNote?: { target: string; text: string } | null;
  onIgnore: (path: string, code: string) => void;
  onRestore: (path: string, code: string) => void;
  /** Wording matches of the scan (hidden pages already removed). */
  wording: WordingMatch[];
  /** Content of the Status and redirects tab, rendered inside this card. */
  renderRedirects: () => React.ReactNode;
  /** Ask this card to open the details of a page (used by the sitewide wording list). */
  openRequest: { path: string; seq: number } | null;
}

type Mode = "pages" | "images" | "redirects";

const SUB_TABS: { key: Mode; label: string }[] = [
  { key: "pages", label: "Page SEO" },
  { key: "images", label: "Image SEO" },
  { key: "redirects", label: "Status and redirects" },
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[color:var(--seo-orange)]";

/** Highlights the matched letters of `query` inside `text` (case-insensitive). */
function Highlight({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-[var(--seo-highlight)] px-0.5 text-inherit">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

function Tag({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${
        ok ? "bg-[var(--seo-okBg)] text-[color:var(--seo-okText)]" : "bg-[var(--seo-warnBg)] text-[color:var(--seo-warnText)]"
      }`}
    >
      {children}
    </span>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ stroke: "var(--seo-orange)" }} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

type OnSelect = (row: TreeRow, button: HTMLButtonElement) => void;

/** Page row for the top level and for search results. */
function PageRow({ row, query, tag, onSelect }: { row: TreeRow; query: string; tag: React.ReactNode; onSelect: OnSelect }) {
  return (
    <button
      type="button"
      data-row={row.page.path}
      onClick={(e) => onSelect(row, e.currentTarget)}
      className={`flex min-h-14 w-full items-center gap-3 border-b border-[color:var(--seo-divider)] bg-[var(--seo-cardBg)] px-4 py-2 text-left transition-colors hover:bg-[var(--seo-rowHover)] ${FOCUS}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold text-[color:var(--seo-navy)]">
          <Highlight text={row.name} query={query} />
        </span>
        <span className="block break-all font-mono text-xs text-[color:var(--seo-subtleText)]">
          <Highlight text={row.page.path} query={query} />
        </span>
        {row.subtitle && <span className="block truncate text-[11px] text-[color:var(--seo-faintText)]">{row.subtitle}</span>}
      </span>
      {tag}
    </button>
  );
}

/** Page card inside a group: grey card, no dividers. */
function PageCard({ row, tag, onSelect }: { row: TreeRow; tag: React.ReactNode; onSelect: OnSelect }) {
  return (
    <button
      type="button"
      data-row={row.page.path}
      onClick={(e) => onSelect(row, e.currentTarget)}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[10px] bg-[var(--seo-greyCard)] px-4 py-2 text-left transition-colors hover:bg-[var(--seo-greyCardHover)] ${FOCUS}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold text-[color:var(--seo-navy)]">{row.name}</span>
        <span className="block break-all font-mono text-xs text-[color:var(--seo-subtleText)]">{row.page.path}</span>
        {row.subtitle && <span className="block truncate text-[11px] text-[color:var(--seo-faintText)]">{row.subtitle}</span>}
      </span>
      {tag}
    </button>
  );
}

export default function SeoTab({ pages, images, wording, markNote, onIgnore, onRestore, renderRedirects, openRequest }: Props) {
  const [mode, setMode] = useState<Mode>("pages");
  const [query, setQuery] = useState("");
  const [problemsOnly, setProblemsOnly] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const imageBackRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // After a level change: refocus the group row we came from, or the back button we arrived at.
  const focusAfter = useRef<{ group: string } | "back" | null>(null);
  // Row to refocus when the image list closes.
  const returnRow = useRef<string | null>(null);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const menu = useMemo(() => buildMenu(pages), [pages]);
  const allRows = useMemo(() => menu.flatMap((m) => (m.type === "page" ? [m.row] : m.rows)), [menu]);
  const group = level ? (menu.find((m): m is Extract<MenuItem, { type: "group" }> => m.type === "group" && m.id === level) ?? null) : null;

  // Images by the page they were found on.
  const imagesByPage = useMemo(() => {
    const map = new Map<string, ImageAudit[]>();
    for (const img of images) for (const path of img.foundOn) map.set(path, [...(map.get(path) ?? []), img]);
    return map;
  }, [images]);
  const wordingByPath = useMemo(() => {
    const map = new Map<string, WordingMatch[]>();
    for (const m of wording) map.set(m.path, [...(map.get(m.path) ?? []), m]);
    return map;
  }, [wording]);
  const onEveryPage = (img: ImageAudit) => pages.length > 1 && img.foundOn.length > pages.length / 2;

  const imgOf = (r: TreeRow) => imagesByPage.get(r.page.path) ?? [];
  const imgProblems = (r: TreeRow) => imgOf(r).filter((i) => i.hasProblem).length;
  const isProblem = (r: TreeRow) => (mode === "pages" ? r.page.hasProblem : imgProblems(r) > 0);
  const keep = (r: TreeRow) => !problemsOnly || isProblem(r);

  /** Unique images in a set of rows (the same logo is counted once). */
  const uniqueImages = (rows: TreeRow[]) => {
    const seen = new Map<string, ImageAudit>();
    rows.forEach((r) => imgOf(r).forEach((i) => seen.set(i.key, i)));
    return Array.from(seen.values());
  };

  const fixLine = (rows: TreeRow[]) => {
    const bad = rows.filter(isProblem).length;
    return `${plural(rows.length, "page")} - ${bad === 0 ? "all OK" : `${bad} need fixing`}`;
  };

  const rowTag = (r: TreeRow) => {
    if (mode === "pages") {
      const n = issueCount(r.page);
      const status = n === 0 ? <Tag ok>OK</Tag> : <Tag ok={false}>{plural(n, "issue")}</Tag>;
      const w = wordingByPath.get(r.page.path)?.length ?? 0;
      // Informational only: wording never changes the issue count or Problems only.
      if (w === 0) return status;
      return (
        <span className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-md bg-[var(--seo-neutralBg)] px-2.5 py-1 text-xs font-bold text-[color:var(--seo-navy)]">{w} wording</span>
          {status}
        </span>
      );
    }
    const n = imgOf(r).length;
    const m = imgProblems(r);
    return <Tag ok={m === 0}>{m === 0 ? plural(n, "image") : `${plural(n, "image")} - ${m} to fix`}</Tag>;
  };

  const results = useMemo(
    () =>
      searching
        ? allRows.filter((r) => (r.page.path.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)) && keep(r))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allRows, q, searching, problemsOnly, mode, imagesByPage],
  );
  const openPage = openPath ? (pages.find((p) => p.path === openPath) ?? null) : null;
  const openRow = openPage ? allRows.find((r) => r.page.path === openPage.path) : undefined;
  const imageRow = imagePath ? (allRows.find((r) => r.page.path === imagePath) ?? null) : null;

  useEffect(() => {
    const target = focusAfter.current;
    if (!target) return;
    focusAfter.current = null;
    if (target === "back") backRef.current?.focus();
    else listRef.current?.querySelector<HTMLElement>(`[data-group="${target.group}"]`)?.focus();
  }, [level]);

  // Image list: focus the back button on open, the clicked row on close.
  useEffect(() => {
    if (imagePath) {
      imageBackRef.current?.focus();
      return;
    }
    const path = returnRow.current;
    if (!path) return;
    returnRow.current = null;
    Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-row]") ?? [])
      .find((n) => n.dataset.row === path)
      ?.focus();
  }, [imagePath]);

  // The sitewide wording list asks for a page's details: show Page SEO with that popup open.
  useEffect(() => {
    if (!openRequest || !pages.some((pg) => pg.path === openRequest.path)) return;
    setMode("pages");
    setLevel(null);
    setImagePath(null);
    setTrigger(null);
    setOpenPath(openRequest.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest]);

  const choose: OnSelect = (row, button) => {
    setTrigger(button);
    if (mode === "images") setImagePath(row.page.path);
    else setOpenPath(row.page.path);
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setLevel(null);
    setOpenPath(null);
    setImagePath(null);
  };

  const onSubTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = SUB_TABS[(SUB_TABS.findIndex((t) => t.key === mode) + (e.key === "ArrowRight" ? 1 : SUB_TABS.length - 1)) % SUB_TABS.length];
    switchMode(next.key);
    requestAnimationFrame(() => document.getElementById(`seo-sub-${next.key}`)?.focus());
  };

  const topRows = menu.filter((m) => (m.type === "page" ? keep(m.row) : m.rows.some(keep)));
  const groupRows = group ? group.rows.filter(keep) : [];

  const header = (
    <>
      <div role="tablist" aria-label="Audit sections" className="flex shrink-0 flex-wrap gap-x-1 border-b border-[color:var(--seo-border)] bg-[var(--seo-tabBarBg)] px-2 pt-1">
        {SUB_TABS.map((t) => {
          const on = mode === t.key;
          return (
            <button
              key={t.key}
              id={`seo-sub-${t.key}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="seo-sub-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => switchMode(t.key)}
              onKeyDown={onSubTabKey}
              className={`-mb-px min-h-11 rounded-t-lg border-b-[3px] px-4 text-sm transition-colors ${FOCUS} ${
                on ? "border-[color:var(--seo-orange)] bg-[var(--seo-cardBg)] font-bold text-[color:var(--seo-navy)]" : "border-transparent bg-transparent font-medium text-[color:var(--seo-tabText)] hover:text-[color:var(--seo-navy)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </>
  );

  // Status and redirects fills the card below the tabs.
  if (mode === "redirects") {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div id="seo-sub-panel" role="tabpanel" aria-labelledby={`seo-sub-${mode}`} className="flex min-h-0 flex-1 flex-col">
          {renderRedirects()}
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div id="seo-sub-panel" role="tabpanel" aria-labelledby={`seo-sub-${mode}`} className="p-3">
          <EmptyRow>No pages in this scan.</EmptyRow>
        </div>
      </div>
    );
  }

  // Image list of one page (Image SEO), replacing the menu in the same card.
  if (mode === "images" && imageRow) {
    const list = imgOf(imageRow);
    const bad = list.filter((i) => i.hasProblem).length;
    const backLabel = searching ? "Search results" : group ? group.name : "All pages";
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div id="seo-sub-panel" role="tabpanel" aria-labelledby="seo-sub-images" className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--seo-divider)] px-3 py-1">
            <button
              ref={imageBackRef}
              type="button"
              onClick={() => {
                returnRow.current = imageRow.page.path;
                setImagePath(null);
              }}
              className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-bold text-[color:var(--seo-navy)] hover:bg-[var(--seo-pageBg)] ${FOCUS}`}
            >
              <BackIcon />
              {backLabel}
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-[color:var(--seo-navy)]">{imageRow.name}</div>
              <div className="break-all text-xs text-[color:var(--seo-mutedText)]">
                <span className="font-mono">{imageRow.page.path}</span> - {plural(list.length, "image")} - {bad === 0 ? "all OK" : `${bad} to fix`}
              </div>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--seo-cardBg)]">
            <ImagePageList images={list} onEveryPage={onEveryPage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {header}
      <div id="seo-sub-panel" role="tabpanel" aria-labelledby={`seo-sub-${mode}`} className="flex min-h-0 flex-1 flex-col">
        {/* Search */}
        <div className="shrink-0 border-b border-[color:var(--seo-divider)] p-3">
          <label htmlFor="page-search" className="mb-1 block text-[13px] font-semibold text-[color:var(--seo-ink)]">
            Search pages
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--seo-mutedText)]">
              <IconSearch />
            </span>
            <input
              id="page-search"
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, e.g. chennai"
              autoComplete="off"
              className="min-h-11 w-full rounded-lg border border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] pl-10 pr-11 text-[15px] outline-none focus:border-[color:var(--seo-orange)] focus:outline-2 focus:outline-[color:var(--seo-orange)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className={`absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-lg text-[color:var(--seo-mutedText)] hover:text-[color:var(--seo-navy)] ${FOCUS}`}
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumb row */}
        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--seo-divider)] px-3 py-1">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2">
            {searching ? (
              <>
                <span className="text-sm font-bold text-[color:var(--seo-navy)]">Search results</span>
                <span className="text-[13px] text-[color:var(--seo-mutedText)]" aria-live="polite">
                  {results.length === 1 ? "1 match" : `${results.length} matches`}
                </span>
              </>
            ) : group ? (
              <>
                <button
                  ref={backRef}
                  type="button"
                  onClick={() => {
                    focusAfter.current = { group: group.id };
                    setLevel(null);
                  }}
                  className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-bold text-[color:var(--seo-navy)] hover:bg-[var(--seo-pageBg)] ${FOCUS}`}
                >
                  <BackIcon />
                  All pages
                </button>
                <span aria-hidden="true" className="text-[color:var(--seo-slashText)]">
                  /
                </span>
                <span className="text-sm font-bold text-[color:var(--seo-navy)]">{group.name}</span>
                <span className="text-[13px] text-[color:var(--seo-mutedText)]">{fixLine(group.rows)}</span>
              </>
            ) : (
              <>
                <span className="text-sm font-bold text-[color:var(--seo-navy)]">All pages</span>
                <span className="text-[13px] text-[color:var(--seo-mutedText)]">{fixLine(allRows)}</span>
              </>
            )}
          </div>
          <button
            type="button"
            aria-pressed={problemsOnly}
            onClick={() => setProblemsOnly((v) => !v)}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold ${FOCUS} ${
              problemsOnly ? "border-[color:var(--seo-orange)] bg-[var(--seo-toggleOnBg)] text-[color:var(--seo-ink)]" : "border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] text-[color:var(--seo-ink)]"
            }`}
          >
            <IconFilter className="h-3.5 w-3.5" />
            {problemsOnly ? "Problems only: on" : "Problems only"}
          </button>
        </div>

        {/* List */}
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto bg-[var(--seo-cardBg)]">
          {searching ? (
            results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[color:var(--seo-mutedText)]">No pages match that search.</p>
            ) : (
              <ul>
                {results.map((r) => (
                  <li key={r.page.path}>
                    <PageRow row={r} query={q} tag={rowTag(r)} onSelect={choose} />
                  </li>
                ))}
              </ul>
            )
          ) : group ? (
            groupRows.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[color:var(--seo-mutedText)]">{mode === "pages" ? "No pages with issues in this group." : "No pages with image problems in this group."}</p>
            ) : (
              <ul className="flex flex-col gap-2 px-5 py-2">
                {groupRows.map((r) => (
                  <li key={r.page.path}>
                    <PageCard row={r} tag={rowTag(r)} onSelect={choose} />
                  </li>
                ))}
              </ul>
            )
          ) : topRows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[color:var(--seo-mutedText)]">{mode === "pages" ? "No pages with issues." : "No pages with image problems."}</p>
          ) : (
            <ul>
              {topRows.map((item) => {
                if (item.type === "page") {
                  return (
                    <li key={item.row.page.path}>
                      <PageRow row={item.row} query="" tag={rowTag(item.row)} onSelect={choose} />
                    </li>
                  );
                }
                const groupImages = uniqueImages(item.rows);
                const bad = mode === "pages" ? item.rows.filter((r) => r.page.hasProblem).length : groupImages.filter((i) => i.hasProblem).length;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      data-group={item.id}
                      onClick={() => {
                        focusAfter.current = "back";
                        setLevel(item.id);
                      }}
                      className={`flex min-h-14 w-full items-center gap-3 border-b border-[color:var(--seo-divider)] bg-[var(--seo-cardBg)] px-4 py-2 text-left transition-colors hover:bg-[var(--seo-rowHover)] ${FOCUS}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-bold text-[color:var(--seo-navy)]">{item.name}</span>
                        <span className="block text-xs text-[color:var(--seo-subtleText)]">
                          {mode === "pages" ? plural(item.rows.length, "page") : `${plural(item.rows.length, "page")} - ${plural(groupImages.length, "image")}`}
                        </span>
                      </span>
                      {bad === 0 ? <Tag ok>All OK</Tag> : <Tag ok={false}>{`${bad} to fix`}</Tag>}
                      <Chevron />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {mode === "pages" && openPage && (
        <PageDetailModal
          page={openPage}
          name={openRow?.name}
          wording={wordingByPath.get(openPage.path) ?? []}
          returnFocusTo={trigger}
          onClose={() => setOpenPath(null)}
          onIgnore={onIgnore}
          onRestore={onRestore}
          markNote={markNote}
        />
      )}
    </div>
  );
}
