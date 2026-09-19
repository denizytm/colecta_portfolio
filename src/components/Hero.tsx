import type { Dictionary, Locale } from "@/content/dictionary";
import { works } from "@/content/works";
import { sectionIds } from "@/content/sections";
import Vitrine from "./Vitrine";
import RevealText from "./motion/RevealText";
import Magnetic from "./motion/Magnetic";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = works[0];

  // One choreography on arrival: the headline sets itself word by word, then
  // the sentence and the controls follow it in.
  const wordsInFirstLine = dict.hero.lines[0].split(" ").length;
  const secondLineDelay = wordsInFirstLine * 0.055;

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 xl:pt-44">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <h1 className="display text-[clamp(2.9rem,8.4vw,7rem)] text-ink">
              {dict.hero.lines.map((line, i) => (
                <RevealText
                  key={line}
                  as="span"
                  text={line}
                  delay={i === 0 ? 0.1 : 0.1 + secondLineDelay}
                  className="block"
                />
              ))}
            </h1>

            <p
              className="animate-line-rise mt-8 max-w-[46ch] text-lead text-ink-muted"
              style={{ animationDelay: "560ms" }}
            >
              {dict.hero.lead}
            </p>

            <div
              className="animate-line-rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "680ms" }}
            >
              <Magnetic>
                <a
                  href={`#${sectionIds.contact}`}
                  className="inline-block rounded-full bg-ultra px-7 py-3.5 text-body text-white transition-colors duration-300 hover:bg-ink"
                >
                  {dict.hero.primaryCta}
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={`#${sectionIds.works}`}
                  className="rule-link inline-block px-1 py-3.5 text-body text-ink"
                >
                  {dict.hero.secondaryCta}
                </a>
              </Magnetic>
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
