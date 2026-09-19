import type { Dictionary, Locale } from "@/content/dictionary";
import { site } from "@/config/site";
import { sectionIds } from "@/content/sections";

const navKeys = ["works", "services", "process", "faq", "contact"] as const;

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-surface="dark"
      className="bg-ink-deep pt-20 pb-10 text-paper/60 sm:pt-24"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid gap-12 border-b border-edge-dark pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="display text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-paper">
              {site.wordmark}
            </p>
            <p className="mt-4 max-w-[28ch] text-small">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.footer.sections}>
            <p className="text-record text-paper/35">{dict.footer.sections}</p>
            <ul className="mt-4 space-y-2.5">
              {navKeys.map((key) => (
                <li key={key}>
                  <a
                    href={`#${sectionIds[key]}`}
                    className="rule-link text-small transition-colors hover:text-paper"
                  >
                    {dict.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-record text-paper/35">{dict.footer.reach}</p>
            <ul className="mt-4 space-y-2.5 text-small">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="rule-link transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="rule-link tnum transition-colors hover:text-paper"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rule-link transition-colors hover:text-paper"
                >
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tnum flex flex-wrap items-center justify-between gap-4 pt-7 text-record text-paper/35">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p lang={locale}>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
