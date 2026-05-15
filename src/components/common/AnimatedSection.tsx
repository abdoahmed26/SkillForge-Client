import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

export function AnimatedSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
