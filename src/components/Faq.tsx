"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { SectionHead } from "./Works";
import { sectionIds } from "@/content/sections";

export default function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id={sectionIds.faq}
      className="py-24 sm:py-32"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div id="faq-title">
          <SectionHead kicker={t.kicker} title={t.title} />
        </div>

        <div className="mt-12 max-w-[64rem] border-t border-edge sm:mt-16">
          {t.items.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q} className="border-b border-edge">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-start justify-between gap-8 py-6 text-left"
                  >
                    <span className="max-w-[40ch] text-lead text-ink transition-colors duration-300 group-hover:text-ultra">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 block h-2.5 w-2.5 shrink-0 border-b border-r border-ink-faint transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)]"
                      style={{
                        transform: expanded
                          ? "rotate(-135deg) translateY(-2px)"
                          : "rotate(45deg)",
                      }}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-[62ch] pb-7 pr-8 text-body text-ink-muted"
                      style={{
                        opacity: expanded ? 1 : 0,
                        transition: "opacity 400ms ease",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
