import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Zap, Star, Code2, Atom, Calendar, Video, ArrowRight, PlayCircle } from "lucide-react";
import { GradientButton } from "../../../components/common/GradientButton";
import { AnimatedSection } from "../../../components/common/AnimatedSection";

interface HomeHeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
  orb1Ref: React.RefObject<HTMLDivElement>;
  orb2Ref: React.RefObject<HTMLDivElement>;
}

export function HomeHero({ heroRef, orb1Ref, orb2Ref }: HomeHeroProps) {
  return (
    <AnimatedSection className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 gsap-reveal">
      {/* Glow Effects */}
      <div ref={orb1Ref} className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div ref={orb2Ref} className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-400/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-900/30 px-4 py-1.5 text-xs font-medium text-indigo-400 mb-6">
            <Zap className="h-3 w-3" />
            Real-Time Skill Exchange Platform
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-heading">
            <TypeAnimation
              sequence={[
                'Teach React', 1000,
                'Learn Node.js', 1000,
                'Exchange DevOps', 1000,
                'Build Together', 1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent"
            />
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            Connect with developers who want to learn your skills and teach you theirs. Match, schedule micro-sessions, chat, and grow your reputation.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link to="/register">
              <GradientButton variant="primary">
                Find Matches <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </Link>
            <GradientButton variant="ghost" className="border border-white/10 hover:bg-white/5">
              <PlayCircle className="h-5 w-5 text-slate-300" /> How It Works
            </GradientButton>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-8 border-t border-slate-700/50 pt-8">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="h-10 w-10 rounded-full border-2 border-slate-950" />
                ))}
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold text-white leading-tight font-heading">12K+</div>
                <div className="text-xs text-slate-400">Developers</div>
              </div>
            </div>
            
            <div>
              <div className="text-xl font-bold text-white leading-tight font-heading">8K+</div>
              <div className="text-xs text-slate-400">Skills</div>
            </div>
            
            <div>
              <div className="text-xl font-bold text-white leading-tight font-heading">25K+</div>
              <div className="text-xs text-slate-400">Sessions</div>
            </div>

            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[10px] text-slate-400"><span className="text-white font-bold text-xs">4.9/5</span> From 1,200+ reviews</div>
            </div>
          </div>
        </motion.div>

        {/* Right Hero Card Area */}
        <div ref={heroRef} className="relative w-full max-w-md mx-auto">
          {/* Background floating elements */}
          <div className="absolute -top-10 -right-10 w-24 h-24 rounded-2xl bg-indigo-900/40 border border-indigo-500/20 backdrop-blur flex items-center justify-center animate-[float_6s_infinite]">
              <Code2 className="w-10 h-10 text-indigo-400" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-teal-900/40 border border-teal-500/20 backdrop-blur flex items-center justify-center animate-[float_7s_infinite]">
              <Atom className="w-8 h-8 text-teal-400" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="parallax-card relative w-full rounded-[2rem] glass-dark p-6 shadow-soft"
          >
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-[2rem] -z-10" />
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-semibold text-teal-400">Perfect Match Found! 🎉</span>
              <div className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-400 border border-teal-500/20">
                96% Match
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-indigo-500/50">
                <img src="https://i.pravatar.cc/150?img=11" alt="Ahmed" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-slate-900 bg-teal-400"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2 font-heading">Ahmed <span className="text-sm font-normal text-slate-400">Developer</span></h3>
                <div className="text-sm text-slate-400 flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-1">
                     <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 
                     <span className="text-slate-300 font-medium">4.9</span> (120 reviews)
                  </div>
                  <div>📍 Cairo, Egypt</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                <div className="text-xs text-slate-400 mb-2 font-semibold">Can Teach</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400">React</span>
                  <Atom className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-4">
                <div className="text-xs text-teal-400 mb-2 font-semibold">Wants to Learn</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-400">Node.js</span>
                  <div className="h-5 w-5 rounded bg-teal-500/20 flex items-center justify-center text-teal-400 text-[9px] font-bold border border-teal-500/30">JS</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="border-r border-slate-700/50">
                <div className="text-slate-400 text-xs mb-1 font-semibold">Next Availability</div>
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <Calendar className="w-4 h-4 text-slate-400" /> Tomorrow, 4:00 PM
                </div>
              </div>
              <div className="pl-2">
                <div className="text-slate-400 text-xs mb-1 font-semibold">Session Type</div>
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <Video className="w-4 h-4 text-indigo-400" /> Video Call
                </div>
              </div>
            </div>

            <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 py-3.5 text-sm font-bold text-white transition hover:opacity-90 shadow-glow">
              Book Session
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
