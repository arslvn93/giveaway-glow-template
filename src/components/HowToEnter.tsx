
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Share2, Users, Check, ArrowRight, Clock, Trophy, Gift } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const HowToEnter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [entrants, setEntrants] = useState(482); // Mock data
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const steps: Step[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Fill Out the Form",
      description: "Enter your email address and name in the form and submit it.",
      image: "https://images.unsplash.com/photo-1579389083395-4507e98b5e67?q=80&w=500"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Share with Friends",
      description: "Share this giveaway on social media for extra entries.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Confirm Entry",
      description: "Check your email to confirm your entry and you're all set!",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=500"
    }
  ];
  
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
    
    tl.from(".section-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".step-item", {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3")
    .from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.5");
    
    // Floating animations for decorative elements
    gsap.to(".floating-circle", {
      y: "-15px",
      duration: 2.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setName('');
      setEntrants(prev => prev + 1);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100/70">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-40 h-40 floating-circle bg-amber-500/10 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 floating-circle bg-amber-600/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 floating-circle bg-amber-400/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/5 w-32 h-32 floating-circle bg-amber-300/15 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 floating-circle bg-amber-200/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-5xl font-bold text-center mb-10">
          <span className="text-amber-700">How to Enter</span>
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-amber-700/80 text-lg">Getting started is easy! Follow these simple steps to enter our giveaway.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={stepsRef} className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="step-item group">
                <div className="flex items-start space-x-6 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{step.title}</h3>
                    <p className="text-amber-700/80">{step.description}</p>
                  </div>
                </div>
                <div className="ml-18 pl-6 border-l-2 border-dashed border-amber-400/50">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="rounded-lg shadow-md object-cover h-48 w-full transform group-hover:scale-[1.02] transition-all duration-300 border border-amber-200" 
                  />
                </div>
              </div>
            ))}

            {/* Additional benefits cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: <Clock className="h-5 w-5" />, title: "Quick & Easy", desc: "Takes less than a minute" },
                { icon: <Trophy className="h-5 w-5" />, title: "Multiple Entries", desc: "Share for more chances" },
                { icon: <Gift className="h-5 w-5" />, title: "Premium Prize", desc: "Valued at $175" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow border border-amber-200 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
                      {item.icon}
                    </div>
                    <h4 className="font-medium text-amber-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-amber-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={formRef} className="relative">
            {/* Card decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-2xl transform rotate-1 scale-105 -z-10 blur-sm"></div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl relative z-10 border border-amber-200">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-amber-800">Enter Now</h3>
                <div className="bg-amber-100 px-4 py-2 rounded-full flex items-center">
                  <Users size={18} className="text-amber-600 mr-2" />
                  <span className="font-semibold text-amber-700">{entrants} entries</span>
                </div>
              </div>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={30} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-medium text-green-800 mb-2">Entry Submitted!</h4>
                  <p className="text-green-600">Check your email to confirm your entry.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-amber-700">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-amber-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group border border-amber-400"
                  >
                    {isSubmitting ? "Processing..." : "Enter Giveaway"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  
                  <div className="pt-4 border-t border-amber-100">
                    <h4 className="text-sm font-medium mb-2 text-amber-700">Share for Extra Entries:</h4>
                    <div className="flex space-x-3">
                      {['Facebook', 'Twitter', 'Instagram'].map((platform, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          size="sm"
                          className="flex-1 border-amber-300 hover:bg-amber-100 hover:text-amber-700 text-amber-600 transition-all duration-300"
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4">
                    <p className="text-xs text-center text-amber-700">
                      By entering, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Testimonial callout */}
            <div className="absolute -bottom-6 -right-6 max-w-xs z-20 hidden lg:block">
              <div className="bg-white p-4 rounded-lg shadow-lg border border-amber-200 rotate-3">
                <div className="flex items-start space-x-3">
                  <div className="text-amber-500 text-xl">"</div>
                  <div>
                    <p className="text-sm italic text-amber-700">Entering was so easy! I got my prize within a week of winning!</p>
                    <p className="text-xs font-medium text-amber-600 mt-1">— Previous Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToEnter;
