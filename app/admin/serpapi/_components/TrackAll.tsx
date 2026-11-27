"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, fieldClass } from "@/app/admin/rankings/_components/shared";
import GoogleView from "@/app/admin/serpapi/_components/GoogleView";
import { runTrackAll, type Before, type CallOutcome, type Change, type RowState, type RunSummary } from "@/app/admin/serpapi/_components/trackAllRun";
import { TRACKER_KEYWORDS } from "@/data/trackerKeywords";
import { LOCATIONS, SERP_RESERVE, type Depth, type Location, type QuotaInfo, type SerpResult } from "@/lib/rankings/types";

// "Track all keywords": runs the existing single-check route once per keyword, one at a time.
// Every call goes through that route's own quota guard and is saved to the history by it.

const KEYWORDS = TRACKER_KEYWORDS.map((k) => ({ label: k.label, value: k.value }));
const DEPTH_CHOICES: { value: Depth; label: string }[] = [
  { value: 1, label: "Top 10 (1 search each)" },
  { value: 2, label: "Top 20 (2 searches each)" },
];

type Prev = Record<string, { position: number | null; checkedAt: string; depth: number }>;

function Pill({ position }: { position: number | null }) {
  const tone = position === null ? "bg-slate-100 text-slate-600" : position <= 3 ? "bg-emerald-100 text-emerald-800" : position <= 10 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{position === null ? "Not found" : `#${position}`}</span>;
}

function ChangeCell({ change }: { change: Change }) {
  if (change.kind === "up") return <span className="font-semibold text-emerald-700">▲ {change.n}</span>;
  if (change.kind === "down") return <span className="font-semibold text-red-700">▼ {change.n}</span>;
  if (change.kind === "new") return <span className="font-semibold text-[#1B3A6B]">New</span>;
  if (change.kind === "dropped") return <span className="font-semibold text-red-700">Dropped out</span>;
  return <span className="text-slate-600">No change</span>;
}

const dash = <span className="text-slate-400">—</span>;

export default function TrackAll({
  quota,
  onRemaining,
  disabled,
  onRunningChange,
  onFinished,
}: {
  quota: QuotaInfo;
  onRemaining: (remaining: number) => void;
  disabled: boolean;
  onRunningChange: (running: boolean) => void;
  onFinished: () => void;
}) {
  const [location, setLocation] = useState<Location>(LOCATIONS[0]);
  const [depth, setDepth] = useState<Depth>(1);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState<RowState[]>(() => KEYWORDS.map(() => ({ status: "pending" })));
  const [current, setCurrent] = useState<number | null>(null);
  const [snapshot, setSnapshot] = useState<Prev>({});
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [runUsed, setRunUsed] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ remaining: number; needed: number } | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const runningRef = useRef(false); // synchronous guard against double clicks
  const cancelRef = useRef(false);
  const mountedRef = useRef(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const quotaRef = useRef(quota);
  quotaRef.current = quota;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelRef.current = true; // leaving the page stops the loop after the request in flight
    };
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (confirm && !d.open) d.showModal();
    if (!confirm && d.open) d.close();
  }, [confirm]);

  const setRow = useCallback((i: number, s: RowState) => {
    if (mountedRef.current) setRows((prev) => prev.map((r, j) => (j === i ? s : r)));
  }, []);

  const callRoute = useCallback(
    (loc: Location, d: Depth) => async (keyword: string): Promise<CallOutcome> => {
      const r = await api("/admin/rankings/serp", "POST", { keyword, location: loc, depth: d, keepReserve: true });
      if (r.ok) {
        return {
          ok: true,
          result: r.data.result as SerpResult,
          remainingAfter: r.data.remainingAfter as number,
          storageWarning: typeof r.data.storageWarning === "string" ? r.data.storageWarning : null,
        };
      }
      return {
        ok: false,
        status: r.status,
        error: r.data.error ?? "The check failed.",
        remaining: typeof r.data.remaining === "number" ? r.data.remaining : null,
        refused: r.data.refused === true,
      };
    },
    [],
  );

  async function fetchPrevious(loc: Location): Promise<Prev | null> {
    const r = await api(`/admin/rankings/history/latest?location=${encodeURIComponent(loc)}`, "GET");
    if (!r.ok) {
      setMessage(r.data.error ?? "Could not read the earlier checks, so nothing was started.");
      return null;
    }
    return (r.data.previous ?? {}) as Prev;
  }

  // Step 1: read the live balance and ask for confirmation. No search is made here.
  async function askToStart() {
    if (runningRef.current || disabled) return;
    runningRef.current = true; // blocks a second click while the balance is read
    setMessage(null);
    const q = await api("/admin/rankings/quota", "GET");
    runningRef.current = false;
    const remaining = q.ok && typeof q.data.remaining === "number" ? (q.data.remaining as number) : null;
    if (remaining === null) {
      setMessage(q.data.error ?? "The remaining SerpApi searches could not be read, so nothing was started.");
      return;
    }
    onRemaining(remaining);
    const needed = KEYWORDS.length * depth;
    if (remaining - needed < SERP_RESERVE) {
      setMessage(`Not enough searches for the whole run: it needs ${needed}, ${remaining} are left, and ${SERP_RESERVE} are kept for the weekly job. Nothing was started.`);
      return;
    }
    setConfirm({ remaining, needed });
  }

  // Step 2: "Yes, start". Snapshot Before first, then check keywords one at a time.
  async function start() {
    if (runningRef.current) return;
    runningRef.current = true;
    setConfirm(null);
    cancelRef.current = false;
    const prev = await fetchPrevious(location);
    if (prev === null) {
      runningRef.current = false;
      return;
    }
    const startRemaining = quotaRef.current.remaining;
    setSnapshot(prev);
    setStarted(true);
    setRunning(true);
    onRunningChange(true);
    setSummary(null);
    setRunUsed(null);
    setOpenIdx(null);
    setRows(KEYWORDS.map(() => ({ status: "pending" })));

    const before: Record<string, Before> = {};
    for (const k of KEYWORDS) before[k.value] = prev[k.value] ? { position: prev[k.value].position, depth: prev[k.value].depth } : null;

    const loc = location;
    const d = depth;
    const call = callRoute(loc, d);
    const s = await runTrackAll({
      keywords: KEYWORDS.map((k) => k.value),
      location: loc,
      depth: d,
      startRemaining,
      previous: before,
      call: async (kw) => {
        const out = await call(kw);
        return out;
      },
      shouldCancel: () => cancelRef.current,
      onRow: (i, st) => {
        if (st.status === "checking") if (mountedRef.current) setCurrent(i);
        setRow(i, st);
      },
    });
    if (!mountedRef.current) return;
    setCurrent(null);
    setSummary(s);
    if (s.remaining !== null) {
      onRemaining(s.remaining);
      if (startRemaining !== null) setRunUsed(Math.max(0, startRemaining - s.remaining));
    }
    setRunning(false);
    runningRef.current = false;
    onRunningChange(false);
    onFinished();
  }

  // A failed keyword is never retried automatically. This runs only when the button is clicked.
  async function retry(i: number) {
    if (runningRef.current || disabled) return;
    runningRef.current = true;
    cancelRef.current = false;
    setRunning(true);
    onRunningChange(true);
    const kw = KEYWORDS[i].value;
    const before: Record<string, Before> = { [kw]: snapshot[kw] ? { position: snapshot[kw].position, depth: snapshot[kw].depth } : null };
    const s = await runTrackAll({
      keywords: [kw],
      location,
      depth,
      startRemaining: quotaRef.current.remaining,
      previous: before,
      call: callRoute(location, depth),
      shouldCancel: () => cancelRef.current,
      onRow: (_j, st) => setRow(i, st),
    });
    if (!mountedRef.current) return;
    if (s.remaining !== null) onRemaining(s.remaining);
    if (s.ended === "refused" && s.refusalMessage) setMessage(s.refusalMessage);
    setRunning(false);
    runningRef.current = false;
    onRunningChange(false);
    onFinished();
  }

  const done = rows.filter((r) => r.status === "done") as Extract<RowState, { status: "done" }>[];
  const finishedCount = rows.filter((r) => r.status !== "pending" && r.status !== "checking").length;
  const limit = quota.limit;
  const used = limit !== null && quota.remaining !== null ? Math.max(0, limit - quota.remaining) : null;
  const depthNote = started && !running && KEYWORDS.some((k, i) => rows[i].status === "done" && snapshot[k.value] && snapshot[k.value].depth !== depth);
  const showTable = openIdx === null;
  const opened = openIdx !== null && rows[openIdx]?.status === "done" ? (rows[openIdx] as Extract<RowState, { status: "done" }>) : null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-[#1B3A6B]">Track all {KEYWORDS.length} keywords</h2>
      <p className="mt-1 text-xs text-slate-500">Checks each keyword on Google one at a time and compares with the last check for the same location.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr_1fr] md:items-end">
        <button
          ref={startBtnRef}
          type="button"
          onClick={() => void askToStart()}
          disabled={running || disabled}
          className="rounded-lg bg-[#F97316] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? "Tracking…" : `Track all ${KEYWORDS.length} keywords`}
        </button>
        <label className="block text-sm font-medium text-slate-700">
          Location
          <select className={`${fieldClass} mt-1`} value={location} onChange={(e) => setLocation(e.target.value as Location)} disabled={running || disabled}>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Depth
          <select className={`${fieldClass} mt-1`} value={depth} onChange={(e) => setDepth(Number(e.target.value) as Depth)} disabled={running || disabled}>
            {DEPTH_CHOICES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 text-sm text-slate-600" aria-live="polite">
        {used !== null && limit !== null ? (
          <>
            Searches used this month: <span className="font-semibold text-[#1B3A6B]">{used}</span> of {limit}.
          </>
        ) : quota.remaining !== null ? (
          <>
            Searches left this month: <span className="font-semibold text-[#1B3A6B]">{quota.remaining}</span>.
          </>
        ) : (
          <span className="text-red-700">{quota.error ?? "The remaining searches could not be read."}</span>
        )}{" "}
        A full run uses {KEYWORDS.length * depth} searches.
      </p>

      {message ? (
        <p className="mt-3 rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-4 py-3 text-sm text-slate-800" role="alert">
          {message}
        </p>
      ) : null}

      {running ? (
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-800" role="status">
              {current !== null ? `Checking ${current + 1} of ${KEYWORDS.length}: ${KEYWORDS[current].label}` : "Finishing…"}
            </p>
            <button
              type="button"
              onClick={() => {
                cancelRef.current = true;
                setMessage("Cancelling after the current keyword. Finished rows are kept.");
              }}
              className="rounded-lg border border-[#1B3A6B] px-4 py-1.5 text-sm font-semibold text-[#1B3A6B] hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8eef7]" role="progressbar" aria-valuemin={0} aria-valuemax={KEYWORDS.length} aria-valuenow={finishedCount} aria-label="Keywords checked">
            <div className="h-full bg-[#1B3A6B] transition-[width] motion-reduce:transition-none" style={{ width: `${(finishedCount / KEYWORDS.length) * 100}%` }} />
          </div>
        </div>
      ) : null}

      {summary ? (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">In top 3: {done.filter((r) => r.position !== null && r.position <= 3).length}</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">In top 10: {done.filter((r) => r.position !== null && r.position <= 10).length}</span>
            <span className="rounded-full border border-[#dde5f0] bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">Not found: {done.filter((r) => r.position === null).length}</span>
            <span className="rounded-full border border-[#dde5f0] bg-slate-50 px-3 py-1 text-xs font-semibold text-[#1B3A6B]">Searches used this run: {runUsed ?? "unknown"}</span>
          </div>
          {summary.ended !== "done" ? (
            <p className="mt-3 rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-4 py-3 text-sm text-slate-800" role="alert">
              {summary.ended === "cancelled" ? "Cancelled." : (summary.refusalMessage ?? "Stopped by the search guard.")} Not checked:{" "}
              {summary.notChecked.map((k) => KEYWORDS.find((x) => x.value === k)?.label ?? k).join(", ") || "none"}.
            </p>
          ) : null}
        </div>
      ) : null}

      {showTable ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-1 pr-4">Keyword</th>
                <th className="py-1 pr-4">Position now</th>
                <th className="py-1 pr-4">Before</th>
                <th className="py-1 pr-4">Change</th>
                <th className="py-1">Who is #1</th>
              </tr>
            </thead>
            <tbody>
              {KEYWORDS.map((k, i) => {
                const r = rows[i];
                const isDone = r.status === "done";
                const b = snapshot[k.value];
                return (
                  <tr key={k.value} className="border-t border-slate-100 align-top">
                    <td className="py-2 pr-4">
                      {isDone ? (
                        <button type="button" onClick={() => setOpenIdx(i)} className="text-left font-medium text-[#1B3A6B] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B]/40">
                          {k.label} <span aria-hidden="true">&gt;</span>
                        </button>
                      ) : (
                        <span className="font-medium text-slate-900">{k.label}</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      {r.status === "checking" ? (
                        <span className="text-slate-600">Checking…</span>
                      ) : r.status === "done" ? (
                        <Pill position={r.position} />
                      ) : r.status === "failed" ? (
                        <span className="text-red-700">
                          Failed, try again
                          <span className="mt-1 block text-xs text-slate-500">{r.error}</span>
                          <button
                            type="button"
                            onClick={() => void retry(i)}
                            disabled={running || disabled}
                            className="mt-1 rounded border border-[#1B3A6B] px-2 py-0.5 text-xs font-semibold text-[#1B3A6B] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Try again ({depth} {depth === 1 ? "search" : "searches"})
                          </button>
                        </span>
                      ) : r.status === "skipped" ? (
                        <span className="text-xs text-slate-500">{r.reason}</span>
                      ) : (
                        dash
                      )}
                    </td>
                    <td className="py-2 pr-4">{started && r.status !== "pending" && r.status !== "skipped" ? (b ? <Pill position={b.position} /> : dash) : dash}</td>
                    <td className="py-2 pr-4">{isDone ? <ChangeCell change={r.change} /> : dash}</td>
                    <td className="break-all py-2">{isDone ? r.topDomain ?? dash : dash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {depthNote ? <p className="mt-3 text-xs text-slate-500">Some earlier checks used a different depth. A Top 10 check cannot see positions 11 to 20, so Change can show New or Dropped out when only the depth differed.</p> : null}
        </div>
      ) : opened ? (
        <div className="mt-5">
          <button type="button" onClick={() => setOpenIdx(null)} className="rounded font-medium text-[#1B3A6B] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B]/40">
            &lt; Back to table
          </button>
          <h3 className="mt-3 break-words text-lg font-semibold text-[#1B3A6B]">{KEYWORDS[openIdx!].label}</h3>
          <p className="mb-3 mt-1 text-xs text-slate-500">
            {opened.result.location} · top {opened.result.depth * 10} · {opened.result.searchesUsed} {opened.result.searchesUsed === 1 ? "search" : "searches"} used
          </p>
          {opened.storageWarning ? <p className="mb-3 text-xs text-red-700">This result was not stored. {opened.storageWarning}</p> : null}
          <GoogleView serp={opened.result} />
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-labelledby="trackall-confirm-title"
        onClose={() => {
          setConfirm(null);
          startBtnRef.current?.focus();
        }}
        className="w-[calc(100%-2rem)] max-w-md rounded-xl border border-[#dde5f0] p-0 shadow-xl backdrop:bg-black/40"
      >
        {confirm ? (
          <div className="p-5">
            <h3 id="trackall-confirm-title" className="text-lg font-semibold text-[#1B3A6B]">
              Start tracking?
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              This will use {confirm.needed} searches ({KEYWORDS.length} x {depth}). You have {confirm.remaining} left this month, so {confirm.remaining - confirm.needed} will remain.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" autoFocus onClick={() => setConfirm(null)} className="rounded-lg border border-[#1B3A6B] px-4 py-2 text-sm font-semibold text-[#1B3A6B] hover:bg-slate-50">
                Cancel
              </button>
              <button type="button" onClick={() => void start()} className="rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Yes, start
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
