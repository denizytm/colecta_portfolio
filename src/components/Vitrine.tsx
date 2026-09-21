"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Work } from "@/content/works";
import type { Locale } from "@/content/dictionary";

/**
 * The featured catalogue piece, shown behind glass.
 * Tilt answers the pointer — it never moves on its own.
 */
export default function Vitrine({
  work,
  locale,
  visitLabel,
}: {
  work: Work;
  locale: Locale;
  visitLabel: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tiltable, setTiltable] = useState(false);
  const reduced = useReducedMotion();

  // The frame drifts a little slower than the headline beside it, which gives
  // the two columns a sense of depth as the page moves.
  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, (v) => (reduced ? 0 : v * -70));

  // Only lean the frame where there is a real pointer and room to lean.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => {
      setTiltable(query.matches);
      setTilt(query.matches ? { x: 3, y: -7 } : { x: 0, y: 0 });
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const handleMove = (e: React.PointerEvent) => {
    const el = frame.current;
    if (!el || !tiltable || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: 3 - py * 9, y: -7 + px * 11 });
  };

  const reset = () => setTilt(tiltable ? { x: 3, y: -7 } : { x: 0, y: 0 });

  const host = work.href
    ? work.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <motion.div ref={outer} style={{ y: drift }}>
      <div className="animate-vitrine-settle">
        <div
          ref={frame}
          onPointerMove={handleMove}
          onPointerLeave={reset}
          className="[transform-style:preserve-3d]"
          style={{
            transform: `perspective(1600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 600ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          {/* Browser chrome — the address bar carries the real URL, not decoration */}
          <div className="overflow-hidden rounded-xl border border-edge-dark bg-ink-raised shadow-[0_40px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="flex items-center gap-3 border-b border-edge-dark px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-edge-dark" />
                <span className="h-2 w-2 rounded-full bg-edge-dark" />
                <span className="h-2 w-2 rounded-full bg-edge-dark" />
              </span>
              {host && (
                <span className="truncate rounded bg-ink px-2.5 py-1 text-record text-paper-muted">
                  {host}
                </span>
              )}
            </div>

            <div
              className={`relative aspect-[16/10] ${
                work.imageFit === "contain" ? "bg-ink-deep" : "bg-ink-deep"
              }`}
            >
              <Image
                src={work.image}
                alt={work.client}
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                priority
                className={work.imageFit === "contain" ? "object-contain p-6" : "object-cover object-top"}
              />
            </div>
          </div>

          {/* Catalogue tag, hanging off the frame */}
          <div
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ transform: "translateZ(40px)" }}
          >
            <span className="tnum bg-ultra-deep px-2.5 py-1 text-record text-white">
              K-{String(work.no).padStart(2, "0")}
            </span>
            <span className="text-small text-paper">{work.client}</span>
            <span className="tnum text-small text-paper-muted">{work.year}</span>
            {work.href && (
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="rule-link ml-auto text-small text-ultra-bright"
              >
                {visitLabel}
              </a>
            )}
          </div>

          <p className="sr-only">{work.kind[locale]}</p>
        </div>
      </div>
    </motion.div>
  );
}
