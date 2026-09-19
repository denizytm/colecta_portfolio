"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline across the top that reports how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[51] h-[2px] origin-left bg-ultra motion-reduce:hidden"
    />
  );
}
