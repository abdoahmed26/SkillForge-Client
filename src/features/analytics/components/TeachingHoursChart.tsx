import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyHours } from "../types/analytics.types";

interface TeachingHoursChartProps {
  data: MonthlyHours[];
}

export function TeachingHoursChart({ data }: TeachingHoursChartProps) {
  return (
    <div className="glass-dark rounded-lg p-5 shadow-soft">
      <h2 className="font-heading text-lg font-bold text-white">Hours by Month</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8 }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Line type="monotone" dataKey="teachingHours" name="Teaching" stroke="#6366f1" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="learningHours" name="Learning" stroke="#2dd4bf" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
