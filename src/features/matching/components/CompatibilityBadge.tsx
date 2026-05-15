type CompatibilityBadgeProps = {
  score: number;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-16 w-16 text-sm",
  md: "h-24 w-24 text-xl",
  lg: "h-28 w-28 text-2xl",
};

export function CompatibilityBadge({ score, size = "md" }: CompatibilityBadgeProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;
  const color =
    score > 70 ? "stroke-teal-400 text-teal-300" : score >= 40 ? "stroke-amber-300 text-amber-200" : "stroke-orange-400 text-orange-300";

  return (
    <div className={`relative shrink-0 ${sizes[size]}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} className="fill-transparent stroke-slate-800/80" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={`fill-transparent transition-all duration-500 ${color}`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className={`absolute inset-0 grid place-items-center font-heading font-black ${color}`}>
        {score}%
      </div>
    </div>
  );
}
