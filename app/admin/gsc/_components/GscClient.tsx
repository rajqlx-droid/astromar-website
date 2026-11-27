"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import KeywordCombobox from "@/app/admin/rankings/_components/KeywordCombobox";
import GscChart from "@/app/admin/rankings/_components/GscChart";
import { Tile, api, when } from "@/app/admin/rankings/_components/shared";
import type { GscResult, RecentCheck, SavedKeyword } from "@/lib/rankings/types";

type Busy = null | "gsc" | "save";

export default function GscClient({
  initialSaved,
  initialRecent,
  dbMessage,
}: {
  initialSaved: SavedKeyword[];
  initialRecent: RecentCheck[];
  dbMessage: string | null;
}) {
  const [keyword, setKeyword] = useState("");
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [gsc, setGsc] = useState<GscResult | null>(null);
  const [saved, setSaved] = useState<SavedKeyword[]>(initialSaved);
  const [recent, setRecent] = useState<RecentCheck[]>(initialRecent);

  const running = busy !== null;
  const recentGsc = recent.filter((r) => r.source === "gsc");
  const alreadySaved = gsc ? saved.some((s) => s.keyword === gsc.keyword) : false;

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

  async function saveKeyword() {
    if (running || !gsc) return;
    setBusy("save");
    setNotice(null);
    // Search Console has no location or depth, so new saved keywords start at India, Top 10, competitor tracking off.
    const r = await api("/admin/rankings/saved", "POST", { keyword: gsc.keyword, location: "India", depth: 1, trackCompetitors: false });
    if (r.ok) setNotice(`Saved "${gsc.keyword}" for weekly tracking.`);
    else setError(r.data.error ?? "Could not save the keyword.");
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

  return (
    <div className="mt-8 space-y-8">
      <form
        className="rounded-xl border border-slate-200 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          void track();
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <KeywordCombobox label="Keyword" value={keyword} onChange={setKeyword} savedKeywords={saved.map((s) => s.keyword)} disabled={running} maxLength={200} placeholder="for example: ftwz in india" />
          <button
            type="submit"
            disabled={running || keyword.trim().length < 2}
            className="rounded-lg bg-[#1B3A6B] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "gsc" ? "Tracking…" : "Track"}
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-600">Search Console data is free and uses no SerpApi searches.</p>
      </form>

      {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{notice}</p> : null}
      {dbMessage ? <p className="rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-4 py-3 text-sm text-slate-800">{dbMessage}</p> : null}

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
                          <td className="break-all py-1.5 pr-4">{p.page.replace("https://www.astromarfreezone.com", "") || "/"}</td>
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

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => void saveKeyword()}
              disabled={running || !!dbMessage || alreadySaved}
              className="rounded-lg border border-[#1B3A6B] px-5 py-2.5 text-sm font-semibold text-[#1B3A6B] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "save" ? "Saving…" : alreadySaved ? "Already saved" : "Save for weekly tracking"}
            </button>
            <Link href="/admin/serpapi" className="text-sm font-medium text-[#1B3A6B] hover:underline">
              Compare with Google results on SerpApi tracking
            </Link>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Saved for weekly tracking</h2>
        <p className="mt-1 text-xs text-slate-500">
          Re-checked every Monday in Search Console. To also compare Google results for a keyword, turn on competitor tracking on the{" "}
          <Link href="/admin/serpapi" className="font-medium text-[#1B3A6B] hover:underline">
            SerpApi tracking
          </Link>{" "}
          page.
        </p>
        {saved.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No saved keywords yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1 pr-4">Last checked</th>
                  <th className="py-1" />
                </tr>
              </thead>
              <tbody>
                {saved.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="py-1.5 pr-4">{s.keyword}</td>
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

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-[#1B3A6B]">Recent Search Console checks</h2>
        {recentGsc.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No checks stored yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-1 pr-4">When</th>
                  <th className="py-1 pr-4">Keyword</th>
                  <th className="py-1">Result</th>
                </tr>
              </thead>
              <tbody>
                {recentGsc.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="whitespace-nowrap py-1.5 pr-4">{when(r.checked_at)}</td>
                    <td className="py-1.5 pr-4">{r.keyword}</td>
                    <td className="py-1.5">{r.avg_position === null ? "No data" : `Avg position ${r.avg_position}`}</td>
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
