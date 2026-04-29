"use client";

export function LoginForm() {
  return (
    <form className="mt-6 grid gap-3" onSubmit={(e) => e.preventDefault()}>
      <label className="text-sm">Email</label>
      <input type="email" className="rounded border px-3 py-2" placeholder="name@example.com" />
      <label className="text-sm">Password</label>
      <input type="password" className="rounded border px-3 py-2" placeholder="••••••••" />
      <button type="submit" className="mt-2 rounded bg-[var(--primary)] px-4 py-2 text-white">Login (placeholder)</button>
      <p className="text-xs text-slate-600">Authentication is not active in MVP yet.</p>
    </form>
  );
}
