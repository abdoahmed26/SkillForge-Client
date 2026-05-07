import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-4 py-12 text-center">
      <div className="max-w-md">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-gradient-to-tr from-indigo-500 to-teal-400 text-2xl font-black text-white shadow-glow">
          S
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          This page is not available in SkillForge.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 px-5 text-sm font-bold text-white shadow-glow transition hover:opacity-90"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </Link>
      </div>
    </section>
  );
}
