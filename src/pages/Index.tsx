
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import PrizeDetails from "@/components/PrizeDetails";
import HowToEnter from "@/components/HowToEnter";
import CountdownTimer from "@/components/CountdownTimer";
import RulesSection from "@/components/RulesSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import configuration
import { 
  headerContent, 
  prizeImages, 
  prizeContent, 
  howToEnterContent, 
  rulesContent, 
  contactContent, 
  countdownContent,
  colorScheme
} from "@/config/giveawayContent";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize GSAP animations for general page elements
    const pageElements = document.querySelectorAll(".gsap-reveal");
    
    pageElements.forEach((el) => {
      gsap.fromTo(
        el,
        { 
          y: 40, 
          opacity: 0,
          visibility: "visible"
        },
        {
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Navigation />
      
      {/* Add a fixed link to modern version */}
      <div className="fixed bottom-20 right-4 z-50">
        <Link 
          to="/modern" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>Modern Version</span>
        </Link>
      </div>
      
      <Header 
        title={headerContent.title}
        description={headerContent.description}
        ctaText={headerContent.ctaText}
        heroImage={headerContent.heroImage}
        secondaryImage={headerContent.secondaryImage} 
      />
      
      {/* Ensure consistent section spacing and transitions between sections */}
      <div id="countdown" className="scroll-mt-16">
        <CountdownTimer endDate={countdownContent.endDate} />
      </div>
      
      <div id="prize" className="scroll-mt-16">
        <PrizeDetails 
          images={prizeImages}
          title={prizeContent.title}
          description={prizeContent.description}
          features={prizeContent.features}
        />
      </div>
      
      <div id="howToEnter" className="scroll-mt-16">
        <HowToEnter />
      </div>
      
      <div id="rules" className="scroll-mt-16">
        <RulesSection rules={rulesContent.rules} />
      </div>
      
      <div id="contact" className="scroll-mt-16">
        <ContactSection contactInfo={contactContent} />
      </div>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
