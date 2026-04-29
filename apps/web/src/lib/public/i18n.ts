export const supportedLanguages = ["de", "en", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

export function directionForLanguage(lang: SupportedLanguage): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}
