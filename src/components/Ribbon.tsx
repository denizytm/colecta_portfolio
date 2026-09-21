"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const LINES = 28;

/**
 * The mark is a ribbon bent into a C. This takes the same ribbon and lets it
 * run flat behind the hero: one stroked curve repeated, with the control
 * points drifting at different rates so the band twists where they converge.
 *
 * It does not move on its own — it drifts only as the page is scrolled.
 */
export default function Ribbon() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, (v) => (reduced ? 0 : v * -110));

  return (
    <motion.div
      ref={wrap}
      aria-hidden
      style={{ y: drift }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40 sm:opacity-100 [mask-image:linear-gradient(to_right,transparent,black_38%,black_88%,transparent)]"
    >
      <svg
        viewBox="0 0 1600 760"
        preserveAspectRatio="xMaxYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="ribbon-stroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="45%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#ribbon-stroke)" strokeWidth="1.25">
          {Array.from({ length: LINES }, (_, i) => {
            // Different drift rates per control point are what make the band
            // pinch in one place and fan out in another.
            const d = [
              `M -80 ${250 + i * 9}`,
              `C 300 ${90 + i * 13}, 640 ${520 + i * 4}, 1000 ${250 + i * 10}`,
              `S 1400 ${80 + i * 15}, 1700 ${330 + i * 6}`,
            ].join(" ");

            // Fade towards both edges of the stack so it reads as a ribbon
            // with body rather than a flat set of rules.
            const t = i / (LINES - 1);
            const opacity = 0.16 + 0.42 * Math.sin(Math.PI * t);

            return <path key={i} d={d} opacity={opacity.toFixed(3)} />;
          })}
        </g>
      </svg>
    </motion.div>
  );
}
