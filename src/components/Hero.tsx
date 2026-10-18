import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import haegisiImg from '../assets/images/haegisi.png';

interface HeroProps {
  onExploreWork: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onAboutClick }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic & Intellectual Statement */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 max-w-2xl">
            {/* Fine Subtitle Kicker (Clean unboxed text, no pills) */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#777777] mb-6 font-medium">
              <span>Taiwo Akinyemi</span>
              <span className="text-[#B0B0AA]" aria-hidden="true">/</span>
              <span>haegis</span>
              <span className="text-[#B0B0AA]" aria-hidden="true">/</span>
              <span>Lagos, Nigeria</span>
            </div>

            {/* Main Headline with Editorial Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] font-editorial-serif text-[#202020] font-normal tracking-tight mb-8" style={{ textWrap: 'balance' }}>
              “A poet <span className="italic font-light">observing</span> the universe, one line at a time.”
            </h1>

            {/* Editorial Body Text */}
            <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed mb-10 max-w-xl">
              Taiwo Akinyemi is a Nigerian poet, physics graduate, and multidisciplinary creator working across literature, science, technology, and independent ventures.
            </p>

            {/* Understated Action Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#202020] text-[#FAFAF8] text-xs uppercase tracking-widest font-medium hover:bg-[#383838] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onAboutClick}
                className="group inline-flex items-center gap-2 px-6 py-3.5 border border-[#202020]/25 text-[#202020] text-xs uppercase tracking-widest font-medium hover:border-[#202020] hover:bg-[#202020]/5 transition-all duration-200 cursor-pointer"
              >
                <span>A little about me</span>
              </button>
            </div>

            {/* Scroll Down Indicator */}
            <a
              href="#highlights"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#777777] hover:text-[#202020] transition-colors group cursor-pointer"
            >
              <span className="w-6 h-[1px] bg-[#777777] group-hover:w-10 group-hover:bg-[#202020] transition-all"></span>
              <span>Scroll down</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Editorial Monochrome Portrait with Circular Spatial Geometry */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            
            {/* Circular Backdrop Aura inspired by reference image */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full bg-[#EFEFEA]/80 -z-0 pointer-events-none translate-x-4 -translate-y-4" />

            {/* Subtle dot matrix texture on the upper-right corner */}
            <div className="absolute top-2 right-2 w-28 h-28 opacity-25 -z-0 pointer-events-none hidden sm:grid grid-cols-6 gap-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#202020]" />
              ))}
            </div>

            {/* Circular Stamp / Literary Medallion in top-right */}
            <div className="absolute -top-6 sm:-top-8 -right-2 sm:right-0 z-20 pointer-events-none">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#202020]">
                  <path
                    id="stampCircle"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] uppercase tracking-[0.24em] font-medium fill-[#202020]">
                    <textPath href="#stampCircle">
                      • haegis • poet • physicist • thinker •
                    </textPath>
                  </text>
                </svg>
                {/* Center Monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-editorial-serif italic text-lg text-[#202020] select-none">
                    h.
                  </span>
                </div>
              </div>
            </div>

            {/* Portrait Image Container */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[3/4] bg-[#E8E8E5] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E8E8E5]">
              <img
                src={haegisiImg}
                alt="Editorial monochrome portrait of Taiwo Akinyemi (haegis)"
                className="w-full h-full object-cover object-center grayscale contrast-105 hover:scale-[1.015] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Fine Editorial caption strip overlay at bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-5 text-white/90 flex justify-between items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-[#FAFAF8]/70">Identity</p>
                  <p className="text-sm font-editorial-serif tracking-wide text-[#FAFAF8]">Taiwo Akinyemi</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-editorial-mono text-[#FAFAF8]/70 tracking-wider">06°31'N 03°23'E</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
