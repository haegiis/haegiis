import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Compass, Eye, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { author } = PORTFOLIO_DATA;

  const pillars = [
    {
      index: "01",
      verb: "Observation",
      realm: "Poetry & Literature",
      quote: "“Explore experience through language.”",
      description: "Examining memory, intimacy, the cadence of language, and the emotional resonance of time through lines that preserve human interiority."
    },
    {
      index: "02",
      verb: "Inquiry",
      realm: "Physics & Cosmology",
      quote: "“Question what lies beneath appearances.”",
      description: "Rooted in physics training — analyzing thermodynamics, gravitational mechanics, wave functions, and cosmological scales as the fundamental architecture of reality."
    },
    {
      index: "03",
      verb: "Action",
      realm: "Ventures & Systems",
      quote: "“Turn ideas into something tangible.”",
      description: "Refusing perpetual postponement. Applying intentional discipline to technology prototypes, publishing initiatives, and independent ventures like MAYDAY."
    }
  ];

  return (
    <section id="about" className="w-full bg-[#FAFAF8] py-24 lg:py-32 border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#777777] mb-6">
          <span>Biography & Intellectual Architecture</span>
        </div>

        {/* Two-Column Editorial Biography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Main Serif Heading */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-editorial-serif text-[#202020] font-normal tracking-tight leading-[1.08] mb-6" style={{ textWrap: 'balance' }}>
              A mind drawn to <span className="italic font-light">many worlds</span>.
            </h2>
            
            <div className="p-5 bg-[#F3F3EF] border-l-2 border-[#202020] text-xs text-[#555555] leading-relaxed mt-8">
              <span className="font-medium text-[#202020] block mb-1 uppercase tracking-wider text-[10px]">Academic & Disciplinary Grounding</span>
              {author.academicNote}
            </div>
          </div>

          {/* Body Prose */}
          <div className="lg:col-span-7 space-y-6 text-[#444444] font-light text-base sm:text-lg leading-relaxed">
            {author.bio.map((paragraph, idx) => {
              if (idx === 3) {
                return (
                  <p 
                    key={idx}
                    className="font-editorial-serif text-xl sm:text-2xl text-[#202020] italic font-normal py-3 border-y border-[#E8E8E5] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                );
              }
              if (idx === 4) {
                return (
                  <p 
                    key={idx}
                    className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#202020] tracking-tight pt-1"
                  >
                    {paragraph}
                  </p>
                );
              }
              return (
                <p key={idx}>
                  {paragraph}
                </p>
              );
            })}

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-[#777777] font-editorial-mono">
              <span>Location: Lagos, Nigeria</span>
              <span>·</span>
              <span>Creative Identity: haegis</span>
              <span>·</span>
              <span>Focus: Literature & Physics</span>
            </div>
          </div>

        </div>

        {/* The Three Pillars of haegis */}
        <div className="border-t border-[#E8E8E5] pt-16">
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#777777] font-medium">
              The Three Pillars of Inquiry
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div 
                key={pillar.index}
                className="bg-white border border-[#E8E8E5] p-8 flex flex-col justify-between hover:border-[#202020] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-editorial-mono text-[#888888] mb-6">
                    <span>{pillar.index}</span>
                    <span>{pillar.verb}</span>
                  </div>

                  <h4 className="text-xl font-editorial-serif font-semibold text-[#202020] mb-2">
                    {pillar.realm}
                  </h4>

                  <p className="font-editorial-serif italic text-sm text-[#555555] mb-4">
                    {pillar.quote}
                  </p>

                  <p className="text-xs leading-relaxed text-[#666666] font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
