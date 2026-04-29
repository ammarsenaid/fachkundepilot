import Link from "next/link";

function getCmsUrl() {
  return process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://cms.localhost";
}

export default function AdminBridgePage() {
  const cmsUrl = getCmsUrl();

  return (
    <main className="min-h-screen bg-[var(--muted)]">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <article className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin / Content Studio</h1>
          <p className="mt-3 text-slate-600">
            Content Studio is powered by Directus. Use the CMS for content management, translations,
            publishing workflow, and media uploads.
          </p>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm text-slate-700">
            <p><strong>Development:</strong> Open the configured local CMS URL.</p>
            <p className="mt-1"><strong>Production:</strong> Use the secured CMS domain and Directus login.</p>
            <p className="mt-1">This page is a bridge only. Directus admin is not duplicated in Next.js.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={cmsUrl} className="rounded bg-[var(--primary)] px-4 py-2 text-sm text-white" target="_blank" rel="noreferrer">
              Open Content Studio
            </a>
            <Link href="/de" className="rounded border px-4 py-2 text-sm">Back to website</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
