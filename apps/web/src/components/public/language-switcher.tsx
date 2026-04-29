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
    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {supportedLanguages.map((lang) => (
        <a key={lang} href={buildLocalizedPath(lang, currentPageKey)} className="rounded-lg px-2 py-1 text-[11px] font-semibold uppercase text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          {lang}
        </a>
      ))}
    </div>
  );
}
