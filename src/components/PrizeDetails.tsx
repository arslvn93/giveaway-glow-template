
import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PrizeDetailsProps {
  images: string[];
  title: string;
  description: string;
  features: string[];
}

const PrizeDetails = ({ images, title, description, features }: PrizeDetailsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Adjusted trigger point
        end: "bottom 70%",
        toggleActions: "play none none none"
      }
    });
    
    tl.from(imagesRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(contentRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".feature-item", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.4");
    
    // Add floating animations to decorative elements
    gsap.to(".prize-decoration", {
      y: "-20px",
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    });
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-visible" id="prizeDetails">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-giveaway-light-purple/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-giveaway-pink/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 prize-decoration bg-giveaway-purple/10 rounded-full"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 prize-decoration bg-giveaway-pink/10 rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
          <span className="gradient-text">Prize Details</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={imagesRef} className="space-y-8 mx-auto w-full max-w-lg">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl shadow-lg border border-giveaway-purple/10">
                        <AspectRatio ratio={4/3} className="bg-muted">
                          <img 
                            src={image} 
                            alt={`Prize view ${index + 1}`}
                            className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
            
            {/* Prize value badge */}
            <div className="bg-white w-40 h-40 rounded-full mx-auto flex flex-col items-center justify-center border-4 border-giveaway-purple/20 shadow-xl transform hover:rotate-12 transition-all duration-300 animate-float">
              <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Value</span>
              <p className="font-bold text-3xl gradient-text">$1,499</p>
              <span className="text-xs text-gray-400">Limited Time Offer</span>
            </div>
          </div>
          
          <div ref={contentRef} className="space-y-8 relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-giveaway-purple/30 rounded-tl-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-giveaway-pink/30 rounded-br-xl"></div>
            
            <div className="pl-4 border-l-4 border-giveaway-purple">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{title}</h3>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
            
            <div className="space-y-6 pt-4">
              <h4 className="text-xl font-semibold flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-giveaway-purple to-giveaway-pink mr-3"></span>
                What's Included:
              </h4>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-giveaway-purple to-giveaway-pink text-white mr-4">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeDetails;
