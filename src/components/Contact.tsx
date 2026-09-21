"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/content/dictionary";
import { site, whatsappUrl } from "@/config/site";
import { sectionIds } from "@/content/sections";
import RevealText from "./motion/RevealText";
import Magnetic from "./motion/Magnetic";

type Status = "idle" | "sending" | "sent" | "failed";

export default function Contact({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section
      id={sectionIds.contact}
      data-surface="light"
      className="bg-paper py-24 text-ink sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-record text-ultra-deep">{t.kicker}</p>
            <RevealText
              as="h2"
              id="contact-title"
              text={t.title}
              delay={0.08}
              className="display mt-3 text-[clamp(2.1rem,5.4vw,3.75rem)] text-ink"
            />
            <p className="mt-6 max-w-[42ch] text-lead text-ink-muted">
              {t.lead}
            </p>

            <Magnetic className="mt-9">
              <a
                href={whatsappUrl(t.whatsappPrefill)}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-ink px-7 py-3.5 text-body text-paper transition-colors duration-300 hover:bg-ultra-deep hover:text-white"
              >
                {t.whatsapp}
              </a>
            </Magnetic>

            <dl className="mt-12 border-t border-edge text-small">
              <DirectRow label={t.emailLabel}>
                <a href={`mailto:${site.email}`} className="rule-link">
                  {site.email}
                </a>
              </DirectRow>
              <DirectRow label={t.phoneLabel}>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="rule-link tnum"
                >
                  {site.phoneDisplay}
                </a>
              </DirectRow>
              <DirectRow label={t.instagramLabel}>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rule-link"
                >
                  {site.instagramHandle}
                </a>
              </DirectRow>
            </dl>
          </div>

          <form onSubmit={onSubmit} className="grid gap-7">
            {/* Honeypot: hidden from people, irresistible to bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
            />

            <Field name="name" label={t.form.name}>
              <input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                placeholder={t.form.namePlaceholder}
                className={inputClass}
              />
            </Field>

            <Field name="contact" label={t.form.contact}>
              <input
                id="contact-contact"
                name="contact"
                required
                placeholder={t.form.contactPlaceholder}
                className={inputClass}
              />
            </Field>

            <Field name="subject" label={t.form.subject}>
              <div className="relative">
                <select
                  id="contact-subject"
                  name="subject"
                  defaultValue={t.form.subjectOptions[0]}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  {t.form.subjectOptions.map((o) => (
                    <option key={o} value={o} className="bg-paper text-ink">
                      {o}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-1 top-2 block h-2 w-2 rotate-45 border-b border-r border-ink-faint"
                />
              </div>
            </Field>

            <Field name="message" label={t.form.message}>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder={t.form.messagePlaceholder}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-ultra-deep px-7 py-3.5 text-body text-white transition-colors duration-300 hover:bg-ink hover:text-paper disabled:opacity-60"
                >
                  {status === "sending" ? t.form.submitting : t.form.submit}
                </button>
              </Magnetic>

              <p
                role="status"
                aria-live="polite"
                className={`max-w-[34ch] text-small ${
                  status === "failed" ? "text-ultra-deep" : "text-ink-muted"
                }`}
              >
                {status === "sent" && t.form.success}
                {status === "failed" && t.form.error}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full border-b border-edge bg-transparent pb-3 pt-1 text-body text-ink placeholder:text-ink-faint/70 transition-colors duration-300 focus:border-ultra-deep focus:outline-none";

function Field({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="block text-record text-ink-muted">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function DirectRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-edge py-3.5">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
