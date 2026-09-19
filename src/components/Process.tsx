"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Dictionary } from "@/content/dictionary";
import SectionHead from "./SectionHead";
import { sectionIds } from "@/content/sections";

export default function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;
  const list = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 75%", "end 85%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleY = useTransform(smooth, (v) => (reduced ? 1 : v));

  return (
    <section
      id={sectionIds.process}
      className="bg-paper-raised py-24 sm:py-32"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div id="process-title">
          <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
        </div>

        <ol ref={list} className="relative mt-14 pl-8 sm:mt-20 sm:pl-14">
          {/* The spine fills as you read down it */}
          <span
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-edge sm:left-1"
          />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-ultra sm:left-1"
          />

          {t.steps.map((step, i) => (
            <li
              key={step.name}
              className="relative grid gap-x-10 gap-y-2 border-b border-edge py-7 last:border-b-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:py-9 lg:grid-cols-[18rem_minmax(0,1fr)]"
            >
              <span
                aria-hidden
                className="absolute -left-8 top-[2.1rem] h-1.5 w-1.5 -translate-x-[3px] rounded-full bg-ultra sm:-left-13 sm:top-[2.6rem]"
              />
              <h3 className="flex items-baseline gap-4">
                <span className="tnum text-record text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.5rem,3.2vw,2.15rem)] text-ink">
                  {step.name}
                </span>
              </h3>
              <p className="max-w-[48ch] self-center text-body text-ink-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
