
import { useEffect } from "react";
import Header from "@/components/Header";
import PrizeDetails from "@/components/PrizeDetails";
import HowToEnter from "@/components/HowToEnter";
import CountdownTimer from "@/components/CountdownTimer";
import PreviousWinners from "@/components/PreviousWinners";
import RulesSection from "@/components/RulesSection";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Cheese board images with verified working URLs
const prizeImages = [
  "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=1000", // Updated main hero image (appetizing cheese board)
  "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=500", // Cheese assortment
  "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=500", // Olives and cheese
];

const prizeFeatures = [
  "Assorted gourmet cheeses & olives - expertly selected and paired for rich, balanced flavor",
  "Sea salt pretzels & chocolate bark - the perfect mix of crunchy, salty, and sweet indulgence",
  "Handcrafted wooden cheese tray with premium knife set for effortless serving",
  "Free delivery directly to your door in Vaughan",
  "Perfect for a cozy night in with family and friends",
];

const benefitsList = [
  {
    title: "Cozy at Home",
    description: "Enjoy premium cheeses, pretzels, olives and more without stepping outside."
  },
  {
    title: "Perfect for Families",
    description: "Share a delicious evening with your loved ones."
  },
  {
    title: "A Taste of Luxury",
    description: "Indulge in high-quality ingredients brought right to your door."
  }
];

const contactInfo = {
  email: "info@theskygroup.ca",
  phone: "289-210-5250",
  brokerage: {
    name: "The Real Brokerage, Inc.",
    address: "133 Richmond Street West Suite 302"
  }
};

const winners = [
  {
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
    prize: "Gourmet Cheese Basket",
    testimonial: "The cheese basket was amazing! My family loved our cheese night. Such high quality products!",
  },
  {
    name: "Mark Johnson", 
    image: "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=774&auto=format&fit=crop",
    prize: "Wine & Cheese Package",
    testimonial: "Everything arrived perfectly packaged. The wooden board is beautiful and the cheeses were delicious.",
  },
  {
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
    prize: "Charcuterie Gift Set",
    testimonial: "Our family had such a wonderful evening enjoying this prize. The variety of cheeses was perfect!",
  },
];

const rules = [
  {
    question: "Who is eligible to enter?",
    answer: "Anyone 18 years or older residing in the Vaughan area can enter this giveaway.",
  },
  {
    question: "How long does the giveaway run?",
    answer: "This giveaway runs until February 2nd, 2025, as indicated by the countdown timer.",
  },
  {
    question: "How will the winner be selected?",
    answer: "The winner will be selected randomly from all valid entries. We use a certified random selection tool to ensure fairness.",
  },
  {
    question: "When and how will the winner be notified?",
    answer: "The winner will be notified via email within 48 hours after the giveaway ends. They must respond within 72 hours to claim their prize.",
  },
  {
    question: "How many times can I enter?",
    answer: "Each person may enter once. Additional entries can be earned through sharing on social media (up to 3 additional entries).",
  },
  {
    question: "Is my information secure?",
    answer: "Yes, we take privacy seriously. Your information will only be used for this giveaway and will not be shared with third parties.",
  },
];

// Set end date to February 2nd, 2025
const endDate = new Date("February 2, 2025");

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
      <Header 
        title="Win a Curated Cheese Board Gift Basket!" 
        description="Perfect for Vaughan families looking for a cozy night in! Enter for a chance to win our exclusive cheese board package valued at $175. No purchase necessary."
        ctaText="Enter Now"
        heroImage={prizeImages[0]}
      />
      
      {/* Rearranged sections for better conversion */}
      <CountdownTimer endDate={endDate} />
      
      <PrizeDetails 
        images={prizeImages}
        title="Gourmet Cheese Board Gift Basket"
        description="This curated gift basket is perfect for an at-home charcuterie night. Featuring a handcrafted wooden cheese board, assortment of fine cheeses, olives, sea salt pretzels, chocolate bark, and a premium knife set—everything you need for a delicious evening with your loved ones."
        features={prizeFeatures}
        benefits={benefitsList}
      />
      
      <HowToEnter />
      
      <PreviousWinners winners={winners} />
      
      <RulesSection rules={rules} />
      
      <ContactSection contactInfo={contactInfo} />
      
      <Footer 
        brokerageName={contactInfo.brokerage.name}
        brokerageAddress={contactInfo.brokerage.address}
        email={contactInfo.email}
        phone={contactInfo.phone}
      />
    </div>
  );
};

export default Index;
