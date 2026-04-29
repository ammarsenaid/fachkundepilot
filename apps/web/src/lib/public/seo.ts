import type { Metadata } from "next";

import { getPageContent, pageSlugs, type PublicPageKey } from "./content";
import { supportedLanguages, type SupportedLanguage } from "./i18n";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost").replace(/\/$/, "");
}

function pagePath(lang: SupportedLanguage, key: PublicPageKey) {
  const slug = pageSlugs[lang][key];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function buildPageMetadata(lang: SupportedLanguage, key: PublicPageKey): Metadata {
  const content = getPageContent(lang, key);
  const canonical = `${siteUrl()}${pagePath(lang, key)}`;

  const languages = Object.fromEntries(
    supportedLanguages.map((l) => [l, `${siteUrl()}${pagePath(l, key)}`]),
  );

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: content.title,
      description: content.intro,
      url: canonical,
      siteName: "FachkundePilot",
      type: "website",
      locale: lang,
    },
  };
}
