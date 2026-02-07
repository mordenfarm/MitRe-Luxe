
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
  const labelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flowers, setFlowers] = useState<number[]>([]);

  const itemTexts = [
    {
      title: "Christian Dior Sandals",
      desc: "Step into pure elegance with handcrafted Christian Dior sandals. A summer statement for the sophisticated wardrobe.",
      tag: "LUXURY VIBE",
      price: "19.87"
    },
    {
      title: "Timeless Beauty",
      desc: "Our signature collection redefined. High-grade materials meeting traditional artistry for a truly timeless appeal.",
      tag: "AFFORDABLE LUXE",
      price: "19.94"
    },
    {
      title: "NOGRAX Sunglasses",
      desc: "Sports-luxe meets high-fashion. One-piece oversized oval shades for the modern trendsetter.",
      tag: "TRENDING NOW",
      price: "19.92",
      showArrow: true
    }
  ];

  useEffect(() => {
    setFlowers(Array.from({ length: 40 }, (_, i) => i));

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

      tl.fromTo(textRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1
      });

      tl.fromTo(mainImageRef.current, {
        opacity: 0,
        scale: 0.4,
        y: 100
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.2)"
      }, "+=0.2");

      tl.to([mainImageRef.current, textRef.current, labelRef.current], {
        x: "-100%",
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, "+=0.5");

      tl.fromTo(sideScrollRef.current, {
        x: "100%",
      }, {
        x: window.innerWidth < 768 ? "-80%" : "-45%", 
        duration: 5,
        ease: "none"
      }, "-=1.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScreenshot = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = cardRefs.current[index];
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: '#ffffff',
      scale: 2 
    });

    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    const padding = 60;
    const headerHeight = 120;
    const footerHeight = 100;

    finalCanvas.width = canvas.width + (padding * 2);
    finalCanvas.height = canvas.height + headerHeight + footerHeight;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = LOGO_URL;
    
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      logoImg.onerror = resolve; 
    });

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      const logoWidth = 120;
      const logoHeight = (logoImg.naturalHeight / logoImg.naturalWidth) * logoWidth;
      ctx.drawImage(logoImg, (finalCanvas.width / 2) - (logoWidth / 2), 40, logoWidth, logoHeight);
    }

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Playfair Display, serif';
    ctx.textAlign = 'center';
    ctx.fillText('MITRE LUXE', finalCanvas.width / 2, 40);

    ctx.drawImage(canvas, padding, headerHeight);

    ctx.fillStyle = '#FF007F';
    ctx.font = '900 24px Inter, sans-serif';
    ctx.fillText('0713952798', finalCanvas.width / 2, finalCanvas.height - 40);

    ctx.save();
    ctx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#000000';
    ctx.font = '900 80px Inter, sans-serif';
    ctx.fillText('MITRE LUXE EXCLUSIVE', 0, 0);
    ctx.restore();

    const dataUrl = finalCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `mitre-luxe-${itemTexts[index].title.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center"
    >
      {flowers.map((f) => (
        <div 
          key={f}
          className="flower"
          style={{
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            animation: `flower-fall ${Math.random() * 6 + 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            background: '#FF007F'
          }}
        />
      ))}

      <div ref={textRef} className="absolute z-20 text-center max-w-4xl px-8 pointer-events-none">
        <h2 className="text-5xl md:text-[9rem] font-black uppercase tracking-tighter serif mb-6 leading-[0.85] text-black">
          Spice up <br /> <span className="italic text-[#FF007F] font-normal">your style</span>
        </h2>
        <div className="flex flex-col items-center">
            <p className="text-lg md:text-2xl font-medium text-black/40 mb-8 max-w-xl">
              Brand new luxurious COACH collection. Masterfully crafted for the modern aesthetic.
            </p>
            <div className="bg-black text-white px-10 py-3 rotate-1">
              <p className="text-xl md:text-3xl font-black tracking-widest uppercase italic">
                Value for less!
              </p>
            </div>
        </div>
      </div>

      <div 
        ref={mainImageRef} 
        className="absolute w-full max-w-2xl h-[60vh] md:h-[70vh] z-30 flex items-center justify-center p-8 cursor-pointer opacity-0"
        onClick={() => onImageClick(HANDBAG_IMAGES[0])}
      >
        <div className="relative group w-full h-full flex items-center justify-center">
          <img 
            src={HANDBAG_IMAGES[0]} 
            alt="Main Coach Bag" 
            className="w-full h-full object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)] transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-[#FF007F] text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black shadow-2xl rotate-[15deg] z-10 scale-100 md:scale-110">
            ONLY $15.99
          </div>
        </div>
      </div>

      <div 
        ref={sideScrollRef}
        className="absolute inset-y-0 right-0 z-40 flex items-center gap-16 md:gap-40 px-8 md:px-32 h-full pointer-events-none"
      >
        {itemTexts.map((item, i) => (
          <div 
            key={i} 
            ref={(el) => (cardRefs.current[i] = el)}
            className="w-[85vw] md:w-[50vw] flex flex-col pointer-events-auto cursor-pointer group bg-white p-5 md:p-10 border border-black/[0.03] shadow-2xl max-h-[90vh] overflow-hidden"
            onClick={() => onImageClick(HANDBAG_IMAGES[i+1])}
          >
            <div className="relative w-full h-[35vh] md:h-[50vh] overflow-hidden rounded-sm bg-[#f9f9f9] p-4 flex items-center justify-center">
              <img 
                src={HANDBAG_IMAGES[i+1]} 
                alt={item.title} 
                className="w-full h-full object-contain transition-transform duration-[2.5s] ease-out group-hover:scale-110" 
              />
              {item.showArrow && (
                <div 
                  className="absolute top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col items-center animate-bounce"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick(HANDBAG_IMAGES[5]);
                  }}
                >
                  <div className="bg-white text-black p-3 md:p-5 rounded-full shadow-2xl border border-black/5">
                     <span className="text-xl md:text-3xl">→</span>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full pt-6 md:pt-10 pb-2 bg-white">
                <div className="flex items-center justify-between mb-4 md:mb-8">
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-white bg-black px-3 py-1 md:px-4 md:py-2">{item.tag}</span>
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#FF007F]">Summer '25</span>
                </div>
                
                <h4 className="text-2xl md:text-6xl serif uppercase mb-3 md:mb-6 leading-none text-black tracking-tighter">{item.title}</h4>
                
                <p className="text-xs md:text-xl text-black/50 mb-6 md:mb-10 font-medium leading-relaxed max-w-lg line-clamp-3 md:line-clamp-none">
                  {item.desc}
                </p>
                
                <div className="flex justify-between items-end border-t border-black/5 pt-6 md:pt-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-black/10 line-through mb-1 italic">$145.00</span>
                    <span className="text-3xl md:text-5xl font-black text-black tracking-tighter">${item.price}</span>
                  </div>
                  <button 
                    onClick={(e) => handleScreenshot(i, e)}
                    className="bg-[#FF007F] text-white px-6 md:px-12 py-3 md:py-5 text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase hover:bg-black transition-colors shadow-2xl transform group-hover:-translate-y-1"
                  >
                    Screenshot
                  </button>
                </div>
            </div>
          </div>
        ))}
        <div className="w-[15vw] h-1 shrink-0"></div>
      </div>

      <div ref={labelRef} className="hidden md:block absolute bottom-12 left-12 z-50">
        <p className="text-[10px] tracking-[1em] font-black text-[#FF007F] uppercase mb-3">Summer Reveal</p>
        <h3 className="text-2xl serif uppercase border-b-2 border-black pb-3 tracking-widest">Exclusive Release</h3>
      </div>
    </section>
  );
};

export default CinematicSequence;
