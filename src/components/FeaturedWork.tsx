import React, { useState } from 'react';
import { ArrowUpRight, Compass, Layers, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectProject }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  return (
    <section id="work" className="w-full bg-[#FAFAF8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E8E5] pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Multidisciplinary Ventures</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-[#202020] font-normal tracking-tight">
              Selected Work & Projects<span className="text-[#777777]">.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#777777] max-w-md font-light">
            An ongoing archive bridging literature, scientific inquiry, software prototypes, and independent initiatives.
          </p>
        </div>

        {/* Alternating Editorial Showcase Cards */}
        <div className="space-y-16 lg:space-y-24">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveHoverId(project.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-6 sm:p-10 lg:p-12 transition-all duration-500 ${
                  project.accentDark 
                    ? 'bg-[#202020] text-[#FAFAF8] shadow-[0_20px_50px_rgba(0,0,0,0.15)]' 
                    : 'bg-white border border-[#E8E8E5] text-[#202020] hover:border-[#202020] shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
                }`}
              >
                {/* Visual Image Container */}
                <div 
                  className={`lg:col-span-6 relative overflow-hidden aspect-[4/3] bg-black/5 group cursor-pointer ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle corner badge / status label (clean text) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[10px] uppercase tracking-widest font-editorial-mono px-2.5 py-1 ${
                      project.accentDark ? 'bg-black/60 text-white/90 backdrop-blur-sm' : 'bg-white/90 text-[#202020] backdrop-blur-sm'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content / Narrative Column */}
                <div className={`lg:col-span-6 flex flex-col items-start ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-editorial-mono mb-4 text-[#888888]">
                    <span>0{index + 1}</span>
                    <span>/</span>
                    <span>{project.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-editorial-serif font-medium tracking-tight mb-2">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className={`text-base sm:text-lg font-editorial-serif italic mb-5 ${
                    project.accentDark ? 'text-white/80' : 'text-[#666666]'
                  }`}>
                    {project.tagline}
                  </p>

                  {/* Short Description */}
                  <p className={`text-xs sm:text-sm font-light leading-relaxed mb-8 ${
                    project.accentDark ? 'text-white/70' : 'text-[#555555]'
                  }`}>
                    {project.description}
                  </p>

                  {/* Interactive Button */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className={`group inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
                      project.accentDark 
                        ? 'bg-white text-[#202020] hover:bg-white/90' 
                        : 'bg-[#202020] text-[#FAFAF8] hover:bg-[#333333]'
                    }`}
                  >
                    <span>{project.actionLabel || 'View Project'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
