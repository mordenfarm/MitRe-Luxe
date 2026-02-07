
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface HeroProps {
  onImageClick: (url: string) => void;
  // Added onNavigate to the props interface to fix the scope error
  onNavigate: (page: 'home' | 'press') => void;
}

const Hero: React.FC<HeroProps> = ({ onImageClick, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bagPartsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Entrance
      tl.from(bagPartsRef.current, {
        y: (i) => (i % 2 === 0 ? 200 : -200),
        opacity: 0,
        scale: 0.8,
        duration: 2,
        stagger: 0.1,
        ease: 'expo.out',
      });

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        letterSpacing: '0.2em',
        duration: 2,
        ease: 'power4.out'
      }, "-=1.5");

      // Scroll Scrub
      gsap.to(wrapperRef.current, {
        scale: 1.15,
        opacity: 0,
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: true,
          pin: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      <div ref={wrapperRef} className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative z-10 text-center mb-24 pointer-events-none">
          <h1 
            ref={titleRef}
            className="text-8xl md:text-[12rem] serif leading-none tracking-tight text-black uppercase"
          >
            MitRe <br />
            <span className="italic text-[#FF007F] opacity-80">Luxe</span>
          </h1>
          <p className="text-[11px] tracking-[2.5em] uppercase text-black/40 mt-12 font-black translate-x-[1.2em]">
            Autumn Anthology
          </p>
        </div>

        <div className="relative w-full max-w-2xl h-[40vh] md:h-[50vh] flex items-center justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-8 w-full h-full p-4">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                ref={(el) => (bagPartsRef.current[i] = el)}
                className="relative overflow-hidden bg-white/10 backdrop-blur-3xl border border-black/5 cursor-pointer group rounded-sm shadow-2xl transition-all duration-700 hover:border-[#FF007F]/20"
                onClick={() => onImageClick(HANDBAG_IMAGES[0])}
              >
                <img 
                  src={HANDBAG_IMAGES[0]} 
                  alt="MitRe Luxe Hero" 
                  className="absolute w-[220%] h-[220%] max-w-none object-contain transition-transform duration-[3s] ease-out group-hover:scale-110"
                  style={{
                    top: i < 2 ? '0' : '-100%',
                    left: i % 2 === 0 ? '0' : '-100%'
                  }}
                />
              </div>
            ))}
          </div>
          
          <div 
            ref={(el) => (bagPartsRef.current[4] = el)}
            className="absolute z-20 w-44 h-44 rounded-full border border-black/10 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-black hover:text-white transition-all duration-700 group scale-90"
            // Now onNavigate is available in scope
            onClick={() => onNavigate('press')}
          >
            <span className="font-black text-[10px] tracking-[0.5em] leading-none mb-3 text-black/30 group-hover:text-white/50">MMXXIV</span>
            <span className="font-black text-2xl leading-none text-black group-hover:text-white serif italic">Inquiry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
