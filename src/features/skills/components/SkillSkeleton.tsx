type SkillSkeletonProps = {
  variant?: "grid" | "list";
};

export function SkillSkeleton({ variant = "grid" }: SkillSkeletonProps) {
  const isList = variant === "list";

  return (
    <div
      className={`glass-dark animate-pulse rounded-lg p-5 ${
        isList ? "min-h-28" : "h-44"
      }`}
    >
      <div className="mb-5 h-1 w-20 rounded-full bg-indigo-500/30" />
      <div className="h-6 w-2/3 rounded bg-slate-700/70" />
      <div className="mt-3 h-5 w-24 rounded-full bg-slate-800" />
      <div className={`${isList ? "mt-5" : "mt-8"} flex gap-4`}>
        <div className="h-5 w-24 rounded bg-slate-800" />
        <div className="h-5 w-24 rounded bg-slate-800" />
      </div>
    </div>
  );
}
