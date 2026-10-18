import React, { useEffect, useState } from 'react';
import { X, BookOpen, Clock, Copy, Check } from 'lucide-react';
import { JournalEntry } from '../data/portfolioData';

interface ArticleModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ entry, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!entry) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FAFAF8] text-[#202020] border border-[#E8E8E5] shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E5] bg-white">
          <div className="flex items-center gap-2 text-xs font-editorial-mono text-[#777777]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{entry.category}</span>
            <span>·</span>
            <span>{entry.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-editorial-mono text-[#999999]">
              <Clock className="w-3 h-3" />
              <span>{entry.readTime}</span>
            </span>

            <button
              onClick={onClose}
              className="p-1.5 text-[#777777] hover:text-[#202020] transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Reading Body */}
        <div className="overflow-y-auto p-8 sm:p-12 flex-1">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-editorial-serif font-medium tracking-tight mb-4">
              {entry.title}
            </h1>
            <p className="text-lg font-editorial-serif italic text-[#666666] leading-relaxed">
              "{entry.excerpt}"
            </p>
          </header>

          {/* Article Essay Paragraphs */}
          <div className="space-y-6 text-[#333333] font-light text-base sm:text-lg leading-relaxed">
            {entry.content.map((paragraph, i) => (
              <p key={i}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Epigraph Signature */}
          <div className="mt-12 pt-6 border-t border-[#E8E8E5] flex items-center justify-between text-xs font-editorial-mono text-[#888888]">
            <span>Written by haegis (Taiwo Akinyemi)</span>
            <span>Lagos, Nigeria</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8E8E5] bg-[#F4F4F0]">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#202020] hover:text-black font-medium cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link copied' : 'Share article'}</span>
          </button>

          <span className="text-[11px] font-editorial-mono text-[#888888]">
            Notes from the in-between
          </span>
        </div>

      </div>

    </div>
  );
};
