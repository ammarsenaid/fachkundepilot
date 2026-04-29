import type { Language, Page, PageSection, PageTranslation, SectionTranslation } from "./types";

export const fallbackLanguages: Language[] = [
  { id: "lang_de", code: "de", name: "German", native_name: "Deutsch", direction: "ltr", is_default: true, is_active: true, sort_order: 1 },
  { id: "lang_en", code: "en", name: "English", native_name: "English", direction: "ltr", is_default: false, is_active: true, sort_order: 2 },
  { id: "lang_ar", code: "ar", name: "Arabic", native_name: "العربية", direction: "rtl", is_default: false, is_active: true, sort_order: 3 },
];

export const fallbackPages: Page[] = [
  { id: "page_home", page_key: "home", internal_name: "Homepage", status: "published", sort_order: 1 },
  { id: "page_exam_explained", page_key: "exam_explained", internal_name: "Pruefung erklaert", status: "published", sort_order: 2 },
  { id: "page_material", page_key: "learning_material", internal_name: "Lernmaterial", status: "published", sort_order: 3 },
  { id: "page_pricing", page_key: "pricing", internal_name: "Preise", status: "published", sort_order: 4 },
  { id: "page_faq", page_key: "faq", internal_name: "FAQ", status: "published", sort_order: 5 },
  { id: "page_contact", page_key: "contact", internal_name: "Kontakt", status: "published", sort_order: 6 },
];

export const fallbackPageTranslations: PageTranslation[] = [
  { id: "p_home_de", page_id: "page_home", language_id: "lang_de", slug: "", title: "FachkundePilot", seo_title: "FachkundePilot", seo_description: "Verstehen in deiner Sprache.", og_title: "FachkundePilot", og_description: "Mehrsprachig lernen.", content_summary: "Startseite", is_published: true, is_complete: true },
  { id: "p_exam_de", page_id: "page_exam_explained", language_id: "lang_de", slug: "pruefung-erklaert", title: "Prüfung erklärt", seo_title: "Prüfung erklärt", seo_description: "Überblick", og_title: "Prüfung erklärt", og_description: "Überblick", content_summary: "Exam", is_published: true, is_complete: true },
  { id: "p_exam_en", page_id: "page_exam_explained", language_id: "lang_en", slug: "exam-explained", title: "Exam explained", seo_title: "Exam explained", seo_description: "Overview", og_title: "Exam explained", og_description: "Overview", content_summary: "Exam", is_published: true, is_complete: true },
  { id: "p_exam_ar", page_id: "page_exam_explained", language_id: "lang_ar", slug: "sharh-al-imtihan", title: "شرح الامتحان", seo_title: "شرح الامتحان", seo_description: "نظرة عامة", og_title: "شرح الامتحان", og_description: "نظرة عامة", content_summary: "Exam", is_published: true, is_complete: true }
];

export const fallbackPageSections: PageSection[] = [
  { id: "sec_hero", page_id: "page_home", section_key: "hero", section_type: "hero", sort_order: 1, is_visible: true, status: "published" },
  { id: "sec_problem", page_id: "page_home", section_key: "problem", section_type: "content", sort_order: 2, is_visible: true, status: "published" }
];

export const fallbackSectionTranslations: SectionTranslation[] = [
  { id: "sec_hero_de", section_id: "sec_hero", language_id: "lang_de", heading: "Verstehen in deiner Sprache.", subheading: "Bestehen auf Deutsch.", body: "Originaler Platzhalterinhalt.", button_text: "Jetzt starten", button_url: "/de", image_alt: "Lernende", content_json: {}, is_published: true, is_complete: true },
  { id: "sec_problem_de", section_id: "sec_problem", language_id: "lang_de", heading: "Die Herausforderung", subheading: "Prüfungssprache Deutsch", body: "Viele Lernende brauchen Unterstützung in ihrer Sprache.", button_text: "Mehr erfahren", button_url: "/de/pruefung-erklaert", image_alt: "Notizen", content_json: {}, is_published: true, is_complete: true }
];

export const fallbackStudentContentStats = {
  modules: 3,
  lessons: 2,
  flashcards: 2,
  questions: 2,
  calculationTasks: 1,
  vocabulary: 1,
  pdfs: 1,
};
