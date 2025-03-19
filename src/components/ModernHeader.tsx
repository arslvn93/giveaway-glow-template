
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  description: string;
  ctaText: string;
  heroImage: string;
  secondaryImage?: string;
}

const ModernHeader = ({ title, description, ctaText, heroImage, secondaryImage }: HeaderProps) => {
  const mainImage = heroImage;
  const secondImage = secondaryImage;
  
  return (
    <header className="min-h-screen relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 pt-16 md:pt-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-800 leading-tight">
                {title}
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700 max-w-lg">
                {description}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-4"
            >
              <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2 px-6 py-6 h-auto text-lg rounded-full shadow-md hover:shadow-lg">
                {ctaText}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={mainImage} 
                  alt="Gourmet Cheese Board" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-800/20 to-transparent"></div>
                
                {/* Price tag */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-100">
                  <p className="text-sm text-gray-600 font-medium">Value</p>
                  <p className="text-2xl font-bold text-amber-700">$175</p>
                </div>
              </div>
            </motion.div>
            
            {/* Secondary floating image */}
            {secondImage && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -left-10 -bottom-10 w-36 h-36 z-20 hidden md:block"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300">
                  <img 
                    src={secondImage} 
                    alt="Cheese assortment" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-transparent"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
