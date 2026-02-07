
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create letters array for staggering
      const letters = letterRefs.current.filter(Boolean);

      // Reveal animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nameRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(letters, 
        { 
          y: 80, 
          opacity: 0, 
          rotateX: -45,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
        }
      );

      // Add a subtle drift to the name on scroll
      gsap.to(nameRef.current, {
        y: -30,
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
        
        {/* Cinematic Mitchell Mhizha Signature Reveal */}
        <div className="relative mb-64 text-center select-none">
          <h2 
            ref={nameRef}
            className="serif text-[10vw] md:text-[8rem] uppercase text-black leading-none font-light tracking-[0.2em] flex flex-wrap justify-center gap-x-6 md:gap-x-12"
          >
            <div className="flex">
              {firstName.map((char, i) => (
                <span key={`f-${i}`} ref={el => letterRefs.current[i] = el} className="inline-block transform-gpu">
                  {char}
                </span>
              ))}
            </div>
            <div className="flex">
              {lastName.map((char, i) => (
                <span key={`l-${i}`} ref={el => letterRefs.current[firstName.length + i] = el} className="inline-block italic opacity-60 transform-gpu">
                  {char}
                </span>
              ))}
            </div>
          </h2>
          
          <div className="mt-12 flex flex-col items-center gap-6">
             <div className="h-[1px] w-32 bg-black/10"></div>
             <p className="text-[9px] tracking-[1.8em] font-black uppercase text-black/30">Creative Director</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black/5 mb-12"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[8px] tracking-[0.8em] text-black/20 font-black uppercase gap-10">
            <span>© MMXXIV MitRe Luxe London</span>
            <div className="flex gap-16">
                <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-black cursor-pointer transition-colors">Vogue</span>
            </div>
            <span className="text-[#FF007F]/40">Atelier Signature</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
