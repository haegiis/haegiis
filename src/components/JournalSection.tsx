import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA, JournalEntry } from '../data/portfolioData';

interface JournalSectionProps {
  onSelectEntry: (entry: JournalEntry) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectEntry }) => {
  return (
    <section id="journal" className="w-full bg-[#FAFAF8] py-24 lg:py-32 border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E8E5] pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Essays & Observations</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-[#202020] font-normal tracking-tight">
              Notes from the in-between<span className="text-[#777777]">.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#777777] max-w-md font-light">
            Reflections, creative process notes, and marginalia bridging literature, science, and the discipline of building.
          </p>
        </div>

        {/* Clean Typographic List with Understated Separators (No Clunky Cards) */}
        <div className="divide-y divide-[#E8E8E5]">
          {PORTFOLIO_DATA.journalEntries.map((entry, index) => (
            <article
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              className="py-10 group cursor-pointer transition-colors duration-200 hover:bg-[#F3F3EE]/60 px-4 -mx-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                
                {/* Meta Column (Date & Category) */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between text-xs font-editorial-mono text-[#888888]">
                  <span>{entry.date}</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#999999] mt-1">{entry.category}</span>
                </div>

                {/* Title & Excerpt Column */}
                <div className="lg:col-span-7">
                  <h3 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-[#202020] group-hover:text-black tracking-tight mb-3 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>

                {/* Read Time & Trigger Link */}
                <div className="lg:col-span-2 flex items-center lg:justify-end gap-2 text-xs uppercase tracking-widest font-medium text-[#777777] group-hover:text-[#202020] pt-2 lg:pt-0">
                  <span className="text-[11px] font-editorial-mono lowercase text-[#999999]">{entry.readTime}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
