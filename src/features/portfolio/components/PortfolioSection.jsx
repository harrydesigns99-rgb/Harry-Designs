import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS, FILTER_BUTTONS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';
import BrandsCarousel from './BrandsCarousel';
import PortfolioGrid from './PortfolioGrid';
import PortfolioListView from './PortfolioListView';
import Parallax3DShowcase from './Parallax3DShowcase';
import ProjectDetailModal from './ProjectDetailModal';
import { fadeInUp, scaleIn, TRANSITIONS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const INITIAL_PROJECTS_COUNT = 6;

const PortfolioSection = ({ onSelectProject, onNavigateWork }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGridProject, setSelectedGridProject] = useState(null);
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('harry_portfolio_layout');
        if (saved && ['3d', 'grid', 'index'].includes(saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return '3d';
  });

  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  // Filtered projects memoized for performance
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((item) => item.category === filter);
  }, [filter, projects]);

  // Displayed projects: only 4 initially when viewing all, or all if expanded
  const displayedProjects = useMemo(() => {
    if (filter === 'all' && !isExpanded) {
      return filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
    }
    return filteredProjects;
  }, [filter, isExpanded, filteredProjects]);

  return (
    <section id="portfolio" className="relative pt-14 pb-8 md:pt-20 md:pb-10 bg-transparent text-[#1d1d1f]" ref={ref}>
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06] pointer-events-none" />

      <div className="relative z-10">
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-14 md:mb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 space-y-3"
          >
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={scaleIn}
              transition={TRANSITIONS.medium}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]"
            >
              <span>●</span>
              <span>SELECTED CLIENTS &amp; PARTNERS</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-[#1d1d1f]">
              Built with <span className="text-gradient">good people.</span>
            </h2>
            <p className="text-base md:text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              A curated selection of brands and forward-looking teams shaped through identity systems, packaging, and design architecture.
            </p>
          </motion.div>

          {/* Infinite Scrolling Brands Carousel */}
          <BrandsCarousel isInView={isInView} />
        </div>

        {/* ==================== MAIN PORTFOLIO SHOWCASE ==================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                <span>SELECTED WORK // ARCHIVE</span>
              </div>
              <h3 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-[#1d1d1f]">
                Different formats. <span className="text-gradient">One point of view.</span>
              </h3>
            </div>
            <p className="max-w-xs text-sm sm:text-base text-[#86868b] md:text-right leading-relaxed">
              Identity systems, packaging architecture, and visual worlds designed for commercial impact.
            </p>
          </div>

          {/* Apple Segmented Controls Bar: Filter Pills (Left) + 3-Way Layout Switcher (Right) */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 mb-10 border-y border-black/[0.06]">
            {/* Category Segmented Pills */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.05] overflow-x-auto no-scrollbar">
              {FILTER_BUTTONS.map((btn) => {
                const count =
                  btn.value === 'all'
                    ? projects.length
                    : projects.filter((item) => item.category === btn.value).length;
                const isActive = filter === btn.value;

                return (
                  <button
                    key={btn.value}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setFilter(btn.value);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                        : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-black/[0.08] text-[#1d1d1f]' : 'bg-black/[0.04] text-[#86868b]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Apple Layout Switcher: 3D Parallax Showcase (◈), Grid (⊞), Index (☰) */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('3d');
                  try {
                    localStorage.setItem('harry_portfolio_layout', '3d');
                  } catch {
                    // ignore
                  }
                }}
                title="Interactive 3D Parallax Perspective Showcase"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  layoutMode === '3d'
                    ? 'bg-crimson text-white shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <span>◈</span>
                <span>3D Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('grid');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'grid');
                  } catch {
                    // ignore
                  }
                }}
                title="Curated 3-column grid view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('index');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'index');
                  } catch {
                    // ignore
                  }
                }}
                title="Index list view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'index'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ☰ Index
              </button>
            </div>
          </div>

          {/* ==================== WORK DISPLAY: 3D SHOWCASE / GRID / INDEX ==================== */}
          {layoutMode === '3d' ? (
            <div className="mb-8">
              <Parallax3DShowcase
                projects={filteredProjects}
                onSelectProject={(item) =>
                  onSelectProject ? onSelectProject(item) : setSelectedGridProject(item)
                }
                onNavigateWork={onNavigateWork}
              />
            </div>
          ) : displayedProjects.length === 0 ? (
            <div className="py-20 text-center apple-card p-10 mb-20">
              <p className="text-sm font-mono text-[#86868b]">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-3 px-4 py-1.5 rounded-full bg-crimson text-white text-xs font-medium cursor-pointer"
              >
                Reset to All Work
              </button>
            </div>
          ) : layoutMode === 'index' ? (
            <div className="mb-12">
              <PortfolioListView
                items={displayedProjects}
                onSelect={(item) => (onSelectProject ? onSelectProject(item) : setSelectedGridProject(item))}
              />
            </div>
          ) : (
            <div className="mb-12">
              <PortfolioGrid
                items={displayedProjects}
                onSelect={(item) => (onSelectProject ? onSelectProject(item) : setSelectedGridProject(item))}
                density="grid"
              />
            </div>
          )}

          {/* ==================== LOAD MORE / FULL ARCHIVE CONTROLS ==================== */}
          {layoutMode !== '3d' && filter === 'all' && filteredProjects.length > INITIAL_PROJECTS_COUNT && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 mb-12">
              {/* Load More Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setIsExpanded(!isExpanded);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-crimson hover:bg-crimson-dark text-white text-xs sm:text-sm font-medium tracking-wide uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {isExpanded ? (
                  <>
                    <span>Show Curated Selection (6)</span>
                    <span className="text-sm">↑</span>
                  </>
                ) : (
                  <>
                    <span>Load More Selected Projects ({filteredProjects.length - INITIAL_PROJECTS_COUNT} More)</span>
                    <span className="text-sm">↓</span>
                  </>
                )}
              </button>

              {/* View Full Archive in Dedicated Page */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateWork?.();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] text-xs sm:text-sm font-medium tracking-wide uppercase border border-black/[0.06] transition-all cursor-pointer"
              >
                <span>View Full Archive Screen</span>
                <span className="text-sm">↗</span>
              </button>

              {/* Open in New Tab */}
              <a
                href="/work"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] text-xs sm:text-sm font-medium tracking-wide uppercase border border-black/[0.06] transition-all cursor-pointer"
                title="Open full portfolio archive in a new browser tab"
              >
                <span>Open in New Tab</span>
                <span className="text-sm">⧉</span>
              </a>
            </div>
          )}

          {/* ==================== DZINR-INSPIRED STUDIO MANIFESTO BANNER ==================== */}
          <div className="p-8 sm:p-12 rounded-3xl apple-card bg-gradient-to-br from-white via-white to-black/[0.02] border border-black/[0.08] text-center space-y-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
              <span>●</span> COMPLETE CASE ARCHIVE
            </div>
            <h4 className="font-display text-2xl sm:text-4xl font-medium text-[#1d1d1f] tracking-tight max-w-3xl mx-auto leading-tight">
              These are not just projects. They are stories of our clients, packaging systems, and the commercial impact we made.
            </h4>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-xl mx-auto leading-relaxed">
              Explore the full {projects.length}-project catalog featuring retail pouch dielines, CAD specifications, bilingual identities, and press-ready master files.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigateWork?.();
                }}
                className="px-6 py-2.5 rounded-full bg-crimson text-white font-medium text-xs tracking-wider uppercase hover:bg-crimson-dark transition-all cursor-pointer shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <span>Explore Full Portfolio Archive</span>
                <span>↗</span>
              </button>
              <a
                href="/work"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="px-5 py-2.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] font-medium text-xs tracking-wider uppercase border border-black/[0.04] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Open Archive in New Tab</span>
                <span>⧉</span>
              </a>
            </div>
          </div>

          {/* Project Detail Modal (Fallback if onSelectProject not passed) */}
          {!onSelectProject && (
            <ProjectDetailModal
              item={selectedGridProject}
              items={filteredProjects}
              onSelectProject={setSelectedGridProject}
              onClose={() => setSelectedGridProject(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
