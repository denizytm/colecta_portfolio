"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tiltable, setTiltable] = useState(false);

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
        <div className="overflow-hidden rounded-xl border border-edge bg-paper-raised shadow-[0_30px_70px_-35px_rgba(13,19,48,0.55)]">
          <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-edge" />
              <span className="h-2 w-2 rounded-full bg-edge" />
              <span className="h-2 w-2 rounded-full bg-edge" />
            </span>
            {host && (
              <span className="truncate rounded bg-paper px-2.5 py-1 text-record text-ink-muted">
                {host}
              </span>
            )}
          </div>

          <div
            className={`relative aspect-[16/10] ${
              work.imageFit === "contain" ? "bg-ink-deep" : "bg-paper"
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
          <span className="tnum bg-ultra px-2.5 py-1 text-record text-white">
            K-{String(work.no).padStart(2, "0")}
          </span>
          <span className="text-small text-ink">{work.client}</span>
          <span className="tnum text-small text-ink-faint">{work.year}</span>
          {work.href && (
            <a
              href={work.href}
              target="_blank"
              rel="noreferrer"
              className="rule-link ml-auto text-small text-ultra"
            >
              {visitLabel}
            </a>
          )}
        </div>

        <p className="sr-only">{work.kind[locale]}</p>
      </div>
    </div>
  );
}
