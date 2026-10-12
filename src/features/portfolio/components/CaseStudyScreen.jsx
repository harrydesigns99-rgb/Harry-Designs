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
        // user cancelled or fallback
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
  }, [prevProject, nextProject, onNavigateHome, onNavigateProject, isLightboxOpen]);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
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

  const processBehindProcessData =
    currentProject?.processBehindProcess || getProcessBehindProcess?.(currentProject);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] selection:bg-crimson selection:text-white transition-colors duration-300"
    >
      {/* ==================== APPLE STICKY SUB-NAV (COMPACT 52PX FROSTED GLASS BAR) ==================== */}
      <header className="sticky top-0 z-50 bg-[#fbfbfd]/90 backdrop-blur-2xl border-b border-black/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Unified Desktop Navigation Bar / 2-Tier on Mobile */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-2 sm:py-2.5 gap-2 sm:gap-3">
            {/* Top row controls: Back Button, Client Title & Prev/Next */}
            <div className="flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateHome?.();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-xs font-medium text-[#1d1d1f] transition-all cursor-pointer border border-black/[0.04]"
                  title="Return to home (Esc)"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">All Work</span>
                  <span className="sm:hidden">Work</span>
                </button>

                <span className="text-black/15 hidden sm:inline">/</span>

                <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                  <span className="font-display font-medium text-sm sm:text-base text-[#1d1d1f] tracking-tight truncate">
                    {currentProject.client}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] text-[#86868b] border border-black/[0.05] hidden sm:inline">
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Mobile Right Controls: Prev/Next & Share */}
              <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-2 py-1 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-xs font-mono text-[#86868b] border border-black/[0.04] transition-all cursor-pointer flex items-center gap-1"
                  title="Share this case study"
                >
                  <span>{sharedToast ? '✓' : '↗'}</span>
                </button>
                <div className="inline-flex items-center p-0.5 rounded-full bg-black/[0.05] border border-black/[0.04]">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onNavigateProject?.(prevProject.id);
                    }}
                    title={`Previous: ${prevProject.client}`}
                    className="px-2.5 py-1 rounded-full text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer"
                  >
                    ←
                  </button>
                  <span className="text-black/10 text-xs">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onNavigateProject?.(nextProject.id);
                    }}
                    title={`Next: ${nextProject.client}`}
                    className="px-2.5 py-1 rounded-full text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Center: Segmented Section Jump Tabs */}
            <nav className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.04] text-xs overflow-x-auto no-scrollbar mx-auto lg:mx-0 max-w-full">
              <button
                type="button"
                onClick={() => scrollToSection('screen-hero')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
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
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                  activeTab === 'screen-process'
                    ? 'bg-white text-crimson shadow-xs'
                    : 'text-[#86868b] hover:text-crimson'
                }`}
              >
                <span>Making Process</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-crimson/10 text-crimson font-mono font-semibold">
                  5 PHASES
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-studio-process')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
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
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'screen-specs'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {currentProject.category === 'packaging' ? 'Print Specs' : 'System Specs'}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('screen-impact')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'screen-impact'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Outcomes
              </button>
            </nav>

            {/* Desktop Right Controls: Prev/Next, Share & CMS */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[11px] font-mono uppercase tracking-wider text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.04] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Share this case study"
              >
                <span>{sharedToast ? '✓ Copied URL' : 'Share ↗'}</span>
              </button>

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
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CASE STUDY CONTENT (TIGHT HARMONIC SPACING) ==================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20 space-y-12 sm:space-y-16">
        {/* -------------------- SECTION 01: KEYNOTE HERO PRESENTATION -------------------- */}
        <section id="screen-hero" className="scroll-mt-20 space-y-6 sm:space-y-7">
          {/* Compact Centered Keynote Header */}
          <div className="text-center space-y-2 sm:space-y-3 max-w-4xl mx-auto">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="uppercase tracking-wider">Case Study // {currentIndex + 1} of {projects.length}</span>
              <span className="text-black/20">•</span>
              <span className="uppercase text-[#1d1d1f] font-semibold">{currentProject.category}</span>
            </div>

            {/* Grand Apple Keynote Title (Tightly Scaled) */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1d1d1f] leading-tight">
              {currentProject.client}
            </h1>

            {/* Subtitle / Discipline */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#86868b] uppercase">
              {currentProject.title}
            </p>

            {/* Summary Narrative */}
            <p className="text-xs sm:text-base text-[#1d1d1f]/80 max-w-2xl mx-auto font-normal leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Segmented View Mode Controller (if Before/After available) */}
          {hasEarlyConcept && (
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center p-1 rounded-full bg-black/[0.05] border border-black/[0.06] shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setViewModeOverride('compare');
                  }}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
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
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
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

          {/* Cinematic Hero Stage (Immediate Viewport Visibility, Zero Cropping!) */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] max-h-[320px] sm:max-h-[480px] lg:max-h-[520px] rounded-2xl sm:rounded-3xl bg-white border border-black/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)] overflow-hidden flex items-center justify-center p-3 sm:p-6">
              {hasEarlyConcept && viewMode === 'compare' ? (
                <BeforeAfterSlider
                  beforeImage={currentProject.beforeImage || currentProject.process?.conceptImage}
                  afterImage={currentProject.afterImage || currentProject.image}
                  beforeLabel={currentProject.beforeLabel || currentProject.process?.conceptLabel || 'Initial Concept'}
                  afterLabel={currentProject.afterLabel || currentProject.process?.finalLabel || 'Final System'}
                  className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden"
                />
              ) : currentProject.image ? (
                <div className="relative w-full h-full flex items-center justify-center group">
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.client} - ${currentProject.title}`}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                  />
                  {currentProject.metric && (
                    <div className="absolute bottom-3 left-3 z-10 rounded-full px-2.5 sm:px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono font-medium tracking-wider shadow-lg border border-white/10">
                      ★ {currentProject.metric}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsLightboxOpen(true);
                    }}
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-xs font-mono tracking-wide shadow-lg border border-white/15 opacity-90 hover:opacity-100 transition-all cursor-pointer"
                    title="Inspect High-Res Artwork in Lightbox"
                  >
                    <span>🔍</span> Inspect Asset
                  </button>
                </div>
              ) : (
                <div className={`w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br ${currentProject.color}`} />
              )}
            </div>

            {/* Apple Pedestal Caption */}
            <div className="flex items-center justify-between text-xs font-mono text-[#86868b] px-3 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Production Master Asset
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsLightboxOpen(true);
                }}
                className="hover:text-[#1d1d1f] transition-colors underline decoration-dotted cursor-pointer"
              >
                Inspect Artwork 4K ↗
              </button>
            </div>
          </div>

          {/* 3-Column Keynote Impact Metrics Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="apple-card p-5 sm:p-6 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Commercial Velocity
              </div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f] tracking-tight">
                {currentProject.metric || 'National Rollout'}
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-0.5">
                Engineered for immediate retail shelf standout and lasting brand equity across modern touchpoints.
              </p>
            </div>

            <div className="apple-card p-5 sm:p-6 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Discipline Mastery
              </div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f] capitalize tracking-tight">
                {currentProject.category}
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-0.5">
                From precision CAD dielines to typographic scale systems and tactile substrate treatments.
              </p>
            </div>

            <div className="apple-card p-5 sm:p-6 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                Production Fidelity
              </div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f] tracking-tight">
                100% Press Ready
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-0.5">
                Calibrated under ISO 12647-2 print standards with micro-registration and tactile substrate integrity.
              </p>
            </div>
          </div>

          {/* 2-Column Strategic Challenge & Architecture Matrix Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-stretch">
            {/* Left Card: Strategic Challenge & Approach */}
            <div className="lg:col-span-7 apple-card p-5 sm:p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
                  <span>✦</span> STRATEGIC CHALLENGE &amp; INTENT
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#1d1d1f] tracking-tight">
                  Solving for shelf standout and brand distinctiveness.
                </h3>
                <p className="text-sm text-[#1d1d1f]/80 leading-relaxed">
                  {currentProject.brief ||
                    'Engineer a distinctive visual identity and packaging system designed for high shelf standout, retail memorability, and long-term brand equity.'}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06] space-y-1.5">
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
            <div className="lg:col-span-5 apple-card p-5 sm:p-7 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium border-b border-black/[0.06] pb-2.5 mb-3">
                  Project Architecture Matrix
                </div>
                <dl className="space-y-2.5">
                  <div className="flex justify-between items-center py-1 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Client</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">{currentProject.client}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Discipline</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f] capitalize">{currentProject.category}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Role</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">Creative Direction &amp; Packaging</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-black/[0.04]">
                    <dt className="text-xs font-mono text-[#86868b]">Deliverables</dt>
                    <dd className="text-xs sm:text-sm font-semibold text-[#1d1d1f] truncate max-w-[180px] text-right">
                      {currentProject.deliverables || 'Identity & Packaging System'}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <dt className="text-xs font-mono text-[#86868b]">Production Status</dt>
                    <dd className="text-xs font-mono font-semibold text-emerald-600 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Shipped &amp; In Circulation
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-[#86868b]">
                <span>Archived Case #{currentProject.id.toString().padStart(3, '0')}</span>
                <span>Harry Designs Studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- SECTION 02: THE MAKING PROCESS (5 PHASES) -------------------- */}
        <section id="screen-process" className="scroll-mt-20 pt-10 sm:pt-12 border-t border-black/[0.08]">
          <DesignProcessNarrative
            process={currentProject.process}
            finalImage={currentProject.image}
            client={currentProject.client}
            title={currentProject.title}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 03: PROCESS BEHIND THE PROCESS (STUDIO RIGOR) -------------------- */}
        <section id="screen-studio-process" className="scroll-mt-20 pt-10 sm:pt-12 border-t border-black/[0.08]">
          <ProcessBehindProcess
            data={processBehindProcessData}
            client={currentProject.client}
            category={currentProject.category}
          />
        </section>

        {/* -------------------- SECTION 04: TECHNICAL SPECS & DIELINE -------------------- */}
        <section id="screen-specs" className="scroll-mt-20 pt-10 sm:pt-12 border-t border-black/[0.08]">
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
        <section id="screen-impact" className="scroll-mt-20 pt-10 sm:pt-12 border-t border-black/[0.08] space-y-6 sm:space-y-7">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] text-xs font-mono text-[#86868b] border border-black/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              <span>05 / COMMERCIAL OUTCOMES</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
              Measurable Market Impact
            </h3>
            <p className="text-sm text-[#86868b] max-w-2xl leading-relaxed">
              Design is an investment in market velocity. Here is the tangible commercial performance delivered for {currentProject.client}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="apple-card p-5 sm:p-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Velocity Benchmark</span>
              <div className="font-display text-2xl sm:text-3xl font-medium text-crimson">
                {currentProject.metric || '+40% Lift'}
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Clear shelf recognition and distinctive form factor driving repeat retail pickup.
              </p>
            </div>

            <div className="apple-card p-5 sm:p-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Brand Retention</span>
              <div className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f]">
                Top-of-Mind
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Iconic graphic silhouette standing out on crowded supermarket shelves and online listings.
              </p>
            </div>

            <div className="apple-card p-5 sm:p-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Press Compliance</span>
              <div className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f]">
                Zero Waste Rate
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed">
                Precision trapping and ink viscosity calibration ensuring flawless high-volume print runs.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- NEXT PROJECT FEATURE CARD & STUDIO INQUIRY -------------------- */}
        <section className="pt-10 sm:pt-12 border-t border-black/[0.08] space-y-6">
          {/* Next Project Apple Bento Card */}
          {nextProject && onNavigateProject && (
            <div
              onClick={() => {
                sound.playClick();
                onNavigateProject(nextProject.id);
              }}
              className="group apple-card p-6 sm:p-8 hover:border-crimson/50 cursor-pointer transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-2">
                  <span>✦</span> NEXT CASE STUDY
                </span>
                <span className="text-xs font-mono text-[#86868b] group-hover:text-crimson transition-colors flex items-center gap-1">
                  View Case Study →
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-4xl font-medium text-[#1d1d1f] group-hover:text-crimson transition-colors tracking-tight">
                    {nextProject.client}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] mt-0.5 uppercase font-medium">
                    {nextProject.title}
                  </p>
                </div>

                {nextProject.metric && (
                  <span className="px-3 py-1 rounded-full bg-black/[0.05] group-hover:bg-crimson group-hover:text-white text-xs font-mono font-medium tracking-wider transition-colors self-start sm:self-auto border border-black/[0.05]">
                    {nextProject.metric}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Contact Inquiry Bento Card */}
          <div className="apple-card p-6 sm:p-10 text-center space-y-4 bg-gradient-to-b from-white to-[#fbfbfd]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
              <span>●</span> INITIATE A PROJECT
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-medium text-[#1d1d1f] tracking-tight">
              Ready to create work with commercial impact?
            </h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Whether launching a new product line or modernizing established packaging, let&apos;s build designs that demand shelf space.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-crimson text-white font-medium text-xs tracking-wider uppercase hover:bg-crimson-dark transition-all cursor-pointer shadow-md hover:shadow-lg text-center"
              >
                Inquire About A Project ↗
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateHome?.();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] font-medium text-xs tracking-wider uppercase transition-all cursor-pointer border border-black/[0.04] text-center"
              >
                Back to All Work
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 4K Master Asset Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white/80 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <div className="font-mono text-xs sm:text-sm">
                <span className="text-white font-semibold">{currentProject.client}</span> — {currentProject.title} (Master View)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-mono text-xs text-white/50">
                Press [Esc] to exit
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsLightboxOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer border border-white/20"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
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

          {/* Lightbox Footer Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/50 pt-2 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{currentProject.category || 'Packaging Design & System'}</span>
            <span>Zero Cropping • 100% Fidelity</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyScreen;
