
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
    <section ref={sectionRef} className="section-padding bg-giveaway-light-purple/30">
      <div className="container mx-auto px-4">
        <h2 className="rules-title text-3xl md:text-4xl font-bold text-center mb-4">
          Rules & Eligibility
        </h2>
        <p className="rules-description text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Please review the following rules and eligibility requirements before entering the giveaway.
        </p>
        
        <div className="accordion-container max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <Accordion type="single" collapsible className="w-full">
            {rules.map((rule, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {rule.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {rule.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
