
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' },
          "-=0.4"
        );
    });
    return () => ctx.revert();
  }, []);

  const handleStart = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[2000] bg-white flex items-center justify-center p-6 md:p-12 opacity-0"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
        <h1 className="text-[25vw] font-black leading-none uppercase serif select-none -translate-x-10">
          LUXE
        </h1>
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 max-w-4xl w-full bg-white border border-black/5 shadow-[0_50px_100px_rgba(0,0,0,0.05)] p-8 md:p-20 overflow-y-auto max-h-[90vh]"
      >
        <header className="mb-12">
          <span className="text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase mb-4 block">Introduction</span>
          <h2 className="text-5xl md:text-7xl serif text-black leading-tight uppercase">Welcome.</h2>
        </header>

        <div className="space-y-8 text-black/70 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to the digital showroom of <span className="text-black font-bold">Mitchel Mhizha</span>, 
            a luxury goods reseller focused on authenticated, high-demand designer products. This platform serves as her main marketing and sales space, showcasing a carefully selected range of luxury handbags, footwear, eyewear, and fine jewelry from globally recognized brands such as Gucci, Chanel, and Coach.
          </p>

          <div className="bg-neutral-50 p-8 border-l-4 border-[#FF007F]">
            <h3 className="text-black font-black uppercase tracking-widest text-xs mb-4">The Opportunity</h3>
            <p className="mb-4">
              Mitchel Mhizha is opening a limited investment opportunity for one capital partner at <span className="text-black font-bold">$500</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-black tracking-wider uppercase text-black">
              <div className="flex flex-col gap-1 border border-black/5 p-4 bg-white">
                <span className="text-black/40">Mitchel's Contribution</span>
                <span>$500 (Secured)</span>
              </div>
              <div className="flex flex-col gap-1 border border-black/5 p-4 bg-white">
                <span className="text-black/40">Partner Investment</span>
                <span className="text-[#FF007F]">$500</span>
              </div>
            </div>
            <p className="mt-4 text-xs">Total starting capital: <span className="font-bold text-black">$1,000</span></p>
          </div>

          <div>
            <h3 className="text-black font-black uppercase tracking-widest text-xs mb-2">Strategic Vision</h3>
            <p>
              Sourcing channels are already secured, and the digital showroom is live. With increased capital, Mitchel can move from selling individual items to offering full, coordinated luxury collections. This strategy increases sales value per customer and improves overall profit margins.
            </p>
          </div>

          <div>
            <h3 className="text-black font-black uppercase tracking-widest text-xs mb-2">Next Steps</h3>
            <p>
              You are encouraged to review the current inventory on this platform to see the quality and authenticity of the products. For those interested in participating in a fast-turnover, luxury-backed resale venture, Mitchel is open to discussing projected returns and the profit-sharing structure.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <button 
            onClick={handleStart}
            className="group relative overflow-hidden w-full md:w-auto px-16 py-6 border border-black rounded-full transition-all duration-500 hover:border-[#FF007F]"
          >
            <div className="absolute inset-0 bg-[#FF007F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
            <span className="relative z-10 text-[10px] font-black tracking-[0.8em] uppercase text-black group-hover:text-white transition-colors duration-500">
              Start Exploring
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
