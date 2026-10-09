"use client";

import { Fragment } from "react";
import type { WordingMatch } from "@/lib/seo-audit/types";
import type { ViewPage } from "./pageTree";
import WordingCard from "./WordingCard";
import { Chip, SeverityTag, type Tone } from "./ui";

function lengthTone(len: number, min: number, max: number, required: boolean): Tone {
  if (len === 0) return required ? "bad" : "warn";
  return len > max || len < min ? "warn" : "ok";
}

function crumb(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return "www.astromarfreezone.com" + (parts.length ? " › " + parts.join(" › ") : "");
}

function cut(text: string, max: number): string {
  return text.length > max ? text.slice(0, max).trimEnd() + "..." : text;
}

function Field({ label, chip, children }: { label: string; chip?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="text-sm leading-normal">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-[color:var(--seo-ink)]">{label}</span>
        {chip}
      </div>
      <div className="mt-0.5 break-words text-[color:var(--seo-inkSoft)]">{children}</div>
    </div>
  );
}

function YesNo({ yes, label }: { yes: boolean; label: string }) {
  return <Chip tone={yes ? "ok" : "warn"}>{`${yes ? "Yes" : "No"} in ${label}`}</Chip>;
}

interface Props {
  page: ViewPage;
  /** Wording matches found on this page. */
  wording: WordingMatch[];
  onIgnore: (path: string, code: string) => void;
  onRestore: (path: string, code: string) => void;
  markNote?: { target: string; text: string } | null;
}

/** Body of the page details dialog: the header (URL, badges, close) lives in PageDetailModal. */
export default function PageDetail({ page, wording, onIgnore, onRestore, markNote }: Props) {
  const titleLen = page.title.length;
  const descLen = page.description?.length ?? 0;
  const canonicalTone: Tone = page.canonicalState === "matches" ? "ok" : page.canonicalState === "missing" ? "bad" : "warn";
  const canonicalLabel = page.canonicalState === "matches" ? "Matches" : page.canonicalState === "missing" ? "Missing" : "Mismatch";
  const h1Tone: Tone = page.h1.length === 1 ? "ok" : "bad";
  const ogKeys = Object.keys(page.og);
  const twKeys = Object.keys(page.twitter);

  return (
    <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Field label="SEO title" chip={<Chip tone={lengthTone(titleLen, 30, 60, true)}>{`${titleLen} chars`}</Chip>}>
            {page.title || <span className="italic text-[color:var(--seo-badText)]">(missing)</span>}
          </Field>
          <Field label="Meta description" chip={<Chip tone={lengthTone(descLen, 70, 160, true)}>{`${descLen} chars`}</Chip>}>
            {page.description || <span className="italic text-[color:var(--seo-badText)]">(missing)</span>}
          </Field>
          <Field label="Canonical" chip={<Chip tone={canonicalTone}>{canonicalLabel}</Chip>}>
            <span className="break-all font-mono text-[13px]">{page.canonical ?? "(missing)"}</span>
          </Field>
          <Field label="H1" chip={<Chip tone={h1Tone}>{`${page.h1.length} found`}</Chip>}>
            {page.h1.length ? page.h1.join("  |  ") : <span className="italic text-[color:var(--seo-badText)]">(none)</span>}
          </Field>
          <Field
            label="Focus keyword"
            chip={
              page.keyword ? (
                <Chip tone="keyword" icon={false}>
                  {page.keyword}
                </Chip>
              ) : (
                <Chip tone="neutral" icon={false}>
                  Not set
                </Chip>
              )
            }
          >
            {page.keyword ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                <YesNo yes={page.keywordIn.title} label="title" />
                <YesNo yes={page.keywordIn.description} label="description" />
                <YesNo yes={page.keywordIn.h1} label="H1" />
                <YesNo yes={page.keywordIn.url} label="URL" />
              </div>
            ) : (
              <span className="text-[13px] text-[color:var(--seo-mutedText)]">Add one in data/seoKeywords.ts</span>
            )}
          </Field>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--seo-mutedText)]">Google result preview</div>
          <div className="rounded-xl border border-[color:var(--seo-previewBorder)] bg-[var(--seo-cardBg)] px-4 py-4" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="break-all text-[13px] text-[color:var(--seo-googleGreen)]">{crumb(page.path)}</div>
            <div className="mt-0.5 text-xl leading-snug text-[color:var(--seo-googleBlue)]">{cut(page.title || "Untitled page", 60)}</div>
            <div className="mt-1 text-sm leading-relaxed text-[color:var(--seo-googleGrey)]">
              {page.description ? cut(page.description, 160) : "No description provided. Google will pick text from the page."}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--seo-mutedText)]">Issues</div>
          <ul className="flex flex-col gap-2">
            {page.issues.map((issue, i) => (
              <Fragment key={i}>
              <li className="flex flex-wrap items-start gap-2 text-sm leading-snug sm:flex-nowrap">
                <SeverityTag severity={issue.severity} />
                <span className="min-w-0 flex-1 break-words text-[color:var(--seo-ink)]">{issue.text}</span>
                {issue.severity !== "good" && (
                  <button
                    type="button"
                    onClick={() => onIgnore(page.path, issue.code)}
                    className="min-h-11 shrink-0 rounded-md border border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] px-3 text-xs font-semibold text-[color:var(--seo-navy)] hover:border-[color:var(--seo-orange)]"
                  >
                    Ignore this flag
                  </button>
                )}
              </li>
              {markNote?.target === `${page.path}|${issue.code}` && (
                <li role="status" className="text-xs text-[color:var(--seo-mutedText)]">
                  {markNote.text}
                </li>
              )}
              </Fragment>
            ))}
          </ul>
          {page.ignoredIssues.length > 0 && (
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer select-none py-2 font-semibold text-[color:var(--seo-mutedText)]">Ignored flags ({page.ignoredIssues.length})</summary>
              <ul className="mt-1 flex flex-col gap-2">
                {page.ignoredIssues.map((issue) => (
                  <Fragment key={issue.code}>
                  <li className="flex flex-wrap items-start gap-2 leading-snug text-[color:var(--seo-mutedText)] sm:flex-nowrap">
                    <span className="min-w-0 flex-1 break-words">{issue.text}</span>
                    <button
                      type="button"
                      onClick={() => onRestore(page.path, issue.code)}
                      className="min-h-11 shrink-0 rounded-md border border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] px-3 text-xs font-semibold text-[color:var(--seo-navy)] hover:border-[color:var(--seo-orange)]"
                    >
                      Show again
                    </button>
                  </li>
                  {markNote?.target === `${page.path}|${issue.code}` && (
                    <li role="status" className="text-xs text-[color:var(--seo-mutedText)]">
                      {markNote.text}
                    </li>
                  )}
                  </Fragment>
                ))}
              </ul>
            </details>
          )}
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--seo-mutedText)]">Wording</div>
          {wording.length === 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--seo-ink)]">
              <Chip tone="ok">Good</Chip>
              No risky phrases found.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {wording.map((m, idx) => (
                <WordingCard key={`${m.phrase}-${idx}`} match={m} />
              ))}
            </div>
          )}
        </div>

        <details className="text-sm text-[color:var(--seo-inkSoft)]">
          <summary className="cursor-pointer select-none py-2 font-semibold text-[color:var(--seo-navy)] hover:text-[color:var(--seo-accentHover)]">
            More tags: robots, Open Graph, Twitter, JSON-LD, H2s
          </summary>
          <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[13px]">
            <dt className="font-semibold">Robots</dt>
            <dd className="break-words">{page.robots ?? "(none: indexable by default)"}</dd>
            <dt className="font-semibold">Words</dt>
            <dd>{page.wordCount} (excluding header, footer and nav)</dd>
            <dt className="font-semibold">JSON-LD</dt>
            <dd className="break-words">{page.jsonLdTypes.length ? page.jsonLdTypes.join(", ") : "(none)"}</dd>
            <dt className="font-semibold">Open Graph</dt>
            <dd className="min-w-0">
              {ogKeys.length ? (
                <ul className="space-y-0.5">
                  {ogKeys.map((k) => (
                    <li key={k} className="break-all">
                      <span className="font-mono">{k}</span>: {page.og[k]}
                    </li>
                  ))}
                </ul>
              ) : (
                "(none)"
              )}
            </dd>
            <dt className="font-semibold">Twitter</dt>
            <dd className="min-w-0">
              {twKeys.length ? (
                <ul className="space-y-0.5">
                  {twKeys.map((k) => (
                    <li key={k} className="break-all">
                      <span className="font-mono">{k}</span>: {page.twitter[k]}
                    </li>
                  ))}
                </ul>
              ) : (
                "(none)"
              )}
            </dd>
            <dt className="font-semibold">H2 ({page.h2.length})</dt>
            <dd className="min-w-0">
              {page.h2.length ? (
                <ul className="list-disc space-y-0.5 pl-4">
                  {page.h2.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                "(none)"
              )}
            </dd>
          </dl>
        </details>
    </div>
  );
}
