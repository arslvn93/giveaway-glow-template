import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
interface Winner {
  name: string;
  image: string;
  prize: string;
  testimonial: string;
}
interface PreviousWinnersProps {
  winners: Winner[];
}
const PreviousWinners = ({
  winners
}: PreviousWinnersProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    tl.from(".winners-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }).from(".winner-card", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3");

    // Add hover animations
    const cards = gsap.utils.toArray<HTMLElement>(".winner-card");
    cards.forEach(card => {
      const image = card.querySelector<HTMLElement>(".winner-image");
      const overlay = card.querySelector<HTMLElement>(".image-overlay");
      if (image && overlay) {
        card.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4
          });
          gsap.to(overlay, {
            opacity: 0.7,
            duration: 0.4
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4
          });
          gsap.to(overlay, {
            opacity: 0.4,
            duration: 0.4
          });
        });
      }
    });
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  return <section ref={sectionRef} className="py-16 relative overflow-hidden md:py-[50px]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')] bg-fixed bg-no-repeat bg-cover opacity-5 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-amber-100/20 -z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        
        
        
        
        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 md:p-10 text-white text-center shadow-xl relative overflow-hidden my-[39px]">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full filter blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Want to be our next winner?</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Don't miss your chance to win this amazing cheese board gift basket. Enter our giveaway today!
            </p>
            <a href="#howToEnter" className="bg-white text-amber-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Enter Now
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default PreviousWinners;