import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/content/dictionary";

/**
 * Every page lives under /tr or /en. Anything arriving without a locale
 * prefix is sent to the default one, keeping a single canonical URL shape.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Honour the browser's preference for first-time visitors at the root.
  const preferred = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("tr")
    ? "tr"
    : pathname === "/"
      ? guessFromHeader(request)
      : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function guessFromHeader(request: NextRequest) {
  const header = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return header.includes("tr") ? "tr" : header ? "en" : defaultLocale;
}

export const config = {
  // Skip API routes, Next internals and anything that looks like a file.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
