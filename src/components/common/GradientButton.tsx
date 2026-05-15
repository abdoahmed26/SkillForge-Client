import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";
import { buttonTap } from "../../lib/motion";

type GradientButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function GradientButton({ children, className = "", variant = "primary", ...props }: GradientButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-glow border-none",
    secondary: "bg-indigo-500/10 border border-indigo-300/30 text-indigo-100",
    danger: "bg-red-500/10 border border-red-400/20 text-red-200",
    ghost: "bg-transparent text-slate-300 hover:text-white border-none",
  };

  return (
    <motion.button
      variants={buttonTap}
      whileHover="hover"
      whileTap="tap"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
