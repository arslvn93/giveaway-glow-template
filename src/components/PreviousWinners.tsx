
import { useEffect, useRef } from 'react';
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
        <h2 className="winners-title text-3xl md:text-4xl font-bold text-center mb-4">
          Previous Winners
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Meet some of our lucky winners from previous giveaways. You could be next!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winners.map((winner, index) => (
            <div 
              key={index} 
              className="winner-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={winner.image} 
                  alt={winner.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{winner.name}</h3>
                    <p className="text-sm text-gray-500">Won: {winner.prize}</p>
                  </div>
                  <div className="flex-shrink-0 bg-giveaway-light-purple w-10 h-10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-giveaway-purple">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic">"{winner.testimonial}"</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousWinners;
