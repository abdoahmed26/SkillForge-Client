import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import type { SkillDetail, UserSkillUser } from "../types/skill.types";

type SkillDetailModalProps = {
  skill: SkillDetail | null;
  isOpen: boolean;
  onClose: () => void;
};

type Tab = "teachers" | "learners";

function UserRow({ user }: { user: UserSkillUser }) {
  const name = user.displayName || user.username;
  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/50" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-sm font-black text-white ring-2 ring-indigo-500/50">
          {name.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">{name}</p>
        <p className="truncate text-xs text-slate-400">@{user.username}</p>
      </div>
      <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-1 text-xs font-bold text-teal-200">
        {user.proficiency}
      </span>
    </li>
  );
}

export function SkillDetailModal({ skill, isOpen, onClose }: SkillDetailModalProps) {
  const [tab, setTab] = useState<Tab>("teachers");
  const users = tab === "teachers" ? skill?.teachers ?? [] : skill?.learners ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="glass-dark max-h-[92vh] w-full overflow-y-auto rounded-t-lg p-5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-200">
                  {skill?.category.replace("_", " ")}
                </span>
                <h2 className="mt-3 font-heading text-3xl font-black text-white">
                  {skill?.name}
                </h2>
                {skill?.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {skill.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-xl border border-slate-700 bg-slate-800/40 p-1">
              {(["teachers", "learners"] as Tab[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-bold capitalize transition ${
                    tab === item
                      ? "bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <ul className="mt-5 space-y-3">
              {users.length > 0 ? (
                users.map((user) => <UserRow key={user.userId} user={user} />)
              ) : (
                <li className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-center text-sm text-slate-400">
                  No {tab} yet.
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
