type SkeletonShape = "text" | "circle" | "rectangle";

interface LoadingSkeletonProps {
  shape?: SkeletonShape;
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ shape = "rectangle", lines = 1, className = "" }: LoadingSkeletonProps) {
  if (shape === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-3 animate-pulse rounded-full bg-slate-800/80 ${index === lines - 1 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    );
  }

  if (shape === "circle") {
    return <div className={`animate-pulse rounded-full bg-slate-800/80 ${className || "h-12 w-12"}`} />;
  }

  return <div className={`animate-pulse rounded-lg bg-slate-800/80 ${className || "h-32 w-full"}`} />;
}
