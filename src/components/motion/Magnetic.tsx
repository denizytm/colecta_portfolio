"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lets a control lean towards the cursor as it approaches.
 *
 * Only on devices with a real pointer — on a touch screen there is nothing
 * to lean towards, and the offset would just misplace the tap target.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => {
      setEnabled(query.matches);
      if (!query.matches) setOffset({ x: 0, y: 0 });
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 450ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </span>
  );
}
