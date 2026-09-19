import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content/dictionary";
import { site } from "@/config/site";
import { works } from "@/content/works";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: dict.meta.description,
    url: `${site.url}/${locale}`,
    email: site.email,
    telephone: site.phoneE164,
    sameAs: [site.instagram],
    areaServed: "TR",
    makesOffer: dict.services.items.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.name, description: item.body },
    })),
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    ...(works.length > 0 && {
      workExample: works.map((w) => ({
        "@type": "CreativeWork",
        name: w.client,
        url: w.href ?? undefined,
        dateCreated: String(w.year),
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header locale={locale} dict={dict} />
      <main id="main">
        <Hero locale={locale} dict={dict} />
        <Works locale={locale} dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Faq dict={dict} />
        <Contact locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
