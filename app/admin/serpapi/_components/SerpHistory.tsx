"use client";

import { useCallback, useEffect, useState } from "react";
import GoogleView from "@/app/admin/serpapi/_components/GoogleView";
import { api, when } from "@/app/admin/rankings/_components/shared";
import type { HistoryCheck, HistoryKeyword } from "@/lib/rankings/storage";
import type { SerpResult } from "@/lib/rankings/types";

// Past SerpApi checks as a 3-step drill-down: keywords, then one keyword's checks, then one check's results.
// Everything here reads saved data through /admin/rankings/history/*. It never starts a search.

type Load<T> = { state: "loading" } | { state: "error"; message: string } | { state: "ok"; data: T };

function Pill({ position }: { position: number | null }) {
  const tone =
    position === null ? "bg-slate-100 text-slate-600" : position <= 3 ? "bg-emerald-100 text-emerald-800" : position <= 10 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{position === null ? "Not found" : `#${position}`}</span>;
}

function Arrow() {
  return (
    <span aria-hidden="true" className="shrink-0 text-lg font-semibold text-[#1B3A6B]">
      &gt;
    </span>
  );
}

const rowClass =
  "flex w-full items-center justify-between gap-3 rounded-lg border border-[#dde5f0] bg-white px-4 py-3 text-left hover:bg-[#f1f5fa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B]/40";

function Status({ load, retry }: { load: Load<unknown>; retry: () => void }) {
  if (load.state === "loading") return <p className="mt-4 text-sm text-slate-600" role="status">Loading…</p>;
  if (load.state === "error")
    return (
      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
        {load.message}{" "}
        <button type="button" onClick={retry} className="font-semibold underline">
          Try again
        </button>
      </div>
    );
  return null;
}

export default function SerpHistory({ refreshKey }: { refreshKey: number }) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [checkId, setCheckId] = useState<number | null>(null);
  const [list, setList] = useState<Load<HistoryKeyword[]>>({ state: "loading" });
  const [checks, setChecks] = useState<Load<HistoryCheck[]>>({ state: "loading" });
  const [detail, setDetail] = useState<Load<{ checkedAt: string; result: SerpResult }>>({ state: "loading" });

  const loadList = useCallback(async () => {
    setList({ state: "loading" });
    const r = await api("/admin/rankings/history", "GET");
    setList(r.ok ? { state: "ok", data: r.data.keywords as HistoryKeyword[] } : { state: "error", message: r.data.error ?? "Could not load past checks." });
  }, []);

  const loadChecks = useCallback(async (kw: string) => {
    setChecks({ state: "loading" });
    const r = await api(`/admin/rankings/history/checks?keyword=${encodeURIComponent(kw)}`, "GET");
    setChecks(r.ok ? { state: "ok", data: r.data.checks as HistoryCheck[] } : { state: "error", message: r.data.error ?? "Could not load the checks for this keyword." });
  }, []);

  const loadDetail = useCallback(async (id: number) => {
    setDetail({ state: "loading" });
    const r = await api(`/admin/rankings/history/check?id=${id}`, "GET");
    setDetail(
      r.ok
        ? { state: "ok", data: r.data.check as { checkedAt: string; result: SerpResult } }
        : { state: "error", message: r.data.error ?? "Could not load this check." },
    );
  }, []);

  // A new check was saved above: go back to the keyword list and reload it.
  useEffect(() => {
    setKeyword(null);
    setCheckId(null);
    void loadList();
  }, [refreshKey, loadList]);

  const crumb = "font-medium text-[#1B3A6B] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B]/40 rounded";

  const breadcrumb = keyword ? (
    <nav aria-label="Breadcrumb" className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
      <button
        type="button"
        className={crumb}
        onClick={() => {
          setKeyword(null);
          setCheckId(null);
        }}
      >
        All keywords
      </button>
      <span aria-hidden="true">&gt;</span>
      {checkId === null ? (
        <span aria-current="page" className="break-all font-semibold text-slate-800">{keyword}</span>
      ) : (
        <button type="button" className={`${crumb} break-all`} onClick={() => setCheckId(null)}>
          {keyword}
        </button>
      )}
      {checkId !== null ? (
        <>
          <span aria-hidden="true">&gt;</span>
          <span aria-current="page" className="font-semibold text-slate-800">
            {detail.state === "ok" ? when(detail.data.checkedAt) : "Check"}
          </span>
        </>
      ) : null}
    </nav>
  ) : null;

  let body: React.ReactNode;
  if (keyword === null) {
    body =
      list.state !== "ok" ? (
        <Status load={list} retry={() => void loadList()} />
      ) : list.data.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">No checks yet. Run a check above.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {list.data.map((k) => (
            <li key={k.keyword}>
              <button
                type="button"
                className={rowClass}
                onClick={() => {
                  setKeyword(k.keyword);
                  setCheckId(null);
                  void loadChecks(k.keyword);
                }}
              >
                <span className="min-w-0">
                  <span className="block break-words text-sm font-semibold text-slate-900">{k.keyword}</span>
                  <span className="block text-xs text-slate-500">
                    {k.checks} {k.checks === 1 ? "check" : "checks"}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <Pill position={k.latestPosition} />
                  <Arrow />
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
  } else if (checkId === null) {
    body =
      checks.state !== "ok" ? (
        <Status load={checks} retry={() => void loadChecks(keyword)} />
      ) : checks.data.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">No checks yet. Run a check above.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {checks.data.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={rowClass}
                onClick={() => {
                  setCheckId(c.id);
                  void loadDetail(c.id);
                }}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900">{when(c.checkedAt)}</span>
                  <span className="block break-words text-xs text-slate-500">
                    {c.location ?? "–"} · {c.searchesUsed} {c.searchesUsed === 1 ? "search" : "searches"}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <Pill position={c.position} />
                  <Arrow />
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
  } else {
    body =
      detail.state !== "ok" ? (
        <Status load={detail} retry={() => void loadDetail(checkId)} />
      ) : (
        <div className="mt-4">
          <p className="mb-3 text-xs text-slate-500">
            {detail.data.result.location || "–"} · top {detail.data.result.depth * 10} · {detail.data.result.searchesUsed} {detail.data.result.searchesUsed === 1 ? "search" : "searches"} used
          </p>
          <GoogleView serp={detail.data.result} older notFoundText="not in checked results" />
        </div>
      );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-[#1B3A6B]">Past SerpApi checks</h2>
      <p className="mt-1 text-xs text-slate-500">Saved results only. Opening these uses no SerpApi searches.</p>
      {breadcrumb}
      {body}
    </section>
  );
}
