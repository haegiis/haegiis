import React from 'react';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface BookShowcaseProps {
  onOpenChapbook: () => void;
}

export const BookShowcase: React.FC<BookShowcaseProps> = ({ onOpenChapbook }) => {
  const { chemtrailsBook } = PORTFOLIO_DATA;

  return (
    <section 
      id="chemtrails" 
      className="relative w-full bg-[#181818] text-[#FAFAF8] py-20 lg:py-32 overflow-hidden border-t border-[#292929]"
    >
      {/* Subtle Astronomical Grid Lines in background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FAFAF8 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header Kicker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#888888]">
            <span>Featured Publication</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>Poetry Chapbook</span>
          </div>
          <span className="text-xs font-editorial-mono text-[#777777]">
            Vol. 01 / First Edition
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Physical Book Mockup Presentation */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-md w-full">
              
              {/* Outer Glow / Spatial Ambient Shadow */}
              <div className="absolute -inset-4 bg-white/[0.03] rounded-lg filter blur-xl group-hover:bg-white/[0.06] transition-all duration-700 pointer-events-none" />

              {/* Physical Book Mockup Frame */}
              <div className="relative bg-[#202020] p-3 sm:p-4 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                  <img
                    src={chemtrailsBook.coverImage}
                    alt="Chemtrails & Constellations poetry chapbook physical mockup"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Book Spine Light Reflection */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Interactive Overlay Button */}
                <button
                  onClick={onOpenChapbook}
                  className="w-full mt-3 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-editorial-sans uppercase tracking-widest text-white/90 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open 7-Page Preview</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right: Editorial Typography & Chapbook Details */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            <span className="text-xs uppercase tracking-[0.2em] text-[#999999] mb-3">
              First Poetry Chapbook
            </span>

            {/* Book Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-[#FAFAF8] tracking-tight leading-[1.1] mb-4">
              CHEMTRAILS & CONSTELLATIONS
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-editorial-serif italic text-white/80 font-light mb-6">
              “Poems on love, memory, solitude, and the strange wonder of being alive.”
            </p>

            {/* Description */}
            <div className="space-y-4 text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8 max-w-xl">
              <p>
                The first chapbook by haegis. A collection of poems tracing the things we remember, the people we become, the distances between us, and the quiet ways the universe finds its way into our lives.
              </p>
              <p>
                Somewhere between the earthbound and the celestial, these poems linger on what it means to love, to lose, to wonder, and to exist.
              </p>
            </div>

            {/* Excerpt Card inside Section */}
            <div className="w-full border-l border-white/20 pl-6 py-3 mb-8 bg-white/[0.02]">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3 font-editorial-mono font-medium">
                From “on earth angels are penguins”
              </p>
              <div className="font-editorial-serif text-base sm:text-lg text-white/90 italic leading-relaxed space-y-1">
                <p>on earth</p>
                <p>all angels are penguins</p>
                <p>the adaptable ones survive</p>
                <p>the unfortunate ones</p>
                <p>get trampled on.</p>
              </div>
            </div>

            {/* Action Trigger Link */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <a
                href="https://selar.com/9170387n98"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white text-[#181818] font-editorial-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#EAEAE8] transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
              >
                <span>BUY</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenChapbook}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-medium text-[#FAFAF8] hover:text-white transition-colors cursor-pointer"
              >
                <span className="editorial-link font-medium">Read Preview (7 Pages)</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <span className="text-xs text-white/40 font-editorial-mono">
                Official Edition
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
