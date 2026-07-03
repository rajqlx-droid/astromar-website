"use client";
import Link from "next/link";
import { useRef } from "react";

type Loc = { slug: string; city: string; state: string; port: string };

export default function LocationCarousel({ items }: { items: Loc[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 472, behavior: "smooth" });
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B3A6B]">Other FTWZ Locations</h2>
            <p className="mt-1 text-sm text-gray-500">Explore Astromar&apos;s FTWZ facilities across India</p>
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => scroll(-1)} className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors flex items-center justify-center text-lg">‹</button>
            <button aria-label="Next" onClick={() => scroll(1)} className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors flex items-center justify-center text-lg">›</button>
          </div>
        </div>
        <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 -mx-1 px-1">
          {items.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="group snap-start flex-[0_0_220px] rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg hover:border-[#F97316]/40 hover:-translate-y-0.5 transition-all">
              <h3 className="font-bold text-[#1B3A6B] group-hover:text-[#F97316] transition-colors">{l.city}</h3>
              <p className="mt-1 text-xs text-gray-500">{l.state}</p>
              <p className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600">{l.port}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
