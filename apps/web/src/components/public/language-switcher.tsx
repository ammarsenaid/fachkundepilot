"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { buildLocalizedPath, type PublicPageKey } from "@/lib/public/content";
import { supportedLanguages, type SupportedLanguage } from "@/lib/public/i18n";

export function LanguageSwitcher({ currentPageKey }: { currentPageKey: PublicPageKey }) {
  const pathname = usePathname();

  useEffect(() => {
    const current = pathname?.split("/")[1];
    if (current && supportedLanguages.includes(current as SupportedLanguage)) {
      localStorage.setItem("fachkundepilot_lang", current);
    }
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      {supportedLanguages.map((lang) => (
        <a key={lang} href={buildLocalizedPath(lang, currentPageKey)} className="rounded border px-2 py-1 text-xs uppercase">
          {lang}
        </a>
      ))}
    </div>
  );
}
