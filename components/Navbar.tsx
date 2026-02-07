
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
      let lastDirection = 0;
      ScrollTrigger.create({
        start: 'top top',
        end: 999999,
        onUpdate: (self) => {
          const scrollY = self.scroll();
          const direction = self.direction;

          if (scrollY > 150) {
            if (direction !== lastDirection) {
              if (direction === 1) {
                gsap.to(navRef.current, { yPercent: -100, duration: 0.5, ease: 'power2.inOut' });
              } else {
                gsap.to(navRef.current, { 
                  yPercent: 0, 
                  duration: 0.8, 
                  ease: 'power4.out', 
                  backgroundColor: 'rgba(255,255,255,0.95)', 
                  backdropFilter: 'blur(10px)',
                  borderBottom: '1px solid rgba(0,0,0,0.05)'
                });
              }
              lastDirection = direction;
            }
          } else {
            gsap.to(navRef.current, { 
              yPercent: 0, 
              duration: 0.6, 
              ease: 'power3.out', 
              backgroundColor: 'transparent', 
              backdropFilter: 'none',
              borderBottom: '1px solid transparent'
            });
            lastDirection = 0;
          }
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, [currentPage]);

  return (
    <header 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-12 py-8 flex justify-between items-center transition-all duration-700"
    >
      <div 
        onClick={() => onNavigate('home')}
        className="text-3xl font-black tracking-tighter serif cursor-pointer group flex items-center gap-2"
      >
        <span className="text-black group-hover:text-[#FF007F] transition-colors">MitRe</span>
        <span className="text-[#FF007F] group-hover:text-black transition-colors italic">Luxe</span>
      </div>

      <nav className="flex gap-16 items-center">
        <button 
          onClick={() => onNavigate('press')}
          className={`text-[9px] font-black tracking-[0.6em] uppercase transition-all ${currentPage === 'press' ? 'text-[#FF007F]' : 'hover:text-[#FF007F]'}`}
        >
          {currentPage === 'press' ? 'VIEW HOME' : 'PRESS ORDER'}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
