import type { Metadata } from "next";
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
import { findPageKey, getPageContent, type PublicPageKey } from "@/lib/public/content";
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

  return (
    <div dir={dir} className="min-h-screen bg-[var(--muted)]">
      <PublicHeader lang={lang} currentPageKey={resolved.key} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <article className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">{content.title}</h1>
          <p className="mt-4 text-slate-600">{content.intro}</p>
          {resolved.key === "login" && <LoginForm />}
          {resolved.key === "register" && <RegisterForm />}
        </article>

        <section className="mt-6 grid gap-4">
          {visibleSections.length > 0 ? (
            visibleSections.map((section) => (
              <article key={section!.id} className="rounded-xl border bg-white p-5">
                <h2 className="font-semibold">{section!.heading}</h2>
                <p className="mt-2 text-sm text-slate-600">{section!.body}</p>
              </article>
            ))
          ) : (
            <article className="rounded-xl border bg-white p-5 text-sm text-slate-600">Content unavailable in this language yet.</article>
          )}
        </section>
      </main>
      <PublicFooter lang={lang} />
    </div>
  );
}
