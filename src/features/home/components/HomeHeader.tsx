import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoIcon from "../../../assets/icon.png";

export function HomeHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8 relative z-20">
      <Link to="/" className="flex items-center gap-2">
        <img src={logoIcon} alt="SkillForge Logo" className="h-8 w-auto object-contain" />
        <span className="text-2xl font-bold tracking-tight text-white font-heading">
          Skill<span className="text-teal-400">Forge</span>
        </span>
      </Link>
      
      <div className="flex flex-wrap justify-end items-center gap-4">
        {/* <Link to="/login" className="rounded-xl border border-white/10 bg-transparent px-5 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
          Log in
        </Link> */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/register" className="rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-2 text-sm font-bold text-white transition shadow-glow">
            Get Started
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
