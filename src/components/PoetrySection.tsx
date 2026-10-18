import React, { useState } from 'react';
import { ArrowUpRight, Feather, Instagram } from 'lucide-react';
import { PORTFOLIO_DATA, Poem } from '../data/portfolioData';

interface PoetrySectionProps {
  onSelectPoem: (poem: Poem) => void;
  onOpenChapbook: () => void;
}

export const PoetrySection: React.FC<PoetrySectionProps> = ({ onSelectPoem, onOpenChapbook }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Fragments' },
    { id: 'Published Works', label: 'Published Works' },
    { id: 'Memory & Place', label: 'Memory & Place' },
    { id: 'Love & Poetics', label: 'Love & Poetics' },
  ];

  const filteredPoems = selectedFilter === 'all'
    ? PORTFOLIO_DATA.poems
    : PORTFOLIO_DATA.poems.filter(p => p.category === selectedFilter);

  return (
    <section id="poetry" className="w-full bg-[#FAFAF8] py-24 lg:py-32 border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E8E5] pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] mb-3">
              <Feather className="w-3.5 h-3.5" />
              <span>Selected Verse & Archives</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-[#202020] font-normal tracking-tight">
              Poetry, in fragments<span className="text-[#777777]">.</span>
            </h2>
            
            <p className="text-lg font-editorial-serif italic text-[#777777] mt-2">
              “Some things are better left in lines.”
            </p>
          </div>

          {/* Interactive Filter Tabs (functional segmented controls per Constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFEFEA] rounded-none border border-[#E8E8E5]">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === opt.id
                    ? 'bg-[#202020] text-[#FAFAF8]'
                    : 'text-[#666666] hover:text-[#202020] hover:bg-white/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spacious Editorial Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPoems.map((poem, index) => (
            <article
              key={poem.id}
              onClick={() => onSelectPoem(poem)}
              className="group flex flex-col justify-between bg-white border border-[#E8E8E5] p-8 hover:border-[#202020] transition-all duration-300 cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <div>
                {/* Metadata Row: Category & Year (clean unboxed text, no pills) */}
                <div className="flex items-center justify-between text-xs text-[#888888] font-editorial-mono mb-6">
                  <span>{poem.category}</span>
                  <span>{poem.year}</span>
                </div>

                {/* Poem Title */}
                <h3 className="text-2xl font-editorial-serif font-medium text-[#202020] group-hover:text-[#000000] tracking-tight mb-4 transition-colors">
                  {poem.title}
                </h3>

                {/* Stanza Excerpt */}
                <p className="text-sm font-editorial-serif italic text-[#555555] leading-relaxed mb-6 font-light">
                  "{poem.shortExcerpt}"
                </p>
              </div>

              {/* Card Footer: Publication Source & Action Link */}
              <div className="pt-6 border-t border-[#E8E8E5]/70 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#777777]">
                  {poem.publication || 'Archive Fragment'}
                </span>
                
                <span className="text-xs uppercase tracking-widest font-medium text-[#202020] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read poem</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer: Social Instagram Link & Chapbook Cross-Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#F4F4F0] border border-[#E8E8E5] gap-4">
          <div className="flex items-center gap-3">
            <Instagram className="w-4 h-4 text-[#202020]" />
            <p className="text-xs text-[#555555]">
              Ongoing fragments and visual lines are documented on Instagram{' '}
              <a 
                href={PORTFOLIO_DATA.author.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-[#202020] hover:underline"
              >
                {PORTFOLIO_DATA.author.instagramHandle}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenChapbook}
              className="text-xs uppercase tracking-widest font-medium text-[#202020] editorial-link cursor-pointer"
            >
              <span>Explore Chemtrails & Constellations</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
