import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setIsScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar (inspired by cinematic luxury editorial scroll) */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-[#202020] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E8E8E5] py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-editorial-serif tracking-tight text-[#202020] font-semibold hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
          >
            haegis<span className="text-[#777777]">.</span>
          </a>

          {/* Zone 2: Navigation Links (single line, subtle hover underlines) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-xs uppercase tracking-widest text-[#777777] font-medium">
            <button 
              onClick={() => scrollToSection('work')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('poetry')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              Poetry
            </button>
            <button 
              onClick={() => scrollToSection('virtual-archive')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              Archive
            </button>
            <button 
              onClick={() => scrollToSection('journal')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              Journal
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#202020] transition-colors editorial-link whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button 
              onClick={onContactClick}
              className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-medium text-[#FAFAF8] bg-[#202020] hover:bg-[#333333] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#202020] hover:text-[#777777] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[57px] bg-[#FAFAF8] border-b border-[#E8E8E5] px-6 py-8 shadow-xl flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-widest text-[#202020]">
              <button 
                onClick={() => scrollToSection('work')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                Work
              </button>
              <button 
                onClick={() => scrollToSection('poetry')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                Poetry
              </button>
              <button 
                onClick={() => scrollToSection('virtual-archive')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                Virtual Archive
              </button>
              <button 
                onClick={() => scrollToSection('journal')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                Journal
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 border-b border-[#E8E8E5]/60 hover:text-[#777777] transition-colors"
              >
                Contact
              </button>
            </nav>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest font-medium text-[#FAFAF8] bg-[#202020] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
