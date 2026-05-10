import { Outlet } from "react-router-dom";
import logoIcon from "../assets/icon.png";

export function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
      
      <section
        className="relative z-10 w-full max-w-md animate-[authPanelIn_360ms_ease-out] rounded-2xl glass-dark p-8 sm:p-10"
      >
        <div className="mb-8 text-center">
          <img src={logoIcon} alt="SkillForge Logo" className="h-12 w-auto mx-auto object-contain" />
          <h1 className="text-3xl font-bold">
            <span className="text-3xl font-bold tracking-tight text-white">
              Skill<span className="text-emerald-500">Forge</span>
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">Unlock your potential, together.</p>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
