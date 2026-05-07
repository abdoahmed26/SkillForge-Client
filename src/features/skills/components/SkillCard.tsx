import { motion } from "framer-motion";
import { BookOpen, Users } from "lucide-react";
import type { Skill } from "../types/skill.types";

type SkillCardProps = {
  skill: Skill;
  onClick: () => void;
  variant?: "grid" | "list";
};

export function SkillCard({ skill, onClick, variant = "grid" }: SkillCardProps) {
  const isList = variant === "list";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-lg text-left glass-dark p-5 transition-shadow hover:shadow-glow ${
        isList ? "min-h-28 w-full" : "h-44"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-teal-400" />
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl transition-opacity group-hover:opacity-100" />

      <div
        className={`relative flex h-full ${
          isList
            ? "flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            : "flex-col justify-between"
        }`}
      >
        <div className={isList ? "min-w-0 flex-1" : undefined}>
          <h3
            className={`font-heading font-bold text-white ${
              isList ? "line-clamp-1 text-lg" : "line-clamp-2 text-xl"
            }`}
          >
            {skill.name}
          </h3>
          <span className="mt-3 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
            {skill.category.replace("_", " ")}
          </span>
        </div>

        <div
          className={`flex flex-wrap gap-3 text-sm font-semibold text-slate-300 ${
            isList ? "shrink-0 sm:justify-end" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-300" aria-hidden="true" />
            {skill.teacherCount} teach
          </span>
          <span className="inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-teal-300" aria-hidden="true" />
            {skill.learnerCount} learn
          </span>
        </div>
      </div>
    </motion.button>
  );
}
