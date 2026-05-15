import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

export function AnimatedPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.main>
  );
}
