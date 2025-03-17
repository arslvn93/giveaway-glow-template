
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <div ref={benefitsRef} className="mt-20 md:mt-24">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Why You Don't Want To Miss This:
        </h3>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
          This isn't just another giveaway - here's why this prize is special
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="benefit-card border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 inline-block mx-auto max-w-2xl shadow-md">
          <p className="text-gray-700 font-medium mb-4">Don't miss your chance to win a gourmet experience!</p>
          <a href="#howToEnter" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            CLICK HERE TO REGISTER
          </a>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
