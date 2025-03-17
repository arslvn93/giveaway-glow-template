
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FooterProps {
  brokerageName: string;
  brokerageAddress: string;
  email: string;
  phone: string;
}

const Footer = ({ brokerageName, brokerageAddress, email, phone }: FooterProps) => {
  const [emailInput, setEmailInput] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address"
      });
      return;
    }
    
    // Submit logic would go here
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for joining our newsletter."
    });
    setEmailInput("");
  };
  
  return (
    <footer className="bg-amber-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 border-b border-amber-700 pb-2">About Us</h3>
            <p className="text-amber-100/80">
              The Sky Group Real Estate specializes in helping Vaughan families find their perfect homes.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-amber-100/80">
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 border-b border-amber-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Listings", "Contact", "Privacy Policy"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-amber-100/80 hover:text-white transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 w-3 h-3" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 border-b border-amber-700 pb-2">Newsletter</h3>
            <p className="text-amber-100/80">
              Subscribe to our newsletter for the latest updates on giveaways and property listings.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="px-4 py-2 rounded-md bg-amber-700/50 border border-amber-600 text-white placeholder:text-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 transition-colors rounded-md text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 border-b border-amber-700 pb-2">Brokerage Info</h3>
            <p className="text-amber-100/80 font-medium">
              {brokerageName}
            </p>
            <p className="text-amber-100/80">
              {brokerageAddress}
            </p>
            <div className="pt-3 text-sm text-amber-100/60">
              <p>This site is not intended to solicit buyers or sellers who are currently under contract.</p>
              <p className="mt-2">Copyright © 2025 The Sky Group Real Estate. All rights reserved.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-amber-700/50 flex flex-col md:flex-row justify-between items-center text-amber-100/60 text-sm">
          <p>The Sky Group Real Estate | <a href="#" className="hover:text-white">Privacy Policy</a></p>
          <div className="mt-3 md:mt-0">
            <a href="#top" className="bg-amber-700/50 hover:bg-amber-600 px-4 py-2 rounded-full transition-colors">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
