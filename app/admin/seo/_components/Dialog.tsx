"use client";

import { useEffect, useRef } from "react";
import { IconX } from "./icons";

interface Props {
  /** Accessible name of the dialog. */
  label: string;
  closeLabel: string;
  /** Left side of the navy header (title, URL, tags). */
  header: React.ReactNode;
  /** The button that opened the dialog; focus goes back to it on close. */
  returnFocusTo: HTMLElement | null;
  /** Row path to refocus (a `[data-row]` element) when `returnFocusTo` is gone from the page. */
  fallbackRow?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

/**
 * Centred dialog: dimmed backdrop, focus moves in and is trapped, Esc / x / backdrop close it,
 * background scroll is locked and focus returns to the opener on close.
 */
export default function Dialog({ label, closeLabel, header, returnFocusTo, fallbackRow, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      const target = returnFocusTo?.isConnected
        ? returnFocusTo
        : fallbackRow
          ? Array.from(document.querySelectorAll<HTMLElement>("[data-row]")).find((n) => n.dataset.row === fallbackRow)
          : null;
      target?.focus();
    };
  }, [returnFocusTo, fallbackRow]);

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
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex max-h-full w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-[color:var(--seo-border)] bg-[var(--seo-cardBg)] shadow-2xl"
      >
        <div className="flex shrink-0 items-start gap-3 border-b-[3px] border-[color:var(--seo-orange)] bg-[var(--seo-navy)] px-5 py-3">
          <div className="min-w-0 flex-1 pt-1">{header}</div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[color:var(--seo-onNavy)] text-[color:var(--seo-onNavy)] transition-colors hover:bg-[var(--seo-whiteTint10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
