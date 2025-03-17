
import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
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
        start: "top 70%",
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
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text">Prize Details</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imagesRef} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`overflow-hidden rounded-xl ${index === 0 ? 'col-span-2' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`Prize view ${index + 1}`} 
                    className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
            <p className="text-gray-700">{description}</p>
            
            <div className="space-y-3 pt-4">
              <h4 className="text-xl font-semibold">What's Included:</h4>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-giveaway-purple text-white mr-3">
                      <Check size={14} />
                    </span>
                    <span>{feature}</span>
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
