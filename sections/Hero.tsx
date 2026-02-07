
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(bagPartsRef.current, {
        y: (i) => (i % 2 === 0 ? 200 : -200),
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=1");

      gsap.to(wrapperRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400',
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
      className="relative h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      <div ref={wrapperRef} className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative z-10 text-center mb-8">
          <h1 
            ref={titleRef}
            className="text-7xl md:text-[8rem] serif leading-none tracking-tighter text-black uppercase"
          >
            Coach <br />
            <span className="italic text-[#FF007F]">Summer</span>
          </h1>
          <p className="text-[12px] tracking-[0.8em] uppercase text-black/60 mt-6 font-black">
            Luxurious Bags Now Under $20
          </p>
        </div>

        <div className="relative w-full max-w-2xl h-[40vh] flex items-center justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full p-2">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                ref={(el) => (bagPartsRef.current[i] = el)}
                className="relative overflow-hidden bg-white border border-black/5 cursor-pointer group rounded-sm"
                onClick={() => onImageClick(HANDBAG_IMAGES[0])}
              >
                <img 
                  src={HANDBAG_IMAGES[0]} 
                  alt="Product" 
                  className="absolute w-[200%] h-[200%] max-w-none object-cover transition-transform duration-700 group-hover:scale-110"
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
            className="absolute z-20 w-32 h-32 rounded-full border border-black bg-white flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:bg-[#FF007F] hover:text-white transition-all group scale-90"
            onClick={() => onImageClick(HANDBAG_IMAGES[0])}
          >
            <span className="font-black text-[10px] tracking-widest leading-none mb-1">ONLY</span>
            <span className="font-black text-xl leading-none">$15.99</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
