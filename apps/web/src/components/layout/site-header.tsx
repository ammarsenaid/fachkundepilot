import { BookOpenCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-[var(--primary)]">
          <BookOpenCheck className="h-5 w-5" />
          <span className="text-sm font-semibold">FachkundePilot</span>
        </div>
        <p className="text-xs text-slate-600">Professional MVP Foundation</p>
      </div>
    </header>
  );
}
