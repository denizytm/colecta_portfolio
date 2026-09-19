"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { SectionHead } from "./Works";
import { sectionIds } from "@/content/sections";

export default function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id={sectionIds.services}
      className="py-24 sm:py-32"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div id="services-title">
          <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
        </div>

        <div className="mt-14 border-t border-edge sm:mt-20">
          {t.items.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.name} className="border-b border-edge">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`service-panel-${i}`}
                    className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-6 py-8 text-left sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_auto] sm:gap-10 sm:py-10"
                  >
                    <span className="display text-[clamp(1.6rem,3.6vw,2.5rem)] text-ink transition-colors duration-300 group-hover:text-ultra">
                      {item.name}
                    </span>
                    <span className="hidden max-w-[42ch] self-center text-body text-ink-muted sm:block">
                      {item.tagline}
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge transition-colors duration-300 group-hover:border-ultra sm:mt-3"
                    >
                      <span className="relative block h-3 w-3">
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                        <span
                          className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)]"
                          style={{
                            transform: `translateX(-50%) scaleY(${expanded ? 0 : 1})`,
                          }}
                        />
                      </span>
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="grid gap-8 pb-10 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:gap-10"
                      style={{
                        opacity: expanded ? 1 : 0,
                        transition: "opacity 400ms ease",
                      }}
                    >
                      <p className="max-w-[40ch] text-body text-ink-muted sm:hidden">
                        {item.tagline}
                      </p>
                      <p className="max-w-[42ch] text-body text-ink-muted">
                        {item.body}
                      </p>
                      <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {item.includes.map((line) => (
                          <li
                            key={line}
                            className="flex gap-3 text-small text-ink"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.6em] h-1 w-1 shrink-0 bg-ultra"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-xl bg-paper-raised px-7 py-9 sm:px-10 sm:py-11">
          <p className="display text-[1.35rem] text-ink">{t.includedTitle}</p>
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.included.map((line) => (
              <li key={line} className="flex gap-3 text-small text-ink-muted">
                <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 bg-ultra" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
