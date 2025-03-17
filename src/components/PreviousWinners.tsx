
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

const PreviousWinners = ({ winners }: PreviousWinnersProps) => {
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
    })
    .from(".winner-card", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3");
    
    // Add hover animations
    gsap.utils.toArray(".winner-card").forEach((card) => {
      const image = card.querySelector(".winner-image");
      const overlay = card.querySelector(".image-overlay");
      
      card.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.1, duration: 0.4 });
        gsap.to(overlay, { opacity: 0.7, duration: 0.4 });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.4 });
        gsap.to(overlay, { opacity: 0.4, duration: 0.4 });
      });
    });
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')] bg-fixed bg-no-repeat bg-cover opacity-5 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-giveaway-light-purple/20 -z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="winners-title text-3xl md:text-5xl font-bold mb-4">
            <span className="relative">
              Previous Winners
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-giveaway-purple to-giveaway-pink"></span>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Meet some of our lucky winners from previous giveaways. You could be next!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {winners.map((winner, index) => (
            <div 
              key={index} 
              className="winner-card bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={winner.image} 
                  alt={winner.name} 
                  className="winner-image w-full h-full object-cover transition-all duration-500"
                />
                <div className="image-overlay absolute inset-0 bg-gradient-to-t from-giveaway-purple/60 to-transparent opacity-40 transition-opacity duration-500"></div>
                
                {/* Winner badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-giveaway-purple shadow-lg">
                  WINNER
                </div>
              </div>
              
              <div className="p-6 relative">
                {/* Quote icon */}
                <div className="absolute -top-8 right-6 bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center text-giveaway-purple group-hover:scale-110 transition-transform duration-300">
                  <Quote size={20} />
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-xl">{winner.name}</h3>
                  <p className="text-sm text-giveaway-purple font-medium">Won: {winner.prize}</p>
                </div>
                
                <blockquote className="text-gray-700 italic border-l-2 border-giveaway-purple/30 pl-4">
                  "{winner.testimonial}"
                </blockquote>
                
                {/* Social proof icons */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Verified Winner</span>
                  <div className="flex space-x-2">
                    {['Facebook', 'Twitter', 'Instagram'].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-giveaway-light-purple transition-colors duration-300">
                        <div className="w-3 h-3 rounded-full bg-gray-400 hover:bg-giveaway-purple transition-colors duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-giveaway-purple to-giveaway-pink rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full filter blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Want to be our next winner?</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Don't miss your chance to win amazing prizes. Enter our giveaway today!
            </p>
            <button className="bg-white text-giveaway-purple px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Enter Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviousWinners;
