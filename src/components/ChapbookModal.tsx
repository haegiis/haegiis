import React, { useState, useEffect } from 'react';
import { X, BookOpen, ArrowRight, ArrowLeft, List, Lock, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { CHEMTRAILS_PAGES, ChapbookPage, BUY_URL } from '../data/chemtrailsChapbook';
import chemtrailsCover from '../assets/images/chemtrails.png';
import africanHorizonAudio from '../data/African Horizon (Instrumental) (1).mp3';

interface ChapbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const ChapbookModal: React.FC<ChapbookModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showToc, setShowToc] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(africanHorizonAudio);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(p + 1, CHEMTRAILS_PAGES.length - 1));
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(p - 1, 0));
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        if (audioRef.current) {
          audioRef.current.src = '/audio/african_horizon.mp3';
          audioRef.current.play().then(() => {
            setIsPlayingAudio(true);
          }).catch(console.error);
        }
      });
    }
  };

  if (!isOpen) return null;

  const current: ChapbookPage = CHEMTRAILS_PAGES[currentPage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Chapbook Reader Frame */}
      <div className="relative w-full max-w-2xl min-h-[580px] max-h-[92vh] flex flex-col bg-[#191919] text-[#FAFAF8] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#121212] gap-2">
          <div className="flex items-center gap-2 text-xs font-editorial-mono text-white/50 shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-white/70" />
            <span className="hidden sm:inline">chemtrails & constellations</span>
            <span className="hidden sm:inline">·</span>
            <span>{currentPage + 1}/{CHEMTRAILS_PAGES.length}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* BUY Link Button in Header */}
            <a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white text-[#181818] text-[11px] sm:text-xs font-editorial-sans uppercase tracking-wider font-bold hover:bg-[#EAEAE8] transition-colors flex items-center gap-1 cursor-pointer shadow-sm shrink-0"
            >
              <span>BUY</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleAudio}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-editorial-mono uppercase border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                isPlayingAudio
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-white/70 hover:border-white/60 hover:text-white'
              }`}
              title={isPlayingAudio ? 'Stop sound' : 'Play African Horizon instrumental'}
            >
              <span>{isPlayingAudio ? 'Sound On' : 'Sound'}</span>
            </button>

            {/* Table of Contents Toggle */}
            <button
              onClick={() => setShowToc(!showToc)}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-editorial-mono flex items-center gap-1 border transition-colors cursor-pointer shrink-0 ${
                showToc 
                  ? 'bg-white text-black border-white' 
                  : 'border-white/20 text-white/70 hover:border-white/60 hover:text-white'
              }`}
              title="Table of Contents"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Index</span>
            </button>

            {/* Font Size Toggle - hidden on tiny mobile to preserve room */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="hidden sm:inline-flex px-2 py-1 text-[11px] font-editorial-mono uppercase border border-white/20 text-white/70 hover:border-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Toggle Font Size"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Prominent Close Button ('X') - Always Visible and Clickable */}
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer shrink-0 ml-0.5"
              aria-label="Close chapbook reader"
              title="Close reader"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Reader Body or TOC Drawer */}
        {showToc ? (
          <div className="p-8 sm:p-12 overflow-y-auto flex-1 bg-[#141414]">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-editorial-serif text-white tracking-wide">
                    Table of Contents
                  </h3>
                  <p className="text-xs text-white/50 font-editorial-sans mt-0.5">
                    First 2 poems included in sample preview
                  </p>
                </div>
                <a
                  href={BUY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-white/90 inline-flex items-center gap-1"
                >
                  <span>BUY FULL BOOK</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-editorial-mono">
                {CHEMTRAILS_PAGES.map((page, index) => {
                  if (page.type === 'cover' || page.type === 'copyright' || page.type === 'author') {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentPage(index);
                          setShowToc(false);
                        }}
                        className={`text-left py-2 px-3 transition-colors border-l-2 cursor-pointer ${
                          currentPage === index 
                            ? 'border-white text-white bg-white/10' 
                            : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-xs text-white/40 block mb-0.5">Intro</span>
                        <span className="font-editorial-serif text-base">{page.title}</span>
                      </button>
                    );
                  }
                  if (page.type === 'poem') {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentPage(index);
                          setShowToc(false);
                        }}
                        className={`text-left py-2 px-3 transition-colors border-l-2 cursor-pointer ${
                          currentPage === index 
                            ? 'border-white text-white bg-white/10' 
                            : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-xs text-white/40 block mb-0.5">{page.number} · p. {page.pdfPage}</span>
                        <span className="font-editorial-serif text-base truncate block">{page.title}</span>
                      </button>
                    );
                  }
                  if (page.type === 'buy') {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentPage(index);
                          setShowToc(false);
                        }}
                        className="text-left py-2 px-3 transition-colors border-l-2 border-amber-400/40 text-amber-200/80 hover:text-white hover:bg-white/5 cursor-pointer"
                      >
                        <span className="text-xs text-amber-300 block mb-0.5">Locked Poems</span>
                        <span className="font-editorial-serif text-base">Unlock All 18 Poems ↗</span>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 md:p-12 overflow-y-auto flex-1 flex flex-col justify-start">
            
            {/* Page Type: Cover */}
            {current.type === 'cover' && (
              <div className="text-center space-y-4 max-w-md mx-auto my-auto py-4">
                <div className="w-36 sm:w-44 aspect-[2/3] mx-auto overflow-hidden shadow-2xl border border-white/20 bg-black/40">
                  <img
                    src={chemtrailsCover}
                    alt="Chemtrails & Constellations cover artwork"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial-serif tracking-widest text-white font-normal pt-2 lowercase">
                  {current.title}
                </h2>
                <p className="text-xs uppercase tracking-[0.3em] font-editorial-sans text-white/60">
                  {current.subtitle}
                </p>
                <div className="w-12 h-[1px] bg-white/20 mx-auto my-3" />
                <p className="text-sm font-editorial-serif tracking-widest text-white/80 lowercase">
                  {current.content?.[0]}
                </p>
              </div>
            )}

            {/* Page Type: Copyright Notice */}
            {current.type === 'copyright' && (
              <div className="max-w-lg mx-auto space-y-6 text-xs text-white/70 leading-relaxed font-editorial-sans">
                <h3 className="text-sm uppercase tracking-widest text-white font-semibold mb-2">
                  {current.title}
                </h3>
                <p className="font-editorial-serif italic text-base text-white/90">
                  {current.subtitle}
                </p>
                {current.content?.map((paragraph, i) => (
                  <p key={i} className="text-white/60">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Page Type: About the Author */}
            {current.type === 'author' && (
              <div className="max-w-lg mx-auto space-y-6">
                <h3 className="text-2xl font-editorial-serif text-white font-medium mb-4">
                  {current.title}
                </h3>
                <div className="w-12 h-[1px] bg-white/20" />
                <div className="space-y-4 text-white/85 text-base font-light leading-relaxed">
                  {current.content?.map((paragraph, i) => (
                    <p key={i}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Page Type: Contents */}
            {current.type === 'contents' && (
              <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-2xl font-editorial-serif text-white font-medium">
                    Contents
                  </h3>
                  <a
                    href={BUY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-amber-300 hover:text-white inline-flex items-center gap-1 font-editorial-sans"
                  >
                    <span>BUY TO UNLOCK ALL</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="space-y-2 font-editorial-serif text-base text-white/80 max-h-[50vh] overflow-y-auto pr-2">
                  {current.content?.map((item, idx) => {
                    const isLocked = item.includes('(Locked)');
                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          if (!isLocked) {
                            setCurrentPage(idx + 4);
                          } else {
                            setCurrentPage(CHEMTRAILS_PAGES.length - 1);
                          }
                        }}
                        className={`flex items-baseline justify-between py-1 border-b border-white/5 cursor-pointer transition-colors ${
                          isLocked 
                            ? 'text-white/40 hover:text-white/70' 
                            : 'text-white hover:text-amber-200'
                        }`}
                      >
                        <span className="truncate mr-4">{item.replace(' (Locked)', '').replace(' (Preview)', '')}</span>
                        <span className="font-editorial-mono text-xs text-white/40 flex items-center gap-1">
                          {isLocked ? <Lock className="w-3 h-3 text-white/30" /> : <span className="text-emerald-400/80 text-[10px] uppercase">Free</span>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Page Type: Poem */}
            {current.type === 'poem' && (
              <div className="max-w-lg mx-auto w-full space-y-6 my-auto py-4">
                
                {/* Header Tag with Heart / Index */}
                <div className="flex items-center justify-between text-xs font-editorial-mono text-white/40 border-b border-white/10 pb-3">
                  <span>{current.number}</span>
                  {current.pdfPage && <span>· {current.pdfPage} ·</span>}
                </div>

                {/* Poem Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-white tracking-tight lowercase">
                    {current.title}
                  </h3>
                  {current.note && (
                    <p className="text-xs font-editorial-mono text-white/50 italic mt-1">
                      {current.note}
                    </p>
                  )}
                </div>

                {/* Poem Verses */}
                <div className={`space-y-5 font-editorial-serif leading-relaxed lowercase ${
                  fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                } text-white/90`}>
                  {current.content?.map((stanza, idx) => (
                    <div key={idx} className="whitespace-pre-line leading-relaxed">
                      {stanza}
                    </div>
                  ))}
                </div>

                {/* Page Bottom Asterisk / Fleur */}
                <div className="pt-4 text-center text-white/30 text-xs">
                  ✦
                </div>
              </div>
            )}

            {/* Page Type: Buy / Paywall */}
            {current.type === 'buy' && (
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-3xl font-editorial-serif text-white tracking-tight">
                  {current.title}
                </h3>
                
                <p className="text-sm font-editorial-serif italic text-white/70">
                  {current.subtitle}
                </p>

                <div className="w-12 h-[1px] bg-white/20 mx-auto my-3" />

                <div className="space-y-3 text-sm font-light text-white/80 leading-relaxed max-w-sm mx-auto">
                  {current.content?.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={BUY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-white text-[#181818] text-xs font-editorial-sans uppercase tracking-[0.2em] font-bold hover:bg-[#E8E8E5] transition-all inline-flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105"
                  >
                    <span>BUY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-[11px] font-editorial-mono text-white/40 pt-2">
                  Official Chapbook Collection · Instant Access
                </p>
              </div>
            )}

          </div>
        )}

        {/* Bottom Navigation Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#121212]">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-editorial-sans transition-colors cursor-pointer ${
              currentPage === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-editorial-mono text-white/40">
              {currentPage + 1} / {CHEMTRAILS_PAGES.length}
            </span>

            {currentPage < CHEMTRAILS_PAGES.length - 1 && (
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-editorial-mono text-amber-300 hover:text-white uppercase tracking-wider"
              >
                <span>Buy Book</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, CHEMTRAILS_PAGES.length - 1))}
            disabled={currentPage === CHEMTRAILS_PAGES.length - 1}
            className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-editorial-sans transition-colors cursor-pointer ${
              currentPage === CHEMTRAILS_PAGES.length - 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
