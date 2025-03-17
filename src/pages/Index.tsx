
import { useEffect } from "react";
import Header from "@/components/Header";
import PrizeDetails from "@/components/PrizeDetails";
import HowToEnter from "@/components/HowToEnter";
import CountdownTimer from "@/components/CountdownTimer";
import PreviousWinners from "@/components/PreviousWinners";
import RulesSection from "@/components/RulesSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data
const prizeImages = [
  "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
  "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=500",
];

const prizeFeatures = [
  "Premium build quality with sleek design",
  "State-of-the-art performance and speed",
  "Extended warranty included",
  "Free shipping to your doorstep",
  "Exclusive accessories package",
];

const winners = [
  {
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
    prize: "Premium Smartphone",
    testimonial: "I couldn't believe I won! The process was so easy and transparent. Thank you!",
  },
  {
    name: "Mark Johnson", 
    image: "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=774&auto=format&fit=crop",
    prize: "Designer Watch",
    testimonial: "This was the first contest I've ever won. The prize arrived quickly and was exactly as described.",
  },
  {
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
    prize: "Luxury Headphones",
    testimonial: "Amazing experience! I'm so happy with my new headphones. Will definitely enter more giveaways!",
  },
];

const rules = [
  {
    question: "Who is eligible to enter?",
    answer: "Anyone 18 years or older residing in the United States can enter this giveaway.",
  },
  {
    question: "How long does the giveaway run?",
    answer: "This giveaway runs for 14 days from the start date indicated by the countdown timer.",
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

// Set end date to 14 days from now
const endDate = new Date();
endDate.setDate(endDate.getDate() + 14);

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
        title="Win a Premium Laptop Package!" 
        description="Enter for a chance to win our exclusive high-performance laptop package valued at over $1,499. No purchase necessary."
        ctaText="Enter Now"
        heroImage={prizeImages[0]}
      />
      
      <PrizeDetails 
        images={prizeImages}
        title="Premium Laptop Package"
        description="This high-performance laptop comes with everything you need for work and play. Featuring the latest processor, ample storage, and stunning display, this prize package also includes premium accessories to enhance your experience."
        features={prizeFeatures}
      />
      
      <HowToEnter />
      
      <CountdownTimer endDate={endDate} />
      
      <PreviousWinners winners={winners} />
      
      <RulesSection rules={rules} />
      
      <Footer />
    </div>
  );
};

export default Index;
