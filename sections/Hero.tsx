
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface HeroProps {
  onImageClick: (url: string) => void;
  onNavigate: (page: 'home' | 'press') => void;
}

const Hero: React.FC<HeroProps> = ({ onImageClick, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFETurbulenceElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance animation for text
      tl.from(textGroupRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      // Entrance animation for the trio of images
      tl.from(imagesRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.2,
        duration: 1.8,
        ease: 'expo.out'
      }, "-=1.2");

      // Warbly Water Scroll Effect
      // Animating the turbulence creates that "liquid" ripple feel across all images
      gsap.to(filterRef.current, {
        attr: { baseFrequency: "0.03 0.08" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Subtle parallax for the image container
      gsap.to(imagesRef.current, {
        y: (i) => (i + 1) * 20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroImages = [HANDBAG_IMAGES[0], HANDBAG_IMAGES[1], HANDBAG_IMAGES[2]];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden pt-24 pb-12"
    >
      {/* SVG Filter for the "Warbly Water" effect */}
      <svg className="fixed h-0 w-0 pointer-events-none" aria-hidden="true">
        <filter id="warble-filter">
          <feTurbulence 
            ref={filterRef}
            type="fractalNoise" 
            baseFrequency="0.001 0.001" 
            numOctaves="2" 
            result="noise" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="45" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center px-4">
        
        {/* Branding: MitRe (Black) Luxe (Pink) */}
        <div ref={textGroupRef} className="text-center mb-12 md:mb-20">
          <h1 className="text-6xl md:text-[10rem] serif leading-none tracking-tighter uppercase mb-4 flex items-center justify-center gap-2 md:gap-6">
            <span className="text-black">MitRe</span> 
            <span className="text-[#FF007F] italic">Luxe</span>
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-[1px] md:h-[2px] w-12 md:w-20 bg-[#FF007F] mb-4 md:mb-6 opacity-60"></div>
            <p className="text-[9px] md:text-sm tracking-[0.8em] md:tracking-[1.4em] uppercase text-black font-black ml-[0.8em] md:ml-[1.4em]">
              Woman with style
            </p>
          </div>
        </div>

        {/* 3 Images in 1 Row - Warbly and Responsive */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-10 w-full max-w-6xl">
          {heroImages.map((img, i) => (
            <div 
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              className="relative flex-1 aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-[#fafafa] border border-black/[0.03] shadow-sm cursor-pointer group rounded-sm"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`MitRe Luxe Collection ${i + 1}`} 
                className="w-full h-full object-contain p-2 md:p-12 transition-transform duration-[2s] group-hover:scale-110"
                style={{ filter: 'url(#warble-filter)' }}
              />
              
              {/* Subtle Overlay on hover */}
              <div className="absolute inset-0 bg-[#FF007F]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              {/* Image Label for Desktop */}
              <div className="absolute bottom-4 left-4 hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <span className="text-[8px] font-black tracking-widest text-black bg-white px-3 py-1 uppercase shadow-sm">
                    Select Piece 0{i+1}
                 </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-24 flex flex-col items-center gap-6">
           <button 
             onClick={() => onNavigate('press')}
             className="group relative overflow-hidden px-12 py-4 border border-black rounded-full transition-all duration-500 hover:border-[#FF007F]"
           >
             <div className="absolute inset-0 bg-[#FF007F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
             <span className="relative z-10 text-[9px] md:text-[11px] font-black tracking-[0.6em] uppercase text-black group-hover:text-white transition-colors duration-500">
               Enter The Atelier
             </span>
           </button>
           
           <div className="hidden md:flex flex-col items-center gap-4">
              <span className="text-[7px] font-black tracking-[0.4em] text-black/20 uppercase">Autumn Reveal MMXXIV</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent"></div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
