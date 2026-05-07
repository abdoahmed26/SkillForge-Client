import {
  Brain,
  Cloud,
  Code2,
  Database,
  Layers,
  Monitor,
  Palette,
  Server,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SkillCategory, type CategoryInfo } from "../types/skill.types";

type CategoryCarouselProps = {
  categories: CategoryInfo[];
  selectedCategory: SkillCategory | null;
  onSelect: (category: SkillCategory | null) => void;
};

const icons: Record<SkillCategory, LucideIcon> = {
  [SkillCategory.FRONTEND]: Monitor,
  [SkillCategory.BACKEND]: Server,
  [SkillCategory.DEVOPS]: Layers,
  [SkillCategory.DATA_SCIENCE]: Code2,
  [SkillCategory.MOBILE]: Smartphone,
  [SkillCategory.DESIGN]: Palette,
  [SkillCategory.DATABASE]: Database,
  [SkillCategory.CLOUD]: Cloud,
  [SkillCategory.SECURITY]: Shield,
  [SkillCategory.AI_ML]: Brain,
};

export function CategoryCarousel({
  categories,
  selectedCategory,
  onSelect,
}: CategoryCarouselProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const Icon = icons[category.name];
        const isSelected = selectedCategory === category.name;
        return (
          <motion.button
            type="button"
            key={category.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(isSelected ? null : category.name)}
            className={`flex min-w-52 items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
              isSelected
                ? "border-indigo-400 bg-indigo-500/20 shadow-glow"
                : "border-slate-700/50 bg-slate-900/70 hover:border-slate-500"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400 text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">
                {category.label}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {category.skillCount} skills
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
