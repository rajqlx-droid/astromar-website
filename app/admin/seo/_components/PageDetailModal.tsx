"use client";

import { useEffect, useRef } from "react";
import { IconX } from "./icons";
import PageDetail from "./PageDetail";
import { pageName, type ViewPage } from "./pageTree";
import { Chip, type Tone } from "./ui";

interface Props {
  page: ViewPage;
  /** Readable page name for the header; falls back to one made from the path. */
  name?: string;
  /** The row button that opened the dialog; focus goes back to it on close. */
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
  onIgnore: (path: string, code: string) => void;
  onRestore: (path: string, code: string) => void;
  markNote?: { target: string; text: string } | null;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

/** Centred dialog with the SEO details of one page. */
export default function PageDetailModal({ page, name, returnFocusTo, onClose, onIgnore, onRestore, markNote }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const path = page.path;

  // Focus in on open, back to the clicked row on close; lock the background scroll meanwhile.
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      const target = returnFocusTo?.isConnected
        ? returnFocusTo
        : Array.from(document.querySelectorAll<HTMLElement>("[data-row]")).find((n) => n.dataset.row === path);
      target?.focus();
    };
  }, [returnFocusTo, path]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onCloseRef.current();
      return;
    }
    if (e.key !== "Tab") return;
    const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((n) => n.offsetParent !== null || n === closeRef.current);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  };

  const statusTone: Tone = page.status === 200 ? "ok" : "bad";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--seo-backdrop)] p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`SEO details for ${name ?? pageName(page.path)}, ${page.path}`}
        onKeyDown={onKeyDown}
        className="flex max-h-full w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-[color:var(--seo-border)] bg-[var(--seo-cardBg)] shadow-2xl"
      >
        <div className="flex shrink-0 items-start gap-3 border-b-[3px] border-[color:var(--seo-orange)] bg-[var(--seo-navy)] px-5 py-3">
          <div className="min-w-0 flex-1 pt-1">
            <div className="text-lg font-bold leading-tight text-[color:var(--seo-onNavy)]">{name ?? pageName(page.path)}</div>
            <div className="mt-0.5 break-all font-mono text-[13px] text-[color:var(--seo-navyText)]">{page.path}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Chip tone="neutral" icon={false}>
                {page.group}
              </Chip>
              <Chip tone={statusTone}>{page.error ? page.error : `HTTP ${page.status}`}</Chip>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[color:var(--seo-onNavy)] text-[color:var(--seo-onNavy)] transition-colors hover:bg-[var(--seo-whiteTint10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <PageDetail page={page} onIgnore={onIgnore} onRestore={onRestore} markNote={markNote} />
        </div>
      </div>
    </div>
  );
}
