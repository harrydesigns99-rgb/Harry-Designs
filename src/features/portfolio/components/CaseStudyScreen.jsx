import { useEffect, useState, useRef } from 'react';
import { useCMS } from '@/features/cms';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import PackagingAnatomy from '@/components/PackagingAnatomy';
import SystemSpecs from '@/components/SystemSpecs';
import DesignProcessNarrative from '@/components/DesignProcessNarrative';
import WordReveal from '@/components/WordReveal';
import { sound } from '@/utils/audio';

const CaseStudyScreen = ({
  projectId = 1,
  onNavigateHome,
  onNavigateProject,
}) => {
  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  const currentProject =
    projects.find((p) => p.id === Number(projectId)) || projects[0];

  const currentIndex = projects.findIndex((p) => p.id === currentProject?.id);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const [viewModeOverride, setViewModeOverride] = useState(null);
  const [activeTab, setActiveTab] = useState('screen-hero');
  const [prevProjectId, setPrevProjectId] = useState(projectId);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);
  const containerRef = useRef(null);

  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setViewModeOverride(null);
    setActiveTab('screen-hero');
    setIsLightboxOpen(false);
  }

  const hasEarlyConcept = Boolean(
    currentProject?.hasBeforeAfter || currentProject?.process?.conceptImage
  );
  const viewMode =
    viewModeOverride ?? (currentProject?.hasBeforeAfter ? 'compare' : 'artwork');

  const handleShare = async () => {
    sound.playClick();
    const shareData = {
      title: `${currentProject.client} — ${currentProject.title}`,
      text: `Case study for ${currentProject.client}: ${currentProject.description}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2200);
    }
  };

  // Keyboard navigation: Left/Right to change projects, Escape to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
          return;
        }
        sound.playClick();
        onNavigateHome?.();
      } else if (e.key === 'ArrowLeft' && prevProject && onNavigateProject) {
        sound.playClick();
        onNavigateProject(prevProject.id);
      } else if (e.key === 'ArrowRight' && nextProject && onNavigateProject) {
        sound.playClick();
        onNavigateProject(nextProject.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, onNavigateHome, onNavigateProject, prevProject, nextProject]);

  // Section observer to update sub-nav indicator
  useEffect(() => {
    const sectionIds = [
      'screen-hero',
      'screen-process',
      'screen-specs',
      'screen-impact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projectId]);

  const scrollToSection = (id) => {
    sound.playClick();
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 64;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f5f4f0] text-[#1e1e20] bg-dot-grid selection:bg-[#FC7A69] selection:text-white transition-colors duration-300"
    >
      {/* ==================== SHRIYA STYLE STICKY SUB-BAR (cs-bar) ==================== */}
      <header className="sticky top-0 z-50 bg-[#f5f4f0]/90 backdrop-blur-md border-b border-black/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateHome?.();
            }}
            data-cursor="HOME"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-sans font-medium text-[#1e1e20] transition-all cursor-pointer border border-black/[0.08] shadow-2xs group flex-shrink-0"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="hidden xs:inline">Back to Work</span>
            <span className="xs:hidden">Back</span>
          </button>

          {/* Project Title Center & Section Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[#1e1e20]">
                {currentProject.client}
              </span>
              <span className="text-black/30">•</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FC7A69] font-medium">
                {currentProject.category.toUpperCase()}
              </span>
            </div>

            {/* Section Jump Links */}
            <div className="hidden lg:flex items-center gap-1 p-0.5 rounded-full bg-white/70 border border-black/[0.06] text-xs font-sans">
              {[
                { id: 'screen-hero', label: 'Overview' },
                { id: 'screen-process', label: 'Process' },
                { id: 'screen-specs', label: currentProject.category === 'packaging' ? 'Print Specs' : 'System Specs' },
                { id: 'screen-impact', label: 'Impact' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1e1e20] text-[#f5f4f0] font-medium shadow-2xs'
                      : 'text-[#1e1e20]/60 hover:text-[#1e1e20]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Prev / Next / Share */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleShare}
              data-cursor="SHARE ↗"
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-mono text-[#1e1e20] border border-black/[0.08] transition-all cursor-pointer shadow-2xs"
            >
              {sharedToast ? '✓' : 'Share ↗'}
            </button>

            <div className="inline-flex items-center p-0.5 rounded-full bg-white/80 border border-black/[0.08] shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateProject?.(prevProject.id);
                }}
                data-cursor="PREV"
                title={`Previous: ${prevProject.client}`}
                className="px-2 sm:px-3 py-1 rounded-full text-xs font-sans font-medium text-[#1e1e20]/70 hover:text-[#1e1e20] transition-all cursor-pointer"
              >
                ← <span className="hidden xs:inline">Prev</span>
              </button>
              <span className="text-black/15 text-xs">|</span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateProject?.(nextProject.id);
                }}
                data-cursor="NEXT"
                title={`Next: ${nextProject.client}`}
                className="px-2 sm:px-3 py-1 rounded-full text-xs font-sans font-medium text-[#1e1e20]/70 hover:text-[#1e1e20] transition-all cursor-pointer"
              >
                <span className="hidden xs:inline">Next</span> →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CASE STUDY CONTENT ==================== */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 space-y-14 sm:space-y-18">
        {/* -------------------- SECTION 01: THE HOOK (cs-hook) -------------------- */}
        <section id="screen-hero" className="scroll-mt-24 space-y-8 text-center sm:text-left">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-[#1e1e20] text-[#f5f4f0] text-xs font-mono font-medium uppercase tracking-wider">
              CASE STUDY #{currentProject.id.toString().padStart(2, '0')}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FC7A69]/15 text-[#FC7A69] text-xs font-mono uppercase tracking-wider font-semibold">
              {currentProject.category.toUpperCase()}
            </span>
            {currentProject.metric && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-mono font-medium">
                ★ {currentProject.metric}
              </span>
            )}
          </div>

          {/* Grand Headline matching shriyap.com */}
          <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-[#1e1e20] leading-[1.12] sm:leading-[1.06]">
            <WordReveal
              text={`${currentProject.title} for ${currentProject.client}`}
              highlightWords={[currentProject.client]}
            />
          </h1>

          {/* Hook Subtitle Narrative */}
          <p className="font-sans text-base sm:text-xl text-[#1e1e20]/75 max-w-3xl leading-relaxed font-normal">
            {currentProject.description || currentProject.brief}
          </p>

          {/* -------------------- ORIENTATION SPEC SHEET (cs-meta) -------------------- */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] text-left">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1e1e20]/50 block mb-1">
                MY ROLE
              </span>
              <p className="font-display text-sm sm:text-base font-bold text-[#1e1e20]">
                Brand &amp; Packaging Architect
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1e1e20]/50 block mb-1">
                CLIENT / SECTOR
              </span>
              <p className="font-display text-sm sm:text-base font-bold text-[#1e1e20]">
                {currentProject.client}
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1e1e20]/50 block mb-1">
                YEAR / DURATION
              </span>
              <p className="font-display text-sm sm:text-base font-bold text-[#1e1e20]">
                {currentProject.year || '2024'} • Complete System
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1e1e20]/50 block mb-1">
                PRODUCTION RIGOR
              </span>
              <p className="font-display text-sm sm:text-base font-bold text-emerald-700">
                ISO 12647-2 Ready
              </p>
            </div>
          </div>

          {/* -------------------- "WHAT DID I DO?" SCOPE PILL STRIP -------------------- */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FC7A69] font-semibold block text-center sm:text-left">
              SCOPE OF ARCHITECTURAL CRAFT
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {[
                'Category Shelf Audit',
                'CAD Dieline Engineering',
                'Custom Botanical / Emblem Vector Suite',
                'Pantone Spot Color Formulation',
                'Selective UV Gloss Proofing',
                'CI-Flexo Micro-Registration Checks',
                'Nutritional Hierarchy Compliance',
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-1.5 rounded-full text-xs font-sans font-medium bg-white text-[#1e1e20]/80 border border-black/[0.08] shadow-2xs hover:scale-105 transition-transform"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Transformation Slider Controller (if available) */}
          {hasEarlyConcept && (
            <div className="flex justify-center sm:justify-start pt-2">
              <div className="inline-flex items-center p-1 rounded-full bg-white border border-black/[0.08] shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setViewModeOverride('compare');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                    viewMode === 'compare'
                      ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-sm'
                      : 'text-[#1e1e20]/70 hover:text-[#1e1e20]'
                  }`}
                >
                  ↔ Transformation Slider
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setViewModeOverride('artwork');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                    viewMode === 'artwork'
                      ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-sm'
                      : 'text-[#1e1e20]/70 hover:text-[#1e1e20]'
                  }`}
                >
                  ✦ Final Production Master
                </button>
              </div>
            </div>
          )}

          {/* -------------------- HIGH-RES VISUAL HERO MEDIA FRAME -------------------- */}
          <div className="relative w-full rounded-3xl bg-white border border-black/[0.08] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden p-4 sm:p-8">
            {hasEarlyConcept && viewMode === 'compare' ? (
              <BeforeAfterSlider
                beforeImage={currentProject.beforeImage || currentProject.process?.conceptImage}
                afterImage={currentProject.afterImage || currentProject.image}
                beforeLabel={currentProject.beforeLabel || currentProject.process?.conceptLabel || 'Legacy 2023 Packaging'}
                afterLabel={currentProject.afterLabel || currentProject.process?.finalLabel || 'Redesign 2024 System'}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden"
              />
            ) : currentProject.image ? (
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center group overflow-hidden rounded-2xl bg-[#1e1e20]/5">
                <img
                  src={currentProject.image}
                  alt={`${currentProject.client} - ${currentProject.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsLightboxOpen(true);
                  }}
                  data-cursor="ZOOM 🔍"
                  className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-mono tracking-wider backdrop-blur-md shadow-lg border border-white/20 transition-all cursor-pointer"
                >
                  🔍 Inspect High-Res
                </button>
              </div>
            ) : (
              <div className={`w-full aspect-[16/10] rounded-2xl bg-gradient-to-br ${currentProject.color}`} />
            )}
          </div>
        </section>

        {/* -------------------- SECTION 02: THE 5-PHASE MAKING PROCESS -------------------- */}
        <section id="screen-process" className="scroll-mt-24 pt-10 border-t border-black/[0.08]">
          <DesignProcessNarrative
            process={currentProject.process}
            client={currentProject.client}
            title={currentProject.title}
            category={currentProject.category}
            description={currentProject.description}
            approach={currentProject.approach}
            brief={currentProject.brief}
          />
        </section>

        {/* -------------------- SECTION 03: TECHNICAL SPECS & DIELINE -------------------- */}
        <section id="screen-specs" className="scroll-mt-24 pt-10 border-t border-black/[0.08]">
          {currentProject.category === 'packaging' ? (
            <PackagingAnatomy
              anatomy={currentProject.anatomy}
              image={currentProject.image}
              client={currentProject.client}
              title={currentProject.title}
            />
          ) : (
            <SystemSpecs
              specs={currentProject.systemSpecs}
              client={currentProject.client}
              title={currentProject.title}
              category={currentProject.category}
            />
          )}
        </section>

        {/* -------------------- SECTION 04: MARKET OUTCOMES -------------------- */}
        <section id="screen-impact" className="scroll-mt-24 pt-10 border-t border-black/[0.08] space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FC7A69] font-semibold block">
              MARKET VELOCITY &amp; OUTCOMES
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1e1e20]">
              Measurable Commercial Impact
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-xs space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/60">
                VELOCITY BENCHMARK
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#FC7A69]">
                {currentProject.metric || '+40% Sales Lift'}
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed">
                Clear shelf recognition and distinctive graphic form driving repeat retail pickup.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-xs space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/60">
                AISLE RETENTION
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#1e1e20]">
                Top-of-Mind
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed">
                Unmistakable silhouette standing out across crowded retail supermarket aisles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-xs space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/60">
                PRESS COMPLIANCE
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-700">
                Zero Press Halos
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed">
                Precision trapping and ink viscosity calibration ensuring flawless high-volume press runs.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- SECTION 05: NEXT CASE STUDY -------------------- */}
        <section className="pt-10 border-t border-black/[0.08]">
          <div
            onClick={() => {
              sound.playClick();
              onNavigateProject(nextProject.id);
            }}
            data-cursor="NEXT CASE ↗"
            className="group p-8 sm:p-12 rounded-3xl bg-white hover:bg-black hover:text-white border border-black/[0.08] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FC7A69] font-semibold block mb-2">
                NEXT CASE STUDY ↗
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                {nextProject.client}
              </h3>
              <p className="font-sans text-sm text-[#1e1e20]/70 group-hover:text-white/70 mt-1">
                {nextProject.title}
              </p>
            </div>

            <div className="w-14 h-14 rounded-full bg-[#1e1e20] text-white group-hover:bg-[#FC7A69] flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
              <span className="text-lg font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* 4K Asset Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white/80 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-mono text-xs sm:text-sm">
              <span className="text-white font-semibold">{currentProject.client}</span> — {currentProject.title}
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsLightboxOpen(false);
              }}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer border border-white/20"
            >
              ✕ Close
            </button>
          </div>

          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center p-2 sm:p-6 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentProject.image || currentProject.process?.conceptImage}
              alt={currentProject.title}
              className="max-h-[82vh] max-w-full w-auto h-auto object-contain drop-shadow-2xl rounded-xl"
            />
          </div>

          <div className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono text-white/50 pt-2 border-t border-white/10">
            <span>{currentProject.category}</span>
            <span>Zero Cropping • 100% Production Fidelity</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyScreen;
