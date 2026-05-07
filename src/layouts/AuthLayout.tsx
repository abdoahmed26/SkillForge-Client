import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
      
      <section
        className="relative z-10 w-full max-w-md animate-[authPanelIn_360ms_ease-out] rounded-2xl glass-dark p-8 sm:p-10"
      >
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-teal-400 shadow-glow"
          >
            <span className="text-3xl font-black text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-400">Skill</span>
            <span className="text-teal-400">Forge</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">Unlock your potential, together.</p>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
