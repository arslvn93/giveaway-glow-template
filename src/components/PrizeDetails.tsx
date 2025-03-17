
import { useEffect, useRef } from 'react';
import { Check, Gift, Award, Star } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prizeContent } from '@/config/giveawayContent';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  title: string;
  description: string;
}

interface PrizeDetailsProps {
  images: string[];
  title: string;
  description: string;
  features: string[];
  benefits?: Benefit[];
}

const PrizeDetails = ({ images, title, description, features, benefits }: PrizeDetailsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", 
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
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-amber-100/50"
      id="prizeDetails"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-amber-100 px-4 py-2 rounded-full mb-4">
            <span className="text-amber-800 font-semibold tracking-wide text-sm uppercase">Limited Time Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500">
            Prize Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            We've curated a premium gourmet experience to elevate your next gathering
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left side - Image */}
          <div ref={imagesRef} className="relative">
            {/* Featured Image (outside of carousel for larger display) */}
            <div className="bg-white p-5 rounded-2xl shadow-xl mb-8 hidden md:block">
              <div className="overflow-hidden rounded-xl shadow-md border border-amber-200">
                <AspectRatio ratio={4/3} className="bg-muted">
                  <img 
                    src={images[0]} 
                    alt="Featured Prize" 
                    className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
                  />
                </AspectRatio>
              </div>
            </div>
            
            {/* Main Carousel - Visible on all screens */}
            <div className="bg-white p-5 rounded-2xl shadow-xl relative z-10 max-w-md mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-xl shadow-md border border-amber-200">
                          <AspectRatio ratio={4/3} className="bg-muted">
                            <img 
                              src={image} 
                              alt={`Prize view ${index + 1}`}
                              className="object-cover w-full h-full transition-all duration-700 hover:scale-110"
                            />
                          </AspectRatio>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </Carousel>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg transform -rotate-12">
                <Gift size={24} />
              </div>
            </div>
            
            {/* Prize value badge */}
            <div className="absolute bottom-6 -right-6 md:right-0 animate-pulse-slow z-20">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg transform rotate-12">
                <span className="text-xs md:text-sm uppercase tracking-wider text-amber-100">Value</span>
                <p className="font-bold text-2xl md:text-3xl">{prizeContent.value}</p>
                <span className="text-xs text-amber-100 px-2 text-center">Limited Time</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-amber-200/50 prize-decoration"></div>
            <div className="absolute top-1/3 -right-12 w-24 h-24 rounded-full bg-amber-100/50 prize-decoration"></div>
          </div>
          
          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-8 relative">
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200/30">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-8 w-8 text-amber-500" />
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h3>
                </div>
                
                <p className="text-gray-600 md:text-lg leading-relaxed">{description}</p>
                
                <div className="pt-4">
                  <h4 className="text-xl font-semibold flex items-center text-gray-800 mb-4">
                    <Star size={20} className="text-amber-500 mr-2" /> 
                    What's Included:
                  </h4>
                  
                  <ul className="space-y-3">
                    {features && features.length > 0 ? (
                      features.map((feature, index) => (
                        <li key={index} className="feature-item flex items-start hover:translate-x-1 transition-transform duration-300">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white mr-3">
                            <Check size={14} />
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="feature-item text-gray-500 italic">
                        Features will be announced soon!
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <a href="#howToEnter" className="inline-block w-full py-4 text-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    ENTER GIVEAWAY NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeDetails;
