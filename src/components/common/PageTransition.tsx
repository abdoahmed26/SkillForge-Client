import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return <div className="animate-[pageFade_180ms_ease-out]">{children}</div>;
}
