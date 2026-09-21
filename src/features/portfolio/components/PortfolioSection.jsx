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

const PortfolioSection = () => {
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
    <section id="portfolio" className="relative py-20 md:py-32 bg-transparent text-eerie" ref={ref}>
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 pointer-events-none" />

      <div className="relative z-10">
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-16 md:mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={scaleIn}
              transition={TRANSITIONS.medium}
              className="inline-block mb-4"
            >
              <span className="section-kicker mb-4">Selected clients</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-eerie">
              Built with <span className="text-gradient">good people.</span>
            </h2>
            <p className="text-lg md:text-xl text-eerie/60 max-w-3xl mx-auto">
              A selection of brands and teams I&apos;ve helped shape through identity, packaging, and design.
            </p>
          </motion.div>

          {/* Infinite Scrolling Brands Carousel */}
          <BrandsCarousel isInView={isInView} />
        </div>

        {/* ==================== MAIN PORTFOLIO SHOWCASE ==================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Single Unified Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="section-kicker mb-4">Selected work</span>
              <h3 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.05em] text-eerie">
                Different formats. <span className="text-gradient">One point of view.</span>
              </h3>
            </div>
            <p className="max-w-xs text-sm sm:text-base text-eerie/65 md:text-right leading-relaxed">
              Identity systems, packaging architecture, and visual worlds with commercial impact.
            </p>
          </div>

          {/* Single Unified Controls Bar: Filter Pills (Left) + 3-Way Layout Switcher (Right) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-eerie/15 py-4 mb-12">
            {/* Category Filters with Counts */}
            <div className="flex flex-wrap items-center gap-2">
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
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                      isActive
                        ? 'bg-crimson text-white border-crimson shadow-xs font-semibold'
                        : 'bg-cloud-white border-eerie/15 text-eerie/70 hover:text-eerie hover:border-eerie/40'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/25 text-white' : 'bg-eerie/10 text-eerie/60'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3-Way Layout Density Switcher: Loose (2-Col), Grid (3-Col), Index (List) */}
            <div className="flex items-center gap-1 bg-cloud-white/80 p-1 border border-eerie/15 ml-auto sm:ml-0">
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
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  layoutMode === 'loose'
                    ? 'bg-eerie text-white font-bold shadow-sm'
                    : 'text-eerie/60 hover:text-eerie'
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
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-eerie text-white font-bold shadow-sm'
                    : 'text-eerie/60 hover:text-eerie'
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
                title="Swiss index list view"
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  layoutMode === 'index'
                    ? 'bg-eerie text-white font-bold shadow-sm'
                    : 'text-eerie/60 hover:text-eerie'
                }`}
              >
                ☰ Index
              </button>
            </div>
          </div>

          {/* ==================== WORK DISPLAY: LOOSE / GRID / INDEX ==================== */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-eerie/20 mb-20">
              <p className="text-sm font-mono text-eerie/60">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-3 text-xs font-mono uppercase tracking-wider text-crimson font-bold hover:underline cursor-pointer"
              >
                Reset to All Work
              </button>
            </div>
          ) : layoutMode === 'index' ? (
            <div className="mb-20">
              <PortfolioListView
                items={filteredProjects}
                onSelect={(item) => setSelectedGridProject(item)}
              />
            </div>
          ) : (
            <div className="mb-20">
              <PortfolioGrid
                items={filteredProjects}
                onSelect={setSelectedGridProject}
                density={layoutMode}
              />
            </div>
          )}

          {/* Project Detail Modal */}
          <ProjectDetailModal
            item={selectedGridProject}
            onClose={() => setSelectedGridProject(null)}
          />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
