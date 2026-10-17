import type { Dictionary, Locale } from "@/content/dictionary";
import { works } from "@/content/works";
import Vitrine from "./Vitrine";
import RevealText from "./motion/RevealText";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = works[0];

  // One choreography on arrival: the headline sets itself word by word, then
  // the sentence follows it in.
  const wordsInFirstLine = dict.hero.lines[0].split(" ").length;
  const secondLineDelay = wordsInFirstLine * 0.055;

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24 xl:pt-28">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <h2 className="display text-[clamp(2.3rem,6.6vw,5.5rem)] text-paper">
              {dict.hero.lines.map((line, i) => (
                <RevealText
                  key={line}
                  as="span"
                  text={line}
                  delay={i === 0 ? 0.1 : 0.1 + secondLineDelay}
                  className="block"
                />
              ))}
            </h2>

            <p
              className="animate-line-rise mt-8 max-w-[46ch] text-lead text-paper-muted"
              style={{ animationDelay: "560ms" }}
            >
              {dict.hero.lead}
            </p>
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
        <ul className="grid border-t border-edge-dark sm:grid-cols-3">
          {dict.services.items.map((item) => (
            <li
              key={item.name}
              className="border-b border-edge-dark px-1 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:first:pl-1 sm:last:border-r-0"
            >
              <p className="display text-[1.35rem] text-paper">{item.name}</p>
              <p className="mt-1.5 max-w-[34ch] text-small text-paper-muted">
                {item.tagline}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
