import { motion } from "framer-motion";
import { Pencil, X } from "lucide-react";
import { SkillType, type UserSkill } from "../types/skill.types";

type SkillChipProps = {
  userSkill: UserSkill;
  onEdit: () => void;
  onRemove: () => void;
};

export function SkillChip({ userSkill, onEdit, onRemove }: SkillChipProps) {
  const typeClass =
    userSkill.type === SkillType.TEACH
      ? "bg-indigo-500/15 text-indigo-200 border-indigo-400/30"
      : "bg-teal-500/15 text-teal-200 border-teal-400/30";

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="glass-dark rounded-lg p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-lg font-bold text-white">
            {userSkill.skill.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${typeClass}`}>
              {userSkill.type}
            </span>
            <span className="rounded-full border border-slate-600 bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-slate-300">
              {userSkill.proficiency}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-indigo-200"
            aria-label="Edit skill"
            title="Edit skill"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
            aria-label="Remove skill"
            title="Remove skill"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
