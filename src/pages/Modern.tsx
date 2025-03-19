
import { useEffect } from "react";
import ModernNavigation from "@/components/ModernNavigation";
import ModernHeader from "@/components/ModernHeader";
import ModernPrizeDetails from "@/components/ModernPrizeDetails";
import HowToEnter from "@/components/HowToEnter";
import CountdownTimer from "@/components/CountdownTimer";
import RulesSection from "@/components/RulesSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Import configuration
import { 
  headerContent, 
  prizeImages, 
  prizeContent, 
  howToEnterContent, 
  rulesContent, 
  contactContent, 
  countdownContent
} from "@/config/giveawayContent";

// Import framer-motion for animations
import { motion } from "framer-motion";

const Modern = () => {
  return (
    <div className="min-h-screen bg-white">
      <ModernNavigation />
      
      <ModernHeader 
        title={headerContent.title}
        description={headerContent.description}
        ctaText={headerContent.ctaText}
        heroImage={headerContent.heroImage}
        secondaryImage={headerContent.secondaryImage}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id="countdown" 
        className="scroll-mt-16"
      >
        <CountdownTimer endDate={countdownContent.endDate} />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="prize" 
        className="scroll-mt-16"
      >
        <ModernPrizeDetails 
          images={prizeImages}
          title={prizeContent.title}
          description={prizeContent.description}
          features={prizeContent.features}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="howToEnter" 
        className="scroll-mt-16"
      >
        <HowToEnter />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="rules" 
        className="scroll-mt-16"
      >
        <RulesSection rules={rulesContent.rules} />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="contact" 
        className="scroll-mt-16"
      >
        <ContactSection contactInfo={contactContent} />
      </motion.div>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Modern;
