
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic initial entrance
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 1, ease: 'power2.inOut' })
        .fromTo(contentRef.current, 
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' },
          "-=0.4"
        )
        .fromTo(watermarkRef.current,
          { x: -50, opacity: 0 },
          { x: -40, opacity: 0.02, duration: 2, ease: 'power2.out' },
          "-=1"
        );
    });
    return () => ctx.revert();
  }, []);

  const transitionStep = (nextStep: number) => {
    const tl = gsap.timeline();

    // 1. Elegant exit: slide up and fade out
    tl.to(innerContentRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setStep(nextStep);
        // Reset position for entry
        gsap.set(innerContentRef.current, { y: 30 });
        // Scroll modal to top on step change for mobile
        if (contentRef.current) contentRef.current.scrollTop = 0;
      }
    });
    
    // 2. Watermark shift
    tl.to(watermarkRef.current, {
      opacity: 0,
      x: -60,
      duration: 0.3,
      ease: 'power2.in'
    }, "-=0.4");

    // 3. Elegant entry: slide from bottom to center
    tl.to(innerContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    });

    tl.to(watermarkRef.current, {
      opacity: 0.02,
      x: -40,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.6");
  };

  const handleNext = () => {
    if (step < 4) {
      transitionStep(step + 1);
    } else {
      handleFinalClose();
    }
  };

  const handleFinalClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, {
      y: -50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'expo.inOut'
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, "-=0.4");
  };

  const getWatermark = () => {
    switch(step) {
      case 1: return 'LUXE';
      case 2: return 'INVEST';
      case 3: return 'STRATEGY';
      case 4: return 'JOIN';
      default: return 'LUXE';
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 md:space-y-8">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase block animate-pulse">Introduction</span>
            <h2 className="text-4xl md:text-7xl serif text-black leading-tight uppercase tracking-tighter">
              Welcome <br/><span className="italic text-[#FF007F]">Atelier.</span>
            </h2>
            <p className="text-black/70 text-sm md:text-lg leading-relaxed font-light max-w-2xl">
              Welcome to the digital showroom of <span className="text-black font-bold">Mitchel Mhizha</span>, 
              a luxury goods reseller focused on authenticated, high-demand designer products. This platform serves as her main marketing and sales space, showcasing a carefully selected range of luxury handbags, footwear, eyewear, and fine jewelry from globally recognized brands such as Gucci, Chanel, Coach and so many to mention.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 md:space-y-8">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase block">Opportunity</span>
            <h2 className="text-4xl md:text-7xl serif text-black leading-tight uppercase tracking-tighter">
              The <span className="italic">Vision.</span>
            </h2>
            <div className="bg-neutral-50 p-6 md:p-12 border-l-4 border-[#FF007F] space-y-4 md:space-y-6 shadow-sm">
              <p className="text-sm md:text-lg text-black/70">
                Mitchel Mhizha is opening a limited investment opportunity for one capital partner at <span className="text-black font-bold text-lg md:text-xl">$500</span>. This is a 1:1 matched investment:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase text-black">
                <div className="bg-white p-4 md:p-6 border border-black/5 shadow-sm">
                  <span className="opacity-30 block mb-1 md:mb-2">Mitchel's Part</span>
                  <span className="text-lg md:text-xl">$500 (Secured)</span>
                </div>
                <div className="bg-white p-4 md:p-6 border border-black/5 shadow-sm">
                  <span className="opacity-30 block mb-1 md:mb-2">Partner Part</span>
                  <span className="text-lg md:text-xl text-[#FF007F]">$500</span>
                </div>
              </div>
              <div className="pt-3 md:pt-4 border-t border-black/5">
                <p className="text-xs md:text-sm font-black text-black uppercase tracking-widest">
                  Total Starting Capital: <span className="text-[#FF007F]">$1,000</span>
                </p>
                <p className="text-[9px] md:text-[10px] text-black/40 mt-1 uppercase font-bold">Directly allocated to resale inventory</p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 md:space-y-8">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase block">Growth</span>
            <h2 className="text-4xl md:text-7xl serif text-black leading-tight uppercase tracking-tighter">
              Why <span className="italic">Now.</span>
            </h2>
            <p className="text-black/70 text-sm md:text-lg leading-relaxed font-light max-w-2xl">
              Sourcing channels are already secured, and the digital showroom is live. With increased capital, Mitchel can move from selling individual items to offering full, coordinated luxury collections (for example: handbag, shoes, and accessories). This strategy increases sales value per customer and improves overall profit margins.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 md:space-y-8">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase block">Participation</span>
            <h2 className="text-4xl md:text-7xl serif text-black leading-tight uppercase tracking-tighter">
              Next <span className="italic">Steps.</span>
            </h2>
            <p className="text-black/70 text-sm md:text-lg leading-relaxed font-light max-w-2xl">
              You are encouraged to review the current inventory on this platform to see the quality and authenticity of the products. For those interested in participating in a fast-turnover, luxury-backed resale venture, Mitchel is open to discussing projected returns and the profit-sharing structure.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[2000] bg-white flex items-center justify-center p-4 md:p-8 opacity-0 overflow-hidden"
    >
      {/* Background Watermark - Responsive scaling */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none flex items-center justify-center">
        <h1 
          ref={watermarkRef}
          className="text-[40vw] md:text-[35vw] font-black leading-none uppercase serif text-black opacity-0 -translate-x-10"
        >
          {getWatermark()}
        </h1>
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 max-w-5xl w-full bg-white border border-black/5 shadow-[0_60px_120px_rgba(0,0,0,0.1)] p-6 md:p-24 overflow-y-auto max-h-[95vh] flex flex-col justify-between"
      >
        <div ref={innerContentRef} className="flex-grow py-4 md:py-0">
          {renderContent()}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 border-t border-black/10 pt-8 md:pt-16">
          <div className="flex gap-2 md:gap-4 order-2 md:order-1">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-[1px] transition-all duration-700 ${s === step ? 'w-10 md:w-16 bg-[#FF007F]' : 'w-4 md:w-8 bg-black/10'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="group relative overflow-hidden w-full md:w-auto px-10 md:px-20 py-4 md:py-6 border-2 border-black rounded-full transition-all duration-500 hover:border-[#FF007F] order-1 md:order-2"
          >
            <div className="absolute inset-0 bg-[#FF007F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-black group-hover:text-white transition-colors duration-500">
              {step === 4 ? 'Enter Showroom' : 'Explore Next'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
