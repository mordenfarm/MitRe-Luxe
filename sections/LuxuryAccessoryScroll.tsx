
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
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#fcfcfc] overflow-hidden flex items-center"
    >
      {/* Background Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full text-center opacity-[0.02]">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none">EYEWEAR</h2>
      </div>

      <div 
        ref={horizontalRef}
        className="flex items-center h-full pl-[8vw] pr-[15vw] gap-20 md:gap-32 will-change-transform"
      >
        {/* Responsive Title Section */}
        <div className="flex-shrink-0 w-[85vw] md:w-[40vw] flex flex-col justify-center">
          <span className="text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.8em] font-black text-[#FF007F] uppercase block mb-3">Summer Boutique</span>
          <h2 className="text-5xl md:text-8xl serif text-black uppercase tracking-tighter leading-[0.85]">
            Designer <br />
            <span className="italic">Sunglasses</span>
          </h2>
          <p className="mt-6 md:mt-8 text-black/40 text-xs md:text-base font-medium max-w-xs md:max-w-sm leading-relaxed">
            The ultimate accessory for the sun-drenched season. Parisian elegance meets modern bold silhouettes.
          </p>
        </div>

        {ACCESSORY_IMAGES.map((img, i) => (
          <div 
            key={i}
            className="relative flex-shrink-0 group cursor-pointer"
            onClick={() => onImageClick(img)}
          >
            {/* Image Frame */}
            <div className={`
              relative overflow-hidden bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${i % 2 === 0 ? 'w-[75vw] md:w-[45vw] h-[55vh] md:h-[65vh]' : 'w-[65vw] md:w-[35vw] h-[45vh] md:h-[55vh] mt-12 md:mt-24'}
              p-4 md:p-6 flex items-center justify-center
            `}>
              <img 
                src={img} 
                alt={`Designer Eyewear ${i}`} 
                className="w-full h-full object-contain transition-transform duration-[2.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Corner Info */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                 <div className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-[8px] font-black tracking-widest uppercase shadow-xl">
                    Exclusive Selection
                 </div>
              </div>

              {/* View Overlay */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                 <p className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase bg-[#FF007F] px-4 py-2 md:px-6 md:py-3 shadow-2xl">Discover Design</p>
              </div>
            </div>
            
            {/* Floating Details */}
            <div className="mt-6 md:mt-10 flex justify-between items-end border-b border-black/5 pb-4 md:pb-6">
              <div>
                <h4 className="text-xl md:text-3xl serif uppercase tracking-tight text-black mb-1">Saint Laurent Paris</h4>
                <p className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] text-black/30 uppercase">Cat-Eye Acetate Frame</p>
              </div>
              <div className="text-right">
                <span className="block text-[8px] md:text-[10px] font-black tracking-widest text-black/20 line-through">$495.00</span>
                <span className="text-xl md:text-2xl font-black text-[#FF007F]">$19.99</span>
              </div>
            </div>
            
            {/* Background Index Number */}
            <span className="absolute -top-10 -left-10 md:-top-16 md:-left-16 text-[8rem] md:text-[15rem] font-black text-black/[0.02] select-none pointer-events-none serif italic">
              0{i + 1}
            </span>
          </div>
        ))}
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 z-20">
         <div className="flex flex-col items-center gap-4 md:gap-6">
            <p className="text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase text-black/30 [writing-mode:vertical-lr] rotate-180">
               Swipe
            </p>
            <div className="w-[1px] h-12 md:h-20 bg-black/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FF007F] animate-bounce"></div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default LuxuryAccessoryScroll;
