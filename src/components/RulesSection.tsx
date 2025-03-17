
import { useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Rule {
  question: string;
  answer: string;
}

interface RulesSectionProps {
  rules: Rule[];
}

const RulesSection = ({ rules }: RulesSectionProps) => {
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
    
    tl.from(".rules-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".rules-description", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(".rules-image", {
      x: 50,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.4")
    .from(".accordion-container", {
      y: 30,
      opacity: 0,
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-giveaway-light-purple/30 to-white -z-10"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-giveaway-pink/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-giveaway-purple/5 rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="rules-title text-3xl md:text-5xl font-bold mb-4">
            Rules & Eligibility
          </h2>
          <p className="rules-description text-gray-600 max-w-2xl mx-auto">
            Please review the following rules and eligibility requirements before entering the giveaway.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="rules-image relative">
              <img 
                src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800" 
                alt="Rules and guidelines" 
                className="rounded-xl shadow-xl object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                  <span className="font-medium">Fair Selection Process</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-giveaway-purple/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertCircle className="text-giveaway-purple mr-2 w-5 h-5" />
                Important Notice
              </h3>
              <p className="text-gray-600">
                All winners will be contacted via the email provided during entry. Make sure to check your inbox (and spam folder) regularly after the giveaway ends.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="text-giveaway-purple w-4 h-4" />
                  <span className="text-sm text-gray-500">Need help? Contact support@giveaway.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="accordion-container bg-white rounded-xl shadow-xl p-6 border border-giveaway-purple/10">
              <Accordion type="single" collapsible className="w-full">
                {rules.map((rule, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-giveaway-purple/10 last:border-0">
                    <AccordionTrigger className="text-left font-medium py-4 hover:text-giveaway-purple transition-colors duration-300">
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-giveaway-light-purple flex items-center justify-center text-giveaway-purple text-xs font-bold mr-3">
                          {index + 1}
                        </span>
                        {rule.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pl-9">
                      <div className="bg-giveaway-light-purple/30 p-4 rounded-lg border-l-2 border-giveaway-purple">
                        {rule.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                  By entering, you agree to all rules and terms.
                </p>
                <button className="text-sm bg-giveaway-light-purple text-giveaway-purple px-4 py-2 rounded-full hover:bg-giveaway-purple hover:text-white transition-colors duration-300">
                  Download Full Rules PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
