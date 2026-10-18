import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { BookShowcase } from './components/BookShowcase';
import { PoetrySection } from './components/PoetrySection';
import { FeaturedWork } from './components/FeaturedWork';
import { AboutSection } from './components/AboutSection';
import { JournalSection } from './components/JournalSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PoemReaderModal } from './components/PoemReaderModal';
import { ProjectModal } from './components/ProjectModal';
import { ArticleModal } from './components/ArticleModal';
import { ChapbookModal } from './components/ChapbookModal';
import { VirtualArchiveSection } from './components/VirtualArchiveSection';
import { Poem, Project, JournalEntry } from './data/portfolioData';

export default function App() {
  const [activePoem, setActivePoem] = useState<Poem | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeJournal, setActiveJournal] = useState<JournalEntry | null>(null);
  const [isChapbookOpen, setIsChapbookOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#202020] flex flex-col font-editorial-sans selection:bg-[#202020] selection:text-[#FAFAF8]">
      {/* Editorial Navigation */}
      <Navbar onContactClick={() => scrollToSection('contact')} />

      <main className="flex-1">
        {/* Asymmetric Hero with Portrait & Circular Motif */}
        <Hero
          onExploreWork={() => scrollToSection('work')}
          onAboutClick={() => scrollToSection('about')}
        />

        {/* Four Featured Editorial Credentials */}
        <Highlights />

        {/* First Major Visual Interruption: Dramatic Dark Charcoal Book Showcase */}
        <BookShowcase onOpenChapbook={() => setIsChapbookOpen(true)} />

        {/* Editorial Gallery: Poetry in Fragments */}
        <PoetrySection
          onSelectPoem={(poem) => setActivePoem(poem)}
          onOpenChapbook={() => setIsChapbookOpen(true)}
        />

        {/* Full-width Multidisciplinary Showcase */}
        <FeaturedWork
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* Immersive Museum-Quality Virtual Art Gallery & Photography Exhibition */}
        <VirtualArchiveSection />

        {/* Personal & Intellectual Biography */}
        <AboutSection />

        {/* Quiet Text-Led Journal */}
        <JournalSection
          onSelectEntry={(entry) => setActiveJournal(entry)}
        />

        {/* Inquiries & Time Telemetry */}
        <ContactSection />
      </main>

      {/* Understated Minimalist Footer */}
      <Footer />

      {/* Interactive Distraction-Free Modals */}
      <PoemReaderModal
        poem={activePoem}
        onClose={() => setActivePoem(null)}
      />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onContactClick={() => scrollToSection('contact')}
      />

      <ArticleModal
        entry={activeJournal}
        onClose={() => setActiveJournal(null)}
      />

      <ChapbookModal
        isOpen={isChapbookOpen}
        onClose={() => setIsChapbookOpen(false)}
        onContactClick={() => scrollToSection('contact')}
      />
    </div>
  );
}
