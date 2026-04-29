import "server-only";

import type { DirectusListResponse } from "./types";

function getDirectusBaseUrl() {
  return process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || "";
}

function getDirectusToken() {
  return process.env.DIRECTUS_STATIC_TOKEN;
}

export async function directusReadItems<T>(
  collection: string,
  query: Record<string, string | number | boolean> = {},
): Promise<T[]> {
  const baseUrl = getDirectusBaseUrl();
  if (!baseUrl) {
    throw new Error("DIRECTUS_URL (or NEXT_PUBLIC_DIRECTUS_URL) is not configured.");
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    params.append(key, String(value));
  }

  const url = `${baseUrl.replace(/\/$/, "")}/items/${collection}?${params.toString()}`;
  const token = getDirectusToken();

  const response = await fetch(url, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: Number(process.env.DIRECTUS_REVALIDATE_SECONDS || 300) },
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as DirectusListResponse<T>;
  return json.data;
}
