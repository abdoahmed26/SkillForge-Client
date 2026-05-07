import { Award } from "lucide-react";
import { EmptyState } from "../../../components/common/EmptyState";
import type { Achievement } from "../types/gamification.types";
import { AchievementCard } from "./AchievementCard";

interface AchievementShowcaseProps {
  achievements: Achievement[];
  onSelect: (achievement: Achievement) => void;
}

export function AchievementShowcase({ achievements, onSelect }: AchievementShowcaseProps) {
  if (achievements.length === 0) {
    return (
      <EmptyState
        icon={Award}
        title="No achievements available"
        description="Achievement records have not been seeded yet. Once they exist, your progress will appear here."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} onSelect={onSelect} />
      ))}
    </div>
  );
}
