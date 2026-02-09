
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { HANDBAG_IMAGES, LOGO_URL } from '../constants';

interface CinematicSequenceProps {
  onImageClick: (url: string) => void;
}

const CinematicSequence: React.FC<CinematicSequenceProps> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sideScrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flowers, setFlowers] = useState<number[]>([]);

  const itemTexts = [
    { title: "Dior Edition", tag: "LUXURY VIBE", price: "19.87", desc: "Step into pure elegance with handcrafted artisan pieces." },
    { title: "Timeless Bag", tag: "AFFORDABLE LUXE", price: "19.94", desc: "Our signature collection meeting traditional artistry." },
    { title: "NOGRAX Luxe", tag: "TRENDING NOW", price: "19.92", desc: "Sports-luxe meets high-fashion. Oversized oval shades." }
  ];

  useEffect(() => {
    setFlowers(Array.from({ length: 30 }, (_, i) => i));
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", 
          pin: true,
          scrub: 1,
        }
      });
      tl.fromTo(textRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });
      tl.fromTo(mainImageRef.current, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1.2, ease: "back.out" }, "+=0.2");
      tl.to([mainImageRef.current, textRef.current], { x: "-100%", opacity: 0, duration: 1.5, ease: "power2.inOut" }, "+=0.5");
      tl.fromTo(sideScrollRef.current, { x: "100%" }, { x: window.innerWidth < 768 ? "-80%" : "-40%", duration: 5, ease: "none" }, "-=1.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleScreenshot = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = cardRefs.current[index];
    if (!element) return;
    const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#ffffff', scale: 2 });
    const link = document.createElement('a');
    link.download = `mitre-luxe-${index}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center">
      {flowers.map((f) => (
        <div key={f} className="flower" style={{ left: `${Math.random() * 100}vw`, width: '8px', height: '8px', animation: `flower-fall ${Math.random() * 6 + 4}s linear infinite`, background: '#FF007F' }} />
      ))}

      <div ref={textRef} className="absolute z-20 text-center max-w-4xl px-8 pointer-events-none">
        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter serif mb-6 leading-[0.85] text-black">
          New <span className="italic text-[#FF007F] font-normal">Standard</span>
        </h2>
      </div>

      <div ref={mainImageRef} className="absolute w-full max-w-2xl h-[60vh] z-30 flex items-center justify-center p-8 opacity-0">
        <div className="relative aspect-square w-full overflow-hidden shadow-2xl">
          <img src={HANDBAG_IMAGES[4]} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-[#FF007F] text-white px-6 py-2 font-black text-xl rotate-12">$15.99</div>
        </div>
      </div>

      <div ref={sideScrollRef} className="absolute inset-y-0 right-0 z-40 flex items-center gap-12 md:gap-24 px-12 h-full pointer-events-none">
        {itemTexts.map((item, i) => (
          <div 
            key={i} 
            ref={(el) => (cardRefs.current[i] = el)}
            className="w-[85vw] md:w-[450px] flex flex-col pointer-events-auto cursor-pointer group bg-white border border-black/5 shadow-xl p-0 overflow-hidden"
            onClick={() => onImageClick(HANDBAG_IMAGES[i+1])}
          >
            <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
              <img src={HANDBAG_IMAGES[i+1]} alt={item.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            </div>
            <div className="p-8">
              <span className="text-[10px] font-black tracking-widest text-white bg-black px-4 py-2 mb-4 inline-block">{item.tag}</span>
              <h4 className="text-4xl serif uppercase mb-4 text-black">{item.title}</h4>
              <p className="text-sm text-black/50 mb-8 leading-relaxed line-clamp-2">{item.desc}</p>
              <div className="flex justify-between items-center border-t border-black/5 pt-8">
                <span className="text-4xl font-black text-black">${item.price}</span>
                <button onClick={(e) => handleScreenshot(i, e)} className="bg-[#FF007F] text-white px-8 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-black transition-colors">Screenshot</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CinematicSequence;
