
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface HeroProps {
  onImageClick: (url: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bagPartsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(bagPartsRef.current, {
        y: (i) => (i % 2 === 0 ? 150 : -150),
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power4.out',
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        letterSpacing: '0.1em',
        duration: 1.5,
        ease: 'power3.out'
      }, "-=1.2");

      gsap.to(wrapperRef.current, {
        scale: 1.2,
        opacity: 0.1,
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800',
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
        <div className="relative z-10 text-center mb-20">
          <h1 
            ref={titleRef}
            className="text-8xl md:text-[11rem] serif leading-none tracking-tighter text-black uppercase"
          >
            MitRe <br />
            <span className="italic text-[#FF007F] opacity-70">Luxe</span>
          </h1>
          <p className="text-[10px] tracking-[2em] uppercase text-black/30 mt-10 font-black">
            The Autumn Anthology
          </p>
        </div>

        <div className="relative w-full max-w-2xl h-[45vh] flex items-center justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-8 w-full h-full p-4">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                ref={(el) => (bagPartsRef.current[i] = el)}
                className="relative overflow-hidden bg-white/20 backdrop-blur-md border border-black/5 cursor-pointer group rounded-sm shadow-2xl"
                onClick={() => onImageClick(HANDBAG_IMAGES[0])}
              >
                <img 
                  src={HANDBAG_IMAGES[0]} 
                  alt="" 
                  className="absolute w-[200%] h-[200%] max-w-none object-contain transition-transform duration-1000 group-hover:scale-105"
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
            className="absolute z-20 w-40 h-40 rounded-full border border-black/10 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:bg-[#FF007F] hover:text-white transition-all group scale-90"
            onClick={() => onImageClick(HANDBAG_IMAGES[0])}
          >
            <span className="font-black text-[9px] tracking-[0.4em] leading-none mb-2 text-black/30 group-hover:text-white/60">AUTUMN</span>
            <span className="font-black text-2xl leading-none text-black group-hover:text-white serif italic">Reveal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
