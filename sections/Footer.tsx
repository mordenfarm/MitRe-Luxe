
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current || !nameRef.current) return;

    const ctx = gsap.context(() => {
      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

      // Cinematic Split-Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nameRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(letters, 
        { 
          y: 120, 
          opacity: 0, 
          rotateX: -70,
          filter: 'blur(15px)',
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.8,
          stagger: {
            each: 0.05,
            from: "center"
          },
          ease: 'expo.out',
        }
      );

      // Subtle parallax on scroll
      gsap.to(nameRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "MITCHEL".split("");
  const lastName = "MHIZHA".split("");

  return (
    <footer 
      ref={containerRef}
      className="relative pt-64 pb-20 px-12 bg-transparent flex flex-col items-center"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* The Signature Sequence */}
        <div className="relative mb-64 text-center select-none perspective-1000">
          <h2 
            ref={nameRef}
            className="serif text-[12vw] md:text-[9rem] uppercase text-black leading-none font-light tracking-[-0.02em] flex flex-wrap justify-center gap-x-8 md:gap-x-16"
          >
            <div className="flex">
              {firstName.map((char, i) => (
                <span key={`f-${i}`} ref={el => letterRefs.current[i] = el} className="inline-block transform-gpu will-change-transform">
                  {char}
                </span>
              ))}
            </div>
            <div className="flex">
              {lastName.map((char, i) => (
                <span key={`l-${i}`} ref={el => letterRefs.current[firstName.length + i] = el} className="inline-block italic opacity-50 transform-gpu will-change-transform">
                  {char}
                </span>
              ))}
            </div>
          </h2>
          
          <div className="mt-16 flex flex-col items-center gap-8">
             <div className="h-[1px] w-48 bg-black/10"></div>
             <p className="text-[10px] tracking-[2.2em] font-black uppercase text-black/30 translate-x-[1.1em]">Creative Director</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black/5 mb-16"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.8em] text-black/30 font-black uppercase gap-12">
            <span className="hover:text-black transition-colors cursor-pointer">© MMXXIV MitRe Luxe London</span>
            <div className="flex gap-20">
                <span className="hover:text-[#FF007F] cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-black cursor-pointer transition-colors">Vogue</span>
                <span className="hover:text-black cursor-pointer transition-colors">Showroom</span>
            </div>
            <span className="text-[#FF007F]/60 font-black animate-pulse">Luxury Boutique</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
