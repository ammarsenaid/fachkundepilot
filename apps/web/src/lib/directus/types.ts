export type LanguageDirection = "ltr" | "rtl";

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  direction: LanguageDirection;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface Page {
  id: string;
  page_key: string;
  internal_name: string;
  status: string;
  sort_order: number;
}

export interface PageTranslation {
  id: string;
  page_id: string;
  language_id: string;
  slug: string;
  title: string;
  seo_title: string;
  seo_description: string;
  og_title: string;
  og_description: string;
  content_summary: string;
  is_published: boolean;
  is_complete: boolean;
}

export interface PageSection {
  id: string;
  page_id: string;
  section_key: string;
  section_type: string;
  sort_order: number;
  is_visible: boolean;
  status: string;
}

export interface SectionTranslation {
  id: string;
  section_id: string;
  language_id: string;
  heading: string;
  subheading: string;
  body: string;
  button_text: string;
  button_url: string;
  image_alt: string;
  content_json: Record<string, unknown>;
  is_published: boolean;
  is_complete: boolean;
}

export interface DirectusListResponse<T> {
  data: T[];
}
