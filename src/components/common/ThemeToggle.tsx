import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppHooks";
import { updateProfile } from "../../features/auth/store/authSlice";

type ThemePreference = "light" | "dark" | "system";

const options: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function applyThemePreference(preference: ThemePreference) {
  const resolved =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;

  document.documentElement.dataset.theme = preference;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const userPreference = useAppSelector((state) => state.auth.user?.themePreference) as ThemePreference | undefined;
  const preference = userPreference ?? (localStorage.getItem("themePreference") as ThemePreference | null) ?? "system";

  useEffect(() => {
    applyThemePreference(preference);
  }, [preference]);

  const handleSelect = (nextPreference: ThemePreference) => {
    localStorage.setItem("themePreference", nextPreference);
    applyThemePreference(nextPreference);
    void dispatch(updateProfile({ themePreference: nextPreference }));
  };

  return (
    <div className="inline-flex h-10 items-center rounded-lg border border-slate-700/70 bg-slate-800/60 p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = preference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            title={option.label}
            aria-label={`${option.label} theme`}
            className={`grid h-8 w-8 place-items-center rounded-md transition ${
              isActive ? "bg-indigo-500/25 text-indigo-100" : "text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
