import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, MessageCircle } from "lucide-react";
import logoIcon from "../../../assets/icon.png";

export function HomeFooter() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-950 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col max-w-[200px] justify-between">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logoIcon} alt="SkillForge Logo" className="h-8 w-auto object-contain" />
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Skill<span className="text-teal-400">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 mt-auto pt-16 md:pt-24 whitespace-nowrap">
              &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
            </p>
          </div>
          
          {/* Links Columns */}
          <div className="flex gap-12 lg:gap-24 flex-wrap">
            <div>
              <h3 className="text-[13px] font-bold text-slate-300 mb-6 tracking-wide font-heading uppercase">Platform</h3>
              <ul className="space-y-4 text-[13px] text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-slate-300 mb-6 tracking-wide font-heading uppercase">Community</h3>
              <ul className="space-y-4 text-[13px] text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Leaderboard</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-slate-300 mb-6 tracking-wide font-heading uppercase">Company</h3>
              <ul className="space-y-4 text-[13px] text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[13px] font-bold text-slate-300 mb-6 tracking-wide font-heading uppercase">Stay Connected</h3>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=100029822832042" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"><Twitter className="h-4 w-4" /></a>
                <a href="https://linkedin.com/in/abdelrahman-ahmed-460873357" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"><Linkedin className="h-4 w-4" /></a>
                <a href="https://github.com/abdoahmed26" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"><Github className="h-4 w-4" /></a>
                <a href="https://wa.me/+0201207583096" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"><MessageCircle className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
