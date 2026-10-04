import { useEffect, useState, useRef } from 'react';
import { useCMS } from '@/features/cms';
import { PORTFOLIO_ITEMS, getProcessBehindProcess } from '../data/portfolioData';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import PackagingAnatomy from '@/components/PackagingAnatomy';
import SystemSpecs from '@/components/SystemSpecs';
import DesignProcessNarrative from '@/components/DesignProcessNarrative';
import ProcessBehindProcess from '@/components/ProcessBehindProcess';
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
  const [prevProjectId, setPrevProjectId] = useState(projectId);
  const containerRef = useRef(null);

  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setViewModeOverride(null);
  }

  const hasEarlyConcept = Boolean(
    currentProject?.hasBeforeAfter || currentProject?.process?.conceptImage
  );
  const viewMode =
    viewModeOverride ?? (currentProject?.hasBeforeAfter ? 'compare' : 'artwork');

  // Keyboard navigation: Left/Right to change projects, Escape to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
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
  }, [prevProject, nextProject, onNavigateHome, onNavigateProject]);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const scrollToSection = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const processBehindProcessData =
    currentProject?.processBehindProcess || getProcessBehindProcess?.(currentProject);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-cloud-dancer text-eerie selection:bg-crimson selection:text-white"
    >
      {/* ==================== TOP NAVIGATION BAR ==================== */}
      <header className="sticky top-0 z-50 bg-cloud-dancer/95 backdrop-blur-md border-b border-eerie/15 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button & Project Breadcrumbs */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-eerie/20 bg-cloud-white hover:bg-eerie hover:text-white transition-all text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
              >
                <span>←</span>
                <span>All Work</span>
              </button>

              <span className="text-eerie/20 hidden sm:inline">|</span>

              <div className="flex items-center gap-2 truncate">
                <span className="font-display font-medium text-sm sm:text-base text-eerie truncate">
                  {currentProject.client}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-eerie/15 text-eerie/60 hidden md:inline">
                  {currentProject.category}
                </span>
                <span className="text-[10px] font-mono text-eerie/40 hidden lg:inline">
                  [{currentIndex + 1} of {projects.length}]
                </span>
              </div>
            </div>

            {/* Right Controls: Prev/Next & Studio CMS */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center border border-eerie/20 bg-cloud-white">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateProject?.(prevProject.id);
                  }}
                  title={`Previous: ${prevProject.client}`}
                  className="px-2.5 sm:px-3 py-1 text-xs font-mono text-eerie/70 hover:text-eerie hover:bg-eerie/5 border-r border-eerie/15 transition-colors cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateProject?.(nextProject.id);
                  }}
                  title={`Next: ${nextProject.client}`}
                  className="px-2.5 sm:px-3 py-1 text-xs font-mono text-eerie/70 hover:text-eerie hover:bg-eerie/5 transition-colors cursor-pointer"
                >
                  Next →
                </button>
              </div>

              <a
                href="/admin"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/admin');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="px-2.5 py-1 border border-eerie/20 bg-cloud-white text-[10px] font-mono uppercase tracking-wider text-eerie/60 hover:text-crimson hover:border-crimson transition-all hidden sm:inline"
                title="Open Studio CMS Editor"
              >
                CMS ⚙
              </a>
            </div>
          </div>

          {/* Section Jump Anchors Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-1.5 pb-0.5 border-t border-eerie/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => scrollToSection('screen-hero')}
              className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
            >
              <span>✦</span>
              <span>01 Overview</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('screen-process')}
              className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-crimson font-bold hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
            >
              <span>✎</span>
              <span>02 The Making Process</span>
              <span className="text-[9px] px-1 py-0.2 bg-crimson/10 rounded-xs text-crimson">5 PHASES</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('screen-studio-process')}
              className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
            >
              <span>⚙</span>
              <span>03 The Process Behind The Process</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('screen-specs')}
              className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
            >
              <span>◫</span>
              <span>04 {currentProject.category === 'packaging' ? 'Print Anatomy & Dieline' : 'System Specs'}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('screen-impact')}
              className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
            >
              <span>★</span>
              <span>05 Commercial Impact</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CASE STUDY CONTENT ==================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 sm:space-y-24">
        {/* -------------------- SECTION 01: HERO STORY & BRIEF -------------------- */}
        <section id="screen-hero" className="space-y-8">
          {/* Header Title & Badges */}
          <div className="border-b border-eerie/15 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-crimson font-bold flex items-center gap-1.5">
                <span>●</span> 01 / OVERVIEW &amp; STRATEGIC BRIEF
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-eerie/60 border border-eerie/15 px-2.5 py-0.5">
                  {currentProject.category}
                </span>
                {currentProject.metric && (
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 bg-crimson text-white">
                    {currentProject.metric}
                  </span>
                )}
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-eerie leading-[1.06]">
              {currentProject.client}
            </h1>
            <p className="text-sm sm:text-base font-semibold tracking-wide text-eerie/60 uppercase mt-1">
              {currentProject.title}
            </p>
          </div>

          {/* 2-Column Balanced Architecture: Left Artwork / Right Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Visual Artwork Frame (Aspect 3/4 - Zero Cropping!) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative w-full aspect-[3/4] bg-neutral-900 border border-eerie/15 overflow-hidden shadow-xl flex items-center justify-center">
                {hasEarlyConcept && (
                  <div className="absolute top-3 left-3 z-30 flex items-center bg-black/80 backdrop-blur-md p-1 border border-white/20 shadow-md">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setViewModeOverride('compare');
                      }}
                      className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                        viewMode === 'compare'
                          ? 'bg-crimson text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Transformation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setViewModeOverride('artwork');
                      }}
                      className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                        viewMode === 'artwork'
                          ? 'bg-white text-eerie shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Final Single View
                    </button>
                  </div>
                )}

                {hasEarlyConcept && viewMode === 'compare' ? (
                  <BeforeAfterSlider
                    beforeImage={currentProject.beforeImage || currentProject.process?.conceptImage}
                    afterImage={currentProject.afterImage || currentProject.image}
                    beforeLabel={currentProject.beforeLabel || currentProject.process?.conceptLabel || 'Initial Concept'}
                    afterLabel={currentProject.afterLabel || currentProject.process?.finalLabel || 'Final System'}
                    className="w-full h-full"
                  />
                ) : currentProject.image ? (
                  <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center p-2">
                    <img
                      src={currentProject.image}
                      alt={`${currentProject.client} - ${currentProject.title}`}
                      className="w-full h-full object-contain"
                    />
                    {currentProject.metric && (
                      <div className="absolute bottom-4 left-4 z-10 bg-crimson text-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-md">
                        Impact: {currentProject.metric}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${currentProject.color}`} />
                )}
              </div>

              {/* Sub-caption under artwork */}
              <div className="flex items-center justify-between text-[11px] font-mono text-eerie/50 px-1">
                <span>Production Master Asset</span>
                <span>Aspect 3:4 • High-Resolution</span>
              </div>
            </div>

            {/* Right Column: Case Study Narrative, Brief, and Meta Matrix */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-eerie/85 leading-relaxed font-normal">
                {currentProject.description}
              </p>

              {/* The Brief & Challenge Box */}
              <div className="p-6 bg-cloud-white border border-eerie/15 space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold mb-1.5">
                    The Challenge &amp; Strategic Brief
                  </h4>
                  <p className="text-xs sm:text-sm text-eerie/80 leading-relaxed">
                    {currentProject.brief ||
                      'Engineer a distinctive visual identity and packaging system designed for high shelf standout and long-term brand equity.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-eerie/10">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold mb-1.5">
                    Strategic Approach
                  </h4>
                  <p className="text-xs sm:text-sm text-eerie/80 leading-relaxed">
                    {currentProject.approach ||
                      'Unified typographic hierarchy, bespoke iconography, and tactile finish specifications tailored to consumer touchpoints.'}
                  </p>
                </div>
              </div>

              {/* Project Meta Information Grid */}
              <div className="p-6 bg-cloud-white border border-eerie/15">
                <div className="text-[10px] font-mono uppercase tracking-widest text-eerie/50 font-bold border-b border-eerie/10 pb-2 mb-4">
                  Project Architecture Matrix
                </div>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-eerie/50">Client</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-eerie mt-0.5">{currentProject.client}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-eerie/50">Discipline</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-eerie mt-0.5 capitalize">{currentProject.category}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-eerie/50">Role</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-eerie mt-0.5">Creative Direction &amp; Packaging</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-eerie/50">Deliverables</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-eerie mt-0.5 truncate">{currentProject.deliverables || 'Identity & Packaging'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- SECTION 02: THE MAKING PROCESS (5 PHASES) -------------------- */}
        <section id="screen-process" className="pt-12 sm:pt-16 border-t border-eerie/15">
          <DesignProcessNarrative
            process={currentProject.process}
            finalImage={currentProject.image}
            client={currentProject.client}
            title={currentProject.title}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 03: PROCESS BEHIND THE PROCESS (STUDIO BLUEPRINT) -------------------- */}
        <section id="screen-studio-process" className="pt-12 sm:pt-16 border-t border-eerie/15">
          <ProcessBehindProcess
            data={processBehindProcessData}
            client={currentProject.client}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 04: TECHNICAL SPECS & DIELINE -------------------- */}
        <section id="screen-specs" className="pt-12 sm:pt-16 border-t border-eerie/15">
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

        {/* -------------------- SECTION 05: COMMERCIAL IMPACT -------------------- */}
        <section id="screen-impact" className="pt-12 sm:pt-16 border-t border-eerie/15 space-y-8">
          <div className="border-b border-eerie/15 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-crimson font-bold flex items-center gap-1.5">
                <span>●</span> 05 / OUTCOMES &amp; COMMERCIAL RESULTS
              </span>
              {currentProject.metric && (
                <span className="px-3 py-1 bg-crimson text-white text-xs font-mono font-bold uppercase tracking-wider">
                  {currentProject.metric}
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-eerie">
              Commercial Velocity &amp; Shelf Lift
            </h3>
            <p className="mt-2 text-sm sm:text-base text-eerie/70 max-w-3xl leading-relaxed">
              Measurable retail sales velocity, institutional reach, and category standout achieved following deployment for {currentProject.client}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 bg-cloud-white border border-eerie/15 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                Commercial Benchmark
              </div>
              <div className="font-display text-3xl font-medium text-eerie">
                {currentProject.metric || 'National Rollout'}
              </div>
              <p className="text-xs text-eerie/70 leading-relaxed pt-1">
                Engineered for immediate shelf standout and long-term brand equity across consumer touchpoints.
              </p>
            </div>

            <div className="p-6 bg-cloud-white border border-eerie/15 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                Category Authority
              </div>
              <div className="font-display text-3xl font-medium text-eerie capitalize">
                {currentProject.category}
              </div>
              <p className="text-xs text-eerie/70 leading-relaxed pt-1">
                Full-spectrum design architecture from packaging dielines to typography and brand token guidelines.
              </p>
            </div>

            <div className="p-6 bg-cloud-white border border-eerie/15 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                Production Fidelity
              </div>
              <div className="font-display text-3xl font-medium text-eerie">
                100% Press Ready
              </div>
              <p className="text-xs text-eerie/70 leading-relaxed pt-1">
                Calibrated under ISO 12647-2 print standards with micro-registration and substrate tactile integrity.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- NEXT PROJECT FEATURE CARD & FOOTER -------------------- */}
        <section className="pt-12 sm:pt-16 border-t border-eerie/15 space-y-8">
          {/* Next Project Teaser */}
          {nextProject && onNavigateProject && (
            <div
              onClick={() => {
                sound.playClick();
                onNavigateProject(nextProject.id);
              }}
              className="group p-6 sm:p-10 bg-cloud-white border border-eerie/15 hover:border-crimson cursor-pointer transition-all space-y-4 shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold">
                  NEXT CASE STUDY
                </span>
                <span className="text-sm font-mono text-eerie/50 group-hover:text-crimson transition-colors">
                  Next Project →
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl sm:text-5xl font-medium text-eerie group-hover:text-crimson-dark transition-colors">
                    {nextProject.client}
                  </h3>
                  <p className="text-sm sm:text-base text-eerie/60 mt-1 uppercase font-semibold">
                    {nextProject.title}
                  </p>
                </div>

                {nextProject.metric && (
                  <span className="px-3 py-1 bg-eerie text-white group-hover:bg-crimson text-xs font-mono font-bold uppercase transition-colors self-start sm:self-auto">
                    {nextProject.metric}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Contact Inquiry CTA */}
          <div className="p-8 sm:p-12 bg-cloud-white border border-eerie/20 text-center space-y-5 shadow-sm">
            <span className="section-kicker !text-crimson">Start A Conversation</span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-eerie">
              Ready to create work with commercial impact?
            </h3>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-eerie/70 leading-relaxed">
              Whether launching a new product line or modernizing established supermarket packaging, let&apos;s build designs that demand shelf space.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-8 py-3.5 bg-crimson text-white font-semibold text-xs tracking-wider uppercase hover:bg-crimson-dark transition-all cursor-pointer shadow-md hover:shadow-xl"
              >
                Inquire About A Project ↗
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                }}
                className="px-6 py-3.5 border border-eerie/20 bg-cloud-white text-eerie font-semibold text-xs tracking-wider uppercase hover:bg-eerie hover:text-white transition-all cursor-pointer"
              >
                Back to All Work
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseStudyScreen;
