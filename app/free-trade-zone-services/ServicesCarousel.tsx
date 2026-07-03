"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesCarousel({ currentHref }: { currentHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 472, behavior: "smooth" });
  const others = services.filter((s) => s.href !== currentHref);
  if (others.length === 0) return null;
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B3A6B]">Other Services</h2>
            <p className="mt-1 text-sm text-gray-500">Explore Astromar&apos;s full range of FTWZ and logistics services</p>
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => scroll(-1)} className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button aria-label="Next" onClick={() => scroll(1)} className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 -mx-1 px-1">
          {others.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="group snap-start flex-[0_0_260px] rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-[#F97316]/40 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-lg bg-[#1B3A6B]/5 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#F97316]" />
                </div>
                <h3 className="font-bold text-[#1B3A6B] group-hover:text-[#F97316] transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{s.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
