import { pageSlugs } from "@/lib/public/content";
import type { SupportedLanguage } from "@/lib/public/i18n";

export function PublicFooter({ lang }: { lang: SupportedLanguage }) {
  const s = pageSlugs[lang];
  return (
    <footer className="mt-20 border-t border-white/50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-slate-600">
        <p>© FachkundePilot</p>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-[var(--primary)]" href={`/${lang}/${s.imprint}`}>Impressum</a>
          <a className="hover:text-[var(--primary)]" href={`/${lang}/${s.privacy}`}>Datenschutz</a>
          <a className="hover:text-[var(--primary)]" href={`/${lang}/${s.terms}`}>AGB</a>
        </div>
      </div>
    </footer>
  );
}
