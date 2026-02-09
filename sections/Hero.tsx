
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

      tl.from(textGroupRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      tl.from(imagesRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.2,
        duration: 1.8,
        ease: 'expo.out'
      }, "-=1.2");

      gsap.to(filterRef.current, {
        attr: { baseFrequency: "0.03 0.08" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroImages = [HANDBAG_IMAGES[0], HANDBAG_IMAGES[1], HANDBAG_IMAGES[2]];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden pt-24 pb-12"
    >
      <svg className="fixed h-0 w-0 pointer-events-none" aria-hidden="true">
        <filter id="warble-filter">
          <feTurbulence ref={filterRef} type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="45" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center px-4">
        <div ref={textGroupRef} className="text-center mb-12 md:mb-16">
          <h1 className="text-6xl md:text-[10rem] serif leading-none tracking-tighter uppercase mb-4 flex items-center justify-center gap-2 md:gap-6">
            <span className="text-black">MitRe</span> 
            <span className="text-[#FF007F] italic">Luxe</span>
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-[2px] w-20 bg-[#FF007F] mb-6 opacity-60"></div>
            <p className="text-[10px] md:text-sm tracking-[1.4em] uppercase text-black font-black ml-[1.4em]">
              Woman with style
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 md:gap-6 w-full max-w-6xl">
          {heroImages.map((img, i) => (
            <div 
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              className="relative flex-1 aspect-square md:aspect-[4/5] overflow-hidden bg-neutral-100 border border-black/5 cursor-pointer group rounded-sm"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`Hero ${i}`} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                style={{ filter: 'url(#warble-filter)' }}
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
           <button 
             onClick={() => onNavigate('press')}
             className="group relative overflow-hidden px-16 py-5 border border-black rounded-full transition-all duration-500 hover:border-[#FF007F]"
           >
             <div className="absolute inset-0 bg-[#FF007F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
             <span className="relative z-10 text-[10px] font-black tracking-[0.6em] uppercase text-black group-hover:text-white transition-colors duration-500">
               Enter The Atelier
             </span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
