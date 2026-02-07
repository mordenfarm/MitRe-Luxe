
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NavbarProps {
  onNavigate: (page: 'home' | 'press') => void;
  currentPage: 'home' | 'press';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial background transition
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        scrollTrigger: {
          start: 'top top',
          end: '+=50',
          scrub: true,
        },
      });

      // 2. Hide on scroll down, show on scroll up
      let lastDirection = 0;
      ScrollTrigger.create({
        start: 'top top',
        end: 999999,
        onUpdate: (self) => {
          const scrollY = self.scroll();
          const direction = self.direction;

          // Only hide after 120px to prevent jitter at top
          if (scrollY > 120) {
            if (direction !== lastDirection) {
              if (direction === 1) {
                // Scrolling Down -> Hide
                gsap.to(navRef.current, { 
                  yPercent: -100, 
                  duration: 0.4, 
                  ease: 'power2.inOut',
                  overwrite: 'auto'
                });
              } else {
                // Scrolling Up -> Show (Slower for elegance)
                gsap.to(navRef.current, { 
                  yPercent: 0, 
                  duration: 0.9, 
                  ease: 'power4.out',
                  overwrite: 'auto'
                });
              }
              lastDirection = direction;
            }
          } else {
            // Near the top: Always show
            gsap.to(navRef.current, { 
              yPercent: 0, 
              duration: 0.5, 
              ease: 'power3.out',
              overwrite: 'auto' 
            });
            lastDirection = 0;
          }
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, [currentPage]); // Re-register on page change

  return (
    <header 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 will-change-transform"
    >
      <div className="flex items-center gap-4">
        <div 
          onClick={() => onNavigate('home')}
          className="text-2xl md:text-3xl font-black tracking-tighter serif flex items-baseline cursor-pointer group"
        >
          <span className="text-black transition-colors group-hover:text-[#FF007F]">MitRe</span>
          <span className="text-[#FF007F] ml-1 transition-colors group-hover:text-black">Luxe</span>
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase hidden md:inline-block border-l border-black/10 pl-4 text-black/60">
          Luxury Artisans
        </span>
      </div>
      
      <nav className="hidden lg:flex gap-10 text-[9px] tracking-[0.4em] uppercase font-bold text-black/80">
        {currentPage === 'home' && (
          <>
            <a href="#collection" className="hover:text-[#FF007F] transition-colors">The Collection</a>
            <a href="#heritage" className="hover:text-[#FF007F] transition-colors">Heritage</a>
            <a href="#bespoke" className="hover:text-[#FF007F] transition-colors">Bespoke</a>
          </>
        )}
      </nav>

      <nav className="flex gap-6 md:gap-8 text-[9px] tracking-[0.3em] uppercase font-black text-black">
        <button 
          onClick={() => onNavigate('press')}
          className={`transition-colors uppercase font-black tracking-[0.3em] ${currentPage === 'press' ? 'text-[#FF007F]' : 'hover:text-[#FF007F]'}`}
        >
          PRESS ORDER
        </button>
        <a href="#contact" className="hover:text-[#FF007F] transition-colors">Contact Us</a>
        <a href="#about" className="hover:text-[#FF007F] transition-colors">About Us</a>
      </nav>
    </header>
  );
};

export default Navbar;
