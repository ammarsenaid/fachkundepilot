import type { ReactNode } from "react";

import { StudentMobileNav } from "@/components/student/mobile-nav";
import { StudentSidebar } from "@/components/student/sidebar";

export default async function StudentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-[var(--muted)]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <StudentMobileNav lang={lang} />
        <div className="flex flex-col gap-4 md:flex-row">
          <StudentSidebar lang={lang} />
          <main className="flex-1 rounded-xl border border-[var(--border)] bg-white p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
