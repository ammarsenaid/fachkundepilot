import { studentNavItems } from "@/lib/student/nav";

export function StudentSidebar({ lang }: { lang: string }) {
  return (
    <aside className="w-full rounded-xl border border-[var(--border)] bg-white p-4 md:w-64">
      <p className="mb-3 text-sm font-semibold">Student Area</p>
      <nav className="grid gap-2 text-sm">
        {studentNavItems.map((item) => (
          <a key={item.key} href={`/${lang}/student/${item.href}`} className="rounded px-2 py-1 hover:bg-slate-50">
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
