"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/content/dictionary";
import { site, whatsappUrl } from "@/config/site";
import { sectionIds } from "@/content/sections";

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
      className="bg-ink py-24 text-paper sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 xl:px-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-record text-ultra-bright">{t.kicker}</p>
            <h2
              id="contact-title"
              className="display mt-3 text-[clamp(2.1rem,5.4vw,3.75rem)] text-paper"
            >
              {t.title}
            </h2>
            <p className="mt-6 max-w-[42ch] text-lead text-paper/60">
              {t.lead}
            </p>

            <a
              href={whatsappUrl(t.whatsappPrefill)}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-block rounded-full bg-paper px-7 py-3.5 text-body text-ink transition-colors duration-300 hover:bg-ultra-bright hover:text-white"
            >
              {t.whatsapp}
            </a>

            <dl className="mt-12 border-t border-edge-dark text-small">
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
                    <option key={o} value={o} className="bg-ink text-paper">
                      {o}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-1 top-2 block h-2 w-2 rotate-45 border-b border-r border-paper/50"
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
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-ultra-bright px-7 py-3.5 text-body text-white transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-60"
              >
                {status === "sending" ? t.form.submitting : t.form.submit}
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`max-w-[34ch] text-small ${
                  status === "failed" ? "text-ultra-bright" : "text-paper/60"
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
  "w-full border-b border-edge-dark bg-transparent pb-3 pt-1 text-body text-paper placeholder:text-paper/30 transition-colors duration-300 focus:border-ultra-bright focus:outline-none";

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
      <label htmlFor={`contact-${name}`} className="block text-record text-paper/45">
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
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-edge-dark py-3.5">
      <dt className="text-paper/40">{label}</dt>
      <dd className="text-paper/85">{children}</dd>
    </div>
  );
}
