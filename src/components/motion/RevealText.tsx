"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  text: string;
  className?: string;
  /** Seconds to wait before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Sets a line of type word by word, each rising out of its own mask.
 *
 * Runs once, when the line first scrolls into view. The mask carries extra
 * bottom padding because Turkish descenders (ş, ç, y, p, j) would otherwise
 * be sheared off by the overflow clip.
 */
export default function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
  id,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="reveal-mask inline-block overflow-hidden pb-[0.18em] align-bottom"
          style={{ marginBottom: "-0.18em" }}
        >
          <motion.span
            className="reveal-word inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {i < words.length - 1 ? `${word} ` : word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
