"use client"
import dynamic from "next/dynamic";

interface Location {
  city: string;
  state: string;
  type: string;
  phone: string;
  lat: number;
  lng: number;
  address: string;
}

interface FTWZMapProps {
  locations: Location[];
  activeCity: string | null;
  onMarkerClick: (city: string) => void;
}

const FTWZMapInner = dynamic(() => import("./FTWZMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full bg-muted flex items-center justify-center rounded-xl">
      <p className="text-muted-foreground text-sm">Loading map…</p>
    </div>
  ),
});

const FTWZMap = (props: FTWZMapProps) => {
  return <FTWZMapInner {...props} />;
};

export default FTWZMap;
