"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Dictionary, Locale } from "@/content/dictionary";
import { works } from "@/content/works";
import { sectionIds } from "@/content/sections";
import SectionHead from "./SectionHead";

export default function Works({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.works;
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The dark band arrives as its own object: it rises a little, widens to
  // full bleed and squares off its top corners as the section comes up. The
  // band is a separate layer behind the content, so the text is never clipped
  // and nothing depends on the animation having run.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "start 62%"],
  });
  const ease = (v: number) => (reduced ? 1 : v);
  const scaleX = useTransform(scrollYProgress, (v) => 0.955 + ease(v) * 0.045);
  const lift = useTransform(scrollYProgress, (v) => (1 - ease(v)) * 34);
  const corner = useTransform(scrollYProgress, (v) => `${(1 - ease(v)) * 44}px`);

  return (
    <section
      ref={section}
      id={sectionIds.works}
      data-surface="dark"
      className="relative mt-24 py-24 text-paper sm:mt-32 sm:py-32"
    >
      <motion.div
        aria-hidden
        style={{
          scaleX,
          y: lift,
          borderTopLeftRadius: corner,
          borderTopRightRadius: corner,
        }}
        className="pointer-events-none absolute inset-0 -z-10 origin-top bg-ink"
      />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} onDark />

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {works.map((work) => (
            <article
              key={work.slug}
              className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-xl border border-edge-dark bg-ink-deep"
              >
                <div
                  className={`relative aspect-[16/10] ${
                    work.imageFit === "contain" ? "" : "bg-paper"
                  }`}
                >
                  <Image
                    src={work.image}
                    alt={work.client}
                    fill
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className={`transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                      work.imageFit === "contain"
                        ? "object-contain p-8"
                        : "object-cover object-top"
                    }`}
                  />
                </div>
              </motion.div>

              <div>
                <h3 className="display text-[clamp(1.9rem,4vw,2.9rem)] text-paper">
                  {work.client}
                </h3>
                <p className="mt-5 max-w-[48ch] text-body text-paper/65">
                  {work.summary[locale]}
                </p>

                {/* The record fills in line by line, the way a catalogue entry
                    is written up rather than stamped out all at once. */}
                <dl className="mt-9 border-t border-edge-dark text-record">
                  {[
                    [
                      t.recordNo,
                      <span key="no" className="tnum text-ultra-bright">
                        K-{String(work.no).padStart(2, "0")}
                      </span>,
                    ],
                    [
                      t.recordYear,
                      <span key="year" className="tnum">
                        {work.year}
                      </span>,
                    ],
                    [t.recordKind, work.kind[locale]],
                    [t.recordStack, work.stack.join(", ")],
                    [t.recordDelivered, work.delivered[locale].join(", ")],
                  ].map(([label, value], i) => (
                    <motion.div
                      key={String(label)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 border-b border-edge-dark py-3 sm:grid-cols-[11rem_minmax(0,1fr)]"
                    >
                      <dt className="text-paper/40">{label}</dt>
                      <dd className="text-paper/85">{value}</dd>
                    </motion.div>
                  ))}
                </dl>

                {work.href && (
                  <a
                    href={work.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rule-link mt-8 inline-block text-body text-ultra-bright"
                  >
                    {t.visit}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* The empty slot is honest about where the collection stands. */}
        <div className="mt-20 rounded-xl border border-dashed border-edge-dark px-7 py-12 sm:mt-28 sm:px-12 sm:py-16">
          <RevealSlot text={t.nextSlot} />
          <a
            href={`#${sectionIds.contact}`}
            className="mt-6 inline-block rounded-full border border-paper/25 px-6 py-3 text-small text-paper transition-colors duration-300 hover:border-ultra-bright hover:text-ultra-bright"
          >
            {t.nextSlotCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function RevealSlot({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="display max-w-[22ch] text-[clamp(1.5rem,3.2vw,2.25rem)] text-paper"
    >
      {text}
    </motion.p>
  );
}
