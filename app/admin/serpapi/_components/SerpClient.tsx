"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import KeywordCombobox from "@/app/admin/rankings/_components/KeywordCombobox";
import { api, fieldClass, when } from "@/app/admin/rankings/_components/shared";
import {
  DEPTHS,
  LOCATIONS,
  type Depth,
  type Location,
  type QuotaInfo,
  type RecentCheck,
  type SavedKeyword,
  type SerpResult,
} from "@/lib/rankings/types";

type Busy = null | "serp" | "save";

export default function SerpClient({
  initialQuota,
  initialSaved,
  initialRecent,
  dbMessage,
}: {
  initialQuota: QuotaInfo;
  initialSaved: SavedKeyword[];
  initialRecent: RecentCheck[];
  dbMessage: string | null;
}) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState<Location>(LOCATIONS[0]);
  const [depth, setDepth] = useState<Depth>(1);
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [serp, setSerp] = useState<SerpResult | null>(null);
  const [quota, setQuota] = useState<QuotaInfo>(initialQuota);
  const [saved, setSaved] = useState<SavedKeyword[]>(initialSaved);
  const [recent, setRecent] = useState<RecentCheck[]>(initialRecent);

  const running = busy !== null;
  const remaining = quota.remaining;
  const quotaUnknown = remaining === null;
  const notEnough = remaining !== null && remaining < depth;
  const recentSerp = recent.filter((r) => r.source === "serpapi");

  const refreshLists = useCallback(async () => {
    const r = await api("/admin/rankings/saved", "GET");
    if (r.ok) {
      setSaved(r.data.saved as SavedKeyword[]);
      setRecent(r.data.recent as RecentCheck[]);
    }
  }, []);

  async function checkCompetitors() {
    if (running) return;
    setBusy("serp");
    setError(null);
    setNotice(null);
    const r = await api("/admin/rankings/serp", "POST", { keyword, location, depth });
    if (r.ok) {
      setSerp(r.data.result as SerpResult);
      setQuota((q) => ({ ...q, remaining: r.data.remainingAfter as number, error: undefined }));
      if (typeof r.data.storageWarning === "string") setNotice(`The result was not stored. ${r.data.storageWarning}`);
      void refreshLists();
    } else {
      setSerp(null);
      setError(r.data.error ?? "The check failed.");
      if (typeof r.data.remaining === "number") setQuota((q) => ({ ...q, remaining: r.data.remaining as number }));
    }
    setBusy(null);
  }

  async function toggleCompetitors(id: string, on: boolean) {
    if (running) return;
    setBusy("save");
    setError(null);
    const r = await api("/admin/rankings/saved", "PATCH", { id, trackCompetitors: on });
    if (!r.ok) setError(r.data.error ?? "Could not update the keyword.");
    await refreshLists();
    setBusy(null);
  }

  return (
    <div className="mt-8 space-y-8">
      <form
        className="rounded-xl border border-slate-200 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          void checkCompetitors();
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1.2fr_1fr_auto] md:items-end">
          <KeywordCombobox label="Keyword" value={keyword} onChange={setKeyword} savedKeywords={saved.map((s) => s.keyword)} disabled={running} maxLength={200} placeholder="for example: ftwz in india" />
          <label className="block text-sm font-medium text-slate-700">
            Location
            <select className={`${fieldClass} mt-1`} value={location} onChange={(e) => setLocation(e.target.value as Location)} disabled={running}>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Depth
            <select className={`${fieldClass} mt-1`} value={depth} onChange={(e) => setDepth(Number(e.target.value) as Depth)} disabled={running}>
              {DEPTHS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label} ({d.value} {d.value === 1 ? "search" : "searches"})
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={running || notEnough || quotaUnknown || keyword.trim().length < 2}
            className="rounded-lg bg-[#F97316] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "serp" ? "Checking…" : "Check competitors"}
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-600" aria-live="polite">
          This check will use {depth} SerpApi {depth === 1 ? "search" : "searches"}.{" "}
          {quotaUnknown ? (
            <span className="font-medium text-red-700">{quota.error ?? "The remaining searches could not be read."}</span>
          ) : (
            <span className={notEnough ? "font-semibold text-red-700" : "font-medium text-[#1B3A6B]"}>
              {remaining} {remaining === 1 ? "search" : "searches"} left this month{quota.limit ? ` (of ${quota.limit})` : ""}.
            </span>
          )}
          {notEnough ? " That is not enough for this depth, so the check will be refused." : ""}
        </p>
      </form>

      {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{notice}</p> : null}
      {dbMessage ? <p className="rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-4 py-3 text-sm text-slate-800">{dbMessage}</p> : null}

      {serp ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-[#1B3A6B]">Google results: &ldquo;{serp.keyword}&rdquo;</h2>
          <p className="mt-1 text-xs text-slate-500">
            {serp.location} · google.co.in · top {serp.depth * 10} · {serp.searchesUsed} {serp.searchesUsed === 1 ? "search" : "searches"} used
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-800">
            {serp.firstMatchPosition !== null ? (
              <>
                astromarfreezone.com first appears at position <span className="text-[#F97316]">{serp.firstMatchPosition}</span>.
              </>
            ) : (
              <>Not in the top {serp.depth * 10}.</>
            )}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">Position</th>
                  <th className="py-1 pr-4">Result</th>
                  <th className="py-1">Domain</th>
                </tr>
              </thead>
              <tbody>
                {serp.rows.map((row) => (
                  <tr key={row.link} className={`border-t border-slate-100 ${row.isOurs ? "bg-[#F97316]/10 font-semibold" : ""}`}>
                    <td className="py-1.5 pr-4 align-top">{row.position}</td>
                    <td className="py-1.5 pr-4 align-top">
                      <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-[#1B3A6B] hover:underline">
                        {row.title}
                      </a>
                      <span className="block break-all text-xs font-normal text-slate-500">{row.link}</span>
                    </td>
                    <td className="py-1.5 align-top">{row.domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {serp.rows.length === 0 ? <p className="mt-3 text-sm text-slate-600">Google returned no results for this search.</p> : null}
        </section>
      ) : null}

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Competitor tracking for saved keywords</h2>
        <p className="mt-1 text-xs text-slate-500">
          Every Monday the weekly job uses one SerpApi search per ten results for each keyword switched on here, using its saved location and depth. Keywords are saved on the{" "}
          <Link href="/admin/gsc" className="font-medium text-[#1B3A6B] hover:underline">
            GSC tracking
          </Link>{" "}
          page.
        </p>
        {saved.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No saved keywords yet. Save one on the GSC tracking page first.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1 pr-4">Location</th>
                  <th className="py-1 pr-4">Depth</th>
                  <th className="py-1 pr-4">Competitor tracking</th>
                  <th className="py-1">Last checked</th>
                </tr>
              </thead>
              <tbody>
                {saved.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="py-1.5 pr-4">{s.keyword}</td>
                    <td className="py-1.5 pr-4">{s.location}</td>
                    <td className="py-1.5 pr-4">
                      Top {s.depth * 10} ({s.depth} {s.depth === 1 ? "search" : "searches"})
                    </td>
                    <td className="py-1.5 pr-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={s.track_competitors} disabled={running} onChange={(e) => void toggleCompetitors(s.id, e.target.checked)} />
                        {s.track_competitors ? "On" : "Off"}
                      </label>
                    </td>
                    <td className="py-1.5">{s.last_checked_at ? when(s.last_checked_at) : "Not yet"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Recent SerpApi checks</h2>
        {recentSerp.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No checks stored yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">When</th>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1 pr-4">Location</th>
                  <th className="py-1 pr-4">Result</th>
                  <th className="py-1">Searches used</th>
                </tr>
              </thead>
              <tbody>
                {recentSerp.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="whitespace-nowrap py-1.5 pr-4">{when(r.checked_at)}</td>
                    <td className="py-1.5 pr-4">{r.keyword}</td>
                    <td className="py-1.5 pr-4">{r.location ?? "–"}</td>
                    <td className="py-1.5 pr-4">{r.first_match === null ? "Not in the checked results" : `Position ${r.first_match}`}</td>
                    <td className="py-1.5">{r.searches_used}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
