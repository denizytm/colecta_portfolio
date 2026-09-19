import type { Dictionary, Locale } from "@/content/dictionary";
import { works } from "@/content/works";
import Vitrine from "./Vitrine";
import { sectionIds } from "@/content/sections";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = works[0];

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 xl:pt-44">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <h1 className="display text-[clamp(2.9rem,8.4vw,7rem)] text-ink">
              {dict.hero.lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span
                    className="animate-line-rise block"
                    style={{ animationDelay: `${i * 110}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="animate-line-rise mt-8 max-w-[46ch] text-lead text-ink-muted"
              style={{ animationDelay: "320ms" }}
            >
              {dict.hero.lead}
            </p>

            <div
              className="animate-line-rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "420ms" }}
            >
              <a
                href={`#${sectionIds.contact}`}
                className="rounded-full bg-ultra px-7 py-3.5 text-body text-white transition-colors duration-300 hover:bg-ink"
              >
                {dict.hero.primaryCta}
              </a>
              <a
                href={`#${sectionIds.works}`}
                className="rule-link px-1 py-3.5 text-body text-ink"
              >
                {dict.hero.secondaryCta}
              </a>
            </div>
          </div>

          {featured && (
            <div className="lg:pl-4">
              <Vitrine
                work={featured}
                locale={locale}
                visitLabel={dict.works.visit}
              />
            </div>
          )}
        </div>
      </div>

      {/* What we make, as three ruled cells rather than a decorative strip */}
      <div className="mx-auto mt-20 max-w-[88rem] px-5 sm:mt-28 sm:px-8 xl:px-12">
        <ul className="grid border-t border-edge sm:grid-cols-3">
          {dict.services.items.map((item) => (
            <li
              key={item.name}
              className="border-b border-edge px-1 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:first:pl-1 sm:last:border-r-0"
            >
              <p className="display text-[1.35rem] text-ink">{item.name}</p>
              <p className="mt-1.5 max-w-[34ch] text-small text-ink-muted">
                {item.tagline}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
