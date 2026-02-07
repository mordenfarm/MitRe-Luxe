
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

interface DetailViewProps {
  onImageClick: (url: string) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(flareRef.current, {
              x: x - 200,
              y: y - 200,
              duration: 0.8,
              ease: 'power3.out'
          });
      };

      containerRef.current?.addEventListener('mousemove', handleMouseMove);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-12 md:p-32 overflow-hidden border-y border-black/5"
    >
      <div 
        ref={flareRef}
        className="absolute w-[400px] h-[400px] pointer-events-none z-30 opacity-10"
        style={{
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
        }}
      ></div>

      <div className="flex-1 space-y-24 max-w-2xl z-20 mb-20 md:mb-0">
        <div>
            <span className="text-[10px] tracking-[0.5em] text-black uppercase font-black">Quality You Can Trust</span>
            <h2 className="text-7xl md:text-8xl serif mt-6 leading-[0.9] text-black uppercase">Pure <br /> <span className="italic">Luxury.</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border-l-2 border-black pl-8 py-2">
                <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4 font-black text-black">Perfect Colors</h4>
                <p className="text-xs text-black/60 leading-relaxed font-medium">What you see is what you get. Our colors are rich and true to life.</p>
            </div>
            <div className="border-l-2 border-black pl-8 py-2">
                <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4 font-black text-black">Expert Hand-Made</h4>
                <p className="text-xs text-black/60 leading-relaxed font-medium">Every bag is crafted by experts who care about the smallest details.</p>
            </div>
        </div>

        <button className="bg-black text-white px-12 py-5 text-xs font-black tracking-[0.4em] uppercase hover:scale-105 transition-transform shadow-xl">Shop the Look</button>
      </div>

      <div className="flex-1 relative w-full h-full flex items-center justify-center">
        <div 
          className="relative w-full max-w-lg aspect-[4/5] overflow-hidden rounded-sm group shadow-2xl bg-white border border-black/5 cursor-pointer"
          onClick={() => onImageClick(HANDBAG_IMAGES[3])}
        >
            <img 
                src={HANDBAG_IMAGES[3]} 
                alt="Beautiful Handbag Detail" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute top-8 right-8 z-10">
                <div className="bg-white px-4 py-2 border border-black shadow-lg">
                    <p className="text-[8px] tracking-widest font-black uppercase text-black">CLICK TO MAXIMIZE</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DetailView;
