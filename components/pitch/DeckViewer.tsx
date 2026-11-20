"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Maximize2 } from "lucide-react";

const BACK = "/pitch/slides";

export default function DeckViewer({ file, title }: { file: string; title: string }) {
  const router = useRouter();
  const frame = useRef<HTMLIFrameElement>(null);
  const wasFullscreen = useRef(false);
  const [needsStart, setNeedsStart] = useState(false);

  const close = useCallback(() => {
    wasFullscreen.current = false;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    router.push(BACK);
  }, [router]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    wasFullscreen.current = !!document.fullscreenElement;
    // Opened by typing the address: full screen needs one click.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNeedsStart(!document.fullscreenElement);

    const onFs = () => {
      if (document.fullscreenElement) {
        wasFullscreen.current = true;
        setNeedsStart(false);
      } else if (wasFullscreen.current) {
        router.push(BACK); // left full screen (Esc) -> back to the list
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) router.push(BACK);
    };
    const onMsg = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data && e.data.astromarClose) close();
    };
    window.addEventListener("message", onMsg);
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMsg);
    };
  }, [router, close]);

  function start() {
    document.documentElement.requestFullscreen?.().catch(() => {});
    setNeedsStart(false);
    frame.current?.focus();
  }

  function onLoad() {
    const f = frame.current;
    f?.focus();
    try {
      f?.contentWindow?.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !document.fullscreenElement) router.push(BACK);
      });
    } catch {
      /* same-origin only */
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <iframe ref={frame} src={file} title={title} allow="fullscreen" onLoad={onLoad} className="block h-full w-full border-0" />
      {needsStart && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/85 backdrop-blur-sm">
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3.5 text-base font-semibold text-white shadow-xl transition-colors hover:bg-brand-orange-strong"
          >
            <Maximize2 size={18} /> Start full screen
          </button>
        </div>
      )}
    </div>
  );
}
