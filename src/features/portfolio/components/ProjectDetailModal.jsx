import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import PackagingAnatomy from '@/components/PackagingAnatomy';
import SystemSpecs from '@/components/SystemSpecs';
import DesignProcessNarrative from '@/components/DesignProcessNarrative';
import ProcessBehindProcess from '@/components/ProcessBehindProcess';
import { getProcessBehindProcess } from '../data/portfolioData';
import { sound } from '@/utils/audio';

const ProjectDetailModal = ({
  item,
  items = [],
  onSelectProject,
  onClose,
}) => {
  const [viewModeOverride, setViewModeOverride] = useState(null);
  const [lastItemId, setLastItemId] = useState(item?.id);
  const modalContainerRef = useRef(null);

  // Reset state when project changes
  if (item?.id !== lastItemId) {
    setLastItemId(item?.id);
    setViewModeOverride(null);
  }

  // Calculate previous and next projects
  const currentIndex = items.findIndex((p) => p.id === item?.id);
  const totalCount = items.length;
  const prevProject = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1];
  const nextProject = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0];

  const hasEarlyConcept = Boolean(item?.hasBeforeAfter || item?.process?.conceptImage);
  const viewMode = viewModeOverride ?? (item?.hasBeforeAfter ? 'compare' : 'artwork');

  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        sound.playClick();
        onClose();
      } else if (event.key === 'ArrowLeft' && prevProject && onSelectProject) {
        sound.playClick();
        onSelectProject(prevProject);
      } else if (event.key === 'ArrowRight' && nextProject && onSelectProject) {
        sound.playClick();
        onSelectProject(nextProject);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, prevProject, nextProject, onSelectProject]);

  // Scroll to top whenever item changes
  useEffect(() => {
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTop = 0;
    }
  }, [item?.id]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  const scrollToSection = (sectionId) => {
    sound.playClick();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        {/* Modal Window */}
        <motion.div
          ref={modalContainerRef}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-5xl xl:max-w-6xl h-[94vh] md:max-h-[92vh] overflow-y-auto bg-cloud-dancer text-eerie shadow-2xl border border-eerie/15 flex flex-col rounded-t-2xl md:rounded-none"
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="md:hidden pt-2.5 pb-1 flex justify-center bg-cloud-dancer">
            <div className="w-12 h-1 bg-eerie/20 rounded-full" />
          </div>

          {/* ==================== STICKY TOP BAR ==================== */}
          <div className="sticky top-0 z-40 border-b border-eerie/15 bg-cloud-dancer/95 backdrop-blur-md px-3 sm:px-6 py-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              {/* Project Title & Category Breadcrumb */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-crimson font-bold truncate">
                  {item.client}
                </span>
                <span className="text-eerie/30 text-xs hidden sm:inline">/</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-eerie/60 border border-eerie/15 px-2 py-0.2 hidden sm:inline truncate">
                  {item.category}
                </span>
                {totalCount > 0 && (
                  <span className="text-[10px] font-mono text-eerie/40 hidden md:inline">
                    [{currentIndex + 1} of {totalCount}]
                  </span>
                )}
              </div>

              {/* Action Buttons: Prev/Next & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {totalCount > 1 && onSelectProject && (
                  <div className="flex items-center border border-eerie/20 bg-cloud-white">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onSelectProject(prevProject);
                      }}
                      title={`Previous: ${prevProject?.client}`}
                      className="px-2 sm:px-2.5 py-1 text-xs font-mono text-eerie/70 hover:text-eerie hover:bg-eerie/5 border-r border-eerie/15 transition-colors cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onSelectProject(nextProject);
                      }}
                      title={`Next: ${nextProject?.client}`}
                      className="px-2 sm:px-2.5 py-1 text-xs font-mono text-eerie/70 hover:text-eerie hover:bg-eerie/5 transition-colors cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close project details"
                  className="flex h-8 w-8 items-center justify-center border border-eerie/20 bg-cloud-white text-xl hover:bg-eerie hover:text-white transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* In-Modal Section Anchor Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5 border-t border-eerie/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => scrollToSection('modal-story')}
                className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
              >
                <span>✦</span>
                <span>01 Overview</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('modal-process')}
                className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-crimson font-bold hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
              >
                <span>✎</span>
                <span>02 The Making Process</span>
                <span className="text-[9px] px-1 py-0.2 bg-crimson/10 rounded-xs text-crimson">5 PHASES</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('modal-studio-process')}
                className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
              >
                <span>⚙</span>
                <span>03 The Process Behind The Process</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('modal-specs')}
                className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
              >
                <span>◫</span>
                <span>04 {item.category === 'packaging' ? 'Print Anatomy & Dieline' : 'System Specs'}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('modal-impact')}
                className="flex-shrink-0 px-2.5 py-1 bg-cloud-white border border-eerie/15 text-eerie/80 hover:text-crimson hover:border-crimson transition-all cursor-pointer flex items-center gap-1"
              >
                <span>★</span>
                <span>05 Commercial Impact</span>
              </button>
            </div>
          </div>

          {/* ==================== LONG-FORM CONTINUOUS EDITORIAL CASE STUDY ==================== */}
          <div className="p-4 sm:p-8 lg:p-12 space-y-16">
            {/* -------------------- SECTION 01: HERO STORY & BRIEF -------------------- */}
            <section id="modal-story" className="space-y-8">
              <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
                {/* Artwork View / Before-After Hero */}
                <div className="w-full bg-neutral-900 border border-eerie/15 overflow-hidden relative flex flex-col justify-center">
                  {hasEarlyConcept && (
                    <div className="absolute top-3 left-3 z-30 flex items-center bg-black/75 backdrop-blur-md p-1 border border-white/20 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setViewModeOverride('compare');
                        }}
                        className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
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
                        className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
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
                      beforeImage={item.beforeImage || item.process?.conceptImage}
                      afterImage={item.afterImage || item.image}
                      beforeLabel={item.beforeLabel || item.process?.conceptLabel || 'Initial Concept'}
                      afterLabel={item.afterLabel || item.process?.finalLabel || 'Final System'}
                      className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[32rem]"
                    />
                  ) : item.image ? (
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[32rem] bg-neutral-950 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={`${item.client} - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      {item.metric && (
                        <div className="absolute bottom-4 left-4 z-10 bg-crimson text-white px-3 py-1 text-xs font-semibold tracking-wider uppercase shadow-md">
                          Impact: {item.metric}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`w-full aspect-[4/3] bg-gradient-to-br ${item.color}`} />
                  )}
                </div>

                {/* Narrative & Strategic Brief Column */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="section-kicker !text-crimson">
                        Case Study / {item.year || '2024'}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-[0.14em] text-eerie/50 border border-eerie/15 px-2.5 py-0.5">
                        {item.category}
                      </span>
                    </div>

                    <h2
                      id="project-title"
                      className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-eerie leading-tight"
                    >
                      {item.client}
                    </h2>
                    <p className="text-sm font-semibold tracking-wide text-eerie/60 mt-1 uppercase">
                      {item.title}
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-eerie/80 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Challenge & Strategic Brief */}
                  <div className="p-5 bg-cloud-white border border-eerie/15 space-y-4">
                    <div>
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold mb-1">
                        The Challenge &amp; Strategic Brief
                      </h4>
                      <p className="text-sm text-eerie/80 leading-relaxed">
                        {item.brief ||
                          'Engineer a distinctive visual identity and packaging system designed for high shelf standout and long-term brand equity.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-eerie/10">
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold mb-1">
                        Strategic Approach
                      </h4>
                      <p className="text-sm text-eerie/80 leading-relaxed">
                        {item.approach ||
                          'Unified typographic hierarchy, bespoke iconography, and tactile finish specifications tailored to consumer touchpoints.'}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables & Metadata */}
                  <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-eerie/15">
                    <div>
                      <dt className="text-[10px] uppercase font-mono tracking-wider text-eerie/50 font-bold">Role</dt>
                      <dd className="mt-1 text-xs sm:text-sm font-semibold text-eerie">Creative Direction &amp; Design</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase font-mono tracking-wider text-eerie/50 font-bold">Deliverables</dt>
                      <dd className="mt-1 text-xs sm:text-sm font-semibold text-eerie truncate">
                        {item.deliverables || 'Brand Identity & Packaging'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* -------------------- SECTION 02: THE MAKING PROCESS -------------------- */}
            <section id="modal-process" className="pt-8 border-t border-eerie/15">
              <DesignProcessNarrative
                process={item.process}
                finalImage={item.image}
                client={item.client}
                title={item.title}
                category={item.category}
              />
            </section>

            {/* -------------------- SECTION 03: PROCESS BEHIND THE PROCESS -------------------- */}
            <section id="modal-studio-process" className="pt-8 border-t border-eerie/15">
              <ProcessBehindProcess
                data={item.processBehindProcess || getProcessBehindProcess(item)}
                client={item.client}
                category={item.category}
              />
            </section>

            {/* -------------------- SECTION 04: TECHNICAL ANATOMY / SYSTEM SPECS -------------------- */}
            <section id="modal-specs" className="pt-8 border-t border-eerie/15">
              {item.category === 'packaging' ? (
                <PackagingAnatomy
                  anatomy={item.anatomy}
                  image={item.image}
                  client={item.client}
                  title={item.title}
                />
              ) : (
                <SystemSpecs
                  specs={item.systemSpecs}
                  client={item.client}
                  title={item.title}
                  category={item.category}
                />
              )}
            </section>

            {/* -------------------- SECTION 04: COMMERCIAL IMPACT & DELIVERABLES -------------------- */}
            <section id="modal-impact" className="pt-8 border-t border-eerie/15 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-eerie/15 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold">
                    04 / OUTCOMES &amp; COMMERCIAL RESULTS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-eerie">
                    Measurable Commercial Impact
                  </h3>
                </div>
                {item.metric && (
                  <span className="px-3 py-1 bg-crimson text-white text-xs font-mono font-bold uppercase tracking-wider">
                    {item.metric}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-cloud-white border border-eerie/15 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                    Market Presence
                  </div>
                  <div className="font-display text-2xl font-medium text-eerie">
                    {item.metric || 'National Rollout'}
                  </div>
                  <p className="text-xs text-eerie/70 leading-relaxed">
                    Designed for rapid shelf standout, immediate brand recall, and verified commercial lift.
                  </p>
                </div>

                <div className="p-5 bg-cloud-white border border-eerie/15 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                    Design Discipline
                  </div>
                  <div className="font-display text-2xl font-medium text-eerie capitalize">
                    {item.category}
                  </div>
                  <p className="text-xs text-eerie/70 leading-relaxed">
                    Comprehensive design architecture spanning typography, dielines, color separations, and physical finishes.
                  </p>
                </div>

                <div className="p-5 bg-cloud-white border border-eerie/15 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold">
                    Production Fidelity
                  </div>
                  <div className="font-display text-2xl font-medium text-eerie">
                    100% Press Ready
                  </div>
                  <p className="text-xs text-eerie/70 leading-relaxed">
                    Calibrated under ISO 12647-2 standards with micro-registration and tactile substrate integrity.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------- FOOTER & NEXT PROJECT NAVIGATION -------------------- */}
            <div className="pt-8 border-t border-eerie/15 space-y-6">
              <div className="p-6 sm:p-8 bg-cloud-white border border-eerie/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold">
                    START A PROJECT
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-medium text-eerie mt-1">
                    Have a project in mind for {item.client}?
                  </h4>
                  <p className="text-xs sm:text-sm text-eerie/70 mt-1 max-w-xl">
                    Whether launching a new D2C brand or restructuring legacy supermarket packaging, let&apos;s build work that wins shelf space.
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={() => {
                    handleClose();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-crimson text-white font-semibold text-xs tracking-wider uppercase hover:bg-crimson-dark transition-colors cursor-pointer flex-shrink-0 flex items-center gap-2"
                >
                  <span>Inquire About A Similar Project</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              {/* Prev / Next Bottom Navigation Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                {prevProject && onSelectProject && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(prevProject);
                    }}
                    className="text-xs font-mono text-eerie/70 hover:text-crimson flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>← Previous Project:</span>
                    <span className="font-bold underline">{prevProject.client}</span>
                  </button>
                )}

                {nextProject && onSelectProject && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(nextProject);
                    }}
                    className="text-xs font-mono text-eerie/70 hover:text-crimson flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                  >
                    <span>Next Project:</span>
                    <span className="font-bold underline">{nextProject.client}</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;