
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageGallery from './prize/ImageGallery';
import PrizeContent from './prize/PrizeContent';
import BenefitsSection from './prize/BenefitsSection';

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
    
    // Add animations for the entire section
    tl.from(".section-content > *", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: "power3.out"
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
        
        <div className="section-content grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left side - Image Gallery */}
          <ImageGallery images={images} />
          
          {/* Right side - Prize Content */}
          <PrizeContent 
            title={title}
            description={description}
            features={features}
          />
        </div>

        {/* Benefits Section */}
        {benefits && benefits.length > 0 && (
          <BenefitsSection benefits={benefits} />
        )}
      </div>
    </section>
  );
};

export default PrizeDetails;
