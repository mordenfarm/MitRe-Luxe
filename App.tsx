
import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    // Smoother scroll experience
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

    lenis.on('scroll', ScrollTrigger.update);

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
      {/* Fixed Video Background - Less Blur, Higher Visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 overflow-hidden bg-white">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'blur(15px) saturate(0.8)' }}
        >
          <source src="https://drive.google.com/uc?export=download&id=1G47iwN0VwhNzdWJ0xWM4I5abmdeXjfs3" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
      </div>

      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <div className="relative z-10">
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
      </div>

      {lightbox && (
        <div 
          className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-12 left-12 text-black font-black tracking-[0.4em] uppercase text-[10px] border border-black px-8 py-4 hover:bg-black hover:text-white transition-all z-50 flex items-center gap-4"
            onClick={closeLightbox}
          >
            <span>←</span> BACK
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-8 md:p-24" onClick={(e) => e.stopPropagation()}>
            <img 
              key={lightbox.index}
              src={lightbox.images[lightbox.index]} 
              className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in-95 duration-500"
              alt="Maximized product"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
