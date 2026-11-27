"use client";

import { useCallback, useState } from "react";
import {
  DEPTHS,
  LOCATIONS,
  type Depth,
  type GscResult,
  type Location,
  type QuotaInfo,
  type RecentCheck,
  type SavedKeyword,
  type SerpResult,
} from "@/lib/rankings/types";
import GscChart from "./GscChart";

type Busy = null | "gsc" | "serp" | "save";

interface ApiReply {
  error?: string;
  [key: string]: unknown;
}

async function api(url: string, method: "GET" | "POST" | "PATCH" | "DELETE", body?: unknown): Promise<{ ok: boolean; status: number; data: ApiReply }> {
  try {
    const res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({ error: `Unexpected response (HTTP ${res.status}).` }))) as ApiReply;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: { error: "Could not reach the server." } };
  }
}

// Fixed locale and time zone so the server render and the browser render identical text.
const whenFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true });
const when = (v: string) => whenFormat.format(new Date(v));

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 disabled:opacity-60";

export default function TrackerClient({
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
  const [serpError, setSerpError] = useState<string | null>(null);
  const [gsc, setGsc] = useState<GscResult | null>(null);
  const [serp, setSerp] = useState<SerpResult | null>(null);
  const [quota, setQuota] = useState<QuotaInfo>(initialQuota);
  const [saved, setSaved] = useState<SavedKeyword[]>(initialSaved);
  const [recent, setRecent] = useState<RecentCheck[]>(initialRecent);
  const [trackCompetitors, setTrackCompetitors] = useState(false);

  const running = busy !== null;
  const remaining = quota.remaining;
  const notEnough = remaining !== null && remaining < depth;
  const quotaUnknown = remaining === null;

  const refreshLists = useCallback(async () => {
    const r = await api("/admin/rankings/saved", "GET");
    if (r.ok) {
      setSaved(r.data.saved as SavedKeyword[]);
      setRecent(r.data.recent as RecentCheck[]);
    }
  }, []);

  async function track() {
    if (running) return;
    setBusy("gsc");
    setError(null);
    setNotice(null);
    setSerpError(null);
    setSerp(null);
    const r = await api("/admin/rankings/gsc", "POST", { keyword });
    if (r.ok) {
      setGsc(r.data.result as GscResult);
      if (typeof r.data.storageWarning === "string") setNotice(`The result was not stored. ${r.data.storageWarning}`);
      void refreshLists();
    } else {
      setGsc(null);
      setError(r.data.error ?? "The check failed.");
    }
    setBusy(null);
  }

  async function checkCompetitors() {
    if (running || !gsc) return;
    setBusy("serp");
    setSerpError(null);
    setNotice(null);
    const r = await api("/admin/rankings/serp", "POST", { keyword: gsc.keyword, location, depth });
    if (r.ok) {
      setSerp(r.data.result as SerpResult);
      setQuota((q) => ({ ...q, remaining: r.data.remainingAfter as number, error: undefined }));
      if (typeof r.data.storageWarning === "string") setNotice(`The result was not stored. ${r.data.storageWarning}`);
      void refreshLists();
    } else {
      setSerp(null);
      setSerpError(r.data.error ?? "The check failed.");
      if (typeof r.data.remaining === "number") setQuota((q) => ({ ...q, remaining: r.data.remaining as number }));
    }
    setBusy(null);
  }

  async function saveKeyword() {
    if (running || !gsc) return;
    setBusy("save");
    setNotice(null);
    const r = await api("/admin/rankings/saved", "POST", { keyword: gsc.keyword, location, depth, trackCompetitors });
    if (r.ok) setNotice(`Saved "${gsc.keyword}" to weekly tracking.`);
    else setError(r.data.error ?? "Could not save the keyword.");
    await refreshLists();
    setBusy(null);
  }

  async function updateSaved(id: string, patch: { trackCompetitors?: boolean; active?: boolean }) {
    if (running) return;
    setBusy("save");
    const r = await api("/admin/rankings/saved", "PATCH", { id, ...patch });
    if (!r.ok) setError(r.data.error ?? "Could not update the keyword.");
    await refreshLists();
    setBusy(null);
  }

  async function removeSaved(id: string) {
    if (running) return;
    setBusy("save");
    const r = await api("/admin/rankings/saved", "DELETE", { id });
    if (!r.ok) setError(r.data.error ?? "Could not remove the keyword.");
    await refreshLists();
    setBusy(null);
  }

  const alreadySaved = gsc ? saved.some((s) => s.keyword === gsc.keyword && s.location === location) : false;

  return (
    <div className="mt-8 space-y-8">
      {/* Search bar */}
      <form
        className="rounded-xl border border-slate-200 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          void track();
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1.2fr_1fr_auto] md:items-end">
          <label className="block text-sm font-medium text-slate-700">
            Keyword
            <input className={`${field} mt-1`} value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={200} placeholder="for example: ftwz in india" disabled={running} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Location
            <select className={`${field} mt-1`} value={location} onChange={(e) => setLocation(e.target.value as Location)} disabled={running}>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Depth
            <select className={`${field} mt-1`} value={depth} onChange={(e) => setDepth(Number(e.target.value) as Depth)} disabled={running}>
              {DEPTHS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label} ({d.value} {d.value === 1 ? "search" : "searches"})
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={running || keyword.trim().length < 2}
            className="rounded-lg bg-[#1B3A6B] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "gsc" ? "Tracking…" : "Track"}
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-600" aria-live="polite">
          Track uses Search Console and costs no searches. Checking competitors will use {depth} SerpApi {depth === 1 ? "search" : "searches"}.{" "}
          {quotaUnknown ? (
            <span className="font-medium text-red-700">{quota.error ?? "The remaining searches could not be read."}</span>
          ) : (
            <span className={notEnough ? "font-semibold text-red-700" : "font-medium text-[#1B3A6B]"}>
              {remaining} {remaining === 1 ? "search" : "searches"} left this month{quota.limit ? ` (of ${quota.limit})` : ""}.
            </span>
          )}
          {notEnough ? " That is not enough for this depth, so the competitor check will be refused." : ""}
        </p>
      </form>

      {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{notice}</p> : null}
      {dbMessage ? <p className="rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-4 py-3 text-sm text-slate-800">{dbMessage}</p> : null}

      {/* Layer A: Search Console */}
      {gsc ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-[#1B3A6B]">Search Console: &ldquo;{gsc.keyword}&rdquo;</h2>
          <p className="mt-1 text-xs text-slate-500">
            {gsc.startDate} to {gsc.endDate} (28 days, ending 3 days ago because Search Console data is 2 to 3 days behind). Includes queries that contain the keyword.
          </p>
          {gsc.hasData ? (
            <>
              <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Tile label="Average position" value={gsc.avgPosition === null ? "–" : String(gsc.avgPosition)} />
                <Tile label="Impressions" value={gsc.impressions.toLocaleString("en-IN")} />
                <Tile label="Clicks" value={gsc.clicks.toLocaleString("en-IN")} />
                <Tile label="Page that ranked" value={gsc.pages[0]?.page.replace("https://www.astromarfreezone.com", "") || "–"} small />
              </div>
              {gsc.pages.length > 1 ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase text-slate-500">
                      <tr>
                        <th className="py-1 pr-4">Page</th>
                        <th className="py-1 pr-4">Clicks</th>
                        <th className="py-1 pr-4">Impressions</th>
                        <th className="py-1">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gsc.pages.map((p) => (
                        <tr key={p.page} className="border-t border-slate-100">
                          <td className="py-1.5 pr-4 break-all">{p.page.replace("https://www.astromarfreezone.com", "") || "/"}</td>
                          <td className="py-1.5 pr-4">{p.clicks}</td>
                          <td className="py-1.5 pr-4">{p.impressions}</td>
                          <td className="py-1.5">{p.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              <div className="mt-6">
                <GscChart daily={gsc.daily} />
              </div>
            </>
          ) : (
            <p className="mt-4 rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-700">Your site hasn&apos;t appeared for this keyword yet</p>
          )}

          {/* Actions on this result */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => void checkCompetitors()}
              disabled={running || notEnough || quotaUnknown}
              className="rounded-lg bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "serp" ? "Checking…" : `Check competitors (${depth} ${depth === 1 ? "search" : "searches"})`}
            </button>
            <button
              type="button"
              onClick={() => void saveKeyword()}
              disabled={running || !!dbMessage}
              className="rounded-lg border border-[#1B3A6B] px-5 py-2.5 text-sm font-semibold text-[#1B3A6B] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {alreadySaved ? "Update weekly tracking" : "Save to weekly tracking"}
            </button>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={trackCompetitors} onChange={(e) => setTrackCompetitors(e.target.checked)} disabled={running} />
              Competitor tracking (uses SerpApi searches each week)
            </label>
          </div>
          {serpError ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{serpError}</p> : null}
        </section>
      ) : null}

      {/* Layer B: SerpApi */}
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

      {/* Saved keywords */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Saved for weekly tracking</h2>
        <p className="mt-1 text-xs text-slate-500">Re-checked every Monday. Search Console always; SerpApi only where competitor tracking is on.</p>
        {saved.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No saved keywords yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1 pr-4">Location</th>
                  <th className="py-1 pr-4">Depth</th>
                  <th className="py-1 pr-4">Competitor tracking</th>
                  <th className="py-1 pr-4">Last checked</th>
                  <th className="py-1" />
                </tr>
              </thead>
              <tbody>
                {saved.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="py-1.5 pr-4">{s.keyword}</td>
                    <td className="py-1.5 pr-4">{s.location}</td>
                    <td className="py-1.5 pr-4">Top {s.depth * 10}</td>
                    <td className="py-1.5 pr-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={s.track_competitors} disabled={running} onChange={(e) => void updateSaved(s.id, { trackCompetitors: e.target.checked })} />
                        {s.track_competitors ? `On (${s.depth}/week)` : "Off"}
                      </label>
                    </td>
                    <td className="py-1.5 pr-4">{s.last_checked_at ? when(s.last_checked_at) : "Not yet"}</td>
                    <td className="py-1.5 text-right">
                      <button type="button" disabled={running} onClick={() => void removeSaved(s.id)} className="text-sm font-medium text-[#1B3A6B] hover:underline disabled:opacity-50">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent checks */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Recent checks</h2>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No checks stored yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">When</th>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1 pr-4">Source</th>
                  <th className="py-1 pr-4">Result</th>
                  <th className="py-1">Searches used</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="py-1.5 pr-4 whitespace-nowrap">{when(r.checked_at)}</td>
                    <td className="py-1.5 pr-4">{r.keyword}</td>
                    <td className="py-1.5 pr-4">{r.source === "gsc" ? "Search Console" : `SerpApi${r.location ? ` (${r.location})` : ""}`}</td>
                    <td className="py-1.5 pr-4">
                      {r.source === "gsc"
                        ? r.avg_position === null
                          ? "No data"
                          : `Avg position ${r.avg_position}`
                        : r.first_match === null
                          ? "Not in the checked results"
                          : `Position ${r.first_match}`}
                    </td>
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

function Tile({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-bold text-[#1B3A6B] ${small ? "break-all text-base" : "text-2xl"}`}>{value}</p>
    </div>
  );
}
