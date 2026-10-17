import type { Dictionary } from "@/content/dictionary";
import { sectionIds } from "@/content/sections";
import Ribbon from "./Ribbon";
import RevealText from "./motion/RevealText";
import Magnetic from "./motion/Magnetic";

export default function Brand({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 xl:pt-52 xl:pb-40">
      <Ribbon />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="max-w-[64rem]">
          <RevealText
            as="h1"
            text="Colecta"
            delay={0.08}
            className="display block leading-[0.86] text-paper text-[clamp(4.5rem,15vw,11rem)]"
          />

          <p
            className="animate-line-rise mt-7 max-w-[42ch] text-lead italic text-paper"
            style={{ animationDelay: "480ms" }}
          >
            {dict.brand.tagline}
          </p>

          <p
            className="animate-line-rise mt-6 max-w-[52ch] text-lead text-paper-muted"
            style={{ animationDelay: "640ms" }}
          >
            {dict.brand.lead}
          </p>

          <div
            className="animate-line-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "800ms" }}
          >
            <Magnetic>
              <a
                href={`#${sectionIds.contact}`}
                className="inline-block rounded-full bg-ultra-deep px-7 py-3.5 text-body text-white transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                {dict.brand.primaryCta}
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={`#${sectionIds.works}`}
                className="rule-link inline-block px-1 py-3.5 text-body text-paper"
              >
                {dict.brand.secondaryCta}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
