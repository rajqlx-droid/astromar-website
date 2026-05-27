import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// NOTE: Theme toggle is intentionally a dummy. See components/ThemeToggle.tsx
// for context. Re-enable by restoring the useState/useEffect/localStorage logic
// and toggling document.documentElement.classList in the onClick handler.

export function ThemeToggle() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => { /* dummy: theme toggle disabled until dark mode is fully themed */ }}
      aria-label="Toggle theme"
      className="text-brand-navy hover:bg-brand-navy-soft"
    >
      <Sun className="size-4" />
    </Button>
  );
}
