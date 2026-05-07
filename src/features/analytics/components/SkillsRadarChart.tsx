import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SkillsRadarPoint } from "../types/analytics.types";

interface SkillsRadarChartProps {
  data: SkillsRadarPoint[];
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  return (
    <div className="glass-dark rounded-lg p-5 shadow-soft">
      <h2 className="font-heading text-lg font-bold text-white">Skill Categories</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8 }}
            />
            <Radar name="Teach" dataKey="teachCount" stroke="#6366f1" fill="#6366f1" fillOpacity={0.28} />
            <Radar name="Learn" dataKey="learnCount" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.22} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
