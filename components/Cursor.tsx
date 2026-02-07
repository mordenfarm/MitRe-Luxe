
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.dataset.hover) {
        setIsHovering(true);
        setCursorText(target.dataset.cursorText || '');
        gsap.to(cursorRef.current, { scale: 3, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: '#D4AF37', duration: 0.3 });
      } else {
        setIsHovering(false);
        setCursorText('');
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: '#1A1A1A', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#1A1A1A] pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
    >
      {isHovering && cursorText && (
        <span className="text-[4px] font-bold text-[#D4AF37] tracking-widest whitespace-nowrap uppercase">
          {cursorText}
        </span>
      )}
      <div className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"></div>
    </div>
  );
};

export default Cursor;
