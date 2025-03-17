
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  title: string;
  description: string;
  ctaText: string;
  heroImage: string;
  secondaryImage?: string; // Add optional secondary image prop
}

const Header = ({ title, description, ctaText, heroImage, secondaryImage }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    console.log("Hero image URL:", heroImage);
    
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
    }, "-=0.7")
    .from(".secondary-image", {
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");
    
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
  }, [heroImage]);
  
  const fallbackImages = [
    "https://images.unsplash.com/photo-1631379578550-7049d89410c2?q=80&w=1000",
    "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=1000",
    "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?q=80&w=1000",
  ];
  
  const defaultHeroImage = fallbackImages[0];
  const defaultSecondaryImage = fallbackImages[1];
  
  const mainImage = heroImage || defaultHeroImage;
  const secondImage = secondaryImage || defaultSecondaryImage;
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load:", e.currentTarget.src);
    if (e.currentTarget.src === mainImage) {
      e.currentTarget.src = fallbackImages[1];
    }
    else if (e.currentTarget.src === fallbackImages[1]) {
      e.currentTarget.src = fallbackImages[2];
    }
  };
  
  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setImageLoaded(true);
  };
  
  return (
    <header ref={headerRef} className="relative overflow-hidden h-screen flex items-center justify-center">
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-transparent"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className={`floating-shape absolute rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-amber-400/20 to-amber-600/20' : 'from-amber-500/20 to-amber-300/20'}`}
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
            <span className="text-amber-700">{title}</span>
          </h1>
          <p className="header-desc text-xl md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            {description}
          </p>
          
          {/* New button implementation with higher z-index and clear styling */}
          <div className="header-cta relative z-30">
            <Button 
              className="text-lg px-8 py-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-bold border-2 border-amber-400"
            >
              <span className="mr-2">{ctaText}</span> 
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="secondary-image mt-8 relative mx-auto lg:hidden w-3/4">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={secondImage} 
                alt="Cheese assortment" 
                className="w-full h-auto object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <div className="header-image lg:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.03] hover:rotate-1">
            <img 
              src={mainImage} 
              alt="Gourmet Cheese Board" 
              className="w-full h-auto object-cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-amber-100/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/60 to-amber-700/60 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
          </div>
          
          <div className="secondary-image absolute -left-16 bottom-20 hidden lg:block w-48 h-48 z-20">
            <div className="relative rounded-xl overflow-hidden shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <img 
                src={secondImage} 
                alt="Cheese assortment" 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-transparent"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-white rounded-full px-6 py-4 shadow-lg z-20 border-2 border-amber-400/30 transform hover:scale-110 transition-transform duration-300">
            <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Value</span>
            <p className="font-bold text-2xl text-amber-700">$175</p>
          </div>
          
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 transform rotate-12 animate-float">
            <span className="text-amber-700 font-bold text-lg">GIFT</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
