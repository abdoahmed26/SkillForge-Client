import { Award, BarChart3, Bell, CalendarClock, Compass, Handshake, LayoutDashboard, LogOut, Menu, MessageCircle, MoreHorizontal, Sparkles, Store, UserCircle, Video, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Outlet, useNavigate, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import { logoutUser } from "../features/auth/store/authSlice";
import { useMatchingSocket } from "../features/matching/hooks/useMatchingSocket";
import { useGamificationSocket } from "../features/gamification/hooks/useGamificationSocket";
import { StreakCounter } from "../features/gamification/components/StreakCounter";
import { loadGamificationProfile } from "../features/gamification/store/gamificationSlice";
import { PageTransition } from "../components/common/PageTransition";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { NotificationBell } from "../features/notifications/components/NotificationBell";
import logoIcon from "../assets/icon.png";

export function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const pendingCount = useAppSelector((state) => state.matching.inbox.length);
  const gamificationProfile = useAppSelector((state) => state.gamification.profile);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const name = user?.displayName || user?.username || "User";
  useMatchingSocket();
  useGamificationSocket();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void dispatch(loadGamificationProfile());
    }, 350);

    return () => window.clearTimeout(timer);
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  type NavItem = {
    to: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
  };

  const primaryNavItems: NavItem[] = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/marketplace", label: "Marketplace", icon: Store },
    { to: "/discover", label: "Discover", icon: Compass },
    { to: "/match-inbox", label: "Inbox", icon: Bell, badge: pendingCount },
  ];

  const secondaryNavItems: NavItem[] = [
    { to: "/my-matches", label: "Matches", icon: Handshake },
    { to: "/chat", label: "Chat", icon: MessageCircle },
    { to: "/my-sessions", label: "Sessions", icon: Video },
    { to: "/availability", label: "Availability", icon: CalendarClock },
    { to: "/my-skills", label: "My Skills", icon: Sparkles },
    { to: "/achievements", label: "Achievements", icon: Award },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];
  const closeMenus = () => {
    setIsMoreOpen(false);
    setIsMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 shadow-[0_8px_32px_0_rgba(0,0,0,0.22)]">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src={logoIcon} alt="SkillForge Logo" className="h-8 w-auto object-contain" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Skill<span className="text-emerald-500">Forge</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-100"
                        : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                  {item.badge ? (
                    <span className="rounded-full bg-teal-400 px-2 py-0.5 text-xs font-black text-slate-950">{item.badge}</span>
                  ) : null}
                </NavLink>
              );
            })}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen((value) => !value)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-400 transition hover:bg-slate-800/70 hover:text-white"
                aria-expanded={isMoreOpen}
                aria-label="Open more navigation"
              >
                <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                More
              </button>
              {isMoreOpen ? (
                <div className="glass-dark absolute right-0 top-12 w-56 rounded-lg p-2 shadow-glow">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={closeMenus}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold transition ${
                            isActive
                              ? "bg-indigo-500/20 text-indigo-100"
                              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                          }`
                        }
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-full bg-teal-400 px-2 py-0.5 text-xs font-black text-slate-950">{item.badge}</span>
                        ) : null}
                      </NavLink>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell />
            {/* <div className="hidden sm:block">
              <ThemeToggle />
            </div> */}
            <div className="hidden md:block">
              <StreakCounter currentStreak={gamificationProfile?.currentStreak ?? user?.currentStreak ?? 0} />
            </div>
            <Link to="/profile" className="group flex items-center gap-3 rounded-full bg-slate-800/50 py-1 pl-1 pr-4 transition-all hover:bg-slate-700/80 border border-white/5">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={name} className="h-9 w-9 rounded-full object-cover shadow-sm ring-2 ring-indigo-500/50" />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-indigo-400 shadow-sm ring-2 ring-indigo-500/50 group-hover:bg-slate-700">
                  <UserCircle className="h-6 w-6" aria-hidden="true" />
                </div>
              )}
              <span className="hidden max-w-40 truncate text-sm font-semibold text-slate-300 group-hover:text-white sm:inline transition-colors">{name}</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden h-10 items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 text-sm font-semibold text-red-400 shadow-sm transition-all hover:bg-red-500/20 hover:text-red-300 sm:inline-flex"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700/70 bg-slate-800/60 text-slate-300 transition hover:bg-slate-700 hover:text-white lg:hidden"
              aria-expanded={isMobileOpen}
              aria-label="Open navigation"
            >
              {isMobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>

          {isMobileOpen ? (
            <div className="glass-dark absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-lg p-2 shadow-glow lg:hidden">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold transition ${
                        isActive
                          ? "bg-indigo-500/20 text-indigo-100"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      }`
                    }
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {item.label}
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-teal-400 px-2 py-0.5 text-xs font-black text-slate-950">{item.badge}</span>
                    ) : null}
                  </NavLink>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
              <div className="mt-2 px-1 sm:hidden">
                <ThemeToggle />
              </div>
            </div>
          ) : null}
        </nav>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
