
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Share2, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HowToEnter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entrants, setEntrants] = useState(482); // Mock data
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const steps: Step[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Fill Out the Form",
      description: "Enter your email address and name in the form and submit it."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Share with Friends",
      description: "Share this giveaway on social media for extra entries."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Confirm Entry",
      description: "Check your email to confirm your entry and you're all set!"
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
      setEmail('');
      setName('');
      setEntrants(prev => prev + 1);
      alert('Thank you for entering the giveaway!');
    }, 1500);
  };
  
  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-white to-giveaway-light-purple/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text">How to Enter</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={stepsRef} className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="step-item flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-giveaway-purple text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div ref={formRef} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Enter Now</h3>
              <div className="bg-giveaway-light-purple px-4 py-2 rounded-full flex items-center">
                <Users size={18} className="text-giveaway-purple mr-2" />
                <span className="font-semibold text-giveaway-purple">{entrants} entries</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 rounded-full bg-gradient-to-r from-giveaway-purple to-giveaway-pink hover:from-giveaway-pink hover:to-giveaway-purple shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isSubmitting ? "Processing..." : "Enter Giveaway"}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By entering, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToEnter;
