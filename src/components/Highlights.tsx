import React from 'react';
import { BookOpen, Atom, Bookmark, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const iconMap = {
  book: BookOpen,
  atom: Atom,
  bookmark: Bookmark,
  compass: Compass,
};

export const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="w-full bg-[#FAFAF8] border-y border-[#E8E8E5] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PORTFOLIO_DATA.highlights.map((item, index) => {
            const Icon = iconMap[item.iconName];
            return (
              <div 
                key={item.id} 
                className="flex flex-col group transition-all duration-300"
              >
                {/* Index & Monochrome Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-editorial-mono text-[#999999]">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-none border border-[#E8E8E5] flex items-center justify-center text-[#202020] group-hover:border-[#202020] transition-colors">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>

                {/* Highlight Title */}
                <h3 className="text-base font-editorial-serif font-semibold text-[#202020] tracking-wide mb-2">
                  {item.title}
                </h3>

                {/* Restrained Description */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#666666] font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
