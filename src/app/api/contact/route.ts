import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Mail is sent through Resend (https://resend.com) over its REST API, so no
 * extra dependency is needed. Set these in Vercel → Settings → Environment
 * Variables:
 *
 *   RESEND_API_KEY   re_xxx                 (required to actually send)
 *   CONTACT_TO       you@yourdomain.com     (required — where mail lands)
 *   CONTACT_FROM     Colecta <no-reply@yourdomain.com>
 *                    optional; the domain must be verified in Resend
 *
 * Without RESEND_API_KEY the endpoint reports that it is not configured and
 * the form points people at WhatsApp instead, so the page never lies about
 * having delivered a message.
 */

export const runtime = "nodejs";

const LIMITS = { name: 120, contact: 160, subject: 120, message: 4000 } as const;

type Payload = {
  name?: string;
  contact?: string;
  subject?: string;
  message?: string;
  locale?: string;
  /** Honeypot — real people never fill this in. */
  company?: string;
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.company) {
    // Quietly accept and drop spam so bots get no signal.
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const contact = clean(body.contact, LIMITS.contact);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY or CONTACT_TO is not set — message not delivered.",
    );
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const lines = [
    `Ad: ${name}`,
    `İletişim: ${contact}`,
    `Konu: ${subject || "—"}`,
    `Dil: ${body.locale === "en" ? "English" : "Türkçe"}`,
    "",
    message,
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Colecta <onboarding@resend.dev>",
        to: [to],
        reply_to: contact.includes("@") ? contact : undefined,
        subject: `Yeni teklif talebi — ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the message:", await res.text());
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Could not reach the mail provider:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
