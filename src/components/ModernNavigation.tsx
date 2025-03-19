
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigationContent } from '@/config/giveawayContent';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ModernNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-amber-700 font-bold text-xl">
            {navigationContent.title}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navigationContent.links.map((link, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                asChild
                className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
              >
                <a href={link.href}>{link.name}</a>
              </Button>
            ))}
            <Button asChild variant="outline" className="ml-2 border-amber-200 text-amber-700 hover:bg-amber-50">
              <Link to="/">Original Version</Link>
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden flex items-center">
            <Button asChild variant="outline" size="sm" className="mr-2 border-amber-200 text-amber-700 hover:bg-amber-50">
              <Link to="/">Original</Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-amber-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-amber-700">{navigationContent.title}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-1 mt-6">
                  {navigationContent.links.map((link, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="justify-start text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                      asChild
                    >
                      <a href={link.href}>{link.name}</a>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavigation;
