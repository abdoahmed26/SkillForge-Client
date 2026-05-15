import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, Calendar, Star, Trophy, MessageCircle, Video, UserCircle, ArrowRight,
  Mail, MapPin, Send
} from "lucide-react";
import { AnimatedSection } from "../../../components/common/AnimatedSection";
import { GradientButton } from "../../../components/common/GradientButton";
import { MotionCard } from "../../../components/common/MotionCard";
import homeImage from "../../../assets/home-image.png";

export function HowItWorks() {
  return (
    <AnimatedSection id="how-it-works" className="py-16 bg-slate-950 relative gsap-reveal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px w-8 bg-indigo-800" />
          <h2 className="text-2xl font-bold text-white tracking-wide font-heading">How It Works</h2>
          <div className="h-px w-8 bg-indigo-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed border-slate-700/50" />

          {[
            { num: 1, title: "Create Profile", desc: "Add skills you can teach and want to learn.", icon: UserCircle, color: "text-indigo-500", bg: "bg-slate-900", border: "border-indigo-900/50" },
            { num: 2, title: "Find Matches", desc: "Get matched with developers based on skills.", icon: Users, color: "text-teal-400", bg: "bg-slate-900", border: "border-teal-900/50" },
            { num: 3, title: "Book Session", desc: "Schedule short learning sessions easily.", icon: Calendar, color: "text-purple-500", bg: "bg-slate-900", border: "border-purple-900/50" },
            { num: 4, title: "Earn Reputation", desc: "Get reviews, XP points, and badges.", icon: Star, color: "text-amber-500", bg: "bg-slate-900", border: "border-amber-900/50" },
          ].map((step, i) => (
            <motion.div 
              key={step.num} 
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-24 h-24 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 shadow-soft hover:-translate-y-1 transition-transform`}>
                <step.icon className={`w-10 h-10 ${step.color}`} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">{step.num}</span>
                <h3 className="text-base font-bold text-white font-heading">{step.title}</h3>
              </div>
              <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function PlatformFeatures() {
  return (
    <AnimatedSection id="features" className="py-16 bg-slate-950 gsap-reveal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-16 text-center">
          <div className="h-px w-8 bg-indigo-800" />
          <h2 className="text-2xl font-bold text-white tracking-wide font-heading">Platform Features</h2>
          <div className="h-px w-8 bg-indigo-800" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Smart Skill Matching", desc: "Our algorithm matches you with the best people based on your skills and goals.", icon: Users, color: "text-indigo-400", bg: "bg-indigo-900/20" },
            { title: "Real-Time Chat", desc: "Built-in real-time messaging to discuss, share resources, and solve problems.", icon: MessageCircle, color: "text-teal-400", bg: "bg-teal-900/20" },
            { title: "Video Micro-Sessions", desc: "High-quality video calls for focused 1-on-1 learning experiences.", icon: Video, color: "text-purple-400", bg: "bg-purple-900/20" },
            { title: "Reviews & Ratings", desc: "Rate your sessions and build your reputation in the community.", icon: Star, color: "text-amber-400", bg: "bg-amber-900/20" },
            { title: "Gamification System", desc: "Earn XP points, level up, and unlock badges as you grow and help others.", icon: Trophy, color: "text-pink-400", bg: "bg-pink-900/20" },
            { title: "Developer Community", desc: "Join a supportive community of developers helping each other succeed.", icon: Users, color: "text-cyan-400", bg: "bg-cyan-900/20" },
          ].map((feature, i) => (
            <MotionCard
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-heading">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TrendingSkills() {
  const skills = [
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Python", icon: "python" },
    { name: "Docker", icon: "docker" },
    { name: "AWS", icon: "aws" },
    { name: "TypeScript", icon: "ts" },
    { name: "GraphQL", icon: "graphql" },
    { name: "Go", icon: "go" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Rust", icon: "rust" },
    { name: "Swift", icon: "swift" },
  ];

  return (
    <AnimatedSection className="py-20 border-y border-slate-800/50 bg-slate-950/50 relative overflow-hidden gsap-reveal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative">
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-10 font-heading">Popular Technologies Exchanged</p>
        
        {/* Gradient masks for smooth fade in/out on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6 whitespace-nowrap min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {[...skills, ...skills].map((skill, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-slate-800 bg-slate-900/50 transition-colors hover:border-indigo-500/50 shadow-soft cursor-default group"
              >
                <img 
                  src={`https://skillicons.dev/icons?i=${skill.icon}`} 
                  alt={skill.name} 
                  className="w-6 h-6 group-hover:scale-110 transition-transform" 
                />
                <span className="text-slate-300 font-medium text-sm group-hover:text-indigo-300 transition-colors">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function Testimonials() {
  return (
    <AnimatedSection id="testimonials" className="py-24 bg-slate-950 relative gsap-reveal">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-16 text-center">
          <div className="h-px w-8 bg-teal-800" />
          <h2 className="text-3xl font-bold text-white tracking-wide font-heading">What Developers Say</h2>
          <div className="h-px w-8 bg-teal-800" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", role: "Frontend Developer", text: "SkillForge helped me learn Node.js in exchange for my React knowledge. The 1-on-1 sessions were incredibly effective!", avatar: "https://i.pravatar.cc/150?img=5" },
            { name: "Michael T.", role: "DevOps Engineer", text: "I traded my Docker expertise for Python lessons. The gamification system keeps me motivated to teach more.", avatar: "https://i.pravatar.cc/150?img=11" },
            { name: "Elena R.", role: "Full Stack Developer", text: "The matching algorithm is spot on. I found a mentor who wanted to learn exactly what I could teach. Brilliant platform.", avatar: "https://i.pravatar.cc/150?img=9" },
          ].map((testimonial, i) => (
            <MotionCard 
              key={i} 
              className="flex flex-col justify-between h-full bg-slate-900/40 border border-slate-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 italic leading-relaxed mb-8">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-800/50">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-slate-800 object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function HomeCTA() {
  return (
    <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-indigo-600 via-teal-500 to-teal-400 p-0 flex flex-col md:flex-row items-center shadow-glow"
      >
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
          <motion.img 
            src={homeImage} 
            alt="Developers exchanging skills" 
            className="w-full max-w-[450px] object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
        </div>

        {/* Text Area (Right) */}
        <div className="relative z-10 p-12 lg:p-16 md:w-[55%] flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-4 font-heading">Ready to exchange skills?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Join thousands of developers who teach, learn, and grow together.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit mx-auto md:mx-0">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-600 transition hover:bg-slate-50 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              Join SkillForge <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function ContactUs() {
  return (
    <AnimatedSection id="contact" className="py-24 bg-slate-950 relative gsap-reveal border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-indigo-800" />
              <h2 className="text-3xl font-bold text-white tracking-wide font-heading">Get in Touch</h2>
            </div>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Have questions about SkillForge? Want to suggest a new feature or partner with us? We'd love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                  <p className="text-slate-400 text-sm">abdulrahman.ahmed2623@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Office</h4>
                  <p className="text-slate-400 text-sm">123 Developer Way, Suite 404</p>
                  <p className="text-slate-400 text-sm">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Form */}
          <MotionCard 
            className="p-8 md:p-10 bg-slate-900/60 border border-slate-800 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                  <input type="text" id="firstName" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                  <input type="text" id="lastName" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input type="email" id="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              
              <GradientButton variant="primary" className="w-full flex justify-center py-3.5">
                Send Message <Send className="w-4 h-4 ml-2" />
              </GradientButton>
            </form>
          </MotionCard>
        </div>
      </div>
    </AnimatedSection>
  );
}
