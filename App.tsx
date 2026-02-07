
import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
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

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      const progress = document.getElementById('scroll-progress');
      if (progress) {
        const scrollPercent = (e.scroll / (document.body.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = `${scrollPercent}%`;
      }
    });

    const handlePopState = (e: PopStateEvent) => {
      if (!e.state?.lightbox) setLightbox(null);
      if (e.state?.page) setCurrentPage(e.state.page);
      setTimeout(() => ScrollTrigger.refresh(), 50);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      lenis.destroy();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = useCallback((page: 'home' | 'press') => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    setCurrentPage(page);
    window.history.pushState({ page }, '');
    setTimeout(() => ScrollTrigger.refresh(true), 200);
  }, []);

  const openLightbox = useCallback((index: number, images: string[]) => {
    setLightbox({ images, index });
    window.history.pushState({ lightbox: true }, '');
  }, []);

  const closeLightbox = useCallback(() => {
    if (window.history.state?.lightbox) window.history.back();
    else setLightbox(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-[#FF007F] selection:text-white overflow-x-hidden">
      <Cursor />
      
      {/* Fixed Video Background - Visibility Adjusted */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 overflow-hidden bg-white">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'blur(8px) saturate(0.9)' }}
          onError={(e) => console.log('Video load error - falling back to clean gradient')}
        >
          <source src="https://drive.google.com/uc?export=download&id=1G47iwN0VwhNzdWJ0xWM4I5abmdeXjfs3" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
      </div>

      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <div className="relative z-10">
        <main className="relative">
          {currentPage === 'home' ? (
            <>
              {/* Added onNavigate={navigateTo} to Hero component */}
              <Hero 
                onImageClick={(url) => openLightbox(HANDBAG_IMAGES.indexOf(url), HANDBAG_IMAGES)} 
                onNavigate={navigateTo}
              />
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
      </div>

      {lightbox && (
        <div 
          className="fixed inset-0 z-[1000] bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-12 left-12 text-black font-black tracking-[0.5em] uppercase text-[10px] border-b-2 border-black py-2 hover:text-[#FF007F] hover:border-[#FF007F] transition-all z-50 flex items-center gap-4"
            onClick={closeLightbox}
          >
            <span>←</span> CLOSE PREVIEW
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-12 md:p-32" onClick={(e) => e.stopPropagation()}>
            <img 
              key={lightbox.index}
              src={lightbox.images[lightbox.index]} 
              className="w-full h-full object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-700"
              alt="Luxury Detail"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
