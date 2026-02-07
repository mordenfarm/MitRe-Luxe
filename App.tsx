
import React, { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import CinematicSequence from './sections/CinematicSequence';
import LuxuryAccessoryScroll from './sections/LuxuryAccessoryScroll';
import ArtisanGallery from './sections/ArtisanGallery';
import CollectionCarousel from './sections/CollectionCarousel';
import DetailView from './sections/DetailView';
import PressOrder from './sections/PressOrder';
import Footer from './sections/Footer';
import { HANDBAG_IMAGES, ACCESSORY_IMAGES } from './constants';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'press'>('home');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.lightbox) {
        // Lightbox should be open
      } else {
        setLightbox(null);
      }

      if (e.state?.page) {
        setCurrentPage(e.state.page);
      } else if (!e.state?.lightbox) {
        setCurrentPage('home');
      }
      
      // Refresh triggers after state changes
      setTimeout(() => ScrollTrigger.refresh(), 50);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      lenis.destroy();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = useCallback((page: 'home' | 'press') => {
    // Kill existing triggers to avoid "Uncaught" refresh errors
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    setCurrentPage(page);
    window.history.pushState({ page }, '');

    // Allow components to mount before refreshing triggers
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);
  }, []);

  const openLightbox = useCallback((index: number, images: string[]) => {
    setLightbox({ images, index });
    window.history.pushState({ lightbox: true }, '');
  }, []);

  const closeLightbox = useCallback(() => {
    if (window.history.state?.lightbox) {
      window.history.back();
    } else {
      setLightbox(null);
    }
  }, []);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-[#FF007F] selection:text-white">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="relative">
        {currentPage === 'home' ? (
          <>
            <Hero onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} />
            <CinematicSequence onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} />
            <LuxuryAccessoryScroll onImageClick={(url) => openLightbox(ACCESSORY_IMAGES.indexOf(url), ACCESSORY_IMAGES)} />
            <ArtisanGallery onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} />
            <CollectionCarousel onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} />
            <DetailView onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} />
          </>
        ) : (
          <PressOrder onImageClick={(index, images) => openLightbox(index, images)} />
        )}
        <Footer />
      </main>

      {lightbox && (
        <div 
          className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center animate-in fade-in duration-300 overflow-hidden"
          onClick={closeLightbox}
        >
          {/* Minimalist Back Button */}
          <button 
            className="absolute top-8 left-8 md:top-12 md:left-12 text-black font-black tracking-[0.4em] uppercase text-[10px] border border-black px-6 py-3 hover:bg-black hover:text-white transition-all z-50 flex items-center gap-3"
            onClick={closeLightbox}
          >
            <span>←</span> BACK
          </button>

          {/* Navigation Arrows (Ghost style) */}
          <button 
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 p-6 group"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <span className="text-4xl md:text-8xl font-thin opacity-10 group-hover:opacity-40 transition-opacity">←</span>
          </button>

          <button 
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 p-6 group"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <span className="text-4xl md:text-8xl font-thin opacity-10 group-hover:opacity-40 transition-opacity">→</span>
          </button>
          
          {/* Main Focused Image */}
          <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16 lg:p-24" onClick={(e) => e.stopPropagation()}>
            <img 
              key={lightbox.index}
              src={lightbox.images[lightbox.index]} 
              alt="Maximized Product View" 
              className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-700"
            />
          </div>
          
          <div className="absolute bottom-12 text-[10px] tracking-[1.5em] font-black opacity-5 uppercase select-none pointer-events-none">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
