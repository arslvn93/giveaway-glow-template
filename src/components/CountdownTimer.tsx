
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
      className="section-padding bg-giveaway-dark-purple text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="countdown-title text-3xl md:text-4xl font-bold mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-giveaway-purple to-giveaway-pink">
            Giveaway Ends In
          </span>
        </h2>
        
        <div 
          ref={timerRef}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          <div className="timer-unit bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[5rem] md:w-[8rem] flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold">{addLeadingZero(timeLeft.days)}</span>
            <span className="text-xs md:text-sm uppercase tracking-wider mt-2 text-white/70">Days</span>
          </div>
          
          <div className="timer-unit bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[5rem] md:w-[8rem] flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold">{addLeadingZero(timeLeft.hours)}</span>
            <span className="text-xs md:text-sm uppercase tracking-wider mt-2 text-white/70">Hours</span>
          </div>
          
          <div className="timer-unit bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[5rem] md:w-[8rem] flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold">{addLeadingZero(timeLeft.minutes)}</span>
            <span className="text-xs md:text-sm uppercase tracking-wider mt-2 text-white/70">Minutes</span>
          </div>
          
          <div className="timer-unit bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-[5rem] md:w-[8rem] flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold">{addLeadingZero(timeLeft.seconds)}</span>
            <span className="text-xs md:text-sm uppercase tracking-wider mt-2 text-white/70">Seconds</span>
          </div>
        </div>
        
        {/* Milestone notification */}
        {timeLeft.days < 1 && (
          <div className="mt-10 inline-block bg-giveaway-pink/20 text-giveaway-pink px-6 py-3 rounded-full text-sm md:text-base font-medium animate-pulse">
            ⚡ Less than 24 hours left! Don't miss out!
          </div>
        )}
      </div>
    </section>
  );
};

export default CountdownTimer;
