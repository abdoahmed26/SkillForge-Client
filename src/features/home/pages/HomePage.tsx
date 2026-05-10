import {
  ArrowRight,
  PlayCircle,
  Zap,
  Star,
  Users,
  Video,
  MessageCircle,
  Calendar,
  Github,
  Twitter,
  Linkedin,
  Code2,
  Trophy,
  Atom,
  UserCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import homeImage from "../../../assets/home-image.png";
import logoIcon from "../../../assets/icon.png";

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-[#D1D5DB] selection:bg-blue-500/30 font-sans">
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="SkillForge Logo" className="h-8 w-auto object-contain" />
          <span className="text-2xl font-bold tracking-tight text-white">
            Skill<span className="text-emerald-500">Forge</span>
          </span>
        </Link>
        
        {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="text-white">Home</Link>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav> */}

        <div className="flex items-center gap-4">
          <Link to="/login" className="rounded-xl border border-white/10 bg-transparent px-5 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
            Log in
          </Link>
          <Link to="/register" className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/30 px-4 py-1.5 text-xs font-medium text-blue-400 mb-6">
              <Zap className="h-3 w-3" />
              Real-Time Skill Exchange Platform
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Teach. Learn.<br/>
              Grow. <span className="text-blue-500">Together.</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Connect with developers who want to learn your skills and teach you theirs. Match, schedule micro-sessions, chat, and grow your reputation.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white transition hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Find Matches <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-8 py-4 text-sm font-bold text-white transition hover:bg-white/5">
                <PlayCircle className="h-5 w-5 text-gray-300" /> How It Works
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 border-t border-white/5 pt-8">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="h-10 w-10 rounded-full border-2 border-[#070b14]" />
                  ))}
                </div>
                <div className="ml-4">
                  <div className="text-xl font-bold text-white leading-tight">12K+</div>
                  <div className="text-xs text-gray-400">Developers</div>
                </div>
              </div>
              
              <div>
                <div className="text-xl font-bold text-white leading-tight">8K+</div>
                <div className="text-xs text-gray-400">Skills</div>
              </div>
              
              <div>
                <div className="text-xl font-bold text-white leading-tight">25K+</div>
                <div className="text-xs text-gray-400">Sessions</div>
              </div>

              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400"><span className="text-white font-bold text-xs">4.9/5</span> From 1,200+ reviews</div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Card Area */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Background floating elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-2xl bg-blue-900/40 border border-blue-500/20 backdrop-blur flex items-center justify-center animate-[bounce_6s_infinite]">
                <Code2 className="w-10 h-10 text-blue-400" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-emerald-900/40 border border-emerald-500/20 backdrop-blur flex items-center justify-center animate-[bounce_7s_infinite]">
                <Atom className="w-8 h-8 text-emerald-400" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative w-full rounded-[2rem] border border-white/10/50 bg-[#0c1222]/80 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-semibold text-emerald-400">Perfect Match Found! 🎉</span>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  96% Match
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/10">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Ahmed" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#0c1222] bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">Ahmed <span className="text-sm font-normal text-gray-400">Developer</span></h3>
                  <div className="text-sm text-gray-400 flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-1">
                       <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 
                       <span className="text-gray-300 font-medium">4.9</span> (120 reviews)
                    </div>
                    <div>📍 Cairo, Egypt</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-xl border border-white/10/50 bg-white/5/40 p-4">
                  <div className="text-xs text-gray-400 mb-2">Can Teach</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400">React</span>
                    <Atom className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="text-xs text-emerald-400 mb-2">Wants to Learn</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Node.js</span>
                    <div className="h-5 w-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[9px] font-bold border border-emerald-500/30">JS</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="border-r border-white/10/50">
                  <div className="text-gray-400 text-xs mb-1">Next Availability</div>
                  <div className="flex items-center gap-2 text-white font-medium text-xs">
                    <Calendar className="w-4 h-4 text-gray-400" /> Tomorrow, 4:00 PM
                  </div>
                </div>
                <div className="pl-2">
                  <div className="text-gray-400 text-xs mb-1">Session Type</div>
                  <div className="flex items-center gap-2 text-white font-medium text-xs">
                    <Video className="w-4 h-4 text-blue-400" /> Video Call
                  </div>
                </div>
              </div>

              <button className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                Book Session
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-[#070b14]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-8 bg-blue-800" />
            <h2 className="text-2xl font-bold text-white tracking-wide">How It Works</h2>
            <div className="h-px w-8 bg-blue-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed border-white/10" />

            {[
              { num: 1, title: "Create Profile", desc: "Add skills you can teach and want to learn.", icon: UserCircle, color: "text-blue-500", bg: "bg-[#0b1426]", border: "border-blue-900" },
              { num: 2, title: "Find Matches", desc: "Get matched with developers based on skills.", icon: Users, color: "text-emerald-500", bg: "bg-[#0a1a14]", border: "border-emerald-900" },
              { num: 3, title: "Book Session", desc: "Schedule short learning sessions easily.", icon: Calendar, color: "text-purple-500", bg: "bg-[#140b26]", border: "border-purple-900" },
              { num: 4, title: "Earn Reputation", desc: "Get reviews, XP points, and badges.", icon: Star, color: "text-amber-500", bg: "bg-[#1a1405]", border: "border-amber-900" },
            ].map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 shadow-xl`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{step.num}</span>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400 max-w-[200px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section id="features" className="py-16 bg-[#070b14]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-16 text-center">
            <div className="h-px w-8 bg-blue-800" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Platform Features</h2>
            <div className="h-px w-8 bg-blue-800" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Smart Skill Matching", desc: "Our algorithm matches you with the best people based on your skills and goals.", icon: Users, color: "text-blue-500", bg: "bg-[#0b1426]" },
              { title: "Real-Time Chat", desc: "Built-in real-time messaging to discuss, share resources, and solve problems.", icon: MessageCircle, color: "text-emerald-500", bg: "bg-[#0a1a14]" },
              { title: "Video Micro-Sessions", desc: "High-quality video calls for focused 1-on-1 learning experiences.", icon: Video, color: "text-purple-500", bg: "bg-[#140b26]" },
              { title: "Reviews & Ratings", desc: "Rate your sessions and build your reputation in the community.", icon: Star, color: "text-amber-500", bg: "bg-[#1a1405]" },
              { title: "Gamification System", desc: "Earn XP points, level up, and unlock badges as you grow and help others.", icon: Trophy, color: "text-pink-500", bg: "bg-[#260b18]" },
              { title: "Developer Community", desc: "Join a supportive community of developers helping each other succeed.", icon: Users, color: "text-cyan-500", bg: "bg-[#0b2226]" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/5/80 bg-[#0c1222] p-8 transition-colors hover:border-white/10"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#0038ff] via-[#008f8f] to-[#00b259] p-0 flex flex-col md:flex-row items-center shadow-[0_0_40px_rgba(0,178,89,0.15)]">
          
          {/* Faint upward trending arrow pattern & dotted grid */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden opacity-20">
             <div className="absolute inset-0 bg-[radial-gradient(circle,white_2px,transparent_2px)] [background-size:20px_20px] opacity-20"></div>
             <svg viewBox="0 0 400 400" className="absolute right-0 w-full h-full text-white transform translate-x-12 translate-y-24" preserveAspectRatio="none">
                <path d="M50 300 L150 200 L250 250 L350 100 L450 150 L450 400 L50 400 Z" fill="currentColor" opacity="0.1" />
                <path d="M50 300 L150 200 L250 250 L350 100 L400 50" stroke="currentColor" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M350 50 L400 50 L400 100" stroke="currentColor" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
          
          {/* Visual Area (Left) */}
          <div className="relative z-10 w-full md:w-[45%] flex items-end justify-center pt-8 md:pt-12 pl-8 md:pl-12">
            <img src={homeImage} alt="Developers exchanging skills" className="w-full max-w-[450px] object-contain drop-shadow-2xl" />
          </div>

          {/* Text Area (Right) */}
          <div className="relative z-10 p-12 lg:p-16 md:w-[55%] flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-4">Ready to exchange skills?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Join thousands of developers who teach, learn, and grow together.
            </p>
            <Link to="/register" className="inline-flex w-fit mx-auto md:mx-0 items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#0038ff] transition hover:bg-slate-50 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              Join SkillForge <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#070b14] pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            
            {/* Logo & Copyright */}
            <div className="flex flex-col max-w-[200px] justify-between">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img src={logoIcon} alt="SkillForge Logo" className="h-8 w-auto object-contain" />
                <span className="text-xl font-bold tracking-tight text-white">
                  Skill<span className="text-emerald-500">Forge</span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 mt-auto pt-16 md:pt-24 whitespace-nowrap">
                &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
              </p>
            </div>
            
            {/* Links Columns */}
            <div className="flex gap-12 lg:gap-24 flex-wrap">
              <div>
                <h3 className="text-[13px] font-bold text-white mb-6 tracking-wide">Platform</h3>
                <ul className="space-y-4 text-[13px] text-gray-400 font-medium">
                  <li><Link to="#" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-white mb-6 tracking-wide">Community</h3>
                <ul className="space-y-4 text-[13px] text-gray-400 font-medium">
                  <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Events</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Leaderboard</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Partners</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-white mb-6 tracking-wide">Company</h3>
                <ul className="space-y-4 text-[13px] text-gray-400 font-medium">
                  <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[13px] font-bold text-white mb-6 tracking-wide">Stay Connected</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Twitter className="h-4 w-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Github className="h-4 w-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><MessageCircle className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
