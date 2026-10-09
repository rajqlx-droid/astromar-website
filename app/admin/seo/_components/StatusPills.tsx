import { IconHelp } from "./icons";

const DEV_TIP = "Dev bypass is on. Login is disabled on this machine.";
const NOT_SAVED_TIP =
  "Supabase is not set up. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY to .env.local to save scans and marks. Results from this run are lost on reload.";
const HELP_TIP = "Read-only. A scan fetches pages and reads files; nothing on the site is changed.";

/**
 * A focusable control with a tooltip. `title` covers mouse hover; the popover appears on
 * keyboard focus, and `aria-label` carries the text for screen readers.
 */
function Tip({ label, text, children }: { label: string; text: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        title={text}
        aria-label={`${label}. ${text}`}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-1 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--seo-orange)]"
      >
        {children}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute right-0 top-full z-30 mt-1 w-72 max-w-[80vw] rounded-lg bg-[var(--seo-navyDeep)] px-3 py-2 text-left text-xs font-normal leading-snug text-[color:var(--seo-onNavy)] shadow-lg group-focus-within:visible"
      >
        {text}
      </span>
    </span>
  );
}

/** Small header pills. Informational only: never red. */
export default function StatusPills({ devBypass, notSaved }: { devBypass: boolean; notSaved: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {devBypass && (
        <Tip label="Dev mode" text={DEV_TIP}>
          <span className="rounded-full bg-[var(--seo-cautionBg)] px-3 py-1 text-xs font-semibold text-[color:var(--seo-cautionText)]">Dev mode</span>
        </Tip>
      )}
      {notSaved && (
        <Tip label="Results not saved" text={NOT_SAVED_TIP}>
          <span className="rounded-full bg-[var(--seo-neutralBg)] px-3 py-1 text-xs font-semibold text-[color:var(--seo-tabText)]">Results not saved</span>
        </Tip>
      )}
      <Tip label="About this page" text={HELP_TIP}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--seo-navyOutline)] text-[color:var(--seo-navyTextBright)]">
          <IconHelp className="h-4 w-4" />
        </span>
      </Tip>
    </div>
  );
}
