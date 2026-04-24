"use client"
import dynamic from "next/dynamic";

const FTWZMapInner = dynamic(() => import("./FTWZMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-muted flex items-center justify-center rounded-xl border border-gray-200">
      <p className="text-muted-foreground text-sm">Loading map…</p>
    </div>
  ),
});

const FTWZMap = () => {
  return <FTWZMapInner />;
};

export default FTWZMap;
