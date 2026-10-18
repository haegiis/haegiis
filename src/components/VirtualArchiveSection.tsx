import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Maximize2, Minimize2, X } from 'lucide-react';
import { ARCHIVE_ARTWORKS, ArchiveArtwork } from '../data/virtualArchiveData';

export const VirtualArchiveSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [isGalleryInView, setIsGalleryInView] = useState(false);
  const [controlsVisibleOnIdle, setControlsVisibleOnIdle] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = ARCHIVE_ARTWORKS.length;
  const current: ArchiveArtwork = ARCHIVE_ARTWORKS[currentIndex];

  // Pre-load all exhibition images immediately on mount so transitions are instant
  useEffect(() => {
    ARCHIVE_ARTWORKS.forEach((art) => {
      if (art.mediaType !== 'video' && !art.src.toLowerCase().includes('.mp4')) {
        const img = new Image();
        img.src = art.src;
      }
    });
  }, []);

  // Instant directional navigation without duplicate frame flash
  const goToNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Track if gallery section is in view to safely enable keyboard navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGalleryInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Idle timer for full-screen distraction-free mode
  const resetIdleTimer = useCallback(() => {
    setControlsVisibleOnIdle(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isFullscreen && !hideControls) {
      idleTimerRef.current = setTimeout(() => {
        setControlsVisibleOnIdle(false);
      }, 3000);
    }
  }, [isFullscreen, hideControls]);

  useEffect(() => {
    if (isFullscreen) {
      resetIdleTimer();
      window.addEventListener('mousemove', resetIdleTimer);
      window.addEventListener('touchstart', resetIdleTimer);
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, [isFullscreen, resetIdleTimer]);

  // Keyboard navigation when gallery is in view or full-screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryInView && !isFullscreen) return;

      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key.toLowerCase() === 'f') {
        setIsFullscreen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'h' && isFullscreen) {
        setHideControls((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryInView, isFullscreen, goToNext, goToPrev]);

  // Touch Swipe Handlers (Effortless mobile navigation)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only trigger if horizontal swipe is significantly greater than vertical movement
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Horizontal Wheel / Trackpad Gesture Handler
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 35) {
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      if (e.deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 400);
    }
  };

  const areControlsShown = isFullscreen ? !hideControls && controlsVisibleOnIdle : true;

  return (
    <section 
      id="virtual-archive" 
      ref={sectionRef}
      className="relative w-full bg-[#141412] text-[#FAFAF8] py-28 lg:py-36 overflow-hidden border-b border-[#242420] select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Virtual Art Gallery Photography Exhibition"
    >
      {/* Gallery Ceiling & Directional Lighting Rig Ambient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 28%, rgba(255, 248, 235, 0.08) 0%, rgba(20, 20, 18, 0.4) 45%, rgba(12, 12, 11, 0.95) 100%)'
        }}
      />

      {/* Subtle Wall Plaster Texture & Fine Grid Guide */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        
        {/* Section Introduction (Minimal & Understated) */}
        <div className="text-center mb-10 sm:mb-14 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-editorial-mono">
              Exhibition · Gallery Wall
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight font-normal text-white lowercase">
            virtual archive
          </h2>
          <p className="text-xs sm:text-sm font-editorial-serif italic text-white/60 font-light mt-2 tracking-wide">
            “a collection of things i wanted to remember.”
          </p>
        </div>

        {/* Gallery Wall Center Stage with Directional Lighting Spotlight */}
        <div className="relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[580px] lg:min-h-[660px]">
          
          {/* Overhead Spotlight Cone Ray */}
          <div 
            className="absolute -top-16 inset-x-0 mx-auto w-72 sm:w-96 lg:w-[480px] h-96 pointer-events-none opacity-40 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(255, 250, 240, 0.3) 0%, rgba(255, 245, 225, 0.05) 60%, transparent 100%)'
            }}
          />

          {/* Full-Screen Distraction-Free Toggle Button on Gallery Wall */}
          <div className="absolute top-0 right-2 sm:right-6 z-20">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3.5 py-1.5 bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 text-white/70 hover:text-white rounded-full text-xs font-editorial-mono uppercase tracking-widest flex items-center gap-1.5 transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-md"
              title="Enter full-screen distraction-free gallery view (Press F)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Screen</span>
            </button>
          </div>

          {/* Discreet Previous Gallery Navigation Button */}
          <button
            onClick={goToPrev}
            aria-label="Previous framed photograph"
            className="absolute left-0 sm:left-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-xl group hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Discreet Next Gallery Navigation Button */}
          <button
            onClick={goToNext}
            aria-label="Next framed photograph"
            className="absolute right-0 sm:right-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-xl group hover:scale-105"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Framed Artwork Display Container with unique key to prevent duplicate image rendering */}
          <div 
            key={current.id}
            className={`relative flex flex-col items-center animate-in fade-in ${
              direction === 'next' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'
            } duration-300 ease-out`}
          >
            
            {/* Museum Quality Physical Picture Frame */}
            <div 
              className={`relative bg-[#1A1A18] p-3 sm:p-5 md:p-6 transition-all duration-500 ${
                current.frameStyle === 'natural-walnut'
                  ? 'border-[14px] sm:border-[20px] md:border-[26px] border-[#2C2117] shadow-[0_45px_90px_rgba(0,0,0,0.85),0_15px_30px_rgba(0,0,0,0.5)]'
                  : current.frameStyle === 'brushed-silver'
                    ? 'border-[14px] sm:border-[20px] md:border-[26px] border-[#383A3D] shadow-[0_45px_90px_rgba(0,0,0,0.85),0_15px_30px_rgba(0,0,0,0.5)]'
                    : 'border-[14px] sm:border-[20px] md:border-[26px] border-[#181816] shadow-[0_45px_90px_rgba(0,0,0,0.9),0_15px_30px_rgba(0,0,0,0.6)]'
              }`}
              style={{
                boxShadow: '0 40px 90px -10px rgba(0,0,0,0.95), 0 20px 30px -5px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 2px rgba(0,0,0,0.8)'
              }}
            >
              {/* Subtle Metallic/Wood Inner Bevel Fillet Line */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />

              {/* Archival Off-White Mat Board (Passe-Partout) */}
              <div 
                className="relative bg-[#F5F4EE] p-5 sm:p-8 md:p-12 shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
                  backgroundSize: '12px 12px'
                }}
              >
                {/* Mat Bevel Cut Window Shadow */}
                <div className="relative shadow-[inset_0_3px_8px_rgba(0,0,0,0.45)] bg-[#111111] overflow-hidden">
                  
                  {/* The Artwork Media (Respects aspect ratio, never stretched) */}
                  <div className="relative max-w-[280px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[580px] max-h-[50vh] sm:max-h-[58vh] flex items-center justify-center">
                    {current.mediaType === 'video' || current.src.toLowerCase().includes('.mp4') ? (
                      <video
                        key={current.src}
                        src={current.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain max-h-[48vh] sm:max-h-[56vh] block"
                      />
                    ) : (
                      <img
                        key={current.src}
                        src={current.src}
                        alt={current.title || 'Framed photograph in virtual archive'}
                        className="w-full h-full object-contain max-h-[48vh] sm:max-h-[56vh] block"
                        loading="eager"
                        draggable={false}
                      />
                    )}

                    {/* Fine Museum Glazing Glass Sheen Overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(130deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 50%, rgba(255,255,255,0.03) 100%)'
                      }}
                    />

                    {/* Fullscreen Trigger */}
                    <button
                      onClick={() => setIsFullscreen(true)}
                      aria-label="Inspect in full screen"
                      className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/90 text-white/70 hover:text-white rounded-full opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
                      title="Inspect artwork in full screen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Subtle Lower Mat Elevation Drop Shadow onto Image */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Museum Wall Placard (Mounted Below Frame) */}
            <div className="mt-8 sm:mt-10 max-w-sm sm:max-w-md text-center sm:text-left px-4">
              <div className="inline-block bg-[#1B1B19]/90 border border-white/10 px-5 py-3.5 shadow-lg backdrop-blur-sm">
                {current.title && (
                  <h3 className="font-editorial-serif text-base sm:text-lg text-white font-medium tracking-tight">
                    {current.title}
                  </h3>
                )}
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-editorial-mono text-white/50 mt-1">
                  <span>haegis</span>
                  {current.year && (
                    <>
                      <span>·</span>
                      <span>{current.year}</span>
                    </>
                  )}
                  {current.medium && (
                    <>
                      <span>·</span>
                      <span className="italic">{current.medium}</span>
                    </>
                  )}
                </div>

                {current.caption && (
                  <p className="text-xs sm:text-sm font-editorial-serif italic text-white/75 font-light leading-relaxed mt-2.5 border-t border-white/10 pt-2">
                    {current.caption}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Gallery Navigation Controls & Counter Datum */}
        <div className="mt-12 sm:mt-14 flex items-center justify-between w-full max-w-md px-4 border-t border-white/10 pt-6">
          <button
            onClick={goToPrev}
            className="text-xs uppercase tracking-widest font-editorial-mono text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Minimal Artwork Position Counter */}
          <div className="flex items-center gap-3 font-editorial-mono text-xs text-white/50">
            <span className="text-white font-medium">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-[1px] bg-white/20 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
            <span>
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="text-xs uppercase tracking-widest font-editorial-mono text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal Touch & Keyboard Hint for Visitors */}
        <div className="mt-4 text-[11px] font-editorial-mono text-white/30 text-center tracking-wider">
          <span className="hidden md:inline">Use arrow keys [← →] or swipe to walk along the gallery wall</span>
          <span className="md:hidden">Swipe left or right to move between framed artworks</span>
        </div>

      </div>

      {/* Architectural Museum Baseboard / Floor Edge */}
      <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-black/80 to-transparent border-b border-black" />

      {/* FULL-SCREEN IMMERSIVE DISTRACTION-FREE GALLERY ROOM */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0B0B0A] flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 select-none overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Ceiling Spotlighting Ambient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(255, 248, 230, 0.09) 0%, rgba(11, 11, 10, 0.8) 55%, #0B0B0A 100%)'
            }}
          />

          {/* Top Bar Floating Controls (Can be toggled or auto-hidden on idle) */}
          <div 
            className={`absolute top-6 inset-x-6 z-50 flex items-center justify-between transition-opacity duration-300 ${
              areControlsShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-editorial-mono text-white/50">
                virtual archive · {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Hide / Show Controls Toggle */}
              <button
                onClick={() => setHideControls((prev) => !prev)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full text-xs font-editorial-mono flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-sm"
                title={hideControls ? 'Show all controls' : 'Hide controls for distraction-free viewing'}
              >
                {hideControls ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{hideControls ? 'Show Controls' : 'Distraction-Free'}</span>
              </button>

              {/* Exit Fullscreen */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                aria-label="Exit fullscreen view (Press Esc)"
                title="Exit full-screen view (Esc)"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Discreet Left Navigation Arrow */}
          <button
            onClick={goToPrev}
            aria-label="Previous artwork"
            className={`absolute left-4 sm:left-8 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-black/90 border border-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md ${
              areControlsShown ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Discreet Right Navigation Arrow */}
          <button
            onClick={goToNext}
            aria-label="Next artwork"
            className={`absolute right-4 sm:right-8 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-black/90 border border-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md ${
              areControlsShown ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* The Museum Framed Artwork in Full Screen */}
          <div 
            key={`fs-${current.id}`}
            className={`relative flex flex-col items-center max-w-5xl max-h-[85vh] animate-in fade-in ${
              direction === 'next' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'
            } duration-300 ease-out`}
          >
            <div 
              className={`relative bg-[#1A1A18] p-4 sm:p-7 md:p-8 ${
                current.frameStyle === 'natural-walnut'
                  ? 'border-[16px] sm:border-[24px] border-[#2C2117]'
                  : current.frameStyle === 'brushed-silver'
                    ? 'border-[16px] sm:border-[24px] border-[#383A3D]'
                    : 'border-[16px] sm:border-[24px] border-[#181816]'
              }`}
              style={{
                boxShadow: '0 50px 100px -15px rgba(0,0,0,0.98), 0 25px 35px -5px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.12)'
              }}
            >
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />

              <div 
                className="relative bg-[#F5F4EE] p-5 sm:p-10 md:p-14 shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
                  backgroundSize: '12px 12px'
                }}
              >
                <div className="relative shadow-[inset_0_3px_8px_rgba(0,0,0,0.45)] bg-[#111111] overflow-hidden max-w-[85vw] max-h-[62vh] sm:max-h-[68vh] flex items-center justify-center">
                  {current.mediaType === 'video' || current.src.toLowerCase().includes('.mp4') ? (
                    <video
                      key={`fs-vid-${current.src}`}
                      src={current.src}
                      autoPlay
                      loop
                      muted
                      controls={areControlsShown}
                      playsInline
                      className="max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain block"
                    />
                  ) : (
                    <img
                      key={`fs-img-${current.src}`}
                      src={current.src}
                      alt={current.title || 'Artwork inspection view'}
                      className="max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain block"
                      draggable={false}
                    />
                  )}

                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(130deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 30%, transparent 60%)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Museum Placard in Fullscreen */}
            <div 
              className={`mt-6 text-center max-w-md transition-opacity duration-300 ${
                areControlsShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <h3 className="text-lg font-editorial-serif text-white font-medium">
                {current.title}
              </h3>
              <p className="text-xs font-editorial-mono text-white/50 mt-1">
                haegis {current.year && `· ${current.year}`} {current.medium && `· ${current.medium}`}
              </p>
              {current.caption && (
                <p className="text-xs font-editorial-serif italic text-white/70 mt-1.5 font-light">
                  {current.caption}
                </p>
              )}
            </div>

          </div>

          {/* Quick Reveal Floating Button when controls are hidden */}
          {hideControls && (
            <button
              onClick={() => setHideControls(false)}
              className="absolute bottom-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full text-xs font-editorial-mono flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all"
              title="Show controls"
            >
              <Eye className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider pr-1">Controls</span>
            </button>
          )}

        </div>
      )}

    </section>
  );
};
