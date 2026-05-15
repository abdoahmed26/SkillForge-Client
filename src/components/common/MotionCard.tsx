import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";
import { cardHover } from "../../lib/motion";

type MotionCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
  className?: string;
};

export function MotionCard({ children, className = "", ...props }: MotionCardProps) {
  return (
    <motion.article
      variants={cardHover}
      whileHover="hover"
      className={`glass-dark relative overflow-hidden rounded-[2rem] p-6 shadow-soft transition-shadow hover:shadow-glow ${className}`}
      {...props}
    >
      {children}
    </motion.article>
  );
}
