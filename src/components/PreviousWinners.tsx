
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

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden md:py-[50px]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')] bg-fixed bg-no-repeat bg-cover opacity-5 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-amber-100/20 -z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        {/* The CTA Banner section has been removed */}
      </div>
    </section>
  );
};

export default PreviousWinners;
