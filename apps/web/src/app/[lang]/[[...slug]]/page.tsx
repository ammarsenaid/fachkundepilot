import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { PublicFooter } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/header";
import {
  getLanguageByCode,
  getPageByKey,
  getPageSections,
  getPageTranslationByLanguage,
  getPageTranslationBySlug,
  getSectionTranslationByLanguage,
} from "@/lib/directus/content";
import { buildPageMetadata } from "@/lib/public/seo";
import { buildLocalizedPath, findPageKey, getPageContent, type PublicPageKey } from "@/lib/public/content";
import { directionForLanguage, isSupportedLanguage, type SupportedLanguage } from "@/lib/public/i18n";

export const revalidate = 300;

async function resolvePage(lang: SupportedLanguage, slug?: string[]): Promise<{ key: PublicPageKey; pageId: string } | null> {
  const slugValue = slug?.[0] ?? "";
  const language = await getLanguageByCode(lang);
  if (!language) return null;

  if (!slugValue) {
    const home = await getPageByKey("home");
    if (!home) return { key: "home", pageId: "page_home" };
    return { key: "home", pageId: home.id };
  }

  const translation = await getPageTranslationBySlug(language.id, slugValue);
  if (translation) {
    const key = findPageKey(lang, slugValue);
    return { key: key ?? "home", pageId: translation.page_id };
  }

  const fallbackKey = findPageKey(lang, slugValue);
  if (!fallbackKey) return null;
  const page = await getPageByKey(fallbackKey === "exam" ? "exam_explained" : fallbackKey === "materials" ? "learning_material" : fallbackKey);
  return { key: fallbackKey, pageId: page?.id ?? "page_home" };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isSupportedLanguage(lang)) return {};
  const resolved = await resolvePage(lang, slug);
  if (!resolved) return {};

  const language = await getLanguageByCode(lang);
  const translation = language ? await getPageTranslationByLanguage(resolved.pageId, language.id) : null;
  if (translation) {
    return {
      ...buildPageMetadata(lang, resolved.key),
      title: translation.seo_title || translation.title,
      description: translation.seo_description || translation.content_summary,
      openGraph: {
        title: translation.og_title || translation.title,
        description: translation.og_description || translation.content_summary,
      },
    };
  }
  return buildPageMetadata(lang, resolved.key);
}

export default async function PublicLocalizedPage({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  const resolved = await resolvePage(lang, slug);
  if (!resolved) notFound();

  const content = getPageContent(lang, resolved.key);
  const dir = directionForLanguage(lang);
  const language = await getLanguageByCode(lang);
  const sections = await getPageSections(resolved.pageId);

  const sectionContents = await Promise.all(
    sections.map(async (section) => {
      const tr = language ? await getSectionTranslationByLanguage(section.id, language.id) : null;
      return tr;
    }),
  );

  const visibleSections = sectionContents.filter(Boolean);
  const isHome = resolved.key === "home";

  return (
    <div dir={dir} className="min-h-screen bg-[radial-gradient(80%_40%_at_50%_0%,rgba(88,141,220,0.20),transparent),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_40%,#ffffff_100%)]">
      <PublicHeader lang={lang} currentPageKey={resolved.key} />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {isHome ? (
          <article className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-12">
            <span className="inline-flex rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-1 text-xs font-semibold tracking-wide text-[var(--primary)]">Professionelle Prüfungsvorbereitung</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-base text-slate-600 md:text-lg">{content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={buildLocalizedPath(lang, "register")} className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(11,58,117,0.35)]">Kostenlos starten</Link>
              <Link href={buildLocalizedPath(lang, "materials")} className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm">Lernmaterial ansehen</Link>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm"><p className="text-xs uppercase tracking-wide text-slate-500">Strukturiert</p><p className="mt-1 font-semibold text-slate-800">Klare Lernpfade</p></div>
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm"><p className="text-xs uppercase tracking-wide text-slate-500">Praxisnah</p><p className="mt-1 font-semibold text-slate-800">Reale Prüfungslogik</p></div>
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm"><p className="text-xs uppercase tracking-wide text-slate-500">Mehrsprachig</p><p className="mt-1 font-semibold text-slate-800">Deutsch, Englisch, Arabisch</p></div>
            </div>
          </article>
        ) : (
          <article className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{content.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-600">{content.intro}</p>
            {resolved.key === "login" && <LoginForm />}
            {resolved.key === "register" && <RegisterForm />}
          </article>
        )}

        <section className="mt-8 grid gap-4 md:gap-5">
          {visibleSections.length > 0 ? (
            visibleSections.map((section) => (
              <article key={section!.id} className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">Abschnitt</span>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">{section!.heading}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section!.body}</p>
              </article>
            ))
          ) : (
            <article className="rounded-2xl border border-white/70 bg-white/85 p-5 text-sm text-slate-600 shadow-sm">Content unavailable in this language yet.</article>
          )}
        </section>
      </main>
      <PublicFooter lang={lang} />
    </div>
  );
}
