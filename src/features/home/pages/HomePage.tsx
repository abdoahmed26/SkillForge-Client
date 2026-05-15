import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedPage } from "../../../components/common/AnimatedPage";

import { HomeHeader } from "../components/HomeHeader";
import { HomeHero } from "../components/HomeHero";
import { 
  HowItWorks, 
  PlatformFeatures, 
  TrendingSkills, 
  Testimonials, 
  HomeCTA,
  ContactUs
} from "../components/HomeSections";
import { HomeFooter } from "../components/HomeFooter";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Subtle background grid movement
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        backgroundPosition: "100px 100px",
        duration: 20,
        repeat: -1,
        ease: "linear"
      });
    }

    // Slow moving glowing orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 100,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -100,
        y: -50,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Parallax hero cards
    if (heroRef.current) {
      gsap.to(".parallax-card", {
        y: (i) => -20 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    // Scroll reveal sections
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <AnimatedPage className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans overflow-hidden relative">
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h40v40H0V0zm1 1h38v38H1V1z\" fill=\"%23fff\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')" }} 
      />
      
      <HomeHeader />
      <HomeHero heroRef={heroRef} orb1Ref={orb1Ref} orb2Ref={orb2Ref} />
      <HowItWorks />
      <PlatformFeatures />
      <TrendingSkills />
      <Testimonials />
      <ContactUs />
      <HomeCTA />
      <HomeFooter />
      
    </AnimatedPage>
  );
}
