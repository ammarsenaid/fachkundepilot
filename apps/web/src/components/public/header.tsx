"use client";

import Link from "next/link";
import { useState } from "react";

import { buildLocalizedPath, pageSlugs, type PublicPageKey } from "@/lib/public/content";
import type { SupportedLanguage } from "@/lib/public/i18n";
import { LanguageSwitcher } from "./language-switcher";

export function PublicHeader({ lang, currentPageKey }: { lang: SupportedLanguage; currentPageKey: PublicPageKey }) {
  const s = pageSlugs[lang];
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${lang}`} className="text-sm font-semibold text-[var(--primary)]">FachkundePilot</Link>
          <button className="rounded border px-3 py-1 text-sm md:hidden" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher currentPageKey={currentPageKey} />
            <a href={`/${lang}/${s.login}`} className="rounded border px-3 py-1 text-xs">Login</a>
            <a href={`/${lang}/${s.register}`} className="rounded bg-[var(--primary)] px-3 py-1 text-xs text-white">Start</a>
          </div>
        </div>

        <nav className={`${open ? "mt-4 grid" : "hidden"} gap-2 text-sm text-slate-700 md:mt-3 md:grid md:grid-flow-col md:auto-cols-max md:gap-3`}>
          <a href={buildLocalizedPath(lang, "exam")}>Prüfung</a>
          <a href={buildLocalizedPath(lang, "materials")}>Lernmaterial</a>
          <a href={buildLocalizedPath(lang, "demo")}>Demo</a>
          <a href={buildLocalizedPath(lang, "pricing")}>Preise</a>
          <a href={buildLocalizedPath(lang, "faq")}>FAQ</a>
          <a href={buildLocalizedPath(lang, "contact")}>Kontakt</a>
          <div className="mt-2 md:hidden"><LanguageSwitcher currentPageKey={currentPageKey} /></div>
        </nav>
      </div>
    </header>
  );
}
