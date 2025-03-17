
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  title: string;
  description: string;
  ctaText: string;
  heroImage: string;
}

const Header = ({ title, description, ctaText, heroImage }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from(".header-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".header-desc", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".header-cta", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(".header-image", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from(".floating-shape", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.7");
    
    // Create parallax effect
    if (parallaxRef.current) {
      gsap.to(".parallax-bg", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to(".floating-shape", {
        y: (i) => 50 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5
        }
      });
      
      gsap.to(".header-content", {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5
        }
      });
    }
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  
  return (
    <header ref={headerRef} className="relative overflow-hidden h-screen flex items-center justify-center">
      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-giveaway-light-purple/70 via-giveaway-light-purple/40 to-transparent"></div>
        
        {/* Particle effect in the background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className={`floating-shape absolute rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-giveaway-purple/20 to-giveaway-pink/20' : 'from-giveaway-pink/20 to-giveaway-purple/20'}`}
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="header-content lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="header-title text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="header-desc text-xl md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            {description}
          </p>
          <Button className="header-cta text-lg px-8 py-6 rounded-full bg-gradient-to-r from-giveaway-purple to-giveaway-pink hover:from-giveaway-pink hover:to-giveaway-purple shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            {ctaText} <ArrowRight className="ml-2" />
          </Button>
        </div>
        
        <div className="header-image lg:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.03] hover:rotate-1">
            <img 
              src={heroImage} 
              alt="Prize" 
              className="w-full h-auto object-cover"
            />
            
            {/* Animated glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-giveaway-purple/60 to-giveaway-pink/60 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
          </div>
          
          {/* Prize value badge with more prominent styling */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-full px-6 py-4 shadow-lg z-20 border-2 border-giveaway-purple/20 transform hover:scale-110 transition-transform duration-300">
            <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Value</span>
            <p className="font-bold text-2xl gradient-text">$1,499</p>
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 transform rotate-12 animate-float">
            <span className="text-giveaway-purple font-bold text-lg">NEW</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-giveaway-purple/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-giveaway-purple">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
