/**
 * Anchor ids are locale-independent so /tr and /en share one URL shape.
 *
 * This lives outside any "use client" module on purpose: server components
 * (Hero, Works, Footer) read these values too, and exports crossing the
 * client boundary arrive as opaque references rather than plain strings.
 */
export const sectionIds = {
  works: "isler",
  services: "hizmetler",
  process: "surec",
  faq: "sorular",
  contact: "iletisim",
} as const;

export type SectionKey = keyof typeof sectionIds;
