"use client";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

// NOTE: Theme toggle is intentionally a dummy.
// Dark mode is not fully themed across the site yet (~95 dark: classes scattered,
// half-broken state if .dark is applied to <html>). Until dark mode is properly
// wired (backlog task #5), this button is visible for layout purposes but does
// nothing on click. Restore by re-adding useTheme() + setTheme() in the handler.

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      type="button"
      onClick={() => { /* dummy: theme toggle disabled until dark mode is fully themed */ }}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
      aria-label="Toggle dark mode"
    >
      <Sun size={16} />
    </button>
  );
};

export default ThemeToggle;
