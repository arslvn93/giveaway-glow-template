
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Share2, Users, Check, Clock, Trophy, Gift } from 'lucide-react';

const HowToEnter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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
  
  const steps = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Fill Out the Form",
      description: "Enter your email address and name in the form and submit it."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Share with Friends",
      description: "Share this giveaway on social media for extra entries."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Confirm Entry",
      description: "Check your email to confirm your entry and you're all set!"
    }
  ];

  const benefits = [
    { 
      icon: <Clock className="h-5 w-5" />, 
      title: "Quick & Easy", 
      desc: "Takes less than a minute" 
    },
    { 
      icon: <Trophy className="h-5 w-5" />, 
      title: "Multiple Entries", 
      desc: "Share for more chances" 
    },
    { 
      icon: <Gift className="h-5 w-5" />, 
      title: "Premium Prize", 
      desc: "Valued at $175" 
    }
  ];

  return (
    <section className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-amber-800">
          How to Enter
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-amber-700 text-lg">
            Getting started is easy! Follow these simple steps to enter our giveaway.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left column with steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="border border-amber-200 shadow hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white flex items-center justify-center">
                      {step.icon}
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
              {benefits.map((item, i) => (
                <Card key={i} className="border border-amber-200 shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
                        {item.icon}
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
                    <span className="font-semibold text-amber-700">482 entries</span>
                  </div>
                </div>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={30} className="text-green-600" />
                    </div>
                    <h4 className="text-xl font-medium text-green-800 mb-2">Entry Submitted!</h4>
                    <p className="text-green-600">Check your email to confirm your entry.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-amber-700">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-amber-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
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
                      {isSubmitting ? "Processing..." : "Enter Giveaway"}
                    </Button>
                    
                    <div className="pt-4 border-t border-amber-100">
                      <h4 className="text-sm font-medium mb-2 text-amber-700">Share for Extra Entries:</h4>
                      <div className="flex space-x-3">
                        {['Facebook', 'Twitter', 'Instagram'].map((platform, i) => (
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
                        By entering, you agree to our Terms & Conditions and Privacy Policy.
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
