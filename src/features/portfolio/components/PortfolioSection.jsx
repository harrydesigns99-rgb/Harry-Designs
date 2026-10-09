import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS, FILTER_BUTTONS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';
import BrandsCarousel from './BrandsCarousel';
import PortfolioGrid from './PortfolioGrid';
import PortfolioListView from './PortfolioListView';
import ProjectDetailModal from './ProjectDetailModal';
import { fadeInUp, scaleIn, TRANSITIONS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const PortfolioSection = ({ onSelectProject }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [selectedGridProject, setSelectedGridProject] = useState(null);
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('harry_portfolio_layout');
        if (saved && ['loose', 'grid', 'index'].includes(saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'grid';
  });

  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  // Filtered projects memoized for performance
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((item) => item.category === filter);
  }, [filter, projects]);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-transparent text-[#1d1d1f]" ref={ref}>
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06] pointer-events-none" />

      <div className="relative z-10">
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-20 md:mb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Apple 3-Way Layout Switcher: Loose (2-Col), Grid (3-Col), Index (List) */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('loose');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'loose');
                  } catch {
                    // ignore
                  }
                }}
                title="Spacious 2-column editorial view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'loose'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ◫ Loose
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
                title="Standard 3-column grid view"
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

          {/* ==================== WORK DISPLAY: LOOSE / GRID / INDEX ==================== */}
          {filteredProjects.length === 0 ? (
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
            <div className="mb-20">
              <PortfolioListView
                items={filteredProjects}
                onSelect={(item) => (onSelectProject ? onSelectProject(item) : setSelectedGridProject(item))}
              />
            </div>
          ) : (
            <div className="mb-20">
              <PortfolioGrid
                items={filteredProjects}
                onSelect={(item) => (onSelectProject ? onSelectProject(item) : setSelectedGridProject(item))}
                density={layoutMode}
              />
            </div>
          )}

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
