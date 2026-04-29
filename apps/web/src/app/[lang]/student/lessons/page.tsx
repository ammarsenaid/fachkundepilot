export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Lessons</h1>
      <p className="mt-2 text-slate-600">Original MVP placeholder content for lessons.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border p-4">
          <h2 className="font-semibold">German</h2>
          <p className="text-sm text-slate-600">Example lesson text in German (placeholder).</p>
        </article>
        <article className="rounded-xl border p-4">
          <h2 className="font-semibold">Selected language</h2>
          <p className="text-sm text-slate-600">Parallel translation view (placeholder).</p>
        </article>
      </div>
    </section>
  );
}
