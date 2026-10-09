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
  const [activeTab, setActiveTab] = useState('screen-hero');
  const [prevProjectId, setPrevProjectId] = useState(projectId);
  const containerRef = useRef(null);

  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setViewModeOverride(null);
    setActiveTab('screen-hero');
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

  // Observer to highlight active section tab in sticky sub-nav
  useEffect(() => {
    const sectionIds = [
      'screen-hero',
      'screen-process',
      'screen-studio-process',
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
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
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

  const processBehindProcessData =
    currentProject?.processBehindProcess || getProcessBehindProcess?.(currentProject);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] selection:bg-crimson selection:text-white transition-colors duration-300"
    >
      {/* ==================== APPLE STICKY SUB-NAV (52px FROSTED GLASS BAR) ==================== */}
      <header className="sticky top-0 z-50 bg-[#fbfbfd]/85 backdrop-blur-2xl border-b border-black/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Navigation controls & breadcrumb */}
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Left: Back Pill & Project Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-xs font-medium text-[#1d1d1f] transition-all cursor-pointer border border-black/[0.04]"
                title="Return to home (Esc)"
              >
                <span>←</span>
                <span>All Work</span>
              </button>

              <span className="text-black/15 hidden sm:inline">/</span>

              <div className="flex items-center gap-2 truncate">
                <span className="font-display font-medium text-sm sm:text-base text-[#1d1d1f] tracking-tight truncate">
                  {currentProject.client}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] text-[#86868b] border border-black/[0.05] hidden md:inline">
                  {currentProject.category}
                </span>
              </div>
            </div>

            {/* Right: Prev/Next Segmented Pill & CMS Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="inline-flex items-center p-0.5 rounded-full bg-black/[0.05] border border-black/[0.04]">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateProject?.(prevProject.id);
                  }}
                  title={`Previous: ${prevProject.client}`}
                  className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] hover:bg-white/80 transition-all cursor-pointer"
                >
                  ← Prev
                </button>
                <span className="text-black/10 text-xs">|</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateProject?.(nextProject.id);
                  }}
                  title={`Next: ${nextProject.client}`}
                  className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] hover:bg-white/80 transition-all cursor-pointer"
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
                className="px-3 py-1 rounded-full bg-black/[0.05] hover:bg-crimson hover:text-white text-[11px] font-mono uppercase tracking-wider text-[#86868b] border border-black/[0.04] transition-all hidden sm:inline"
                title="Studio CMS Editor"
              >
                CMS ⚙
              </a>
            </div>
          </div>

          {/* Bottom Row: Centered Apple Segmented Section Tabs */}
          <div className="py-1.5 border-t border-black/[0.04] flex items-center justify-center overflow-x-auto no-scrollbar">
            <nav className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.04] text-xs">
              <button
                type="button"
                onClick={() => scrollToSection('screen-hero')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'screen-hero'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-process')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'screen-process'
                    ? 'bg-white text-crimson shadow-xs'
                    : 'text-[#86868b] hover:text-crimson'
                }`}
              >
                <span>The Making Process</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-crimson/10 text-crimson font-mono font-semibold">
                  5 PHASES
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-studio-process')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'screen-studio-process'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Studio Rigor
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-specs')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'screen-specs'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {currentProject.category === 'packaging' ? 'Print & Dieline Specs' : 'System Specs'}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-impact')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'screen-impact'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Outcomes
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CASE STUDY CONTENT ==================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 sm:space-y-28">
        {/* -------------------- SECTION 01: KEYNOTE HERO PRESENTATION -------------------- */}
        <section id="screen-hero" className="scroll-mt-28 space-y-10">
          {/* Centered Keynote Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="uppercase tracking-wider">Case Study // {currentIndex + 1} of {projects.length}</span>
              <span className="text-black/20">•</span>
              <span className="uppercase text-[#1d1d1f] font-semibold">{currentProject.category}</span>
            </div>

            {/* Grand Apple Keynote Title */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#1d1d1f] leading-[1.05]">
              {currentProject.client}
            </h1>

            {/* Subtitle / Discipline */}
            <p className="text-sm sm:text-base font-medium tracking-wider text-[#86868b] uppercase">
              {currentProject.title}
            </p>

            {/* Summary Narrative */}
            <p className="text-base sm:text-xl text-[#1d1d1f]/80 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
              {currentProject.description}
            </p>
          </div>

          {/* Segmented View Mode Controller (if Before/After available) */}
          {hasEarlyConcept && (
            <div className="flex justify-center">
              <div className="inline-flex items-center p-1 rounded-full bg-black/[0.05] border border-black/[0.06] shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setViewModeOverride('compare');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    viewMode === 'compare'
                      ? 'bg-white text-[#1d1d1f] shadow-sm'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
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
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    viewMode === 'artwork'
                      ? 'bg-white text-[#1d1d1f] shadow-sm'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  ✦ Final Master View
                </button>
              </div>
            </div>
          )}

          {/* Cinematic Hero Stage (Pedestal Artwork Frame - 3:4 Portrait, Zero Cropping!) */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative w-full aspect-[3/4] max-h-[580px] sm:max-h-[620px] lg:max-h-[660px] rounded-3xl bg-white border border-black/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center p-4 sm:p-8">
              {hasEarlyConcept && viewMode === 'compare' ? (
                <BeforeAfterSlider
                  beforeImage={currentProject.beforeImage || currentProject.process?.conceptImage}
                  afterImage={currentProject.afterImage || currentProject.image}
                  beforeLabel={currentProject.beforeLabel || currentProject.process?.conceptLabel || 'Initial Concept'}
                  afterLabel={currentProject.afterLabel || currentProject.process?.finalLabel || 'Final System'}
                  className="w-full h-full rounded-2xl overflow-hidden"
                />
              ) : currentProject.image ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.client} - ${currentProject.title}`}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                  />
                  {currentProject.metric && (
                    <div className="absolute bottom-4 left-4 z-10 rounded-full px-3.5 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs font-mono font-medium tracking-wider shadow-lg border border-white/10">
                      ★ {currentProject.metric}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${currentProject.color}`} />
              )}
            </div>

            {/* Apple Pedestal Caption */}
            <div className="flex items-center justify-between text-xs font-mono text-[#86868b] px-4 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Production Master Asset
              </span>
              <span>Aspect 3:4 • High-Fidelity Vector &amp; Print Calibration</span>
            </div>
          </div>

          {/* 3-Column Keynote Impact Metrics Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="apple-card p-6 sm:p-8 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Commercial Velocity
              </div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-[#1d1d1f] tracking-tight">
                {currentProject.metric || 'National Rollout'}
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-1">
                Engineered for immediate retail shelf standout and lasting brand equity across modern touchpoints.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Discipline Mastery
              </div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-[#1d1d1f] capitalize tracking-tight">
                {currentProject.category}
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-1">
                From precision CAD dielines to typographic scale systems and tactile substrate treatments.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Production Fidelity
              </div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-[#1d1d1f] tracking-tight">
                100% Press Ready
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-1">
                Calibrated under ISO 12647-2 print standards with micro-registration and tactile substrate integrity.
              </p>
            </div>
          </div>

          {/* 2-Column Strategic Challenge & Architecture Matrix Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            {/* Left Card: Strategic Challenge & Approach */}
            <div className="lg:col-span-7 apple-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
                  <span>✦</span> STRATEGIC CHALLENGE &amp; INTENT
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1d1d1f] tracking-tight">
                  Solving for shelf standout and brand distinctiveness.
                </h3>
                <p className="text-sm sm:text-base text-[#1d1d1f]/80 leading-relaxed">
                  {currentProject.brief ||
                    'Engineer a distinctive visual identity and packaging system designed for high shelf standout, retail memorability, and long-term brand equity.'}
                </p>
              </div>

              <div className="pt-6 border-t border-black/[0.06] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
                  Strategic Methodology
                </div>
                <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                  {currentProject.approach ||
                    'Unified typographic hierarchy, bespoke iconography, and tactile finish specifications tailored to consumer touchpoints.'}
                </p>
              </div>
            </div>

            {/* Right Card: Project Architecture Matrix */}
            <div className="lg:col-span-5 apple-card p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium border-b border-black/[0.06] pb-3 mb-4">
                  Project Architecture Matrix
                </div>
                <dl className="space-y-3.5">
                  <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Client</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">{currentProject.client}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Discipline</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f] capitalize">{currentProject.category}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Role</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">Creative Direction &amp; Packaging</dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Deliverables</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f] truncate max-w-[180px] text-right">
                      {currentProject.deliverables || 'Identity & Packaging System'}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <dt className="text-xs font-mono text-[#86868b]">Production Status</dt>
                    <dd className="text-xs font-mono font-semibold text-emerald-600 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Shipped &amp; In Circulation
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-[#86868b]">
                <span>Archived Case #{currentProject.id.toString().padStart(3, '0')}</span>
                <span>Harry Designs Studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- SECTION 02: THE MAKING PROCESS (5 PHASES) -------------------- */}
        <section id="screen-process" className="scroll-mt-28 pt-8 border-t border-black/[0.08]">
          <DesignProcessNarrative
            process={currentProject.process}
            finalImage={currentProject.image}
            client={currentProject.client}
            title={currentProject.title}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 03: PROCESS BEHIND THE PROCESS (STUDIO RIGOR) -------------------- */}
        <section id="screen-studio-process" className="scroll-mt-28 pt-8 border-t border-black/[0.08]">
          <ProcessBehindProcess
            data={processBehindProcessData}
            client={currentProject.client}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 04: TECHNICAL SPECS & DIELINE -------------------- */}
        <section id="screen-specs" className="scroll-mt-28 pt-8 border-t border-black/[0.08]">
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

        {/* -------------------- SECTION 05: COMMERCIAL OUTCOMES -------------------- */}
        <section id="screen-impact" className="scroll-mt-28 pt-8 border-t border-black/[0.08] space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] text-xs font-mono text-[#86868b] border border-black/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              <span>05 / COMMERCIAL OUTCOMES</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1d1d1f]">
              Measurable Market Impact
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
              Design is an investment in market velocity. Here is the tangible commercial performance delivered for {currentProject.client}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="apple-card p-6 sm:p-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Velocity Benchmark</span>
              <div className="font-display text-3xl sm:text-4xl font-medium text-crimson">
                {currentProject.metric || '+40% Lift'}
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Clear shelf recognition and distinctive form factor driving repeat retail pickup.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Brand Retention</span>
              <div className="font-display text-3xl sm:text-4xl font-medium text-[#1d1d1f]">
                Top-of-Mind
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Iconic graphic silhouette standing out on crowded supermarket shelves and online listings.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Press Compliance</span>
              <div className="font-display text-3xl sm:text-4xl font-medium text-[#1d1d1f]">
                Zero Waste Rate
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Precision trapping and ink viscosity calibration ensuring flawless high-volume print runs.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- NEXT PROJECT FEATURE CARD & STUDIO INQUIRY -------------------- */}
        <section className="pt-8 border-t border-black/[0.08] space-y-8">
          {/* Next Project Apple Bento Card */}
          {nextProject && onNavigateProject && (
            <div
              onClick={() => {
                sound.playClick();
                onNavigateProject(nextProject.id);
              }}
              className="group apple-card p-8 sm:p-12 hover:border-crimson/50 cursor-pointer transition-all space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-2">
                  <span>✦</span> NEXT CASE STUDY
                </span>
                <span className="text-xs font-mono text-[#86868b] group-hover:text-crimson transition-colors flex items-center gap-1">
                  View Case Study →
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl sm:text-5xl font-medium text-[#1d1d1f] group-hover:text-crimson transition-colors tracking-tight">
                    {nextProject.client}
                  </h3>
                  <p className="text-sm sm:text-base text-[#86868b] mt-1 uppercase font-medium">
                    {nextProject.title}
                  </p>
                </div>

                {nextProject.metric && (
                  <span className="px-3.5 py-1.5 rounded-full bg-black/[0.05] group-hover:bg-crimson group-hover:text-white text-xs font-mono font-medium tracking-wider transition-colors self-start sm:self-auto border border-black/[0.05]">
                    {nextProject.metric}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Contact Inquiry Bento Card */}
          <div className="apple-card p-8 sm:p-14 text-center space-y-5 bg-gradient-to-b from-white to-[#fbfbfd]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
              <span>●</span> INITIATE A PROJECT
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1d1d1f] tracking-tight">
              Ready to create work with commercial impact?
            </h3>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#86868b] leading-relaxed">
              Whether launching a new product line or modernizing established packaging, let&apos;s build designs that demand shelf space.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-7 py-3 rounded-full bg-crimson text-white font-medium text-xs tracking-wider uppercase hover:bg-crimson-dark transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                Inquire About A Project ↗
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                }}
                className="px-6 py-3 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] font-medium text-xs tracking-wider uppercase transition-all cursor-pointer border border-black/[0.04]"
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
