"use client";

import { useEffect, useState } from "react";

import type { LearningMode } from "@/lib/student/nav";

const STORAGE_KEY = "fachkundepilot_learning_mode";

export function LearningModeToggle() {
  const [mode, setMode] = useState<LearningMode>("german_only");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LearningMode | null;
    if (stored) setMode(stored);
  }, []);

  function onChange(next: LearningMode) {
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-4">
      <p className="mb-3 text-sm font-semibold">Learning mode</p>
      <div className="grid gap-2 md:grid-cols-3">
        <button onClick={() => onChange("german_only")} className="rounded border px-3 py-2 text-sm">German only</button>
        <button onClick={() => onChange("selected_language_only")} className="rounded border px-3 py-2 text-sm">My language only</button>
        <button onClick={() => onChange("side_by_side")} className="rounded border px-3 py-2 text-sm">German + my language side by side</button>
      </div>
      <p className="mt-3 text-xs text-slate-600">Current: {mode}</p>
    </div>
  );
}
