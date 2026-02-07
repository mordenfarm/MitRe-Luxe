
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HANDBAG_IMAGES } from '../constants';

const Showcase360: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ 
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450', 
          scrub: true,
          pin: true,
          onUpdate: (self: any) => {
            const frame = Math.min(
              Math.floor(self.progress * (HANDBAG_IMAGES.length)),
              HANDBAG_IMAGES.length - 1
            );
            setCurrentFrame(frame);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden border-t border-black/5"
    >
      <div className="absolute top-16 text-center z-10 px-8">
        <h2 className="text-4xl serif text-black uppercase tracking-tight">Anatomy</h2>
      </div>

      <div className="product-display relative w-full max-w-xl aspect-square z-0 flex items-center justify-center">
        {HANDBAG_IMAGES.map((img, i) => (
          <img 
            key={i}
            src={img}
            alt={`Angle ${i}`}
            className={`absolute w-full h-full object-contain transition-opacity duration-200 ${i === currentFrame ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-12 flex gap-4">
        {HANDBAG_IMAGES.map((_, i) => (
          <div 
            key={i} 
            className={`w-8 h-[1px] transition-colors duration-200 ${i === currentFrame ? 'bg-black' : 'bg-[#FF007F]/20'}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Showcase360;
