"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconFilter, IconSearch, IconX } from "./icons";
import PageDetailModal from "./PageDetailModal";
import { buildMenu, issueCount, type MenuItem, type TreeRow, type ViewPage } from "./pageTree";
import { EmptyRow } from "./ui";

export type { ViewPage } from "./pageTree";

interface Props {
  pages: ViewPage[];
  /** Host of the scanned site, shown in the header strip. */
  host: string;
  markNote?: { target: string; text: string } | null;
  onIgnore: (path: string, code: string) => void;
  onRestore: (path: string, code: string) => void;
}

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F97316]";

/** Highlights the matched letters of `query` inside `text` (case-insensitive). */
function Highlight({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-[#FFD9B3] px-0.5 text-inherit">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

function Tag({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${
        ok ? "bg-[#DDF3E4] text-[#0F4A22]" : "bg-[#FFE8D1] text-[#7A3300]"
      }`}
    >
      {children}
    </span>
  );
}

function PageTag({ page }: { page: ViewPage }) {
  const n = issueCount(page);
  return n === 0 ? <Tag ok>OK</Tag> : <Tag ok={false}>{`${n} ${n === 1 ? "issue" : "issues"}`}</Tag>;
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const fixLine = (rows: TreeRow[]) => {
  const bad = rows.filter((r) => r.page.hasProblem).length;
  return `${plural(rows.length, "page")} - ${bad === 0 ? "all OK" : `${bad} need fixing`}`;
};

type OnSelect = (row: TreeRow, button: HTMLButtonElement) => void;

/** Page row for the top level and for search results. */
function PageRow({ row, query, onSelect }: { row: TreeRow; query: string; onSelect: OnSelect }) {
  return (
    <button
      type="button"
      data-row={row.page.path}
      onClick={(e) => onSelect(row, e.currentTarget)}
      className={`flex min-h-14 w-full items-center gap-3 border-b border-[#EEF1F6] bg-white px-4 py-2 text-left transition-colors hover:bg-[#FFF4EA] ${FOCUS}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold text-[#1B3A6B]">
          <Highlight text={row.name} query={query} />
        </span>
        <span className="block break-all font-mono text-xs text-[#5A6478]">
          <Highlight text={row.page.path} query={query} />
        </span>
        {row.subtitle && <span className="block truncate text-[11px] text-[#6B7690]">{row.subtitle}</span>}
      </span>
      <PageTag page={row.page} />
    </button>
  );
}

/** Page card inside a group: grey card, no dividers. */
function PageCard({ row, onSelect }: { row: TreeRow; onSelect: OnSelect }) {
  return (
    <button
      type="button"
      data-row={row.page.path}
      onClick={(e) => onSelect(row, e.currentTarget)}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[10px] bg-[#EDEFF3] px-4 py-2 text-left transition-colors hover:bg-[#DFE3EA] ${FOCUS}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold text-[#1B3A6B]">{row.name}</span>
        <span className="block break-all font-mono text-xs text-[#5A6478]">{row.page.path}</span>
        {row.subtitle && <span className="block truncate text-[11px] text-[#6B7690]">{row.subtitle}</span>}
      </span>
      <PageTag page={row.page} />
    </button>
  );
}

export default function PageSeoTab({ pages, host, markNote, onIgnore, onRestore }: Props) {
  const [query, setQuery] = useState("");
  const [problemsOnly, setProblemsOnly] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // After a level change: refocus the group row we came from, or the back button we arrived at.
  const focusAfter = useRef<{ group: string } | "back" | null>(null);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const menu = useMemo(() => buildMenu(pages), [pages]);
  const allRows = useMemo(() => menu.flatMap((m) => (m.type === "page" ? [m.row] : m.rows)), [menu]);
  const group = level ? (menu.find((m): m is Extract<MenuItem, { type: "group" }> => m.type === "group" && m.id === level) ?? null) : null;
  const keep = (r: TreeRow) => !problemsOnly || r.page.hasProblem;

  const results = useMemo(
    () =>
      searching
        ? allRows.filter((r) => (r.page.path.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)) && (!problemsOnly || r.page.hasProblem))
        : [],
    [allRows, q, searching, problemsOnly],
  );
  const openPage = openPath ? (pages.find((p) => p.path === openPath) ?? null) : null;
  const openRow = openPage ? allRows.find((r) => r.page.path === openPage.path) : undefined;

  useEffect(() => {
    const target = focusAfter.current;
    if (!target) return;
    focusAfter.current = null;
    if (target === "back") backRef.current?.focus();
    else listRef.current?.querySelector<HTMLElement>(`[data-group="${target.group}"]`)?.focus();
  }, [level]);

  const choose: OnSelect = (row, button) => {
    setTrigger(button);
    setOpenPath(row.page.path);
  };

  if (pages.length === 0) return <EmptyRow>No pages in this scan.</EmptyRow>;

  const topRows = menu.filter((m) => (m.type === "page" ? keep(m.row) : m.rows.some(keep)));
  const groupRows = group ? group.rows.filter(keep) : [];

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header strip */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b-[3px] border-[#F97316] bg-[#1B3A6B] px-4 py-3">
        <h3 className="text-base font-bold text-white">Page SEO</h3>
        <span className="truncate text-xs text-[#C9D6EE]">{host}</span>
      </div>

      {/* Search */}
      <div className="shrink-0 border-b border-[#EEF1F6] p-3">
        <label htmlFor="page-search" className="mb-1 block text-[13px] font-semibold text-[#1A2233]">
          Search pages
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5670]">
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
            className="min-h-11 w-full rounded-lg border border-[#B8C2D6] bg-white pl-10 pr-11 text-[15px] outline-none focus:border-[#F97316] focus:outline-2 focus:outline-[#F97316]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              aria-label="Clear search"
              className={`absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-lg text-[#4A5670] hover:text-[#1B3A6B] ${FOCUS}`}
            >
              <IconX className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#EEF1F6] px-3 py-1">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2">
          {searching ? (
            <>
              <span className="text-sm font-bold text-[#1B3A6B]">Search results</span>
              <span className="text-[13px] text-[#4A5670]" aria-live="polite">
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
                className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-bold text-[#1B3A6B] hover:bg-[#F3F5F9] ${FOCUS}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                All pages
              </button>
              <span aria-hidden="true" className="text-[#8A94A8]">
                /
              </span>
              <span className="text-sm font-bold text-[#1B3A6B]">{group.name}</span>
              <span className="text-[13px] text-[#4A5670]">{fixLine(group.rows)}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-bold text-[#1B3A6B]">All pages</span>
              <span className="text-[13px] text-[#4A5670]">{fixLine(allRows)}</span>
            </>
          )}
        </div>
        <button
          type="button"
          aria-pressed={problemsOnly}
          onClick={() => setProblemsOnly((v) => !v)}
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold ${FOCUS} ${
            problemsOnly ? "border-[#F97316] bg-[#FFEBD9] text-[#1A2233]" : "border-[#B8C2D6] bg-white text-[#1A2233]"
          }`}
        >
          <IconFilter className="h-3.5 w-3.5" />
          {problemsOnly ? "Problems only: on" : "Problems only"}
        </button>
      </div>

      {/* List */}
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto bg-white">
        {searching ? (
          results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[#4A5670]">No pages match that search.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.page.path}>
                  <PageRow row={r} query={q} onSelect={choose} />
                </li>
              ))}
            </ul>
          )
        ) : group ? (
          groupRows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[#4A5670]">No pages with issues in this group.</p>
          ) : (
            <ul className="flex flex-col gap-2 px-5 py-2">
              {groupRows.map((r) => (
                <li key={r.page.path}>
                  <PageCard row={r} onSelect={choose} />
                </li>
              ))}
            </ul>
          )
        ) : topRows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[#4A5670]">No pages with issues.</p>
        ) : (
          <ul>
            {topRows.map((item) => {
              if (item.type === "page") {
                return (
                  <li key={item.row.page.path}>
                    <PageRow row={item.row} query="" onSelect={choose} />
                  </li>
                );
              }
              const bad = item.rows.filter((r) => r.page.hasProblem).length;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-group={item.id}
                    onClick={() => {
                      focusAfter.current = "back";
                      setLevel(item.id);
                    }}
                    className={`flex min-h-14 w-full items-center gap-3 border-b border-[#EEF1F6] bg-white px-4 py-2 text-left transition-colors hover:bg-[#FFF4EA] ${FOCUS}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold text-[#1B3A6B]">{item.name}</span>
                      <span className="block text-xs text-[#5A6478]">{plural(item.rows.length, "page")}</span>
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

      {openPage && (
        <PageDetailModal
          page={openPage}
          name={openRow?.name}
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
