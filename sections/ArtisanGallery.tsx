
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
    <section 
      ref={containerRef}
      className="py-32 px-12 max-w-[1600px] mx-auto bg-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
        <div className="max-w-2xl">
          <span className="text-[11px] tracking-[0.6em] text-[#FF007F] uppercase font-black mb-6 block">Luxury for everyone</span>
          <h2 className="text-6xl md:text-8xl serif leading-[0.9] text-black uppercase">Grab yours. <br /> Big Sale.</h2>
        </div>
        <div className="text-right border-l border-black/10 pl-12 pb-2">
            <p className="text-sm serif italic text-black/40 mb-2">Summer Essentials</p>
            <p className="text-[10px] text-black uppercase tracking-[0.3em] font-black underline decoration-[#FF007F] decoration-2">Up to 80% Off</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {HANDBAG_IMAGES.map((img, i) => (
          <div 
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className={`group relative overflow-hidden bg-white shadow-xl rounded-sm cursor-pointer ${i % 3 === 1 ? 'lg:mt-24' : i % 3 === 2 ? 'lg:mt-48' : ''}`}
            onClick={() => onImageClick(img)}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={img} 
                alt={`Coach Bag ${i + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
            </div>
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black z-10">
              NEW PRICE: ${(15 + Math.random() * 5).toFixed(2)}
            </div>
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="bg-black text-white px-6 py-2 text-[10px] tracking-widest font-black uppercase shadow-2xl">View and buy</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtisanGallery;
