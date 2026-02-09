
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface ArtisanGalleryProps {
  onImageClick: (url: string) => void;
}

const ArtisanGallery: React.FC<ArtisanGalleryProps> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-12 max-w-[1600px] mx-auto bg-white">
      <div className="mb-24">
        <span className="text-[11px] tracking-[0.6em] text-[#FF007F] uppercase font-black mb-6 block">Curated Pieces</span>
        <h2 className="text-6xl md:text-8xl serif leading-[0.9] text-black uppercase">Artisan <br /> Gallery.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {HANDBAG_IMAGES.slice(0, 9).map((img, i) => (
          <div 
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative overflow-hidden bg-neutral-100 shadow-sm cursor-pointer"
            onClick={() => onImageClick(img)}
          >
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
            </div>
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black z-10">
              $19.99
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
               <span className="text-[9px] font-black tracking-widest uppercase text-black bg-white px-6 py-2 shadow-xl">Details</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtisanGallery;
