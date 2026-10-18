import React, { useEffect, useState, useRef } from 'react';
import { X, Copy, Check, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { Poem } from '../data/portfolioData';
import africanHorizonAudio from '../data/African Horizon (Instrumental) (1).mp3';

interface PoemReaderModalProps {
  poem: Poem | null;
  onClose: () => void;
}

export const PoemReaderModal: React.FC<PoemReaderModalProps> = ({ poem, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and teardown when modal closes
  useEffect(() => {
    const audio = new Audio(africanHorizonAudio);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!poem) return null;

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Fallback to imported audio or public audio path
        if (audioRef.current) {
          audioRef.current.src = '/audio/african_horizon.mp3';
          audioRef.current.play().then(() => {
            setIsPlayingAudio(true);
          }).catch(console.error);
        }
      });
    }
  };

  const handleCopy = () => {
    const text = `${poem.title}\nby haegis (Taiwo Akinyemi)\n\n${poem.fullStanzas.join('\n\n')}\n\n[Published in ${poem.publication || 'haegis.com'}]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border transition-colors duration-300 ${
          darkMode 
            ? 'bg-[#181818] text-[#FAFAF8] border-[#292929]' 
            : 'bg-[#FAFAF8] text-[#202020] border-[#E8E8E5]'
        }`}
      >
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b gap-3 ${
          darkMode ? 'border-white/10' : 'border-[#E8E8E5]'
        }`}>
          <div className="flex items-center gap-2 text-xs font-editorial-mono text-[#888888] min-w-0">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{poem.category}</span>
            <span className="shrink-0">·</span>
            <span className="shrink-0">{poem.year}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Ambient Sound Toggle Button right beside the dark/paper button */}
            <button
              onClick={toggleAudio}
              className={`px-2.5 py-1 text-[11px] font-editorial-mono uppercase border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio
                  ? darkMode
                    ? 'border-white bg-white text-black font-semibold'
                    : 'border-[#202020] bg-[#202020] text-[#FAFAF8] font-semibold'
                  : darkMode
                    ? 'border-white/20 text-white/70 hover:border-white/60 hover:text-white'
                    : 'border-[#E8E8E5] text-[#666666] hover:border-[#202020] hover:text-[#202020]'
              }`}
              title={isPlayingAudio ? 'Stop sound (African Horizon)' : 'Play sound (African Horizon)'}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Sound</span>
                </>
              )}
            </button>

            {/* Dark/Paper mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-2.5 py-1 text-[11px] font-editorial-mono uppercase border transition-colors cursor-pointer ${
                darkMode ? 'border-white/20 hover:border-white/60' : 'border-[#E8E8E5] hover:border-[#202020]'
              }`}
              title="Toggle reader contrast"
            >
              {darkMode ? 'Paper' : 'Dark'}
            </button>

            {/* Subtle Divider for clear spacing */}
            <div className={`h-4 w-px mx-1 sm:mx-2 ${darkMode ? 'bg-white/20' : 'bg-[#E8E8E5]'}`} />

            {/* Close / Exit Button with generous touch area and clearance */}
            <button
              onClick={handleClose}
              className={`p-2 rounded-sm transition-colors cursor-pointer flex items-center justify-center ${
                darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#666666] hover:text-[#202020] hover:bg-black/5'
              }`}
              aria-label="Close reader"
              title="Close reader (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Reading Content (Scrollable) */}
        <div className="p-8 sm:p-12 overflow-y-auto flex-1">
          {/* Poem Title */}
          <h2 className="text-3xl sm:text-4xl font-editorial-serif font-medium tracking-tight mb-2">
            {poem.title}
          </h2>
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs uppercase tracking-widest text-[#888888] font-editorial-mono">
              haegis · {poem.theme}
            </p>
            {isPlayingAudio && (
              <span className="text-[11px] font-editorial-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                <span>♪ African Horizon</span>
              </span>
            )}
          </div>

          {/* Stanzas */}
          <div className={`space-y-6 font-editorial-serif leading-relaxed text-lg sm:text-xl ${
            darkMode ? 'text-white/90' : 'text-[#282828]'
          }`}>
            {poem.fullStanzas.map((stanza, idx) => (
              <div key={idx} className="whitespace-pre-line italic">
                {stanza}
              </div>
            ))}
          </div>

          {/* Publication Credit Citation */}
          <div className={`mt-12 pt-6 border-t text-xs font-editorial-mono ${
            darkMode ? 'border-white/10 text-white/50' : 'border-[#E8E8E5] text-[#888888]'
          }`}>
            <p>
              Publication: <span className="font-sans font-medium text-current">{poem.publication || 'From haegis creative archive'}</span>
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className={`flex items-center justify-between px-6 py-4 border-t ${
          darkMode ? 'border-white/10 bg-black/20' : 'border-[#E8E8E5] bg-[#F4F4F0]'
        }`}>
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest transition-colors cursor-pointer font-medium ${
              darkMode ? 'text-white/80 hover:text-white' : 'text-[#202020] hover:text-black'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Stanzas copied' : 'Copy poem stanzas'}</span>
          </button>

          <span className="text-[11px] font-editorial-mono text-[#888888]">
            Press ESC to exit
          </span>
        </div>

      </div>

    </div>
  );
};
