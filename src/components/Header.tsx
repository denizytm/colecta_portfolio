"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/dictionary";
import { site } from "@/config/site";
import { sectionIds } from "@/content/sections";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const sections = ["works", "services", "process", "faq"] as const;

export default function Header({ locale, dict }: Props) {
  const [lifted, setLifted] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The page ground is dark, so the bar is light by default and flips only
  // while the one light band is passing underneath it.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setLifted(window.scrollY > 24);

      const line = (window.innerWidth >= 640 ? 80 : 64) / 2;
      const light = [
        ...document.querySelectorAll("[data-surface='light']"),
      ].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= line && r.bottom >= line;
      });
      setOnLight(light);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock the page behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const other: Locale = locale === "tr" ? "en" : "tr";

  const surface = lifted
    ? onLight
      ? "border-b border-edge bg-paper/85 backdrop-blur-md"
      : "border-b border-edge-dark bg-ink/80 backdrop-blur-md"
    : "border-b border-transparent";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ultra-deep focus:px-5 focus:py-2 focus:text-small focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${surface}`}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 xl:px-12">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2.5"
            aria-label={site.name}
          >
            <Image
              src="/brand/colecta-mark.png"
              alt=""
              width={256}
              height={256}
              priority
              className="h-7 w-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 sm:h-8 sm:w-8"
            />
            <span
              className={`display text-[1.35rem] font-normal leading-none transition-colors duration-500 sm:text-[1.55rem] ${
                onLight ? "text-ink" : "text-paper"
              }`}
            >
              {site.wordmark}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {sections.map((key) => (
              <a
                key={key}
                href={`#${sectionIds[key]}`}
                className={`rule-link text-small transition-colors duration-500 ${
                  onLight
                    ? "text-ink-muted hover:text-ink"
                    : "text-paper-muted hover:text-paper"
                }`}
              >
                {dict.nav[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <LocaleSwitch
              locale={locale}
              other={other}
              dict={dict}
              onLight={onLight}
            />

            <a
              href={`#${sectionIds.contact}`}
              className={`hidden rounded-full px-5 py-2.5 text-small transition-colors duration-300 hover:bg-ultra-deep hover:text-white sm:inline-block ${
                onLight ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              {dict.nav.contact}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center lg:hidden"
              aria-label={dict.nav.menu}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-px transition-colors duration-500 ${
                    onLight ? "bg-ink" : "bg-paper"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px transition-colors duration-500 ${
                    onLight ? "bg-ink" : "bg-paper"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-[55] bg-ink-deep transition-[opacity,visibility] duration-400 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8">
          <span className="flex items-center gap-2.5">
            <Image
              src="/brand/colecta-mark.png"
              alt=""
              width={256}
              height={256}
              className="h-7 w-7"
            />
            <span className="display text-[1.35rem] font-normal leading-none text-paper">
              {site.wordmark}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="text-small text-paper-muted"
          >
            {dict.nav.close}
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-6 sm:px-8">
          {[...sections, "contact" as const].map((key, i) => (
            <a
              key={key}
              href={`#${sectionIds[key]}`}
              onClick={() => setMenuOpen(false)}
              className="border-b border-edge-dark py-5 text-[1.75rem] leading-tight text-paper"
              style={{
                transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(0.75rem)",
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
              }}
            >
              <span className="display">{dict.nav[key]}</span>
            </a>
          ))}
        </nav>

        <div className="px-5 pt-10 text-small text-paper-muted sm:px-8">
          <a href={`mailto:${site.email}`} className="rule-link block w-fit">
            {site.email}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="rule-link mt-2 block w-fit"
          >
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </>
  );
}

function LocaleSwitch({
  locale,
  other,
  dict,
  onLight,
}: {
  locale: Locale;
  other: Locale;
  dict: Dictionary;
  onLight: boolean;
}) {
  return (
    <div
      className="tnum flex items-center gap-1.5 text-record"
      aria-label={dict.localeSwitch.label}
    >
      <span
        className={`transition-colors duration-500 ${
          onLight ? "text-ink" : "text-paper"
        }`}
        aria-current="true"
      >
        {locale.toUpperCase()}
      </span>
      <span aria-hidden className={onLight ? "text-edge" : "text-paper-muted"}>
        /
      </span>
      <Link
        href={`/${other}`}
        className={`transition-colors duration-500 ${
          onLight
            ? "text-ink-faint hover:text-ultra-deep"
            : "text-paper-muted hover:text-ultra-bright"
        }`}
        hrefLang={other}
      >
        {other.toUpperCase()}
      </Link>
    </div>
  );
}
