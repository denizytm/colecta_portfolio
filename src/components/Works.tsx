import Image from "next/image";
import type { Dictionary, Locale } from "@/content/dictionary";
import { works } from "@/content/works";
import { sectionIds } from "@/content/sections";

export default function Works({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.works;

  return (
    <section
      id={sectionIds.works}
      className="mt-24 bg-ink py-24 text-paper sm:mt-32 sm:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} onDark />

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {works.map((work) => (
            <article
              key={work.slug}
              className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14"
            >
              <div className="group overflow-hidden rounded-xl border border-edge-dark bg-ink-deep">
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
              </div>

              <div>
                <h3 className="display text-[clamp(1.9rem,4vw,2.9rem)] text-paper">
                  {work.client}
                </h3>
                <p className="mt-5 max-w-[48ch] text-body text-paper/65">
                  {work.summary[locale]}
                </p>

                <dl className="mt-9 border-t border-edge-dark text-record">
                  <Row label={t.recordNo}>
                    <span className="tnum text-ultra-bright">
                      K-{String(work.no).padStart(2, "0")}
                    </span>
                  </Row>
                  <Row label={t.recordYear}>
                    <span className="tnum">{work.year}</span>
                  </Row>
                  <Row label={t.recordKind}>{work.kind[locale]}</Row>
                  <Row label={t.recordStack}>{work.stack.join(", ")}</Row>
                  <Row label={t.recordDelivered}>
                    {work.delivered[locale].join(", ")}
                  </Row>
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
          <p className="display max-w-[22ch] text-[clamp(1.5rem,3.2vw,2.25rem)] text-paper">
            {t.nextSlot}
          </p>
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 border-b border-edge-dark py-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <dt className="text-paper/40">{label}</dt>
      <dd className="text-paper/85">{children}</dd>
    </div>
  );
}

export function SectionHead({
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
        <p
          className={`text-record ${onDark ? "text-ultra-bright" : "text-ultra"}`}
        >
          {kicker}
        </p>
        <h2
          className={`display mt-3 text-[clamp(2.1rem,5.4vw,3.75rem)] ${
            onDark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {lead && (
        <p
          className={`max-w-[54ch] self-end text-lead ${
            onDark ? "text-paper/60" : "text-ink-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
