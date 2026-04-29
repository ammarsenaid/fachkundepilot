import { pageSlugs } from "@/lib/public/content";
import type { SupportedLanguage } from "@/lib/public/i18n";

export function PublicFooter({ lang }: { lang: SupportedLanguage }) {
  const s = pageSlugs[lang];
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-slate-600">
        <p>© FachkundePilot</p>
        <div className="flex gap-3">
          <a href={`/${lang}/${s.imprint}`}>Impressum</a>
          <a href={`/${lang}/${s.privacy}`}>Datenschutz</a>
          <a href={`/${lang}/${s.terms}`}>AGB</a>
        </div>
      </div>
    </footer>
  );
}
