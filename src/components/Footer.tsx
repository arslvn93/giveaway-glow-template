
import { useEffect, useRef } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!footerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom 90%",
        toggleActions: "play none none none"
      }
    });
    
    tl.from(".footer-content", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
  ];
  
  const contactInfo = [
    { icon: <Mail size={18} />, text: "contact@giveaway.com" },
    { icon: <Phone size={18} />, text: "+1 (555) 123-4567" },
    { icon: <MapPin size={18} />, text: "123 Giveaway St, City, State" },
  ];
  
  const navLinks = [
    { text: "About Us", href: "#" },
    { text: "FAQ", href: "#" },
    { text: "Terms & Conditions", href: "#" },
    { text: "Privacy Policy", href: "#" },
  ];
  
  return (
    <footer ref={footerRef} className="bg-giveaway-dark-purple text-white py-16">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-6">Giveaway HQ</h3>
            <p className="text-white/70 mb-6">
              We host high-quality giveaways to reward our community. Join us for a chance to win amazing prizes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-3 text-giveaway-purple">{item.icon}</span>
                  <span className="text-white/70">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on our latest giveaways.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="bg-white/10 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-giveaway-purple"
              />
              <button 
                type="submit"
                className="bg-giveaway-purple hover:bg-giveaway-purple/80 px-4 py-2 rounded-r-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} Giveaway Template. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
