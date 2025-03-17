
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Share2, Users, Check, Clock, Trophy, Gift } from 'lucide-react';
import { howToEnterContent } from '@/config/giveawayContent';

const HowToEnter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Map icon strings to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="h-6 w-6" />;
      case 'Share2': return <Share2 className="h-6 w-6" />;
      case 'Users': return <Users className="h-6 w-6" />;
      case 'Clock': return <Clock className="h-5 w-5" />;
      case 'Trophy': return <Trophy className="h-5 w-5" />;
      case 'Gift': return <Gift className="h-5 w-5" />;
      default: return <Mail className="h-6 w-6" />;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setName('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-amber-800">
          {howToEnterContent.title}
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-amber-700 text-lg">
            {howToEnterContent.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left column with steps */}
          <div className="space-y-6">
            {howToEnterContent.steps.map((step, index) => (
              <Card key={index} className="border border-amber-200 shadow hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white flex items-center justify-center">
                      {getIcon(step.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-amber-800">{step.title}</h3>
                      <p className="text-amber-700">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Benefits cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {howToEnterContent.benefits.map((item, i) => (
                <Card key={i} className="border border-amber-200 shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
                        {getIcon(item.icon)}
                      </div>
                      <h4 className="font-medium text-amber-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-amber-600">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Right column with form */}
          <div>
            <Card className="border border-amber-200 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-amber-800">Enter Now</h3>
                  <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center">
                    <Users size={16} className="text-amber-600 mr-2" />
                    <span className="font-semibold text-amber-700">{howToEnterContent.currentEntries} entries</span>
                  </div>
                </div>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={30} className="text-green-600" />
                    </div>
                    <h4 className="text-xl font-medium text-green-800 mb-2">{howToEnterContent.successMessage.title}</h4>
                    <p className="text-green-600">{howToEnterContent.successMessage.description}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-amber-700">
                        {howToEnterContent.formLabels.nameLabel}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={howToEnterContent.formLabels.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-amber-700">
                        {howToEnterContent.formLabels.emailLabel}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={howToEnterContent.formLabels.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? howToEnterContent.formLabels.processingText : howToEnterContent.formLabels.submitButton}
                    </Button>
                    
                    <div className="pt-4 border-t border-amber-100">
                      <h4 className="text-sm font-medium mb-2 text-amber-700">{howToEnterContent.formLabels.sharingText}</h4>
                      <div className="flex space-x-3">
                        {howToEnterContent.formLabels.sharingPlatforms.map((platform, i) => (
                          <Button 
                            key={i} 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-amber-300 hover:bg-amber-100 hover:text-amber-700 text-amber-600"
                          >
                            {platform}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4">
                      <p className="text-xs text-center text-amber-700">
                        {howToEnterContent.formLabels.termsText}
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToEnter;
