import type { SupportedLanguage } from "./i18n";

export interface PageContent {
  title: string;
  intro: string;
}

export type PublicPageKey =
  | "home"
  | "exam"
  | "application"
  | "license"
  | "materials"
  | "demo"
  | "pricing"
  | "faq"
  | "contact"
  | "login"
  | "register"
  | "imprint"
  | "privacy"
  | "terms";

export const pageSlugs: Record<SupportedLanguage, Record<PublicPageKey, string>> = {
  de: { home: "", exam: "pruefung-erklaert", application: "antragstellung", license: "personenbefoerderungsschein", materials: "lernmaterial", demo: "demo", pricing: "preise", faq: "faq", contact: "kontakt", login: "login", register: "registrierung", imprint: "impressum", privacy: "datenschutz", terms: "agb" },
  en: { home: "", exam: "exam-explained", application: "application", license: "passenger-transport-license", materials: "learning-material", demo: "demo", pricing: "pricing", faq: "faq", contact: "contact", login: "login", register: "register", imprint: "imprint", privacy: "privacy", terms: "terms" },
  ar: { home: "", exam: "sharh-al-imtihan", application: "talab", license: "rukhsat-naql-rukkab", materials: "mawad-taallum", demo: "demo", pricing: "alasaar", faq: "alasila-alshaeia", contact: "ittisal", login: "tasjil-dukhul", register: "tasjil", imprint: "matbuat-qanunia", privacy: "khususia", terms: "shurut" },
};

const deContent: Record<PublicPageKey, PageContent> = {
  home: { title: "FachkundePilot", intro: "Originale Platzhalter-Startseite für die öffentliche Website." },
  exam: { title: "Prüfung erklärt", intro: "Einfache Übersicht zur Fachkundeprüfung in klarer Sprache." },
  application: { title: "Antragstellung", intro: "Schritt-für-Schritt Hinweise als Platzhalter zur Antragstellung." },
  license: { title: "Personenbeförderungsschein", intro: "Basisinformationen als Platzhalter zum P-Schein." },
  materials: { title: "Lernmaterial", intro: "Übersicht zu Modulen, PDFs und Übungsformaten." },
  demo: { title: "Demo", intro: "Kurzer Einblick in das spätere Lernerlebnis." },
  pricing: { title: "Preise", intro: "Platzhalter für Paketübersicht und Leistungsumfang." },
  faq: { title: "FAQ", intro: "Häufige Fragen als einfache Startsammlung." },
  contact: { title: "Kontakt", intro: "Kontaktinformationen als Platzhalter." },
  login: { title: "Login", intro: "MVP-Platzhalter für den späteren Anmeldebereich." },
  register: { title: "Registrierung", intro: "MVP-Platzhalter für den späteren Registrierungsbereich." },
  imprint: { title: "Impressum", intro: "Rechtlicher Platzhalter. Vor Launch rechtlich prüfen/ersetzen." },
  privacy: { title: "Datenschutz", intro: "Rechtlicher Platzhalter. Vor Launch rechtlich prüfen/ersetzen." },
  terms: { title: "AGB", intro: "Rechtlicher Platzhalter. Vor Launch rechtlich prüfen/ersetzen." },
};

const enContent: Partial<Record<PublicPageKey, PageContent>> = {
  home: { title: "FachkundePilot", intro: "Original placeholder homepage for the public website." },
  exam: { title: "Exam explained", intro: "Simple overview of the Fachkunde exam in clear language." },
  application: { title: "Application", intro: "Step-by-step placeholder guidance for the application process." },
  license: { title: "Passenger transport license", intro: "Basic placeholder information about the license." },
  materials: { title: "Learning material", intro: "Overview of modules, PDFs, and practice formats." },
  demo: { title: "Demo", intro: "Short preview of the future learning experience." },
};

const arContent: Partial<Record<PublicPageKey, PageContent>> = {
  home: { title: "فاخكونده بايلوت", intro: "صفحة رئيسية تجريبية أصلية للموقع العام." },
  exam: { title: "شرح الامتحان", intro: "نظرة مبسطة على امتحان الفاخكونده بلغة واضحة." },
  application: { title: "تقديم الطلب", intro: "إرشادات تجريبية خطوة بخطوة لعملية الطلب." },
  license: { title: "رخصة نقل الركاب", intro: "معلومات أساسية تجريبية حول الرخصة." },
  materials: { title: "مواد التعلّم", intro: "نظرة عامة على الوحدات والملفات وتمارين التدريب." },
  demo: { title: "نسخة تجريبية", intro: "عرض سريع لتجربة التعلّم القادمة." },
};

const pageContentMap: Record<SupportedLanguage, Partial<Record<PublicPageKey, PageContent>>> = {
  de: deContent,
  en: enContent,
  ar: arContent,
};

export function getPageContent(lang: SupportedLanguage, key: PublicPageKey): PageContent {
  return pageContentMap[lang][key] ?? deContent[key];
}

export function findPageKey(lang: SupportedLanguage, slug: string): PublicPageKey | null {
  const map = pageSlugs[lang];
  const hit = (Object.entries(map).find(([, value]) => value === slug) ?? [])[0];
  return (hit as PublicPageKey) || null;
}

export function buildLocalizedPath(lang: SupportedLanguage, key: PublicPageKey): string {
  const slug = pageSlugs[lang][key] ?? "";
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}
