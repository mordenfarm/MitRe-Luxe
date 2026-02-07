
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for the reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: signatureRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Draw the signature line
      tl.fromTo(signatureRef.current, {
        strokeDasharray: 1500,
        strokeDashoffset: 1500
      }, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut'
      });

      // 2. Animate the name text
      tl.fromTo(nameRef.current, {
        y: 40,
        opacity: 0,
        letterSpacing: '1em'
      }, {
        y: 0,
        opacity: 0.15,
        letterSpacing: '0.4em',
        duration: 2,
        ease: 'power4.out'
      }, "-=2");

    }, containerRef);

    // Magnetic effect for the logo
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = magneticRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      if (Math.abs(distanceX) < 250 && Math.abs(distanceY) < 250) {
        gsap.to(magneticRef.current, {
          x: distanceX * 0.3,
          y: distanceY * 0.3,
          rotate: distanceX * 0.05,
          duration: 0.6,
          ease: 'power3.out'
        });
      } else {
        gsap.to(magneticRef.current, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <footer 
      ref={containerRef}
      className="relative min-h-screen bg-[#F9F9F7] pt-48 pb-16 px-12 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        
        <div ref={magneticRef} className="cursor-pointer mb-40 transition-transform">
          <img src={LOGO_URL} alt="MitRe Logo" className="h-32 md:h-56 w-auto mix-blend-multiply opacity-80" />
          <p className="text-center text-[11px] tracking-[1.4em] uppercase text-[#FF007F] mt-12 font-black">LONDON • PARIS • MILAN</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 w-full border-y border-black/5 py-32">
          <div className="space-y-8">
            <h5 className="text-[#FF007F] text-[10px] font-black uppercase tracking-[0.5em]">The Registry</h5>
            <ul className="text-[10px] space-y-5 tracking-widest uppercase text-black/50 font-bold">
              <li className="hover:text-black cursor-pointer transition-colors">Private Viewings</li>
              <li className="hover:text-[#FF007F] cursor-pointer transition-colors">The Bespoke Lab</li>
              <li className="hover:text-black cursor-pointer transition-colors">Store Locator</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h5 className="text-[#FF007F] text-[10px] font-black uppercase tracking-[0.5em]">The House</h5>
            <ul className="text-[10px] space-y-5 tracking-widest uppercase text-black/50 font-bold">
              <li className="hover:text-black cursor-pointer transition-colors">Our Manifesto</li>
              <li className="hover:text-black cursor-pointer transition-colors">Atelier Stories</li>
              <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h5 className="text-[#FF007F] text-[10px] font-black uppercase tracking-[0.5em]">Assistance</h5>
            <ul className="text-[10px] space-y-5 tracking-widest uppercase text-black/50 font-bold">
              <li className="hover:text-black cursor-pointer transition-colors">Shipping</li>
              <li className="hover:text-black cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-black cursor-pointer transition-colors">Legal</li>
            </ul>
          </div>
          <div className="space-y-8">
              <h5 className="text-[#FF007F] text-[10px] font-black uppercase tracking-[0.5em]">Anthology</h5>
              <p className="text-[10px] tracking-widest text-black/40 leading-relaxed font-medium">Register for invitations to our seasonal reveals and limited edition releases.</p>
              <div className="flex border-b border-black/10 pb-4 group">
                <input type="email" placeholder="JOIN THE HOUSE" className="bg-transparent text-[10px] tracking-widest w-full outline-none py-2 text-black font-black placeholder:text-black/20" />
                <button className="text-[10px] font-black text-[#FF007F] px-6">JOIN</button>
              </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-16">
        {/* Animated Signature Section */}
        <div className="relative h-48 w-full flex items-center justify-center">
          <svg viewBox="0 0 800 200" className="h-full w-auto max-w-2xl opacity-40">
            <path 
              ref={signatureRef}
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M100,100 C150,40 250,160 350,80 S550,20 650,120 S750,180 700,100"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
            <div ref={nameRef} className="flex flex-col items-center">
              <h3 className="serif text-5xl md:text-7xl uppercase tracking-[0.4em] font-light text-black">
                Mitchel <span className="italic">Mhizha</span>
              </h3>
              <div className="h-[1px] w-24 bg-black/20 mt-4"></div>
              <p className="text-[8px] tracking-[1.5em] font-black uppercase mt-4 opacity-40">Creative Director</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[8px] tracking-[0.6em] text-black/30 font-black uppercase gap-8">
            <span>© MMXXIV MitRe Luxe London</span>
            <div className="flex gap-12">
                <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-black cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-black cursor-pointer transition-colors">Vogue</span>
            </div>
            <span className="text-[#FF007F]">The Art of Perfection</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
