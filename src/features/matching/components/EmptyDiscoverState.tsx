import { Search, UserX } from "lucide-react";
import { Link } from "react-router-dom";

type EmptyDiscoverStateProps = {
  variant: "noSkills" | "noMatches" | "inbox" | "matches";
};

const content = {
  noSkills: {
    icon: Search,
    title: "Add skills to start matching",
    description: "Teach or learn at least one skill so SkillForge can find compatible people.",
    to: "/my-skills",
    action: "Add Skills",
  },
  noMatches: {
    icon: UserX,
    title: "No new matches available",
    description: "Check back later or add more skills to broaden your matching pool.",
    to: "/my-skills",
    action: "Update Skills",
  },
  inbox: {
    icon: Search,
    title: "No pending requests",
    description: "Incoming match requests will land here as people discover your skills.",
    to: "/discover",
    action: "Discover",
  },
  matches: {
    icon: UserX,
    title: "No matches yet",
    description: "Start discovering people who complement your skill goals.",
    to: "/discover",
    action: "Start Discovering",
  },
};

export function EmptyDiscoverState({ variant }: EmptyDiscoverStateProps) {
  const item = content[variant];
  const Icon = item.icon;

  return (
    <div className="glass-dark flex min-h-80 flex-col items-center justify-center rounded-lg px-6 py-12 text-center">
      <div className="mb-5 rounded-full bg-gradient-to-br from-indigo-500/20 to-teal-400/20 p-4 text-teal-200 ring-1 ring-white/10">
        <Icon className="h-10 w-10" aria-hidden="true" />
      </div>
      <h2 className="font-heading text-2xl font-black text-white">{item.title}</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{item.description}</p>
      <Link
        to={item.to}
        className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow-glow transition-all hover:opacity-90"
      >
        {item.action}
      </Link>
    </div>
  );
}
