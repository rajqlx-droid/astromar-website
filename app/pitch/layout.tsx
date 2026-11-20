import type { Metadata } from "next";
import PitchNav from "@/components/pitch/PitchNav";
import PitchFooter from "@/components/pitch/PitchFooter";

export const metadata: Metadata = {
  title: "Pitch room | Astromar Logistics",
  robots: { index: false, follow: false },
};

export default function PitchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light">
      <PitchNav />
      <div className="flex-1">{children}</div>
      <PitchFooter />
    </div>
  );
}
