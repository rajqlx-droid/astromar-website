"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { fieldClass } from "@/app/admin/rankings/_components/shared";
import { TRACKER_KEYWORDS } from "@/data/trackerKeywords";
import { normaliseKeyword } from "@/lib/rankings/types";

type Option = { id: string; text: string; group: "saved" | "suggested"; saved: boolean };

const norm = (s: string) => {
  const r = normaliseKeyword(s);
  return r.ok ? r.value : s.trim().replace(/ +/g, " ").toLowerCase();
};

/**
 * Searchable keyword box. Picking an option only fills the box: it never starts a check.
 * Typed text that is not in the list is used as typed.
 */
export default function KeywordCombobox({
  label,
  value,
  onChange,
  savedKeywords,
  disabled,
  maxLength = 200,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  savedKeywords: string[];
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  const uid = useId();
  const inputId = `${uid}-input`;
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => {
    const savedSet = new Set(savedKeywords.map(norm));
    const suggestedValues = new Set(TRACKER_KEYWORDS.map((k) => k.value));
    const q = value.trim().toLowerCase();
    const match = (t: string) => q === "" || t.toLowerCase().includes(q);

    const savedExtras: Option[] = Array.from(savedSet)
      .filter((k) => !suggestedValues.has(k) && match(k))
      .map((k) => ({ id: `${uid}-s-${k}`, text: k, group: "saved", saved: true }));
    const suggested: Option[] = TRACKER_KEYWORDS.filter((k) => match(k.label)).map((k) => ({
      id: `${uid}-g-${k.value}`,
      text: k.label,
      group: "suggested",
      saved: savedSet.has(k.value),
    }));
    return [...savedExtras, ...suggested];
  }, [savedKeywords, value, uid]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (open && active >= 0) {
      listRef.current?.querySelector<HTMLElement>(`[id="${options[active]?.id}"]`)?.scrollIntoView({ block: "nearest" });
    }
  }, [active, open, options]);

  function pick(o: Option) {
    onChange(o.text);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const n = options.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (n) setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (n) setActive((a) => (a <= 0 ? n - 1 : a - 1));
    } else if (e.key === "Home" && open && n) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && open && n) {
      e.preventDefault();
      setActive(n - 1);
    } else if (e.key === "Enter") {
      // Only pick when an option is highlighted; otherwise let the form submit as it does today.
      if (open && active >= 0 && options[active]) {
        e.preventDefault();
        pick(options[active]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
      setActive(-1);
    }
  }

  const hasSaved = options.some((o) => o.group === "saved");
  const groups: { key: "saved" | "suggested"; title: string; items: Option[] }[] = [
    { key: "saved", title: "Saved for weekly tracking", items: options.filter((o) => o.group === "saved") },
    { key: "suggested", title: "Suggested keywords", items: options.filter((o) => o.group === "suggested") },
  ];

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
          setActive(-1);
        }
      }}
    >
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        className={`${fieldClass} mt-1`}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? options[active]?.id : undefined}
        autoComplete="off"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && !disabled ? (
        <div
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label={label}
          className="kw-pop absolute left-0 right-0 z-30 mt-1 max-h-[280px] overflow-y-auto rounded-lg border border-[#dde5f0] bg-white py-1 shadow-[0_8px_24px_rgba(27,58,107,0.14)]"
          onPointerDown={(e) => e.preventDefault()}
        >
          {options.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-600">No matching suggestions. Your text will be used as typed.</p>
          ) : (
            groups.map((g) =>
              g.items.length === 0 ? null : (
                <div key={g.key} role="group" aria-label={g.title}>
                  {hasSaved || g.key === "saved" ? (
                    <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#1B3A6B]" aria-hidden="true">
                      {g.title}
                    </p>
                  ) : null}
                  {g.items.map((o) => {
                    const idx = options.indexOf(o);
                    const isActive = idx === active;
                    return (
                      <div
                        key={o.id}
                        id={o.id}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => pick(o)}
                        onMouseMove={() => idx !== active && setActive(idx)}
                        className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm text-slate-900 ${
                          isActive ? "bg-[#e8eef7]" : "hover:bg-[#f1f5fa]"
                        }`}
                      >
                        <span className="min-w-0 break-words">{o.text}</span>
                        {o.saved && o.group === "suggested" ? (
                          <span className="shrink-0 rounded-full bg-[#F97316]/15 px-2 py-0.5 text-[11px] font-semibold text-[#c2540a]">saved</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ),
            )
          )}
        </div>
      ) : null}
      <style>{`@media (prefers-reduced-motion: no-preference){.kw-pop{animation:kw-pop .12s ease-out}}@keyframes kw-pop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
