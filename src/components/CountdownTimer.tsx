
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endDate: Date;
}

const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 80%",
        toggleActions: "play none none none"
      }
    });
    
    tl.from(".countdown-title", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    })
    .from(".timer-unit", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Giveaway ended
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const addLeadingZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };
  
  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-amber-900 text-white relative overflow-hidden"
    >
      {/* Add background elements for better visibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-800 to-amber-950"></div>
      <div className="absolute w-full h-full -z-5 bg-[url('https://images.unsplash.com/photo-1631379578550-7049d89410c2?q=80&w=1000')] opacity-20 bg-cover bg-center"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="countdown-title text-3xl md:text-5xl font-bold mb-12 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
            Giveaway Ends In
          </span>
        </h2>
        
        <div 
          ref={timerRef}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          <div className="timer-unit bg-amber-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[6rem] md:w-[9rem] flex flex-col items-center border-2 border-amber-600/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <span className="text-4xl md:text-6xl font-bold text-amber-200">{addLeadingZero(timeLeft.days)}</span>
            <span className="text-sm md:text-base uppercase tracking-wider mt-2 text-amber-100 font-semibold">Days</span>
          </div>
          
          <div className="timer-unit bg-amber-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[6rem] md:w-[9rem] flex flex-col items-center border-2 border-amber-600/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <span className="text-4xl md:text-6xl font-bold text-amber-200">{addLeadingZero(timeLeft.hours)}</span>
            <span className="text-sm md:text-base uppercase tracking-wider mt-2 text-amber-100 font-semibold">Hours</span>
          </div>
          
          <div className="timer-unit bg-amber-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[6rem] md:w-[9rem] flex flex-col items-center border-2 border-amber-600/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <span className="text-4xl md:text-6xl font-bold text-amber-200">{addLeadingZero(timeLeft.minutes)}</span>
            <span className="text-sm md:text-base uppercase tracking-wider mt-2 text-amber-100 font-semibold">Minutes</span>
          </div>
          
          <div className="timer-unit bg-amber-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[6rem] md:w-[9rem] flex flex-col items-center border-2 border-amber-600/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <span className="text-4xl md:text-6xl font-bold text-amber-200">{addLeadingZero(timeLeft.seconds)}</span>
            <span className="text-sm md:text-base uppercase tracking-wider mt-2 text-amber-100 font-semibold">Seconds</span>
          </div>
        </div>
        
        {/* Milestone notification with improved visibility */}
        {timeLeft.days < 1 && (
          <div className="mt-10 inline-block bg-amber-400 text-amber-950 px-8 py-4 rounded-full text-base md:text-lg font-bold animate-pulse shadow-lg border-2 border-amber-300">
            ⚡ Less than 24 hours left! Don't miss out!
          </div>
        )}

        {/* Add a CTA button to drive more conversions */}
        <div className="mt-12">
          <a href="#howToEnter" className="inline-block bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-10 py-4 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-amber-400">
            ENTER NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
