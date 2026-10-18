import React from 'react';
import { ArrowUp, Instagram, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#181818] text-[#FAFAF8] py-16 border-t border-[#292929]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Editorial Epigraph */}
          <div>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-3xl font-editorial-serif font-semibold tracking-tight text-[#FAFAF8] hover:opacity-80 transition-opacity"
            >
              haegis<span className="text-white/40">.</span>
            </a>
            <p className="font-editorial-serif italic text-base text-white/60 mt-1">
              “Poetry, physics, and other ways of seeing.”
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_DATA.author.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.author.email}`}
              className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 border border-white/10 hover:border-white/40 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dynamic Copyright and Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-editorial-mono text-white/40 gap-4">
          <p>© {currentYear} haegis (Taiwo Akinyemi). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>haegis.com</span>
            <span>·</span>
            <span>Lagos, Nigeria</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
