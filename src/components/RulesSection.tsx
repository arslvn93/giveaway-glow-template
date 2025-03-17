
import { useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rulesContent } from '@/config/giveawayContent';

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
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-white">
      {/* Background decoration - matching style with other sections */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-amber-500/10 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-600/10 rounded-full animate-float"></div>
      <div className="absolute top-40 left-20 w-20 h-20 bg-amber-400/10 rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="rules-title text-3xl md:text-5xl font-bold mb-4 text-amber-700">
            {rulesContent.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-6"></div>
          <p className="rules-description text-gray-700 max-w-2xl mx-auto">
            {rulesContent.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="rules-image relative">
              <img 
                src={rulesContent.imageUrl} 
                alt="Rules and guidelines" 
                className="rounded-xl shadow-xl object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg border border-amber-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-amber-600 w-6 h-6" />
                  <span className="font-medium text-amber-800">Fair Selection Process</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-amber-700">
                <AlertCircle className="text-amber-500 mr-2 w-5 h-5" />
                Important Notice
              </h3>
              <p className="text-gray-700">
                {rulesContent.importantNotice}
              </p>
              <div className="mt-4 pt-4 border-t border-amber-100">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="text-amber-500 w-4 h-4" />
                  <span className="text-sm text-gray-600">Need help? Contact {rulesContent.supportEmail}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="accordion-container bg-white rounded-xl shadow-xl p-6 border border-amber-200 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -z-0"></div>
              
              <Accordion type="single" collapsible className="w-full relative z-10">
                {rules.map((rule, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-amber-200 last:border-0">
                    <AccordionTrigger className="text-left font-medium py-4 hover:text-amber-600 transition-colors duration-300">
                      <div className="flex items-center">
                        <span className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mr-3">
                          {index + 1}
                        </span>
                        {rule.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pl-10">
                      <div className="bg-amber-50 p-4 rounded-lg border-l-2 border-amber-500">
                        {rule.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-amber-100 relative z-10">
                <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                  {rulesContent.termsText}
                </p>
                <button className="text-sm bg-amber-100 text-amber-700 px-6 py-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg border border-amber-200 hover:border-amber-600">
                  {rulesContent.downloadRulesText}
                </button>
              </div>
            </div>
            
            {/* Added bonus tips box */}
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-amber-700">Tips for Entering</h3>
              <ul className="space-y-2">
                {rulesContent.tipsForEntering.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mt-1 mr-2">✓</span>
                    <span className="text-gray-700">{tip}</span>
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

export default RulesSection;
