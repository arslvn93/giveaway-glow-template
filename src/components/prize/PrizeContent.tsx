
import { useRef } from 'react';
import { Award, Check, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface PrizeContentProps {
  title: string;
  description: string;
  features: string[];
}

const PrizeContent = ({ title, description, features }: PrizeContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={contentRef} className="space-y-8 relative">
      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200/30">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="h-8 w-8 text-amber-500" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h3>
          </div>
          
          <p className="text-gray-600 md:text-lg leading-relaxed">{description}</p>
          
          <div className="pt-4">
            <h4 className="text-xl font-semibold flex items-center text-gray-800 mb-6">
              <Star size={20} className="text-amber-500 mr-2" /> 
              What's Included:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features && features.length > 0 ? (
                features.map((feature, index) => (
                  <Card key={index} className="feature-item border-amber-100 bg-amber-50/60 hover:bg-amber-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white">
                        <Check size={16} />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Features will be announced soon!
                </p>
              )}
            </div>
          </div>
          
          <div className="pt-8">
            <a href="#howToEnter" className="inline-block w-full py-4 text-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              ENTER GIVEAWAY NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeContent;
