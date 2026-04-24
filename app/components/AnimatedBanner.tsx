"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  phase: number;
  glowing: boolean;
  trail: Array<{ x: number; y: number; a: number }>;
}

interface Shape {
  x: number; y: number;
  r: number;
  sides: number;
  rot: number;
  rotSpeed: number;
  scalePhase: number;
  alpha: number;
  color: string;
}

interface Orb {
  cx: number; cy: number;
  r: number;
  color: string;
  dur: number;
  dx: number;
  dy: number;
  delay: number;
}

const ORBS: Orb[] = [
  { cx: 5,  cy: 50, r: 110, color: "rgba(59,130,246,0.14)",  dur: 7,   dx: 22,  dy: 8,   delay: 0 },
  { cx: 20, cy: 25, r: 75,  color: "rgba(99,179,237,0.10)",  dur: 4.5, dx: -14, dy: -6,  delay: 1.2 },
  { cx: 38, cy: 65, r: 90,  color: "rgba(251,146,60,0.08)",  dur: 6,   dx: 18,  dy: 10,  delay: 2.1 },
  { cx: 50, cy: 40, r: 130, color: "rgba(30,64,175,0.12)",   dur: 9,   dx: 24,  dy: -8,  delay: 0.5 },
  { cx: 65, cy: 70, r: 80,  color: "rgba(251,191,36,0.07)",  dur: 5,   dx: -18, dy: 6,   delay: 1.8 },
  { cx: 80, cy: 30, r: 100, color: "rgba(99,179,237,0.11)",  dur: 7.5, dx: 16,  dy: -10, delay: 0.9 },
  { cx: 92, cy: 55, r: 85,  color: "rgba(59,130,246,0.13)",  dur: 6.5, dx: -12, dy: 8,   delay: 3.0 },
  { cx: 55, cy: 15, r: 65,  color: "rgba(251,146,60,0.06)",  dur: 8,   dx: 20,  dy: 12,  delay: 1.5 },
];

function buildParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 137.508;
    return {
      x: ((seed * 0.531) % 1) * w,
      y: ((seed * 0.718) % 1) * h,
      vx: (((seed * 0.211) % 1) - 0.5) * 0.35,
      vy: (((seed * 0.384) % 1) - 0.5) * 0.2,
      r: 1 + ((seed * 0.413) % 1) * 2.2,
      alpha: 0.15 + ((seed * 0.623) % 1) * 0.45,
      phase: (seed * 0.271) % (Math.PI * 2),
      glowing: i % 7 === 0,
      trail: [],
    };
  });
}

function buildShapes(w: number, h: number): Shape[] {
  const configs = [
    { cx: 0.08, cy: 0.5,  r: 22, sides: 6, rotSpeed:  0.4,  alpha: 0.12, color: "rgba(99,179,237," },
    { cx: 0.18, cy: 0.2,  r: 14, sides: 0, rotSpeed: -0.3,  alpha: 0.08, color: "rgba(251,146,60," },
    { cx: 0.32, cy: 0.75, r: 18, sides: 6, rotSpeed:  0.6,  alpha: 0.10, color: "rgba(59,130,246," },
    { cx: 0.50, cy: 0.15, r: 12, sides: 0, rotSpeed: -0.5,  alpha: 0.07, color: "rgba(251,191,36," },
    { cx: 0.62, cy: 0.65, r: 20, sides: 6, rotSpeed:  0.35, alpha: 0.11, color: "rgba(99,179,237," },
    { cx: 0.75, cy: 0.30, r: 16, sides: 0, rotSpeed: -0.45, alpha: 0.09, color: "rgba(251,146,60," },
    { cx: 0.88, cy: 0.60, r: 24, sides: 6, rotSpeed:  0.55, alpha: 0.12, color: "rgba(59,130,246," },
    { cx: 0.95, cy: 0.25, r: 10, sides: 0, rotSpeed: -0.7,  alpha: 0.07, color: "rgba(99,179,237," },
  ];
  return configs.map((c, i) => ({
    x: c.cx * w,
    y: c.cy * h,
    r: c.r,
    sides: c.sides,
    rot: (i * 0.7) % (Math.PI * 2),
    rotSpeed: c.rotSpeed,
    scalePhase: (i * 0.9) % (Math.PI * 2),
    alpha: c.alpha,
    color: c.color,
  }));
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = rot + (i * Math.PI) / 3;
    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
             : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

function BgCanvas({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{ particles: Particle[]; shapes: Shape[] } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (width === 0 || height === 0) return;
    stateRef.current = {
      particles: buildParticles(width, height, 65),
      shapes: buildShapes(width, height),
    };
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!stateRef.current) {
      stateRef.current = {
        particles: buildParticles(width, height, 65),
        shapes: buildShapes(width, height),
      };
    }

    const start = performance.now();
    const TRAIL_LEN = 8;

    function draw(now: number) {
      if (!ctx || !stateRef.current) return;
      const t = (now - start) / 1000;
      const { particles, shapes } = stateRef.current;

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#1a3a6b");
      bg.addColorStop(0.5, "#0f2347");
      bg.addColorStop(1, "#0d1b35");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const accentAlpha = 0.045 + Math.sin(t * 0.7) * 0.025;
      const accent = ctx.createLinearGradient(0, 0, width, 0);
      accent.addColorStop(0,   "rgba(251,146,60,0)");
      accent.addColorStop(0.3, `rgba(251,146,60,${accentAlpha})`);
      accent.addColorStop(0.7, `rgba(251,191,36,${accentAlpha * 0.7})`);
      accent.addColorStop(1,   "rgba(251,146,60,0)");
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, width, height);

      ORBS.forEach((orb) => {
        const phase = t / orb.dur + orb.delay;
        const x = (orb.cx / 100) * width  + Math.sin(phase * Math.PI * 2) * orb.dx;
        const y = (orb.cy / 100) * height + Math.cos(phase * Math.PI * 2) * orb.dy;
        const pulse = 1 + Math.sin(phase * Math.PI * 2 + 1.5) * 0.08;
        const r = (orb.r / 2) * pulse;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      const waveCfg = [
        { yRatio: 0.15, amp: 2.5, freq: 3.5, speed: 0.9,  alpha: 0.05, color: "148,210,255" },
        { yRatio: 0.30, amp: 3.5, freq: 4.0, speed: 0.6,  alpha: 0.06, color: "99,179,237"  },
        { yRatio: 0.45, amp: 4.0, freq: 3.0, speed: 1.1,  alpha: 0.07, color: "251,146,60"  },
        { yRatio: 0.60, amp: 3.0, freq: 4.5, speed: 0.75, alpha: 0.05, color: "251,191,36"  },
        { yRatio: 0.72, amp: 4.5, freq: 3.8, speed: 0.5,  alpha: 0.06, color: "148,210,255" },
        { yRatio: 0.88, amp: 2.0, freq: 5.0, speed: 1.3,  alpha: 0.04, color: "59,130,246"  },
      ];
      waveCfg.forEach((wc) => {
        const yBase = height * wc.yRatio;
        const a = wc.alpha + Math.sin(t * 0.4 + wc.yRatio * 10) * 0.02;
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 3) {
          const y = yBase + Math.sin((x / width) * Math.PI * wc.freq + t * wc.speed) * wc.amp;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wc.color},${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      shapes.forEach((s, i) => {
        s.rot += s.rotSpeed * 0.016;
        const sc = 1 + Math.sin(t * 0.5 + s.scalePhase + i) * 0.12;
        const a = s.alpha + Math.sin(t * 0.4 + i * 0.8) * 0.04;
        const r = s.r * sc;
        ctx.save();
        ctx.strokeStyle = `${s.color}${a})`;
        ctx.lineWidth = 1;
        if (s.sides === 0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `${s.color}${a * 0.5})`;
          ctx.stroke();
        } else {
          drawHexagon(ctx, s.x, s.y, r, s.rot);
          ctx.stroke();
          drawHexagon(ctx, s.x, s.y, r * 0.6, s.rot + 0.3);
          ctx.strokeStyle = `${s.color}${a * 0.4})`;
          ctx.stroke();
        }
        ctx.restore();
      });

      particles.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 0.06;
        p.vy += (Math.random() - 0.5) * 0.06;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx + Math.sin(t * 0.5 + p.phase) * 0.15;
        p.y += p.vy + Math.cos(t * 0.4 + p.phase) * 0.08;
        if (p.x < -5)        p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5)        p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        p.trail.push({ x: p.x, y: p.y, a: p.alpha });
        if (p.trail.length > TRAIL_LEN) p.trail.shift();

        p.trail.forEach((pt, ti) => {
          const trailAlpha = (ti / TRAIL_LEN) * p.alpha * 0.4;
          const trailR = p.r * (ti / TRAIL_LEN) * 0.7;
          if (trailR < 0.2) return;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, trailR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148,210,255,${trailAlpha})`;
          ctx.fill();
        });

        if (p.glowing) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          glow.addColorStop(0, `rgba(148,210,255,${p.alpha * 0.5})`);
          glow.addColorStop(1, "rgba(148,210,255,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${p.alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", zIndex: 0 }}
    />
  );
}

export default function AnimatedBanner() {
  const [dims, setDims] = useState({ w: 0, h: 80 });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 80, background: "#0d1b35" }}
    >
      {dims.w > 0 && <BgCanvas width={dims.w} height={dims.h} />}

      <div
        className="absolute inset-0 flex items-center justify-center gap-4 py-4 px-6"
        style={{ zIndex: 10 }}
      >
        <span
          className="hidden sm:inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold select-none"
          style={{ background: "white", color: "#1B3A6B" }}
        >
          NEW
        </span>

        <p className="text-white text-sm font-medium drop-shadow whitespace-nowrap">
          Introducing Smart Freight Calculator – Calculate CBM, Cost &amp; Freight in 2D &amp; 3D Instantly.
        </p>

        <button
          onClick={() => router.push("/tools")}
          className="shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 drop-shadow"
          style={{ background: "white", color: "#1B3A6B" }}
        >
          Try the New Tool →
        </button>
      </div>
    </div>
  );
}
