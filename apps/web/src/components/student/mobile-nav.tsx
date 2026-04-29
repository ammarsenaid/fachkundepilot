"use client";

import { useState } from "react";

import { studentNavItems } from "@/lib/student/nav";

export function StudentMobileNav({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 md:hidden">
      <button className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-left text-sm" onClick={() => setOpen((v) => !v)}>
        Student navigation
      </button>
      {open && (
        <nav className="mt-2 grid gap-2 rounded-xl border border-[var(--border)] bg-white p-2">
          {studentNavItems.map((item) => (
            <a key={item.key} href={`/${lang}/student/${item.href}`} className="rounded border px-2 py-1 text-xs">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
