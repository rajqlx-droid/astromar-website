// Loop logic for "Track all keywords". No React and no network of its own: the check call is passed in,
// so it can be tested with mocked responses. The real call is the existing POST /admin/rankings/serp,
// which runs the quota guard and saves the result for every keyword separately.

import { SERP_RESERVE, type Depth, type SerpResult } from "@/lib/rankings/types";

export type Before = { position: number | null; depth: number } | null; // null = never checked

export type Change = { kind: "up" | "down"; n: number } | { kind: "new" } | { kind: "dropped" } | { kind: "none" };

export type RowState =
  | { status: "pending" }
  | { status: "checking" }
  | { status: "done"; result: SerpResult; position: number | null; topDomain: string | null; change: Change; storageWarning?: string }
  | { status: "failed"; error: string }
  | { status: "skipped"; reason: string };

export type CallOutcome =
  | { ok: true; result: SerpResult; remainingAfter: number; storageWarning?: string | null }
  | { ok: false; status: number; error: string; remaining?: number | null; refused?: boolean };

/** Before/now comparison. "New" covers a keyword never checked and one that was not found before but is now. */
export function computeChange(before: Before, now: number | null): Change {
  if (before === null) return { kind: "new" };
  if (before.position === null) return now === null ? { kind: "none" } : { kind: "new" };
  if (now === null) return { kind: "dropped" };
  if (now < before.position) return { kind: "up", n: before.position - now };
  if (now > before.position) return { kind: "down", n: now - before.position };
  return { kind: "none" };
}

export interface RunArgs {
  keywords: string[];
  location: string;
  depth: Depth;
  startRemaining: number | null;
  /** Snapshot taken before the first search. */
  previous: Record<string, Before>;
  call: (keyword: string) => Promise<CallOutcome>;
  shouldCancel: () => boolean;
  onRow: (index: number, state: RowState) => void;
}

export interface RunSummary {
  ended: "done" | "cancelled" | "refused";
  remaining: number | null;
  /** Keywords that were not checked because the run was cancelled or refused. */
  notChecked: string[];
  refusalMessage?: string;
}

/** Checks the keywords one at a time, in order. Never parallel, never retries a failed keyword. */
export async function runTrackAll(a: RunArgs): Promise<RunSummary> {
  let remaining = a.startRemaining;
  const skipFrom = (i: number, reason: string) => {
    for (let j = i; j < a.keywords.length; j++) a.onRow(j, { status: "skipped", reason });
    return a.keywords.slice(i);
  };

  for (let i = 0; i < a.keywords.length; i++) {
    const kw = a.keywords[i];
    if (a.shouldCancel()) return { ended: "cancelled", remaining, notChecked: skipFrom(i, "Not checked (cancelled)") };

    // Local pre-check with the last balance we know. The server guard still decides for real on every call.
    if (remaining !== null && remaining - a.depth < SERP_RESERVE) {
      const message = `Stopped: ${remaining} searches left, and ${SERP_RESERVE} are kept for the weekly job. The next keyword needs ${a.depth}.`;
      return { ended: "refused", remaining, notChecked: skipFrom(i, "Not checked (not enough searches)"), refusalMessage: message };
    }

    a.onRow(i, { status: "checking" });
    let out: CallOutcome;
    try {
      out = await a.call(kw);
    } catch {
      out = { ok: false, status: 0, error: "Could not reach the server." };
    }

    if (out.ok) {
      remaining = out.remainingAfter;
      const position = out.result.firstMatchPosition;
      a.onRow(i, {
        status: "done",
        result: out.result,
        position,
        topDomain: out.result.rows.find((r) => r.position === 1)?.domain || null,
        change: computeChange(a.previous[kw] ?? null, position),
        ...(out.storageWarning ? { storageWarning: out.storageWarning } : {}),
      });
      continue;
    }

    if (typeof out.remaining === "number") remaining = out.remaining;
    if (out.refused || out.status === 429) {
      // The guard said no: stop the whole run. This keyword was not searched.
      return { ended: "refused", remaining, notChecked: skipFrom(i, "Not checked (refused by the search guard)"), refusalMessage: out.error };
    }
    a.onRow(i, { status: "failed", error: out.error }); // never retried automatically
  }
  return { ended: "done", remaining, notChecked: [] };
}
