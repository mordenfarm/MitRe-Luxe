
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ACCESSORY_IMAGES } from '../constants';

interface LuxuryAccessoryScrollProps {
  onImageClick: (url: string) => void;
}

const LuxuryAccessoryScroll: React.FC<LuxuryAccessoryScrollProps> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalWidth = horizontalRef.current?.offsetWidth || 0;
      const windowWidth = window.innerWidth;
      gsap.to(horizontalRef.current, {
        x: -(horizontalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalWidth - windowWidth}`,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#fcfcfc] overflow-hidden flex items-center">
      <div ref={horizontalRef} className="flex items-center h-full pl-[10vw] pr-[20vw] gap-12 md:gap-24">
        <div className="flex-shrink-0 w-[80vw] md:w-[400px]">
          <span className="text-[10px] tracking-[0.8em] font-black text-[#FF007F] uppercase block mb-4">Summer 25</span>
          <h2 className="text-6xl md:text-8xl serif text-black uppercase leading-tight">
            Design <br /> <span className="italic">Vision</span>
          </h2>
        </div>

        {ACCESSORY_IMAGES.map((img, i) => (
          <div key={i} className="flex-shrink-0 group cursor-pointer" onClick={() => onImageClick(img)}>
            <div className="relative w-[70vw] md:w-[500px] aspect-[4/5] overflow-hidden bg-white shadow-2xl border border-black/5">
              <img src={img} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-8 left-8">
                 <p className="text-[10px] font-black tracking-widest text-white bg-[#FF007F] px-6 py-3 uppercase shadow-2xl">View Choice</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-end border-b border-black/5 pb-6">
              <h4 className="text-3xl serif uppercase text-black">MitRe Edition</h4>
              <span className="text-2xl font-black text-[#FF007F]">$19.99</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LuxuryAccessoryScroll;
