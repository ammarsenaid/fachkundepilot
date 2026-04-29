import { LearningModeToggle } from "@/components/student/learning-mode-toggle";
import { getStudentContentStats } from "@/lib/directus/content";

export default async function StudentDashboardPage() {
  const stats = await getStudentContentStats();
  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-600">Welcome card, continue learning, and progress placeholders.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">Lessons: {stats.lessons}</div>
        <div className="rounded-xl border p-4">Flashcards: {stats.flashcards}</div>
        <div className="rounded-xl border p-4">Questions: {stats.questions}</div>
      </div>
      <div className="mt-6"><LearningModeToggle /></div>
    </section>
  );
}
