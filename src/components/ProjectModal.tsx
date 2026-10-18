import React, { useEffect } from 'react';
import { X, ArrowUpRight, Compass } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContactClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAFAF8] text-[#202020] border border-[#E8E8E5] shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E5] bg-white">
          <div className="flex items-center gap-2 text-xs font-editorial-mono text-[#777777]">
            <Compass className="w-3.5 h-3.5" />
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#777777] hover:text-[#202020] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 flex-1 space-y-8">
          
          {/* Main Visual */}
          <div className="w-full aspect-[16/9] bg-[#E8E8E5] overflow-hidden border border-[#E8E8E5]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Tagline */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-editorial-serif font-medium tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-lg font-editorial-serif italic text-[#666666] mb-4">
              {project.tagline}
            </p>
            <p className="text-base text-[#444444] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Long Narrative Breakdown */}
          <div className="border-t border-[#E8E8E5] pt-6 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#777777] font-medium font-editorial-mono">
              Inquiry & Conceptual Architecture
            </h3>
            {project.longDescription.map((desc, i) => (
              <p key={i} className="text-sm sm:text-base text-[#555555] font-light leading-relaxed">
                {desc}
              </p>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8E8E5] bg-[#F4F4F0]">
          <span className="text-xs text-[#777777] font-editorial-mono">
            Status: {project.status}
          </span>

          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="px-5 py-2.5 bg-[#202020] text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Inquire About {project.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
