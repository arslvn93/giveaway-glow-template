
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface PrizeDetailsProps {
  images: string[];
  title: string;
  description: string;
  features: string[];
}

const ModernPrizeDetails = ({ images, title, description, features }: PrizeDetailsProps) => {
  return (
    <section className="py-20 bg-white relative" id="prize">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-50/50 to-white -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">{title}</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">{description}</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden border-amber-100 shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={images[0]} 
                    alt={title} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((image, index) => (
                <Card key={index} className="overflow-hidden border-amber-100 shadow-md">
                  <CardContent className="p-0">
                    <img 
                      src={image} 
                      alt={`${title} - detail ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-amber-100 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">What's Included</h3>
                
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-0.5">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-100 shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-amber-700">Perfect Gift</h3>
                  <p className="text-gray-600">Ideal for any occasion</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-amber-200 shadow-sm">
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="text-2xl font-bold text-amber-700">$175</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernPrizeDetails;
