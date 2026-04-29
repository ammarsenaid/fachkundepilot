import "server-only";

import { directusReadItems } from "./client";
import {
  fallbackLanguages,
  fallbackPages,
  fallbackPageSections,
  fallbackPageTranslations,
  fallbackSectionTranslations,
  fallbackStudentContentStats,
} from "./fallback-data";
import type { Language, Page, PageSection, PageTranslation, SectionTranslation } from "./types";

export async function getLanguages(): Promise<Language[]> {
  try {
    return await directusReadItems<Language>("languages", {
      filter: JSON.stringify({ is_active: { _eq: true } }),
      sort: "sort_order",
      limit: -1,
    });
  } catch {
    return fallbackLanguages;
  }
}

export async function getLanguageByCode(code: string): Promise<Language | null> {
  const langs = await getLanguages();
  return langs.find((l) => l.code === code) ?? null;
}

export async function getPages(): Promise<Page[]> {
  try {
    return await directusReadItems<Page>("pages", {
      filter: JSON.stringify({ status: { _eq: "published" } }),
      sort: "sort_order",
      limit: -1,
    });
  } catch {
    return fallbackPages;
  }
}

export async function getPageByKey(pageKey: string): Promise<Page | null> {
  const pages = await getPages();
  return pages.find((page) => page.page_key === pageKey) ?? null;
}

export async function getPageTranslations(pageId: string): Promise<PageTranslation[]> {
  try {
    return await directusReadItems<PageTranslation>("page_translations", {
      filter: JSON.stringify({ _and: [{ page_id: { _eq: pageId } }, { is_published: { _eq: true } }, { is_complete: { _eq: true } }] }),
      limit: -1,
    });
  } catch {
    return fallbackPageTranslations.filter((translation) => translation.page_id === pageId);
  }
}

export async function getPageTranslationByLanguage(pageId: string, languageId: string): Promise<PageTranslation | null> {
  const translations = await getPageTranslations(pageId);
  return translations.find((translation) => translation.language_id === languageId) ?? null;
}

export async function getPageTranslationBySlug(languageId: string, slug: string): Promise<PageTranslation | null> {
  try {
    const items = await directusReadItems<PageTranslation>("page_translations", {
      filter: JSON.stringify({ _and: [{ language_id: { _eq: languageId } }, { slug: { _eq: slug } }, { is_published: { _eq: true } }, { is_complete: { _eq: true } }] }),
      limit: 1,
    });
    return items[0] ?? null;
  } catch {
    return fallbackPageTranslations.find((p) => p.language_id === languageId && p.slug === slug) ?? null;
  }
}

export async function getPageSections(pageId: string): Promise<PageSection[]> {
  try {
    return await directusReadItems<PageSection>("page_sections", {
      filter: JSON.stringify({ _and: [{ page_id: { _eq: pageId } }, { status: { _eq: "published" } }, { is_visible: { _eq: true } }] }),
      sort: "sort_order",
      limit: -1,
    });
  } catch {
    return fallbackPageSections.filter((s) => s.page_id === pageId && s.is_visible);
  }
}

export async function getSectionTranslationByLanguage(sectionId: string, languageId: string): Promise<SectionTranslation | null> {
  try {
    const items = await directusReadItems<SectionTranslation>("section_translations", {
      filter: JSON.stringify({ _and: [{ section_id: { _eq: sectionId } }, { language_id: { _eq: languageId } }, { is_published: { _eq: true } }, { is_complete: { _eq: true } }] }),
      limit: 1,
    });
    return items[0] ?? null;
  } catch {
    return fallbackSectionTranslations.find((s) => s.section_id === sectionId && s.language_id === languageId) ?? null;
  }
}

export async function getStudentContentStats() {
  try {
    const [lessons, flashcards, questions] = await Promise.all([
      directusReadItems<{ id: string }>("lessons", { filter: JSON.stringify({ status: { _eq: "published" } }), limit: -1 }),
      directusReadItems<{ id: string }>("flashcards", { filter: JSON.stringify({ status: { _eq: "published" } }), limit: -1 }),
      directusReadItems<{ id: string }>("questions", { filter: JSON.stringify({ status: { _eq: "published" } }), limit: -1 }),
    ]);
    return { ...fallbackStudentContentStats, lessons: lessons.length, flashcards: flashcards.length, questions: questions.length };
  } catch {
    return fallbackStudentContentStats;
  }
}
