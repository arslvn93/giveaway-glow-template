
import { useRef, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactContent } from '@/config/giveawayContent';

gsap.registerPlugin(ScrollTrigger);

interface BrokerageInfo {
  name: string;
  address: string;
}

interface ContactInfoProps {
  email: string;
  phone: string;
  brokerage: BrokerageInfo;
}

const ContactSection = ({ contactInfo }: { contactInfo: ContactInfoProps }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 70%",
        toggleActions: "play none none none"
      }
    });
    
    tl.from(".contact-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".contact-item", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(".legal-info", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.2");
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 bg-amber-50/70 relative overflow-hidden" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/40 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="contact-title text-3xl md:text-4xl font-bold mb-4">
            {contactContent.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-xl border border-amber-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="contact-item flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-amber-700 hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="contact-item flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-amber-700 hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Brokerage Information */}
            <div className="space-y-6">
              <div className="contact-item flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Brokerage</h3>
                  <p className="text-gray-700">{contactInfo.brokerage.name}</p>
                  <p className="text-gray-600 text-sm">{contactInfo.brokerage.address}</p>
                </div>
              </div>
              
              <div className="contact-item mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {contactContent.disclaimer}
                </p>
              </div>
            </div>
          </div>
          
          <div className="legal-info mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {contactContent.copyright}<br />
              The Sky Group Real Estate | <a href="#" className="text-amber-700 hover:underline">{contactContent.privacyPolicyText}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
