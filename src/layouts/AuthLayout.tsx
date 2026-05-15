import { Outlet } from "react-router-dom";
import logoIcon from "../assets/icon.png";

export function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
      <div className="pointer-events-none fixed left-1/4 top-1/4 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-indigo-600/20 blur-[100px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-0 z-0 h-[400px] w-[400px] translate-y-1/2 animate-pulse-slow rounded-full bg-teal-500/10 blur-[100px]" />
      
      <section
        className="relative z-10 w-full max-w-md animate-[authPanelIn_360ms_ease-out] rounded-[2rem] glass-dark p-8 sm:p-10 shadow-glow"
      >
        <div className="mb-8 text-center">
          <img src={logoIcon} alt="SkillForge Logo" className="h-12 w-auto mx-auto object-contain" />
          <h1 className="text-3xl font-bold font-heading">
            <span className="text-3xl font-bold tracking-tight text-white font-heading">
              Skill<span className="text-teal-400">Forge</span>
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">Unlock your potential, together.</p>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
