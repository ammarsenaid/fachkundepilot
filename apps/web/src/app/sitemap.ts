import type { MetadataRoute } from "next";

import { pageSlugs, type PublicPageKey } from "@/lib/public/content";
import { supportedLanguages } from "@/lib/public/i18n";

const publicKeys: PublicPageKey[] = [
  "home",
  "exam",
  "application",
  "license",
  "materials",
  "demo",
  "pricing",
  "faq",
  "contact",
  "login",
  "register",
  "imprint",
  "privacy",
  "terms",
];

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return supportedLanguages.flatMap((lang) =>
    publicKeys.map((key) => {
      const slug = pageSlugs[lang][key];
      const path = slug ? `/${lang}/${slug}` : `/${lang}`;
      return {
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
      };
    }),
  );
}
