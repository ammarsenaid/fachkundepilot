export const studentNavItems = [
  { key: "dashboard", label: "Dashboard", href: "dashboard" },
  { key: "modules", label: "Modules", href: "modules" },
  { key: "lessons", label: "Lessons", href: "lessons" },
  { key: "pdf", label: "PDF Library", href: "pdf-library" },
  { key: "flashcards", label: "Flashcards", href: "flashcards" },
  { key: "questions", label: "Questions", href: "questions" },
  { key: "calculations", label: "Calculation Tasks", href: "calculation-tasks" },
  { key: "vocabulary", label: "Vocabulary", href: "vocabulary" },
  { key: "mock", label: "Mock Exam", href: "mock-exam" },
  { key: "stats", label: "Statistics", href: "statistics" },
  { key: "settings", label: "Settings", href: "settings" },
] as const;

export type LearningMode = "german_only" | "selected_language_only" | "side_by_side";
