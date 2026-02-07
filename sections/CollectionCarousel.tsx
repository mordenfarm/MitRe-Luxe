
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface CollectionCarouselProps {
  onImageClick: (url: string) => void;
}

const CollectionCarousel: React.FC<CollectionCarouselProps> = ({ onImageClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, {
        translateX: 0
      }, {
        translateX: "-120vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=500", // Snappier
          scrub: true,
          pin: true,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-white">
      <div className="h-screen flex items-center pl-[10vw]">
        <div 
          ref={sectionRef} 
          className="flex gap-[6vw] items-center whitespace-nowrap h-full"
        >
          <div className="w-[50vw] shrink-0">
            <h2 className="text-[8vw] serif uppercase leading-none mb-6">Hot Sale</h2>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#FF007F] font-black">Prices from $15.00</p>
          </div>

          {[...HANDBAG_IMAGES].map((img, i) => (
            <div 
              key={i}
              className="w-[350px] md:w-[500px] h-[60vh] shrink-0 relative overflow-hidden bg-white border border-black/5 cursor-pointer group"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt="COACH Summer Sale" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 bg-[#FF007F] text-white px-4 py-2 text-xs font-black shadow-lg">
                ONLY ${(16 + Math.random() * 4).toFixed(2)}
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-[9px] tracking-widest uppercase font-black text-white bg-black px-3 py-1 mb-2 inline-block">LIMITED STOCK</p>
                <h3 className="text-2xl serif text-black uppercase bg-white/95 px-3 py-1 shadow-md">Get it now</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionCarousel;
