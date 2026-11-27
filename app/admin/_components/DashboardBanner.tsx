import styles from "./dashboardBanner.module.css";

const BAR_HEIGHTS = [70, 110, 85, 135, 100, 150, 120, 165];

// Banner under the menu: headline on the left, decorative animated graph on the right.
export default function DashboardBanner() {
  return (
    <section
      className="relative h-[190px] w-full overflow-hidden shadow-[0_8px_24px_rgba(20,44,82,0.25)]"
      style={{
        backgroundColor: "#0f2a52",
        backgroundImage: "radial-gradient(600px 200px at 80% 100%, rgba(46,110,200,0.55), transparent 70%), linear-gradient(90deg, #0b1d3b, transparent)",
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 520 190"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[520px] md:block"
      >
        {/* Drifting faint grid */}
        <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
          <g className={styles.gridV}>
            {Array.from({ length: 16 }, (_, i) => (
              <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="190" />
            ))}
          </g>
          <g className={styles.gridH}>
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1="0" y1={i * 40 - 40} x2="520" y2={i * 40 - 40} />
            ))}
          </g>
        </g>

        {/* Soft bars that rise and fall slowly */}
        {BAR_HEIGHTS.map((h, i) => (
          <rect key={i} className={styles.bar} x={36 + i * 58} y={190 - h} width="30" height={h} rx="4" fill="#ffffff" fillOpacity="0.12" style={{ animationDelay: `${-i * 1.1}s` }} />
        ))}

        {/* Rising line with a light fill under it */}
        <path className={styles.area} d="M20 160 L90 142 L150 148 L215 118 L275 124 L335 92 L395 98 L450 62 L500 40 L500 190 L20 190 Z" fill="#F98F1D" fillOpacity="0.14" />
        <path
          className={styles.line}
          pathLength="1"
          d="M20 160 L90 142 L150 148 L215 118 L275 124 L335 92 L395 98 L450 62 L500 40"
          fill="none"
          stroke="#F98F1D"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* White dot with a pulsing ring at the end of the line */}
        <g className={styles.endGroup}>
          <circle className={styles.ring} cx="500" cy="40" r="5" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="500" cy="40" r="5" fill="#ffffff" />
        </g>
      </svg>

      <div className="relative flex h-full w-full items-center px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F98F1D]">Astromar Admin</p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[38px]">
            What do you want <span className="text-[#F98F1D]">to check?</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
