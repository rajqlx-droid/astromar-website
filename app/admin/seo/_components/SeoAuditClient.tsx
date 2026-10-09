"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { AuditIssue, BaseKey, ExpectedMark, IgnoredFlag, ScanEvent, ScanListItem, ScanResult } from "@/lib/seo-audit/types";
import { IconFilter, IconLock, IconPlay, IconSearch, IconSpinner } from "./icons";
import SeoTab, { type ViewPage } from "./SeoTab";
import RedirectsTab from "./RedirectsTab";
import SitePanels from "./SitePanels";
import WordingModal from "./WordingModal";
import StatusPills from "./StatusPills";
import { HIDDEN_PAGES } from "@/data/seoHiddenPages";
import { seoThemeVars } from "./theme";
import { formatShortDateTime } from "./ui";

type MarkBody =
  | { action: "expected-add"; url: string; reason?: string }
  | { action: "expected-remove"; url: string }
  | { action: "ignore-add"; url: string; flag: string }
  | { action: "ignore-remove"; url: string; flag: string };

const BASES: { key: BaseKey; label: string }[] = [
  { key: "local", label: "Localhost:3000" },
  { key: "live", label: "www.astromarfreezone.com" },
];

const PHASES = [
  "Reading robots.txt and sitemap",
  "Scanning pages",
  "Checking image sizes",
  "Checking status and redirects",
  "Saving to Supabase",
];
const INLINE_NEEDS_SUPABASE = "Needs Supabase to save this. Results are not saved on this machine.";
const EXPECTED_REASON = "Excluded from the sitemap on purpose";

interface Progress {
  phase: string;
  done: number;
  total: number;
  label?: string;
}

interface Props {
  scans: ScanListItem[];
  result: ScanResult | null;
  expected: ExpectedMark[];
  ignored: IgnoredFlag[];
  scanEnabled: boolean;
  loadError: string | null;
  adminEmail: string;
  devBypass: boolean;
  supabaseReady: boolean;
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export default function SeoAuditClient({ scans, result: savedResult, expected: expectedProp, ignored: ignoredProp, scanEnabled, loadError, adminEmail, devBypass, supabaseReady }: Props) {
  const router = useRouter();
  const [base, setBase] = useState<BaseKey>("local");
  const [unsaved, setUnsaved] = useState<ScanResult | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Set when a scan could not be saved only because Supabase is not set up (not an error).
  const [notConnected, setNotConnected] = useState(false);
  // Small inline message next to a Mark / Ignore button when Supabase is missing.
  const [markNote, setMarkNote] = useState<{ target: string; text: string } | null>(null);
  const [wordingOpen, setWordingOpen] = useState(false);
  const [wordingTrigger, setWordingTrigger] = useState<HTMLElement | null>(null);
  const [openRequest, setOpenRequest] = useState<{ path: string; seq: number } | null>(null);
  const [problemsOnly, setProblemsOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [expected, setExpected] = useState<Set<string>>(() => new Set(expectedProp.map((e) => e.url)));
  const [ignored, setIgnored] = useState<Set<string>>(() => new Set(ignoredProp.map((i) => `${i.url}|${i.flag}`)));

  const result = unsaved ?? savedResult;

  useEffect(() => {
    if (!markNote) return;
    const t = setTimeout(() => setMarkNote(null), 6000);
    return () => clearTimeout(t);
  }, [markNote]);

  // Save a mark to Supabase; roll the screen back if it fails.
  const saveMark = useCallback(async (body: MarkBody, revert: () => void) => {
    try {
      const res = await fetch("/admin/seo/marks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `HTTP ${res.status}`);
      }
    } catch (err) {
      revert();
      setError(`Could not save that change: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  const toggleExpected = useCallback(
    (path: string) => {
      if (!supabaseReady) {
        setMarkNote({ target: path, text: INLINE_NEEDS_SUPABASE });
        return;
      }
      const add = !expected.has(path);
      setExpected((prev) => {
        const next = new Set(prev);
        if (add) next.add(path);
        else next.delete(path);
        return next;
      });
      const revert = () =>
        setExpected((prev) => {
          const next = new Set(prev);
          if (add) next.delete(path);
          else next.add(path);
          return next;
        });
      void saveMark(add ? { action: "expected-add", url: path, reason: EXPECTED_REASON } : { action: "expected-remove", url: path }, revert);
    },
    [expected, saveMark, supabaseReady],
  );

  const setIgnoredFlag = useCallback(
    (path: string, code: string, ignore: boolean) => {
      const key = `${path}|${code}`;
      if (!supabaseReady) {
        setMarkNote({ target: key, text: INLINE_NEEDS_SUPABASE });
        return;
      }
      const apply = (on: boolean) =>
        setIgnored((prev) => {
          const next = new Set(prev);
          if (on) next.add(key);
          else next.delete(key);
          return next;
        });
      apply(ignore);
      void saveMark({ action: ignore ? "ignore-add" : "ignore-remove", url: path, flag: code }, () => apply(!ignore));
    },
    [saveMark, supabaseReady],
  );

  const runScan = useCallback(async () => {
    setRunning(true);
    setError(null);
    setProgress({ phase: PHASES[0], done: 0, total: 1 });
    try {
      const res = await fetch("/admin/seo/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ base }),
        cache: "no-store",
      });
      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Scan request failed (HTTP ${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let gotResult = false;
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ScanEvent;
          if (event.type === "progress") setProgress({ phase: event.phase, done: event.done, total: event.total, label: event.label });
          else if (event.type === "error") throw new Error(event.message);
          else if (event.type === "result") {
            gotResult = true;
            if (event.saved && event.data.id) {
              setUnsaved(null);
              router.push(`/admin/seo?scan=${event.data.id}`);
              router.refresh();
            } else {
              setUnsaved(event.data);
              if ((event.saveError ?? "").startsWith("Not saved (Supabase not set up")) {
                // Expected on a machine without Supabase: the header pill explains it.
                setNotConnected(true);
              } else {
                setError(`${event.saveError ?? "The scan was not saved."} Showing the results from this run only; they are lost on reload.`);
              }
            }
          }
        }
      }
      if (!gotResult) throw new Error("The scan ended without a result.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
      setProgress(null);
    }
  }, [base, router]);

  const signOut = useCallback(async () => {
    try {
      await createSupabaseBrowserClient().auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }, [router]);

  const q = query.trim().toLowerCase();

  const view = useMemo(() => {
    if (!result) return null;
    const matches = (...fields: (string | null | undefined)[]) => !q || fields.some((f) => f?.toLowerCase().includes(q));

    // Apply "Ignore this flag": ignored issues move out of the list and out of the counts.
    // Hidden pages (data/seoHiddenPages.ts) may still be in older saved scans: leave them out everywhere.
    const hidden = new Set(HIDDEN_PAGES);
    const pages: ViewPage[] = result.pages.filter((p) => !hidden.has(p.path)).map((p) => {
      const kept: AuditIssue[] = [];
      const hidden: AuditIssue[] = [];
      for (const issue of p.issues) {
        (issue.severity !== "good" && ignored.has(`${p.path}|${issue.code}`) ? hidden : kept).push(issue);
      }
      const real = kept.filter((i) => i.severity !== "good");
      return {
        ...p,
        issues: real.length ? real : [{ code: "good", severity: "good", text: "No problems found on this page." }],
        ignoredIssues: hidden,
        hasProblem: real.length > 0,
      };
    });

    const images = result.images.flatMap((i) => {
      const on = i.foundOn.filter((path) => !hidden.has(path));
      return i.foundOn.length > 0 && on.length === 0 ? [] : [{ ...i, foundOn: on }];
    });
    const wording = result.wording.filter((w) => !hidden.has(w.path));

    return {
      imagesNoAlt: images.filter((i) => i.alt === null).length,
      imagesEmptyAlt: images.filter((i) => i.alt !== null && i.alt.trim() === "").length,
      wordingAll: wording.length,
      wordingList: wording,
      allPages: pages,
      allImages: images,
      redirects: result.redirects.filter((r) => {
        const isProblem = r.severity !== "good" && !(r.result === "Live, not in sitemap" && expected.has(r.path));
        return (!problemsOnly || isProblem) && matches(r.path, r.location, r.result);
      }),
    };
  }, [result, problemsOnly, q, expected, ignored]);

  const phaseIndex = progress ? Math.max(0, PHASES.indexOf(progress.phase)) : 0;
  const pct = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  const noScanNotice = "No scan saved yet. Run a scan on your computer and it will appear here.";
  const showPicker = scans.length + (unsaved ? 1 : 0) > 1 || (supabaseReady && scans.length + (unsaved ? 1 : 0) >= 1);

  const panelClass = "flex min-h-0 flex-col overflow-hidden rounded-xl border border-[color:var(--seo-border)] bg-[var(--seo-cardBg)]";

  return (
    <div style={seoThemeVars} className="relative flex min-h-screen flex-col bg-[var(--seo-pageBg)] text-[color:var(--seo-ink)] min-[900px]:h-screen min-[900px]:min-h-[760px] min-[900px]:overflow-hidden">
      {/* Top bar */}
      <header className="relative z-20 shrink-0 bg-[var(--seo-navy)] text-[color:var(--seo-onNavy)]">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 min-[900px]:px-5">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3">
            <h1 className="text-xl font-bold">SEO Audit</h1>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[color:var(--seo-navyText)]">
              <IconLock />
              Astromar Logistics - Private admin
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPills devBypass={devBypass} notSaved={!supabaseReady || notConnected} />
            {!devBypass && (
              <button
                type="button"
                onClick={signOut}
                title={adminEmail}
                className="min-h-11 rounded-lg border border-[color:var(--seo-navyOutline)] px-4 text-sm font-semibold text-[color:var(--seo-navyTextBright)] transition-colors hover:bg-[var(--seo-whiteTint10)]"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 min-[900px]:flex-row min-[900px]:p-5">
        {/* Left: one card; its tabs live inside it */}
        <div className="flex min-w-0 flex-col min-[900px]:min-h-0 min-[900px]:flex-1">
          <div className={`h-[80vh] min-[900px]:h-auto min-[900px]:flex-1 ${panelClass}`}>
            {!result || !view ? (
              <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center">
                <h2 className="text-lg font-semibold text-[color:var(--seo-navy)]">No saved scan yet</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-[color:var(--seo-mutedText)]">
                  {scanEnabled
                    ? "Choose a site and click Run scan. Every URL from app/sitemap.ts is fetched (5 at a time), plus robots.txt, sitemap.xml, image sizes and the legacy redirect list. The result is saved to Supabase."
                    : noScanNotice}
                </p>
              </div>
            ) : (
              <SeoTab
                key={result.id ?? result.finishedAt}
                pages={view.allPages}
                images={view.allImages}
                markNote={markNote}
                onIgnore={(path, code) => setIgnoredFlag(path, code, true)}
                onRestore={(path, code) => setIgnoredFlag(path, code, false)}
                wording={view.wordingList}
                openRequest={openRequest}
                renderRedirects={() => (
                  <>
                    <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-[color:var(--seo-dividerSoft)] p-3">
                                              <button
                          type="button"
                          aria-pressed={problemsOnly}
                          onClick={() => setProblemsOnly((v) => !v)}
                          className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold ${
                            problemsOnly ? "border-[color:var(--seo-orange)] bg-[var(--seo-toggleOnBg)] text-[color:var(--seo-ink)]" : "border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] text-[color:var(--seo-ink)]"
                          }`}
                        >
                          <IconFilter />
                          {problemsOnly ? "Problems only: on" : "Problems only"}
                        </button>
                      <label className="relative flex min-w-0 flex-[1_1_220px] md:max-w-[380px]">
                        <span className="sr-only">Search</span>
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--seo-mutedText)]">
                          <IconSearch />
                        </span>
                        <input
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search URL, title or text"
                          className="min-h-11 w-full rounded-lg border border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] pl-10 pr-3 text-[15px] outline-none focus:border-[color:var(--seo-navy)] focus:ring-2 focus:ring-[color:var(--seo-navyRing20)]"
                        />
                      </label>
                      <div className="text-[13px] text-[color:var(--seo-mutedText)]" aria-live="polite">
                        {`${view.redirects.length} of ${result.redirects.length} URLs shown`}
                      </div>
                    </div>
                    <div className="min-h-0 flex-1 overflow-auto">
                      <RedirectsTab checks={view.redirects} baseUrl={result.baseUrl} expected={expected} />
                    </div>
                  </>
                )}
              />
            )}
          </div>
        </div>

        {/* Right: Scan and Site files */}
        <aside
          className="flex w-full min-w-0 flex-col gap-3 min-[900px]:min-h-0 min-[900px]:w-[264px] min-[900px]:flex-[0_0_264px] min-[900px]:overflow-y-auto"
          aria-label="Scan and site files"
        >
          <section className="shrink-0 rounded-xl border-b-4 border-[color:var(--seo-scanOrange)] bg-[var(--seo-navy)] p-3.5 text-[color:var(--seo-onNavy)]" aria-labelledby="scan-heading">
            <h2 id="scan-heading" className="text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--seo-navyText)]">
              {scanEnabled ? "Scan" : "Last scan"}
            </h2>
            {scanEnabled ? (
              <div className="mt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={runScan}
                  disabled={running}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--seo-scanOrange)] px-4 text-[15px] font-bold text-[color:var(--seo-onOrange)] transition-colors hover:bg-[var(--seo-scanOrangeHover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-onNavy)] disabled:cursor-wait disabled:opacity-80"
                >
                  {running ? <IconSpinner /> : <IconPlay />}
                  {running ? "Scanning..." : "Run scan"}
                </button>

                {running && progress && (
                  <div>
                    <div aria-live="polite" className="text-xs">
                      <span className="font-semibold text-[color:var(--seo-onNavy)]">
                        Step {phaseIndex + 1} of {PHASES.length}: {progress.phase}
                      </span>
                      <span className="block break-all text-[color:var(--seo-navyText)]">
                        {progress.done} of {progress.total}
                        {progress.label ? ` - ${progress.label}` : ""}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--seo-whiteTint20)]"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={pct}
                      aria-label="Scan progress"
                    >
                      <div className="h-full rounded-full bg-[var(--seo-orange)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                {loadError && (
                  <div role="alert" className="rounded-lg border border-[color:var(--seo-errorBorder)] bg-[var(--seo-errorBg)] px-3 py-2 text-xs text-[color:var(--seo-badText)]">
                    {loadError}
                  </div>
                )}
                {error && (
                  <div role="alert" className="rounded-lg border border-[color:var(--seo-errorBorder)] bg-[var(--seo-errorBg)] px-3 py-2 text-xs text-[color:var(--seo-badText)]">
                    {error}
                  </div>
                )}

                <div role="radiogroup" aria-label="Site to scan" className="flex overflow-hidden rounded-lg border border-[color:var(--seo-navyOutline)]">
                  {BASES.map((b) => {
                    const on = base === b.key;
                    return (
                      <button
                        key={b.key}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        disabled={running}
                        onClick={() => setBase(b.key)}
                        className={`min-h-11 flex-1 px-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[color:var(--seo-orange)] disabled:cursor-not-allowed ${
                          on ? "bg-[var(--seo-cardBg)] text-[color:var(--seo-navy)]" : "bg-transparent text-[color:var(--seo-onNavy)] hover:bg-[var(--seo-whiteTint10)]"
                        }`}
                      >
                        {b.key === "local" ? "Localhost" : "Live site"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {loadError && (
                  <div role="alert" className="mt-2 rounded-lg border border-[color:var(--seo-errorBorder)] bg-[var(--seo-errorBg)] px-3 py-2 text-xs text-[color:var(--seo-badText)]">
                    {loadError}
                  </div>
                )}
                {error && (
                  <div role="alert" className="mt-2 rounded-lg border border-[color:var(--seo-errorBorder)] bg-[var(--seo-errorBg)] px-3 py-2 text-xs text-[color:var(--seo-badText)]">
                    {error}
                  </div>
                )}
              </>
            )}

            {showPicker && result && (
              <label className="mt-3 flex flex-col gap-1">
                <span className="text-[11px] text-[color:var(--seo-navyText)]">Saved scan</span>
                <select
                  value={unsaved ? "" : (result.id ?? "")}
                  onChange={(e) => {
                    setUnsaved(null);
                    router.push(`/admin/seo?scan=${e.target.value}`);
                  }}
                  className="min-h-11 w-full rounded-lg border border-[color:var(--seo-onNavy)] bg-[var(--seo-cardBg)] px-2 text-[13px] text-[color:var(--seo-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
                >
                  {unsaved && <option value="">Unsaved scan from this run</option>}
                  {scans.map((s, i) => (
                    <option key={s.id} value={s.id}>
                      {formatShortDateTime(s.finishedAt)} - {s.pagesScanned} pages{i === 0 ? " (latest)" : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {result && (
              <p className={`mt-1.5 text-[11px] text-[color:var(--seo-navyText)] ${scanEnabled ? "font-mono" : "break-words"}`}>
                {hostOf(result.baseUrl)} - {scanEnabled ? "" : `${formatShortDateTime(result.finishedAt)} - `}
                {Math.round(result.durationMs / 1000)}s
              </p>
            )}

            {result && view && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { label: "Pages scanned", value: view.allPages.length, note: result.includeBlogPosts ? "from app/sitemap.ts" : "blog posts skipped", tint: false },
                  { label: "With issues", value: view.allPages.filter((p) => p.hasProblem).length, note: "Fix or Check items, ignored flags excluded", tint: true },
                  { label: "Images no alt", value: view.imagesNoAlt, note: `plus ${view.imagesEmptyAlt} with empty alt`, tint: false },
                  {
                    label: "Duplicate titles",
                    value: view.allPages.filter((p) => p.issues.some((i) => i.code === "title-duplicate")).length,
                    note: "pages sharing a title",
                    tint: false,
                  },
                ].map((s) => (
                  <div key={s.label} title={s.note} className={`rounded-lg px-2.5 py-2 ${s.tint ? "bg-[var(--seo-orangeTint30)]" : "bg-[var(--seo-whiteTint12)]"}`}>
                    <div className="text-xl font-bold leading-tight text-[color:var(--seo-onNavy)]">{s.value}</div>
                    <div className={`text-[11px] ${s.tint ? "text-[color:var(--seo-highlight)]" : "text-[color:var(--seo-navyText)]"}`}>{s.label}</div>
                  </div>
                ))}
                <button
                  type="button"
                  title="for review"
                  aria-label={`Wording matches: ${view.wordingAll}, view list`}
                  onClick={(e) => {
                    setWordingTrigger(e.currentTarget);
                    setWordingOpen(true);
                  }}
                  className="col-span-2 flex min-h-11 items-center justify-between gap-2 rounded-lg bg-[var(--seo-whiteTint12)] px-2.5 py-2 text-left transition-colors hover:bg-[var(--seo-whiteTint20)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
                >
                  <span className="text-[11px] text-[color:var(--seo-navyText)]">Wording matches</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-xl font-bold leading-tight text-[color:var(--seo-onNavy)]">{view.wordingAll}</span>
                    <span className="text-[11px] font-semibold text-[color:var(--seo-navyText)]">View</span>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5" style={{ stroke: "var(--seo-navyText)" }}>
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
            {!scanEnabled && (
              <p className="mt-3 text-[11px] leading-snug text-[color:var(--seo-navyText)]">
                {result ? "Scans run on your computer. Results appear here after each scan." : noScanNotice}
              </p>
            )}
          </section>

          {result ? (
            <SitePanels robots={result.robots} sitemap={result.sitemap} expected={expected} onToggleExpected={toggleExpected} inlineNote={markNote} />
          ) : (
            <section className="shrink-0 rounded-xl border border-[color:var(--seo-tintBorder)] bg-[var(--seo-tintBg)] p-3.5" aria-labelledby="files-heading">
              <h2 id="files-heading" className="text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--seo-navy)]">
                Site files
              </h2>
              <p className="mt-2 text-xs text-[color:var(--seo-mutedText)]">Run a scan to see robots.txt and the sitemap check.</p>
            </section>
          )}
        </aside>
      </div>
      {wordingOpen && view && (
        <WordingModal
          matches={view.wordingList}
          returnFocusTo={wordingTrigger}
          onClose={() => setWordingOpen(false)}
          onOpenPage={(path) => {
            setWordingOpen(false);
            setOpenRequest((prev) => ({ path, seq: (prev?.seq ?? 0) + 1 }));
          }}
        />
      )}
    </div>
  );
}
