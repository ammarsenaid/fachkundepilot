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

const homeLabels: Record<SupportedLanguage, {
  primaryCta: string;
  secondaryCta: string;
  dashboardTag: string;
  dashboardTitle: string;
  dashboardItems: [string, string, string, string];
  benefits: [string, string, string];
  trustItems: [string, string, string];
  problemTitle: string;
  solutionTitle: string;
  pathTitle: string;
  stepLabel: string;
  pathSteps: [string, string, string, string, string];
  multiTitle: string;
  finalTitle: string;
  finalCta: string;
}> = {
  de: {
    primaryCta: "Kostenlos starten",
    secondaryCta: "Lernmaterial ansehen",
    dashboardTag: "Lern-Dashboard",
    dashboardTitle: "Dein Prüfungspfad auf einen Blick",
    dashboardItems: ["Recht & Vorschriften", "Betriebsführung", "Kaufmännisches Rechnen", "Prüfungsfragen trainieren"],
    benefits: ["Mehrsprachig lernen", "Prüfungsorientierte Inhalte", "Schritt-für-Schritt Fortschritt"],
    trustItems: ["Für Taxi- & Mietwagenprüfung", "Deutsch als Prüfungssprache", "Lernen in 3 Sprachen"],
    problemTitle: "Die Herausforderung",
    solutionTitle: "Unsere Lösung",
    pathTitle: "Dein Lernpfad",
    stepLabel: "Schritt",
    pathSteps: ["Recht", "Betrieb", "Rechnen", "Fragen", "Probeprüfung"],
    multiTitle: "Mehrsprachige Unterstützung",
    finalTitle: "Bereit für den nächsten Schritt?",
    finalCta: "Jetzt kostenlos starten",
  },
  en: {
    primaryCta: "Start free",
    secondaryCta: "View materials",
    dashboardTag: "Learning dashboard",
    dashboardTitle: "Your exam path at a glance",
    dashboardItems: ["Law & regulations", "Business operations", "Commercial math", "Exam question training"],
    benefits: ["Learn multilingual", "Exam-oriented content", "Step-by-step progress"],
    trustItems: ["Built for taxi & rental exam", "German exam language focus", "Learn in 3 languages"],
    problemTitle: "The challenge",
    solutionTitle: "Our solution",
    pathTitle: "Your learning path",
    stepLabel: "Step",
    pathSteps: ["Law", "Operations", "Math", "Questions", "Mock exam"],
    multiTitle: "Multilingual support",
    finalTitle: "Ready for the next step?",
    finalCta: "Start for free",
  },
  ar: {
    primaryCta: "ابدأ مجانًا",
    secondaryCta: "عرض المواد",
    dashboardTag: "لوحة التعلّم",
    dashboardTitle: "مسارك للاختبار بنظرة سريعة",
    dashboardItems: ["القانون واللوائح", "تشغيل الأعمال", "الحساب التجاري", "تدريب أسئلة الاختبار"],
    benefits: ["تعلّم متعدد اللغات", "محتوى موجّه للاختبار", "تقدّم خطوة بخطوة"],
    trustItems: ["مصمم لاختبار التاكسي والتأجير", "تركيز على لغة الاختبار الألمانية", "تعلّم بثلاث لغات"],
    problemTitle: "التحدي",
    solutionTitle: "حلّنا",
    pathTitle: "مسار التعلّم",
    stepLabel: "الخطوة",
    pathSteps: ["القانون", "التشغيل", "الحساب", "الأسئلة", "اختبار تجريبي"],
    multiTitle: "دعم متعدد اللغات",
    finalTitle: "هل أنت جاهز للخطوة التالية؟",
    finalCta: "ابدأ مجانًا الآن",
  },
};


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
  const pageTranslation = language ? await getPageTranslationByLanguage(resolved.pageId, language.id) : null;

  const sectionContents = await Promise.all(
    sections.map(async (section) => {
      const tr = language ? await getSectionTranslationByLanguage(section.id, language.id) : null;
      return tr ? { section, translation: tr } : null;
    }),
  );

  const visibleSections = sectionContents.filter(Boolean);
  const isHome = resolved.key === "home";

  const labels = homeLabels[lang];
  const heroSection = visibleSections.find((item) => item?.section.section_type === "hero" || item?.section.section_key === "hero")?.translation;
  const problemSection = visibleSections.find((item) => item?.section.section_key === "problem")?.translation;
  const solutionSection = visibleSections.find((item) => item?.section.section_key === "solution")?.translation;
  const finalSection = visibleSections.find((item) => item?.section.section_key === "cta")?.translation;
  const heroHeading = heroSection?.heading || pageTranslation?.title || content.title;
  const heroSubheading = heroSection?.subheading || heroSection?.body || pageTranslation?.content_summary || content.intro;

  return (
    <div dir={dir} className="min-h-screen bg-[linear-gradient(135deg,#142a5f_0%,#1f4cb9_100%)] text-slate-800">
      <PublicHeader lang={lang} currentPageKey={resolved.key} />
      <main className="mx-auto max-w-[1520px] px-4 pb-16 pt-6 md:pt-10">
        {isHome ? (
          <>
            <section className="grid gap-10 py-10 md:grid-cols-[1.03fr_1fr] md:items-center md:py-14">
              <div>
                <p className="inline-flex rounded-full bg-[#f4c83b] text-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">FachkundePilot</p>
                <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-8xl">{heroHeading}</h1>
                <p className="mt-7 max-w-2xl text-xl leading-10 text-blue-100/90">{heroSubheading}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={buildLocalizedPath(lang, "register")} className="rounded-2xl bg-[#f4c83b] text-slate-900 px-6 py-3 text-sm font-semibold shadow-[0_14px_36px_rgba(11,58,117,0.35)] transition hover:-translate-y-0.5">{labels.primaryCta}</Link>
                  <Link href={buildLocalizedPath(lang, "materials")} className="rounded-2xl border border-blue-300/40 bg-transparent text-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:bg-white">{labels.secondaryCta}</Link>
                </div>
                <p className="mt-6 text-sm text-blue-200">Die offizielle Prüfung findet auf Deutsch statt. Übersetzungen helfen beim Verständnis.</p>
              </div>
              <aside className="relative rounded-[1.8rem] border border-slate-300 bg-[#f1f1f1] p-6 text-slate-900 shadow-2xl md:p-7">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{labels.dashboardTag}</p>
                <h2 className="mt-3 text-2xl font-semibold">{labels.dashboardTitle}</h2>
                <div className="mt-6 space-y-3">
                  {labels.dashboardItems.map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-3">
                      <p className="text-sm">{item}</p>
                      <span className="text-xs text-slate-500">{20 + index * 20}%</span>
                    </div>
                  ))}
                </div>
              </aside>
            </section>

            <section className="mt-2 grid gap-3 rounded-3xl border border-white/20 bg-white/10 p-4 text-white md:grid-cols-3 md:p-5">
              {labels.trustItems.map((item) => (
                <p key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-medium text-white">{item}</p>
              ))}
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              {labels.benefits.map((benefit) => (
                <article key={benefit} className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                  <p className="text-sm font-semibold text-slate-800">{benefit}</p>
                </article>
              ))}
            </section>

            <section className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">{problemSection?.heading || labels.problemTitle}</h2>
                <p className="mt-3 text-slate-600">{problemSection?.body || "Viele Teilnehmende verstehen das Prüfungsdeutsch nicht sofort – obwohl sie die Inhalte in ihrer Sprache beherrschen."}</p>
              </article>
              <article className="rounded-3xl border border-slate-200/80 bg-[linear-gradient(140deg,#0f2b54_0%,#0b3a75_70%)] p-7 text-white shadow-xl">
                <h2 className="text-2xl font-semibold">{solutionSection?.heading || labels.solutionTitle}</h2>
                <p className="mt-3 text-slate-100">{solutionSection?.body || "FachkundePilot übersetzt komplexe Themen didaktisch klar: verstehen, üben, auf Deutsch sicher antworten."}</p>
              </article>
            </section>

            <section className="mt-12 rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:p-10">
              <h2 className="text-3xl font-semibold text-slate-900">{labels.pathTitle}</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-5">
                {labels.pathSteps.map((step, idx) => (
                  <article key={step} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{labels.stepLabel} {idx + 1}</p>
                    <p className="mt-2 font-semibold text-slate-800">{step}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-white/70 bg-white/85 p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">{labels.multiTitle}</h2>
                <p className="mt-3 text-slate-600">{lang === "de" ? "Deutsch, Englisch und Arabisch helfen beim Verstehen. Trainiert wird gezielt für die offizielle Prüfungssprache Deutsch." : lang === "en" ? "German, English, and Arabic help learners understand each topic. Training stays focused on German as the official exam language." : "الألمانية والإنجليزية والعربية تساعد على الفهم. يبقى التدريب موجهاً للغة الألمانية كلغة الاختبار الرسمية."}</p>
              </article>
              <article className="rounded-3xl border border-[var(--accent)]/40 bg-[linear-gradient(145deg,rgba(245,200,75,0.22),rgba(255,255,255,0.88))] p-7 shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
                <h2 className="text-2xl font-semibold text-slate-900">{finalSection?.heading || labels.finalTitle}</h2>
                <p className="mt-3 text-slate-700">{finalSection?.body || "Starte mit einem klaren Plan und übe bis zur sicheren Prüfungsteilnahme."}</p>
                <div className="mt-5">
                  <Link href={buildLocalizedPath(lang, "register")} className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">{labels.finalCta}</Link>
                </div>
              </article>
            </section>
          </>
        ) : (
          <article className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{content.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-600">{content.intro}</p>
            {resolved.key === "login" && <LoginForm />}
            {resolved.key === "register" && <RegisterForm />}
          </article>
        )}

        {!isHome && (
          <section className="mt-8 grid gap-4 md:gap-5">
            {visibleSections.length > 0 ? (
              visibleSections.map((item) => (
                <article key={item!.translation.id} className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">Abschnitt</span>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{item!.translation.heading}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item!.translation.body}</p>
                </article>
              ))
            ) : (
              <article className="rounded-2xl border border-white/70 bg-white/85 p-5 text-sm text-slate-600 shadow-sm">Content unavailable in this language yet.</article>
            )}
          </section>
        )}
      </main>
      <PublicFooter lang={lang} />
    </div>
  );
}
