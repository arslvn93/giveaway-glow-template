
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeaderProps {
  title: string;
  description: string;
  ctaText: string;
  heroImage: string;
}

const Header = ({ title, description, ctaText, heroImage }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
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
    }, "-=0.5");
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <header ref={headerRef} className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-giveaway-light-purple/40 to-transparent -z-10"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-giveaway-purple/10 to-giveaway-pink/10 animate-float"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-giveaway-pink/10 to-giveaway-purple/10 animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="header-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="header-desc text-lg md:text-xl text-gray-700 mb-8">
            {description}
          </p>
          <Button className="header-cta text-lg px-8 py-6 rounded-full bg-gradient-to-r from-giveaway-purple to-giveaway-pink hover:from-giveaway-pink hover:to-giveaway-purple shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {ctaText} <ArrowRight className="ml-2" />
          </Button>
        </div>
        <div className="header-image order-1 lg:order-2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src={heroImage} 
              alt="Prize" 
              className="w-full h-auto object-cover"
            />
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-giveaway-purple/40 to-giveaway-pink/40 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
          </div>
          
          {/* Prize value badge */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-full px-6 py-4 shadow-lg z-20">
            <span className="text-sm uppercase tracking-wider text-gray-500">Value</span>
            <p className="font-bold text-xl gradient-text">$1,499</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
