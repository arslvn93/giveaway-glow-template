
import { useRef, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import gsap from 'gsap';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imagesRef.current) return;
    
    // Floating animations for decorative elements
    gsap.to(".prize-decoration", {
      y: "-20px",
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    });
    
    return () => {
      gsap.killTweensOf(".prize-decoration");
    };
  }, []);

  return (
    <div ref={imagesRef} className="relative">
      {/* Featured Image (outside of carousel for larger display) */}
      <div className="bg-white p-5 rounded-2xl shadow-xl mb-8 hidden md:block">
        <div className="overflow-hidden rounded-xl shadow-md border border-amber-200">
          <AspectRatio ratio={4/3} className="bg-muted">
            <img 
              src={images[0]} 
              alt="Featured Prize" 
              className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
            />
          </AspectRatio>
        </div>
      </div>
      
      {/* Main Carousel - Visible on all screens */}
      <div className="bg-white p-5 rounded-2xl shadow-xl relative z-10 max-w-md mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl shadow-md border border-amber-200">
                    <AspectRatio ratio={4/3} className="bg-muted">
                      <img 
                        src={image} 
                        alt={`Prize view ${index + 1}`}
                        className="object-cover w-full h-full transition-all duration-700 hover:scale-110"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg transform -rotate-12">
          <Gift size={24} />
        </div>
      </div>
      
      {/* Prize value badge */}
      <div className="absolute bottom-6 -right-6 md:right-0 animate-pulse-slow z-20">
        <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg transform rotate-12">
          <span className="text-xs md:text-sm uppercase tracking-wider text-amber-100">Value</span>
          <p className="font-bold text-2xl md:text-3xl">$175</p>
          <span className="text-xs text-amber-100 px-2 text-center">Limited Time</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-amber-200/50 prize-decoration"></div>
      <div className="absolute top-1/3 -right-12 w-24 h-24 rounded-full bg-amber-100/50 prize-decoration"></div>
    </div>
  );
};

export default ImageGallery;
