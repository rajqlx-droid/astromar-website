"use client";

import type { WordingMatch } from "@/lib/seo-audit/types";
import Dialog from "./Dialog";
import PageDetail from "./PageDetail";
import { pageName, type ViewPage } from "./pageTree";
import { Chip, type Tone } from "./ui";

interface Props {
  page: ViewPage;
  /** Readable page name for the header; falls back to one made from the path. */
  name?: string;
  /** Wording matches found on this page. */
  wording: WordingMatch[];
  /** The row button that opened the dialog; focus goes back to it on close. */
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
  onIgnore: (path: string, code: string) => void;
  onRestore: (path: string, code: string) => void;
  markNote?: { target: string; text: string } | null;
}

/** Centred dialog with the SEO details of one page. */
export default function PageDetailModal({ page, name, wording, returnFocusTo, onClose, onIgnore, onRestore, markNote }: Props) {
  const title = name ?? pageName(page.path);
  const statusTone: Tone = page.status === 200 ? "ok" : "bad";

  return (
    <Dialog
      label={`SEO details for ${title}, ${page.path}`}
      closeLabel="Close details"
      returnFocusTo={returnFocusTo}
      fallbackRow={page.path}
      onClose={onClose}
      header={
        <>
          <div className="text-lg font-bold leading-tight text-[color:var(--seo-onNavy)]">{title}</div>
          <div className="mt-0.5 break-all font-mono text-[13px] text-[color:var(--seo-navyText)]">{page.path}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Chip tone="neutral" icon={false}>
              {page.group}
            </Chip>
            <Chip tone={statusTone}>{page.error ? page.error : `HTTP ${page.status}`}</Chip>
          </div>
        </>
      }
    >
      <PageDetail page={page} wording={wording} onIgnore={onIgnore} onRestore={onRestore} markNote={markNote} />
    </Dialog>
  );
}
