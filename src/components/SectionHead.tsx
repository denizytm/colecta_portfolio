"use client";

import { motion } from "motion/react";
import RevealText from "./motion/RevealText";

export default function SectionHead({
  kicker,
  title,
  lead,
  onDark = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  onDark?: boolean;
}) {
  return (
    <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.5 }}
          className={`text-record ${onDark ? "text-ultra-bright" : "text-ultra"}`}
        >
          {kicker}
        </motion.p>

        <RevealText
          as="h2"
          text={title}
          delay={0.08}
          className={`display mt-3 text-[clamp(2.1rem,5.4vw,3.75rem)] ${
            onDark ? "text-paper" : "text-ink"
          }`}
        />
      </div>

      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-[54ch] self-end text-lead ${
            onDark ? "text-paper/60" : "text-ink-muted"
          }`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
