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
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
            <span className="inline-block size-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(245,200,75,0.8)]" />
            FachkundePilot
          </Link>
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm md:hidden" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher currentPageKey={currentPageKey} />
            <a href={`/${lang}/${s.login}`} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">Login</a>
            <a href={`/${lang}/${s.register}`} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(11,58,117,0.28)]">Jetzt starten</a>
          </div>
        </div>

        <nav className={`${open ? "mt-4 grid" : "hidden"} gap-2 rounded-2xl border border-white/60 bg-white/85 p-3 text-sm text-slate-700 shadow-sm md:mt-3 md:grid md:grid-flow-col md:auto-cols-max md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          <a href={buildLocalizedPath(lang, "exam")} className="rounded-lg px-2 py-1 hover:bg-slate-100">Prüfung</a>
          <a href={buildLocalizedPath(lang, "materials")} className="rounded-lg px-2 py-1 hover:bg-slate-100">Lernmaterial</a>
          <a href={buildLocalizedPath(lang, "demo")} className="rounded-lg px-2 py-1 hover:bg-slate-100">Demo</a>
          <a href={buildLocalizedPath(lang, "pricing")} className="rounded-lg px-2 py-1 hover:bg-slate-100">Preise</a>
          <a href={buildLocalizedPath(lang, "faq")} className="rounded-lg px-2 py-1 hover:bg-slate-100">FAQ</a>
          <a href={buildLocalizedPath(lang, "contact")} className="rounded-lg px-2 py-1 hover:bg-slate-100">Kontakt</a>
          <div className="mt-2 md:hidden"><LanguageSwitcher currentPageKey={currentPageKey} /></div>
        </nav>
      </div>
    </header>
  );
}
