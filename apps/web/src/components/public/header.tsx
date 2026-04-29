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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#eef1f6]/95 backdrop-blur">
      <div className="mx-auto max-w-[1520px] px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${lang}`} className="inline-flex items-center gap-3 text-sm font-semibold text-slate-900">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(145deg,#1e3a8a,#10285f)] text-yellow-300">✦</span>
            <span className="flex flex-col leading-tight"><span className="text-4xl font-bold tracking-tight">FachkundePilot</span><span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Lernplattform</span></span>
          </Link>
          <button className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-sm shadow-sm md:hidden" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher currentPageKey={currentPageKey} />
            <a href={`/${lang}/${s.login}`} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">Login</a>
            <a href={`/${lang}/${s.register}`} className="rounded-2xl bg-[#142d63] px-5 py-2.5 text-sm font-semibold text-white">Jetzt starten</a>
          </div>
        </div>

        <nav className={`${open ? "mt-4 grid" : "hidden"} gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 md:mt-0 md:grid md:grid-flow-col md:auto-cols-max md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
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
